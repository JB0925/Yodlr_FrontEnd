import React from "react";
import "../CSS/RegistrationPage.css";
import RegistrationForm from "./RegistrationForm";

export default function RegistrationPage() {
  return (
    <div className="RegistrationPage">
      <div className="RegistrationPage-msg">
        <p className="msg-sm">Ready to yodel?</p>
        <p className="msg-lg">Welcome to Yodlr!</p>
        <p className="msg-md">Sign up today.</p>
      </div>
      <RegistrationForm />
    </div>
  );
}
