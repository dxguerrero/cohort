import { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";

type CreateFormProps = {
  setAddingApprentice: (b: boolean) => void;
  setPost: (b: boolean) => void;
  apiURL: string;
};

export const CreateForm = ({
  setAddingApprentice,
  setPost,
  apiURL,
}: CreateFormProps) => {
  const [name, setName] = useState("");
  const [language, setLanguage] = useState("");
  const [hub, setHub] = useState("");
  const [img, setImg] = useState("https://i.stack.imgur.com/34AD2.jpg");

  async function submitHandler(e: any) {
    e.preventDefault();
    const newApprentice = {
      name,
      language,
      hub,
      img,
    };

    try {
      await fetch(`${apiURL}/apprentices`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newApprentice),
      });
    } catch (err) {
      console.log("Oh no an error", err);
    }

    setAddingApprentice(false);
    setPost(true);
  }

  return (
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
        <Form.Group as={Col} className="mb-3" controlId="formGroupDescription">
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
          <Button type="submit">Submit</Button>
        </div>
      </Row>
    </Form>
  );
};
