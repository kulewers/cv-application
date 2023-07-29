import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "../styles/EduExperience.css";

export default function EduExperience({ submitFunction, list }) {
  const [status, setStatus] = useState("waiting");
  const [currentlyEditingId, setCurrentlyEditingId] = useState(null);

  function changeStatus(newStatus, newId) {
    setStatus(newStatus);
    setCurrentlyEditingId(newId);
  }

  return (
    <>
      {status === "waiting" ? (
        <SelectView selectionHandler={changeStatus} list={list} />
      ) : (
        <EditView
          status={status}
          editingId={currentlyEditingId}
          list={list}
          submitFunction={submitFunction}
          changeStatus={changeStatus}
        />
      )}
    </>
  );
}

function SelectView({ selectionHandler, list }) {
  return (
    <>
      <div className="select-view">
        <h1>Select Educational Exerience</h1>
        <ul className="existing-experiences">
          {list.map((item) => (
            <li
              className="existing-experience"
              onClick={() => selectionHandler("editing", item.id)}
              key={item.id}
            >
              {item.degree}
            </li>
          ))}
        </ul>
        <button
          className="new-experience"
          onClick={() => selectionHandler("adding", null)}
        >
          Add new experience
        </button>
      </div>
    </>
  );
}

function EditView({ status, editingId, list, submitFunction, changeStatus }) {
  const editedItem = list.find((item) => item.id === editingId);

  function submitEdit(e) {
    const submittedItem = {
      degree: e.target.form[0].value,
      place: e.target.form[1].value,
      startDate: e.target.form[2].value,
      endDate: e.target.form[3].value,
      id: editingId,
    };
    const newList = [...list];
    newList.splice(list.indexOf(editedItem), 1, submittedItem);

    submitFunction(newList);
    changeStatus("waiting", null);
  }

  function submitNewExperience(e) {
    const submittedItem = {
      degree: e.target.form[0].value,
      place: e.target.form[1].value,
      startDate: e.target.form[2].value,
      endDate: e.target.form[3].value,
      id: uuidv4(),
    };
    submitFunction([...list, submittedItem]);
    changeStatus("waiting", null);
  }

  function removeExperience(e) {
    const newList = [...list];
    newList.splice(list.indexOf(editedItem), 1);
    submitFunction(newList);
    changeStatus("waiting", null);
  }

  return (
    <>
      <form className="edu-experience" onSubmit={(e) => e.preventDefault()}>
        <h1>Educational Experience</h1>

        <label htmlFor="degree">
          Degree:
          <input
            type="text"
            id="degree"
            defaultValue={null ?? editedItem?.degree}
            required
          ></input>
        </label>

        <label htmlFor="place">
          Place of study:
          <input
            type="text"
            id="place"
            defaultValue={null ?? editedItem?.place}
            required
          ></input>
        </label>

        <label htmlFor="start-date">
          Start date:
          <input
            type="date"
            id="start-date"
            defaultValue={null ?? editedItem?.startDate}
            required
          ></input>
        </label>

        <label htmlFor="end-date">
          End date:
          <input
            type="date"
            id="end-date"
            defaultValue={null ?? editedItem?.endDate}
            required
          ></input>
        </label>

        <div className="options">
          <button
            onClick={status === "editing" ? submitEdit : submitNewExperience}
          >
            Submit
          </button>
          {status === "editing" ? (
            <button onClick={removeExperience}>Remove</button>
          ) : null}
          <button onClick={() => changeStatus("waiting", null)}>Cancel</button>
        </div>
      </form>
    </>
  );
}
