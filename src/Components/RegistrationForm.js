import React, { useState } from "react";
import YodlrApi from "../yodlrApi";
import { useUserContext } from "../useYodlrContext";
import "../CSS/RegistrationForm.css";
import happyPic from "../happy.png";

export default function RegistrationForm() {
  const initialFormState = {
    email: "",
    firstName: "",
    lastName: "",
  };

  const [, dispatch] = useUserContext();
  const [formState, setFormState] = useState(initialFormState);
  const [errorMessage, setErrorMessage] = useState("");

  const submissionsAreLongEnough = () => {
    const submissions = Array.from(Object.values(formState));
    return submissions.every((submission) => submission.length >= 1);
  };

  const isValidEmail = () => {
    const { email } = formState;
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
    setFormState((formState) => ({
      ...formState,
      [name]: value,
    }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (acceptableSubmission()) {
      const result = await YodlrApi.createUser(formState);
      dispatch({
        type: "add user",
        payload: result,
      });
      errorMessage && setErrorMessage("");
    } else {
      handleErrors();
    }

    setFormState(initialFormState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        placeholder="Enter your email address"
        id="email"
        name="email"
        value={formState.email}
        onChange={handleChange}
        required
      />
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        placeholder="Enter your first name"
        id="firstName"
        name="firstName"
        value={formState.firstName}
        onChange={handleChange}
        required
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        placeholder="Enter your last name"
        id="lastName"
        name="lastName"
        value={formState.lastName}
        onChange={handleChange}
        required
      />
      {errorMessage.length ? <p>{errorMessage}</p> : null}
      <button type="submit">Submit</button>
      <img src={happyPic} alt="happy" />
    </form>
  );
}
