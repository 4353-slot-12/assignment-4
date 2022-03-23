const validZipCodeRegex = /(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)/;
// broken const validStateRegex = /^(?-i:A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])$/;
const accessDeniedMessage = "You'll be able to access this feature once you have submitted the form below.";

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
    document.getElementById("name").value = profile.data.name;
    document.getElementById("address1").value = profile.data.address1;
    document.getElementById("address2").value = profile.data.address2;
    document.getElementById("city").value = profile.data.city;
    document.getElementById("state").value = profile.data.state;
    document.getElementById("zip").value = profile.data.zip;
}

function handleSubmit() {
    const name = document.getElementById("name");
    const address1 = document.getElementById("address1");
    const address2 = document.getElementById("address2");
    const city = document.getElementById("city");
    const state = document.getElementById("state");
    const zip = document.getElementById("zip");

    if (!address1.value.length && address2.value.length) {
        address1.value = address2.value;
        address2.value = "";
    }

    const nameExists = !!name.value.length;
    const addressExists = !!address1.value.length;
    const cityExists = !!city.value.length;
    const stateValid = true//!!validStateRegex.match(state.value);
    const zipCodeValid = !!validZipCodeRegex.match(zip.value);

    if (nameExists && addressExists && cityExists && stateValid && zipCodeValid) return true;

    if (!stateValid) {
        state.setCustomValidity('Please select a State.');
        state.focus();
    }
    else if (!zipCodeValid) {
        zip.setCustomValidity('Please enter a valid 5-digit zip code.');
        zip.focus();
    }

    return false;
}

function accessDenied() {
    alert("You'll be able to access this feature once you have submitted the form below.");
    return false;
}