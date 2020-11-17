import React, {useState, useEffect} from 'react';
import './FormContent.css';
import axios from "axios";
import { usePosition } from 'use-position';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Button, Table, Form, Icon, Image } from 'semantic-ui-react'


const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    title: {
      flexGrow: 2,
      alignContent: "center",
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: "30%",
      height: "5%",
      paddingTop: "8px",
      //paddingBottom: "8px",
      fontSize: 30,
      color: "white",
      fontfamily: "Open Sans",
      textAlign: "center",
    },
    table:{
      textAlign: "center",
      textAlign: "center",

    },
    content: {
      textAlign: "center",
      flexGrow: 2,
      fontSize: 20,
      backgroundColor: "white",
      fontfamily: "Open Sans",
      color: "blue", 
      textAlign: "center",
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
    const {
       latitude,
        longitude,
        speed,
        timestamp,
        accuracy,
        error,
      } = usePosition();

    const long = Math.round(longitude); 
    const lat = Math.round(latitude); 

    //const mylong = long.toString(); 
    //const mylat = lat.toString(); 
    
    
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [icon, setIcon] = useState();
    const [description, setDescription] = useState("");
    const [temp_min, setTemp_min] = useState("");
    const [temp_max, setTemp_max] = useState("");
    const [temp, setTemp] = useState("");

   


    const key = '754c84dda245d4975159e2096407f3a6';
    const [feels_like, setFeelsLike] = useState('');
    const [mainTemp,setMainTemp] = useState('');
    //const [description,setDescription] = useState('');
    const [main,setMain] = useState('');
    const [iconID,setIconID] = useState('');
    var url = 'https://api.openweathermap.org/data/2.5/weather?lat=' +latitude + '&lon=' +longitude + '&appid=' +key+ '&units=metric'; 
   

    const getWeather = async () => {

  
   
            const api_call = await axios.get(url);
            const response = await api_call;
            // console.log(response);
            // return response;
            setCity(response.data.name)
            setCountry(response.data.sys.country);
            setTemp(Math.round((response.data.main.temp * 1.8) + 32));
            setTemp_max(Math.round((response.data.main.temp_max * 1.8) +32 ));
            setTemp_min(Math.round((response.data.main.temp_min *1.8) +32));
            setDescription(response.data.weather[0].description);
            setIconID(response.data.weather[0].icon);
            console.log(response);

    }

    return (
        <main className={classes.fullWidth}>
        <div className={classes.toolbar} />
        <img className ={classes.centered} src={process.env.PUBLIC_URL + 'ella.jpeg'}/>
        <div className = {classes.table}> 
         <Button primary size = "huge" onClick={async() => {
                       getWeather(); 
                    
                }}> Get Weather 
          </Button>
          </div>
          <div className={classes.content}>
          <Table color= 'blue' key='blue' inverted >
            <Table.Header>
            <Table.HeaderCell ></Table.HeaderCell>
            <Table.HeaderCell ></Table.HeaderCell>
            </Table.Header>
    
            <Table.Body>
              <Table.Row>
                <Table.Cell>City</Table.Cell>
                <Table.Cell>{city}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Current Temperature</Table.Cell>
                <Table.Cell>{temp} °F</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>High</Table.Cell>
                <Table.Cell>{temp_max} °F</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Low</Table.Cell>
                <Table.Cell>{temp_min} °F</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Description</Table.Cell>
                <Table.Cell>{description}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
      </div>
          <div className = {classes.content}>
                < img src={"http://openweathermap.org/img/wn/" + iconID + "@2x.png"}
                />
        </div>

        </main>


    )
    

}
export default WeatherContent;



