// make screen darker during nighttime //Less Feasible
// change background image or color depending on weather of current day
// offer fahrenheit and celsius  //Unneccessary but doable
// cookies for reacent weahter options and recent searches //unlikely
// if you click enter, search weather
//give an array if times and days
function changeStyleForWeather(weather,temperature,celOrFahr,timeOfDay){
    //change the style of the screen based on above params
}
async function readCity(){
    //get city
    var city = document.getElementById('cityName').value;
    if (!city) {
        alert("Please enter a valid city name.");
        window.location.reload();
    }
    //contact the api
    const date = new Date();
    var today = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`; //need yyyy-mm-dd
    date.setDate(date.getDate()+4);
    var later = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    var apiURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${today}/${later}?key=${fL.API_KEY}`;
    // Example    https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK/2020-10-01/2020-12-31?key=YOUR_API_KEY
    // console.log(apiURL); 
    await fetch(apiURL)
      .then(response => {
        if (response.status === 400){
            alert("Please enter a valid city name.");
            window.location.reload(); 
        }else{
            response.json().then(json => {
                console.log(json.days);
                var temperature = json.days[0].temp;
                var weather = json.days[0].conditions;
                var celOrFahr = "Fahrenheit" //FIX THIS
                var timeOfDay = "10:00PM"; //FIX THIS
                document.getElementById('content').innerHTML =
                `
                <h1>${city}</h1>
                <h4>It is currently ${timeOfDay} in ${city}.</h4>
                <h4>The weather right now is ${weather}. </h4>
                <h4>The temperature is ${temperature}° ${celOrFahr}. </h4>
                `;
            }).catch(error => {
                console.log(error);
                return false;     
            });
        }
      }).catch(error => {
        console.log(error);
        return false;
      })
}

//ADDING SCRIPTS TO THE HTML
document.getElementById('submitButton').addEventListener("click",function(){
    readCity();
})
