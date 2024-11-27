import { FC, Fragment } from "react";
interface Props {
  open: boolean;
  onClose: () => void;
}
const ModalComponent: FC<Props> = ({ open, onClose }) => {
  return (
    <Fragment>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          position: "fixed",
          zIndex: 999,
          backgroundColor: "rgba(0,0,0,0.6)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={onClose}
      >
        <div
          style={{
            width: 400,
            height: 400,
            borderRadius: "5px",
            backgroundColor: "white",
            zIndex: 1500,
          }}
          className="modal-box"
          onClick={(e) => e.stopPropagation()}
        >
          modal box
        </div>
      </div>
    </Fragment>
  );
};

export default ModalComponent;
