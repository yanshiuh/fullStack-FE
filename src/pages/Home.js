import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import userAPI from "../api";

function Home() {
  const [users, setUsers] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const fetchUsers = await fetch(userAPI)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setDone(true);
      });
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
          <h1>Users</h1>
          <Link to={"/createUser"} className="add-user-btn">
            Create User
          </Link>
          {users.map((user) => (
            <Link to={`/user/${user.documentId}`} key={user.documentId}>
              <div className="user-section">
                <div className="user-field">
                  <h3>Name:</h3>
                  <p>{user.name}</p>
                </div>
                <div className="user-field">
                  <h3>Age:</h3>
                  <p>{user.age}</p>
                </div>
                <div className="user-field">
                  <h3>State:</h3>
                  <p>{user.state}</p>
                </div>
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  );
}

export default Home;
