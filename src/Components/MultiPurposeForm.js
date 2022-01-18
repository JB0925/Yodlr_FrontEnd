import React, { useState } from "react";
import YodlrApi from "../yodlrApi";
import { useUserContext } from "../useYodlrContext";
import happyPic from "../happy.png";
import { addUser, updateUser } from "../actionCreators";
import "../CSS/MultiPurposeForm.css";

/**
 * MultiPurposeForm
 *
 * This is a flexible form component, in that it has been somewhat customized
 * to handle user updates as well as adding new users.
 *
 * If the "user" prop is present, then the form is being used to update that
 * user by the admin. We already have a user and we want to update them.
 *
 * If not, it is a regular registration form used by a user. The user is
 * creating a new user for us by typing into the form inputs and submitting.
 *
 * The forms look the same and function the same, but call different API
 * endpoints, display different messages, and handle different events based
 * on whether or not the user prop is present.
 */
const MultiPurposeForm = ({ toggleFormDisplay, width = null, user = null }) => {
  const initialFormState = {
    email: "",
    firstName: "",
    lastName: "",
  };

  const [, dispatch] = useUserContext();
  const [potentialNewUser, setPotentialNewUser] = useState(initialFormState);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const submissionsAreLongEnough = () => {
    const submissions = Array.from(Object.values(potentialNewUser));
    return submissions.every((submission) => submission.length >= 1);
  };

  const isValidEmail = () => {
    const { email } = potentialNewUser;
    const pattern = /\S+@\S+\.\S+/;
    return pattern.test(email);
  };

  const acceptableSubmission = () => {
    return isValidEmail() && submissionsAreLongEnough();
  };

  const handleErrors = () => {
    if (!isValidEmail()) setErrorMessage("Please enter a valid email address.");
    if (!submissionsAreLongEnough())
      setErrorMessage(
        "One or more of your entries is less than eight characters long."
      );
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setPotentialNewUser((potentialNewUser) => ({
      ...potentialNewUser,
      [name]: value,
    }));
  };

  const determineTypeOfSubmissionAndDispatch = async () => {
    if (!user) {
      const newUser = await YodlrApi.createUser(potentialNewUser);
      dispatch(addUser(newUser));
    } else {
      const updatedUser = await YodlrApi.updateUser(user.id, potentialNewUser);
      dispatch(updateUser(updatedUser));
    }
  };

  const handleSuccessMessaging = () => {
    if (user) {
      setSuccessMessage("Successfully updated user!");
    } else {
      setSuccessMessage("Successfully registered!");
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (acceptableSubmission()) {
      await determineTypeOfSubmissionAndDispatch();
      handleSuccessMessaging();
      errorMessage && setErrorMessage("");
    } else {
      successMessage && setSuccessMessage("");
      handleErrors();
    }

    setPotentialNewUser(initialFormState);
    user && toggleFormDisplay();
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={user && { width, backgroundColor: "white", zIndex: "1" }}
    >
      <p className="updateMsg">
        {user && `Update user ${user.firstName} ${user.lastName}`}
      </p>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        placeholder="Enter your email address"
        id="email"
        name="email"
        value={potentialNewUser.email}
        onChange={handleChange}
        required
      />
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        placeholder="Enter your first name"
        id="firstName"
        name="firstName"
        value={potentialNewUser.firstName}
        onChange={handleChange}
        required
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        placeholder="Enter your last name"
        id="lastName"
        name="lastName"
        value={potentialNewUser.lastName}
        onChange={handleChange}
        required
      />
      {errorMessage.length ? <p className="error">{errorMessage}</p> : null}
      <button type="submit">Submit</button>
      {successMessage.length ? (
        <p className="success">{successMessage}</p>
      ) : null}
      <img src={happyPic} alt="happy" />
    </form>
  );
};

export default MultiPurposeForm;
