import Modal from "../UI/Modal";

export default function SignUpForm({ onClose }: { onClose: () => void }) {
  return (
    <Modal>
      <div className="text-white">this is Signup modal</div>
      <button onClick={onClose}></button>
    </Modal>
  );
}
