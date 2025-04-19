const weatherForm=document.querySelector(".WeatherForm");
const cityInput=document.querySelector(".cityInput");
const card=document.querySelector(".card");
const apikey="00f7bdc5941daeddacdbd2c648fad8be"
weatherForm.addEventListener("submit", async event=>{
event.preventDefault();

const city= cityInput.value;
if(city){
    try{
 const weatherData = await getWeatherData(city);
displayWeatherInfo(weatherData);

    }
catch(error){
console.error(error);
displayError(error);
}
}
else{
    displayError("Please enter city");
}

})
async function getWeatherData(city){
     const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response = await fetch(apiUrl);
    console.log(response);
    if(!response.ok){
       throw new Error("could not fetch weather data") ;
    }
  return await response.json() ;
    
}
function displayWeatherInfo(data){
    console.log(data);
    const{name : city ,main: {temp,humidity}, weather:[{description,id}]}=data;
    card.textContent="";
    card.style.display="flex";

    const cityDisplay = document.createElement("h1")
    const tempDisplay = document.createElement("p")
    const humidityDisplay = document.createElement("p")
    const descDisplay = document.createElement("p")
    const weatherEmoji = document.createElement("p")

    cityDisplay.textContent= city;
    tempDisplay.textContent= `${(temp -273.15).toFixed(2)}°c`;
    humidityDisplay.textContent= ` Humidity:${humidity}%`;
    descDisplay.textContent= description;
    weatherEmoji.textContent= getWeatherEmoji(id);
    

    cityDisplay.classList.add("cityDisplay");
    card.appendChild(cityDisplay);

    tempDisplay.classList.add("tempDisplay");
    card.appendChild(tempDisplay);
    
    humidityDisplay.classList.add("humidityDisplay");
    card.appendChild(humidityDisplay);

    descDisplay.classList.add("descDisplay");
    card.appendChild(descDisplay);

    weatherEmoji.classList.add("weatherEmoji");
    card.appendChild(weatherEmoji);
  
}
function getWeatherEmoji(weatherId) {
    if (weatherId >= 200 && weatherId < 300) {
        return "⛈"; // Orage
    } else if (weatherId >= 300 && weatherId < 500) {
        return "🌧"; // Bruine ou pluie légère
    } else if (weatherId >= 500 && weatherId < 600) {
        return "🌧"; // Pluie
    } else if (weatherId >= 600 && weatherId < 700) {
        return "❄"; // Neige
    } else if (weatherId >= 700 && weatherId < 800) {
        return "🌫"; // Brouillard ou brume
    } else if (weatherId === 800) {
        return "☀"; // Ciel dégagé
    } else if (weatherId >= 801 && weatherId < 810) {
        return "☁"; // Nuageux
    } else {
        return "❓"; // Inconnu
    }
}
    
function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent=message;
    errorDisplay.classList.add("errorDiplay");

    card.textContent ="";
    card.style.display="flex";
    card.appendChild(errorDisplay);
}
