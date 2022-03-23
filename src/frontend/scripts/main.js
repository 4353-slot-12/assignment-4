// Auth user view
// const anonNavBar = document.getElementById('nav-anonymous-user');
// anonNavBar.style.display = "none";

// const callToAction = document.getElementById('call-to-action');
// if (callToAction) callToAction.style.display = "none";


// Anon user view 
const authNavBar = document.getElementById('nav-authenticated-user');
authNavBar.style.display = "none";

function switchToAuthenticatedNavBar(isAuth) {
    if (!isAuth) return;
    const anonNavBar = document.getElementById('nav-anonymous-user');
    const authNavBar = document.getElementById('nav-authenticated-user');
    const callToAction = document.getElementById('call-to-action');

    if (anonNavBar) anonNavBar.style.display = "none";
    if (callToAction) callToAction.style.display = "none";
    if (authNavBar) authNavBar.style.display = "block";
}

fetch('http://localhost:8000/api/auth', {
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
	.then(data => switchToAuthenticatedNavBar(data.authenticated))
	.catch(err => console.error(err));