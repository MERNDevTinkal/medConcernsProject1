"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import Header from "../../Component/Layout/Header/Header";
import Footer from "../../Component/Layout/Footer/Footer";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../Component/apiCall/apiCall";
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
  Whiteboard: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <rect x="3" y="4" width="18" height="12" rx="2" strokeWidth="2" />
      <path strokeWidth="2" strokeLinecap="round" d="M7 20l5-4 5 4" />
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
  const [searchParams] = useSearchParams();
  const canvasRef = useRef(null);
  const stripRef = useRef(null);

  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollRef = useRef(0);

  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingColor, setDrawingColor] = useState("#000000");
  const [drawingWidth, setDrawingWidth] = useState(2);
  const [tool, setTool] = useState("pencil");
  const [drawingName, setDrawingName] = useState("");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const token = sessionStorage.getItem("token");
  const [keyword, setKeyword] = useState("");

  const [textToolActive, setTextToolActive] = useState(false);
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState("");

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

  const activateTextTool = () => {
    setTool("text"); // new text tool
    setTextToolActive(true);
  };

  const handleCanvasClickForText = (e) => {
    if (!textToolActive) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTextPosition({ x, y });
    setTypedText(""); // reset text
  };

  const addKeyword = useCallback(
    (text) => {
      if (!text || !text.trim()) return;
      const canvas = canvasRef.current;
      const ctx = getCanvasContext();
      if (canvas && ctx) {
        ctx.font = "20px Arial";
        ctx.fillStyle = "#000000";
        ctx.fillText(text.trim(), canvas.width / 2 - 40, canvas.height / 2);
      }
      setKeyword(""); // clear input after adding
    },
    [getCanvasContext]
  );

  const handleKeyPress = useCallback(
    (e) => {
      if (!textToolActive) return;
      const canvas = canvasRef.current;
      const ctx = getCanvasContext();
      if (!canvas || !ctx) return;

      if (e.key === "Backspace") {
        setTypedText((prev) => prev.slice(0, -1));
      } else if (e.key.length === 1) {
        setTypedText((prev) => prev + e.key);
      }

      // redraw text
      ctx.clearRect(0, 0, canvas.width, canvas.height); // optional: only if you want fresh canvas
      ctx.font = "20px Arial";
      ctx.fillStyle = drawingColor;
      ctx.fillText(
        typedText + (e.key.length === 1 ? e.key : ""),
        textPosition.x,
        textPosition.y
      );
    },
    [textToolActive, textPosition, typedText, drawingColor, getCanvasContext]
  );
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);
  const startDrawing = useCallback(
    (e) => {
      const canvas = canvasRef.current;
      const ctx = getCanvasContext();
      if (!canvas || !ctx) return;
      const rect = canvas.getBoundingClientRect();
      const { x, y } = pointerPos(e, rect);

      setIsDrawing(true);
      ctx.beginPath();
      ctx.moveTo(x, y);
    },
    [getCanvasContext]
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
      // clear full logical canvas (consider DPR)
      ctx.clearRect(0, 0, canvas.width, canvas.height);
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

  /* -------------------- Image handling -------------------- */
  const handleImageUpload = (files) => {
    if (!files || files.length === 0) return;
    const newImages = files.map((file) => URL.createObjectURL(file));
    setUploadedImages((prev) => [...prev, ...newImages]);
  };

  /* -------------------- Drag-to-scroll handlers for strip -------------------- */
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    const onMouseDown = (e) => {
      isDraggingRef.current = true;
      strip.classList.add("strip--active");
      // use clientX and bounding rect for consistent coords
      const rect = strip.getBoundingClientRect();
      startXRef.current = e.clientX - rect.left;
      startScrollRef.current = strip.scrollLeft;
    };

    const onMouseMove = (e) => {
      if (!isDraggingRef.current) return;
      e.preventDefault();
      const rect = strip.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const walk = x - startXRef.current; // positive: moved right
      strip.scrollLeft = startScrollRef.current - walk;
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
      strip.classList.remove("strip--active");
    };

    const onMouseLeave = () => {
      isDraggingRef.current = false;
      strip.classList.remove("strip--active");
    };

    const onTouchStart = (e) => {
      isDraggingRef.current = true;
      const rect = strip.getBoundingClientRect();
      startXRef.current = e.touches[0].clientX - rect.left;
      startScrollRef.current = strip.scrollLeft;
    };

    const onTouchMove = (e) => {
      if (!isDraggingRef.current) return;
      const rect = strip.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const walk = x - startXRef.current;
      strip.scrollLeft = startScrollRef.current - walk;
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) > 0) {
        e.preventDefault();
        strip.scrollLeft += e.deltaY;
      }
    };

    // Attach listeners
    strip.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    strip.addEventListener("mouseleave", onMouseLeave);

    strip.addEventListener("touchstart", onTouchStart, { passive: true });
    strip.addEventListener("touchmove", onTouchMove, { passive: true });
    strip.addEventListener("touchend", onTouchEnd);

    // wheel needs passive: false to call preventDefault
    strip.addEventListener("wheel", onWheel, { passive: false });

    // cleanup
    return () => {
      strip.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      strip.removeEventListener("mouseleave", onMouseLeave);

      strip.removeEventListener("touchstart", onTouchStart);
      strip.removeEventListener("touchmove", onTouchMove);
      strip.removeEventListener("touchend", onTouchEnd);

      strip.removeEventListener("wheel", onWheel);
    };
  }, [uploadedImages]);

  /* -------------------- Load by ID (unchanged) -------------------- */
  useEffect(() => {
    const id = searchParams.get("id");
    if (!id) return;
    const fetchDrawing = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/whiteboards/${id}`);
        const data = await res.json();
        if (data?.image) {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");
          const img = new Image();
          img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          };
          img.src = data.image;
        }
      } catch (err) {
        console.error("Failed to load drawing", err);
      }
    };
    fetchDrawing();
  }, [searchParams]);

  const handleSaveDrawing = useCallback(async () => {
    const canvas = canvasRef.current;
    if (canvas && drawingName.trim()) {
      const dataUrl = canvas.toDataURL("image/png");
      const payload = new FormData();
      const licenses_id = sessionStorage.getItem("license_key");
      payload.append("licenses_id", licenses_id);
      payload.append("name_key", drawingName.trim());
      payload.append("image", dataUrl);
      try {
        api.post("whiteBoardCreate", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
            <CardHeader className="p-0">
              <div
                ref={stripRef}
                className="strip w-full overflow-x-auto no-scrollbar flex gap-2 p-2 bg-gray-50"
              >
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
                      className="col-span-5 h-12 w-full rounded-md border border-gray-300 px-3 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-700"
                    />
                  </div>
                </div>

                <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-center sm:space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowSaveModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="thm-btn"
                    onClick={handleSaveDrawing}
                    disabled={!drawingName.trim()}
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
      {/* inline CSS so you don't forget to add in global file */}
      <style>{`
        /* hide scrollbar but allow scroll */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* strip styling and grab cursor */
        .strip { cursor: grab; user-select: none; -webkit-user-select: none; -ms-user-select: none; }
        .strip--active { cursor: grabbing; }

        /* prevent images from being dragged as browser image drag */
        .strip img { -webkit-user-drag: none; user-drag: none; }
      `}</style>
    </>
  );
}
