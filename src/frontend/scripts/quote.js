document.addEventListener("DOMContentLoaded", function() {
    // Limits date selection to today or after.
    const todaysDateUTC = new Date();
    const timezoneOffset = todaysDateUTC.getTimezoneOffset();
    const todayDate = new Date(
        todaysDateUTC.getTime() - timezoneOffset * 60 * 1000
    );
    const stringDate = todayDate.toISOString().split("T")[0];

    const datePicker = document.getElementById("delivery-date");
    datePicker.value = stringDate;
    datePicker.min = stringDate;

    // Runs on load to populate the address field.
    fetch('http://localhost:8080/api/profile', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer', 
    })
    .then(response => response.json())
    .then(data => populateFields(data))
    .catch(err => console.error(err));
    
    const form = document.getElementById("quote-form");
    form.addEventListener("submit", handleSubmitPOST);
    form.addEventListener("button", handleSubmitGET);
});

function populateFields(profile){
    if(profile.data.address2 === "")
        document.getElementById("delivery-address").innerHTML = profile.data.address1 + 
        "<br>" + profile.data.city + " " + profile.data.state + " " + profile.data.zip;
    else
        document.getElementById("delivery-address").innerHTML = profile.data.address1 + 
        "<br>" + profile.data.address2 + 
        "<br>" + profile.data.city + ", " + profile.data.state + " " + profile.data.zip;
}

function populateResultFields(data) {
    const unitPriceElement = document.getElementById('unit-price');
    const totalPriceElement = document.getElementById('total-price');

    unitPriceElement.innerHTML = data.suggestedPrice;
    totalPriceElement.innerHTML = data.totalPrice;

    unitPriceElement.classList.add('animate');
    totalPriceElement.classList.add('animate');

    // enable the submit button

    setTimeout(() => {
        unitPriceElement.classList.remove('animate');
        totalPriceElement.classList.remove('animate');
    }, 1000);
}

function sendFormDataGET() {
    const payload = JSON.stringify({
        deliveryDate: document.getElementById('delivery-date').value,
        gallonsRequested: document.getElementById('gallons-requested').value,
    })

    document.getElementById("GetQuote").value = "Johnny Bravo"; 

    fetch('http://localhost:8080/api/quote', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        referrerPolicy: 'no-referrer', 
        body: payload,
    })
        .then(response => response.json())
        .then(data => populateResultFields(data))
        .catch(err => console.error(err));
}

function sendFormDataPOST() {
    const payload = JSON.stringify({
        deliveryDate: document.getElementById('delivery-date').value,
        gallonsRequested: document.getElementById('gallons-requested').value,
    })

    document.getElementById("GetQuote").value = "Johnny Bravo"; 

    fetch('http://localhost:8080/api/quote', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        referrerPolicy: 'no-referrer', 
        body: payload,
    })
        .then(response => response.json())
        .then(data => populateResultFields(data))
        .catch(err => console.error(err));
}

function handleSubmitGET(event) {
    event.preventDefault();
    sendFormDataGET();
}

function handleSubmitPOST(event) {
    event.preventDefault();
    sendFormDataPOST();
}