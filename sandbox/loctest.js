//this page will work with the other test file and will work...
'use strict';

//call function to get locatino
getGeoLocation();


var storage = window.localStorage;


//getlocation by longitude and laditude

function getGeoLocation(){

    const status = document.getElementById('status');
    status.innerHTML = 'Getting Location...';

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                const lat = position.coords.latitude;
                const long = position.coords.longitude;
            
                // Combine the values
                const locale = lat + "," + long;
                console.log(`Lat and Long are: ${locale}.`);

                // Call getLocation function, send locale
                getLocation(locale);

                //WERE ON THE GETLOCATION FUNCTION ACTIVITY
            
            
                })
            } else {
                status.innerHTML = "Your browser doesn't support Geolocation or it is not enabled!";
            } // end else



}
//end getGeoLocation
