import React, { useEffect, useCallback } from "react";
import { useUserContext } from "../useYodlrContext";
import YodlrApi from "../yodlrApi";
import UserCard from "./UserCard";
import { getUsers } from "../actionCreators";
import "../CSS/Admin.css";

/**
 * Admin
 *
 * This component houses the Admin page, where the
 * admin can view all users and update them as needed.
 *
 * It displays several UserCard components, which have
 * a stock headshot photo and all of the user's info on
 * the card. There is also a button on the card that can be
 * used to pull up a form to update the user.
 */
export default function Admin() {
  const [{ allUsers }, dispatch] = useUserContext();

  const getUserData = useCallback(async () => {
    const users = await YodlrApi.getAllUsers();
    dispatch(getUsers(users));
  }, [dispatch]);

  useEffect(() => {
    getUserData();
  }, [dispatch, getUserData]);

  const showAllUsers = allUsers.map((user) => <UserCard user={user} />);

  return (
    <div className="container">
      {allUsers.length ? showAllUsers : <h1>Loading...</h1>}
    </div>
  );
}
