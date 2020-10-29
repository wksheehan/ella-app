
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Home from "./pages/Home"
import About from "./pages/About"
import SignUp from "./pages/SignUp"
import Closet from "./pages/Closet"

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" ><Home /></Route>
        <Route path="/about"><About /></Route>
        <Route path="/signup"><SignUp /></Route>
        <Route path="/closet"><Closet /></Route>
      </Switch>
    </Router>
  );
}

//class App extends Component {
  //render() {
    //return (
      //<div classname="container">
        //<h1>Ella App </h1>
        //<p>Your closet simplified</p>
      //</div>
   // );
 // }/
//}


export default App;
