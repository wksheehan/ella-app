//import React from 'react';
import React, {useState, useEffect, Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Home from './pages/Home'; 

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);
  return <Home />;
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
