import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Home from "./pages/Home"
import About from "./pages/About"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Closet from "./pages/Closet"
import Profile from "./pages/Profile"
import Logout from "./pages/Logout"
import Matches from "./pages/Matches"
import Weather from "./pages/Weather"

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" ><Home /></Route>
        <Route path="/about"><About /></Route>
        <Route path="/signup"><SignUp /></Route>
        <Route path="/closet"><Closet /></Route>
        <Route path="/signin"><SignIn /></Route>
        <Route path="/profile"><Profile /></Route>
        <Route path="/matches"><Matches /></Route>
        <Route path="/weather"><Weather /></Route>
        <Route path="/logout"><Logout /></Route>
      </Switch>
    </Router>
  );
}

export default App;
