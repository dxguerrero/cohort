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

  const apiURL:string = "https://cohort-app.onrender.com"

  async function fetchApprentices() {
    try {
      const response = await fetch(`${apiURL}/`);
      const apprenticesData = await response.json();
      console.log(apprenticesData);

      setApprentices(apprenticesData.apprentices);
    } catch (err) {
      console.log("Oh no, an error!", err);
    }
  }

  async function fetchApprentice(name: string) {
    try {
      const response = await fetch(`${apiURL}/apprentices/${name}`);
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
            {!areApprenticesVisible ? (
              <div className="d-flex justify-content-between">
              <Button><span><i className="bi bi-pencil"></i></span></Button>
              <Button
                onClick={() => {
                  setAreApprenticesVisible(true);
                }}
              >
                <span className="bi bi-arrow-left-circle"></span>
              </Button>
              </div>
            ) : (
              <Button>
                <span><i className="bi bi-plus-circle"></i></span>
              </Button>
            )}
          </Container>
        </Navbar>
        {!areApprenticesVisible && currentApprentice ? (
          <>
            <ApprenticeView
              currentApprentice={currentApprentice}
              fetchApprentice={fetchApprentice}
              setAreApprenticesVisible={setAreApprenticesVisible}
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
