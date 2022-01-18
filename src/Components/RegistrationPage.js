import React from "react";
import "../CSS/RegistrationPage.css";
import MultiPurposeForm from "./MultiPurposeForm";

/**
 * RegistrationPage
 *
 * Used to register new users. Contains
 * a message welcoming new users to Yodlr
 * and the MultiPurposeForm which, in this case,
 * has no props passed to it because it is only
 * being used for registration.
 */
export default function RegistrationPage() {
  return (
    <div className="RegistrationPage">
      <div className="RegistrationPage-msg">
        <p className="msg-sm">Ready to yodel?</p>
        <p className="msg-lg">Welcome to Yodlr!</p>
        <p className="msg-md">Sign up today.</p>
      </div>
      <MultiPurposeForm />
    </div>
  );
}
