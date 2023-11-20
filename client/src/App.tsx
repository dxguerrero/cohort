import { useEffect, useState } from "react";
import "./App.css";
import { ApprenticeList } from "./components/ApprenticeList";
import { ApprenticeView } from "./components/ApprenticeView";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

function App() {
  const [areApprenticesVisible, setAreApprenticesVisible] = useState(true);
  const [apprentices, setApprentices] = useState([]);

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

  async function fetchApprentices() {
    try {
      const response = await fetch(`http://localhost:3000/apprentices`);
      const apprenticesData = await response.json();
      console.log(apprenticesData);

      setApprentices(apprenticesData.apprentices);
    } catch (err) {
      console.log("Oh no, an error!", err);
    }
  }

  async function fetchApprentice(name: string) {
    try {
      const response = await fetch(`http://localhost:3000/apprentices/${name}`);
      const apprenticeData = await response.json();
      console.log(apprenticeData);

      setCurrentApprentice(apprenticeData.apprentice);
    } catch (err) {
      console.log("Oh no, an error!", err);
    }
  }

  useEffect(() => {
    fetchApprentices();
    setAreApprenticesVisible(true);
  }, []);

  return (
    <>
    <main>
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>Cohort App</Navbar.Brand>
      </Container>
    </Navbar>
      {!areApprenticesVisible && currentApprentice ? (
        <>
          <ApprenticeView currentApprentice={currentApprentice} fetchApprentice={fetchApprentice} setAreApprenticesVisible={setAreApprenticesVisible} />
          <Button
            onClick={() => {
              setAreApprenticesVisible(true);
            }}
          >
            Back
          </Button>
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
