import Modal from "../UI/Modal";

interface PermissionToDelete {
  handleConfirmDelete: () => void;
  setShowModal: (tf : boolean) => void;
}
export default function PermissionToDelete({
  handleConfirmDelete,
  setShowModal,
}: PermissionToDelete) {
  return (
    <Modal>
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
          <h2 className="text-xl font-bold mb-4">Delete Profile?</h2>
          <p className="mb-6 text-sm text-gray-700">
            Are you sure you want to delete your profile? This action cannot be
            undone.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleConfirmDelete}
              className="bg-red-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="bg-gray-300 cursor-pointer text-black px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
