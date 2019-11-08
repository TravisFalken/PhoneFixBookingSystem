//============Script for FAQ's==================
var faqArray =[
    {
    "question": "Why do I have to pay a service fee?",
    "answer" : "A service fee is only charged for repairs to devices that are no longer under warranty. Business customers are not charged a service fee in accord with the terms of their contract."
    },
   
    {
    "question": "What is the bond for?",
    "answer" : "The bond is to cover any damage done to the courtesy phone and/or charger. The bond will be refunded upon the safe and undamaged return of the phone and charger."
    },
   
    {
    "question": "Do I need a charger with my courtesy phone?",
    "answer" : "No, a charger is optional. You can add one with the 'Add charger' button. If you don't want one but added one by accident, you can remove it by clicking on the 'Remove charger' button."
    },
    {
    "question": " Why isn't my phone under warranty?",
    "answer" : " The length of your phone's warranty depends on the warranty package you chose upon purchase. The standard is 24 months and is calculated from its purchase date."
    },
    {
    "question": " How long will my repair take?",
    "answer" : " Depends on your phone broken status. It takes normally 5 to 7 working days."
    },
    {
    "question": " How do you protect the private information in my phone?",
    "answer" : " We comply with all relevant laws regarding privacy and client confidentiality."
    },
    {
    "question": " Where do you get your replacement parts?",
    "answer" : " We will send you a quote of all possible vendors who supply replacement parts for your references and your choice."
    },
    {
    "question": " What happens if my phone is further damage after leaving it with you?",
    "answer" : " We make sure that it never happens."
    },
    {
    "question": " What kind of warranty do you offer and what does it cover?",
    "answer" : "1 month is the average warranty period. These warranties covers parts and service only."
    },
    {
    "question": " What does the repair estimate include?",
    "answer" : " The repair price estimate includes both replacement parts and labor."
    } ,
   
   {
   "question": "What if I miss the payment due date?",
   "answer": "If you miss the payment due date the total price increases by 10% of the original price and so on for each day after that"
   }
   ];

function searchFaq(){
    //get the value the user wants to search for
    var searchResults = document.getElementById("searchResults");
    var userSearch = document.getElementById("searchInput").value;
    //filter through the map
    var results = faqArray.filter(function(faqArray){
        return faqArray.question.indexOf(userSearch)> -1;
    });
    //Clear search results if there was anything previous result
    searchResults.innerHTML = "";
    //clear the input
    document.getElementById("searchInput").value = "";
    //if there is no match
    if(results.length == 0){
        searchResults.innerHTML = "There is no match";
    }else{
        for(var i = 0; i < results.length; i++){
            searchResults.innerHTML += "<b>" + results[i].question + "</b><br>";
            searchResults.innerHTML += results[i].answer + "<br><br>";
        }
    }
}

//==========SCRIPT FOR DATE PICKER EXAMPLE=================
$(function () {
    $('#example_datepicker').datepicker();
});


//===========Script for drag and drop feature===================
function allowDrop(ev) {
    ev.preventDefault();
}
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

//==========Script for Getting Geolocation example=================
function getGeolocation(){
    //validate that the bowser supports geolocation
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }else{
        var longitude = document.getElementById("longitude");
        longitude.innerHTML = "This browser does not support geolocation.";
    }
}

//format the posistion
function showPosition(location){
    var latitude = document.getElementById("latitude");
    var longitude = document.getElementById("longitude");
   latitude.innerHTML = "Latitude: " + location.coords.latitude;
   longitude.innerHTML = "longitude: " + location.coords.longitude;
   console.log("latitude: " + location.coords.latitude + " Longitude: " + location.coords.longitude);

}

//===================Script for Local Storage====================

//set the username in local storage
function submitUsername(){
    var enterdUsername = document.getElementById("example_username").value;
    localStorage.username = enterdUsername;
    document.getElementById("example_username").value = "";
  
}

//get the username from local storage and display it
function showUsername(){
    //Validate if username is in local storage
    if(localStorage.username){
        alert("Stored username is: " + localStorage.username);
    }else {
        alert("No username has been stored");
    }
}

//Remove the username from local storage
function removeUsername(){
    //Validate if username is in local storage
    if(localStorage.username){
        localStorage.removeItem("username")
    }else {
        alert("There is no username to delete")
    }
}

//Increment the jobnumber and display it
function increaseJobNumber(){
    var jobnumber = document.getElementById("jobNumber");
    //Validate if job number is in local storage
    if(localStorage.demoJobNumber){
        localStorage.demoJobNumber = Number(localStorage.demoJobNumber) + 1;
        jobnumber.innerHTML = "Job Number: " + localStorage.demoJobNumber;
    }else{
        localStorage.demoJobNumber = 1;
        jobnumber.innerHTML = "Job Number: " + localStorage.demoJobNumber;
    }
}


