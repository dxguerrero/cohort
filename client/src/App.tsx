import { useEffect, useState } from 'react'
import './App.css'
import { ApprenticeList } from './components/ApprenticeList';

function App() {

  const [areApprenticesVisible, setAreApprenticesVisible] = useState(true);
  const [apprentices, SetApprentices] = useState([]);

  async function fetchApprentices() {
    try {
      const response = await fetch(`http://localhost:3000/apprentices`);
      const apprenticeData = await response.json();
      console.log(apprenticeData);

      SetApprentices(apprenticeData.apprentices);
    } catch (err) {
      console.log("Oh no an error!", err);
    }
  }

  useEffect(()=>{
    fetchApprentices();
    setAreApprenticesVisible(true);
  }, []);
  

  return (
    <>
     <h1>Cohort App</h1>
     <ApprenticeList apprentices={apprentices} setAreApprenticesVisible={setAreApprenticesVisible} />
    </>
  )
}

export default App
