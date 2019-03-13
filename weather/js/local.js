'use strict'



let pageNav = document.getElementById('page-nav');
let statusContainer = document.getElementById('status');
let contentContainer = document.getElementById('main-content');


let weatherURL = "/weather/js/weather.json";

fetchData(weatherURL);

function fetchData(weatherURL){
  let cityName = 'Greenville'; // The data we want from the weather.json file
  fetch(weatherURL)
  .then(function(response) {
  if(response.ok){
  return response.json();
  }
  throw new ERROR('Network response was not OK.');
  })
  .then(function(data){
    // Check the data object that was retrieved
    console.log(data);
    // data is the full JavaScript object, but we only want the greenville part
    // shorten the variable and focus only on the data we want to reduce typing
    let g = data[cityName];

    // ************ Get the content ******************************

    // Get the location data
    let locName = g.City;
    let locState = g.State;
    // Put them together
    let fullName = locName+', '+locState;
    // See if it worked
    console.log('fullName is: '+fullName);

    // Get the temperature data
        let temp = g.Temp;
        let high = g.High;
        let low = g.Low;
        

    // Get the wind data 
        let wind = g.Wind;
        let gusts = g.Gusts;
        let direction = g.Direction;
    // Get the current conditions
        let condit = g.Summary;

    // Get the hourly data 
      let hourly = g.Hourly;

    // ************ Display the content ******************************
    // Set the title with the location name at the first
    // Gets the title element so it can be worked with
    let pageTitle = document.getElementById('pageTitle');
    // Create a text node containing the full name 
    let fullNameNode = document.createTextNode(fullName);
    // inserts the fullName value before any other content that might exist
    pageTitle.insertBefore(fullNameNode, pageTitle.childNodes[0]);
    // When this is done the title should look something like this:
    // Greenville, SC | The Weather Site

    // Set the Location information
    // Get the h1 to display the city location
                      let contentHeading = document.getElementById('locName');
                      contentHeading.innerHTML = fullName;
    // The h1 in main h1 should now say "Greenville, SC"


    // Set the temperature information
                      document.getElementById('temp').innerHTML= temp;
                      document.getElementById('high').innerHTML= "High: "+high;
                      document.getElementById('low').innerHTML= 'Low: '+low;
    // Set the wind information
                        let windx= wind + ' mph';
                      document.getElementById('windx').innerHTML= windx;
                      document.getElementById('gusts').innerHTML= "Gusts: " + gusts;
                      document.getElementById('diret').innerHTML= 'Direction: ' + direction;


   // Compute the windchill
                  let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(wind, 0.16) + 0.4275 * temp * Math.pow(wind, 0.16);
                  console.log(wc);
                        //Round Windchill
                        wc = Math.floor(wc);
                        //if chill is greater the temp, return the temp
                        wc = (wc > temp)?temp:wc;
                        // Display the windchill in console
                        console.log(wc);
                        //Display on page
                        document.getElementById('feelTemp').innerHTML = wc;


    //wind dial function
             windDial(direction);

    // Set the current conditions information  
    let wet = getCondition(condit);
            console.log(getCondition(condit));
                          changeSummaryImage(wet);

    

    // Set the hourly temperature information
    let date = new Date();
    let nextHour = date.getHours() + 1;
    hourlyUL.innerHTML = buildHourlyData(nextHour, hourly);         


    // Change the status of the containers
    mainContent.setAttribute('class', ''); // removes the hide class
    statusMessage.setAttribute('class', 'hide'); // hides the status container
  })
  .catch(function(error){
  console.log('There was a fetch problem: ', error.message);
  statusContainer.innerHTML = 'Sorry, the data could not be processed.';
  })
}
