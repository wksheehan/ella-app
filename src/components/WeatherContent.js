import React, {useState, useEffect} from 'react';
import './FormContent.css';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Form, Input, Button } from 'semantic-ui-react';


const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    title: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
      fontSize: 30,
      textAlign: "center",
    },
    content: {
      textAlign: "center",
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    fullWidth: {
      width: '100%',
    },
    labels: {
      alignContent: "center",
      textAlign: "center",
      marginLeft: 10,
      marginBottom: 10,
      display: 'block',
    },
    inputs: {
      margin: "auto",
      alignContent: "center",
      textAlign: "center",
      marginBottom: 10,
      display: 'block',
    },
    cancelbtn:{
      fontSize: 20,
      marginLeft: 300,
      marginRight: 20,
  
    },
    centered: {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }));
  

function WeatherContent() {
    const classes = useStyles();
  //const city = 'Durham'; 
    //const country = 'USA';
    const key = '754c84dda245d4975159e2096407f3a6';
    const [feels_like, setFeelsLike] = useState('');
    const[city, setCity] = useState(''); 
    const[country, setCountry] = useState(''); 
    const [mainTemp,setMainTemp] = useState('');
    const [description,setDescription] = useState('');
    const [main,setMain] = useState('');
    const [iconID,setIconID] = useState('');
    useEffect(()=> {
fetch('https://api.openweathermap.org/data/2.5/weather?id=4464374&APPID=' +key+ '&units=metric')
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        setFeelsLike(Math.round(data.main.feels_like * 1.8 + 32));
        setMainTemp(Math.round(data.main.temp * 1.8 + 32));
        setCity(data.main.location); 
        //data.main.temp * 1.8 + 32
        setDescription(data.weather[0].description);
        setMain(data.weather[0].main);
        setIconID(data.weather[0].icon);
        })
        },[])
return (
    <main className={classes.fullWidth}>
    <div className={classes.toolbar} />
    <img className ={classes.centered} src={process.env.PUBLIC_URL + 'ella.jpeg'}/>
    <div className={classes.content}>
    <div className = {classes.content}>
            Location: Durham, NC
        </div>
        <div className = {classes.content}>
             Main Temperature :  {mainTemp} Degrees Farenheight 
        </div>
        <div className = {classes.content}>
            Feels like: {feels_like} Degrees Farenheit
        </div>
        <div className = {classes.content}>
                Weather Parameter: {main} 
        </div>
        <div className = {classes.content}>
            Description : {description}
        </div>
        <div className = {classes.content}>
            < img src={"http://openweathermap.org/img/wn/" + iconID + "@2x.png"}/>
        </div>

    </div>
    </main>

)
}
export default WeatherContent;



