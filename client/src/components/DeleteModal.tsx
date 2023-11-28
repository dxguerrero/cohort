import { Modal, Button, Col, Row } from "react-bootstrap";

type DeleteModalProps = {
  currentApprentice: {
    Name: string;
    Language: string;
    Hub: string;
    Img: string;
  };
  apiURL: string;
  deletingApprentice: boolean;
  setDeletingApprentice: (b: boolean) => void;
  setPost: (b: boolean) => void;
};

export const DeleteModal = ({
  currentApprentice,
  apiURL,
  deletingApprentice,
  setDeletingApprentice,
  setPost,
}: DeleteModalProps) => {
  async function deleteApprentice(name: string) {
    try {
      await fetch(`${apiURL}/apprentices/${name}`, { method: "DELETE" });
      setPost(true);
      setDeletingApprentice(false);
    } catch (err) {
      console.log("Something went wrong!", err);
    }
  }

  return (
    <Modal
      show={deletingApprentice}
      onHide={() => {
        setDeletingApprentice(false);
      }}
    >
      <Modal.Header className="modal-header">
        <Modal.Title>Delete Apprentice</Modal.Title>
        <Button
          onClick={() => {
            setDeletingApprentice(false);
          }}
        >
          <span className="bi bi-arrow-left-circle"></span>
        </Button>
      </Modal.Header>
      <Modal.Body>Are you sure you want to <b>permanently delete</b> this apprentice?</Modal.Body>
      <Modal.Footer>
        <Button onClick={()=> {deleteApprentice(currentApprentice.Name)}}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
