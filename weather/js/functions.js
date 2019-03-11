/* *************************************
*  Weather Site JavaScript Functions
************************************* */
//function to fetch data



//varibles for funtion use
const temp = 1;
const speed = 5;
buildWC(speed, temp);

const direction = "E"; //Set your own value
windDial(direction);

const phrase = 'thunderstorm';
let condition = getCondition(phrase); //condition will be passed to the next function
let type = changeSummaryImage(getCondition(phrase));



//getting phrase

            // function getPhrase(input){
            //     let direction = 

            //     reutrn direction;
            // }



//meters infor
let meters = 1400;
let feet = convertMeters(meters);
setElevation(feet)
console.log('Elevation: '+ feet + 'ft.');

//calculate windchill function---------works

                        function buildWC(speed, temp){
                        //input
                        const feelTemp = document.getElementById('feelTemp');

                        // Compute the windchill
                        let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
                        console.log(wc);

                        // Round the answer down to integer
                        wc = Math.floor(wc);

                        // If chill is greater than temp, return the temp
                        wc = (wc > temp)?temp:wc;

                        
                        // wc = 'Feels like '+wc+'°F';
                        feelTemp.innerHTML = wc;

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
    document.getElementById('summary').setAttribute('class' , phrase);
    document.getElementById('weatherType').innerHTML = phrase;

}

// Get the next hour based on the current time
// let date = new Date();
//     let nextHour = date.getHours() + 1;
//     scroll.innerHTML = buildHourlyData(nextHour, hourlyData);

// //convert time to 12 hour format
// function format_time(hour){
//     if(hour>23){
//         hour -= 24;
//     }
//     let amPm = (hour > 11) ? 'pm': 'am';
//         if(hour> 12){
//             hour-= 12;
//         }
//     if(hour == 0){
//         hour ='12';
//     }
//     return Hour + amPm;

// }

// //Build the Hourly tempature list
// // Build the hourly temperature list
// function buildHourlyData(nextHour,hourlyTemps) {
//     // Data comes from a JavaScript object of hourly temp name - value pairs
//     // Next hour should have a value between 0-23
//     // The hourlyTemps variable holds an array of temperatures
//     // Line 8 builds a list item showing the time for the next hour 
//     // and then the first element (value in index 0) from the hourly temps array
//     let hourlyListItems = '<li>' + time_format(nextHour) + ': ' + hourlyTemps[0] + '&deg;F</li>' + " | ";
//     // Build the remaining list items using a for loop
//     for (let i = 1, x = hourlyTemps.length; i < x; i++) {
//         hourlyListItems += '<li>' + time_format(nextHour+i) + ': ' + hourlyTemps[i] + '&deg;F</li>' + " | ";
//     }
//     console.log('HourlyList is: ' +hourlyListItems);
//     return hourlyListItems;
//     }
// // Get the next hour based on the current time
  