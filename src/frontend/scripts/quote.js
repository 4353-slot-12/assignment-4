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
document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:8000/api/profile', {
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

