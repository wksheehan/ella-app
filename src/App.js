import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Home from "./pages/Home"
import About from "./pages/About"
import SignUp from "./pages/SignUp"

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" ><Home /></Route>
        <Route path="/about"><About /></Route>
        <Route path="/signup"><SignUp /></Route>
      </Switch>
    </Router>
  );
}

export default App;
