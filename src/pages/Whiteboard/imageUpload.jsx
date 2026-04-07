import { useNavigate } from "react-router-dom";
import { useRef } from "react";

export default function AddImagePopup({
  textBlocks,
  paths,
  oldImages,
  pathname,
  uploadedImages,
  handleImageUpload,
  setOpen,
  open,
}) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleImageUpload(Array.from(e.target.files));
      setOpen(false);
      e.target.value = '';
    }
  };

  const handleChooseFromLibrary = (e) => {
    e.preventDefault();
    navigate("/images-library", {
      state: {
        oldImages,
        paths,
        textBlocks,
        selectedImages: uploadedImages,
        pathname,
      },
    });
  };

  return (
    <div className="flex justify-center">
      <input
        type="file"
        accept="image/*,image/heic,image/heif,.heic,.heif,.jpg,.jpeg,.png,.webp,.gif,.bmp"
        multiple
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              &times;
            </button>

            <h2 className="text-xl font-semibold text-center mb-6">
              Add Image to Whiteboard
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={handleUploadClick}
                className="flex flex-col items-center justify-center border rounded-xl p-5 hover:bg-gray-50 transition"
              >
                📤
                <span className="font-medium text-gray-700 mt-2">
                  Upload Image
                </span>
                <span className="text-sm text-gray-500">
                  Choose from your device
                </span>
              </button>

              <button
                onClick={(e) => handleChooseFromLibrary(e)}
                className="flex flex-col items-center justify-center border rounded-xl p-5 hover:bg-gray-50 transition"
              >
                🖼️
                <span className="font-medium text-gray-700 mt-2">
                  Choose from Library
                </span>
                <span className="text-sm text-gray-500">
                  Select from app icons
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}