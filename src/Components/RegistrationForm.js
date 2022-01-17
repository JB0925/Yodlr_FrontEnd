import React, { useState } from "react";
import "../CSS/RegistrationForm.css";

export default function RegistrationForm() {
  const initialFormState = {
    email: "",
    firstName: "",
    lastName: "",
  };

  const [formState, setFormState] = useState(initialFormState);
  const [errorMessage, setErrorMessage] = useState("");

  const submissionsAreLongEnough = () => {
    const submissions = Array.from(Object.values(formState));
    return submissions.every((submission) => submission.length >= 8);
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

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (acceptableSubmission()) {
      // POST request here
      // update global state
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
    </form>
  );
}
