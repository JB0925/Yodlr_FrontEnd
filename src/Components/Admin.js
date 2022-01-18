import React, { useEffect, useCallback } from "react";
import { useUserContext } from "../useYodlrContext";
import YodlrApi from "../yodlrApi";
import UserCard from "./UserCard";
import { getUsers, updateUser } from "../actionCreators";
import "../CSS/Admin.css";

export default function Admin() {
  const [{ allUsers }, dispatch] = useUserContext();

  const getUserData = useCallback(async () => {
    const users = await YodlrApi.getAllUsers();
    dispatch(getUsers(users));
  }, [dispatch]);

  useEffect(() => {
    getUserData();
  }, [dispatch, getUserData]);

  const makeUpdatesToUser = async (id, userState) => {
    if (userState !== "active") {
      const updatedUser = await YodlrApi.updateUser(id);
      dispatch(updateUser(updatedUser));
    }
  };

  const showAllUsers = allUsers.map((user) => (
    <UserCard {...user} updateUser={makeUpdatesToUser} />
  ));

  return (
    <div className="container">
      {allUsers.length ? showAllUsers : <h1>Loading...</h1>}
    </div>
  );
}
