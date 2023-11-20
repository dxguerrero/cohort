import React from "react";

import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";

type ApprenticeViewProps = {
  currentApprentice: {
    Name: string;
    Language: string;
    Hub: string;
    Img: string;
  };
  setAreApprenticesVisible: (b: boolean) => void;
  fetchApprentice: (name: string) => void;
};

export const ApprenticeView = ({
  currentApprentice,
  fetchApprentice,
  setAreApprenticesVisible,
}: ApprenticeViewProps) => {
  return (
    <Card style={{ width:"30rem" }} className="border border-primary">
      <Image
e       src={currentApprentice.Img}
        alt={currentApprentice.Name}
        height={400}
        width={400}
        roundedCircle
        className="d-block mx-auto p-2"
      />
      <Card.Body>
        <Card.Title>{currentApprentice.Name}</Card.Title>
        <Card.Text>Apprentice Hub: {currentApprentice.Hub}</Card.Text>
      </Card.Body>
      <p>{currentApprentice.Hub}</p>
      <h2>{currentApprentice.Language}</h2>
    </Card>
  );
};
