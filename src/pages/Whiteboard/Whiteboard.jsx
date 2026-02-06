// import React, { useState, useRef, useCallback, useEffect } from "react";
// import Header from "../../Component/Layout/Header/Header";
// import Footer from "../../Component/Layout/Footer/Footer";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import api from "../../Component/apiCall/apiCall";
// import { toast } from "react-toastify";
// import Keyboard from "react-simple-keyboard";
// import "react-simple-keyboard/build/css/index.css";
// import Loader from "../../Component/webLoader/loader";
// import getSetting from "../../Component/settingApi/settings";
// import { SlPencil } from "react-icons/sl";
// import { RiEraserFill } from "react-icons/ri";
// import { FaSave } from "react-icons/fa";
// import ImageUpload from "./imageUpload.jsx";
// import SaveWarningPopup from "../../Component/SaveWarningPopup/SaveWarningPopup";
// import {
//   PencilIcon,
//   TextIcon,
//   ImgIcon,
//   EraserIcon,
//   SaveIcon,
//   DeleteIcon,
//   KeyBoardIcon,
//   imageUploadIcon,
// } from "../../Component/DiseasesData/images.jsx";
// /* -------------------- Minimal helpers & UI -------------------- */
// function cn(...a) {
//   return a.filter(Boolean).join(" ");
// }

// const Button = ({
//   className = "",
//   variant = "default",
//   size = "md",
//   ...props
// }) => {
//   const base =
//     "inline-flex items-center justify-center rounded-md transition active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-offset-2";
//   const variants = {
//     default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-700",
//     outline:
//       "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 focus:ring-blue-700",
//     ghost: "bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-blue-700",
//   };
//   const sizes = {
//     md: "h-10 px-4 text-sm",
//     icon: "h-10 w-10 p-0",
//   };
//   return (
//     <button
//       className={cn(base, variants[variant], sizes[size], className)}
//       {...props}
//     />
//   );
// };

// const Card = ({ className = "", ...props }) => (
//   <div
//     className={cn(
//       "rounded-xl border border-gray-200 bg-white shadow-sm",
//       className
//     )}
//     {...props}
//   />
// );

// const CardHeader = ({ className = "", ...props }) => (
//   <div className={cn("border-b border-gray-200", className)} {...props} />
// );

// const CardContent = ({ className = "", ...props }) => (
//   <div className={cn("p-4 sm:p-5", className)} {...props} />
// );

// const Icon = {
//   Pencil: (p) => <SlPencil {...p} />,
//   Image: (p) => <img src={imageUploadIcon} alt="img upload" {...p} />,
//   Trash: (p) => <RiEraserFill {...p} />,
//   Keyword: (p) => <img src={KeyBoardIcon} alt="keyboard icon" {...p} />,
//   FileSave: (p) => <FaSave {...p} />,
// };
// export default function Whiteboard() {
//   const location = useLocation();
//   const pathname = location?.pathname ?? "";
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const canvasRef = useRef(null);
//   const stripRef = useRef(null);
//   const [showKeyboard, setShowKeyboard] = useState(false);
//   const [paths, setPaths] = useState([]);
//   const [cursorPosition, setCursorPosition] = useState({ line: 0, column: 0 });
//   const [textLines, setTextLines] = useState([""]);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [drawingColor, setDrawingColor] = useState("#000000");
//   const [drawingWidth, setDrawingWidth] = useState(2);
//   const [tool, setTool] = useState("pencil");
//   const [drawingName, setDrawingName] = useState("");
//   const [showSaveModal, setShowSaveModal] = useState(false);
//   const [uploadedImages, setUploadedImages] = useState([]);
//   const [textToolActive, setTextToolActive] = useState(false);
//   const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
//   const [typedText, setTypedText] = useState("");
//   const [IntroductionOn, setIntroductionOn] = React.useState("");
//   const [CalendarOn, setCalendarOn] = React.useState("");
//   const [draggingImage, setDraggingImage] = useState(null);
//   const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
//   const [showCursor, setShowCursor] = useState(true);
//   const [FileUpload, setFileUpload] = useState(false);
//   const token = localStorage.getItem("token");
//   const licenses_id = localStorage.getItem("license_key");
//   const [selectedLanguage, setSelectedLanguage] = React.useState("");
//   const [loader, setLoader] = useState(true);
//   const [imageFiles, setImageFiles] = useState([]);
//   const wrapperRef = useRef(null);
//   const [caretY, setCaretY] = useState(0);
//   const [textBlocks, setTextBlocks] = useState([]);
//   const [activeTextBlock, setActiveTextBlock] = useState(null);
//   const [SelectedImages, setSelectedImages] = useState([]);
//   const [updateImage, setUpdateImage] = useState([]);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [loadedImages, setLoadedImages] = useState(new Map());
//   const getCanvasContext = useCallback(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return null;
//     return canvas.getContext("2d");
//   }, []);

//   useEffect(() => {
//     if (!location?.state?.selectedImages) return;
//     if (activeTextBlock && typedText.trim()) {
//       commitTypedText();
//     }
//     if (location.state.textBlocks) {
//       setTextBlocks(location.state.textBlocks);
//     }
//     if (location.state.paths) {
//       setPaths(location.state.paths)
//     }
//     const incoming = location.state.selectedImages;
//     setUploadedImages((prev) => {
//       const updated = [...prev];
//       const viewport = window.visualViewport || window;
//       const isMobile = viewport.width < 768;
//       const maxSize = isMobile ? 120 : 200;
//       const mobileMaxSize = viewport.width < 480 ? 80 : 120;

//       incoming.forEach((item, index) => {
//         const isObject = typeof item === "object";
//         const src = isObject ? item.src : item;
//         if (updated.some((img) => img.src === src)) return;

//         if (isObject && item.x !== undefined && item.y !== undefined) {
//           let width = item.width || maxSize;
//           let height = item.height || maxSize;
//           if (isMobile && (width > maxSize || height > maxSize)) {
//             const scale = Math.min(maxSize / width, maxSize / height);
//             width *= scale;
//             height *= scale;
//           }
//           if (
//             viewport.width < 480 &&
//             (width > mobileMaxSize || height > mobileMaxSize)
//           ) {
//             const scale = Math.min(
//               mobileMaxSize / width,
//               mobileMaxSize / height
//             );
//             width *= scale;
//             height *= scale;
//           }
//           updated.push({
//             src: item.src,
//             x: item.x,
//             y: item.y,
//             width,
//             height,
//             originalWidth: item.originalWidth || width,
//             originalHeight: item.originalHeight || height,
//           });
//         } else {
//           const img = new Image();
//           img.src = src;
//           img.onload = () => {
//             let width = img.width;
//             let height = img.height;
//             if (isMobile) {
//               const targetMaxSize =
//                 viewport.width < 480 ? mobileMaxSize : maxSize;
//               if (width > targetMaxSize || height > targetMaxSize) {
//                 const scale = Math.min(
//                   targetMaxSize / width,
//                   targetMaxSize / height
//                 );
//                 width *= scale;
//                 height *= scale;
//               }
//             } else {
//               if (width > maxSize || height > maxSize) {
//                 const scale = Math.min(maxSize / width, maxSize / height);
//                 width *= scale;
//                 height *= scale;
//               }
//             }
//             const pos = findNonOverlappingImagePosition(width, height);
//             setUploadedImages((current) => {
//               const existingIndex = current.findIndex((img) => img.src === src);
//               if (existingIndex >= 0) return current;
//               return [
//                 ...current,
//                 {
//                   src,
//                   x: pos.x + index * (isMobile ? 5 : 15),
//                   y: pos.y + index * (isMobile ? 5 : 15),
//                   width,
//                   height,
//                   originalWidth: img.width,
//                   originalHeight: img.height,
//                 },
//               ];
//             });
//           };

//           // Add placeholder
//           const placeholderSize = isMobile
//             ? viewport.width < 480
//               ? 80
//               : 120
//             : 200;
//           const pos = findNonOverlappingImagePosition(
//             placeholderSize,
//             placeholderSize
//           );
//           updated.push({
//             src,
//             x: pos.x + index * (isMobile ? 5 : 15),
//             y: pos.y + index * (isMobile ? 5 : 15),
//             width: placeholderSize,
//             height: placeholderSize,
//             placeholder: true,
//           });
//         }
//       });
//       return uniqueImages(updated);
//     });

//     if (location.state) {
//       navigate(location.pathname, { replace: true, state: {} });
//     }

//   }, [location.state?.selectedImages]);

//   const pointerPos = (e, rect) => {
//     let clientX, clientY;
//     if (e.touches && e.touches[0]) {
//       clientX = e.touches[0].clientX;
//       clientY = e.touches[0].clientY;
//     } else {
//       clientX = e.clientX;
//       clientY = e.clientY;
//     }
//     return { x: clientX - rect.left, y: clientY - rect.top };
//   };

//   const findNonOverlappingPosition = useCallback(
//     (clickX, clickY) => {
//       const canvas = canvasRef.current;
//       if (!canvas) return { x: clickX, y: clickY };
//       const rect = canvas.getBoundingClientRect();
//       const padding = 10;
//       const lineHeight = 24;
//       const canvasWidth = rect.width || 985;
//       const canvasHeight = rect.height ?? 600;
//       let bestX = Math.max(
//         padding,
//         Math.min(clickX, canvasWidth - padding - 100)
//       );
//       let bestY = Math.max(
//         padding,
//         Math.min(clickY, canvasHeight - padding - 50)
//       );
//       const allBlocks = [...textBlocks];
//       if (activeTextBlock && typedText.trim()) {
//         allBlocks.push(activeTextBlock);
//       }
//       const sortedBlocks = [...allBlocks].sort((a, b) => a.y - b.y);
//       for (let i = 0; i < sortedBlocks.length; i++) {
//         const block = sortedBlocks[i];
//         const blockBottom = block.y + (block.height || lineHeight) + padding;
//         if (bestY < blockBottom && Math.abs(bestX - block.x) < 200) {
//           bestY = blockBottom;
//         }
//       }
//       bestY = Math.min(bestY, canvasHeight - lineHeight * 3 - padding);
//       bestX = Math.min(bestX, canvasWidth - 100);
//       return { x: bestX, y: bestY };
//     },
//     [textBlocks, activeTextBlock, typedText]
//   );

//   useEffect(() => {
//     if (!textToolActive) return;
//     const blink = setInterval(() => setShowCursor((c) => !c), 500);
//     return () => clearInterval(blink);
//   }, [textToolActive]);

//   /* -------------------- Canvas setup -------------------- */
//   const setCanvasSize = useCallback((node) => {
//     if (!node) return;
//     const dpr = window.devicePixelRatio || 1;
//     const viewport = window.visualViewport || window;
//     const width = Math.max(0, Math.floor(viewport.width - 120));
//     const height = Math.max(0, Math.floor(viewport.height - 150));
//     node.width = Math.round(width * dpr);
//     node.height = Math.round(height * dpr);
//     node.style.width = `${width}px`;
//     node.style.height = `${height}px`;
//     const ctx = node.getContext("2d");
//     if (ctx) ctx.scale(dpr, dpr);
//     canvasRef.current = node;
//   }, []);

//   /* -------------------- Drawing -------------------- */
//   const startDrawing = (e) => {
//     const rect = canvasRef.current.getBoundingClientRect();
//     const pos = pointerPos(e, rect);
//     for (let i = uploadedImages.length - 1; i >= 0; i--) {
//       const img = uploadedImages[i];
//       if (
//         pos.x >= img.x &&
//         pos.x <= img.x + img.width &&
//         pos.y >= img.y &&
//         pos.y <= img.y + img.height
//       ) {
//         setDraggingImage(i);
//         setDragOffset({ x: pos.x - img.x, y: pos.y - img.y });
//         return;
//       }
//     }
//     if (tool !== "pencil" && tool !== "eraser") return;
//     setIsDrawing(true);
//     setPaths((prev) => [
//       ...prev,
//       { tool, color: drawingColor, width: drawingWidth, points: [pos] },
//     ]);
//     const ctx = getCanvasContext();
//     if (ctx) {
//       ctx.beginPath();
//       ctx.lineCap = "round";
//       ctx.lineJoin = "round";
//       ctx.lineWidth = drawingWidth;
//       ctx.strokeStyle = tool === "pencil" ? drawingColor : "#ffffff";
//       ctx.moveTo(pos.x, pos.y);
//     }
//   };

//   const findNonOverlappingImagePosition = useCallback(
//     (width, height, currentImages = uploadedImages) => {
//       const margin = 20;
//       let y = 20;
//       if (currentImages.length > 0) {
//         const lastImage = currentImages[currentImages.length - 1];
//         y = lastImage.y + lastImage.height + margin;
//       }
//       // Also consider existing text blocks
//       if (textBlocks.length > 0) {
//         const lastTextBlock = textBlocks[textBlocks.length - 1];
//         y = Math.max(y, lastTextBlock.y + 60);
//       }
//       return {
//         x: 20,
//         y,
//       };
//     },
//     [uploadedImages, textBlocks]
//   );

//   const draw = useCallback(
//     (e) => {
//       const rect = canvasRef.current.getBoundingClientRect();
//       const pos = pointerPos(e, rect);
//       if (draggingImage !== null) {
//         setUploadedImages((prev) =>
//           prev.map((img, i) =>
//             i === draggingImage
//               ? { ...img, x: pos.x - dragOffset.x, y: pos.y - dragOffset.y }
//               : img
//           )
//         );
//         return;
//       }
//       if (!isDrawing || tool === "text") return;
//       setPaths((prev) => {
//         if (prev.length === 0) return prev;
//         const newPaths = [...prev];
//         const lastPath = newPaths[newPaths.length - 1];
//         newPaths[newPaths.length - 1] = {
//           ...lastPath,
//           points: [...lastPath.points, pos],
//         };
//         return newPaths;
//       });
//     },
//     [
//       isDrawing,
//       drawingColor,
//       drawingWidth,
//       tool,
//       getCanvasContext,
//       draggingImage,
//       dragOffset,
//     ]
//   );

//   const stopDrawing = useCallback(() => {
//     setIsDrawing(false);
//     setDraggingImage(null);
//     const ctx = getCanvasContext();
//     if (ctx) {
//       try {
//         ctx.closePath();
//       } catch (err) { }
//       ctx.globalCompositeOperation = "source-over";
//     }
//   }, [getCanvasContext]);
//   /* -------------------- Text helpers -------------------- */
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     // Clear canvas first with white background
//     ctx.fillStyle = "#ffffff";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     // Draw uploaded images from cache
//     uploadedImages.forEach((imgObj) => {
//       const cachedImg = loadedImages.get(imgObj.src);
//       if (cachedImg && cachedImg.complete) {
//         ctx.drawImage(cachedImg, imgObj.x, imgObj.y, imgObj.width, imgObj.height);
//       } else {
//         // If not cached, load and cache it
//         const img = new Image();
//         img.onload = () => {
//           // Update the cache
//           setLoadedImages(prev => new Map(prev).set(imgObj.src, img));
//           // Draw immediately
//           ctx.drawImage(img, imgObj.x, imgObj.y, imgObj.width, imgObj.height);
//         };
//         img.src = imgObj.src;
//       }
//     });

//     // Draw paths
//     paths.forEach((path) => {
//       if (!path.points || path.points.length === 0) return;
//       ctx.beginPath();
//       ctx.lineWidth = path.width;
//       ctx.lineCap = "round";
//       ctx.lineJoin = "round";
//       ctx.strokeStyle = path.tool === "pencil" ? path.color : "#ffffff";
//       ctx.globalCompositeOperation =
//         path.tool === "pencil" ? "source-over" : "destination-out";

//       ctx.moveTo(path.points[0].x, path.points[0].y);
//       for (let i = 1; i < path.points.length; i++) {
//         ctx.lineTo(path.points[i].x, path.points[i].y);
//       }
//       ctx.stroke();
//       ctx.closePath();
//       ctx.globalCompositeOperation = "source-over";
//     });

//     // Draw text blocks
//     textBlocks.forEach((block) => {
//       if (activeTextBlock && block.id === activeTextBlock.id) return;

//       const font = block.font || "20px Arial";
//       const lineHeight = 24;
//       const maxWidth = canvas.width - block.x - 20;

//       ctx.font = font;
//       ctx.fillStyle = block.color || "#000";
//       ctx.textBaseline = "top";

//       let currentY = block.y;
//       const paragraphs = block.text.split("\n");

//       paragraphs.forEach((paragraph) => {
//         if (paragraph === "") {
//           currentY += lineHeight;
//           return;
//         }

//         const words = paragraph.split(" ");
//         let currentLine = "";

//         for (let i = 0; i < words.length; i++) {
//           const word = words[i];
//           const testLine = currentLine ? currentLine + " " + word : word;
//           const testWidth = ctx.measureText(testLine).width;
//           if (testWidth > maxWidth && currentLine) {
//             ctx.fillText(currentLine, block.x, currentY);
//             currentY += lineHeight;
//             currentLine = word;
//           } else {
//             currentLine = testLine;
//           }
//         }

//         if (currentLine) {
//           ctx.fillText(currentLine, block.x, currentY);
//           currentY += lineHeight;
//         }
//       });
//     });

//     // Draw active text block with cursor (keep your existing code)
//     if (textToolActive && activeTextBlock) {
//       // ... [Keep all your existing active text block drawing code] ...
//       const font = "20px Arial";
//       const lineHeight = 24;
//       const maxWidth = canvas.width - activeTextBlock.x - 20;
//       ctx.font = font;
//       ctx.fillStyle = drawingColor;
//       ctx.textBaseline = "top";
//       let currentY = activeTextBlock.y;
//       let cursorX = activeTextBlock.x;
//       let cursorY = activeTextBlock.y;
//       let allVisibleLines = [];
//       let foundCursor = false;
//       textLines.forEach((manualLine, manualLineIndex) => {
//         if (manualLine === "") {
//           allVisibleLines.push({
//             text: "",
//             x: activeTextBlock.x,
//             y: currentY,
//             manualLineIndex: manualLineIndex,
//             startCharIndex: 0,
//             endCharIndex: 0,
//           });
//           currentY += lineHeight;
//           return;
//         }
//         const words = manualLine.split(" ");
//         let currentLine = "";
//         let charCount = 0;
//         for (let i = 0; i < words.length; i++) {
//           const word = words[i];
//           const testLine = currentLine ? currentLine + " " + word : word;
//           const testWidth = ctx.measureText(testLine).width;
//           if (testWidth > maxWidth && currentLine) {
//             allVisibleLines.push({
//               text: currentLine,
//               x: activeTextBlock.x,
//               y: currentY,
//               manualLineIndex: manualLineIndex,
//               startCharIndex: charCount - currentLine.length,
//               endCharIndex: charCount,
//             });
//             currentLine = word;
//             charCount += word.length;
//             currentY += lineHeight;
//           } else {
//             currentLine = testLine;
//             charCount += i === 0 ? word.length : word.length + 1;
//           }
//         }
//         if (currentLine) {
//           allVisibleLines.push({
//             text: currentLine,
//             x: activeTextBlock.x,
//             y: currentY,
//             manualLineIndex: manualLineIndex,
//             startCharIndex: charCount - currentLine.length,
//             endCharIndex: charCount,
//           });
//           currentY += lineHeight;
//         }
//       });
//       allVisibleLines.forEach((line) => {
//         ctx.fillText(line.text, line.x, line.y);
//       });
//       for (let i = 0; i < allVisibleLines.length; i++) {
//         const line = allVisibleLines[i];
//         if (line.manualLineIndex === cursorPosition.line) {
//           const lineText = line.text;
//           if (
//             cursorPosition.column >= line.startCharIndex &&
//             cursorPosition.column <= line.endCharIndex
//           ) {
//             const relativeColumn = cursorPosition.column - line.startCharIndex;
//             const textBeforeCursor = lineText.slice(0, relativeColumn);
//             cursorX =
//               activeTextBlock.x + ctx.measureText(textBeforeCursor).width;
//             cursorY = line.y;
//             foundCursor = true;
//             break;
//           }
//         }
//       }
//       if (!foundCursor) {
//         const targetManualLine = cursorPosition.line;
//         let lastLineForManualLine = null;
//         for (let i = allVisibleLines.length - 1; i >= 0; i--) {
//           if (allVisibleLines[i].manualLineIndex === targetManualLine) {
//             lastLineForManualLine = allVisibleLines[i];
//             break;
//           }
//         }

//         if (lastLineForManualLine) {
//           cursorX =
//             activeTextBlock.x +
//             ctx.measureText(lastLineForManualLine.text).width;
//           cursorY = lastLineForManualLine.y;
//         }
//       }

//       // Draw cursor
//       if (showCursor) {
//         ctx.beginPath();
//         ctx.moveTo(cursorX, cursorY);
//         ctx.lineTo(cursorX, cursorY + lineHeight);
//         ctx.strokeStyle = drawingColor;
//         ctx.lineWidth = 2;
//         ctx.stroke();
//       }

//       setCaretY(cursorY + lineHeight);
//     }
//   }, [
//     paths,
//     textBlocks,
//     activeTextBlock,
//     textLines,
//     textToolActive,
//     drawingColor,
//     cursorPosition,
//     showCursor,
//     uploadedImages,
//     loadedImages, // Add this to dependencies
//   ]);
//   /* -------------------- Fetch board -------------------- */
//   useEffect(() => {
//     if (!id) {
//       setLoader(false);
//       return;
//     }
//     const fetchBoard = async () => {
//       const payload = new FormData();
//       payload.append("white_id", id);
//       payload.append("licenses_id", licenses_id);
//       try {
//         const { data } = await api.post("whiteBoardEdit", payload, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (data.status) {
//           const savedObj = data?.data || {};
//           setDrawingName(savedObj?.name_key || "");
//           const savedState = savedObj.data ? JSON.parse(savedObj.data) : {};

//           // Preserve existing paths while adding saved ones
//           if (savedState.paths) {
//             setPaths(savedState.paths);
//           }

//           // Preserve existing text blocks while adding saved ones
//           if (Array.isArray(savedState.texts)) {
//             setTextBlocks(savedState.texts);
//           }

//           if (savedState.toolSettings) {
//             setDrawingColor(savedState.toolSettings.color || "#000000");
//             setDrawingWidth(savedState.toolSettings.width || 2);
//           }

//           const imagesArray = savedState?.images ?? [];

//           // Preload images before setting state
//           const loadedImagesMap = new Map();
//           const imagesToAdd = [];

//           for (const imgData of imagesArray) {
//             if (!imgData?.src) continue;

//             const img = new Image();
//             img.onload = () => {
//               loadedImagesMap.set(imgData.src, img);
//               // Update the cache
//               setLoadedImages(prev => new Map([...prev, ...loadedImagesMap]));
//             };
//             img.src = imgData.src;

//             imagesToAdd.push({
//               src: imgData.src,
//               x: imgData.x || 20,
//               y: imgData.y || 20,
//               width: imgData.width || 200,
//               height: imgData.height || 200,
//               originalWidth: imgData.width || 200,
//               originalHeight: imgData.height || 200,
//             });
//           }

//           // Set uploaded images after preloading
//           setUploadedImages(prev => uniqueImages([...prev, ...imagesToAdd]));
//         }
//         setLoader(false);
//       } catch (err) {
//         console.error("Failed to fetch whiteboard:", err);
//         setLoader(false);
//       }
//     };

//     fetchBoard();
//   }, [id, licenses_id, token]);
//   // Helper function to calculate image position without using state
//   const calculateImagePosition = (currentImages, width, height) => {
//     const margin = 20;
//     let y = 20;

//     if (currentImages.length > 0) {
//       const lastImage = currentImages[currentImages.length - 1];
//       y = lastImage.y + lastImage.height + margin;
//     }

//     // Also consider existing text blocks
//     if (textBlocks.length > 0) {
//       const lastTextBlock = textBlocks[textBlocks.length - 1];
//       y = Math.max(y, lastTextBlock.y + 60);
//     }

//     return {
//       x: 20,
//       y,
//     };
//   };
//   /* -------------------- Save Drawing -------------------- */
//   const commitTypedText = useCallback((shouldReset = true) => {
//     if (!activeTextBlock) return;

//     const textContent = textLines.join("\n");

//     // Only commit if there's actual content or the block has changed
//     if (textContent.trim() !== "" || textContent !== activeTextBlock.text) {
//       const committedBlock = {
//         ...activeTextBlock,
//         text: textContent,
//         timestamp: Date.now(),
//       };

//       setTextBlocks((prev) => {
//         const existingIndex = prev.findIndex(
//           (block) => block.id === activeTextBlock.id
//         );
//         if (existingIndex >= 0) {
//           const updated = [...prev];
//           updated[existingIndex] = committedBlock;
//           return updated;
//         } else {
//           if (textContent.trim()) {
//             return [...prev, committedBlock];
//           }
//           return prev;
//         }
//       });
//     }

//     // Only reset if explicitly told to
//     if (shouldReset) {
//       setActiveTextBlock(null);
//       setTextLines([""]);
//       setTypedText("");
//       setCursorPosition({ line: 0, column: 0 });
//       setTextToolActive(false);
//       setShowKeyboard(false);
//     }
//   }, [activeTextBlock, textLines]);


//   useEffect(() => {
//     return () => {
//       // Save any active text when component unmounts
//       if (activeTextBlock && typedText.trim()) {
//         const textContent = textLines.join("\n");
//         const committedBlock = {
//           ...activeTextBlock,
//           text: textContent,
//           timestamp: Date.now(),
//         };

//         // Update textBlocks in localStorage or state management
//         setTextBlocks((prev) => {
//           const existingIndex = prev.findIndex(
//             (block) => block.id === activeTextBlock.id
//           );
//           if (existingIndex >= 0) {
//             const updated = [...prev];
//             updated[existingIndex] = committedBlock;
//             return updated;
//           } else {
//             return [...prev, committedBlock];
//           }
//         });
//       }
//     };
//   }, [activeTextBlock, textLines, typedText]);
//   const checkDataExits = () => {
//     let committedTexts = [...textBlocks];
//     if (activeTextBlock) {
//       const textContent = textLines.join("\n");
//       if (textContent.trim()) {
//         committedTexts = [
//           ...committedTexts.filter((b) => b.id !== activeTextBlock.id),
//           { ...activeTextBlock, text: textContent, timestamp: Date.now() },
//         ];
//       }
//     }
//     const state = {
//       name: drawingName.trim(),
//       paths,
//       texts: committedTexts,
//       images: uploadedImages.map((img) => ({
//         src: img.src,
//         x: img.x,
//         y: img.y,
//         width: img.width,
//         height: img.height,
//       })),
//       toolSettings: {
//         color: drawingColor,
//         width: drawingWidth,
//       },
//     };
//     let isEmptyDrawing = false;
//     if (
//       (!state.paths || state.paths.length === 0) &&
//       (!state.texts || state.texts.length === 0) &&
//       (!state.images || state.images.length === 0)
//     ) {
//       isEmptyDrawing = true;
//     }
//     return isEmptyDrawing;
//   };

//   const handleSaveDrawing = async () => {
//     if (!drawingName.trim()) {
//       alert("Please enter a drawing name");
//       return;
//     }

//     let committedTexts = [...textBlocks];
//     if (activeTextBlock) {
//       const textContent = textLines.join("\n");
//       if (textContent.trim()) {
//         committedTexts = [
//           ...committedTexts.filter((b) => b.id !== activeTextBlock.id),
//           { ...activeTextBlock, text: textContent, timestamp: Date.now() },
//         ];
//       }
//     }
//     const state = {
//       name: drawingName.trim(),
//       paths,
//       texts: committedTexts,
//       images: uploadedImages.map((img) => ({
//         src: img.src,
//         x: img.x,
//         y: img.y,
//         width: img.width,
//         height: img.height,
//       })),
//       toolSettings: {
//         color: drawingColor,
//         width: drawingWidth,
//       },
//     };
//     const isEmptyDrawing = checkDataExits();

//     if (isEmptyDrawing) {
//       alert("Cannot save empty drawing. Please add content before saving.");
//       return;
//     }

//     const payload = new FormData();
//     payload.append("licenses_id", licenses_id);
//     payload.append("name_key", drawingName);
//     payload.append("images_url", SelectedImages);
//     payload.append("data", JSON.stringify(state));

//     if (id) {
//       payload.append("imageFileRemove", updateImage);
//     }

//     if (imageFiles && imageFiles.length > 0) {
//       Array.from(imageFiles).forEach((file) => {
//         payload.append("imageFiles[]", file);
//       });
//     }

//     if (id && id !== "null") {
//       payload.append("white_id", id);
//     }
//     try {
//       const urlPath = id ? "whiteBoardUpdate" : "whiteBoardCreate";
//       const { data } = await api.post(urlPath, payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       if (data.status) {
//         toast.success(data.msg, {
//           replace: true,
//           state: {},
//           autoClose: 1500,
//           onclose: navigate("/white-board-list"),
//         });
//       } else {
//         toast.error(data.msg, { autoClose: 1500 });
//       }
//     } catch (err) {
//       toast.error(err?.response?.data?.msg, { autoClose: 1500 });
//     }
//   };
//   const handleKeyboardChange = (input) => {
//     setTypedText(input);
//   };
//   const handleKeyboardKeyPress = (button) => {
//     if (!button) return;
//     switch (button) {
//       case "{enter}":
//       case "{return}":
//       case "Enter":
//         const newLines = [...textLines];
//         if (cursorPosition.column === newLines[cursorPosition.line].length) {
//           newLines.splice(cursorPosition.line + 1, 0, "");
//           setTextLines(newLines);
//           setCursorPosition({
//             line: cursorPosition.line + 1,
//             column: 0,
//           });
//         } else {
//           const currentLine = newLines[cursorPosition.line];
//           const beforeCursor = currentLine.slice(0, cursorPosition.column);
//           const afterCursor = currentLine.slice(cursorPosition.column);
//           newLines[cursorPosition.line] = beforeCursor;
//           newLines.splice(cursorPosition.line + 1, 0, afterCursor);

//           setTextLines(newLines);
//           setCursorPosition({
//             line: cursorPosition.line + 1,
//             column: 0,
//           });
//         }
//         setTypedText(newLines.join("\n"));
//         break;

//       case "{bksp}":
//       case "{backspace}":
//         handleBackspace();
//         break;

//       case "{space}":
//         insertTextAtCursor(" ");
//         break;

//       default:
//         if (button.length === 1) {
//           insertTextAtCursor(button);
//         }
//         break;
//     }
//   };

//   const insertTextAtCursor = (text) => {
//     const newLines = [...textLines];
//     const currentLine = newLines[cursorPosition.line] || "";

//     newLines[cursorPosition.line] =
//       currentLine.slice(0, cursorPosition.column) +
//       text +
//       currentLine.slice(cursorPosition.column);

//     setTextLines(newLines);
//     setCursorPosition((prev) => ({
//       ...prev,
//       column: prev.column + text.length,
//     }));
//     setTypedText(newLines.join("\n"));
//   };

//   const handleBackspace = () => {
//     const newLines = [...textLines];
//     const currentLine = newLines[cursorPosition.line] || "";

//     if (cursorPosition.column > 0) {
//       newLines[cursorPosition.line] =
//         currentLine.slice(0, cursorPosition.column - 1) +
//         currentLine.slice(cursorPosition.column);
//       setTextLines(newLines);
//       setCursorPosition((prev) => ({
//         ...prev,
//         column: prev.column - 1,
//       }));
//       setTypedText(newLines.join("\n"));
//     } else if (cursorPosition.line > 0) {
//       const prevLine = newLines[cursorPosition.line - 1];
//       const currentLine = newLines[cursorPosition.line];
//       setCursorPosition({
//         line: cursorPosition.line - 1,
//         column: prevLine.length,
//       });
//     }
//   };
//   useEffect(() => {
//     if (!textToolActive) return;

//     const onKeyDown = (e) => {
//       if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
//       e.preventDefault();
//       switch (e.key) {
//         case "Backspace":
//           handleBackspace();
//           break;

//         case "Delete":
//           handleDelete();
//           break;

//         case "Enter":
//           const newLines = [...textLines];
//           if (cursorPosition.column === newLines[cursorPosition.line].length) {
//             newLines.splice(cursorPosition.line + 1, 0, "");
//             setTextLines(newLines);
//             setCursorPosition({
//               line: cursorPosition.line + 1,
//               column: 0,
//             });
//           } else {
//             const currentLine = newLines[cursorPosition.line];
//             const beforeCursor = currentLine.slice(0, cursorPosition.column);
//             const afterCursor = currentLine.slice(cursorPosition.column);
//             newLines[cursorPosition.line] = beforeCursor;
//             newLines.splice(cursorPosition.line + 1, 0, afterCursor);
//             setTextLines(newLines);
//             setCursorPosition({
//               line: cursorPosition.line + 1,
//               column: 0,
//             });
//           }
//           setTypedText(newLines.join("\n"));
//           break;
//         case "ArrowLeft":
//           if (cursorPosition.column > 0) {
//             setCursorPosition((prev) => ({
//               ...prev,
//               column: prev.column - 1,
//             }));
//           } else if (cursorPosition.line > 0) {
//             setCursorPosition({
//               line: cursorPosition.line - 1,
//               column: textLines[cursorPosition.line - 1].length,
//             });
//           }
//           break;
//         case "ArrowRight":
//           const currentLineLength = textLines[cursorPosition.line]?.length || 0;
//           if (cursorPosition.column < currentLineLength) {
//             setCursorPosition((prev) => ({
//               ...prev,
//               column: prev.column + 1,
//             }));
//           } else if (cursorPosition.line < textLines.length - 1) {
//             setCursorPosition({
//               line: cursorPosition.line + 1,
//               column: 0,
//             });
//           }
//           break;
//         case "ArrowUp":
//           if (cursorPosition.line > 0) {
//             const prevLineLength =
//               textLines[cursorPosition.line - 1]?.length || 0;
//             const newColumn = Math.min(cursorPosition.column, prevLineLength);
//             setCursorPosition({
//               line: cursorPosition.line - 1,
//               column: newColumn,
//             });
//           }
//           break;
//         case "ArrowDown":
//           if (cursorPosition.line < textLines.length - 1) {
//             const nextLineLength =
//               textLines[cursorPosition.line + 1]?.length || 0;
//             const newColumn = Math.min(cursorPosition.column, nextLineLength);
//             setCursorPosition({
//               line: cursorPosition.line + 1,
//               column: newColumn,
//             });
//           }
//           break;
//         case "Home":
//           setCursorPosition((prev) => ({
//             ...prev,
//             column: 0,
//           }));
//           break;
//         case "End":
//           const lineLength = textLines[cursorPosition.line]?.length || 0;
//           setCursorPosition((prev) => ({
//             ...prev,
//             column: lineLength,
//           }));
//           break;
//         default:
//           if (e.key.length === 1) {
//             insertTextAtCursor(e.key);
//           }
//           break;
//       }
//     };
//     window.addEventListener("keydown", onKeyDown);
//     return () => window.removeEventListener("keydown", onKeyDown);
//   }, [textToolActive, textLines, cursorPosition]);

//   const handleDelete = () => {
//     const newLines = [...textLines];
//     const currentLine = newLines[cursorPosition.line] || "";
//     if (cursorPosition.column < currentLine.length) {
//       newLines[cursorPosition.line] =
//         currentLine.slice(0, cursorPosition.column) +
//         currentLine.slice(cursorPosition.column + 1);
//       setTextLines(newLines);
//       setTypedText(newLines.join("\n"));
//     } else if (cursorPosition.line < textLines.length - 1) {
//       const nextLine = newLines[cursorPosition.line + 1];
//       newLines[cursorPosition.line] = currentLine + nextLine;
//       newLines.splice(cursorPosition.line + 1, 1);
//       setTextLines(newLines);
//       setTypedText(newLines.join("\n"));
//     }
//   };
//   /* -------------------- Image Upload -------------------- */
//   const handleImageUpload = (files) => {
//     if (!files || files.length === 0) return;

//     Array.from(files).forEach((file) => {
//       setImageFiles((prev) => [...prev, file]);

//       const src = URL.createObjectURL(file);
//       const img = new Image();

//       img.onload = () => {
//         const viewport = window.visualViewport || window;
//         const isMobile = viewport.width < 768;
//         const maxSize = isMobile ? 100 : 200;
//         let { width, height } = img;

//         if (width > maxSize || height > maxSize) {
//           const scale = Math.min(maxSize / width, maxSize / height);
//           width *= scale;
//           height *= scale;
//         }

//         if (viewport.width < 480) {
//           const mobileScale = Math.min(80 / width, 80 / height);
//           width *= mobileScale;
//           height *= mobileScale;
//         }

//         const pos = findNonOverlappingImagePosition(width, height);

//         // DON'T reset any text states here
//         setUploadedImages((prev) => [
//           ...prev,
//           {
//             src,
//             x: pos.x,
//             y: pos.y,
//             width,
//             height,
//             originalWidth: img.width,
//             originalHeight: img.height,
//           },
//         ]);
//       };
//       img.src = src;
//     });
//   };
//   // const handleImageUpload = (files) => {
//   //   if (!files || files.length === 0) return;

//   //   Array.from(files).forEach((file) => {
//   //     setImageFiles((prev) => [...prev, file]);

//   //     const src = URL.createObjectURL(file);
//   //     const img = new Image();

//   //     img.onload = () => {
//   //       const viewport = window.visualViewport || window;
//   //       const isMobile = viewport.width < 768;
//   //       const maxSize = isMobile ? 100 : 200;
//   //       let { width, height } = img;
//   //       if (width > maxSize || height > maxSize) {
//   //         const scale = Math.min(maxSize / width, maxSize / height);
//   //         width *= scale;
//   //         height *= scale;
//   //       }
//   //       if (viewport.width < 480) {
//   //         const mobileScale = Math.min(80 / width, 80 / height);
//   //         width *= mobileScale;
//   //         height *= mobileScale;
//   //       }
//   //       const pos = findNonOverlappingImagePosition(
//   //         width,
//   //         height,
//   //         uploadedImages
//   //       );
//   //       setUploadedImages((prev) => [
//   //         ...prev,
//   //         {
//   //           src,
//   //           x: pos.x,
//   //           y: pos.y,
//   //           width,
//   //           height,
//   //         },
//   //       ]);
//   //       if (src.startsWith("blob:")) {
//   //         return;
//   //       }
//   //     };
//   //     img.src = src;
//   //   });
//   // };
//   /* -------------------- Misc: settings loader -------------------- */
//   useEffect(() => {
//     getSetting(
//       () => { },
//       () => { },
//       setSelectedLanguage,
//       setCalendarOn,
//       setIntroductionOn,
//       setLoader,
//       () => { },
//       () => { },
//       () => { },
//       () => { }
//     );
//   }, []);

//   useEffect(() => {
//     if (!wrapperRef.current) return;
//     const { scrollTop, clientHeight } = wrapperRef.current;

//     if (caretY > scrollTop + clientHeight - 30) {
//       wrapperRef.current.scrollTop = caretY - clientHeight + 30;
//     }

//     if (caretY < scrollTop) {
//       wrapperRef.current.scrollTop = caretY - 10;
//     }
//   }, [caretY]);


//   const handleClick = (e) => {
//     if (tool !== "text") return;

//     const rect = canvasRef.current.getBoundingClientRect();
//     const pos = pointerPos(e, rect);

//     let clickedOnExisting = false;

//     // Check if clicked on existing text block
//     for (const block of textBlocks) {
//       const blockRight = block.x + 300;
//       const blockBottom = block.y + 100;

//       if (
//         pos.x >= block.x - 10 &&
//         pos.x <= blockRight + 10 &&
//         pos.y >= block.y - 5 &&
//         pos.y <= blockBottom + 5
//       ) {
//         // If clicking on the same active block, just update cursor
//         if (activeTextBlock && activeTextBlock.id === block.id) {
//           updateCursorPosition(pos, block);
//           clickedOnExisting = true;
//           break;
//         }

//         // If there's an active text block with content, commit it
//         if (activeTextBlock && typedText.trim()) {
//           commitTypedText(true); // Reset after commit
//         } else if (activeTextBlock && !typedText.trim()) {
//           // Empty text block, just remove it
//           setActiveTextBlock(null);
//           setTextLines([""]);
//           setTypedText("");
//           setCursorPosition({ line: 0, column: 0 });
//           setTextToolActive(false);
//           setShowKeyboard(false);
//         }

//         // Activate the clicked text block
//         setActiveTextBlock(block);
//         const lines = block.text.split("\n");
//         setTextLines(lines);
//         setTypedText(block.text);

//         // Calculate cursor position
//         const lineHeight = 24;
//         const relativeY = pos.y - block.y;
//         const clickedLine = Math.max(0, Math.floor(relativeY / lineHeight));
//         const actualLine = Math.min(clickedLine, lines.length - 1);

//         const ctx = canvasRef.current.getContext("2d");
//         ctx.font = "20px Arial";
//         const lineText = lines[actualLine] || "";
//         const relativeX = pos.x - block.x;

//         let charPosition = 0;
//         let currentWidth = 0;

//         for (let i = 0; i < lineText.length; i++) {
//           const charWidth = ctx.measureText(lineText[i]).width;
//           if (currentWidth + charWidth / 2 > relativeX) break;
//           currentWidth += charWidth;
//           charPosition = i + 1;
//         }

//         setCursorPosition({ line: actualLine, column: charPosition });
//         setTextToolActive(true);
//         setShowKeyboard(true);
//         clickedOnExisting = true;
//         break;
//       }
//     }

//     // If clicked outside of existing text blocks
//     if (!clickedOnExisting) {
//       if (activeTextBlock && typedText.trim()) {
//         commitTypedText(false); // Commit but don't reset
//         const newPosition = findNonOverlappingPosition(pos.x, pos.y);
//         const newTextBlock = {
//           id: Date.now(),
//           x: newPosition.x,
//           y: newPosition.y,
//           text: "",
//           color: drawingColor,
//           font: "20px Arial",
//         };

//         setActiveTextBlock(newTextBlock);
//         setTextLines([""]);
//         setTypedText("");
//         setCursorPosition({ line: 0, column: 0 });
//         setTextToolActive(true);
//         setShowKeyboard(true);
//       } else if (activeTextBlock && !typedText.trim()) {
//         // Empty text block, just move it
//         const newPosition = findNonOverlappingPosition(pos.x, pos.y);
//         setActiveTextBlock({
//           ...activeTextBlock,
//           x: newPosition.x,
//           y: newPosition.y,
//         });
//         setTextToolActive(true);
//         setShowKeyboard(true);
//       } else {
//         // No active text block, create new one
//         const newPosition = findNonOverlappingPosition(pos.x, pos.y);
//         const newTextBlock = {
//           id: Date.now(),
//           x: newPosition.x,
//           y: newPosition.y,
//           text: "",
//           color: drawingColor,
//           font: "20px Arial",
//         };

//         setActiveTextBlock(newTextBlock);
//         setTextLines([""]);
//         setTypedText("");
//         setCursorPosition({ line: 0, column: 0 });
//         setTextToolActive(true);
//         setShowKeyboard(true);
//       }
//     }
//   };


//   const activateTextTool = () => {
//     setTool("text");
//     setTextToolActive(true);
//     setShowKeyboard(true);
//     if (textPosition.x === 0 && textPosition.y === 0) {
//       const rect = canvasRef.current?.getBoundingClientRect();
//       if (rect) {
//         setTextPosition({ x: 20, y: 20 });
//         const newTextBlock = {
//           id: Date.now(),
//           x: 20,
//           y: 20,
//           text: "",
//           color: drawingColor,
//           font: "20px Arial",
//         };
//         setActiveTextBlock(newTextBlock);
//       }
//     }
//   };

//   const handleClear = () => {
//     setActiveTextBlock(null);
//     setTextLines([""]);
//     setTypedText("");
//     setCursorPosition({ line: 0, column: 0 });
//     setTextToolActive(false);
//     setShowKeyboard(false);
//     setPaths([]);
//     setUploadedImages([]);
//     setImageFiles([]);
//     setTextBlocks([]);
//     setLoadedImages(new Map()); // Clear cached images
//   };

//   const updateCursorPosition = (pos, block) => {
//     const ctx = canvasRef.current.getContext("2d");
//     ctx.font = "20px Arial";
//     const lineHeight = 24;
//     const relativeX = pos.x - block.x;
//     const relativeY = pos.y - block.y;
//     const lines = block.text.split("\n");
//     const clickedLine = Math.max(0, Math.floor(relativeY / lineHeight));
//     const actualLine = Math.min(clickedLine, lines.length - 1);
//     let charPosition = 0;
//     let currentWidth = 0;
//     const lineText = lines[actualLine] || "";
//     for (let i = 0; i < lineText.length; i++) {
//       const charWidth = ctx.measureText(lineText[i]).width;
//       if (currentWidth + charWidth / 2 > relativeX) {
//         break;
//       }
//       currentWidth += charWidth;
//       charPosition = i + 1;
//     }
//     setCursorPosition({
//       line: actualLine,
//       column: charPosition,
//     });
//   };

//   const handleFileUpload = (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     // Don't commit text here - let the ImageUpload component handle it
//     setFileUpload(true);
//   };
//   const handleDeleteImage = (index) => {
//     const removedImage = uploadedImages[index]?.src;
//     setUpdateImage((prev) => [...prev, removedImage]);

//     // Remove from uploaded images
//     setUploadedImages((prev) => prev.filter((_, i) => i !== index));

//     // Remove from image files
//     setImageFiles((prev) => prev.filter((_, i) => i !== index));

//     // Remove from cache
//     if (removedImage) {
//       setLoadedImages(prev => {
//         const newMap = new Map(prev);
//         newMap.delete(removedImage);
//         return newMap;
//       });
//     }
//   };
//   const uniqueImages = (images) => {
//     const seen = new Set();
//     return images.filter((img) => {
//       if (seen.has(img.src)) return false;
//       seen.add(img.src);
//       return true;
//     });
//   };
//   const t = (params) => {
//     const transtext = selectedLanguage === "Spanish" ? "sp" : "en";
//     const trans = {
//       en: {
//         name: "Whiteboard",
//         title: "Saved Whiteboards",
//         // text: "View List"
//       },
//       sp: {
//         name: "Pizarron",
//         title: "Pizarras guardadas",
//         // text: "Ver Lista"
//       },
//     };
//     return trans[transtext][params];
//   };

//   const discardChanges = () => {
//     setIsPopupOpen(false);
//     navigate(-1);
//   };

//   const saveFunction = () => {
//     setIsPopupOpen(false);
//     setShowSaveModal(true);
//   };
//   return (
//     <>

//       {FileUpload && (
//         <ImageUpload
//           textBlocks={textBlocks}
//           paths={paths}
//           oldImages={uploadedImages}
//           pathname={pathname}
//           uploadedImages={SelectedImages}
//           handleImageUpload={handleImageUpload}
//           setOpen={setFileUpload}
//           open={FileUpload}

//         />
//       )}
//       {isPopupOpen && (
//         <SaveWarningPopup
//           open={isPopupOpen}
//           onConfirm={discardChanges}
//           onCancel={saveFunction}
//         />
//       )}
//       {loader ? (
//         <Loader />
//       ) : (
//         <>
//           <Header
//             isSummary={!checkDataExits() ? true : false}
//             setIsPopupOpen={setIsPopupOpen}
//             selectedLanguage={selectedLanguage}
//             introductionOn={IntroductionOn}
//             calendarOn={CalendarOn}
//             name={t("name")}
//             whiteboardname={t("title")}
//           />
//           <div className="main-wrapper home-wrapper whiteboard-wrapper">

//             <div className="flex flex-col items-center whiteboard-card ">
//               <Card className="w-full flex flex-col relative">


//                 <div
//                   ref={wrapperRef}
//                   className="relative w-auto  overflow-y-auto overflow-x-hidden mx-auto"
//                 >
//                   <canvas
//                     ref={setCanvasSize}
//                     className={`w-auto whiteboard-canvas touch-none pt-0 z-0 mx-auto ${tool === "text"
//                       ? "cursor-text"
//                       : tool === "eraser"
//                         ? "cursor-eraser"
//                         : "cursor-crosshair"
//                       }`}
//                     onMouseDown={startDrawing}
//                     onMouseMove={draw}
//                     onMouseUp={stopDrawing}
//                     onMouseLeave={stopDrawing}
//                     onTouchStart={startDrawing}
//                     onTouchMove={draw}
//                     onTouchEnd={stopDrawing}
//                     onClick={handleClick}
//                   />
//                 </div>
//                 <CardContent className=" flex flex-wrap items-center justify-center gap-5 whiteboard-toolbar absolute bottom-3 left-0 right-0 z-1">
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className={cn(tool === "pencil" && "bg-gray-100")}
//                     onClick={() => {
//                       // Commit text before switching to pencil
//                       if (activeTextBlock && typedText.trim()) {
//                         commitTypedText(true);
//                       }
//                       setTool("pencil");
//                       setShowKeyboard(false);
//                     }}
//                     title="Pencil"
//                   >
//                     <img src={PencilIcon} className="icon-size-add" alt="Pencil Icon" />
//                   </Button>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={activateTextTool}
//                     title="Virtual Keyboard"
//                   >
//                     {/* <Icon.Keyword className="icon-size-add" /> */}
//                     <img
//                       src={TextIcon}
//                       className="icon-size-add"
//                       alt="Pencil Icon"
//                     />
//                   </Button>
//                   {/* <Button
//                     variant="ghost"
//                     size="icon"
//                     title="Upload image"
//                     onClick={(e) => {
//                       handleFileUpload(e);
//                     }}
//                   >       <img
//                     src={ImgIcon}
//                     className="icon-size-add"
//                     alt="Pencil Icon"
//                   />
//                 </Button>*/}
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     title="Upload image"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setFileUpload(true);
//                     }}
//                   >
//                     <img
//                       src={ImgIcon}
//                       className="icon-size-add"
//                       alt="Upload Image"
//                     />
//                   </Button>

//                   <input
//                     type="file"
//                     id="imageUpload"
//                     accept="image/*"
//                     multiple
//                     className="hidden"
//                     onChange={(e) => {
//                       setTool("");
//                       handleImageUpload(Array.from(e.target.files));
//                     }}
//                   />
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className={cn(tool === "eraser" && "bg-gray-100")}
//                     onClick={() => {
//                       // Commit text before switching to eraser
//                       if (activeTextBlock && typedText.trim()) {
//                         commitTypedText(true);
//                       }
//                       setTool("eraser");
//                       setShowKeyboard(false);
//                       setDrawingWidth(20);
//                     }}
//                     title="Eraser"
//                   >
//                     <img src={EraserIcon} className="icon-size-add" alt="Pencil Icon" />
//                   </Button>

//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className="bg-gray-100"
//                     onClick={handleClear}
//                     title="Clear"
//                   >
//                     <img
//                       src={DeleteIcon}
//                       className="icon-size-add"
//                       alt="Pencil Icon"
//                     />
//                   </Button>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => setShowSaveModal(true)}
//                     title="File Save"
//                   >
//                     <img
//                       src={SaveIcon}
//                       className="icon-size-add"
//                       alt="Pencil Icon"
//                     />
//                   </Button>
//                   <div className="flex items-center gap-2">
//                     <label className="text-sm text-gray-600">
//                       {selectedLanguage === "Spanish" ? "Ancho" : "Width"}
//                     </label>
//                     <input
//                       type="range"
//                       min="1"
//                       max="24"
//                       value={drawingWidth}
//                       onChange={(e) => setDrawingWidth(Number(e.target.value))}
//                       className="w-32"
//                     />
//                     <span className="text-sm text-gray-700 w-6 text-center">
//                       {drawingWidth}
//                     </span>
//                   </div>
//                 </CardContent>
//               </Card>
//               {showKeyboard && (
//                 <div className="w-full max-w-4xl mt-4">
//                   <Keyboard
//                     onChange={handleKeyboardChange}
//                     onKeyPress={handleKeyboardKeyPress}
//                     theme="hg-theme-default hg-layout-default myTheme"
//                     layout={{
//                       default: [
//                         "q w e r t y u i o p",
//                         "a s d f g h j k l",
//                         "z x c v b n m",
//                         "{bksp} {space} {enter}",
//                       ],
//                     }}
//                     display={{
//                       "{bksp}": "⌫",
//                       "{enter}": "⏎",
//                       "{space}": "Space",
//                     }}
//                   />
//                 </div>
//               )}

//               {showSaveModal && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//                   <div className="relative w-[800px] rounded-lg bg-white p-8 shadow-lg">
//                     <div className="mb-4">
//                       <h2 className="text-[32px] font-semibold">
//                         {selectedLanguage === "Spanish"
//                           ? "Guardar como"
//                           : "Save As"}
//                       </h2>
//                     </div>
//                     <div className="grid gap-4">
//                       <div className="grid grid-cols-4 items-center gap-3">
//                         <input
//                           id="drawingName"
//                           type="text"
//                           value={drawingName}
//                           onKeyDown={(e) => {
//                             if (e.code === "Enter" && e.key === "Enter") {
//                               handleSaveDrawing();
//                               setShowSaveModal(false);
//                             }
//                           }}
//                           onChange={(e) => setDrawingName(e.target.value)}
//                           className="col-span-5 h-12 rounded-lg border border-gray-200 bg-white px-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//                           placeholder={
//                             selectedLanguage === "Spanish"
//                               ? "Introduzca el nombre del dibujo"
//                               : "Enter drawing name"
//                           }
//                         />
//                       </div>
//                     </div>
//                     <div className="mt-6 flex justify-end gap-4">
//                       <Button
//                         variant="outline"
//                         className="h-12 rounded-lg px-6 text-base"
//                         onClick={() => setShowSaveModal(false)}
//                       >
//                         {selectedLanguage === "Spanish" ? "Cancelar" : "Cancel"}
//                       </Button>
//                       <Button
//                         className="h-12 rounded-lg bg-blue-600 px-6 text-base text-white hover:bg-blue-700"
//                         onClick={() => {
//                           handleSaveDrawing();
//                           setShowSaveModal(false);
//                         }}
//                       >
//                         {selectedLanguage === "Spanish" ? "Ahorrar" : "Save"}
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </>
//       )
//       }
//       <Footer />
//     </>
//   );
// }

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
import SaveWarningPopup from "../../Component/SaveWarningPopup/SaveWarningPopup";
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
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Map());
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const lastSize = useRef({ w: 0, h: 0 });
  const getCanvasContext = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return canvas.getContext("2d");
  }, []);

  useEffect(() => {
    if (!location?.state?.selectedImages) return;
    if (activeTextBlock && typedText.trim()) {
      commitTypedText();
    }
    if (location.state.textBlocks) {
      setTextBlocks(location.state.textBlocks);
    }
    if (location.state.paths) {
      setPaths(location.state.paths);
    }
    const incoming = location.state.selectedImages;
    setUploadedImages((prev) => {
      const updated = [...prev];
      const viewport = window.visualViewport || window;
      const isMobile = viewport.width < 768;
      const maxSize = isMobile ? 120 : 200;
      const mobileMaxSize = viewport.width < 480 ? 80 : 120;

      incoming.forEach((item, index) => {
        const isObject = typeof item === "object";
        const src = isObject ? item.src : item;
        if (updated.some((img) => img.src === src)) return;

        if (isObject && item.x !== undefined && item.y !== undefined) {
          let width = item.width || maxSize;
          let height = item.height || maxSize;
          if (isMobile && (width > maxSize || height > maxSize)) {
            const scale = Math.min(maxSize / width, maxSize / height);
            width *= scale;
            height *= scale;
          }
          if (
            viewport.width < 480 &&
            (width > mobileMaxSize || height > mobileMaxSize)
          ) {
            const scale = Math.min(
              mobileMaxSize / width,
              mobileMaxSize / height
            );
            width *= scale;
            height *= scale;
          }
          updated.push({
            src: item.src,
            x: item.x,
            y: item.y,
            width,
            height,
            originalWidth: item.originalWidth || width,
            originalHeight: item.originalHeight || height,
          });
        } else {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            let width = img.width;
            let height = img.height;
            if (isMobile) {
              const targetMaxSize =
                viewport.width < 480 ? mobileMaxSize : maxSize;
              if (width > targetMaxSize || height > targetMaxSize) {
                const scale = Math.min(
                  targetMaxSize / width,
                  targetMaxSize / height
                );
                width *= scale;
                height *= scale;
              }
            } else {
              if (width > maxSize || height > maxSize) {
                const scale = Math.min(maxSize / width, maxSize / height);
                width *= scale;
                height *= scale;
              }
            }
            const pos = findNonOverlappingImagePosition(width, height);
            setUploadedImages((current) => {
              const existingIndex = current.findIndex((img) => img.src === src);
              if (existingIndex >= 0) return current;
              return [
                ...current,
                {
                  src,
                  x: pos.x + index * (isMobile ? 5 : 15),
                  y: pos.y + index * (isMobile ? 5 : 15),
                  width,
                  height,
                  originalWidth: img.width,
                  originalHeight: img.height,
                },
              ];
            });
          };

          const placeholderSize = isMobile
            ? viewport.width < 480
              ? 80
              : 120
            : 200;
          const pos = findNonOverlappingImagePosition(
            placeholderSize,
            placeholderSize
          );
          updated.push({
            src,
            x: pos.x + index * (isMobile ? 5 : 15),
            y: pos.y + index * (isMobile ? 5 : 15),
            width: placeholderSize,
            height: placeholderSize,
            placeholder: true,
          });
        }
      });
      return uniqueImages(updated);
    });

    if (location.state) {
      navigate(location.pathname, { replace: true, state: {} });
    }
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
    const width = Math.floor(viewport.width - 120);
    const height = Math.floor(viewport.height - 150);

    if (
      lastSize.current.w === width &&
      lastSize.current.h === height
    ) return;

    lastSize.current = { w: width, h: height };

    node.width = width * dpr;
    node.height = height * dpr;
    node.style.width = `${width}px`;
    node.style.height = `${height}px`;

    const ctx = node.getContext("2d");
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    canvasRef.current = node;
  }, []);
  /* -------------------- Drawing -------------------- */
  const startDrawing = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const pos = pointerPos(e, rect);

    // Check if user clicked on a delete button
    for (let i = uploadedImages.length - 1; i >= 0; i--) {
      const img = uploadedImages[i];
      const deleteButtonX = img.x + img.width - 10;
      const deleteButtonY = img.y + 10;
      const deleteRadius = 8;

      const distance = Math.sqrt(
        Math.pow(pos.x - deleteButtonX, 2) + Math.pow(pos.y - deleteButtonY, 2)
      );

      if (distance <= deleteRadius) {
        handleDeleteImage(i);
        return;
      }
    }

    // Check if user clicked on an image to drag
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
        setSelectedImageIndex(i);
        return;
      }
    }

    // If clicked on canvas (not on image), deselect image
    setSelectedImageIndex(null);

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
      const canvas = canvasRef.current;
      const rect = canvas ? canvas.getBoundingClientRect() : { width: 800, height: 600 };
      const margin = 20;

      // Start with a staggered position based on existing images
      let x = margin + (currentImages.length * 30) % (rect.width - width - margin);
      let y = margin + Math.floor(currentImages.length / 5) * (height + margin);

      // Try to find a non-overlapping position
      let foundPosition = false;
      let attempts = 0;

      while (!foundPosition && attempts < 50) {
        let overlaps = false;

        // Check against all existing images
        for (const img of currentImages) {
          if (
            x < img.x + img.width + margin &&
            x + width + margin > img.x &&
            y < img.y + img.height + margin &&
            y + height + margin > img.y
          ) {
            overlaps = true;
            break;
          }
        }

        // Also check against text blocks
        if (!overlaps) {
          for (const block of textBlocks) {
            const blockRight = block.x + 300;
            const blockBottom = block.y + 100;
            if (
              x < blockRight + margin &&
              x + width + margin > block.x &&
              y < blockBottom + margin &&
              y + height + margin > block.y
            ) {
              overlaps = true;
              break;
            }
          }
        }

        if (!overlaps) {
          foundPosition = true;
        } else {
          // Move to next position (grid-like placement)
          x += width + margin;
          if (x + width > rect.width - margin) {
            x = margin;
            y += height + margin;
          }
          attempts++;
        }
      }

      return { x, y };
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

  /* -------------------- Canvas Rendering -------------------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas first with white background
    ctx.fillStyle = "#ffffff";
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const dpr = window.devicePixelRatio || 1;
    ctx.scale(dpr, dpr);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width / dpr, canvas.height / dpr);


    // Draw uploaded images from cache
    uploadedImages.forEach((imgObj, index) => {
      const cachedImg = loadedImages.get(imgObj.src);
      if (cachedImg && cachedImg.complete) {
        ctx.drawImage(cachedImg, imgObj.x, imgObj.y, imgObj.width, imgObj.height);

        // Draw delete button (small X in top-right corner) for all images
        ctx.fillStyle = selectedImageIndex === index ? "rgba(255, 0, 0, 0.9)" : "rgba(255, 0, 0, 0.7)";
        ctx.beginPath();
        ctx.arc(imgObj.x + imgObj.width - 10, imgObj.y + 10, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "white";
        ctx.font = "bold 10px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("×", imgObj.x + imgObj.width - 10, imgObj.y + 10);
      } else {
        const img = new Image();
        img.onload = () => {
          setLoadedImages(prev => new Map(prev).set(imgObj.src, img));
        };
        img.src = imgObj.src;
      }
    });

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
      const lineHeight = 24;
      const maxWidth = canvas.width - block.x - 20;

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

    // Draw active text block with cursor
    if (textToolActive && activeTextBlock) {
      const font = "20px Arial";
      const lineHeight = 24;
      const maxWidth = canvas.width - activeTextBlock.x - 20;
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
    uploadedImages,
    loadedImages,
    selectedImageIndex,
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
          const loadedImagesMap = new Map();
          const imagesToAdd = [];

          for (const imgData of imagesArray) {
            if (!imgData?.src) continue;

            const img = new Image();
            img.onload = () => {
              loadedImagesMap.set(imgData.src, img);
              setLoadedImages(prev => new Map([...prev, ...loadedImagesMap]));
            };
            img.src = imgData.src;

            imagesToAdd.push({
              src: imgData.src,
              x: imgData.x || 20,
              y: imgData.y || 20,
              width: imgData.width || 200,
              height: imgData.height || 200,
              originalWidth: imgData.width || 200,
              originalHeight: imgData.height || 200,
            });
          }

          setUploadedImages(prev => uniqueImages([...prev, ...imagesToAdd]));
        }
        setLoader(false);
      } catch (err) {
        console.error("Failed to fetch whiteboard:", err);
        setLoader(false);
      }
    };

    fetchBoard();
  }, [id, licenses_id, token]);
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
  const commitTypedText = useCallback((shouldReset = true) => {
    if (!activeTextBlock) return;

    const textContent = textLines.join("\n");

    if (textContent.trim() !== "" || textContent !== activeTextBlock.text) {
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

    if (shouldReset) {
      setActiveTextBlock(null);
      setTextLines([""]);
      setTypedText("");
      setCursorPosition({ line: 0, column: 0 });
      setTextToolActive(false);
      setShowKeyboard(false);
    }
  }, [activeTextBlock, textLines]);

  useEffect(() => {
    return () => {
      if (activeTextBlock && typedText.trim()) {
        const textContent = textLines.join("\n");
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
            return [...prev, committedBlock];
          }
        });
      }
    };
  }, [activeTextBlock, textLines, typedText]);

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
    let isEmptyDrawing = false;
    if (
      (!state.paths || state.paths.length === 0) &&
      (!state.texts || state.texts.length === 0) &&
      (!state.images || state.images.length === 0)
    ) {
      isEmptyDrawing = true;
    }
    return isEmptyDrawing;
  };

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
    const isEmptyDrawing = checkDataExits();

    if (isEmptyDrawing) {
      alert("Cannot save empty drawing. Please add content before saving.");
      return;
    }

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
  const handleImageUpload = (files) => {
    if (!files || files.length === 0) return;
    setTool("");
    const newImages = Array.from(files);
    const viewport = window.visualViewport || window;
    const isMobile = viewport.width < 768;
    const maxSize = isMobile ? 120 : 200;
    const mobileMaxSize = viewport.width < 480 ? 80 : 120;

    newImages.forEach((file, fileIndex) => {
      setImageFiles((prev) => [...prev, file]);

      const src = URL.createObjectURL(file);
      const img = new Image();

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate scaling
        if (isMobile) {
          const targetMaxSize = viewport.width < 480 ? mobileMaxSize : maxSize;
          if (width > targetMaxSize || height > targetMaxSize) {
            const scale = Math.min(targetMaxSize / width, targetMaxSize / height);
            width *= scale;
            height *= scale;
          }
        } else {
          if (width > maxSize || height > maxSize) {
            const scale = Math.min(maxSize / width, maxSize / height);
            width *= scale;
            height *= scale;
          }
        }

        // Calculate position using current uploadedImages state
        const currentImages = [...uploadedImages];
        const pos = findNonOverlappingImagePosition(width, height, currentImages);

        // Add image to state
        setUploadedImages((prev) => {
          const existingIndex = prev.findIndex(img => img.src === src);
          if (existingIndex >= 0) return prev;

          return [
            ...prev,
            {
              src,
              x: pos.x,
              y: pos.y,
              width,
              height,
              originalWidth: img.width,
              originalHeight: img.height,
            },
          ];
        });

        // Cache the image
        setLoadedImages(prev => new Map(prev).set(src, img));
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
          commitTypedText(true);
        } else if (activeTextBlock && !typedText.trim()) {
          setActiveTextBlock(null);
          setTextLines([""]);
          setTypedText("");
          setCursorPosition({ line: 0, column: 0 });
          setTextToolActive(false);
          setShowKeyboard(false);
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
        commitTypedText(false);
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
      } else if (activeTextBlock && !typedText.trim()) {
        const newPosition = findNonOverlappingPosition(pos.x, pos.y);
        setActiveTextBlock({
          ...activeTextBlock,
          x: newPosition.x,
          y: newPosition.y,
        });
        setTextToolActive(true);
        setShowKeyboard(true);
      } else {
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

  /* -------------------- Handle Delete Image -------------------- */
  const handleDeleteImage = (index) => {
    if (index < 0 || index >= uploadedImages.length) return;

    const imageToDelete = uploadedImages[index];

    // Revoke object URL to prevent memory leaks
    if (imageToDelete.src.startsWith('blob:')) {
      URL.revokeObjectURL(imageToDelete.src);
    }

    // Remove from uploaded images
    setUploadedImages(prev => prev.filter((_, i) => i !== index));

    // Remove from image files
    setImageFiles(prev => prev.filter((_, i) => i !== index));

    // Remove from cache
    if (imageToDelete.src) {
      setLoadedImages(prev => {
        const newMap = new Map(prev);
        newMap.delete(imageToDelete.src);
        return newMap;
      });
    }

    // Update selected images if needed
    if (SelectedImages.includes(imageToDelete.src)) {
      setSelectedImages(prev => prev.filter(src => src !== imageToDelete.src));
    }

    // Mark for update if this is an existing image
    if (id && !imageToDelete.src.startsWith('blob:')) {
      setUpdateImage(prev => [...prev, imageToDelete.src]);
    }

    // Clear selection
    setSelectedImageIndex(null);
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
    setLoadedImages(new Map()); // Clear cached images
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
        title: "Saved Whiteboards",
      },
      sp: {
        name: "Pizarron",
        title: "Pizarras guardadas",
      },
    };
    return trans[transtext][params];
  };

  const discardChanges = () => {
    setIsPopupOpen(false);
    navigate(-1);
  };

  const saveFunction = () => {
    setIsPopupOpen(false);
    setShowSaveModal(true);
  };

  return (
    <>
      {FileUpload && (
        <ImageUpload
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
            isSummary={!checkDataExits() ? true : false}
            setIsPopupOpen={setIsPopupOpen}
            selectedLanguage={selectedLanguage}
            introductionOn={IntroductionOn}
            calendarOn={CalendarOn}
            name={t("name")}
            whiteboardname={t("title")}
          />
          <div className="main-wrapper home-wrapper whiteboard-wrapper">
            <div className="flex flex-col items-center whiteboard-card ">
              <Card className="w-full flex flex-col relative">
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
                      if (activeTextBlock && typedText.trim()) {
                        commitTypedText(true);
                      }
                      setTool("pencil");
                      setShowKeyboard(false);
                      setSelectedImageIndex(null);
                    }}
                    title="Pencil"
                  >
                    <img src={PencilIcon} className="icon-size-add" alt="Pencil Icon" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={activateTextTool}
                    title="Virtual Keyboard"
                  >
                    <img
                      src={TextIcon}
                      className="icon-size-add"
                      alt="Text Icon"
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    title="Upload image"
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
                        commitTypedText(true);
                      }
                      setTool("eraser");
                      setShowKeyboard(false);
                      setDrawingWidth(20);
                      setSelectedImageIndex(null);
                    }}
                    title="Eraser"
                  >
                    <img src={EraserIcon} className="icon-size-add" alt="Eraser Icon" />
                  </Button>

                  {/* Delete Selected Image Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(selectedImageIndex !== null && "bg-red-100")}
                    onClick={() => {
                      if (selectedImageIndex !== null) {
                        handleDeleteImage(selectedImageIndex);
                      }
                    }}
                    title="Delete Selected Image"
                    disabled={selectedImageIndex === null}
                  >
                    <Icon.Trash className="icon-size-add" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-gray-100"
                    onClick={handleClear}
                    title="Clear All"
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
                    onClick={() => setShowSaveModal(true)}
                    title="File Save"
                  >
                    <img
                      src={SaveIcon}
                      className="icon-size-add"
                      alt="Save Icon"
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