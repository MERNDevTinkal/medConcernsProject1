import React, { useState, useRef, useCallback, useEffect } from "react";
import Header from "../../Component/Layout/Header/Header";
import Footer from "../../Component/Layout/Footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../Component/apiCall/apiCall";
import { toast } from "react-toastify";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import Loader from "../../Component/webLoader/loader";
import getSetting from "../../Component/settingApi/settings";

/* -------------------- Minimal helpers & UI -------------------- */
function cn(...a) {
  return a.filter(Boolean).join(" ");
}

const Button = ({
  className = "",
  variant = "default",
  size = "md",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center rounded-md transition active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-700",
    outline:
      "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 focus:ring-blue-700",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-blue-700",
  };
  const sizes = {
    md: "h-10 px-4 text-sm",
    icon: "h-10 w-10 p-0",
  };
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
};

const Card = ({ className = "", ...props }) => (
  <div
    className={cn(
      "rounded-xl border border-gray-200 bg-white shadow-sm",
      className
    )}
    {...props}
  />
);

const CardHeader = ({ className = "", ...props }) => (
  <div className={cn("border-b border-gray-200", className)} {...props} />
);

const CardContent = ({ className = "", ...props }) => (
  <div className={cn("p-4 sm:p-5", className)} {...props} />
);

/* -------------------- Inline Icons -------------------- */
const Icon = {
  Pencil: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 3.487a2.25 2.25 0 1 1 3.182 3.182L7.5 19.313 3 21l1.688-4.5L16.862 3.487z"
      />
    </svg>
  ),
  Image: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" ry="2" strokeWidth="2" />
      <path
        d="M10 13l2-2 4 4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="9" r="1.5" />
    </svg>
  ),
  Eraser: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 17l7-7 4 4-7 7H3zM14 10l3-3a2.828 2.828 0 1 1 4 4l-3 3"
      />
    </svg>
  ),
  Trash: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"
      />
    </svg>
  ),
  Keyword: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 4h16v16H4z"
      />
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 12h8M8 8h8M8 16h5"
      />
    </svg>
  ),
};

/* -------------------- Component -------------------- */
export default function Whiteboard() {
  const navigate = useNavigate();
  const { id } = useParams();
  const canvasRef = useRef(null);
  const stripRef = useRef(null);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [paths, setPaths] = useState([]);

  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingColor, setDrawingColor] = useState("#000000");
  const [drawingWidth, setDrawingWidth] = useState(2);
  const [tool, setTool] = useState("pencil");
  const [drawingName, setDrawingName] = useState("");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]); // {src,x,y,width,height}
  const [texts, setTexts] = useState([]);

  const [textToolActive, setTextToolActive] = useState(false);
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState("");

  const [draggingImage, setDraggingImage] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const token = localStorage.getItem("token");
  const licenses_id = localStorage.getItem("license_key");

  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const [loader, setLoader] = useState(true);

  const getCanvasContext = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return canvas.getContext("2d");
  }, []);

  /* -------------------- Pointer utils -------------------- */
  const pointerPos = (e, rect) => {
    let clientX, clientY;
    if (e.touches && e.touches[0]) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  /* -------------------- Drawing -------------------- */
  // const startDrawing = useCallback(
  //   (e) => {
  //     const rect = canvasRef.current.getBoundingClientRect();
  //     const pos = pointerPos(e, rect);

  //     // If clicking on image -> start dragging
  //     const hit = uploadedImages.find(
  //       (img) =>
  //         pos.x >= img.x &&
  //         pos.x <= img.x + img.width &&
  //         pos.y >= img.y &&
  //         pos.y <= img.y + img.height
  //     );
  //     if (hit) {
  //       setDraggingImage(hit);
  //       setDragOffset({ x: pos.x - hit.x, y: pos.y - hit.y });
  //       return;
  //     }

  //     if (tool === "text") {
  //       setTextPosition({ x: pos.x, y: pos.y });
  //       setTypedText("");
  //       setTextToolActive(true);
  //       return;
  //     }

  //     const ctx = getCanvasContext();
  //     if (!ctx) return;

  //     setIsDrawing(true);
  //     ctx.beginPath();
  //     ctx.moveTo(pos.x, pos.y);
  //   },
  //   [tool, getCanvasContext, uploadedImages]
  // );

  const startDrawing = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const pos = pointerPos(e, rect);
    if (tool !== "pencil" && tool !== "eraser") return;

    setIsDrawing(true);
    setPaths((prev) => [
      ...prev,
      { tool, color: drawingColor, width: drawingWidth, points: [pos] },
    ]);
  };

  // const draw = useCallback(
  //   (e) => {
  //     const rect = canvasRef.current.getBoundingClientRect();
  //     const pos = pointerPos(e, rect);

  //     // Dragging image
  //     if (draggingImage) {
  //       setUploadedImages((prev) =>
  //         prev.map((img) =>
  //           img === draggingImage
  //             ? { ...img, x: pos.x - dragOffset.x, y: pos.y - dragOffset.y }
  //             : img
  //         )
  //       );
  //       return;
  //     }

  //     if (!isDrawing || tool === "text") return;
  //     const ctx = getCanvasContext();
  //     if (!ctx) return;

  //     ctx.lineTo(pos.x, pos.y);
  //     ctx.strokeStyle = tool === "pencil" ? drawingColor : "#ffffff";
  //     ctx.lineWidth = drawingWidth;
  //     ctx.lineCap = "round";
  //     ctx.lineJoin = "round";
  //     ctx.globalCompositeOperation =
  //       tool === "pencil" ? "source-over" : "destination-out";
  //     ctx.stroke();
  //   },
  //   [
  //     isDrawing,
  //     drawingColor,
  //     drawingWidth,
  //     tool,
  //     getCanvasContext,
  //     draggingImage,
  //     dragOffset,
  //   ]
  // );

  // const stopDrawing = useCallback(() => {
  //   setIsDrawing(false);
  //   setDraggingImage(null);
  //   const ctx = getCanvasContext();
  //   if (ctx) {
  //     ctx.closePath();
  //     ctx.globalCompositeOperation = "source-over";
  //   }
  // }, [getCanvasContext]);

  /* -------------------- Text -------------------- */
  const handleKeyPress = useCallback(
    (e) => {
      if (!textToolActive) return;
      if (e.key === "Enter") {
        setTexts((prev) => [
          ...prev,
          {
            text: typedText,
            x: textPosition.x,
            y: textPosition.y,
            color: drawingColor,
            font: "20px Arial",
          },
        ]);
        setTextToolActive(false);
        setTypedText("");
        return;
      }
      if (e.key === "Backspace") {
        setTypedText((prev) => prev.slice(0, -1));
      } else if (e.key.length === 1) {
        setTypedText((prev) => prev + e.key);
      }
    },
    [textToolActive, typedText, textPosition, drawingColor]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  /* -------------------- Canvas setup -------------------- */
  const setCanvasSize = useCallback((node) => {
    if (!node) return;
    const dpr = window.devicePixelRatio || 1;
    const width = 800;
    const height = 600;

    node.width = Math.round(width * dpr);
    node.height = Math.round(height * dpr);
    node.style.width = `${width}px`;
    node.style.height = `${height}px`;

    const ctx = node.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);

    canvasRef.current = node;
  }, []);

  const clearCanvas = useCallback(() => {
    const ctx = getCanvasContext();
    if (ctx)
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setTexts([]);
    setUploadedImages([]);
  }, [getCanvasContext]);

  /* -------------------- Image Upload -------------------- */
  const handleImageUpload = (files) => {
    if (!files || files.length === 0) return;
    Array.from(files).forEach((file) => {
      const src = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        const maxSize = 200;
        if (width > maxSize || height > maxSize) {
          const scale = Math.min(maxSize / width, maxSize / height);
          width *= scale;
          height *= scale;
        }
        setUploadedImages((prev) => [
          ...prev,
          { src, x: 50, y: 50, width, height },
        ]);
      };
      img.src = src;
    });
  };

  /* -------------------- Redraw -------------------- */
  useEffect(() => {
    const ctx = getCanvasContext();
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Draw saved paths
    paths.forEach((path) => {
      ctx.beginPath();
      ctx.lineWidth = path.width;
      ctx.strokeStyle = path.tool === "pencil" ? path.color : "#fff";
      ctx.globalCompositeOperation =
        path.tool === "pencil" ? "source-over" : "destination-out";

      path.points.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();
      ctx.closePath();
      ctx.globalCompositeOperation = "source-over";
    });

    // Draw texts
    texts.forEach((t) => {
      ctx.font = t.font || "20px Arial";
      ctx.fillStyle = t.color || "#000";
      ctx.fillText(t.text, t.x, t.y);
    });

    // Live typing preview
    if (textToolActive && typedText) {
      ctx.font = "20px Arial";
      ctx.fillStyle = drawingColor;
      ctx.fillText(typedText, textPosition.x, textPosition.y);
    }

    // Draw uploaded images
    uploadedImages.forEach((img) => {
      const imageObj = new Image();
      imageObj.src = img.src;
      ctx.drawImage(imageObj, img.x, img.y, img.width, img.height);
    });
  }, [
    paths,
    texts,
    typedText,
    textToolActive,
    drawingColor,
    textPosition,
    uploadedImages,
    getCanvasContext,
  ]);

  useEffect(() => {
    if (id) {
      return;
    }
    const payload = new FormData();
    payload.append("licenses_id", licenses_id);
    api
      .post("whiteBoardlist", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {})
      .catch(({ response }) => {});
  }, [id]);

  /* -------------------- Save Drawing -------------------- */
  const handleSaveDrawing = useCallback(async () => {
    const canvas = canvasRef.current;
    if (canvas && drawingName.trim()) {
      const snapshot = canvas.toDataURL("image/png");
      const state = {
        name: drawingName.trim(),
        canvas: snapshot,
        uploadedImages,
        texts,
        toolSettings: { color: drawingColor, width: drawingWidth },
      };
      const payload = new FormData();
      payload.append("licenses_id", licenses_id);
      payload.append("name_key", state.name);
      payload.append("data", JSON.stringify(state));
      try {
        const { data } = await api.post("whiteBoardCreate", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (data.status) {
          toast.success(data.msg);
          setDrawingName("");
          setShowSaveModal(false);
          clearCanvas();
        } else {
          toast.error(data.msg);
        }
      } catch (err) {
        toast.error("Save failed");
      }
    }
  }, [
    drawingName,
    uploadedImages,
    texts,
    drawingColor,
    drawingWidth,
    clearCanvas,
  ]);

  const handleKeyboardChange = (input) => {
    setTypedText(input);
  };

  // const handleKeyboardKeyPress = (button) => {
  //   if (!textToolActive) return;

  //   if (button === "{enter}") {
  //     setTexts((prev) => [
  //       ...prev,
  //       {
  //         text: typedText,
  //         x: textPosition.x,
  //         y: textPosition.y,
  //         color: drawingColor,
  //         font: "20px Arial",
  //       },
  //     ]);
  //     setTextToolActive(false);
  //     setTypedText("");
  //   } else if (button === "{bksp}") {
  //     setTypedText((prev) => prev.slice(0, -1));
  //   } else if (button === "{space}") {
  //     setTypedText((prev) => prev + " ");
  //   }
  // };

  const handleKeyboardKeyPress = (button) => {
    if (button === "{enter}") {
      setTexts((prev) => [
        ...prev,
        {
          text: typedText,
          x: textPosition.x,
          y: textPosition.y,
          color: drawingColor,
          font: "20px Arial",
        },
      ]);
      setTextToolActive(false);
      setTypedText("");
    }
  };

  // ======================================================================handleKeyboardKeyPress

  const draw = (e) => {
    if (!isDrawing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const pos = pointerPos(e, rect);

    setPaths((prev) => {
      const copy = [...prev];
      copy[copy.length - 1].points.push(pos);
      return copy;
    });
  };

  const stopDrawing = () => setIsDrawing(false);

  useEffect(() => {
    getSetting(
      () => {},
      () => {},
      setSelectedLanguage,
      () => {},
      () => {},
      setLoader
    );
  }, []);

  return (
    <>
      <Header
        selectedLanguage={selectedLanguage}
        name={selectedLanguage === "English" ? "Whiteboard" : "Pizarra"}
      />
      {loader ? (
        <Loader />
      ) : (
        <div className="main-wrapper home-wrapper">
          <div className="flex flex-col items-center p-4 sm:p-6 lg:p-8">
            <Card className="w-full max-w-4xl flex flex-col">
              <CardHeader className="p-0">
                <div
                  ref={stripRef}
                  className="strip w-full overflow-x-auto no-scrollbar flex gap-2 p-2 bg-gray-50"
                >
                  {uploadedImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={img.src}
                      alt={`upload-${idx}`}
                      className="w-[100px] h-[100px] object-cover flex-shrink-0 rounded border"
                      draggable={false}
                    />
                  ))}
                </div>
              </CardHeader>
              <div className="relative w-full h-[600px] bg-white">
                <canvas
                  ref={setCanvasSize}
                  className="absolute inset-0 w-full h-full touch-none cursor-crosshair z-0"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                />
              </div>
              <CardContent className="relative z-10 flex flex-wrap items-center justify-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(tool === "pencil" && "bg-gray-100")}
                  onClick={() => setTool("pencil")}
                  title="Pencil"
                >
                  <Icon.Pencil className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  title="Upload image"
                  onClick={() => document.getElementById("imageUpload").click()}
                >
                  <Icon.Image className="w-5 h-5" />
                </Button>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) =>
                    handleImageUpload(Array.from(e.target.files))
                  }
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(tool === "eraser" && "bg-gray-100")}
                  onClick={() => setTool("eraser")}
                  title="Eraser"
                >
                  <Icon.Eraser className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setTool("text");
                    setTextToolActive(true);
                    setShowKeyboard((prev) => !prev);
                  }}
                  title="Virtual Keyboard"
                >
                  <Icon.Keyword className="w-5 h-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={clearCanvas}
                  title="Clear"
                >
                  <Icon.Trash className="w-5 h-5" />
                </Button>
                <div className="flex items-center gap-2 ml-2">
                  <label className="text-sm text-gray-600">Color</label>
                  <input
                    type="color"
                    value={drawingColor}
                    onChange={(e) => setDrawingColor(e.target.value)}
                    className="h-9 w-10 rounded border border-gray-200"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">Width</label>
                  <input
                    type="range"
                    min="1"
                    max="24"
                    value={drawingWidth}
                    onChange={(e) => setDrawingWidth(Number(e.target.value))}
                    className="w-32"
                  />
                  <span className="text-sm text-gray-700 w-6 text-center">
                    {drawingWidth}
                  </span>
                </div>
              </CardContent>
            </Card>
            {showKeyboard && (
              <div className="w-full max-w-4xl mt-4">
                <Keyboard
                  onChange={handleKeyboardChange}
                  onKeyPress={handleKeyboardKeyPress}
                  theme="hg-theme-default hg-layout-default myTheme"
                  layout={{
                    default: [
                      "q w e r t y u i o p",
                      "a s d f g h j k l",
                      "z x c v b n m",
                      "{bksp} {space} {enter}",
                    ],
                  }}
                  display={{
                    "{bksp}": "⌫",
                    "{enter}": "⏎",
                    "{space}": "Space",
                  }}
                />
              </div>
            )}

            <div className="w-full flex justify-between items-center mt-6">
              <Button
                className="thm-btn"
                onClick={() => setShowSaveModal(true)}
              >
                {selectedLanguage === "English"
                  ? "Save Whiteboard"
                  : "Guardar pizarra"}
              </Button>
              <Button
                className="thm-btn"
                onClick={() => navigate("/white-board-list")}
              >
                {selectedLanguage === "English" ? "View List" : "Ver lista"}
              </Button>
            </div>
            {showSaveModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                <div className="relative w-[800px] rounded-lg bg-white p-8 shadow-lg">
                  <div className="mb-4">
                    <h2 className="text-[32px] font-semibold">Save As</h2>
                  </div>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-4 items-center gap-3">
                      <input
                        id="drawingName"
                        type="text"
                        value={drawingName}
                        onChange={(e) => setDrawingName(e.target.value)}
                        className="col-span-5 h-12 rounded-lg border border-gray-200 bg-white px-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Enter drawing name"
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end gap-4">
                    <Button
                      variant="outline"
                      className="h-12 rounded-lg px-6 text-base"
                      onClick={() => setShowSaveModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="h-12 rounded-lg bg-blue-600 px-6 text-base text-white hover:bg-blue-700"
                      onClick={handleSaveDrawing}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
