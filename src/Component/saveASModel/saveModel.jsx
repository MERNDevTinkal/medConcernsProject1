import React from "react";

const SaveModel = ({ setShowSaveModal }) => {
    return (
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
                            className="col-span-5 h-12 w-full rounded-md border border-gray-300 px-3 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-700"
                        />
                    </div>
                </div>
                <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-center sm:space-x-2">
                    <button
                        variant="outline"
                        onClick={() => setShowSaveModal(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="thm-btn"

                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SaveModel;