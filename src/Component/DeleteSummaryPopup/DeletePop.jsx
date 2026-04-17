const DeletePopUp = ({selectedLanguage, deleteId, setShowDeleteModal, confirmDelete, showDeleteModal }) => {
    return (
        <>
            {showDeleteModal && (
                <div className="fixed inset-0  bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-[90%] max-w-md">
                        <h2 className="text-lg font-semibold mb-3">
                            {selectedLanguage === "Spanish" ? "Eliminar Resumen" : "Delete Summary"}
                        </h2>

                        <p className="text-gray-600 mb-6">
                            {selectedLanguage === "Spanish" ? "¿Estás seguro de que quieres eliminar este resumen?" : "Are you sure you want to delete this summary?"}
                            {selectedLanguage === "Spanish" ? "Esta acción no se puede deshacer." : "This action cannot be undone."}
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
                            >
                                {selectedLanguage === "Spanish" ? "Cancelar" : "Cancel"}
                            </button>

                            <button
                                onClick={() => { confirmDelete(deleteId) }}
                                className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
                            >
                                {selectedLanguage === "Spanish" ? "Eliminar" : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
}

export default DeletePopUp;