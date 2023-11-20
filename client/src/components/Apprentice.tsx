import React from "react";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button"

type ApprenticeProps = {
  apprentice: {
    Name: string;
    Language: string;
    Hub: string;
    Img: string;
  };
  setAreApprenticesVisible: (b: boolean) => void;
  fetchApprentice: (name: string) => void;
};

export const Apprentice = ({
  apprentice,
  setAreApprenticesVisible,
  fetchApprentice,
}: ApprenticeProps) => {
  async function handleClick(apprentice: {}): Promise<any> {
    await fetchApprentice(apprentice.Name);
    setAreApprenticesVisible(false);
  }

  return (
    <Container>
      <Row>
        <Col>
          <Image src={apprentice.Img} width={150} height={150} roundedCircle />
        </Col>
        <Col>
          <h3>{apprentice.Name}</h3>
        </Col>
        <Col>
          <p>{apprentice.Hub}</p>
        </Col>
        <Col>
          <Button onClick={() => handleClick(apprentice)}>
            View Apprentice
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
