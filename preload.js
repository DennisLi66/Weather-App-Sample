const { contextBridge } = require('electron');
const yaml = require('js-yaml');
const fs = require('fs');

var API_KEY;
try {
    // const doc = fL.load();
    const doc = yaml.load(fs.readFileSync('conf.yaml'));
    // console.log(doc.API_KEY);
    API_KEY = doc.API_KEY;
  } catch (e) {
    console.log(e);
  }

contextBridge.exposeInMainWorld('fL', {
  contactWeatherAPI: (location,startDate,endDate)=>{
    const date = new Date();
    //need yyyy-mm-dd
    var today = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    date.setDate(date.getDate()+4);
    var later = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    var apiURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${today}/${later}?key=${API_KEY}`;
    // Example    https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK/2020-10-01/2020-12-31?key=YOUR_API_KEY
    // console.log(apiURL); 
    fetch(apiURL)
      .then(response => {
        console.log(response.json());
        return response.json();
      })
      .catch(error => {
        console.log(error);
        return false;
      })
  }
})