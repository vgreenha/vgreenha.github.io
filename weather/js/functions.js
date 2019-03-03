/* *************************************
*  Weather Site JavaScript Functions
************************************* */
//varibles for funtion use
const temp = 31;
const speed = 5;
buildWC(speed, temp);

const direction = "SE"; //Set your own value
windDial(direction);

const phrase = 'snow';
let condition = getCondition(phrase); //condition will be passed to the next function
let type = changeSummaryImage(condition);

//meters infor
let meters = 1400;
let feet = convertMeters(meters);
setElevation(feet)
console.log('Elevation: '+ feet + 'ft.');

//calculate windchill function

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

                        // Display the windchill
                        console.log(wc);
                        // wc = 'Feels like '+wc+'°F';
                        feelTemp.innerHTML = wc;

                        }

// Wind Dial Function
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


//calculate meter function
function convertMeters(meters){
    let feet = meters * 3.2804;
    feet = Math.round(feet);
    return feet;
}
//will set page elevation
function setElevation(feet){
    document.getElementById('elevation').innerHTML = feet+'ft.';
    }

//image function

function getCondition(phrase) {
    console.log( 'condition is '+ phrase);
    let condition = ""

    // have for each possible one

    if(phrase.includes('cloud')||phrase.includes('overcast')||phrase.includes('Cloud')){
        condition = 'cloud';
        return condition ;}
    else if(phrase.includes('rain')||phrase.includes('wet')||phrase.includes('Rain')){
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
//next function will take from the retunr value one of the five

//sum image function (weather type)

function changeSummaryImage(condition){

    document.getElementById('sumImg').setAttribute('class' , condition);
     


}