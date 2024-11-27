import { useState } from "react";
import ModalComponent from "./ModalComponent";

const Modal = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="container">
      <button onClick={() => setOpen(true)}>Show Modal</button>
      {open && <ModalComponent open={open} onClose={() => setOpen(false)} />}
    </div>
  );
};

export default Modal;
