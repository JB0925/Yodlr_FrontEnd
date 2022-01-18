import React from "react";
import userPhoto from "../blank-avatar.png";

export default function UserCard({
  firstName,
  lastName,
  email,
  state,
  id,
  updateUser,
}) {
  return (
    <div className="user-block">
      <div className="user-photo">
        <img src={userPhoto} alt={`${firstName} ${lastName}`} />
      </div>
      <div className="user-info">
        <ul>
          <li>{firstName}</li>
          <li>{lastName}</li>
          <li>{email}</li>
          <li>{state}</li>
        </ul>
        <button type="button" onClick={(evt) => updateUser(id, state)}>
          Update
        </button>
      </div>
    </div>
  );
}
