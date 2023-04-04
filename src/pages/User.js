import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import userAPI from "../api";

function User() {
  const param = useParams();
  const documentId = param.documentId;
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [state, setState] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    getUser(documentId);
  }, []);

  const getUser = async (documentId) => {
    const fetchUser = await axios
      .get(userAPI + "/" + documentId)
      .then((res) => {
        const user = res.data;

        setName(user.name);
        setAge(user.age);
        setState(user.state);
        setDone(true);
      })
      .catch((err) => alert(err));
  };

  const submitForm = (e) => {
    e.preventDefault();

    const userObj = {
      documentId: documentId,
      name: name,
      age: age,
      state: state,
    };

    axios
      .put(userAPI, userObj)
      .then((res) => {
        if (res.status === 200) nav("/");
      })
      .catch((err) => alert(err));
  };

  const deleteUser = () => {
    if (window.confirm("Are you sure to delete the user?")) {
      axios
        .delete(userAPI + "/" + documentId)
        .then((res) => {
          if (res.status === 200) nav("/");
        })
        .catch((err) => alert(err));
    }
  };

  return (
    <div className="container">
      {!done ? (
        <ReactLoading
          className="loading-spin"
          type={"spin"}
          color={"#000"}
          height={75}
          width={75}
        />
      ) : (
        <>
          <h1>Edit user</h1>
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
              Update
            </button>
            <button
              className="delete-btn"
              type="button"
              onClick={() => deleteUser()}
            >
              Delete
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default User;
