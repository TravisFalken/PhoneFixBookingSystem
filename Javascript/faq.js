

//Function for filtering RSS and displaying on website
function processFaq(rss){
    const items = rss.XMLHttpRequest.getElementsByTagName("item");

    var itemInfo, row, cell;
    var section = document.getElementById("faq_container");
    
    var inSection; 
    for(var i=0; i < items.length; i++){
        var title, description, link, uploadDate;
        itemInfo = items[i].children;
        for(var j=0; j < itemInfo.length; j++){
            //Filtering json for title
            if(itemInfo[j].tagName == "title"){
                title = itemInfo[j].innerHTML;
                //Filtering json for description
            }else if(itemInfo[j].tagName == "description"){
                description = itemInfo[j].innerHTML;
                //Filtering json for link
            }else if(itemInfo[j].tagName == "link"){
                link = itemInfo[j].innerHTML;
                //Filtering json for Upload Date
            }else if(itemInfo[j].tagName == "pubDate"){
                uploadDate = itemInfo[j].innerHTML;
            }
        }
        var div = document.createElement("div");
        div.className = "box";
        
       // alert("all good");
        div.innerHTML = `<h2>` + title + `</h2><p>` + description + `</p><a href="` + link + `">` + link + `</a>` + `<p>` + uploadDate +`</p>`;
        section.appendChild(div);
    }
}

function loadfaq(){
    var proxy = 'https://cors-anywhere.herokuapp.com/';
    //Declare the URL indicates the location of the XML file
    var url = "http://faqrss.orgfree.com/faq.json";

    //2: Create XMLHttpRequest object
    var ourRequest = new XMLHttpRequest();
    //Set ourRequest to URL to get data (not send data)
    ourRequest.open('GET', proxy + url, true);
    //Send XMLHttpRequest object or ourRequest to URL
    ourRequest.send();

    //3: Receive response (reply) from URL and Process that data
    ourRequest.onload = function() {
    //Check if the response status is OK (o error), render data on web page
    if (ourRequest.status >= 200 && ourRequest.status < 400) {

    //Parse the responseText into the JSON format by using JSON.parse() function
    var receivedData = JSON.parse(ourRequest.responseText);
    renderHTML(receivedData);
    } else {
    //Exception handling
    console.log("Connected to the server successfully but it returned an error!");
    }
    };
 }
 //Function to render data on web page
 function renderHTML(data) {
     console.log(data); //for testing
     var faqContainer = document.getElementById("faqContainer");
 //Build an html string which will be rendered on browser as an html-formated element
 var htmlString = "";
 //Retrieve question and relevant answer
 for (i = 0; i < data.length; i++) {
 //Add a <div> open tag
 htmlString += `<div class="card">`;
 //Get question
 htmlString += '<h4 class="card_heading">' + data[i].question + "</h4>";
 //Get answer
 htmlString += "<p4>" + data[i].answer + "</p4>";
 //Add the closing tag of div
 htmlString += "</div>";
 }

 //Render the whole htmlString to web page
 faqContainer.innerHTML = htmlString;

 //Add style to the html elements: add the <div> tag
 //Set style for "faq_format" class in css file
 }

loadfaq();