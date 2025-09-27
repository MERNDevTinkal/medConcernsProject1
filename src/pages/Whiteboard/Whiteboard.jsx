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
  const [cursorPosition, setCursorPosition] = useState({ line: 0, column: 0 });
  const [textLines, setTextLines] = useState([""]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingColor, setDrawingColor] = useState("#000000");
  const [drawingWidth, setDrawingWidth] = useState(2);
  const [tool, setTool] = useState("pencil");
  const [drawingName, setDrawingName] = useState("");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]); // {src,x,y,width,height}
  const [texts, setTexts] = useState([]);
  const [cursorIndex, setCursorIndex] = useState(0);
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
  const [textBlocks, setTextBlocks] = useState([]); // {id, x, y, text, width, height}
  const [activeTextBlock, setActiveTextBlock] = useState(null);

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

  const drawFlowingText = useCallback(
    (
      ctx,
      text,
      startX,
      startY,
      maxWidth,
      lineHeight,
      color = "#000",
      font = "20px Arial"
    ) => {
      if (!ctx) return { lines: [], height: 0, width: 0 };

      ctx.font = font;
      ctx.fillStyle = color;
      ctx.textBaseline = "top";

      const words = text.split(" ");
      const lines = [];
      let currentLine = "";
      let currentY = startY;
      let maxLineWidth = 0;

      for (let i = 0; i < words.length; i++) {
        const testLine = currentLine ? currentLine + " " + words[i] : words[i];
        const testWidth = ctx.measureText(testLine).width;

        // If line exceeds max width and we have content, start new line
        if (testWidth > maxWidth && currentLine) {
          // Draw the current line
          ctx.fillText(currentLine, startX, currentY);
          lines.push({
            text: currentLine,
            x: startX,
            y: currentY,
            width: ctx.measureText(currentLine).width,
            height: lineHeight,
          });

          maxLineWidth = Math.max(
            maxLineWidth,
            ctx.measureText(currentLine).width
          );
          currentLine = words[i]; // Start new line with current word
          currentY += lineHeight;
        } else {
          currentLine = testLine;
        }
      }

      // Draw the last line
      if (currentLine) {
        // Check if last line also exceeds width
        const lastLineWidth = ctx.measureText(currentLine).width;
        if (lastLineWidth > maxWidth) {
          // Break the last word if needed
          const characters = currentLine.split("");
          let brokenLine = "";
          for (let char of characters) {
            const testBrokenLine = brokenLine + char;
            if (ctx.measureText(testBrokenLine).width > maxWidth) {
              if (brokenLine) {
                ctx.fillText(brokenLine, startX, currentY);
                lines.push({
                  text: brokenLine,
                  x: startX,
                  y: currentY,
                  width: ctx.measureText(brokenLine).width,
                  height: lineHeight,
                });
                maxLineWidth = Math.max(
                  maxLineWidth,
                  ctx.measureText(brokenLine).width
                );
                currentY += lineHeight;
              }
              brokenLine = char;
            } else {
              brokenLine = testBrokenLine;
            }
          }
          if (brokenLine) {
            ctx.fillText(brokenLine, startX, currentY);
            lines.push({
              text: brokenLine,
              x: startX,
              y: currentY,
              width: ctx.measureText(brokenLine).width,
              height: lineHeight,
            });
            maxLineWidth = Math.max(
              maxLineWidth,
              ctx.measureText(brokenLine).width
            );
          }
        } else {
          ctx.fillText(currentLine, startX, currentY);
          lines.push({
            text: currentLine,
            x: startX,
            y: currentY,
            width: lastLineWidth,
            height: lineHeight,
          });
          maxLineWidth = Math.max(maxLineWidth, lastLineWidth);
        }
      }

      const totalHeight = currentY + lineHeight - startY;

      return {
        lines,
        height: totalHeight,
        width: maxLineWidth,
        lastY: currentY,
      };
    },
    []
  );
  const getTextMetrics = useCallback((text, font = "20px Arial") => {
    const canvas = canvasRef.current;
    if (!canvas) return { lines: [text], lineWidths: [0] };

    const ctx = canvas.getContext("2d");
    ctx.font = font;

    const words = text.split(" ");
    const lines = [];
    const lineWidths = [];
    let currentLine = "";
    const maxWidth = 700;

    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine ? currentLine + " " + words[i] : words[i];
      const metrics = ctx.measureText(testLine);

      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine);
        lineWidths.push(ctx.measureText(currentLine).width);
        currentLine = words[i];
      } else {
        currentLine = testLine;
      }
    }

    if (currentLine) {
      lines.push(currentLine);
      lineWidths.push(ctx.measureText(currentLine).width);
    }

    return { lines, lineWidths };
  }, []);

  const findNonOverlappingPosition = useCallback(
    (clickX, clickY) => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: clickX, y: clickY };

      const rect = canvas.getBoundingClientRect();
      const padding = 20;
      const lineHeight = 24;

      const canvasWidth = rect.width;
      const canvasHeight = rect.height;

      let bestX = Math.max(
        padding,
        Math.min(clickX, canvasWidth - padding - 50)
      );
      let bestY = Math.max(
        padding,
        Math.min(clickY, canvasHeight - padding - 50)
      );

      const allBlocks = [...textBlocks];
      if (activeTextBlock && typedText.trim()) {
        allBlocks.push(activeTextBlock);
      }

      const sortedBlocks = [...allBlocks].sort((a, b) => a.y - b.y);

      for (let i = 0; i < sortedBlocks.length; i++) {
        const block = sortedBlocks[i];
        const blockBottom = block.y + (block.height || lineHeight) + padding;

        if (bestY < blockBottom && Math.abs(bestX - block.x) < 300) {
          bestY = blockBottom;
        }
      }

      bestY = Math.min(bestY, canvasHeight - lineHeight * 3 - padding);
      bestX = Math.min(bestX, canvasWidth - 100);

      return { x: bestX, y: bestY };
    },
    [textBlocks, activeTextBlock, typedText]
  );

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
    node.width = Math.round(width * dpr);
    node.height = Math.round(height * dpr);
    node.style.width = `${width}px`;
    node.style.height = `${height}px`;
    const ctx = node.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
    canvasRef.current = node;
  }, []);

  /* -------------------- Drawing -------------------- */
  const startDrawing = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const pos = pointerPos(e, rect);
    if (tool !== "pencil" && tool !== "eraser") return;
    setIsDrawing(true);

    setPaths((prev) => [
      ...prev,
      { tool, color: drawingColor, width: drawingWidth, points: [pos] },
    ]);

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
    [isDrawing, tool, draggingImage, dragOffset]
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
  // const drawWrappedText = useCallback(
  //   (
  //     ctx,
  //     text,
  //     x,
  //     y,
  //     maxWidth,
  //     lineHeight,
  //     color = "#000",
  //     font = "20px Arial"
  //   ) => {
  //     if (!ctx) return { lastLineWidth: 0, lastLineY: y, lines: [] };

  //     ctx.font = font;
  //     ctx.fillStyle = color;
  //     ctx.textBaseline = "top";

  //     const paragraphs = String(text).split("\n");
  //     let currentY = y;
  //     let lastW = 0;
  //     const lines = [];

  //     paragraphs.forEach((paragraph) => {
  //       const words = paragraph.split(" ");
  //       let currentLine = "";

  //       for (let i = 0; i < words.length; i++) {
  //         const word = words[i];
  //         const testLine = currentLine ? currentLine + " " + word : word;
  //         const testWidth = ctx.measureText(testLine).width;

  //         if (testWidth > maxWidth && currentLine) {
  //           // Word wrap: draw current line and start new one
  //           ctx.fillText(currentLine, x, currentY);
  //           lines.push({
  //             text: currentLine,
  //             x: x,
  //             y: currentY,
  //             width: ctx.measureText(currentLine).width,
  //           });
  //           currentLine = word;
  //           currentY += lineHeight;
  //         } else {
  //           currentLine = testLine;
  //         }
  //       }

  //       // Draw the last line of the paragraph
  //       if (currentLine) {
  //         ctx.fillText(currentLine, x, currentY);
  //         lastW = ctx.measureText(currentLine).width;
  //         lines.push({
  //           text: currentLine,
  //           x: x,
  //           y: currentY,
  //           width: lastW,
  //         });
  //         currentY += lineHeight;
  //       }

  //       // Add space between paragraphs
  //       currentY += lineHeight * 0.3;
  //     });

  //     return { lastLineWidth: lastW, lastLineY: currentY - lineHeight, lines };
  //   },
  //   []
  // );
  const drawWrappedText = useCallback(
    (ctx, text, x, y, lineHeight, color = "#000", font = "20px Arial") => {
      const maxWidth = 720; // fixed width
      if (!ctx) return { lastLineWidth: 0, lastLineY: y, lines: [] };

      ctx.font = font;
      ctx.fillStyle = color;
      ctx.textBaseline = "top";

      const paragraphs = String(text).split("\n");
      let currentY = y;
      let lastW = 0;
      const lines = [];

      paragraphs.forEach((paragraph) => {
        const words = paragraph.split(" ");
        let currentLine = "";

        for (let i = 0; i < words.length; i++) {
          const word = words[i];
          const testLine = currentLine ? currentLine + " " + word : word;
          const testWidth = ctx.measureText(testLine).width;

          if (testWidth > maxWidth && currentLine) {
            ctx.fillText(currentLine, x, currentY);
            lines.push({ text: currentLine, x, y: currentY });
            currentLine = word;
            currentY += lineHeight;
          } else {
            currentLine = testLine;
          }
        }

        if (currentLine) {
          ctx.fillText(currentLine, x, currentY);
          lastW = ctx.measureText(currentLine).width;
          lines.push({ text: currentLine, x, y: currentY });
          currentY += lineHeight;
        }

        currentY += lineHeight * 0.3; // spacing between paragraphs
      });

      return { lastLineWidth: lastW, lastLineY: currentY - lineHeight, lines };
    },
    []
  );

  /* -------------------- Redraw -------------------- */
  /* -------------------- Redraw -------------------- */
  // useEffect(() => {
  //   const ctx = getCanvasContext();
  //   const canvas = canvasRef.current;
  //   if (!ctx || !canvas) return;

  //   const rect = canvas.getBoundingClientRect();
  //   const cssWidth = rect.width;
  //   const cssHeight = rect.height;

  //   ctx.clearRect(0, 0, cssWidth, cssHeight);

  //   // Draw paths
  //   paths.forEach((path) => {
  //     if (!path.points || path.points.length === 0) return;
  //     ctx.beginPath();
  //     ctx.lineWidth = path.width;
  //     ctx.lineCap = "round";
  //     ctx.lineJoin = "round";
  //     ctx.strokeStyle = path.tool === "pencil" ? path.color : "#ffffff";
  //     ctx.globalCompositeOperation =
  //       path.tool === "pencil" ? "source-over" : "destination-out";
  //     ctx.moveTo(path.points[0].x, path.points[0].y);
  //     for (let i = 1; i < path.points.length; i++) {
  //       ctx.lineTo(path.points[i].x, path.points[i].y);
  //     }
  //     ctx.stroke();
  //     ctx.closePath();
  //     ctx.globalCompositeOperation = "source-over";
  //   });

  //   // Draw existing text blocks with word wrapping
  //   // textBlocks.forEach((block) => {
  //   //   if (activeTextBlock && block.id === activeTextBlock.id) return;

  //   //   const font = block.font || "20px Arial";
  //   //   const lineHeight = 24;
  //   //   const maxWidth = cssWidth - block.x - 20;

  //   //   ctx.font = font;
  //   //   ctx.fillStyle = block.color || "#000";
  //   //   ctx.textBaseline = "top";

  //   //   let currentY = block.y;

  //   //   const paragraphs = block.text.split("\n");

  //   //   paragraphs.forEach((paragraph) => {
  //   //     const words = paragraph.split(" ");
  //   //     let currentLine = "";

  //   //     for (let i = 0; i < words.length; i++) {
  //   //       const word = words[i];
  //   //       const testLine = currentLine ? currentLine + " " + word : word;
  //   //       const testWidth = ctx.measureText(testLine).width;

  //   //       if (testWidth > maxWidth && currentLine) {
  //   //         ctx.fillText(currentLine, block.x, currentY);
  //   //         currentLine = word;
  //   //         currentY += lineHeight;

  //   //         if (currentY > cssHeight - lineHeight) return;
  //   //       } else {
  //   //         currentLine = testLine;
  //   //       }
  //   //     }

  //   //     if (currentLine) {
  //   //       ctx.fillText(currentLine, block.x, currentY);
  //   //       currentY += lineHeight;

  //   //       if (currentY > cssHeight - lineHeight) return;
  //   //     }

  //   //     currentY += lineHeight * 0.3;
  //   //   });
  //   // });
  //   textBlocks.forEach((block) => {
  //     if (activeTextBlock && block.id === activeTextBlock.id) return;
  //     drawWrappedText(
  //       ctx,
  //       block.text,
  //       block.x,
  //       block.y,
  //       24,
  //       block.color || "#000",
  //       block.font || "20px Arial"
  //     );
  //   });

  //   // Draw active text with cursor and word wrapping
  //   // Draw active text with cursor and word wrapping
  //   if (textToolActive && activeTextBlock) {
  //     const font = "20px Arial";
  //     const lineHeight = 24;

  //     ctx.font = font;
  //     ctx.fillStyle = drawingColor;
  //     ctx.textBaseline = "top";

  //     // Join all lines (so wrapping works)
  //     const fullText = textLines.join("\n");

  //     // Use your drawWrappedText helper
  //     const { lines } = drawWrappedText(
  //       ctx,
  //       fullText,
  //       activeTextBlock.x,
  //       activeTextBlock.y,
  //       lineHeight,
  //       drawingColor,
  //       font
  //     );

  //     // --- Cursor position calculation ---
  //     let cursorX = activeTextBlock.x;
  //     let cursorY = activeTextBlock.y;

  //     let charCount = 0;
  //     for (let i = 0; i < lines.length; i++) {
  //       const lineText = lines[i].text;
  //       if (
  //         cursorPosition.line === i || // if cursor is on this wrapped line
  //         charCount + lineText.length >= cursorIndex
  //       ) {
  //         const beforeCursor = lineText.slice(
  //           0,
  //           cursorPosition.column - charCount
  //         );
  //         cursorX = activeTextBlock.x + ctx.measureText(beforeCursor).width;
  //         cursorY = lines[i].y;
  //         break;
  //       }
  //       charCount += lineText.length;
  //     }

  //     if (showCursor) {
  //       ctx.beginPath();
  //       ctx.moveTo(cursorX, cursorY);
  //       ctx.lineTo(cursorX, cursorY + lineHeight);
  //       ctx.strokeStyle = drawingColor;
  //       ctx.lineWidth = 2;
  //       ctx.stroke();
  //     }

  //     setCaretY(Math.min(cursorY + lineHeight, cssHeight - lineHeight));
  //   }
  // }, [
  //   paths,
  //   textBlocks,
  //   activeTextBlock,
  //   textLines,
  //   textToolActive,
  //   drawingColor,
  //   cursorPosition,
  //   showCursor,
  //   getCanvasContext,
  // ]);
  useEffect(() => {
    const ctx = getCanvasContext();
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    const rect = canvas.getBoundingClientRect();
    const cssWidth = rect.width;
    const cssHeight = rect.height;
    ctx.clearRect(0, 0, cssWidth, cssHeight);

    // --- Draw paths ---
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

    // --- Draw saved texts with wrapping (fixed 720px width) ---
    texts.forEach((t) => {
      const font = t.font || "20px Arial";
      const lineHeight = Math.round(parseInt(font, 10) * 1.2) || 24;
      const maxWidth = 720; // fixed wrap width
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
      const font = "20px Arial";
      const lineHeight = 24;
      ctx.font = font;
      ctx.fillStyle = drawingColor;
      ctx.textBaseline = "top";

      const maxWidth = 680;
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
    uploadedImages,
    typedText,
    textToolActive,
    drawingColor,
    textPosition,
    getCanvasContext,
    drawWrappedText,
    showCursor,
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

  const commitTypedText = useCallback(() => {
    if (!activeTextBlock) return;

    const textContent = textLines.join("\n");

    // Only commit if we have meaningful changes
    if (textContent !== activeTextBlock.text || textContent.trim() !== "") {
      const committedBlock = {
        ...activeTextBlock,
        text: textContent,
        timestamp: Date.now(),
      };

      setTextBlocks((prev) => {
        const existingIndex = prev.findIndex(
          (block) => block.id === activeTextBlock.id
        );

        if (existingIndex >= 0) {
          // Update existing block
          const updated = [...prev];
          updated[existingIndex] = committedBlock;
          return updated;
        } else {
          // Add new block only if it has content
          if (textContent.trim()) {
            return [...prev, committedBlock];
          }
          return prev; // Don't add empty blocks
        }
      });
    }

    // Clear active editing state
    setActiveTextBlock(null);
    setTextLines([""]);
    setTypedText("");
    setCursorPosition({ line: 0, column: 0 });
    setTextToolActive(false);
    setShowKeyboard(false);
  }, [activeTextBlock, textLines]);

  const handleSaveDrawing = async () => {
    if (!drawingName.trim()) {
      alert("Please enter a drawing name");
      return;
    }

    // Commit any active text before saving
    if (activeTextBlock) {
      commitTypedText();
    }

    const state = {
      name: drawingName.trim(),
      paths,
      texts: textBlocks.filter((block) => block.text.trim() !== ""), // Only save non-empty blocks
      toolSettings: {
        color: drawingColor,
        width: drawingWidth,
      },
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
    setCursorIndex(input.length); // Update cursor position to end
  };

  // virtual keyboard key presses (special keys like enter, bksp, space)
  const handleKeyboardKeyPress = (button) => {
    if (!button) return;

    switch (button) {
      case "{enter}":
      case "{return}":
      case "Enter":
        // Insert newline at cursor position - Microsoft Word style
        const newLines = [...textLines];

        // If we're at the end of a line, just add a new empty line
        if (cursorPosition.column === newLines[cursorPosition.line].length) {
          newLines.splice(cursorPosition.line + 1, 0, "");
          setTextLines(newLines);
          setCursorPosition({
            line: cursorPosition.line + 1,
            column: 0,
          });
        } else {
          // If we're in the middle of a line, split it
          const currentLine = newLines[cursorPosition.line];
          const beforeCursor = currentLine.slice(0, cursorPosition.column);
          const afterCursor = currentLine.slice(cursorPosition.column);

          newLines[cursorPosition.line] = beforeCursor;
          newLines.splice(cursorPosition.line + 1, 0, afterCursor);

          setTextLines(newLines);
          setCursorPosition({
            line: cursorPosition.line + 1,
            column: 0,
          });
        }
        setTypedText(newLines.join("\n"));
        break;

      case "{bksp}":
      case "{backspace}":
        handleBackspace();
        break;

      case "{space}":
        insertTextAtCursor(" ");
        break;

      default:
        if (button.length === 1) {
          insertTextAtCursor(button);
        }
        break;
    }
  };

  const insertTextAtCursor = (text) => {
    const newLines = [...textLines];
    const currentLine = newLines[cursorPosition.line] || "";

    newLines[cursorPosition.line] =
      currentLine.slice(0, cursorPosition.column) +
      text +
      currentLine.slice(cursorPosition.column);

    setTextLines(newLines);
    setCursorPosition((prev) => ({
      ...prev,
      column: prev.column + text.length,
    }));
    setTypedText(newLines.join("\n"));
  };

  const handleBackspace = () => {
    const newLines = [...textLines];
    const currentLine = newLines[cursorPosition.line] || "";

    if (cursorPosition.column > 0) {
      // Delete character within the same line - Microsoft Word style
      newLines[cursorPosition.line] =
        currentLine.slice(0, cursorPosition.column - 1) +
        currentLine.slice(cursorPosition.column);

      setTextLines(newLines);
      setCursorPosition((prev) => ({
        ...prev,
        column: prev.column - 1,
      }));
      setTypedText(newLines.join("\n"));
    } else if (cursorPosition.line > 0) {
      // Only merge with previous line if both lines are empty or it makes sense
      const prevLine = newLines[cursorPosition.line - 1];
      const currentLine = newLines[cursorPosition.line];

      // Microsoft Word behavior: only merge if it makes sense
      // Don't automatically merge when backspacing at beginning of line
      // Instead, just move cursor to end of previous line
      setCursorPosition({
        line: cursorPosition.line - 1,
        column: prevLine.length,
      });
    }
  };

  // physical keyboard: attach listener only while text tool is active
  useEffect(() => {
    if (!textToolActive) return;

    const onKeyDown = (e) => {
      if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
      e.preventDefault();

      switch (e.key) {
        case "Backspace":
          handleBackspace();
          break;

        case "Delete":
          handleDelete();
          break;

        case "Enter":
          // Microsoft Word style Enter key
          const newLines = [...textLines];

          if (cursorPosition.column === newLines[cursorPosition.line].length) {
            // At end of line - add new empty line
            newLines.splice(cursorPosition.line + 1, 0, "");
            setTextLines(newLines);
            setCursorPosition({
              line: cursorPosition.line + 1,
              column: 0,
            });
          } else {
            // In middle of line - split the line
            const currentLine = newLines[cursorPosition.line];
            const beforeCursor = currentLine.slice(0, cursorPosition.column);
            const afterCursor = currentLine.slice(cursorPosition.column);

            newLines[cursorPosition.line] = beforeCursor;
            newLines.splice(cursorPosition.line + 1, 0, afterCursor);

            setTextLines(newLines);
            setCursorPosition({
              line: cursorPosition.line + 1,
              column: 0,
            });
          }
          setTypedText(newLines.join("\n"));
          break;

        case "ArrowLeft":
          if (cursorPosition.column > 0) {
            setCursorPosition((prev) => ({
              ...prev,
              column: prev.column - 1,
            }));
          } else if (cursorPosition.line > 0) {
            // Move to end of previous line
            setCursorPosition({
              line: cursorPosition.line - 1,
              column: textLines[cursorPosition.line - 1].length,
            });
          }
          break;

        case "ArrowRight":
          const currentLineLength = textLines[cursorPosition.line]?.length || 0;
          if (cursorPosition.column < currentLineLength) {
            setCursorPosition((prev) => ({
              ...prev,
              column: prev.column + 1,
            }));
          } else if (cursorPosition.line < textLines.length - 1) {
            // Move to beginning of next line
            setCursorPosition({
              line: cursorPosition.line + 1,
              column: 0,
            });
          }
          break;

        case "ArrowUp":
          if (cursorPosition.line > 0) {
            const prevLineLength =
              textLines[cursorPosition.line - 1]?.length || 0;
            // Maintain similar column position in previous line
            const newColumn = Math.min(cursorPosition.column, prevLineLength);
            setCursorPosition({
              line: cursorPosition.line - 1,
              column: newColumn,
            });
          }
          break;

        case "ArrowDown":
          if (cursorPosition.line < textLines.length - 1) {
            const nextLineLength =
              textLines[cursorPosition.line + 1]?.length || 0;
            // Maintain similar column position in next line
            const newColumn = Math.min(cursorPosition.column, nextLineLength);
            setCursorPosition({
              line: cursorPosition.line + 1,
              column: newColumn,
            });
          }
          break;

        case "Home":
          // Move to beginning of current line
          setCursorPosition((prev) => ({
            ...prev,
            column: 0,
          }));
          break;

        case "End":
          // Move to end of current line
          const lineLength = textLines[cursorPosition.line]?.length || 0;
          setCursorPosition((prev) => ({
            ...prev,
            column: lineLength,
          }));
          break;

        default:
          if (e.key.length === 1) {
            insertTextAtCursor(e.key);
          }
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [textToolActive, textLines, cursorPosition]);

  const handleDelete = () => {
    const newLines = [...textLines];
    const currentLine = newLines[cursorPosition.line] || "";

    if (cursorPosition.column < currentLine.length) {
      // Delete character to the right
      newLines[cursorPosition.line] =
        currentLine.slice(0, cursorPosition.column) +
        currentLine.slice(cursorPosition.column + 1);

      setTextLines(newLines);
      setTypedText(newLines.join("\n"));
    } else if (cursorPosition.line < textLines.length - 1) {
      // Merge with next line - but only when Delete is pressed at end of line
      const nextLine = newLines[cursorPosition.line + 1];
      newLines[cursorPosition.line] = currentLine + nextLine;
      newLines.splice(cursorPosition.line + 1, 1);

      setTextLines(newLines);
      setTypedText(newLines.join("\n"));
    }
  };
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
    const rect = canvasRef.current.getBoundingClientRect();
    const pos = pointerPos(e, rect);
    let clickedOnExisting = false;
    for (const block of textBlocks) {
      const blockRight = block.x + 300;
      const blockBottom = block.y + 100;
      if (
        pos.x >= block.x - 10 &&
        pos.x <= blockRight + 10 &&
        pos.y >= block.y - 5 &&
        pos.y <= blockBottom + 5
      ) {
        if (activeTextBlock && activeTextBlock.id === block.id) {
          updateCursorPosition(pos, block);
          clickedOnExisting = true;
          break;
        }

        if (activeTextBlock && typedText.trim()) {
          commitTypedText();
        }

        // Activate the block with exact line breaks
        setActiveTextBlock(block);
        const lines = block.text.split("\n");
        setTextLines(lines);
        setTypedText(block.text);

        // Simple cursor positioning
        const lineHeight = 24;
        const relativeY = pos.y - block.y;
        const clickedLine = Math.max(0, Math.floor(relativeY / lineHeight));
        const actualLine = Math.min(clickedLine, lines.length - 1);

        const ctx = canvasRef.current.getContext("2d");
        ctx.font = "20px Arial";
        const lineText = lines[actualLine] || "";
        const relativeX = pos.x - block.x;

        let charPosition = 0;
        let currentWidth = 0;

        for (let i = 0; i < lineText.length; i++) {
          const charWidth = ctx.measureText(lineText[i]).width;
          if (currentWidth + charWidth / 2 > relativeX) break;
          currentWidth += charWidth;
          charPosition = i + 1;
        }

        setCursorPosition({ line: actualLine, column: charPosition });
        setTextToolActive(true);
        setShowKeyboard(true);
        clickedOnExisting = true;
        break;
      }
    }

    if (!clickedOnExisting) {
      if (activeTextBlock && typedText.trim()) {
        commitTypedText();
      } else if (activeTextBlock && !typedText.trim()) {
        setActiveTextBlock(null);
        setTextLines([""]);
        setTypedText("");
        setCursorPosition({ line: 0, column: 0 });
        setTextToolActive(false);
        setShowKeyboard(false);
        return;
      }

      const newPosition = findNonOverlappingPosition(pos.x, pos.y);
      const newTextBlock = {
        id: Date.now(),
        x: newPosition.x,
        y: newPosition.y,
        text: "",
        color: drawingColor,
        font: "20px Arial",
      };

      setActiveTextBlock(newTextBlock);
      setTextLines([""]);
      setTypedText("");
      setCursorPosition({ line: 0, column: 0 });
      setTextToolActive(true);
      setShowKeyboard(true);
    }
  };
  const activateTextTool = () => {
    setTool("text");
    setTextToolActive(true);
    setShowKeyboard(true);

    // Set default position if none exists
    if (textPosition.x === 0 && textPosition.y === 0) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        setTextPosition({ x: 20, y: 20 });

        // Create a new text block at default position
        const newTextBlock = {
          id: Date.now(),
          x: 20,
          y: 20,
          text: "",
          color: drawingColor,
          font: "20px Arial",
        };
        setActiveTextBlock(newTextBlock);
      }
    }
  };

  /* -------------------- JSX (no change to layout) -------------------- */
  const handleClear = () => {
    // Clear only the active editing session, not saved blocks
    if (activeTextBlock) {
      // If we have unsaved text, check if user wants to save it
      if (
        typedText.trim() &&
        !textBlocks.find((b) => b.id === activeTextBlock.id)
      ) {
        if (window.confirm("You have unsaved text. Do you want to clear it?")) {
          setActiveTextBlock(null);
          setTextLines([""]);
          setTypedText("");
          setCursorPosition({ line: 0, column: 0 });
        }
      } else {
        setActiveTextBlock(null);
        setTextLines([""]);
        setTypedText("");
        setCursorPosition({ line: 0, column: 0 });
      }
    }

    setTextToolActive(false);
    setShowKeyboard(false);

    // Clear drawings and images (existing functionality)
    setPaths([]);
    setUploadedImages([]);
    setImageFiles([]);
  };
  //

  /* -------------------- Helper function to update cursor position -------------------- */
  const updateCursorPosition = (pos, block) => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.font = "20px Arial";
    const lineHeight = 24;

    const relativeX = pos.x - block.x;
    const relativeY = pos.y - block.y;

    const lines = block.text.split("\n");
    const clickedLine = Math.max(0, Math.floor(relativeY / lineHeight));
    const actualLine = Math.min(clickedLine, lines.length - 1);

    let charPosition = 0;
    let currentWidth = 0;
    const lineText = lines[actualLine] || "";

    // Find the closest character position
    for (let i = 0; i < lineText.length; i++) {
      const charWidth = ctx.measureText(lineText[i]).width;
      // Check if we've passed the click position
      if (currentWidth + charWidth / 2 > relativeX) {
        break;
      }
      currentWidth += charWidth;
      charPosition = i + 1;
    }

    setCursorPosition({
      line: actualLine,
      column: charPosition,
    });
  };
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
                    onClick={activateTextTool}
                    title="Virtual Keyboard"
                  >
                    <Icon.Keyword className="w-5 h-5" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleClear}
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
