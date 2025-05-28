import { Fragment, ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

type ModalProps = {
  children: ReactNode;
  onClose?: () => void;
};

const Backdrop = ({ onClose }: { onClose?: () => void }) => {
  return <div className={classes.backdrop} onClick={onClose} />;
};

const ModalOverlay = ({ children }: { children: ReactNode }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

const Modal = ({ children, onClose }: ModalProps) => {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalElement(document.getElementById("overlays"));
  }, []);

  if (!portalElement) return null;

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
