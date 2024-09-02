// change background image or color depending on weather of current day
//give by-hour breakdown for each column of day
//Need to add the ability to perform a new search
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
    var months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];
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
                var megaString = "";
                for (let i = 0; i < json.days.length; i++){
                    var temperature = json.days[i].temp;
                    var weather = json.days[i].conditions;
                    var day = json.days[i].datetime.split('-');
                    megaString += 
                    `<div class='dayColumn'>
                        <h4>Conditions for ${months[parseInt(day[1])-1]} ${day[2]}, ${day[0]}</h4>
                        <h4>Primarily, the weather will be ${weather}. </h4>
                        <h4>The temperature will be ${temperature}°F. </h4>
                    </div>
                    `
                }
                document.getElementById('content').innerHTML =
                `
                <h1>${city}</h1>
                <div id='days'>
                    ${megaString}
                </div>
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
