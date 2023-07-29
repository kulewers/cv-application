import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./App.css";

import General from "./components/General";
import EduExperience from "./components/EduExperience";
import CV from "./components/CV";

function App() {
  const [generalInfo, setGeneralInfo] = useState({
    name: "Example Name",
    email: "examplemail@example.com",
    tel: "1-212-456-7890",
  });
  const [eduExperiences, setEduExperiences] = useState([]);

  return (
    <>
      <General submitFunction={setGeneralInfo} />
      <EduExperience
        submitFunction={setEduExperiences}
        list={eduExperiences}
      ></EduExperience>

      <CV generalInfo={generalInfo} eduExperiences={eduExperiences}></CV>
    </>
  );
}

export default App;
