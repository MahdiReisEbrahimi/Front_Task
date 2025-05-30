import { Fragment, ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

type ModalProps = {
  children: ReactNode;
  onClose?: () => void;
};

// Semi-transparent background to close modal when clicked
const Backdrop = ({ onClose }: { onClose?: () => void }) => {
  return <div className={classes.backdrop} onClick={onClose} />;
};

// Modal box content wrapper
const ModalOverlay = ({ children }: { children: ReactNode }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

// Main Modal component using a React portal
const Modal = ({ children, onClose }: ModalProps) => {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  // Get the target DOM node for portal rendering after component mounts
  useEffect(() => {
    setPortalElement(document.getElementById("overlays"));
  }, []);

  if (!portalElement) return null; // Prevent rendering if portal target doesn't exist

  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
