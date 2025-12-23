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
import { SlPencil } from "react-icons/sl";
import { RiEraserFill } from "react-icons/ri";
import { FaSave } from "react-icons/fa";
import ImageUpload from "./imageUpload.jsx";
import {
  PencilIcon,
  TextIcon,
  ImgIcon,
  EraserIcon,
  SaveIcon,
  DeleteIcon,
  KeyBoardIcon,
  imageUploadIcon,
} from "../../Component/DiseasesData/images.jsx";
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
  Pencil: (p) => <SlPencil {...p} />,
  Image: (p) => <img src={imageUploadIcon} alt="img upload" {...p} />,
  Trash: (p) => <RiEraserFill {...p} />,
  Keyword: (p) => <img src={KeyBoardIcon} alt="keyboard icon" {...p} />,
  FileSave: (p) => <FaSave {...p} />,
};
export default function Whiteboard() {
  const location = useLocation();
  const pathname = location?.pathname ?? "";
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
  const [updateImage, setUpdateImage] = useState([]);

  const getCanvasContext = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return canvas.getContext("2d");
  }, []);
  useEffect(() => {
    if (!location?.state?.selectedImages) return;

    const incoming = location.state.selectedImages;

    setUploadedImages((prev) => {
      const updated = [...prev];

      incoming.forEach((item, index) => {
        const isObject = typeof item === "object";
        const src = isObject ? item.src : item;
        if (updated.some((img) => img.src === src)) return;


        const viewport = window.visualViewport || window;
        const isMobile = viewport.width < 768;
        const maxSize = isMobile ? 100 : 200;

        if (item.width > maxSize || item.height > maxSize) {
          const scale = Math.min(maxSize / item.width, maxSize / item.height);
          item.width *= scale;
          item.height *= scale;
        }
        if (viewport.width < 480) {
          const mobileScale = Math.min(80 / width, 80 / height);
          item.width *= mobileScale;
          item.height *= mobileScale;
        }
        if (isObject && item.x !== undefined && item.y !== undefined) {
          updated.push({
            src: item.src,
            x: item.x,
            y: item.y,
            width: item.width || 200,
            height: item.height || 200,
          });
        } else {
          const pos = findNonOverlappingImagePosition(200, 200);
          updated.push({
            src,
            x: pos.x + index * 15,
            y: pos.y + index * 15,
            width: item.width || 200,
            height: item.height || 200,
          });
        }
      });
      return uniqueImages(updated);
    });
  }, [location.state?.selectedImages]);

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
      const canvasWidth = rect.width || 985;
      const canvasHeight = rect.height ?? 600;
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
    const viewport = window.visualViewport || window;
    // const width = viewport.width - 120 || 985;
    // const height = viewport.height - 150 || 600;
    const width = Math.max(0, Math.floor(viewport.width - 120));
    const height = Math.max(0, Math.floor(viewport.height - 150));
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
    for (let i = uploadedImages.length - 1; i >= 0; i--) {
      const img = uploadedImages[i];
      if (
        pos.x >= img.x &&
        pos.x <= img.x + img.width &&
        pos.y >= img.y &&
        pos.y <= img.y + img.height
      ) {
        setDraggingImage(i);
        setDragOffset({ x: pos.x - img.x, y: pos.y - img.y });
        return;
      }
    }
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

  const findNonOverlappingImagePosition = useCallback(
    (width, height, currentImages = uploadedImages) => {
      const margin = 20;
      let y = 20;
      if (currentImages.length > 0) {
        const lastImage = currentImages[currentImages.length - 1];
        y = lastImage.y + lastImage.height + margin;
      }
      // Also consider existing text blocks
      if (textBlocks.length > 0) {
        const lastTextBlock = textBlocks[textBlocks.length - 1];
        y = Math.max(y, lastTextBlock.y + 60);
      }
      return {
        x: 20,
        y,
      };
    },
    [uploadedImages, textBlocks]
  );

  const draw = useCallback(
    (e) => {
      const rect = canvasRef.current.getBoundingClientRect();
      const pos = pointerPos(e, rect);
      if (draggingImage !== null) {
        setUploadedImages((prev) =>
          prev.map((img, i) =>
            i === draggingImage
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
      } catch (err) { }
      ctx.globalCompositeOperation = "source-over";
    }
  }, [getCanvasContext]);
  /* -------------------- Text helpers -------------------- */
  useEffect(() => {
    const ctx = getCanvasContext();
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    const viewport = window.visualViewport || window;
    // const canvasWidth = viewport.width - 120 || 985;
    // const canvasHeight = viewport.height - 150 || 600;
    const canvasWidth = Math.max(0, Math.floor(viewport.width - 120));
    const canvasHeight = Math.max(0, Math.floor(viewport.height - 150));
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    uploadedImages.forEach((imgObj) => {
      const img = new Image();
      img.src = imgObj.src;
      ctx.drawImage(img, imgObj.x, imgObj.y, imgObj.width, imgObj.height);
    });
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
    uploadedImages
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
          setDrawingName(savedObj?.name_key || "");
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
          const imagesArray = savedState?.images ?? [];

          setUploadedImages((prev) => {
            const newItems = [];
            imagesArray.forEach((src, index) => {
              newItems.push({
                src: src?.src,
                x: src.x,
                y: src.y,
                width: src.width,
                height: src.height,
              });
            });
            return uniqueImages([...prev, ...newItems]);
          });
        }
      } catch (err) {
        console.error("Failed to fetch whiteboard:", err);
      }
    };

    fetchBoard();
  }, [id, licenses_id, token, loader]);

  // Helper function to calculate image position without using state
  const calculateImagePosition = (currentImages, width, height) => {
    const margin = 20;
    let y = 20;

    if (currentImages.length > 0) {
      const lastImage = currentImages[currentImages.length - 1];
      y = lastImage.y + lastImage.height + margin;
    }

    // Also consider existing text blocks
    if (textBlocks.length > 0) {
      const lastTextBlock = textBlocks[textBlocks.length - 1];
      y = Math.max(y, lastTextBlock.y + 60);
    }

    return {
      x: 20,
      y,
    };
  };
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
      images: uploadedImages.map((img) => ({
        src: img.src,
        x: img.x,
        y: img.y,
        width: img.width,
        height: img.height,
      })),
      toolSettings: {
        color: drawingColor,
        width: drawingWidth,
      },
    };

    const payload = new FormData();
    payload.append("licenses_id", licenses_id);
    payload.append("name_key", drawingName);
    payload.append("images_url", SelectedImages);
    payload.append("data", JSON.stringify(state));

    if (id) {
      payload.append("imageFileRemove", updateImage);
    }

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
          replace: true,
          state: {},
          autoClose: 1500,
          onclose: navigate("/white-board-list"),
        });
      } else {
        toast.error(data.msg, { autoClose: 1500 });
      }
    } catch (err) {
      toast.error(err?.response?.data?.msg, { autoClose: 1500 });
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

  // const handleImageUpload = (files) => {
  //   if (!files || files.length === 0) return;

  //   Array.from(files).forEach((file) => {
  //     setImageFiles((prev) => [...prev, file]);

  //     const src = URL.createObjectURL(file);
  //     const img = new Image();

  //     img.onload = () => {
  //       let { width, height } = img;
  //       const maxSize = 200;

  //       if (width > maxSize || height > maxSize) {
  //         const scale = Math.min(maxSize / width, maxSize / height);
  //         width *= scale;
  //         height *= scale;
  //       }
  //       const pos = findNonOverlappingImagePosition(
  //         width,
  //         height,
  //         uploadedImages
  //       );
  //       setUploadedImages((prev) => [
  //         ...prev,
  //         {
  //           src,
  //           x: pos.x,
  //           y: pos.y,
  //           width,
  //           height,
  //         },
  //       ]);
  //       if (src.startsWith("blob:")) {
  //         return;
  //       }
  //     };
  //     img.src = src;
  //   });
  // };
  const handleImageUpload = (files) => {
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      setImageFiles((prev) => [...prev, file]);

      const src = URL.createObjectURL(file);
      const img = new Image();

      img.onload = () => {
        const viewport = window.visualViewport || window;
        const isMobile = viewport.width < 768;
        const maxSize = isMobile ? 100 : 200;
        let { width, height } = img;
        if (width > maxSize || height > maxSize) {
          const scale = Math.min(maxSize / width, maxSize / height);
          width *= scale;
          height *= scale;
        }
        if (viewport.width < 480) {
          const mobileScale = Math.min(80 / width, 80 / height);
          width *= mobileScale;
          height *= mobileScale;
        }
        const pos = findNonOverlappingImagePosition(
          width,
          height,
          uploadedImages
        );
        setUploadedImages((prev) => [
          ...prev,
          {
            src,
            x: pos.x,
            y: pos.y,
            width,
            height,
          },
        ]);
        if (src.startsWith("blob:")) {
          return;
        }
      };
      img.src = src;
    });
  };
  /* -------------------- Misc: settings loader -------------------- */
  useEffect(() => {
    getSetting(
      () => { },
      () => { },
      setSelectedLanguage,
      setCalendarOn,
      setIntroductionOn,
      setLoader,
      () => { },
      () => { },
      () => { },
      () => { }
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
  const handleDeleteImage = (index) => {
    const removedImage = uploadedImages[index]?.src;
    setUpdateImage((prev) => [...prev, removedImage]);
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const uniqueImages = (images) => {
    const seen = new Set();
    return images.filter((img) => {
      if (seen.has(img.src)) return false;
      seen.add(img.src);
      return true;
    });
  };
  const t = (params) => {
    const transtext = selectedLanguage === "Spanish" ? "sp" : "en";
    const trans = {
      en: {
        name: "Whiteboard",
        title: "Saved WhiteBoards List",
        // text: "View List"
      },
      sp: {
        name: "Pizarron",
        title: "Lista de Pizarras Guardadas",
        // text: "Ver Lista"
      }
    }
    return trans[transtext][params];
  };
  return (
    <>
      {FileUpload && (
        <ImageUpload
          oldImages={uploadedImages}
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
            name={t("name")}
          />
          <div className="main-wrapper home-wrapper whiteboard-wrapper">
            <div className="flex justify-end mb-2">
              <Button
                className="thm-btn"
                onClick={() => navigate("/white-board-list")}
              >
                {t("title")}
              </Button>
            </div>
            <div className="flex flex-col items-center whiteboard-card ">
              <Card className="w-full flex flex-col relative">
                {/* <div className="absolute top-3 right-3">
                  <Button
                    className="thm-btn"
                    onClick={() => navigate("/white-board-list")}
                  >
                    {t("text")}
                  </Button>
                </div> */}
                {/* {(uploadedImages.length > 0 || SelectedImages.length > 0) && (
                  <CardHeader className="p-0">
                    <div
                      ref={stripRef}
                      className="strip w-full overflow-x-auto no-scrollbar flex gap-2 p-2 bg-gray-50"
                    >
                      {uploadedImages?.map((img, idx) => (
                        <div
                          key={`uploaded-${idx}`}
                          className="relative w-[100px] h-[100px] flex-shrink-0"
                        >
                          <img
                            src={img.src}
                            alt={`upload-${idx}`}
                            className="w-full h-full object-cover rounded border"
                            draggable={false}
                          />
                          <button
                            onClick={() => {
                              const isInSelected = SelectedImages.includes(
                                img.src
                              );
                              if (isInSelected) {
                                setSelectedImages((prev) =>
                                  prev.filter((url) => url !== img.src)
                                );
                              }
                              handleDeleteImage(idx);
                            }}
                            className="absolute -top-1 -right-1 bg-white/80 hover:bg-white 
                      text-red-600 rounded-full p-1 shadow w-6 h-6 flex 
                      items-center justify-center text-xs"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </CardHeader>
                )} */}

                <div
                  ref={wrapperRef}
                  className="relative w-auto  overflow-y-auto overflow-x-hidden mx-auto"
                >
                  <canvas
                    ref={setCanvasSize}
                    className={`w-auto whiteboard-canvas touch-none pt-0 z-0 mx-auto ${tool === "text"
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
                <CardContent className=" flex flex-wrap items-center justify-center gap-5 whiteboard-toolbar absolute bottom-3 left-0 right-0 z-1">
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
                    {/* <Icon.Pencil className="icon-size-add" /> */}
                    <img
                      src={PencilIcon}
                      className="icon-size-add"
                      alt="Pencil Icon"
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={activateTextTool}
                    title="Virtual Keyboard"
                  >
                    {/* <Icon.Keyword className="icon-size-add" /> */}
                    <img
                      src={TextIcon}
                      className="icon-size-add"
                      alt="Pencil Icon"
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    title="Upload image"
                    onClick={(e) => {
                      handleFileUpload(e);
                    }}
                  >
                    <img
                      src={ImgIcon}
                      className="icon-size-add"
                      alt="Pencil Icon"
                    />
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
                    onClick={() => {
                      setTool("eraser");
                      // setTextToolActive(false);
                      setShowKeyboard(false);
                      setDrawingWidth(20);
                    }}
                    title="Eraser"
                  >
                    <img
                      src={EraserIcon}
                      className="icon-size-add"
                      alt="Pencil Icon"
                    />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-gray-100"
                    onClick={handleClear}
                    title="Clear"
                  >
                    <img
                      src={DeleteIcon}
                      className="icon-size-add"
                      alt="Pencil Icon"
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowSaveModal(true)}
                    title="File Save"
                  >
                    <img
                      src={SaveIcon}
                      className="icon-size-add"
                      alt="Pencil Icon"
                    />
                  </Button>
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
