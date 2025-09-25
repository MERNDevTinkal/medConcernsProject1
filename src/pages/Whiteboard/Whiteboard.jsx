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
export default function Whiteboard() {
  const navigate = useNavigate();
  const { id } = useParams();
  const canvasRef = useRef(null);
  const stripRef = useRef(null);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [paths, setPaths] = useState([]);
  const [typingAnchor, setTypingAnchor] = useState({ x: 0, y: 0 });

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
  const [showCursor, setShowCursor] = useState(true);

  const token = localStorage.getItem("token");
  const licenses_id = localStorage.getItem("license_key");

  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const [loader, setLoader] = useState(true);
  const [imageFiles, setImageFiles] = useState([]);
  const wrapperRef = useRef(null);
  const [caretY, setCaretY] = useState(0);

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

  useEffect(() => {
    if (!textToolActive) return;
    const blink = setInterval(() => setShowCursor((c) => !c), 500);
    return () => clearInterval(blink);
  }, [textToolActive]);

  /* -------------------- Canvas setup -------------------- */
  const setCanvasSize = useCallback((node) => {
    if (!node) return;
    const dpr = window.devicePixelRatio || 1;
    const width = 800;
    const height = 600;
    // actual pixel buffer
    node.width = Math.round(width * dpr);
    node.height = Math.round(height * dpr);
    // css size
    node.style.width = `${width}px`;
    node.style.height = `${height}px`;
    const ctx = node.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr); // now ctx coordinates are in CSS pixels

    canvasRef.current = node;
  }, []);

  /* -------------------- Drawing -------------------- */
  const startDrawing = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const pos = pointerPos(e, rect);
    if (tool !== "pencil" && tool !== "eraser") return;
    setIsDrawing(true);

    // start a new path in state
    setPaths((prev) => [
      ...prev,
      { tool, color: drawingColor, width: drawingWidth, points: [pos] },
    ]);

    // start path on the visible canvas context for immediate feedback
    const ctx = getCanvasContext();
    if (ctx) {
      ctx.beginPath();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = drawingWidth;
      ctx.strokeStyle = tool === "pencil" ? drawingColor : "#ffffff";
      ctx.moveTo(pos.x, pos.y);
    }
  };

  const draw = useCallback(
    (e) => {
      const rect = canvasRef.current.getBoundingClientRect();
      const pos = pointerPos(e, rect);

      if (draggingImage) {
        setUploadedImages((prev) =>
          prev.map((img) =>
            img === draggingImage
              ? { ...img, x: pos.x - dragOffset.x, y: pos.y - dragOffset.y }
              : img
          )
        );
        return;
      }

      if (!isDrawing || tool === "text") return;

      // update paths state (so redraw persists)
      setPaths((prev) => {
        if (prev.length === 0) return prev;
        const newPaths = [...prev];
        const lastPath = newPaths[newPaths.length - 1];
        newPaths[newPaths.length - 1] = {
          ...lastPath,
          points: [...lastPath.points, pos],
        };
        return newPaths;
      });
    },
    [
      isDrawing,
      drawingColor,
      drawingWidth,
      tool,
      getCanvasContext,
      draggingImage,
      dragOffset,
    ]
  );

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
    setDraggingImage(null);
    const ctx = getCanvasContext();
    if (ctx) {
      try {
        ctx.closePath();
      } catch (err) {}
      ctx.globalCompositeOperation = "source-over";
    }
  }, [getCanvasContext]);

  /* -------------------- Text helpers -------------------- */
  // this returns last line width and last line y to position the cursor
  const drawWrappedText = useCallback(
    (
      ctx,
      text,
      x,
      y,
      maxWidth,
      lineHeight,
      color = "#000",
      font = "20px Arial"
    ) => {
      if (!ctx) return { lastLineWidth: 0, lastLineY: y };
      ctx.font = font;
      // ctx.fillStyle = color;

      ctx.fillStyle = drawingColor;
      ctx.textBaseline = "top";

      const paragraphs = String(text).split("\n");
      let currentY = y;
      let lastW = 0;

      paragraphs.forEach((para) => {
        if (para === "") {
          currentY += lineHeight; // preserve empty line
          return;
        }

        let line = "";
        const chars = para.split(""); // character-level wrapping
        for (let n = 0; n < chars.length; n++) {
          const testLine = line + chars[n];
          const testWidth = ctx.measureText(testLine).width;
          if (testWidth > maxWidth && line) {
            ctx.fillText(line, x, currentY);
            line = chars[n];
            currentY += lineHeight;
          } else {
            line = testLine;
          }
        }
        if (line) {
          ctx.fillText(line, x, currentY);
          lastW = ctx.measureText(line).width;
          currentY += lineHeight;
        }
      });

      return { lastLineWidth: lastW, lastLineY: currentY - lineHeight };
    },
    []
  );

  /* -------------------- Redraw -------------------- */
  useEffect(() => {
    const ctx = getCanvasContext();
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    const rect = canvas.getBoundingClientRect();
    const cssWidth = rect.width;
    const cssHeight = rect.height;
    ctx.clearRect(0, 0, cssWidth, cssHeight);
    paths.forEach((path) => {
      if (!path.points || path.points.length === 0) return;
      ctx.beginPath();
      ctx.lineWidth = path.width;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = path.tool === "pencil" ? path.color : "#ffffff";
      ctx.globalCompositeOperation =
        path.tool === "pencil" ? "source-over" : "destination-out";

      ctx.moveTo(path.points[0].x, path.points[0].y);
      for (let i = 1; i < path.points.length; i++) {
        const p = path.points[i];
        ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
      ctx.closePath();
      ctx.globalCompositeOperation = "source-over";
    });

    // Draw saved texts with wrapping
    const canvasPaddingRight = 10;
    texts.forEach((t) => {
      const font = t.font || "20px Arial";
      const lineHeight = Math.round(parseInt(font, 10) * 1.2) || 24;
      const maxWidth = canvas.getBoundingClientRect().width - (t.x || 0) - 50;
      console.log("===>", maxWidth);
      drawWrappedText(
        ctx,
        t.text,
        t.x || 0,
        t.y || 0,
        maxWidth,
        lineHeight,
        t.color || "#000",
        font
      );
    });
    if (textToolActive) {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const font = "20px Arial";
      const lineHeight = 24;
      ctx.font = font;
      ctx.fillStyle = drawingColor;
      ctx.textBaseline = "top";
      const maxWidth =
        canvas.getBoundingClientRect().width - textPosition.x - 100;
      console.log("===>q314441", maxWidth);
      let cursorX = textPosition.x;
      let cursorY = textPosition.y;

      let lines = [];
      let line = "";

      for (let char of typedText) {
        if (char === "\n") {
          lines.push(line);
          line = "";
          continue;
        }

        const testLine = line + char;
        const testWidth = ctx.measureText(testLine).width;
        if (testWidth > maxWidth && line) {
          lines.push(line);
          line = char; // start new line
        } else {
          line = testLine;
        }
      }
      if (line) lines.push(line);

      // Draw lines
      cursorY = textPosition.y;
      for (let l of lines) {
        ctx.fillText(l, textPosition.x, cursorY);
        cursorY += lineHeight;
      }

      // Caret at end of last line
      cursorX =
        textPosition.x + ctx.measureText(lines[lines.length - 1] || "").width;

      if (showCursor) {
        ctx.beginPath();
        ctx.moveTo(cursorX, cursorY - lineHeight); // start at last line
        ctx.lineTo(cursorX, cursorY); // full height of line
        ctx.strokeStyle = drawingColor;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      setCaretY(cursorY);
    }
  }, [
    paths,
    texts,
    uploadedImages, // we keep dependency so if images change slider updates elsewhere
    typedText,
    textToolActive,
    drawingColor,
    textPosition,
    getCanvasContext,
    drawWrappedText,
  ]);

  /* -------------------- Fetch board -------------------- */
  useEffect(() => {
    if (!id) {
      setLoader(false);
      return;
    }
    const fetchBoard = async () => {
      const payload = new FormData();
      payload.append("white_id", id);
      payload.append("licenses_id", licenses_id);
      try {
        const { data } = await api.post("whiteBoardEdit", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data.status) {
          const savedObj = data?.data || {};
          setDrawingName(savedObj.name_key || "");

          // imageFiles from API (array of urls) -> keep only in slider
          if (Array.isArray(savedObj.imageFiles)) {
            const apiImages = savedObj.imageFiles.map((url) => ({
              src: url,
              x: 50,
              y: 50,
              width: 200,
              height: 200,
            }));
            setUploadedImages(apiImages);
          }

          const savedState = savedObj.data ? JSON.parse(savedObj.data) : {};
          if (savedState.paths) {
            setPaths(savedState.paths);
          }
          if (Array.isArray(savedState.texts)) {
            // normalize texts (provide defaults if missing)
            const apiTexts = savedState.texts
              .map((t) => {
                if (!t) return null;
                if (typeof t === "string") {
                  return {
                    text: t,
                    x: 50,
                    y: 50,
                    color: "#000",
                    font: "20px Arial",
                  };
                }
                return {
                  text: t.text || "",
                  x: typeof t.x === "number" ? t.x : 50,
                  y: typeof t.y === "number" ? t.y : 50,
                  color: t.color || "#000",
                  font: t.font || "20px Arial",
                };
              })
              .filter(Boolean);
            setTexts(apiTexts);
          }

          if (savedState.toolSettings) {
            setDrawingColor(savedState.toolSettings.color || "#000000");
            setDrawingWidth(savedState.toolSettings.width || 2);
          }
        }
      } catch (err) {
        console.error("Failed to fetch whiteboard:", err);
      } finally {
        setLoader(false);
      }
    };

    fetchBoard();
  }, [id, licenses_id, token]);

  /* -------------------- Save Drawing -------------------- */
  // const commitTypedText = useCallback(() => {
  //   if (!typedText.trim()) return null;

  //   const newText = {
  //     text: typedText,
  //     x: textPosition.x,
  //     y: textPosition.y,
  //     color: drawingColor,
  //     font: "20px Arial",
  //   };

  //   setTexts((prev) => [...prev, newText]);
  //   setTypedText(""); // clear current typing
  //   setTextToolActive(false); // end typing session
  //   setShowKeyboard(false);
  //   return newText;
  // }, [typedText, textPosition, drawingColor]);

  const commitTypedText = useCallback(() => {
    if (!typedText) return null; // allow spaces

    const newText = {
      text: typedText,
      x: textPosition.x,
      y: textPosition.y,
      color: drawingColor,
      font: "20px Arial",
    };

    setTexts((prev) => [...prev, newText]);
    setTypedText(""); // clear current typing
    setTextToolActive(false);
    setShowKeyboard(false);
    return newText;
  }, [typedText, textPosition, drawingColor]);

  const handleSaveDrawing = async () => {
    if (!drawingName.trim()) {
      alert("Please enter a drawing name");
      return;
    }
    let finalTexts = texts;
    if (typedText.trim() && textToolActive) {
      const newText = {
        text: typedText,
        x: textPosition.x,
        y: textPosition.y,
        color: drawingColor,
        font: "20px Arial",
      };
      finalTexts = [...texts, newText];
      setTexts(finalTexts);
      setTypedText("");
      setTextToolActive(false);
      setShowKeyboard(false);
    }

    const state = {
      name: drawingName.trim(),
      paths,
      texts: finalTexts,
      toolSettings: { color: drawingColor, width: drawingWidth },
    };

    const payload = new FormData();
    payload.append("licenses_id", licenses_id);
    payload.append("name_key", drawingName);
    payload.append("data", JSON.stringify(state));
    if (imageFiles && imageFiles.length > 0) {
      Array.from(imageFiles).forEach((file) => {
        payload.append("imageFiles[]", file);
      });
    }
    if (id && id !== "null") {
      payload.append("white_id", id);
    }

    try {
      const urlPath = id ? "whiteBoardUpdate" : "whiteBoardCreate";
      const { data } = await api.post(urlPath, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.status) {
        toast.success(data.msg, {
          autoClose: 1500,
          onclose: navigate("/white-board-list"),
        });
      } else {
        toast.error(data.msg, { autoClose: 1500 });
      }
    } catch (err) {
      console.error("Save error:", err.message);
      toast.error(err.message, { autoClose: 1500 });
    }
  };

  /* -------------------- Keyboard (physical + virtual) -------------------- */
  // virtual keyboard change sets typed text directly
  const handleKeyboardChange = (input) => {
    setTypedText(input);
  };

  // virtual keyboard key presses (special keys like enter, bksp, space)
  const handleKeyboardKeyPress = (button) => {
    // if keyboard library passes event object, handle gracefully
    if (!button) return;
    if (typeof button !== "string") return;

    if (button === "{enter}" || button === "{return}" || button === "Enter") {
      commitTypedText();
      return;
    }
    if (button === "{bksp}" || button === "{backspace}") {
      setTypedText((prev) => prev.slice(0, -1));
      return;
    }
    if (button === "{space}") {
      setTypedText((prev) => prev + " ");
      return;
    }
    // regular char
    setTypedText((prev) => prev + button);
  };

  // physical keyboard: attach listener only while text tool is active
  useEffect(() => {
    if (!textToolActive) return;

    const onKeyDown = (e) => {
      // don't intercept typing happening in other inputs/textareas/contenteditable
      const target = e.target;
      const tag = target && target.tagName && target.tagName.toUpperCase();
      if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable) {
        return;
      }

      // prevent default (space scroll, enter submit) when we're capturing text for whiteboard
      if (e.key === " " || e.key === "Enter" || e.key === "Backspace") {
        e.preventDefault();
      }

      // if (e.key === "Enter") {
      //   commitTypedText();
      //   return;
      // }
      if (e.key === "Enter") {
        e.preventDefault();
        setTypedText((prev) => prev + "\n");
        return;
      }

      if (e.key === "Backspace") {
        setTypedText((prev) => prev.slice(0, -1));
        return;
      }
      if (e.key.length === 1) {
        setTypedText((prev) => prev + e.key);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [textToolActive, commitTypedText]);

  /* -------------------- Image Upload -------------------- */
  const handleImageUpload = (files) => {
    if (!files || files.length === 0) return;
    Array.from(files).forEach((file) => {
      setImageFiles((prev) => [...prev, file]);
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

  /* -------------------- Misc: settings loader -------------------- */
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

  useEffect(() => {
    if (!wrapperRef.current) return;
    const { scrollTop, clientHeight } = wrapperRef.current;

    if (caretY > scrollTop + clientHeight - 30) {
      wrapperRef.current.scrollTop = caretY - clientHeight + 30;
    }

    if (caretY < scrollTop) {
      wrapperRef.current.scrollTop = caretY - 10;
    }
  }, [caretY]);
  const handleClick = (e) => {
    if (tool !== "text") return;

    // Commit current typing if exists
    if (typedText) {
      commitTypedText();
    }

    const rect = canvasRef.current.getBoundingClientRect();
    const pos = pointerPos(e, rect);

    // Check if click is inside an existing text block
    const found = texts.find((t) => {
      const font = t.font || "20px Arial";
      const lineHeight = Math.round(parseInt(font, 10) * 1.2) || 24;
      const lines = t.text.split("\n");
      const textHeight = lineHeight * lines.length;

      // measure width of widest line, fallback to full canvas width
      const maxLineWidth = lines.reduce((max, line) => {
        const w = getCanvasContext().measureText(line).width;
        return Math.max(max, w);
      }, 0);
      const textWidth = Math.max(maxLineWidth, 50); // fallback 50px for empty lines

      return (
        pos.x >= t.x &&
        pos.x <= t.x + textWidth &&
        pos.y >= t.y &&
        pos.y <= t.y + textHeight
      );
    });

    if (found) {
      // Remove old block so it doesn't overlap
      setTexts((prev) => prev.filter((t) => t !== found));

      // Start editing this block
      setTextPosition({ x: found.x, y: found.y });
      setTypedText(found.text);
    } else {
      // New block
      setTextPosition({ x: pos.x, y: pos.y });
      setTypedText("");
    }

    setTextToolActive(true);
    setShowKeyboard(true);
  };

  /* -------------------- JSX (no change to layout) -------------------- */
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Header
            selectedLanguage={selectedLanguage}
            name={selectedLanguage === "Spanish" ? "Pizarra" : "Whiteboard"}
          />

          <div className="main-wrapper home-wrapper h-[150px]">
            <div className="flex flex-col items-center p-4 sm:p-6 lg:p-8 ">
              <Card className="w-full max-w-4xl flex flex-col">
                {uploadedImages && uploadedImages.length > 0 && (
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
                )}
                <div
                  ref={wrapperRef}
                  className="relative w-full h-[150px] bg-white overflow-y-auto overflow-x-hidden"
                >
                  <canvas
                    ref={setCanvasSize}
                    className={` w-full touch-none  pt-5 z-0 ${
                      tool === "text" ? "cursor-text" : "cursor-crosshair"
                    }`}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    onClick={handleClick}
                    // onClick={(e) => {
                    //   if (tool === "text") {
                    //     if (typedText.trim()) {
                    //       commitTypedText();
                    //     }
                    //     const rect = canvasRef.current.getBoundingClientRect();
                    //     const pos = pointerPos(e, rect);
                    //     setTextPosition(pos);
                    //     setTextToolActive(true);
                    //     setShowKeyboard(true);
                    //     setTypedText("");
                    //   }
                    // }}
                    // onClick={(e) => {
                    //   if (tool === "text") {
                    //     if (typedText.trim()) {
                    //       commitTypedText();
                    //     }
                    //     const rect = canvasRef.current.getBoundingClientRect();
                    //     const pos = pointerPos(e, rect);
                    //     setTextPosition({ x: pos.x, y: pos.y });
                    //     setTextToolActive(true);
                    //     setShowKeyboard(true);
                    //     setTypedText("");
                    //   }
                    // }}
                  />
                </div>
                <CardContent className="relative z-10 flex flex-wrap items-center justify-center gap-3">
                  {/* toolbar (unchanged) */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(tool === "pencil" && "bg-gray-100")}
                    onClick={() => {
                      setTool("pencil");
                      setShowKeyboard(false);
                    }}
                    title="Pencil"
                  >
                    <Icon.Pencil className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    title="Upload image"
                    onClick={() =>
                      document.getElementById("imageUpload").click()
                    }
                  >
                    <Icon.Image className="w-5 h-5" />
                  </Button>
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      setTool("");
                      handleImageUpload(Array.from(e.target.files));
                    }}
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
                      if (textPosition.x === 0 && textPosition.y === 0) {
                        setTextPosition({ x: 20, y: 20 }); // default safe area inside canvas
                      }
                    }}
                    title="Virtual Keyboard"
                  >
                    <Icon.Keyword className="w-5 h-5" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setTypedText("");
                      setTexts([]);
                      setPaths([]);
                      setUploadedImages([]);
                      setTextToolActive(false);
                    }}
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
                    <label className="text-sm text-gray-600">
                      {selectedLanguage === "Spanish" ? "Ancho" : "Width"}
                    </label>
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
                  {selectedLanguage === "Spanish"
                    ? id
                      ? "Actualizar pizarra"
                      : "Guardar pizarra"
                    : id
                    ? "Update Whiteboard"
                    : "Save Whiteboard"}
                </Button>
                <Button
                  className="thm-btn"
                  onClick={() => navigate("/white-board-list")}
                >
                  {selectedLanguage === "Spanish" ? "Ver lista" : "View List"}
                </Button>
              </div>

              {showSaveModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                  <div className="relative w-[800px] rounded-lg bg-white p-8 shadow-lg">
                    <div className="mb-4">
                      <h2 className="text-[32px] font-semibold">
                        {selectedLanguage === "Spanish"
                          ? "Guardar como"
                          : "Save As"}
                      </h2>
                    </div>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-4 items-center gap-3">
                        <input
                          id="drawingName"
                          type="text"
                          value={drawingName}
                          onChange={(e) => setDrawingName(e.target.value)}
                          className="col-span-5 h-12 rounded-lg border border-gray-200 bg-white px-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                          placeholder={
                            selectedLanguage === "Spanish"
                              ? "Introduzca el nombre del dibujo"
                              : "Enter drawing name"
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-4">
                      <Button
                        variant="outline"
                        className="h-12 rounded-lg px-6 text-base"
                        onClick={() => setShowSaveModal(false)}
                      >
                        {selectedLanguage === "Spanish" ? "Cancelar" : "Cancel"}
                      </Button>
                      <Button
                        className="h-12 rounded-lg bg-blue-600 px-6 text-base text-white hover:bg-blue-700"
                        onClick={() => {
                          setShowSaveModal(false);
                          handleSaveDrawing();
                        }}
                      >
                        {selectedLanguage === "Spanish" ? "Ahorrar" : "Save"}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
}
