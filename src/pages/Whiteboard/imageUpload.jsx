import { useNavigate } from "react-router-dom";

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
  const handleUploadClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept =
      "image/*,.heic,.heif,.jpg,.jpeg,.png,.webp,.gif,.bmp";
    input.multiple = true;
    input.onchange = (e) => {
      handleImageUpload(Array.from(e.target.files));
      setOpen(false);
    };
    input.click();
  };

  const handleChooseFromLibrary = (e) => {
    e.preventDefault();
    navigate("/images-library", { state: { oldImages, uploadedImages, pathname, textBlocks, paths } });
  };
  return (
    <div className="flex justify-center">
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 relative">
            {/* Close button */}
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
              {/* Upload Option */}
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

              {/* Choose from Library Option */}
              <button
                onClick={(e) => {
                  handleChooseFromLibrary(e);
                }}
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
