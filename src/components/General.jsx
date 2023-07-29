import React from "react";
import { useState } from "react";
import "../styles/General.css";

export default function General({ submitFunction }) {
  const [status, setStatus] = useState("submitted");

  const readonly = status === "submitted" ? true : false;

  function edit(e) {
    e.preventDefault();
    setStatus("editing");
  }

  function submit(e) {
    e.preventDefault();
    submitFunction({
      name: e.target.form[0].value,
      email: e.target.form[1].value,
      tel: e.target.form[2].value,
    });
    setStatus("submitted");
  }

  return (
    <form className="general">
      <h1>General info</h1>

      <label htmlFor="name">
        Name:
        <input type="text" id="name" readOnly={readonly}></input>
      </label>

      <label htmlFor="email">
        E-mail:
        <input type="email" id="email" readOnly={readonly}></input>
      </label>

      <label htmlFor="phone-number">
        Phone number:
        <input type="tel" id="phone-number" readOnly={readonly}></input>
      </label>

      {status === "submitted" ? (
        <button onClick={edit}>Edit</button>
      ) : (
        <button onClick={submit}>Submit</button>
      )}
    </form>
  );
}
