"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import Header from "../../Component/Layout/Header/Header";
import Footer from "../../Component/Layout/Footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../Component/apiCall/apiCall";
import { toast } from "react-toastify";

/* -------------------- Helpers -------------------- */
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

  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingColor, setDrawingColor] = useState("#000000");
  const [drawingWidth, setDrawingWidth] = useState(2);
  const [tool, setTool] = useState("pencil");
  const [drawingName, setDrawingName] = useState("");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [texts, setTexts] = useState([]);
  const [textToolActive, setTextToolActive] = useState(false);
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState("");

  const token = sessionStorage.getItem("token");
  const licenses_id = sessionStorage.getItem("license_key");

  const getCanvasContext = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return canvas.getContext("2d");
  }, []);

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

  const startDrawing = useCallback(
    (e) => {
      if (tool !== "pencil" && tool !== "eraser") return;
      const canvas = canvasRef.current;
      const ctx = getCanvasContext();
      if (!canvas || !ctx) return;
      const rect = canvas.getBoundingClientRect();
      const { x, y } = pointerPos(e, rect);

      setIsDrawing(true);
      ctx.beginPath();
      ctx.moveTo(x, y);
    },
    [getCanvasContext, tool]
  );

  const draw = useCallback(
    (e) => {
      if (!isDrawing) return;
      const canvas = canvasRef.current;
      const ctx = getCanvasContext();
      if (!canvas || !ctx) return;

      const rect = canvas.getBoundingClientRect();
      const { x, y } = pointerPos(e, rect);

      ctx.lineTo(x, y);
      ctx.strokeStyle = tool === "pencil" ? drawingColor : "#ffffff";
      ctx.lineWidth = drawingWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.globalCompositeOperation =
        tool === "pencil" ? "source-over" : "destination-out";
      ctx.stroke();
    },
    [isDrawing, drawingColor, drawingWidth, tool, getCanvasContext]
  );

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
    const ctx = getCanvasContext();
    if (ctx) {
      ctx.closePath();
      ctx.globalCompositeOperation = "source-over";
    }
  }, [getCanvasContext]);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = getCanvasContext();
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setTexts([]);
    }
  }, [getCanvasContext]);

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

  /* -------------------- Image upload -------------------- */
  const handleImageUpload = (files) => {
    if (!files || files.length === 0) return;
    const newImages = files.map((file) => URL.createObjectURL(file));
    setUploadedImages((prev) => [...prev, ...newImages]);
  };

  /* -------------------- Text tool -------------------- */
  const activateTextTool = () => {
    setTool("text");
    setTextToolActive(true);
  };

  const handleCanvasClickForText = (e) => {
    if (!textToolActive) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTextPosition({ x, y });
    setTypedText("");
  };

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
          },
        ]);
        setTypedText("");
        setTextToolActive(false);
      } else if (e.key === "Backspace") {
        setTypedText((prev) => prev.slice(0, -1));
      } else if (e.key.length === 1) {
        setTypedText((prev) => prev + e.key);
      }
    },
    [textToolActive, textPosition, typedText, drawingColor]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  /* -------------------- Redraw everything -------------------- */
  useEffect(() => {
    const ctx = getCanvasContext();
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Draw texts
    texts.forEach((t) => {
      ctx.font = "20px Arial";
      ctx.fillStyle = t.color || "#000";
      ctx.fillText(t.text, t.x, t.y);
    });

    // Draw typing text
    if (textToolActive && typedText) {
      ctx.font = "20px Arial";
      ctx.fillStyle = drawingColor;
      ctx.fillText(typedText, textPosition.x, textPosition.y);
    }
  }, [
    texts,
    typedText,
    textToolActive,
    drawingColor,
    textPosition,
    getCanvasContext,
  ]);

  /* -------------------- Fetch drawing if ID -------------------- */
  useEffect(() => {
    if (!id) return;
    const fetchDrawing = () => {
      try {
        const payload = new FormData();
        payload.append("licenses_id", licenses_id);
        payload.append("search_key", id);
        api
          .post("whiteBoardlist", payload, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(({ data }) => {
            if (data?.data[0]?.image) {
              const canvas = canvasRef.current;
              const ctx = canvas.getContext("2d");
              const img = new Image();
              img.onload = () => {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              };
              img.src = data?.data[0]?.image;
            }
          })
          .catch(({ response }) => {
            toast.error(response.data.message || response.data.msg, {
              autoClose: 1500,
            });
          });
      } catch (err) {
        console.error("Failed to load drawing", err);
      }
    };
    fetchDrawing();
  }, [id]);

  /* -------------------- Save -------------------- */
  const handleSaveDrawing = useCallback(async () => {
    const canvas = canvasRef.current;
    if (canvas && drawingName.trim()) {
      const dataUrl = canvas.toDataURL("image/png");
      const payload = new FormData();
      payload.append("licenses_id", licenses_id);
      payload.append("name_key", drawingName.trim());
      payload.append("image", dataUrl);
      try {
        api
          .post("whiteBoardCreate", payload, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(({ data }) => {
            if (data.status) {
              toast.success(data.msg, {
                autoClose: 1500,
                onClose: navigate("/white-board-list"),
              });
            } else {
              toast.error(data.msg, { autoClose: 1500 });
            }
          })
          .catch(({ response }) => {
            toast.error(response.data.message || response.data.msg, {
              autoClose: 1500,
            });
          });
        setDrawingName("");
        setShowSaveModal(false);
        clearCanvas();
      } catch (err) {
        console.error("Save failed", err);
      }
    }
  }, [drawingName, clearCanvas]);

  return (
    <>
      <Header />
      <div className="main-wrapper home-wrapper">
        <div className="flex flex-col items-center p-4 sm:p-6 lg:p-8">
          <Card className="w-full max-w-4xl flex flex-col">
            {/* Top strip for images only */}
            <CardHeader className="p-0">
              <div className="strip w-full overflow-x-auto no-scrollbar flex gap-2 p-2 bg-gray-50">
                {uploadedImages.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`upload-${idx}`}
                    className="w-[150px] h-[150px] object-cover flex-shrink-0 rounded border"
                    draggable={false}
                  />
                ))}
              </div>
            </CardHeader>

            {/* Canvas */}
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
                onClick={handleCanvasClickForText}
              />
            </div>

            {/* Tools */}
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
              <Button
                variant="ghost"
                size="icon"
                onClick={activateTextTool}
                title="Text Tool"
              >
                <Icon.Keyword className="w-5 h-5" />
              </Button>

              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleImageUpload(Array.from(e.target.files))}
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

          {/* Save / View buttons */}
          <div className="w-full flex justify-between items-center mt-6">
            <Button className="thm-btn" onClick={() => setShowSaveModal(true)}>
              Save Whiteboard
            </Button>
            <Button
              className="thm-btn"
              onClick={() => navigate("/white-board-list")}
            >
              View List
            </Button>
          </div>

          {/* Save Modal */}
          {showSaveModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
              <div className="relative w-[800px] rounded-lg bg-white p-8 shadow-lg">
                <div className="mb-4">
                  <h2 className="text-[32px] font-semibold">Save As</h2>
                </div>
                <div className="grid gap-4">
                  <input
                    id="drawingName"
                    type="text"
                    value={drawingName}
                    onChange={(e) => setDrawingName(e.target.value)}
                    placeholder="Enter drawing name"
                    className="h-12 w-full rounded-md border px-3"
                  />
                </div>
                <div className="mt-6 flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="thm-btn thm-btn-outline"
                    onClick={() => setShowSaveModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    className="thm-btn"
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
      <Footer />
    </>
  );
}
