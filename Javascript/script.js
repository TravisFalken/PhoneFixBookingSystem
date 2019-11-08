$(document).ready(function(){
    //Add method for checking if there are spaces between letter
    jQuery.validator.addMethod("correctCharactersUsed", function(value, element){
       var regex = new RegExp("^[a-zA-Z\- ]*$");
        return regex.test(value);
    }, "Incorrect character used");

    //Add method for validating phone numbers
    jQuery.validator.addMethod("validPhoneNumber", function(value, element){
        var regex = new RegExp("^[()0-9\+]+[0-9 \+\-]*$");
        return regex.test(value);
    }, "Not a valid phone number!");

    //Validate that customer type radio button has been checked
    jQuery.validator.addMethod("customerTypeChecked", function(value, element){
    
      var radioButtons = document.getElementsByName('customer_type');
      for(var i = 0; i < radioButtons.length; i++){
          if(radioButtons[i].checked) {
              return true
          }
      }
      return false;
    }, "Please Enter a cutomer type");

    //Validate input required
    jQuery.validator.addMethod("validInput", function(value, element){
        if(value.toString() == "" || value.toString() == null){
            return false;
        }
        return true;
    }, "Please enter");

    //validate number only
    jQuery.validator.addMethod("numbersOnly", function(value, element){
        result = !isNaN(value);
        return result;
    }, "Not valid, use numbers only");

    //Custom email validation
    jQuery.validator.addMethod("validEmail", function(value,element){
        //Create regex 
        var regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regex.test(value)
    }, "Not a real Email Address");

    //Custom date validator
    jQuery.validator.addMethod("validateDate", function(value,element){
        var d = new Date();
        var year =d.getFullYear();
        var regex = new RegExp('/^[1-3][1-9]/[0-1][0-2/[2000-'+year+']');
        return regex.test(value);
    }, "Not correct date format");

    //Validates that repair date is later that purchase date
    jQuery.validator.addMethod("validateRepairDate", function(value, element){
        //get the string values from the inputs
        var repairDate = new Date(value);
        var purchaseDateString = $('#purchaseDate').val();
        //Create the date objects
        var purchaseDate = new Date(purchaseDateString);
        
        //Make sure the purchase date has been inputed
        if(purchaseDateString.length <= 0){
            return true;//returns true because there is nothing to compare the repair date too
        }
        var result = compareDates(repairDate,purchaseDate);
        //if less than 0 than the purchase date is after the repair date
        if(result < 0){
            return false;
        }
        //if there are in the same month
        if(result == 0){
            //if repair day is greater than purchase date it will be set after the purchase date
            if(repairDate.getDate() > purchaseDate.getDate()){
                return true;
            }
            return false;
        }
        return true;
    }, "You cannot set the repair date before the purchase date");

    //valid min length
    jQuery.validator.addMethod("validMinLength", function(value, element, param){
        return value.length >= param;
    }, "Length is too short");

    //valid max length
    jQuery.validator.addMethod("validMaxLength", function(value,element,param){
        return value.length <= param;
    }, "Length is too long");

    //Validates that dates are not set in the future
    jQuery.validator.addMethod("notFutureDate", function(value,element){
        //Set the dates
        var date2 = new Date(value);
        var date1 = new Date();
        //Compares the two dates
        var dateResult = compareDates(date1,date2);
        //if the date is set in the future
        if(dateResult < 0){
           
            return false;
        }
        //if dates are in the same month
        if(dateResult == 0){
            //Check to see if the day value day is bigger than the day now
            if(date2.getDate() > date1.getDate()){
                return false;
            }
            return true;
        }
        return true;
    }, "Cannot set date in the future");
    //initialize the jquery plugin
    $('#phoneBooking').validate({ 

        rules: {
            customer_type: {
                customerTypeChecked: true
            },

            title: {
                required: true
            },
            
            first_name: {
                validInput: true,
                correctCharactersUsed: true
            },
            last_name: {
                validInput: true,
                correctCharactersUsed: true
            },
            street: {
                validInput: true
            },
            city: {
                validInput: true
            },
            post_code: {
                numbersOnly: true,
                validMinLength: 4,
                validMaxLength:4

            },
            phone_number: {
                validInput: true,
                validPhoneNumber: true
            },
            email: {
                validInput: true,
                validEmail: true,
                validMinLength: 5
            },
            purchase_date: {
                validInput: true,
                notFutureDate: true
            },
            repair_date: {
                validInput: true,
                notFutureDate: true,
                validateRepairDate: true

            },
            imei_number: {
                validInput: true,
                numbersOnly: true,
                validMinLength: 15,
                validMaxLength: 15
            },
            make: {
                validInput: true
                
            },
            fault_category: {
                validInput: true
            },
            description: {
                validInput: true
            }
        },
        messages: {
            first_name: {
                validInput: 'First name is required'
            },
            last_name: {
                validInput: "Last name is required"
            },
            street: {
                validInput: "Street is required"
            },
            city: {
                validInput: "City is required"
            },
            post_code: {
                numbersOnly: "Post Code Should only be numbers",
                validMinLength: "Post code is too short, should be 4 digits",
                validMaxLength: "Post code is too long, should only be 4 digits"
            },
            phone_number: {
                validInput: "Phone number is required"
            },
            email: {
                validInput: "Email is required",
                validEmail: "Not a real email address",
                validMinLength: "Email is too short"
            },
            purchase_date: {
                validInput: "Purchased date required"
            },
            repair_date: {
                validInput: "Repair date required"
            },
            imei_number: {
                validInput: "IMEI Number is required",
                validMinLength: "The number is too short, must be 15 numbers",
                validMaxLength: "The number is too long"
            },
            make: {
                validInput: "Make is required"
            },
            fault_category: {
                validInput: "Fault category is required"
            },
            description: {
                validInput: "Description is required"
            }
        },

        submitHandler: function (form){
            //create invoice table
            createInvoice()
        }
    });

    //Disable inputs in the cost section of the form
    $("#bond").prop('disabled', true);
    $("#service").prop('disabled', true);
    $("#total").prop('disabled', true);
    $("#gst").prop('disabled', true);
    $("#total_gst").prop('disabled', true);

});

//set the date inputs to jQuery date picker
$(function(){
    //
   // $('#repairDate').datepicker();
});

$(function(){
  //  $('#purchaseDate').datepicker();
});
//When add phone button is clicked
function addPhoneButtonClicked(){
    //validate that a phone was actually selected
    if(getCourtesyValue() != 0){
        //hide add button
        document.getElementById("addButton").style.display = "none";
        //hide dropdown
        document.getElementById("courtesy_phoneSelection").style.display = "none";
        //hide Item Type label
        document.getElementById("itemTypeLabel").style.display = "none";
        //show remove phone button
        document.getElementById("removeButton").style.display = "block";
        //show add charger button
        document.getElementById("addChargerBtn").style.display = "block";
        addCourtesyPhone();
    }
    
}


//Resets the courtesy phone section to default
function resetCourtesyPhone(){
    //Show phone type label
    document.getElementById("itemTypeLabel").style.display = "block";
    //show dropdown
    document.getElementById("courtesy_phoneSelection").style.display = "block";
    //show add button
    document.getElementById("addButton").style.display = "block";
    //hide remove phone button
    document.getElementById("removeButton").style.display = "none";
    //hide add charger button
    document.getElementById("addChargerBtn").style.display = "none";
    //hide remove charger button
    document.getElementById("removeChargerBtn").style.display = "none";
    //reset the phone select 
    $('#courtesy_phoneSelection').prop('selectedIndex', 0);
    //remove table if exists
    if(costTableExists()){
        $('#phoneTable').remove();
    }
    //Set the charger included to false
    chargerIncluded = false;
    //update the cost section
    updatePrices();
}

//Add Charger button clicked
function addChargerButtonClicked(){
    //hides the add charger button
    document.getElementById("addChargerBtn").style.display = "none";
    //Show Remove charger button
    document.getElementById("removeChargerBtn").style.display = "block";
    //Set charger included to true
    chargerIncluded = true;
    //Update the cost section
    updatePrices();
    //Add charger to the table
    createChargerRow();
}

//remove charger button clicked
function removeChargerButtonClicked(){
    //hides the remove charger button
    document.getElementById("removeChargerBtn").style.display = "none";
    //Show the add charger button
    document.getElementById("addChargerBtn").style.display = "block";
    //Set the charger included to false
    chargerIncluded = false;
    //Update the cost section
    updatePrices();
    removeChargerRow();
} 

//Calculates courtesy phone and puts it into a table
function addCourtesyPhone(){
    //getting the value of the selected option
    var courtestyPhone = $('#courtesy_phoneSelection').find(":selected").val();
    var phoneName = $('#courtesy_phoneSelection').find(":selected").text();
    //getting the customerType
    var customerType = $('input[name=customer_type]:checked').val();
    var phoneValue;
    const charger = getChargerValue()
    var bond;
    phoneValue = getCourtesyValue();
    //if no phone was selected
    if(phoneValue == 0){
        return;
    }
    createTable(phoneName,phoneValue, charger);
    tableExists = costTableExists();
    
    //check the customer type
    if(customerType == "consumer"){
        //Set bond to phone value + charger
         bond = phoneValue + charger;
    }else{
        //Set bond value to phone $0 because customer is a business
        bond = 0;
    }
    //Set the bond input to the bond
    $("input[name=bond]").val("$" + bond.toFixed(2));
    var serviceFee = calculateServiceFee();
    var total = calculateTotal(phoneValue, charger, serviceFee);
    var gst = calculateGST(total);
    totalIncludeGST(total, gst);

}

//get the courtesy phone value
function getCourtesyValue(){
    var phoneType = $('#courtesy_phoneSelection').find(":selected").val();
    var phoneValue;
    if(phoneType == "iPhone_7" || phoneType == "iPhone_8" || phoneType == "iPhone_X"){
        phoneValue = 275;
    }else if(phoneType == "none"){
        phoneValue = 0;
    }else{
        phoneValue = 100;
    }
    return phoneValue;
}

//check if client is a consumer
function validateConsumer(){
    var customerType = $('input[name=customer_type]:checked').val();
    if(customerType == "consumer"){
        return true;
    }
    return false;
}

//get charger value
function getChargerValue(){
    var charger;
    if(chargerIncluded){
        charger = 30;
    }else{
        charger = 0;
    }
    
    return charger;
}

//calculate bond
function calculateBond(){
    var phoneValue = getCourtesyValue();
    var chargerValue = getChargerValue();
    var bond;
    //Validate that phone has been added
    if( costTableExists()){
        if(validateConsumer()){
            bond = phoneValue + chargerValue;
        }else {
            bond = 0;
        }
        return bond;
    }

    return 0;
    
}

//caluculate the service fee
function calculateServiceFee(){
    var serviceFee;
    //Check if warranty checkbox is checked
    if($('input[name=warrenty]:checked').length > 0){
        //Set the service fee  to $0 (under warranty)
        serviceFee = 0;
    }else{
         //Set the service fee to $85 (not under warranty)
         serviceFee = 85;
    }
    //set the service fee input to the service fee
    $("input[name=service_fee]").val("$" + serviceFee.toFixed(2));
    return serviceFee;
}

//calculate total
function calculateTotal(phoneValue, charger, serviceFee) {
    total = phoneValue + charger + serviceFee;
    //Set the total input value
    $("input[name=total]").val("$" + total.toFixed(2));
    return total;
}

//Calculate GST on a value
function calculateGST(total){
    //calculate gst (15%)
    var gst = total * 0.15;
    //Set the GST input to the calculated GST
    $('input[name=gst]').val("$" + gst.toFixed(2));
    return gst;
}

//Calculate total + gst
function totalIncludeGST(total, gst){
    var totalGST = total + gst;
    $("input[name=total_gst]").val("$" + totalGST.toFixed(2));
    return totalGST;
}

//Checks if cost table exists
function costTableExists(){
    if($('#phoneTable').length > 0){
        return true; //Table existsw
    }
    return false; //Table does not exist
}
//create table
function createTable(courtesyPhone, phoneValue, charger){
    //Checks if table exists
    if (costTableExists()){
        //Removes table
        $('#phoneTable').remove();
    }
    //Create table
    var table = $('<table></table>').attr({id: "phoneTable"});
    var rows = '<tr><th>Item</th><th>Cost</th></tr><tr><td>' + courtesyPhone + '</td><td>$'+ phoneValue+ '</td></tr>';
    table.append(rows);
    $('.table_div').append(table);
}

//Create charger row for the table
function createChargerRow(){
    //validate that the table exists
    if(costTableExists()){
        //get charger value
        var charger = getChargerValue();
        $('#phoneTable tr:last').after('<tr id="charger_row"><td>Charger</td><td>$' + charger + '</td></tr>');
    }
}

//remove charger row
function removeChargerRow(){
    //validate that the table exisits
    if(costTableExists()){
        $('#charger_row').remove();
    }
}
//Resets the elements when reset button is clicked
function resetElements(){
    resetCourtesyPhone();
}

//compare months
function comparePurchaseRepairDates(){
    //gets a string of the dates from the inputs
    var purchaseDateString = $('#purchaseDate').val();
    var repairDateString = $('#repairDate').val();
    //Checks that they have both been entered in
    if(purchaseDateString.length > 0 && repairDateString.length > 0){
        //Create date objects
        var purchaseDate = new Date(purchaseDateString);
        var repairDate = new Date(repairDateString);
        ///==========Calculate months between dates=======================
        var months = ((repairDate.getFullYear() - purchaseDate.getFullYear()) *12);
        months -= purchaseDate.getMonth() + 1;
        months += repairDate.getMonth() +1;
        return months;
        
    }
}

//Get the difference between 2 dates
function compareDates(d1, d2){
    //gets the difference in the years
    var months = ((d1.getFullYear() - d2.getFullYear()) *12);
    //Subtracts second dates months
    months -= d2.getMonth() + 1;
    //Add first dates months
    months += d1.getMonth() +1;
    return months;
}
//validate warranty
function validateWarranty(){
    if($('#warranty').prop('checked')){
        return true
    }
    return false;
}

//stores the time of the repair
function storeRepairTime(){
    repairTime = new Date();
    checkWarranty();
}
//Check if phone is under warranty
function checkWarranty(){

    //if there is a 12 month difference between the purchase date and end date
    if(comparePurchaseRepairDates() > 24){
        //Disables warranty checkbox
        $('#warranty').prop("checked", false);
    }else{
        //Enables warranty checkbox
        $('#warranty').prop("checked", true);
    }
    updatePrices();
}

//updates the prices
function updatePrices(){
    var bond = calculateBond();
    $("input[name=bond]").val("$" + bond.toFixed(2));
    var courtesyPhone = getCourtesyValue();
    var chargerValue = getChargerValue();
    var serviceFee = calculateServiceFee();
    var total = calculateTotal(courtesyPhone, chargerValue, serviceFee);
    var gst = calculateGST(total);
    totalIncludeGST(total, gst);

}

//Get text input value based on id
function getTextInputValue(id){
    var elementid = "#" + id;
    var value = $(elementid).val();
    return value;
}

//Get select value based on id
function getSelectValue(id){
    var elementid = "#" + id;
    var value = $(elementid).find(":selected").val();
    return value;
}

//get random integer from min max values given
function getRandomValue(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//format time in 12 hour format
function formatTimeTwelveHour(date){
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var pmOrAm = hours >= 12 ? "pm" : "am";

    //format the hours
    var formattedHours = hours % 12;
    if(formattedHours == 0){
        formattedHours = 12;
    }

    //format minutes
    var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return formattedHours + ":" + formattedMinutes + pmOrAm;
}

//format time in 24 hour format
function formatTimeTwentyFourHour(date){
    //get hours
    var hours = date.getHours();
    //format hours
    var formattedHours = hours < 10 ? "0" + hours : hours;
    //get minutes
    var minutes = date.getMinutes();
    //format minutes
    var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return formattedHours + ":" + formattedMinutes;
}

//gets the job number from local storage and increments it
function getJobNumber(){
    var newJobNumber;
    if(localStorage.jobNumber){
        localStorage.jobNumber = Number(localStorage.jobNumber) + 1;
        newJobNumber = localStorage.jobNumber;
        return newJobNumber;
    }else{
        localStorage.jobNumber = 1;
        newJobNumber = localStorage.jobNumber;
        return newJobNumber;
    }
}

//=================Create Invoice==================
function createInvoice(){
    var title = getSelectValue("title_select");
    var firstName = getTextInputValue("firstName");
    var lastName = getTextInputValue("lastName");
    var street = getTextInputValue("street");
    var suburb = getTextInputValue("suburb");
    var city = getTextInputValue("city");
    var postcode = getTextInputValue("postCode");
    var phoneNumber = getTextInputValue("phoneNumber");
    var email = getTextInputValue("email");
    var purchaseDate = getTextInputValue("purchaseDate");
    var repairDate = getTextInputValue("repairDate");
    var imeiNumber = getTextInputValue("imei_number");
    var make = getSelectValue("make_of_phone");
    var model = getTextInputValue("model");
    var fault = getSelectValue("falult_category");
    var description = getTextInputValue("description");
    var bond = getTextInputValue("bond");
    var service_fee = getTextInputValue("service");
    var total = getTextInputValue("total");
    var gst = getTextInputValue("gst");
    var totalGST = getTextInputValue("total_gst");

    
    var warranty;
    var jobNumber;
    var invoiceDate;
    var paymentDate;
    var formattedRepairTime = formatTimeTwelveHour(repairTime);
    var invoiceDateTime = new Date();
    var invoiceTime = formatTimeTwentyFourHour(invoiceDateTime)

    // get tabel
    //validate that table exists
    if(costTableExists()){
        var table = $('#phoneTable').prop('outerHTML');
    }else {
        var table = "There is no courtesy Phone"
    }
    //get warranty
    if(validateWarranty()){
        warranty = "Yes &#10003;" 
    }else {
        warranty = "No &#10008;"
    }

    //set jobNumber
    jobNumber = getJobNumber();

    //set the invoice date
    var todaysDate = new Date();
    invoiceDate = todaysDate.getDate() + "/" + todaysDate.getMonth() + "/" + todaysDate.getFullYear();
    //set payment date
    var days = todaysDate.getDate();
    todaysDate.setDate(days + 7);
    paymentDate = todaysDate.getDate() + "/" + todaysDate.getMonth() + "/" + todaysDate.getFullYear();

    //open blank page
    let invoiceWindow = window.open('', '_blank');

     //build the invoice page: is a HTML document
     invoiceWindow.document.write(
        `<html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="css/invoice_style.css">
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.1/dist/jquery.validate.js"></script>
                <script src="javascript/script.js"></script>
            </head>`
     );

     //build the body of the invoice

    invoiceWindow.document.write(
        `
        <body>
            <header id="invoice_header">
                <h1 id="invoice_title">Repair Booking</h1>
                <div class="amount_div">
                    <p>Amount Due</p>
                    <h2>${totalGST}</h2>
                </div>
            </header>
            <main id="invoice_main">
                <div class="customer_repairjob">
                    <div class="customer">
                        <h2 class="section_heading">Customer</h2>
                        <p>${title} ${firstName} ${lastName}</p>
                        <p>${street}</p>
                        <p>${suburb}, ${city} ${postcode}</p>
                        <p>${phoneNumber}</p>
                        <p>${email}</p>
                    </div>
                    <div class="repairjob">
                        <h2 class="section_heading">Repair Job</h2>
                        <div class="repairjob_details">
                            <p><b>Job Number:</b></p>
                            <p>${jobNumber}</p>
                            <p><b>Invoice Date:</b></p>
                            <p>${invoiceDate} - ${invoiceTime}</p>
                            <p><b>Payment Due:</b></p>
                            <p>${paymentDate}</p>
                        </div>
                    </div>
                </div>
                <hr class="thick_line">
                <div class="repair_details_div">
                    <h2 class="section_heading">Repair Details</h2>
                    <div>
                    </div>
                    <div class="repair_details">
                        <p><b>Purchase Date:</b></p>
                        <p>${purchaseDate}</p>
                        <p><b>Repair Date/Time:</b></p>
                        <p>${repairDate} - ${formattedRepairTime}</p>
                        <p><b>Under Warranty:</b></p>
                        <p>${warranty}</p>
                        <p><b>IMEI Number:</b></p>
                        <p>${imeiNumber}</p>
                        <p><b>Device Make:</b></p>
                        <p>${make}</p>
                        <p><b>Model Number:</b></p>
                        <p>${model}</p>
                        <p><b>Fault Category:</b></p>
                        <p>${fault}</p>
                        <p><b>Description:</b></p>
                        <p>${description}</p>
                    </div>
                </div>
                <div class="table_div">
                    <div class="table">
                        <h2 class="section_heading">Courtesy Loan Device Details</h2>
                        <div class="table_container">
                            ${table}
                        </div>
                    </div>
                </div>
                <div class="totals">
                    <div></div>
                    <h2 class="section_heading">Totals</h2>
                    <div></div>
                    <div class="totals_details">
                        <p><b>Bond:</b></p>
                        <p>${bond}</p>
                        <p><b>Service Fee:</b></p>
                        <p>${service_fee}</p>
                        <p><b>Total:</b></p>
                        <p>${total}</p>
                        <p><b>GST:</b></p>
                        <p>${gst}</p>
                        <p><b>Total(+GST):</b></p>
                        <p>${totalGST}</p>
                    </div>
                </div>
            </main>
            <footer>
                <div class="service">
                    <h2 class="section_heading">Phone Fix Service</h2>
                    <p>42 Fuxed It Drive</p>
                    <p>Taradale</p>
                    <p>Napier</p>
                </div>
                <div class="contact">
                    <h2 class="section_heading">Contact Us</h2>
                    <p><b>Phone:</b> 06876543</p>
                    <p><b>Email:</b> fix@gmail.com<p>
                </div>
            </footer>
        </body> 
        `
    );

}


//global repair date
var repairTime;
//global charger included
var  chargerIncluded = false;