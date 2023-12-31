import { useEffect } from 'react';
import { UpdateForm } from './UpdateForm';
import { DeleteModal } from './DeleteModal';

import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";

// import Button from "react-bootstrap/Button";

type ApprenticeViewProps = {
  currentApprentice: {
    Name: string;
    Language: string;
    Hub: string;
    Img: string;
  };
  fetchApprentice: (name: string) => void;
  updatingApprentice: boolean;
  setUpdatingApprentice: (b: boolean) => void;
  apiURL: string;
  deletingApprentice: boolean;
  setDeletingApprentice: (b: boolean) => void;
  setPost: (b: boolean) => void;
};

export const ApprenticeView = ({
  currentApprentice,
  fetchApprentice,
  updatingApprentice,
  setUpdatingApprentice,
  apiURL,
  deletingApprentice,
  setDeletingApprentice,
  setPost
}: 

ApprenticeViewProps) => {

  useEffect(() => {
    fetchApprentice(currentApprentice.Name);
  }, [updatingApprentice])

  return (
    <>
    {updatingApprentice && (
      <UpdateForm 
      currentApprentice={currentApprentice}
      apiURL={apiURL}
      setUpdatingApprentice={setUpdatingApprentice}
      updatingApprentice={updatingApprentice}
      />
    )}

    {deletingApprentice && (
      <DeleteModal
        currentApprentice = {currentApprentice} 
        apiURL={apiURL}
        deletingApprentice
        setDeletingApprentice={setDeletingApprentice}
        setPost={setPost}
      />
    )}
    <Card
      style={{ width: "30rem" }}
      className="border border-primary card-box-shadow"
    >
      <Image
        src={currentApprentice.Img}
        alt={currentApprentice.Name}
        height={400}
        width={400}
        roundedCircle
        className="d-block mx-auto p-2"
      />
      <Card.Body>
        <Card.Title>{currentApprentice.Name}</Card.Title>
        <Card.Text>Apprentice Hub: {currentApprentice.Hub}</Card.Text>
        <Card.Text>Language Learned: {currentApprentice.Language}</Card.Text>
      </Card.Body>
    </Card>
    </>
  );
};
