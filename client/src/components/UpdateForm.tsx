import { useState } from "react";
import { Modal, Form, Button, Col, Row } from "react-bootstrap";

type UpdateFormProps = {
  currentApprentice: {
    Name: string;
    Language: string;
    Hub: string;
    Img: string;
  };
  apiURL: string;
  setUpdatingApprentice: (b: boolean) => void;
  updatingApprentice: boolean;
};

export const UpdateForm = ({
  currentApprentice,
  setUpdatingApprentice,
  apiURL,
  updatingApprentice,
}: UpdateFormProps) => {
  const [name, setName] = useState(currentApprentice.Name);
  const [language, setLanguage] = useState(currentApprentice.Language);
  const [hub, setHub] = useState(currentApprentice.Hub);
  const [img, setImg] = useState(currentApprentice.Img);

  async function submitHandler(e: any) {
    e.preventDefault();
    const updatedApprentice = {
      name,
      language,
      hub,
      img,
    };

    try {
      await fetch(`${apiURL}/apprentices/${currentApprentice.Name}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedApprentice),
      });
    } catch (err) {
      console.log("Oh no an error", err);
    }

    setUpdatingApprentice(false);
  }

  return (
    <Modal
      show={updatingApprentice}
      onHide={() => {
        setUpdatingApprentice(false);
      }}
    >
      <Modal.Header className="modal-header">
        <Modal.Title>Update Apprentice</Modal.Title>
        <Button
          onClick={() => {
            setUpdatingApprentice(false);
          }}
        >
          <span className="bi bi-arrow-left-circle"></span>
        </Button>
      </Modal.Header>
      <Modal.Body>
        <Form className="p-3" onSubmit={submitHandler}>
          <Row>
            <Form.Group as={Col} className="mb-3" controlId="formGroupName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group
              as={Col}
              className="mb-3"
              controlId="formGroupDescription"
            >
              <Form.Label>Language Learned</Form.Label>
              <Form.Control
                type="text"
                placeholder="Language Learned"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="formGridPrice">
              <Form.Label>Apprentice Hub</Form.Label>
              <Form.Control
                type="text"
                placeholder="Apprentice Hub"
                value={hub}
                onChange={(e) => setHub(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCategory">
              <Form.Label>Profile Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Image URL"
                value={img}
                onChange={(e) => setImg(e.target.value)}
              />
            </Form.Group>
          </Row>
          <Row>
            <div className="submit-button">
              <Button type="submit">Save Changes</Button>
            </div>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
