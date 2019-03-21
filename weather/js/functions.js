/* *************************************
*  Weather Site JavaScript Functions
************************************* */
//function to fetch data

//From week 10 practice
                // Set global variable for custom header required by NWS API
                var idHeader = {
                    headers: {
                    "User-Agent": "Student Learning Project - gre18004@byui.edu"
                    }
                };


                var storage = window.localStorage;


//varibles for funtion use
const temp = 1;
const speed = 5;
// buildWC(speed, temp);

const direction = "E"; //Set your own value
windDial(direction);

const phrase = 'thunderstorm';
let condition = getCondition(phrase); //condition will be passed to the next function
let type = changeSummaryImage(getCondition(phrase));

//meters infor
let meters = 1400;
let feet = convertMeters(meters);
setElevation(feet)
console.log('Elevation: '+ feet + 'ft.');

//calculate windchill function---------works

                    function buildWC(speed, temp){
                        const feelTemp = document.getElementById('feelTemp');

                        // Compute the windchill
                        let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
                        console.log(wc);

                        // Round the answer down to integer
                        wc = Math.floor(wc);

                        // If chill is greater than temp, return the temp
                        wc = (wc > temp)?temp:wc;

                        // Display the windchill
                        console.log(wc);
                        wc = 'Feels like ' + wc + '&deg;F';
                        return wc;
                    }

// Wind Dial Function-------works
                        function windDial(direction){
    // Get the container
    const dial = document.getElementById("dial");
    console.log(direction);
    // Determine the dial class
    switch (direction){
     case "North":
     case "N":
      dial.setAttribute("class", "n"); //"n" is the CSS rule selector
      break;
     case "NE":
     case "NNE":
     case "ENE":
      dial.setAttribute("class", "ne");
      break;
     case "NW":
     case "NNW":
     case "WNW":
      dial.setAttribute("class", "nw");
      break;
     case "South":
     case "S":
      dial.setAttribute("class", "s");
      break;
     case "SE":
     case "SSE":
     case "ESE":
      dial.setAttribute("class", "se");
      break;
     case "SW":
     case "SSW":
     case "WSW":
      dial.setAttribute("class", "sw");
      break;
     case "East":
     case "E":
      dial.setAttribute("class", "e");
      break;
     case "West":
     case "W":
      dial.setAttribute("class", "w");
      break;
    }
                         }


//calculate meter function-------works
function convertMeters(meters){
    let feet = meters * 3.2804;
    feet = Math.round(feet);
    return feet;
}
//will set page elevation--------works
function setElevation(feet){
    document.getElementById('elevation').innerHTML = feet+'ft.';
    }

//image function
//make sure name changes as well

function getCondition(phrase) {
    console.log( 'condition is '+ phrase);
    let condition = ""

    if(phrase.includes('cloud')||phrase.includes('overcast')||phrase.includes('Cloud')){
        condition = 'cloud';
        return condition ;}
    else if(phrase.includes('rain')||phrase.includes('wet')||phrase.includes('Rain')||phrase.includes('Thunderstorm')||phrase.includes('Thunderstorms')){
        condition = 'rain';
        return condition ;}
    else if(phrase.includes('fog')||phrase.includes('haze')||phrase.includes('Fog')||phrase.includes('mist')){
        condition = 'fog';
        return condition ;}
    else if(phrase.includes('snow')||phrase.includes('blizzard')||phrase.includes('snow')||phrase.includes('sleet')){
        condition = 'snow';
        return condition ;}
    else{
        condition = 'clear';
        return condition
         ;}                
    }
//next function will take from the return value one of the five

//sum image function (weather type)

function changeSummaryImage(phrase){

    document.getElementById('sumImg').setAttribute('class' , phrase);
    document.getElementById('box').setAttribute('class' , phrase);
    document.getElementById('weatherType').innerHTML = phrase;

}

//convert time to 12 hour format
function time_format(hour){
    if(hour>23){
        hour -= 24;
    }
    let amPm = (hour > 11) ? 'pm': 'am';
        if(hour> 12){
            hour-= 12;
        }
    if(hour == 0){
        hour ='12';
    }
    return hour + amPm;

}

//Build the Hourly tempature list
// Build the hourly temperature list
function buildHourlyData(nextHour,hourlyTemps) {
    // Data comes from a JavaScript object of hourly temp name - value pairs
    // Next hour should have a value between 0-23
    // The hourlyTemps variable holds an array of temperatures
    // Line 8 builds a list item showing the time for the next hour 
    // and then the first element (value in index 0) from the hourly temps array
    let hourlyListItems = '<li>' + time_format(nextHour) + ': ' + hourlyTemps[0] + '&deg;F</li>' + " | ";
    // Build the remaining list items using a for loop
    for (let i = 1, x = hourlyTemps.length; i < x; i++) {
        hourlyListItems += '<li>' + time_format(nextHour+i) + ': ' + hourlyTemps[i] + '&deg;F</li>' + " | ";
    }
    console.log('HourlyList is: ' +hourlyListItems);
    return hourlyListItems;
    }

  
    // Gets location information from the NWS API
    function getLocation(locale) {
        const URL = "https://api.weather.gov/points/" + locale; 
        // NWS User-Agent header (built above) will be the second parameter 

        fetch(URL, idHeader) 
        .then(function(response){
        if(response.ok){ 
        return response.json(); 
        } 
        throw new ERROR('Response not OK.');
        })
        .then(function (data) { 
        // Let's see what we got back
        console.log('Json object from getLocation function:'); 
        console.log(data);
        // Store data to localstorage 
        storage.setItem("locName", data.properties.relativeLocation.properties.city); 
        storage.setItem("locState", data.properties.relativeLocation.properties.state);
       // Get link to hourly data
       let hourlyLink = data.properties.forecastHourly;
       console.log('Hourly data');
       console.log(hourlyLink);
       getHourly(hourlyLink);

       // Get link to forecast
       let forecastURL = data.properties.forecast;
       getForecast(forecastURL);
    
        // Next, get the weather station ID before requesting current conditions 
        // URL for station list is in the data object 
        let stationsURL = data.properties.observationStations; 
        getStationId(stationsURL); 
    }) 
    .catch(error => console.log('There was a getLocation error: ', error)) 
} // end getLocation function


     


// Gets weather station list and the nearest weather station ID from the NWS API
function getStationId(stationsURL) { 
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(stationsURL, idHeader) 
    .then(function(response){
    if(response.ok){ 
    return response.json(); 
    } 
    throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
    // Let's see what we got back
    console.log('From getStationId function:'); 
    console.log(data);
    
    // Store station ID and elevation (in meters - will need to be converted to feet) 
    let stationId = data.features[0].properties.stationIdentifier; 
    let stationElevation = data.features[0].properties.elevation.value; 
    console.log('Station and Elevation are: ' + stationId, stationElevation); 

    // Store data to localstorage 
    storage.setItem("stationId", stationId); 
    storage.setItem("stationElevation", stationElevation); 

    // Request the Current Weather for this station 
    getWeather(stationId);
    }) 
    .catch(error => console.log('There was a getStationId error: ', error)) 
} // end getStationId function


// Gets current weather information for a specific weather station from the NWS API
function getWeather(stationId) { 
    // This is the URL for current observation data 
    const URL = 'https://api.weather.gov/stations/' + stationId + '/observations/latest';
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(URL, idHeader) 
    .then(function(response){
    if(response.ok){ 
    return response.json(); 
    } 
    throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
    // Let's see what we got back
    console.log('From getWeather function:'); 
    console.log(data);
    
    // Store weather information to localStorage 
    let temperature = data.properties.temperature.value;
        let curWeather = data.properties.textDescription;
        let windGust = data.properties.windGust.value;
        //set to local
        storage.setItem("temperature", temperature);
        storage.setItem("curWeather", curWeather);
        storage.setItem("windGust", windGust);
  
    
    }) 
    .catch(error => console.log('There was a getWeather error: ', error)) 
} // end getWeather function



//start getHourly function--------SHOULD BE DONE
function getHourly(hourlyLink){
    fetch(hourlyLink)
    .then(function(response){
        if(response.ok){
            return response.json();
        }
        throw new error('Response not Ok.')
    })
    .then(function(data) {
        //check
        console.log('json object from getHourly function');
        console.log(data);
        //get Hourly info
        let hourly = [];
        for (let i = 0; i<13; i++){
            hourly[i] = data.properties.periods[i].temperature;
        }
        // Get information
        let windDirection = data.properties.periods[0].windDirection;
        let windSpeed = data.properties.periods[0].windSpeed;
        let temperature = data.properties.periods[0].temperature;

        // move to Local Storage
        storage.setItem("hourly", hourly);
        storage.setItem("windDirection", windDirection);
        storage.setItem("windSpeed", windSpeed);
        storage.setItem("temperature", temperature);
    })
    .catch(error => console.log("There was a getHourly error: ", error))
}
//End getHourly Function

//Start getForecast
                        function getForecast(forecastURL){
                            fetch(forecastURL)
                            .then(function(response){
                                if(response.ok){
                                    return response.json();
                                }
                                throw new Error("Response not OK.");
                            })
                            .then(function(data) {
                                // Check 
                                console.log("Object from getForecast function: ");
                                console.log(data);

                                // Store Forecast information
                                let high = data.properties.periods[0].temperature;
                                let low = data.properties.periods[1].temperature;
                                let icon = data.properties.periods[0].icon;
                                let detailedForecast = data.properties.periods[0].detailedForecast;

                                // Local storage
                                storage.setItem("high", high);
                                storage.setItem("low", low);
                                storage.setItem("icon", icon);
                                storage.setItem("detailedForecast", detailedForecast);
                            })
                            .catch(error => console.log("There was a getForecast error: ", error))
                        }

buildPage();

// Populate the current location weather page
                    function buildPage(){
                        //set Head section title-----SHOULD BE DONE
                            let pageTitle = document.getElementById('pageTitle');
                            let fullName = storage.getItem('locName') +','+storage.getItem('locState');
                            let fullNameNode = document.createTextNode(fullName);
                        //insert to page----SHOULD BE DONE
                            pageTitle.insertBefore(fullNameNode,pageTitle.childNodes[0]);
                            document.getElementById('locName').innerHTML = fullName;
                        //WInd DIal/speed/direction-----SHOULD BE DONE
                            let gust = storage.getItem('windGust');
                            document.getElementById('gusts').innerHTML = gust;
                            let windS = storage.getItem('windSpeed');
                            document.getElementById('windx').innerHTML = windS;
                            let windD = storage.getItem('windDirection');
                            document.getElementById('diret').innerHTML = windD;
                            windDial(windD);
                        //Cur WEather Section------ SHOULD BE DONE
                        let curW= storage.getItem('curWeather');
                        let cond = getCondition(curW);
                                        console.log('Curent Weather Condidtion is:');
                                        console.log(getCondition(curW));
                        changeSummaryImage(cond);

                        //Temps------ SHOULD BE DONE

                        let temp = storage.getItem('temperature');
                        tempR =Math.round((convertToFahrenheit(temp))); 
                        document.getElementById('temp').innerHTML= tempR + '&#176;' +'F';

                        let low = storage.getItem('low');
                        document.getElementById('low').innerHTML = low+ '&#176;' +'F';

                        let high = storage.getItem('high');
                        document.getElementById('high').innerHTML = high+ '&#176;' +'F';


                        //Meters to Feet ---SHOULD BE DONE
                            let eleva = storage.getItem('stationElevation');
                            convertMeters(eleva);
                            console.log('Converted Elevation is:')
                            console.log(convertMeters(eleva));
                            document.getElementById('elevation').innerHTML = convertMeters(eleva)+ ' ft.';
                        //Hourly temps-----SHOULD BE GOOOOOOOOOOOD
                        let date = new Date();
                        let nextHour = date.getHours() + 1;
                        let hourlyData = storage.getItem('hourly');
                        hourlyUL.innerHTML = (nextHour, hourlyData);
                        console.log(hourlyUL.innerHTML = (nextHour, hourlyData));

                        //WindCHill-------SHOULD BE GOOD
                        let speed = storage.getItem('windSpeed');
                       // ALready done above----- let temp = storage.getItem('temperature');
                       let ws = speed.charAt(0);
                        document.getElementById("feelTemp").innerHTML = buildWC(ws, tempR);

                        //Latitude and Long----------SHOULD BO GOOOD
                        let lat = storage.getItem('latitude');
                        let long = storage.getItem('longitude');
                        //sets up values for the directions
                        let latC ='';
                        let longC= '';
                        //rounds the lat and long
                        lat =Math.round(lat*100)/100;
                        long =Math.round(long*100)/100;

                        //getting N or s/ e or w
                        if(Math.sign(lat) == 1){
                            latC = "&deg;N, "
                        }
                        else{latC = '&deg;S '}
                        if(Math.sign(long) == 1){
                            longC = '&deg;E '
                        }
                        else{ longC = '&deg;W '}

                        document.getElementById('latLong').innerHTML = lat +latC+', ' +long +longC;
                        //convert to F ---done within each function..... This is to show I know what I am doing....
                        function convertToFahrenheit(c){
                            let f = c * (9/5) + 32;
                            return f;
                        }
                        mainContent.setAttribute('class', ''); // removes the hide class
                        statusMessage.setAttribute('class', 'hide'); // hides the status container
                    }
