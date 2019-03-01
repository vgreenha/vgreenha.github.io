/* *************************************
*  Weather Site JavaScript Functions
************************************* */
//varibles for funtion use

const temp = 31;
const speed = 5;
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

//calculate meter function

function getCondition(phrase) {
    // have for each possible one
    if(phrase.includes('cloud')||phrase.includes('overcast')||'Cloud'){
        return "clouds";
    }

}
//next function will take from the retunr value one of the five