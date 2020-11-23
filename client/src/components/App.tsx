import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import "../App.css";
import Chat from "./Chat";
import Join from "./Join";

export default function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Join} />
          <Route exact path="/chat" component={Chat} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
}
