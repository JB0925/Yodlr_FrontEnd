import React, { useRef } from "react";
import userPhoto from "../blank-avatar.png";
import MultiPurposeForm from "./MultiPurposeForm";

// The card that shows the user's data and "photo"
// Also has a hidden form that, when the "update" button
// is clicked, displays a form that will update that user.
export default function UserCard({ user }) {
  const formRef = useRef();

  const toggleFormDisplay = () => {
    formRef.current.classList.toggle("form-show");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="hide" data-testid="sidebar" ref={formRef}>
        <i
          id="closeBtn"
          className="fas fa-window-close"
          onClick={toggleFormDisplay}
        ></i>
        <MultiPurposeForm
          toggleFormDisplay={toggleFormDisplay}
          width="50%"
          user={user}
        />
      </div>
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
          <button type="button" onClick={toggleFormDisplay}>
            Update
          </button>
        </div>
      </div>
    </>
  );
}
