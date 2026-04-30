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
import { GiResize } from "react-icons/gi";

import {
  PencilIcon,
  TextIcon,
  ImgIcon,
  EraserIcon,
  SaveIcon,
  DeleteIcon,
  KeyBoardIcon,
  imageUploadIcon
} from "../../Component/DiseasesData/images.jsx"

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
    icon: "h-9 w-9 p-0 sm:h-10 sm:w-10 shrink-0",
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

const CardContent = ({ className = "", ...props }) => (
  <div className={cn("p-4 sm:p-5", className)} {...props} />
);

export default function Whiteboard() {
  const location = useLocation();
  const pathname = location?.pathname ?? "";
  const navigate = useNavigate();
  const { id } = useParams();
  const canvasRef = useRef(null);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [paths, setPaths] = useState([]);
  const [cursorPosition, setCursorPosition] = useState({ line: 0, column: 0 });
  const [textLines, setTextLines] = useState([""]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingColor, setDrawingColor] = useState("#000000");
  const [drawingWidth, setDrawingWidth] = useState(2);
  const [tool, setTool] = useState("");
  const [drawingName, setDrawingName] = useState("");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [textToolActive, setTextToolActive] = useState(false);
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState("");
  const [IntroductionOn, setIntroductionOn] = useState("");
  const [CalendarOn, setCalendarOn] = useState("");
  const [draggingImage, setDraggingImage] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizingImage, setResizingImage] = useState(null);
  const [resizeHandle, setResizeHandle] = useState(null);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [showCursor, setShowCursor] = useState(true);
  const [FileUpload, setFileUpload] = useState(false);
  const token = localStorage.getItem("token");
  const licenses_id = localStorage.getItem("license_key");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [loader, setLoader] = useState(true);
  const [imageFiles, setImageFiles] = useState([]);
  const wrapperRef = useRef(null);
  const [caretY, setCaretY] = useState(0);
  const [textBlocks, setTextBlocks] = useState([]);
  const [activeTextBlock, setActiveTextBlock] = useState(null);
  const [SelectedImages, setSelectedImages] = useState([]);
  const [updateImage, setUpdateImage] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [imageCache, setImageCache] = useState(new Map());
  const [isInitialized, setIsInitialized] = useState(false);
  const [Scoller, setScoller] = useState(true);
  const nativeInputRef = useRef(null);
  const CANVAS_WIDTH = 985;
  const CANVAS_HEIGHT = 600;
  const TOOLBAR_HEIGHT = 110;
  const TEXT_LINE_HEIGHT = 24;
  const [canvasSize, setCanvasDimensions] = useState({ width: CANVAS_WIDTH, height: CANVAS_HEIGHT });
  const [showResizePopup, setShowResizePopup] = useState(false);
  const [tempImageSize, setTempImageSize] = useState({ width: 0, height: 0 });
  const SAFE_AREA_BOTTOM = canvasSize.height - TOOLBAR_HEIGHT;
  const SAFE_TEXT_BOTTOM = SAFE_AREA_BOTTOM - TEXT_LINE_HEIGHT;
  const [isLandscape, setIsLandscape] = useState(
    window.innerWidth > window.innerHeight
  );

  const handleResizeButtonClick = () => {
    if (selectedImageIndex === null || uploadedImages[selectedImageIndex] === undefined) {
      // toast.info(selectedLanguage === "Spanish" ? "Seleccione una imagen primero" : "Please select an image first");
      return;
    }
    setShowResizePopup(true);
  };
  const handleResizeConfirm = () => {
    setShowResizePopup(false);
  };
  const handleResizeCancel = () => {
    setShowResizePopup(false);
  };
  const updateTempSize = (newWidth, newHeight) => {
    // Maintain aspect ratio
    const originalImage = uploadedImages[selectedImageIndex];
    if (!originalImage) return;

    const aspectRatio = originalImage.width / originalImage.height;

    if (newWidth) {
      const calculatedHeight = newWidth / aspectRatio;
      setTempImageSize({
        width: newWidth,
        height: calculatedHeight
      });
    } else if (newHeight) {
      const calculatedWidth = newHeight * aspectRatio;
      setTempImageSize({
        width: calculatedWidth,
        height: newHeight
      });
    }
  };
  const getCanvasContext = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return canvas.getContext("2d");
  }, []);

  const clampPointToDrawableArea = useCallback((point) => {
    return {
      x: Math.min(Math.max(point.x, 0), canvasSize.width),
      y: Math.min(Math.max(point.y, 0), SAFE_AREA_BOTTOM),
    };
  }, [canvasSize.width, SAFE_AREA_BOTTOM]);

  const isInToolbarZone = useCallback((point) => {
    return point.y >= SAFE_AREA_BOTTOM;
  }, [SAFE_AREA_BOTTOM]);

  const wrapTextLines = (paragraph, maxWidth, ctx, manualLineIndex = 0) => {
    const lines = [];
    const words = paragraph.split(" ");
    let currentLine = "";
    let currentLineStart = 0;

    const pushLine = (text) => {
      if (text === "" && lines.length === 0) {
        lines.push({ text: "", startCharIndex: currentLineStart, endCharIndex: currentLineStart, manualLineIndex });
        return;
      }
      lines.push({
        text,
        startCharIndex: currentLineStart,
        endCharIndex: currentLineStart + text.length,
        manualLineIndex,
      });
      currentLineStart += text.length;
    };

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const prefix = currentLine ? " " : "";
      const testLine = currentLine + prefix + word;
      const testWidth = ctx.measureText(testLine).width;

      if (testWidth <= maxWidth) {
        currentLine = testLine;
        continue;
      }

      if (currentLine) {
        pushLine(currentLine);
        currentLine = "";
      }

      if (ctx.measureText(word).width <= maxWidth) {
        currentLine = word;
      } else {
        let segment = "";
        let segmentStart = currentLineStart;

        for (let j = 0; j < word.length; j++) {
          const nextSegment = segment + word[j];
          if (ctx.measureText(nextSegment).width > maxWidth) {
            if (segment) {
              lines.push({
                text: segment,
                startCharIndex: segmentStart,
                endCharIndex: segmentStart + segment.length,
                manualLineIndex,
              });
              segmentStart += segment.length;
            }
            segment = word[j];
          } else {
            segment = nextSegment;
          }
        }

        currentLine = segment;
        currentLineStart = segmentStart;
      }
    }

    if (currentLine) {
      pushLine(currentLine);
    }

    return lines;
  };

  const constrainImagePosition = useCallback((x, y, width, height) => {
    const minX = 0;
    const maxX = canvasSize.width - width;
    const minY = 0;
    const maxY = Math.max(0, SAFE_AREA_BOTTOM - height);

    return {
      x: Math.min(Math.max(x, minX), maxX),
      y: Math.min(Math.max(y, minY), maxY)
    };
  }, [canvasSize.width, SAFE_AREA_BOTTOM]);

  const findNonOverlappingImagePosition = useCallback((width, height, currentImages = uploadedImages) => {
    const margin = 20;
    let y = 20;

    if (currentImages.length > 0) {
      const lastImage = currentImages[currentImages.length - 1];
      y = lastImage.y + lastImage.height + margin;
    }

    if (textBlocks.length > 0) {
      const lastTextBlock = textBlocks[textBlocks.length - 1];
      y = Math.max(y, lastTextBlock.y + 60);
    }

    const maxY = SAFE_AREA_BOTTOM - height;
    y = Math.min(y, maxY);

    return {
      x: 20,
      y: Math.max(20, y)
    };
  }, [uploadedImages, textBlocks]);
  const renderPathsToContext = useCallback((ctx) => {
    if (!ctx) return;

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
  }, [paths]);

  const drawPaths = useCallback(() => {
    const ctx = getCanvasContext();
    if (!ctx) return;
    renderPathsToContext(ctx);
  }, [getCanvasContext, renderPathsToContext]);

  const drawAllTextBlocks = useCallback(() => {
    const ctx = getCanvasContext();
    if (!ctx) return;

    const currentWidth = canvasSize.width;

    // Draw committed text blocks (on top of images)
    textBlocks.forEach((block) => {
      if (activeTextBlock && block.id === activeTextBlock.id) return;
      const font = block.font || "20px Arial";
      const lineHeight = TEXT_LINE_HEIGHT;
      const maxWidth = currentWidth - block.x - 20;
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
        const wrappedLines = wrapTextLines(paragraph, maxWidth, ctx);
        wrappedLines.forEach((line) => {
          ctx.fillText(line.text, block.x, currentY);
          currentY += lineHeight;
        });
      });
    });
  }, [textBlocks, activeTextBlock, getCanvasContext, canvasSize.width]);
  const drawPathsAndText = useCallback(() => {
    const ctx = getCanvasContext();
    if (!ctx) return;

    const currentWidth = canvasSize.width;
    const currentHeight = canvasSize.height;

    // Draw paths
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

    // Draw text blocks
    textBlocks.forEach((block) => {
      if (activeTextBlock && block.id === activeTextBlock.id) return;
      const font = block.font || "20px Arial";
      const lineHeight = TEXT_LINE_HEIGHT;
      const maxWidth = currentWidth - block.x - 20;
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
        const wrappedLines = wrapTextLines(paragraph, maxWidth, ctx);
        wrappedLines.forEach((line) => {
          ctx.fillText(line.text, block.x, currentY);
          currentY += lineHeight;
        });
      });
    });
  }, [paths, textBlocks, activeTextBlock, getCanvasContext, canvasSize.width]);

  const drawActiveTextIfNeeded = useCallback(() => {
    if (!textToolActive || !activeTextBlock) return;

    const ctx = getCanvasContext();
    if (!ctx) return;

    const currentWidth = canvasSize.width;
    const font = "20px Arial";
    const lineHeight = TEXT_LINE_HEIGHT;
    const maxWidth = currentWidth - activeTextBlock.x - 20;
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
      const wrappedLines = wrapTextLines(manualLine, maxWidth, ctx, manualLineIndex);
      wrappedLines.forEach((line) => {
        allVisibleLines.push({
          ...line,
          x: activeTextBlock.x,
          y: currentY,
        });
        currentY += lineHeight;
      });
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

    if (showCursor) {
      ctx.beginPath();
      ctx.moveTo(cursorX, cursorY);
      ctx.lineTo(cursorX, cursorY + lineHeight);
      ctx.strokeStyle = drawingColor;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    setCaretY(cursorY + lineHeight);
  }, [textToolActive, activeTextBlock, textLines, cursorPosition, drawingColor, showCursor, getCanvasContext, canvasSize.width]);

  const drawSingleImage = (imgObj, img, index) => {
    const ctx = getCanvasContext();
    if (!ctx || !img) return;

    try {
      ctx.drawImage(img, imgObj.x, imgObj.y, imgObj.width, imgObj.height);

      // Draw selection highlight border
      if (selectedImageIndex === index) {
        ctx.save();
        ctx.strokeStyle = "#4299e1";
        ctx.lineWidth = 3;
        ctx.strokeRect(imgObj.x, imgObj.y, imgObj.width, imgObj.height);
        ctx.restore();
      }

      // Draw delete button
      ctx.save();
      const iconX = imgObj.x + imgObj.width - 15;
      const iconY = imgObj.y + 15;

      ctx.beginPath();
      ctx.arc(iconX, iconY, 12, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#ccc";
      ctx.stroke();

      ctx.font = "bold 18px Arial";
      ctx.fillStyle = "red";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("×", iconX, iconY);
      ctx.restore();
    } catch (error) {
      console.error("Error drawing image:", error);
    }
  };
  const redrawCanvas = useCallback(() => {
    const ctx = getCanvasContext();
    const canvas = canvasRef.current;
    const currentWidth = canvasSize.width;
    const currentHeight = canvasSize.height;
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, currentWidth, currentHeight);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, currentWidth, currentHeight);

    // 1. Draw images first so drawing appears on top of the image
    if (uploadedImages.length > 0) {
      uploadedImages.forEach((imgObj, index) => {
        let img = imageCache.get(imgObj.src);

        if (img && img.complete) {
          drawSingleImage(imgObj, img, index);
        } else {
          const newImg = new Image();
          newImg.onload = () => {
            setImageCache(prev => {
              const newCache = new Map(prev);
              newCache.set(imgObj.src, newImg);
              return newCache;
            });
            drawSingleImage(imgObj, newImg, index);
          };
          newImg.onerror = () => {
            console.error("Failed to load image:", imgObj.src);
          };
          newImg.src = imgObj.src;
        }
      });
    }

    // 2. Draw paths on a separate transparent layer so erasing only affects drawings
    const drawingLayer = document.createElement("canvas");
    drawingLayer.width = currentWidth;
    drawingLayer.height = currentHeight;
    const drawingLayerCtx = drawingLayer.getContext("2d");
    if (drawingLayerCtx) {
      renderPathsToContext(drawingLayerCtx);
      ctx.drawImage(drawingLayer, 0, 0);
    }

    // 3. Draw ALL text blocks (committed) - top layer
    drawAllTextBlocks();

    // 4. Draw active text (currently being typed) - very top layer
    drawActiveTextIfNeeded();
  }, [uploadedImages, imageCache, getCanvasContext, renderPathsToContext, drawAllTextBlocks, drawActiveTextIfNeeded, selectedImageIndex]);
  // const redrawCanvas = useCallback(() => {
  //   const ctx = getCanvasContext();
  //   const canvas = canvasRef.current;
  //   const currentWidth = canvasSize.width;
  //   const currentHeight = canvasSize.height;
  //   if (!ctx || !canvas) return;

  //   ctx.clearRect(0, 0, currentWidth, currentHeight);
  //   ctx.fillStyle = "white";
  //   ctx.fillRect(0, 0, currentWidth, currentHeight);

  //   drawPathsAndText();
  //   drawActiveTextIfNeeded();

  //   if (uploadedImages.length === 0) return;

  //   let loadedCount = 0;
  //   const totalImages = uploadedImages.length;

  //   uploadedImages.forEach((imgObj, index) => {
  //     let img = imageCache.get(imgObj.src);

  //     if (img && img.complete) {
  //       drawSingleImage(imgObj, img, index);
  //       loadedCount++;
  //     } else {
  //       const newImg = new Image();
  //       newImg.onload = () => {
  //         setImageCache(prev => {
  //           const newCache = new Map(prev);
  //           newCache.set(imgObj.src, newImg);
  //           return newCache;
  //         });
  //         drawSingleImage(imgObj, newImg, index);
  //         loadedCount++;
  //       };
  //       newImg.onerror = () => {
  //         loadedCount++;
  //       };
  //       newImg.src = imgObj.src;
  //     }
  //   });
  // }, [uploadedImages, imageCache, getCanvasContext, drawPathsAndText, drawActiveTextIfNeeded, selectedImageIndex]);
  const moveTextWithImage = useCallback((imageIndex, deltaX, deltaY) => {
    const image = uploadedImages[imageIndex];
    if (!image) return;

    setTextBlocks(prev => prev.map(block => {
      // Check if this text block is on this image
      // You can add a property like `parentImageId` when creating text on image
      if (block.parentImageId === image.id) {
        return {
          ...block,
          x: block.x + deltaX,
          y: block.y + deltaY
        };
      }
      return block;
    }));
  }, [uploadedImages]);
  useEffect(() => {
    redrawCanvas();
  }, [uploadedImages, paths, textBlocks, textToolActive, activeTextBlock, textLines, cursorPosition, redrawCanvas, selectedImageIndex]);

  // Handle library image selection - MERGE correctly
  useEffect(() => {
    if (!location?.state?.selectedImages) return;

    console.log("Received images from library:", location.state.selectedImages);
    console.log("Current paths:", paths);
    console.log("Current textBlocks:", textBlocks);

    const incomingUrls = location.state.selectedImages;
    const oldImageObjects = location.state.oldImages || [];

    // Create a map of existing images
    const existingImagesMap = new Map();

    // First add current uploadedImages
    uploadedImages.forEach(img => {
      existingImagesMap.set(img.src, img);
    });

    // Then add oldImageObjects (these have positions)
    oldImageObjects.forEach(img => {
      if (!existingImagesMap.has(img.src)) {
        existingImagesMap.set(img.src, img);
      }
    });

    const mergedImages = [];

    // Process incoming images
    incomingUrls.forEach((src, index) => {
      const existingImage = existingImagesMap.get(src);

      if (existingImage) {
        // Keep existing image with its position
        mergedImages.push({
          ...existingImage,
          id: existingImage.id || Date.now() + index
        });
      } else {
        // New image
        const pos = findNonOverlappingImagePosition(200, 200, mergedImages);
        const constrainedPos = constrainImagePosition(pos.x, pos.y, 200, 200);
        mergedImages.push({
          src,
          x: constrainedPos.x,
          y: constrainedPos.y,
          width: 200,
          height: 200,
          id: Date.now() + index
        });
      }
    });

    // Update states - preserve existing paths and textBlocks
    setUploadedImages(uniqueImages(mergedImages));
    setSelectedImages([...incomingUrls]);

    // Don't clear paths and textBlocks - preserve them
    if (location.state.textBlocks && location.state.textBlocks.length > 0) {
      setTextBlocks(prev => {
        // Merge existing text blocks with new ones
        const existingTextMap = new Map();
        prev.forEach(block => existingTextMap.set(block.id, block));
        location.state.textBlocks.forEach(block => {
          if (!existingTextMap.has(block.id)) {
            existingTextMap.set(block.id, block);
          }
        });
        return Array.from(existingTextMap.values());
      });
    }

    if (location.state.paths && location.state.paths.length > 0) {
      setPaths(prev => [...prev, ...location.state.paths]);
    }

    // Clear location state
    setTimeout(() => {
      navigate(location.pathname, { replace: true, state: {} });
    }, 100);

  }, [location.state?.selectedImages, navigate, location.pathname]);

  const getCurrentTextBlocks = useCallback(() => {
    if (!activeTextBlock) {
      return textBlocks;
    }

    const textContent = textLines.join("\n");
    const snapshotBlock = {
      ...activeTextBlock,
      text: textContent,
      timestamp: Date.now(),
    };
    const existingIndex = textBlocks.findIndex(
      (block) => block.id === activeTextBlock.id
    );

    if (existingIndex >= 0) {
      const nextBlocks = [...textBlocks];
      nextBlocks[existingIndex] = snapshotBlock;
      return nextBlocks;
    }

    if (textContent.trim()) {
      return [...textBlocks, snapshotBlock];
    }

    return textBlocks;
  }, [activeTextBlock, textBlocks, textLines]);

  const getWhiteboardSnapshot = useCallback(() => {
    return {
      pathname,
      paths: [...paths],
      oldImages: [...uploadedImages],
      selectedImages: [...SelectedImages],
      textBlocks: getCurrentTextBlocks(),
    };
  }, [pathname, paths, uploadedImages, SelectedImages, getCurrentTextBlocks]);

  const handleImageUpload = useCallback((files) => {
    if (!files || files.length === 0) return;

    const filesArray = Array.from(files);
    const newImages = [];
    const newImageFiles = [...imageFiles];
    const newSelectedImages = [...SelectedImages];

    filesArray.forEach((file, idx) => {
      const src = URL.createObjectURL(file);
      newImageFiles.push(file);

      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        const maxSize = 200;

        if (width > maxSize || height > maxSize) {
          const scale = Math.min(maxSize / width, maxSize / height);
          width *= scale;
          height *= scale;
        }

        const currentAllImages = [...uploadedImages, ...newImages];
        const pos = findNonOverlappingImagePosition(width, height, currentAllImages);
        const constrainedPos = constrainImagePosition(pos.x, pos.y, width, height);

        const newImage = {
          src,
          x: constrainedPos.x,
          y: constrainedPos.y,
          width,
          height,
          id: Date.now() + idx + Math.random()
        };

        newImages.push(newImage);

        if (!newSelectedImages.includes(src)) {
          newSelectedImages.push(src);
        }

        if (newImages.length === filesArray.length) {
          setUploadedImages(prev => uniqueImages([...prev, ...newImages]));
          setImageFiles(newImageFiles);
          setSelectedImages(newSelectedImages);
        }
      };
      img.src = src;
    });
  }, [uploadedImages, imageFiles, SelectedImages, findNonOverlappingImagePosition, constrainImagePosition]);

  const handleDeleteImage = useCallback((index) => {
    const removedImage = uploadedImages[index];
    if (!removedImage) return;

    const removedSrc = removedImage.src;

    setUploadedImages(prev => prev.filter((_, i) => i !== index));
    setSelectedImages(prev => prev.filter(url => url !== removedSrc));
    setUpdateImage(prev => [...prev, removedSrc]);
    setImageFiles(prev => prev.filter((_, i) => i !== index));

    setImageCache(prev => {
      const newCache = new Map(prev);
      newCache.delete(removedSrc);
      return newCache;
    });

    if (removedSrc.startsWith('blob:')) {
      URL.revokeObjectURL(removedSrc);
    }
  }, [uploadedImages]);

  const uniqueImages = (images) => {
    const seen = new Map();
    return images.filter(img => {
      if (seen.has(img.src)) return false;
      seen.set(img.src, true);
      return true;
    });
  };

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
  const startDrawing = useCallback((e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const rawPos = pointerPos(e, rect);
    const pos = clampPointToDrawableArea(rawPos);
    const isDrawingTool = tool === "pencil" || tool === "eraser";

    if (isInToolbarZone(rawPos)) {
      return;
    }

    // While using pencil/eraser, keep image fixed so the user can draw on top of it.
    for (let i = uploadedImages.length - 1; i >= 0; i--) {
      const img = uploadedImages[i];
      if (
        pos.x >= img.x &&
        pos.x <= img.x + img.width &&
        pos.y >= img.y &&
        pos.y <= img.y + img.height
      ) {
        const iconX = img.x + img.width - 15;
        const iconY = img.y + 15;
        const dist = Math.sqrt((pos.x - iconX) ** 2 + (pos.y - iconY) ** 2);

        if (dist <= 15) {
          handleDeleteImage(i);
          return;
        }

        if (!isDrawingTool) {
          setSelectedImageIndex(i);
          setDraggingImage(i);
          setDragOffset({ x: pos.x - img.x, y: pos.y - img.y });
          return;
        }
      }
    }

    // Clicked on empty canvas - deselect image
    if (!isDrawingTool) {
      setSelectedImageIndex(null);
    }

    // Don't start drawing if text tool is active
    if (tool === "text") return;

    if (!isDrawingTool) return;
    setIsDrawing(true);
    setPaths((prev) => [
      ...prev,
      { tool, color: drawingColor, width: drawingWidth, points: [pos] },
    ]);
  }, [tool, drawingColor, drawingWidth, uploadedImages, handleDeleteImage, setSelectedImageIndex, clampPointToDrawableArea, isInToolbarZone]);
  // const startDrawing = useCallback((e) => {
  //   const rect = canvasRef.current.getBoundingClientRect();
  //   const rawPos = pointerPos(e, rect);
  //   const pos = clampPointToDrawableArea(rawPos);

  //   if (tool !== "text" && isInToolbarZone(rawPos)) {
  //     return;
  //   }

  //   for (let i = uploadedImages.length - 1; i >= 0; i--) {
  //     const img = uploadedImages[i];
  //     if (
  //       pos.x >= img.x &&
  //       pos.x <= img.x + img.width &&
  //       pos.y >= img.y &&
  //       pos.y <= img.y + img.height
  //     ) {
  //       const iconX = img.x + img.width - 15;
  //       const iconY = img.y + 15;
  //       const dist = Math.sqrt((pos.x - iconX) ** 2 + (pos.y - iconY) ** 2);

  //       if (dist <= 15) {
  //         handleDeleteImage(i);
  //         return;
  //       }

  //       setSelectedImageIndex(i);
  //       setDraggingImage(i);
  //       setDragOffset({ x: pos.x - img.x, y: pos.y - img.y });
  //       return;
  //     }
  //   }

  //   // Clicked on empty canvas - deselect image
  //   setSelectedImageIndex(null);

  //   if (tool !== "pencil" && tool !== "eraser") return;
  //   setIsDrawing(true);
  //   setPaths((prev) => [
  //     ...prev,
  //     { tool, color: drawingColor, width: drawingWidth, points: [pos] },
  //   ]);
  //   const ctx = getCanvasContext();
  //   if (ctx) {
  //     ctx.beginPath();
  //     ctx.lineCap = "round";
  //     ctx.lineJoin = "round";
  //     ctx.lineWidth = drawingWidth;
  //     ctx.strokeStyle = tool === "pencil" ? drawingColor : "#ffffff";
  //     ctx.globalCompositeOperation = tool === "pencil" ? "source-over" : "destination-out";
  //     ctx.moveTo(pos.x, pos.y);
  //   }
  // }, [tool, drawingColor, drawingWidth, uploadedImages, getCanvasContext, handleDeleteImage, setSelectedImageIndex, clampPointToDrawableArea, isInToolbarZone]);

  const decreaseImageSize = useCallback(() => {
    if (selectedImageIndex === null || uploadedImages[selectedImageIndex] === undefined) {
      // toast.info(selectedLanguage === "Spanish" ? "Seleccione una imagen primero" : "Please select an image first");
      return;
    }

    const resizeFactor = 0.85;
    setUploadedImages(prev => {
      const newImages = [...prev];
      const img = newImages[selectedImageIndex];
      const newWidth = Math.max(50, img.width * resizeFactor);
      const newHeight = newWidth / (img.width / img.height);
      const newX = img.x + (img.width - newWidth) / 2;
      const newY = img.y + (img.height - newHeight) / 2;
      const constrained = constrainImagePosition(newX, newY, newWidth, newHeight);
      newImages[selectedImageIndex] = { ...img, x: constrained.x, y: constrained.y, width: newWidth, height: newHeight };
      return newImages;
    });
  }, [selectedImageIndex, uploadedImages, constrainImagePosition, selectedLanguage]);

  const increaseImageSize = useCallback(() => {
    if (selectedImageIndex === null || uploadedImages[selectedImageIndex] === undefined) {
      // toast.info(selectedLanguage === "Spanish" ? "Seleccione una imagen primero" : "Please select an image first");
      return;
    }

    const resizeFactor = 1.15;
    setUploadedImages(prev => {
      const newImages = [...prev];
      const img = newImages[selectedImageIndex];
      const maxSize = Math.max(canvasSize.width, canvasSize.height) * 0.8;
      const newWidth = Math.min(maxSize, img.width * resizeFactor);
      const newHeight = newWidth / (img.width / img.height);
      const newX = img.x + (img.width - newWidth) / 2;
      const newY = img.y + (img.height - newHeight) / 2;
      const constrained = constrainImagePosition(newX, newY, newWidth, newHeight);
      newImages[selectedImageIndex] = { ...img, x: constrained.x, y: constrained.y, width: newWidth, height: newHeight };
      return newImages;
    });
  }, [selectedImageIndex, uploadedImages, constrainImagePosition, canvasSize, selectedLanguage]);

  const draw = useCallback((e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const rawPos = pointerPos(e, rect);
    const pos = clampPointToDrawableArea(rawPos);
    const isDrawingTool = tool === "pencil" || tool === "eraser";

    // Allow image dragging only when not using drawing tools.
    if (draggingImage !== null && !isDrawingTool) {
      setUploadedImages((prev) =>
        prev.map((img, i) => {
          if (i === draggingImage) {
            let newX = pos.x - dragOffset.x;
            let newY = pos.y - dragOffset.y;
            const constrained = constrainImagePosition(newX, newY, img.width, img.height);
            return { ...img, x: constrained.x, y: constrained.y };
          }
          return img;
        })
      );
      return;
    }

    // Check if hovering over an image to select it
    if (!isDrawingTool && draggingImage === null && !isDrawing) {
      let isHoveringImage = null;
      for (let i = 0; i < uploadedImages.length; i++) {
        const img = uploadedImages[i];
        if (
          pos.x >= img.x &&
          pos.x <= img.x + img.width &&
          pos.y >= img.y &&
          pos.y <= img.y + img.height
        ) {
          isHoveringImage = i;
          break;
        }
      }
      if (isHoveringImage !== null && isHoveringImage !== selectedImageIndex) {
        setSelectedImageIndex(isHoveringImage);
      }
    }

    // Handle drawing with pencil/eraser
    if (!isDrawing || tool === "text" || isInToolbarZone(rawPos)) return;

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
  }, [isDrawing, tool, draggingImage, dragOffset, constrainImagePosition, uploadedImages, setSelectedImageIndex, clampPointToDrawableArea, isInToolbarZone]);
  // const draw = useCallback((e) => {
  //   const rect = canvasRef.current.getBoundingClientRect();
  //   const rawPos = pointerPos(e, rect);
  //   const pos = clampPointToDrawableArea(rawPos);

  //   // Check if hovering over an image to select it (but not while dragging)
  //   if (draggingImage === null) {
  //     let isHoveringImage = null;
  //     for (let i = 0; i < uploadedImages.length; i++) {
  //       const img = uploadedImages[i];
  //       if (
  //         pos.x >= img.x &&
  //         pos.x <= img.x + img.width &&
  //         pos.y >= img.y &&
  //         pos.y <= img.y + img.height
  //       ) {
  //         isHoveringImage = i;
  //         break;
  //       }
  //     }
  //     // Only update if hovering over an image - don't deselect on mouse move away
  //     if (isHoveringImage !== null && isHoveringImage !== selectedImageIndex) {
  //       setSelectedImageIndex(isHoveringImage);
  //     }
  //   }

  //   if (draggingImage !== null) {
  //     setUploadedImages((prev) =>
  //       prev.map((img, i) => {
  //         if (i === draggingImage) {
  //           let newX = pos.x - dragOffset.x;
  //           let newY = pos.y - dragOffset.y;
  //           const constrained = constrainImagePosition(newX, newY, img.width, img.height);
  //           return { ...img, x: constrained.x, y: constrained.y };
  //         }
  //         return img;
  //       })
  //     );
  //     return;
  //   }

  //   if (!isDrawing || tool === "text" || isInToolbarZone(rawPos)) return;

  //   setPaths((prev) => {
  //     if (prev.length === 0) return prev;
  //     const newPaths = [...prev];
  //     const lastPath = newPaths[newPaths.length - 1];
  //     newPaths[newPaths.length - 1] = {
  //       ...lastPath,
  //       points: [...lastPath.points, pos],
  //     };
  //     return newPaths;
  //   });
  // }, [isDrawing, tool, draggingImage, dragOffset, constrainImagePosition, uploadedImages, setSelectedImageIndex, clampPointToDrawableArea, isInToolbarZone]);

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

  const setCanvasSize = useCallback((node) => {
    if (!node) return;

    const container = wrapperRef.current || node.parentElement;
    const displayWidth = container ? Math.min(container.clientWidth, CANVAS_WIDTH) : CANVAS_WIDTH;
    const displayHeight = Math.round((displayWidth * CANVAS_HEIGHT) / CANVAS_WIDTH);
    const dpr = window.devicePixelRatio || 1;

    node.width = Math.round(displayWidth * dpr);
    node.height = Math.round(displayHeight * dpr);
    node.style.width = `${displayWidth}px`;
    node.style.height = `${displayHeight}px`;

    const ctx = node.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    canvasRef.current = node;
    setCanvasDimensions({ width: displayWidth, height: displayHeight });
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    const resizeCanvas = () => {
      if (!canvasRef.current) return;
      setCanvasSize(canvasRef.current);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const container = wrapperRef.current;
    let observer;
    if (container && typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(resizeCanvas);
      observer.observe(container);
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (observer) observer.disconnect();
    };
  }, [setCanvasSize]);

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
    setSelectedImages([]);
    setImageCache(new Map());
    setUpdateImage([]);
  };

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
      toast.error("Please enter a drawing name");
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
      images: uploadedImages.map(img => ({
        src: img.src,
        x: img.x,
        y: img.y,
        width: img.width,
        height: img.height
      })),
      toolSettings: {
        color: drawingColor,
        width: drawingWidth,
      },
    };

    const payload = new FormData();
    payload.append("licenses_id", licenses_id);
    payload.append("name_key", drawingName);
    payload.append("images_url", JSON.stringify(SelectedImages));
    payload.append("data", JSON.stringify(state));

    if (id && id !== "null") {
      payload.append("white_id", id);
    }

    if (updateImage.length > 0) {
      payload.append("imageFileRemove", JSON.stringify(updateImage));
    }

    if (imageFiles && imageFiles.length > 0) {
      Array.from(imageFiles).forEach((file) => {
        payload.append("imageFiles[]", file);
      });
    }

    try {
      const urlPath = id && id !== "null" ? "whiteBoardUpdate" : "whiteBoardCreate";
      const { data } = await api.post(urlPath, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (data.status) {
        toast.success(data.msg);
        setTimeout(() => navigate("/white-board-list"), 1500);
      } else {
        toast.error(data.msg);
      }
    } catch (err) {
      toast.error(err?.response?.data?.msg || "Error saving drawing");
    }
  };

  const findNonOverlappingPosition = useCallback((clickX, clickY) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: clickX, y: clickY };
    const rect = canvas.getBoundingClientRect();
    const padding = 10;
    const lineHeight = TEXT_LINE_HEIGHT;
    const canvasWidth = rect.width || CANVAS_WIDTH;
    const canvasHeight = rect.height;
    let bestX = Math.max(
      padding,
      Math.min(clickX, canvasWidth - padding - 100)
    );
    let bestY = Math.max(
      padding,
      Math.min(clickY, SAFE_TEXT_BOTTOM - padding)
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
    bestY = Math.min(bestY, SAFE_TEXT_BOTTOM - lineHeight - padding);
    bestX = Math.min(bestX, canvasWidth - 100);
    return { x: bestX, y: bestY };
  }, [textBlocks, activeTextBlock, typedText, SAFE_TEXT_BOTTOM]);

  // const activateTextTool = () => {
  //   setTool("text");
  //   setTextToolActive(true);
  //   setShowKeyboard(true);
  //   if (textPosition.x === 0 && textPosition.y === 0) {
  //     setTextPosition({ x: 20, y: 20 });
  //     const newTextBlock = {
  //       id: Date.now(),
  //       x: 20,
  //       y: 20,
  //       text: "",
  //       color: drawingColor,
  //       font: "20px Arial",
  //     };
  //     setActiveTextBlock(newTextBlock);
  //   }
  // };

  const activateTextTool = () => {
    setTool("text");
    setTextToolActive(true);

    if (nativeInputRef.current) {
      nativeInputRef.current.focus();
    }

    if (textPosition.x === 0 && textPosition.y === 0) {
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
  };
  const handleNativeInputChange = (e) => {
    const value = e.target.value;
    if (value.length > 0) {
      // Insert the character typed
      insertTextAtCursor(value);
      // Clear the input so it's ready for the next character
      e.target.value = "";
    }
  };
  const handleClick = (e) => {
    if (tool !== "text") return;

    const rect = canvasRef.current.getBoundingClientRect();
    const rawPos = pointerPos(e, rect);
    const pos = clampPointToDrawableArea(rawPos);

    if (isInToolbarZone(rawPos)) {
      if (activeTextBlock) {
        commitTypedText();
      }
      return;
    }

    // Check if clicking on existing text block first
    const clickedBlock = textBlocks.find((block) => {
      const blockWidth = Math.min(300, canvasSize.width - block.x - 20);
      const blockRight = block.x + blockWidth;
      const blockBottom = block.y + calculateBlockHeight(block);
      return (
        pos.x >= block.x - 10 &&
        pos.x <= blockRight + 10 &&
        pos.y >= block.y - 5 &&
        pos.y <= blockBottom + 5
      );
    });

    if (clickedBlock) {
      if (activeTextBlock && activeTextBlock.id !== clickedBlock.id) {
        commitTypedText();
      }

      setActiveTextBlock(clickedBlock);
      const lines = clickedBlock.text.split("\n");
      setTextLines(lines);
      setTypedText(clickedBlock.text);
      updateCursorPosition(pos, clickedBlock);
      setTextToolActive(true);
      if (nativeInputRef.current) {
        nativeInputRef.current.focus();
      }
      return;
    }

    // Commit any active text block before creating new one
    if (activeTextBlock) {
      commitTypedText();
    }

    // Create text at click position (can be on image or empty area)
    const newTextBlock = {
      id: Date.now(),
      x: pos.x,
      y: pos.y,
      text: "",
      color: drawingColor,
      font: "20px Arial",
    };

    setActiveTextBlock(newTextBlock);
    setTextLines([""]);
    setTypedText("");
    setCursorPosition({ line: 0, column: 0 });
    setTextToolActive(true);
    if (nativeInputRef.current) {
      nativeInputRef.current.focus();
    }
  };
  // const handleClick = (e) => {
  //   if (tool !== "text") return;
  //   const rect = canvasRef.current.getBoundingClientRect();
  //   const rawPos = pointerPos(e, rect);
  //   const pos = clampPointToDrawableArea(rawPos);

  //   if (isInToolbarZone(rawPos)) {
  //     if (activeTextBlock) {
  //       commitTypedText();
  //     }
  //     return;
  //   }

  //   const clickedBlock = textBlocks.find((block) => {
  //     const blockWidth = Math.min(300, canvasSize.width - block.x - 20);
  //     const blockRight = block.x + blockWidth;
  //     const blockBottom = block.y + calculateBlockHeight(block);
  //     return (
  //       pos.x >= block.x - 10 &&
  //       pos.x <= blockRight + 10 &&
  //       pos.y >= block.y - 5 &&
  //       pos.y <= blockBottom + 5
  //     );
  //   });

  //   if (clickedBlock) {
  //     if (activeTextBlock && activeTextBlock.id !== clickedBlock.id) {
  //       commitTypedText();
  //     }

  //     setActiveTextBlock(clickedBlock);
  //     const lines = clickedBlock.text.split("\n");
  //     setTextLines(lines);
  //     setTypedText(clickedBlock.text);
  //     updateCursorPosition(pos, clickedBlock);
  //     setTextToolActive(true);
  //     if (nativeInputRef.current) {
  //       nativeInputRef.current.focus();
  //     }
  //     return;
  //   }

  //   if (activeTextBlock) {
  //     commitTypedText();
  //   }

  //   const newPosition = findNonOverlappingPosition(pos.x, pos.y);
  //   const newTextBlock = {
  //     id: Date.now(),
  //     x: newPosition.x,
  //     y: newPosition.y,
  //     text: "",
  //     color: drawingColor,
  //     font: "20px Arial",
  //   };

  //   setActiveTextBlock(newTextBlock);
  //   setTextLines([""]);
  //   setTypedText("");
  //   setCursorPosition({ line: 0, column: 0 });
  //   setTextToolActive(true);
  //   if (nativeInputRef.current) {
  //     nativeInputRef.current.focus();
  //   }
  // };

  const calculateBlockHeight = useCallback((block) => {
    const ctx = getCanvasContext();
    if (!ctx) return 100;
    const font = block.font || "20px Arial";
    ctx.font = font;
    const lineHeight = TEXT_LINE_HEIGHT;
    const maxWidth = canvasSize.width - block.x - 20;
    const paragraphs = block.text.split("\n");
    let totalHeight = 0;
    paragraphs.forEach((paragraph) => {
      if (paragraph === "") {
        totalHeight += lineHeight;
        return;
      }
      const wrappedLines = wrapTextLines(paragraph, maxWidth, ctx);
      totalHeight += wrappedLines.length * lineHeight;
    });
    return Math.max(totalHeight, lineHeight);
  }, [canvasSize.width, getCanvasContext]);

  const updateCursorPosition = (pos, block) => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.font = "20px Arial";
    const lineHeight = TEXT_LINE_HEIGHT;
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

  const handleKeyboardChange = (input) => {
    setTypedText(input);
    const lines = input.split("\n");
    setTextLines(lines);
  };

  const handleKeyboardKeyPress = (button) => {
    if (!button) return;

    switch (button) {
      case "{enter}":
      case "{return}":
      case "Enter":
        if (caretY + TEXT_LINE_HEIGHT > SAFE_AREA_BOTTOM) {
          return;
        }
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
    if (caretY > SAFE_TEXT_BOTTOM) {
      return;
    }

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
      newLines[cursorPosition.line - 1] = prevLine + currentLine;
      newLines.splice(cursorPosition.line, 1);
      setTextLines(newLines);
      setCursorPosition({
        line: cursorPosition.line - 1,
        column: prevLine.length,
      });
      setTypedText(newLines.join("\n"));
    }
  };

  useEffect(() => {
    if (!textToolActive) return;
    const blink = setInterval(() => setShowCursor((c) => !c), 500);
    return () => clearInterval(blink);
  }, [textToolActive]);

  useEffect(() => {
    if (!textToolActive) return;
    const onKeyDown = (e) => {
      if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;

      if (e.ctrlKey || e.metaKey || e.altKey) return;

      e.preventDefault();

      switch (e.key) {
        case "Backspace":
          handleBackspace();
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
          if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
            insertTextAtCursor(e.key);
          }
          break;
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [textToolActive, textLines, cursorPosition]);

  const checkDataExits = () => {
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

    return !(
      state.paths?.length === 0 &&
      state.texts?.length === 0 &&
      state.images?.length === 0
    );
  };

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
    if (!id || id === "null") {
      setLoader(false);
      return;
    }

    if (location.state?.selectedImages) {
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

          const restoredImages = [];
          const imageUrls = [];

          imagesArray.forEach((img, index) => {
            const constrainedPos = constrainImagePosition(img.x, img.y, img.width, img.height);
            restoredImages.push({
              src: img.src,
              x: constrainedPos.x,
              y: constrainedPos.y,
              width: img.width,
              height: img.height,
              id: Date.now() + index
            });
            imageUrls.push(img.src);
          });

          setUploadedImages(restoredImages);
          setSelectedImages(imageUrls);
        }
      } catch (err) {
        console.error("Failed to fetch whiteboard:", err);
      } finally {
        setLoader(false);
      }
    };

    fetchBoard();
  }, [id, licenses_id, token]);

  const discardChanges = () => {
    setIsPopupOpen(false);
    navigate(-1);
  };

  const saveFunction = () => {
    setIsPopupOpen(false);
    setShowSaveModal(true);
  };

  const t = (params) => {
    const transtext = selectedLanguage === "Spanish" ? "sp" : "en";
    const trans = {
      en: {
        name: "Whiteboard",
        title: "Saved WhiteBoards List",
        text: "View List"
      },
      sp: {
        name: "Pizarron",
        title: "Lista de Pizarras Guardadas",
        text: "Ver Lista"
      }
    }
    return trans[transtext][params];
  }

  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (Scoller) {
      setScoller(false);

      const delay = isLandscape ? 300 : 100;

      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      }, delay);
    }
  }, [Scoller, isLandscape]);


  return (
    <>
      {FileUpload && (
        <ImageUpload
          getWhiteboardSnapshot={getWhiteboardSnapshot}
          textBlocks={textBlocks}
          paths={paths}
          oldImages={uploadedImages}
          pathname={pathname}
          uploadedImages={SelectedImages}
          handleImageUpload={handleImageUpload}
          setOpen={setFileUpload}
          open={FileUpload}
        />
      )}
      {isPopupOpen && (
        <SaveWarningPopup
          open={isPopupOpen}
          onConfirm={discardChanges}
          onCancel={saveFunction}
        />
      )}
      {loader ? (
        <Loader />
      ) : (
        <>
          <Header
            isSummary={checkDataExits()}
            setIsPopupOpen={setIsPopupOpen}
            selectedLanguage={selectedLanguage}
            introductionOn={IntroductionOn}
            calendarOn={CalendarOn}
            name={t("name")}
            whiteboardname={t("title")}
          />
          <div className="main-wrapper home-wrapper whiteboard-wrapper">
            <div className="flex flex-col items-center whiteboard-card ">
              <Card className="w-full max-w-[985px] flex flex-col relative overflow-hidden">
                <div
                  ref={wrapperRef}
                  className="relative w-full overflow-hidden mx-auto"
                  style={{ touchAction: 'none' }}
                >
                  <canvas
                    ref={setCanvasSize}
                    className={`w-auto whiteboard-canvas touch-none pt-0 z-0 mx-auto ${tool === "text"
                      ? "cursor-text"
                      : tool === "eraser"
                        ? "cursor-eraser"
                        : "cursor-crosshair"
                      }`}
                    style={{ touchAction: 'none' }}
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
                <CardContent className="whiteboard-toolbar absolute bottom-3 left-0 right-0 z-1 overflow-x-auto px-2 py-2 sm:px-4">
                  <div className="flex min-w-max flex-nowrap items-center justify-start gap-2 sm:justify-center sm:gap-3 bg-white">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(tool === "pencil" && "bg-gray-100")}
                      onClick={() => {
                        if (activeTextBlock && typedText.trim()) {
                          commitTypedText();
                        }
                        setTool("pencil");
                        setShowKeyboard(false);
                        setSelectedImageIndex(null);
                      }}
                      title={selectedLanguage === "Spanish" ? "Lápiz" : "Pencil"}
                    >
                      <img src={PencilIcon} className="icon-size-add" alt="Pencil Icon" />
                    </Button>

                    <input
                      ref={nativeInputRef}
                      type="text"
                      inputMode="text"
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                      style={{
                        position: 'fixed',
                        top: '100vh',
                        left: 0,
                        width: 0,
                        height: 0,
                        opacity: 0,
                        pointerEvents: 'none',
                        border: 'none',
                        padding: 0,
                        margin: 0,
                        zIndex: -1,
                      }}
                      onChange={handleNativeInputChange}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace') handleBackspace();
                        if (e.key === 'Enter') handleKeyboardKeyPress('{enter}');
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={activateTextTool}
                      title={selectedLanguage === "Spanish" ? "Teclado" : "Keyboard"}
                    >
                      <img
                        src={TextIcon}
                        className="icon-size-add"
                        alt="Keyboard Icon"
                      />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      title={selectedLanguage === "Spanish" ? "Subir imagen" : "Upload image"}
                      onClick={(e) => {
                        e.stopPropagation();
                        setFileUpload(true);
                      }}
                    >
                      <img
                        src={ImgIcon}
                        className="icon-size-add"
                        alt="Upload Image"
                      />
                    </Button>
                    <div className="flex shrink-0 items-center gap-1 sm:gap-2" style={{ color: " #364153" }}>
                      <Button
                        variant=""
                        size="sm"
                        className={cn(
                          "h-8 w-8 p-0 ",
                          selectedImageIndex !== null && ""
                        )}
                        onClick={handleResizeButtonClick}
                        title={selectedLanguage === "Spanish" ? "Cambiar tamaño" : "Resize"}
                      >
                        <GiResize className="w-5 h-5" />
                      </Button>
                    </div>

                    <input
                      type="file"
                      id="imageUpload"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        setTool("");
                        setSelectedImageIndex(null);
                        handleImageUpload(Array.from(e.target.files));
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(tool === "eraser" && "bg-gray-100")}
                      onClick={() => {
                        if (activeTextBlock && typedText.trim()) {
                          commitTypedText();
                        }
                        setTool("eraser");
                        setShowKeyboard(false);
                        setDrawingWidth(20);
                        setSelectedImageIndex(null);
                      }}
                      title={selectedLanguage === "Spanish" ? "Borrador" : "Eraser"}
                    >
                      <img src={EraserIcon} className="icon-size-add" alt="Eraser Icon" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0 bg-gray-100"
                      onClick={handleClear}
                      title={selectedLanguage === "Spanish" ? "Borrar todo" : "Clear All"}
                    >
                      <img
                        src={DeleteIcon}
                        className="icon-size-add"
                        alt="Clear All"
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0"
                      onClick={() => setShowSaveModal(true)}
                      title={selectedLanguage === "Spanish" ? "Guardar archivo" : "File Save"}
                    >
                      <img
                        src={SaveIcon}
                        className="icon-size-add"
                        alt="Save Icon"
                      />
                    </Button>
                    <div className="flex shrink-0 items-center gap-1 sm:gap-2">
                      <label className="hidden text-xs text-gray-600 sm:block sm:text-sm">
                        {selectedLanguage === "Spanish" ? "Ancho" : "Width"}
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="24"
                        value={drawingWidth}
                        onChange={(e) => setDrawingWidth(Number(e.target.value))}
                        className="w-20 sm:w-28 md:w-32"
                      />
                      <span className="w-6 text-center text-xs text-gray-700 sm:text-sm">
                        {drawingWidth}
                      </span>
                    </div>

                  </div>
                </CardContent>
              </Card>
              {showResizePopup && selectedImageIndex !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                  <div className="relative w-[300px] rounded-lg bg-white p-6 shadow-lg">
                    <div className="mb-4 text-center">
                      <h2 className="text-xl font-semibold">
                        {selectedLanguage === "Spanish" ? "Cambiar tamaño" : "Resize Image"}
                      </h2>
                    </div>

                    <div className="flex items-center justify-center gap-6">
                      <Button
                        variant="outline"
                        size="lg"
                        className="h-16 w-16 rounded-xl text-3xl font-bold hover:bg-blue-50"
                        onClick={decreaseImageSize}
                      >
                        −
                      </Button>

                      <div className="flex flex-col items-center">
                        <GiResize className="h-8 w-8 text-gray-600" />
                        <span className="mt-1 text-xs text-gray-500">
                          {selectedLanguage === "Spanish" ? "Tamaño" : "Size"}
                        </span>
                      </div>

                      <Button
                        variant="outline"
                        size="lg"
                        className="h-16 w-16 rounded-xl text-3xl font-bold hover:bg-blue-50"
                        onClick={increaseImageSize}
                      >
                        +
                      </Button>
                    </div>

                    <div className="mt-6 flex justify-center gap-3">
                      <Button
                        variant="outline"
                        className="h-10 rounded-lg px-6"
                        onClick={handleResizeCancel}
                      >
                        {selectedLanguage === "Spanish" ? "Cerrar" : "Close"}
                      </Button>
                    </div>
                  </div>
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
                              ? "Número de habitación (sin PHI)"
                              : "Room Number (no PHI)"
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
