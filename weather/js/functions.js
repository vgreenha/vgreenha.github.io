/* *************************************
*  Weather Site JavaScript Functions
************************************* */
//varibles for funtion use

const temp = 31;
const speed = 5;

const direction ='NNE'; //set your own value
windDial(direction);

// phrase //from page
buildWC(speed, temp);

// let condition = getCondition(phrase); //condition will be passed to the next function

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

//Wind Dial Function

function windDial(direction){
    //get the dial container

    const dial= document.getElementById('dial');
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

function getCondition(phrase) {
    // have for each possible one
    if(phrase.includes('cloud')||phrase.includes('overcast')||'Cloud'){
        return "clouds";
    }

}
//next function will take from the retunr value one of the five