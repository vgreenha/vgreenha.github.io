//this page will work with the other test file and will work...
'use strict';


// // Set global variable for custom header required by NWS API
//             var idHeader = {
//                 headers: {
//                 "User-Agent": "Student Learning Project - gre18004@byui.edu"
//                 }
//             };

            
//call function to get locatino
getGeoLocation();


// var storage = window.localStorage;


//getlocation by longitude and laditude

            function getGeoLocation(){

                const status = document.getElementById('statusMessage');
                statusMessage.innerHTML = 'Getting Location...';

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
                            statusMessage.innerHTML = "Your browser doesn't support Geolocation or it is not enabled!";
                        } // end else



}
//end getGeoLocation

//moved to function.js

                        // // Gets location information from the NWS API
                        //             function getLocation(locale) {
                        //                         const URL = "https://api.weather.gov/points/" + locale; 
                        //                         // NWS User-Agent header (built above) will be the second parameter 
                        //                         fetch(URL, idHeader) 
                        //                         .then(function(response){
                        //                         if(response.ok){ 
                        //                         return response.json(); 
                        //                         } 
                        //                         throw new ERROR('Response not OK.');
                        //                         })
                        //                         .then(function (data) { 
                        //                         // Let's see what we got back
                        //                         console.log('Json object from getLocation function:'); 
                        //                         console.log(data);
                        //                         // Store data to localstorage 
                        //                         storage.setItem("locName", data.properties.relativeLocation.properties.city); 
                        //                         storage.setItem("locState", data.properties.relativeLocation.properties.state); 
                                            
                        //                         // Next, get the weather station ID before requesting current conditions 
                        //                         // URL for station list is in the data object 
                        //                         let stationsURL = data.properties.observationStations; 
                        //                         // Call the function to get the list of weather stations
                        //             getStationId(stationsURL); 
                        //                         }) 
                        //                         .catch(error => console.log('There was a getLocation error: ', error)) 
                        //    } // end getLocation function

                        //    // Gets weather station list and the nearest weather station ID from the NWS API
                        //                 function getStationId(stationsURL) { 
                        //                             // NWS User-Agent header (built above) will be the second parameter 
                        //                             fetch(stationsURL, idHeader) 
                        //                             .then(function(response){
                        //                             if(response.ok){ 
                        //                             return response.json(); 
                        //                             } 
                        //                             throw new ERROR('Response not OK.');
                        //                             })
                        //                             .then(function (data) { 
                        //                             // Let's see what we got back
                        //                             console.log('From getStationId function:'); 
                        //                             console.log(data);
                                                    
                        //                             // Store station ID and elevation (in meters - will need to be converted to feet) 
                        //                             let stationId = data.features[0].properties.stationIdentifier; 
                        //                             let stationElevation = data.features[0].properties.elevation.value; 
                        //                             console.log('Station and Elevation are: ' + stationId, stationElevation); 
                                                
                        //                             // Store data to localstorage 
                        //                             storage.setItem("stationId", stationId); 
                        //                             storage.setItem("stationElevation", stationElevation); 
                                                
                        //                             // Request the Current Weather for this station 
                        //                             getWeather(stationId);
                        //                             }) 
                        //                             .catch(error => console.log('There was a getStationId error: ', error)) 
                        //    } // end getStationId function

                        //    // Gets current weather information for a specific weather station from the NWS API
                        //                 function getWeather(stationId) { 
                        //                                 // This is the URL for current observation data 
                        //                                 const URL = 'https://api.weather.gov/stations/' + stationId + '/observations/latest';
                        //                                 // NWS User-Agent header (built above) will be the second parameter 
                        //                                 fetch(URL, idHeader) 
                        //                                 .then(function(response){
                        //                                 if(response.ok){ 
                        //                                 return response.json(); 
                        //                                 } 
                        //                                 throw new ERROR('Response not OK.');
                        //                                 })
                        //                                 .then(function (data) { 
                        //                                 // Let's see what we got back
                        //                                 console.log('From getWeather function:'); 
                        //                                 console.log(data);
                                                        
                        //                                 // Store weather information to localStorage 
                                                    
                                                    
                        //                                 // Build the page for viewing 
                                                        
                        //                                 }) 
                        //                                 .catch(error => console.log('There was a getWeather error: ', error)) 
                        //    } // end getWeather function