/* *************************************
*  Acme Functions
************************************* */
console.log('Its connected');
var page ='';


//Fetching the Data//
let URL = '/acme/js/acme.json';
fetchData(URL);

function fetchData(URL){
fetch(URL)
 .then(function(response) {
   if(response.ok){
     return response.json();
   }
   throw new ERROR('Network response was not OK.');
 })
 .then(function(data){
   //Check the data object was retrieved
   console.log(data);
   //**************Getting and hangeing pages*****************
   //Setting to Local Storage//
   var storage = window.localStorage;
   console.log(data);
   //anvils
   storage.setItem('Name', data.Anvils.name);
   storage.setItem('AnvilImage', data.Anvils.path);
   storage.setItem('DescriptionAnvil', data.Anvils.description);
   
//    document.getElementById("anvilButton").addEventListener("click", changeToAnvil(), false);

// //    function changeToAnvil(){
//        console.log('It changed to anvil');
//        mainContent.setAttribute('class','hide');
//    }
 })
 .catch(function(error){
console.log('There was a fetch problem: ', error.message);
 })
}