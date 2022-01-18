import React, { useEffect, useCallback } from "react";
import { useUserContext } from "../useYodlrContext";
import YodlrApi from "../yodlrApi";
import userPhoto from "../blank-avatar.png";
import "../CSS/Admin.css";

export default function Admin() {
  const [{ allUsers }, dispatch] = useUserContext();

  const getUserData = useCallback(async () => {
    const users = await YodlrApi.getAllUsers();
    dispatch({
      type: "get all users",
      payload: users,
    });
  }, [dispatch]);

  useEffect(() => {
    getUserData();
  }, [dispatch, getUserData]);

  const updateUser = async (id) => {
    await YodlrApi.updateUser(id);
    await getUserData();
  };

  const showAllUsers = allUsers.map((user) => {
    return (
      <div className="user-block">
        <div className="user-photo">
          <img src={userPhoto} alt={`${user.firstName} ${user.lastName}`} />
        </div>
        <div className="user-info">
          <ul>
            <li>{user.firstName}</li>
            <li>{user.lastName}</li>
            <li>{user.email}</li>
            <li>{user.state}</li>
          </ul>
          <button type="button" onClick={(evt) => updateUser(user.id)}>
            Update
          </button>
        </div>
      </div>
    );
  });

  return (
    <div className="container">
      {allUsers.length ? showAllUsers : <h1>Loading...</h1>}
    </div>
  );
}
