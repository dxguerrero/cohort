import { useEffect, useState } from "react";
import "./App.css";
import { ApprenticeList } from "./components/ApprenticeList";

function App() {
  const [areApprenticesVisible, setAreApprenticesVisible] = useState(true);
  const [apprentices, setApprentices] = useState([]);
  const [currentApprentice, setCurrentApprentice] = useState({});

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

      setCurrentApprentice(apprenticeData);
    } catch (err) {
      console.log("Oh no, an error!", err);
    }
  }

  useEffect(() => {
    fetchApprentices();
    setAreApprenticesVisible(true);
  }, []);

  return (
    <main>

      {
        !areApprenticesVisible && currentApprentice ? (
          <>
          <h1>Test</h1>
          <button onClick={()=>{setAreApprenticesVisible(true)}}>Back</button>
          </>
        ) : ("")
      }
      {areApprenticesVisible && (
        <>
          <h1>Cohort App</h1>
          <ApprenticeList
            apprentices={apprentices}
            setAreApprenticesVisible={setAreApprenticesVisible}
            fetchApprentice={fetchApprentice}
          />
        </>
      )}
    </main>
  );
}

export default App;
