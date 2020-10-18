<<<<<<< HEAD
//import React from 'react';
import React  from 'react';
//import logo from './logo.svg';
import './App.css';
import Home from './pages/Home'; 
=======
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Home from "./pages/Home"
import About from "./pages/About"
import SignUp from "./pages/SignUp"
>>>>>>> 11f81004affb60bc365ebf633d705909ffe97efa

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
