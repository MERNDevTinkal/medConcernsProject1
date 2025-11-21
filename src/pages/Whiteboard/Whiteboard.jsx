import React, { useState, useRef, useCallback, useEffect } from "react";
import Header from "../../Component/Layout/Header/Header";
import Footer from "../../Component/Layout/Footer/Footer";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import api from "../../Component/apiCall/apiCall";
import { toast } from "react-toastify";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import Loader from "../../Component/webLoader/loader";
import getSetting from "../../Component/settingApi/settings";
import KeyBoardIcon from "../../assets/images/whiteboardIcon/Keyboard-Icon.svg";
import imageUploadIcon from "../../assets/images/whiteboardIcon/imageUpload.svg";
import { SlPencil } from "react-icons/sl";
import { RiEraserFill } from "react-icons/ri";
import { FaSave } from "react-icons/fa";
import ImageUpload from "./imageUpload.jsx";
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

const Icon = {
  Pencil: (p) => (
    <SlPencil {...p} />
    // <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
    //   <path
    //     strokeWidth="2"
    //     strokeLinecap="round"
    //     strokeLinejoin="round"
    //     d="M16.862 3.487a2.25 2.25 0 1 1 3.182 3.182L7.5 19.313 3 21l1.688-4.5L16.862 3.487z"
    //   />
    // </svg>
  ),
  Image: (p) => (
    <img src={imageUploadIcon} alt="img upload" {...p} />
    // <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
    //   <rect x="3" y="5" width="18" height="14" rx="2" ry="2" strokeWidth="2" />
    //   <path
    //     d="M10 13l2-2 4 4"
    //     strokeWidth="2"
    //     strokeLinecap="round"
    //     strokeLinejoin="round"
    //   />
    //   <circle cx="8" cy="9" r="1.5" />
    // </svg>
  ),

  // Eraser: (p) => (
  //   <RiEraserFill />
  //   // <svg
  //   //   stroke="currentColor"
  //   //   {...p}
  //   //   width="800px"
  //   //   height="800px"
  //   //   viewBox="0 0 24 24"
  //   //   fill="none"
  //   //   xmlns="http://www.w3.org/2000/svg"
  //   // >
  //   //   <path
  //   //     d="M5.50506 11.4096L6.03539 11.9399L5.50506 11.4096ZM3 14.9522H2.25H3ZM12.5904 18.4949L12.0601 17.9646L12.5904 18.4949ZM9.04776 21V21.75V21ZM11.4096 5.50506L10.8792 4.97473L11.4096 5.50506ZM13.241 17.8444C13.5339 18.1373 14.0088 18.1373 14.3017 17.8444C14.5946 17.5515 14.5946 17.0766 14.3017 16.7837L13.241 17.8444ZM7.21629 9.69832C6.9234 9.40543 6.44852 9.40543 6.15563 9.69832C5.86274 9.99122 5.86274 10.4661 6.15563 10.759L7.21629 9.69832ZM16.073 16.073C16.3659 15.7801 16.3659 15.3053 16.073 15.0124C15.7801 14.7195 15.3053 14.7195 15.0124 15.0124L16.073 16.073ZM18.4676 11.5559C18.1759 11.8499 18.1777 12.3248 18.4718 12.6165C18.7658 12.9083 19.2407 12.9064 19.5324 12.6124L18.4676 11.5559ZM6.03539 11.9399L11.9399 6.03539L10.8792 4.97473L4.97473 10.8792L6.03539 11.9399ZM6.03539 17.9646C5.18538 17.1146 4.60235 16.5293 4.22253 16.0315C3.85592 15.551 3.75 15.2411 3.75 14.9522H2.25C2.25 15.701 2.56159 16.3274 3.03 16.9414C3.48521 17.538 4.1547 18.2052 4.97473 19.0253L6.03539 17.9646ZM4.97473 10.8792C4.1547 11.6993 3.48521 12.3665 3.03 12.9631C2.56159 13.577 2.25 14.2035 2.25 14.9522H3.75C3.75 14.6633 3.85592 14.3535 4.22253 13.873C4.60235 13.3752 5.18538 12.7899 6.03539 11.9399L4.97473 10.8792ZM12.0601 17.9646C11.2101 18.8146 10.6248 19.3977 10.127 19.7775C9.64651 20.1441 9.33665 20.25 9.04776 20.25V21.75C9.79649 21.75 10.423 21.4384 11.0369 20.97C11.6335 20.5148 12.3008 19.8453 13.1208 19.0253L12.0601 17.9646ZM4.97473 19.0253C5.79476 19.8453 6.46201 20.5148 7.05863 20.97C7.67256 21.4384 8.29902 21.75 9.04776 21.75V20.25C8.75886 20.25 8.449 20.1441 7.9685 19.7775C7.47069 19.3977 6.88541 18.8146 6.03539 17.9646L4.97473 19.0253ZM17.9646 6.03539C18.8146 6.88541 19.3977 7.47069 19.7775 7.9685C20.1441 8.449 20.25 8.75886 20.25 9.04776H21.75C21.75 8.29902 21.4384 7.67256 20.97 7.05863C20.5148 6.46201 19.8453 5.79476 19.0253 4.97473L17.9646 6.03539ZM19.0253 4.97473C18.2052 4.1547 17.538 3.48521 16.9414 3.03C16.3274 2.56159 15.701 2.25 14.9522 2.25V3.75C15.2411 3.75 15.551 3.85592 16.0315 4.22253C16.5293 4.60235 17.1146 5.18538 17.9646 6.03539L19.0253 4.97473ZM11.9399 6.03539C12.7899 5.18538 13.3752 4.60235 13.873 4.22253C14.3535 3.85592 14.6633 3.75 14.9522 3.75V2.25C14.2035 2.25 13.577 2.56159 12.9631 3.03C12.3665 3.48521 11.6993 4.1547 10.8792 4.97473L11.9399 6.03539ZM14.3017 16.7837L7.21629 9.69832L6.15563 10.759L13.241 17.8444L14.3017 16.7837ZM15.0124 15.0124L12.0601 17.9646L13.1208 19.0253L16.073 16.073L15.0124 15.0124ZM19.5324 12.6124C20.1932 11.9464 20.7384 11.3759 21.114 10.8404C21.5023 10.2869 21.75 9.71511 21.75 9.04776H20.25C20.25 9.30755 20.1644 9.58207 19.886 9.979C19.5949 10.394 19.1401 10.8781 18.4676 11.5559L19.5324 12.6124Z"
  //   //     fill="#1C274C"
  //   //   />
  //   //   <path
  //   //     d="M9 21H21"
  //   //     stroke="#1C274C"
  //   //     strokeWidth="1.5"
  //   //     strokeLinecap="round"
  //   //   />
  //   // </svg>
  // ),
  Trash: (p) => (
    <RiEraserFill {...p} />
    // <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
    //   <path
    //     strokeWidth="2"
    //     strokeLinecap="round"
    //     strokeLinejoin="round"
    //     d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"
    //   />
    // </svg>
  ),
  Keyword: (p) => <img src={KeyBoardIcon} alt="keyboard icon" {...p} />,
  FileSave: (p) => <FaSave {...p} />,
  // <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
  //   <path
  //     strokeWidth="2"
  //     strokeLinecap="round"
  //     strokeLinejoin="round"
  //     d="M4 4h16v16H4z"
  //   />
  //   <path
  //     strokeWidth="2"
  //     strokeLinecap="round"
  //     strokeLinejoin="round"
  //     d="M8 12h8M8 8h8M8 16h5"
  //   />
  // </svg>
};
export default function Whiteboard() {
  const location = useLocation();
  const pathname = location?.pathname ?? "";
  const { selectedImages } = location?.state ?? [];
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
  const [uploadedImages, setUploadedImages] = useState([]);
  const [textToolActive, setTextToolActive] = useState(false);
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState("");
  const [IntroductionOn, setIntroductionOn] = React.useState("");
  const [CalendarOn, setCalendarOn] = React.useState("");
  const [draggingImage, setDraggingImage] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(true);
  const [FileUpload, setFileUpload] = useState(false);
  const token = localStorage.getItem("token");
  const licenses_id = localStorage.getItem("license_key");
  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const [loader, setLoader] = useState(true);
  const [imageFiles, setImageFiles] = useState([]);
  const wrapperRef = useRef(null);
  const [caretY, setCaretY] = useState(0);
  const [textBlocks, setTextBlocks] = useState([]);
  const [activeTextBlock, setActiveTextBlock] = useState(null);
  const [SelectedImages, setSelectedImages] = useState([]);
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

  const findNonOverlappingPosition = useCallback(
    (clickX, clickY) => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: clickX, y: clickY };

      const rect = canvas.getBoundingClientRect();
      const padding = 10;
      const lineHeight = 24;
      const canvasWidth = rect.width || 680;
      const canvasHeight = rect.height;
      let bestX = Math.max(
        padding,
        Math.min(clickX, canvasWidth - padding - 100)
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
        if (bestY < blockBottom && Math.abs(bestX - block.x) < 200) {
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
    const width = 680;
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
  useEffect(() => {
    const ctx = getCanvasContext();
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    const canvasWidth = 680;
    const canvasHeight = 600;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
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
        ctx.lineTo(path.points[i].x, path.points[i].y);
      }
      ctx.stroke();
      ctx.closePath();
      ctx.globalCompositeOperation = "source-over";
    });
    textBlocks.forEach((block) => {
      if (activeTextBlock && block.id === activeTextBlock.id) return;
      const font = block.font || "20px Arial";
      const lineHeight = 24;
      const maxWidth = canvasWidth - block.x - 20;
      ctx.font = font;
      ctx.fillStyle = block.color || "#000";
      ctx.textBaseline = "top";
      let currentY = block.y;
      const paragraphs = block.text.split("\n");
      paragraphs.forEach((paragraph) => {
        if (paragraph === "") {
          currentY += lineHeight;
          return;
        }
        const words = paragraph.split(" ");
        let currentLine = "";

        for (let i = 0; i < words.length; i++) {
          const word = words[i];
          const testLine = currentLine ? currentLine + " " + word : word;
          const testWidth = ctx.measureText(testLine).width;
          if (testWidth > maxWidth && currentLine) {
            ctx.fillText(currentLine, block.x, currentY);
            currentY += lineHeight;
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        }
        if (currentLine) {
          ctx.fillText(currentLine, block.x, currentY);
          currentY += lineHeight;
        }
      });
    });

    if (textToolActive && activeTextBlock) {
      const font = "20px Arial";
      const lineHeight = 24;
      const maxWidth = canvasWidth - activeTextBlock.x - 20;
      ctx.font = font;
      ctx.fillStyle = drawingColor;
      ctx.textBaseline = "top";

      let currentY = activeTextBlock.y;
      let cursorX = activeTextBlock.x;
      let cursorY = activeTextBlock.y;
      let allVisibleLines = [];
      let foundCursor = false;
      textLines.forEach((manualLine, manualLineIndex) => {
        if (manualLine === "") {
          allVisibleLines.push({
            text: "",
            x: activeTextBlock.x,
            y: currentY,
            manualLineIndex: manualLineIndex,
            startCharIndex: 0,
            endCharIndex: 0,
          });
          currentY += lineHeight;
          return;
        }

        const words = manualLine.split(" ");
        let currentLine = "";
        let charCount = 0;

        for (let i = 0; i < words.length; i++) {
          const word = words[i];
          const testLine = currentLine ? currentLine + " " + word : word;
          const testWidth = ctx.measureText(testLine).width;
          if (testWidth > maxWidth && currentLine) {
            allVisibleLines.push({
              text: currentLine,
              x: activeTextBlock.x,
              y: currentY,
              manualLineIndex: manualLineIndex,
              startCharIndex: charCount - currentLine.length,
              endCharIndex: charCount,
            });

            currentLine = word;
            charCount += word.length;
            currentY += lineHeight;
          } else {
            currentLine = testLine;
            charCount += i === 0 ? word.length : word.length + 1;
          }
        }
        if (currentLine) {
          allVisibleLines.push({
            text: currentLine,
            x: activeTextBlock.x,
            y: currentY,
            manualLineIndex: manualLineIndex,
            startCharIndex: charCount - currentLine.length,
            endCharIndex: charCount,
          });
          currentY += lineHeight;
        }
      });
      allVisibleLines.forEach((line) => {
        ctx.fillText(line.text, line.x, line.y);
      });
      for (let i = 0; i < allVisibleLines.length; i++) {
        const line = allVisibleLines[i];
        if (line.manualLineIndex === cursorPosition.line) {
          const lineText = line.text;
          if (
            cursorPosition.column >= line.startCharIndex &&
            cursorPosition.column <= line.endCharIndex
          ) {
            const relativeColumn = cursorPosition.column - line.startCharIndex;
            const textBeforeCursor = lineText.slice(0, relativeColumn);
            cursorX =
              activeTextBlock.x + ctx.measureText(textBeforeCursor).width;
            cursorY = line.y;
            foundCursor = true;
            break;
          }
        }
      }

      if (!foundCursor) {
        const targetManualLine = cursorPosition.line;
        let lastLineForManualLine = null;
        for (let i = allVisibleLines.length - 1; i >= 0; i--) {
          if (allVisibleLines[i].manualLineIndex === targetManualLine) {
            lastLineForManualLine = allVisibleLines[i];
            break;
          }
        }

        if (lastLineForManualLine) {
          cursorX =
            activeTextBlock.x +
            ctx.measureText(lastLineForManualLine.text).width;
          cursorY = lastLineForManualLine.y;
        }
      }

      // Draw cursor
      if (showCursor) {
        ctx.beginPath();
        ctx.moveTo(cursorX, cursorY);
        ctx.lineTo(cursorX, cursorY + lineHeight);
        ctx.strokeStyle = drawingColor;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      setCaretY(cursorY + lineHeight);
    }
  }, [
    paths,
    textBlocks,
    activeTextBlock,
    textLines,
    textToolActive,
    drawingColor,
    cursorPosition,
    showCursor,
    getCanvasContext,
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
          const imagesUrl = savedObj?.images_url;
          setSelectedImages(
            imagesUrl &&
              typeof imagesUrl === "string" &&
              imagesUrl.trim() &&
              imagesUrl.trim() !== "undefined"
              ? imagesUrl.split(",")
              : null
          );
          setDrawingName(savedObj?.name_key || "");
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
            setTextBlocks(savedState.texts);
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
          const updated = [...prev];
          updated[existingIndex] = committedBlock;
          return updated;
        } else {
          if (textContent.trim()) {
            return [...prev, committedBlock];
          }
          return prev;
        }
      });
    }
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

    let committedTexts = [...textBlocks];
    if (activeTextBlock) {
      const textContent = textLines.join("\n");
      if (textContent.trim()) {
        committedTexts = [
          ...committedTexts.filter((b) => b.id !== activeTextBlock.id),
          { ...activeTextBlock, text: textContent, timestamp: Date.now() },
        ];
      }
    }

    const state = {
      name: drawingName.trim(),
      paths,
      texts: committedTexts,
      toolSettings: {
        color: drawingColor,
        width: drawingWidth,
      },
    };
    if (
      paths.length === 0 &&
      committedTexts.length === 0 &&
      selectedImages == undefined &&
      imageFiles.length === 0
    ) {
      alert("Please Fill Something");
      return;
    }

    const payload = new FormData();
    payload.append("licenses_id", licenses_id);
    payload.append("name_key", drawingName);
    payload.append("images_url", selectedImages);
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
  const handleKeyboardChange = (input) => {
    setTypedText(input);
  };
  const handleKeyboardKeyPress = (button) => {
    if (!button) return;

    switch (button) {
      case "{enter}":
      case "{return}":
      case "Enter":
        const newLines = [...textLines];
        if (cursorPosition.column === newLines[cursorPosition.line].length) {
          newLines.splice(cursorPosition.line + 1, 0, "");
          setTextLines(newLines);
          setCursorPosition({
            line: cursorPosition.line + 1,
            column: 0,
          });
        } else {
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
      const prevLine = newLines[cursorPosition.line - 1];
      const currentLine = newLines[cursorPosition.line];
      setCursorPosition({
        line: cursorPosition.line - 1,
        column: prevLine.length,
      });
    }
  };
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
          const newLines = [...textLines];
          if (cursorPosition.column === newLines[cursorPosition.line].length) {
            newLines.splice(cursorPosition.line + 1, 0, "");
            setTextLines(newLines);
            setCursorPosition({
              line: cursorPosition.line + 1,
              column: 0,
            });
          } else {
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
            const newColumn = Math.min(cursorPosition.column, nextLineLength);
            setCursorPosition({
              line: cursorPosition.line + 1,
              column: newColumn,
            });
          }
          break;
        case "Home":
          setCursorPosition((prev) => ({
            ...prev,
            column: 0,
          }));
          break;
        case "End":
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
      newLines[cursorPosition.line] =
        currentLine.slice(0, cursorPosition.column) +
        currentLine.slice(cursorPosition.column + 1);
      setTextLines(newLines);
      setTypedText(newLines.join("\n"));
    } else if (cursorPosition.line < textLines.length - 1) {
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
      setCalendarOn,
      setIntroductionOn,
      setLoader,
      () => {},
      () => {},
      () => {},
      () => {}
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
        setActiveTextBlock(block);
        const lines = block.text.split("\n");
        setTextLines(lines);
        setTypedText(block.text);
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
    if (textPosition.x === 0 && textPosition.y === 0) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        setTextPosition({ x: 20, y: 20 });
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

  const handleClear = () => {
    setActiveTextBlock(null);
    setTextLines([""]);
    setTypedText("");
    setCursorPosition({ line: 0, column: 0 });
    setTextToolActive(false);
    setShowKeyboard(false);
    setPaths([]);
    setUploadedImages([]);
    setImageFiles([]);
    setTextBlocks([]);
  };

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
    for (let i = 0; i < lineText.length; i++) {
      const charWidth = ctx.measureText(lineText[i]).width;
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

  const handleFileUpload = (e) => {
    e.preventDefault();
    setFileUpload(true);
  };
  return (
    <>
      {FileUpload && (
        <ImageUpload
          pathname={pathname}
          uploadedImages={SelectedImages}
          handleImageUpload={handleImageUpload}
          setOpen={setFileUpload}
          open={FileUpload}
        />
      )}

      {loader ? (
        <Loader />
      ) : (
        <>
          <Header
            selectedLanguage={selectedLanguage}
            introductionOn={IntroductionOn}
            calendarOn={CalendarOn}
            name={selectedLanguage === "Spanish" ? "Pizarra" : "Whiteboard"}
          />

          <div className="main-wrapper home-wrapper ">
            <div className="flex justify-end mb-2">
              <Button
                className="thm-btn"
                onClick={() => navigate("/white-board-list")}
             
              >
                {selectedLanguage === "Spanish"
                  ? "Pizarras blancas guardadas"
                  : "Saved White Boards"}
              </Button>
            </div>
            <div className="flex flex-col items-center whiteboard-card">
              <Card className="w-full flex flex-col ">
                <div className="absolute top-3 right-3">
                  <Button
                    className="thm-btn"
                    onClick={() => navigate("/white-board-list")}
                  
                  >
                    {selectedLanguage === "Spanish" ? "Ver lista" : "View List"}
                  </Button>
                </div>
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
                {(SelectedImages || selectedImages) &&
                  (SelectedImages?.length > 0 ||
                    selectedImages?.length > 0) && (
                    <CardHeader className="p-0">
                      <div
                        ref={stripRef}
                        className="strip w-full overflow-x-auto no-scrollbar flex gap-2 p-2 bg-gray-50"
                      >
                        {(selectedImages?.length > 0
                          ? selectedImages
                          : SelectedImages || []
                        )?.map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
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
                  className="relative w-auto  overflow-y-auto overflow-x-hidden mx-auto"
                >
                  <canvas
                    ref={setCanvasSize}
                    className={`w-auto touch-none pt-5 z-0 mx-auto ${
                      tool === "text"
                        ? "cursor-text"
                        : tool === "eraser"
                        ? "cursor-eraser"
                        : "cursor-crosshair"
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
                <CardContent className="relative flex flex-wrap items-center justify-center gap-3 whiteboard-toolbar p-0 bg-white">
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
                    <Icon.Pencil className="w-6 h-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={activateTextTool}
               
                    title="Virtual Keyboard"
                  >
                    <Icon.Keyword className="w-6 h-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    title="Upload image"
                    onClick={(e) => {
                      handleFileUpload(e);
                    }}
       

                    // document.getElementById("imageUpload").click()
                  >
                    <Icon.Image className="w-6 h-6" />
                  </Button>
                  {/* <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      setTool("");
                      handleImageUpload(Array.from(e.target.files));
                    }}
                  /> */}
                  {/* <Button
                    variant="ghost"
                    size="icon"
                    className={cn(tool === "eraser" && "bg-gray-100")}
                    onClick={() => {
                      setTool("eraser");
                      // setTextToolActive(false);
                      setShowKeyboard(false);
                      setDrawingWidth(20);
                    }}
                    title="Eraser"
                  >
                    <Icon.Eraser className="w-6 h-6" />{" "}
                  </Button> */}

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleClear}
                
                    title="Clear"
                  >
                    <Icon.Trash className="w-6 h-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowSaveModal(true)}
      
                    title="File Save"
                  >
                    <Icon.FileSave className="w-6 h-6" />
                  </Button>

                  {/* <div className="flex items-center gap-2 ml-2">
                    <label className="text-sm text-gray-600">Color</label>
                    <input
                      type="color"
                      value={drawingColor}
                      onChange={(e) => setDrawingColor(e.target.value)}
                      className="h-9 w-10 rounded border border-gray-200"
                    />
                  </div> */}
                  {/* <div className="flex items-center gap-2">
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
                  </div> */}
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

              {/* <div className="w-full flex justify-between items-center mt-6"> */}
              {/* <Button
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
                </Button> */}
              {/* <Button
                  className="thm-btn"
                  onClick={() => navigate("/white-board-list")}
                >
                  {selectedLanguage === "Spanish" ? "Ver lista" : "View List"}
                </Button> */}
              {/* </div> */}

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
                          onKeyDown={(e) => {
                            if (e.code === "Enter" && e.key === "Enter") {
                              handleSaveDrawing();
                              setShowSaveModal(false);
                            }
                          }}
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
                          handleSaveDrawing();
                          setShowSaveModal(false);
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
