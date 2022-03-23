
const username = document.getElementById("username");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

function validatePassword(){
    if(password.value != confirmPassword.value) {
        confirmPassword.setCustomValidity("Passwords Don't Match");
        return false;
    }
    confirmPassword.setCustomValidity('');
    return true;
}

password.onchange = validatePassword;
confirmPassword.onkeyup = validatePassword;

function handleSubmit() {
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");

    const usernameExists = !!username.value.length;
    const passwordExists = !!password.value.length;
    const passwordsMatch = password.value == confirmPassword.value;

    // If checks pass, continue with submit.
    if (usernameExists && passwordExists && passwordsMatch) {
        return true;
    }

    if (!usernameExists) username.focus();
    else if (!passwordExists) password.focus();
    else if (!passwordsMatch) confirmPassword.focus();

    return false;
}