import React from "react";

const TopicBoardPop = ({
  setEditData,
  topicId,
  setIsDelete,
  onConfirm,
  isDelete,
  formik,
  setShowModal,
}) => {
  return (
    <>
      {isDelete ? (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-[350px]">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Are you sure you want to delete this?
            </h2>

            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => {
                  formik.resetForm();
                  setShowModal(false);
                  setIsDelete(false);
                }}
                className="px-4 py-2 rounded-2xl bg-blue-300 hover:bg-blue-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onConfirm(topicId);
                  formik.resetForm();
                }}
                className="px-4 py-2 rounded-2xl color-red bg-red-300 hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-[400px]">
            <h2 className="text-lg font-semibold mb-4">Add / Edit</h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="firstname"
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border px-3 py-2 rounded-lg"
                />
                {formik.touched.firstname && formik.errors.firstname && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.firstname}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={(event) =>
                    formik.setFieldValue("image", event.currentTarget.files[0])
                  }
                />

                {/* Image preview */}
                {formik.values.image && (
                  <div className="mt-2">
                    <img
                      src={
                        typeof formik.values.image === "string"
                          ? formik.values.image
                          : URL.createObjectURL(formik.values.image)
                      }
                      alt="Preview"
                      className="h-20 w-20 object-cover rounded-lg border"
                    />
                  </div>
                )}

                {formik.errors.image && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.image}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    formik.resetForm({
                      values: {
                        firstname: "",
                        image: null,
                      },
                    });
                    setEditData(null);

                    setShowModal(false);
                  }}
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TopicBoardPop;
