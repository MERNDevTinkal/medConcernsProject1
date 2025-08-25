"use client";
import React, { useState, useRef, useCallback } from "react";
import Header from "../../Component/Layout/Header/Header";
import Footer from "../../Component/Layout/Footer/Footer";
import { useNavigate } from "react-router-dom";

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
  <div
    className={cn("p-4 sm:p-5 border-b border-gray-200", className)}
    {...props}
  />
);

const CardTitle = ({ className = "", ...props }) => (
  <h3 className={cn("text-lg font-semibold", className)} {...props} />
);

const CardContent = ({ className = "", ...props }) => (
  <div className={cn("p-4 sm:p-5", className)} {...props} />
);

/* -------------------- Inline Icons (no packages) -------------------- */
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
  Type: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 7V5h16v2M10 19h4M12 7v12"
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
  Save: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <path
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 5h10l4 4v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"
      />
      <path strokeWidth="2" d="M9 5v6h6" />
    </svg>
  ),
  Whiteboard: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <rect x="3" y="4" width="18" height="12" rx="2" strokeWidth="2" />
      <path strokeWidth="2" strokeLinecap="round" d="M7 20l5-4 5 4" />
    </svg>
  ),
};

/* -------------------- Component -------------------- */
export default function Whiteboard() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingColor, setDrawingColor] = useState("#000000");
  const [drawingWidth, setDrawingWidth] = useState(2);
  const [tool, setTool] = useState("pencil"); // "pencil" | "eraser"
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [drawingName, setDrawingName] = useState("");
  const [savedDrawings, setSavedDrawings] = useState([]);

  const getCanvasContext = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");
    return ctx || null;
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
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [getCanvasContext]);

  const handleSaveDrawing = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas && drawingName.trim()) {
      const dataUrl = canvas.toDataURL("image/png");
      const newDrawing = {
        id: Date.now().toString(),
        name: drawingName.trim(),
        dataUrl,
      };
      setSavedDrawings((prev) => [newDrawing, ...prev]);
      let copydrawings = [...savedDrawings, newDrawing];

      localStorage.setItem("drwaings", JSON.stringify(copydrawings));
      setDrawingName("");
      setShowSaveModal(false);
      clearCanvas();
    }
  }, [drawingName, clearCanvas]);

  const openSaveModal = useCallback(() => setShowSaveModal(true), []);

  /* Ensure the canvas looks sharp on HiDPI screens */
  const setCanvasSize = useCallback((node) => {
    if (!node) return;
    const dpr = window.devicePixelRatio || 1;
    // Base CSS size is controlled by Tailwind below; here we sync internal bitmap
    const rect = node.getBoundingClientRect();
    node.width = Math.round(rect.width * dpr);
    node.height = Math.round(rect.height * dpr);
    const ctx = node.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
    canvasRef.current = node;
  }, []);

  return (
    <>
      <Header />
      <div className="main-wrapper home-wrapper">
        <div className="  from-blue-50 to-blue-100 flex flex-col items-center p-4 sm:p-6 lg:p-8">
          <Card className="w-full max-w-4xl overflow-hidden flex flex-col">
            <CardHeader className="p-0">
              <div className="relative w-full h-[220px] sm:h-[280px] md:h-[360px] bg-white">
                <canvas
                  ref={setCanvasSize}
                  className="absolute inset-0 w-full h-full touch-none cursor-crosshair"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                />
                {/* Placeholder */}
                {savedDrawings.length === 0 && (
                  <div className="absolute inset-0 grid place-items-center pointer-events-none text-gray-400">
                    <div className="flex flex-col items-center">
                      <Icon.Whiteboard className="w-16 h-16 mb-2" />
                      <span className="text-base">Write here</span>
                    </div>
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="flex flex-wrap items-center justify-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className={cn(tool === "pencil" && "bg-gray-100")}
                onClick={() => setTool("pencil")}
                aria-label="Pencil tool"
                title="Pencil"
              >
                <Icon.Pencil className="w-5 h-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                aria-label="Text (placeholder)"
                title="Text (placeholder)"
              >
                <Icon.Type className="w-5 h-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                aria-label="Image (placeholder)"
                title="Image (placeholder)"
              >
                <Icon.Image className="w-5 h-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className={cn(tool === "eraser" && "bg-gray-100")}
                onClick={() => setTool("eraser")}
                aria-label="Eraser tool"
                title="Eraser"
              >
                <Icon.Eraser className="w-5 h-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={clearCanvas}
                aria-label="Clear canvas"
                title="Clear"
              >
                <Icon.Trash className="w-5 h-5" />
              </Button>

              {/* Stroke color */}
              <div className="flex items-center gap-2 ml-2">
                <label className="text-sm text-gray-600">Color</label>
                <input
                  type="color"
                  value={drawingColor}
                  onChange={(e) => setDrawingColor(e.target.value)}
                  className="h-9 w-10 rounded border border-gray-200 overflow-hidden"
                />
              </div>

              {/* Stroke width */}
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

          <div className="w-full flex justify-between items-center  mt-6">
            <Button
              className="thm-btn"
              onClick={openSaveModal}
              title="Save Whiteboard"
            >
              Saved White Boards
            </Button>
            <Button
              className="thm-btn "
              onClick={() => {
                navigate("/white-board-list");
              }}
              title="Save Whiteboard"
            >
              View List
            </Button>
          </div>

          {/* Modal */}
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
    </>
  );
}
