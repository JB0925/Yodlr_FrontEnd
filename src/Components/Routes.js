import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Admin from "./Admin";
import RegistrationPage from "./RegistrationPage";

// The React Router and routes for the app.
export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <RegistrationPage />
      </Route>
      <Route exact path="/admin">
        <Admin />
      </Route>
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}
