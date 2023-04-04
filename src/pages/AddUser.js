import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import userAPI from "../api";

function AddUser() {
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [state, setState] = useState("");

  const submitForm = (e) => {
    e.preventDefault();

    const id = uuid().slice(0, 3);

    const userObj = {
      documentId: id,
      name: name,
      age: age,
      state: state,
    };

    axios
      .post(userAPI, userObj)
      .then((res) => {
        if (res.status === 200) nav("/");
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="container">
      <h1>Create user</h1>
      <Link to={"/"} className="add-user-btn">
        Back
      </Link>
      <form className="form" onSubmit={(e) => submitForm(e)}>
        <div className="form-field">
          <p>Name: </p>
          <input
            type="text"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-field">
          <p>Age: </p>
          <input
            type="number"
            min={0}
            className="form-input"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="form-field">
          <p>State: </p>
          <input
            type="text"
            className="form-input"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>

        <button className="form-btn" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}

export default AddUser;
