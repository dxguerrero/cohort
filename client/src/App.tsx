import { useEffect, useState } from "react";
import "./App.css";
import { ApprenticeList } from "./components/ApprenticeList";
import { ApprenticeView } from "./components/ApprenticeView";
import { CreateForm } from "./components/CreateForm";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function App() {
  const [areApprenticesVisible, setAreApprenticesVisible] = useState(true);
  const [apprentices, setApprentices] = useState([]);
  const [addingApprentice, setAddingApprentice] = useState(false);
  const [post, setPost] = useState(false);
  const [updatingApprentice, setUpdatingApprentice] = useState(false);
  const [deletingApprentice, setDeletingApprentice] = useState(false);

  type currentApprenticeTypes = {
    Name: string;
    Language: string;
    Hub: string;
    Img: string;
  };
  const [currentApprentice, setCurrentApprentice] =
    useState<currentApprenticeTypes>({
      Name: "",
      Language: "",
      Hub: "",
      Img: "",
    });

  const apiURL: string = "https://cohort-app.onrender.com";

  async function fetchApprentices() {
    try {
      const response = await fetch(`${apiURL}/`);
      const apprenticesData = await response.json();
      

      setApprentices(apprenticesData.apprentices);
    } catch (err) {
      console.log("Oh no, an error!", err);
    }
  }

  async function fetchApprentice(name: string) {
    try {
      const response = await fetch(`${apiURL}/apprentices/${name}`);
      const apprenticeData = await response.json();
      

      setCurrentApprentice(apprenticeData.apprentice);
    } catch (err) {
      console.log("Oh no, an error!", err);
    }
  }

  function backToList(): void {
    setAddingApprentice(false);
    setAreApprenticesVisible(true);
    setPost(true);
  }

  useEffect(() => {
    fetchApprentices();
    setAreApprenticesVisible(true);
    setPost(false);
  }, [post]);

  return (
    <>
      <main>
        <Navbar bg="primary" data-bs-theme="dark">
          <Container>
            <Navbar.Brand>Cohort</Navbar.Brand>
            {!areApprenticesVisible ? (
              <div className="d-flex justify-content-between">
                <Button onClick={()=>{setUpdatingApprentice(true)}}>
                  <span>
                    <i className="bi bi-pencil"></i>
                  </span>
                </Button>
                <Button onClick={()=> {setDeletingApprentice(true)}}>
                  <span>
                    <i className="bi bi-trash3"></i>
                  </span>
                </Button>
                <Button onClick={backToList}>
                  <span className="bi bi-arrow-left-circle"></span>
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => {
                  setAddingApprentice(true);
                }}
              >
                <span>
                  <i className="bi bi-plus-circle"></i>
                </span>
              </Button>
            )}
          </Container>
        </Navbar>

        {addingApprentice && (
          <Modal
            show={addingApprentice}
            onHide={() => {
              setAddingApprentice(false);
            }}
          >
            <Modal.Header className="modal-header">
              <Modal.Title>Add Apprentice</Modal.Title>
              <Button
                onClick={() => {
                  setAddingApprentice(false);
                }}
              >
                <span className="bi bi-arrow-left-circle"></span>
              </Button>
            </Modal.Header>
            <CreateForm
              setAddingApprentice={setAddingApprentice}
              setPost={setPost}
              apiURL={apiURL}
            />
          </Modal>
        )}

        {!areApprenticesVisible && currentApprentice ? (
          <>
            <ApprenticeView
              currentApprentice={currentApprentice}
              fetchApprentice={fetchApprentice}
              updatingApprentice={updatingApprentice}
              setUpdatingApprentice={setUpdatingApprentice}
              apiURL={apiURL}
              deletingApprentice={deletingApprentice}
              setDeletingApprentice={setDeletingApprentice}
              setPost={setPost}
            />
          </>
        ) : (
          ""
        )}
        {areApprenticesVisible && (
          <>
            <ApprenticeList
              apprentices={apprentices}
              setAreApprenticesVisible={setAreApprenticesVisible}
              fetchApprentice={fetchApprentice}
            />
          </>
        )}
      </main>
    </>
  );
}

export default App;
