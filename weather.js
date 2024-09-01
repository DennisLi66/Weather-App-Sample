    // make screen darker during nighttime
    // change background image or color depending on current weather or selected weather
    // offer fahrenheit and celsius 
    // cookies for reacent weahter options and recent searches
    // if you click enter, search weather
    //throw error if name of city bad
    //git ignore should hide key
    //give an array if times and days
    function changeStyleForWeather(weather,temperature,celOrFahr,timeOfDay){
        //change the style of the screen based on above params
    }
    function readCity(){
        //get city
        var city = document.getElementById('cityName').value;
        if (!city) {
            alert("Please enter a city name.");
            window.location.reload();
        }
        //contact the api
        var temperature = 50; //FIX THIS
        var weather = "sunny";
        var celOrFahr = "Celsius"
        var timeOfDay = "10:00PM";
        document.getElementById('content').innerHTML =
        `
        <h1>${city}</h1>
        <h4>It is currently ${timeOfDay} in ${city}.</h4>
        <h4>The weather right now is ${weather}. </h4>
        <h4>The temperature is ${temperature}° ${celOrFahr}. </h4>
        `;
    }












    //ADDING SCRIPTS TO THE HTML
    document.getElementById('submitButton').addEventListener("click",function(){
        readCity();
    })