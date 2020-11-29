function emailValidate(event) {
    var email = event.target.value;
    if (!email.includes('@') || !email.includes('.') 
        || email.length < 5) {
            document.getElementById("errors").innerHTML = "Invalid Email Format.";
        }
    else {
        document.getElementById("errors").innerHTML = "";
    }
}

function hasCapitalLetter(password){
    for (let index = 0; index < password.length; index++) {
        if (password[index] >= 'A' && password[index] <= 'Z') {
            return true;
        }
    }
    return false;
}

function hasNumber(password){
    for (let index = 0; index < password.length; index++) {
        if (password[index] >= '0' && password[index] <= '9') {
            return true;
        }
    }
    return false;
}

function hasSpecialSymbol(password){
    for (let index = 0; index < password.length; index++) {
        if (password[index] == '!' || 
            password[index] == '@' ||
            password[index] == '#' ||
            password[index] == '$' ||
            password[index] == '%' ||
            password[index] == '^' ||
            password[index] == '&') {
            return true;
        }
    }
    return false;
}

function passwordValidate(event) {
    var password = event.target.value;

    if ( password.length < 6 || !hasCapitalLetter(password) 
        || !hasNumber(password) || !hasSpecialSymbol(password)){
            document.getElementById("errors").innerHTML = "Invalid password format."
    }
    else {
        document.getElementById("errors").innerHTML = "";
    }
}

function allInputsAreFilled(){
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    return username != "" && email !="" && password !="";
}

function submitRegister(event) {
    event.preventDefault();
    /* // task 1-2
    if (document.getElementById("errors").innerHTML.toString() == "" && 
        allInputsAreFilled()) {
            alert("Successful registration!");
    }
    if ( !allInputsAreFilled() ) {
        alert("Please, fill all input bars!");
    }
    else {
        alert("Enter valid info!");
    }*/

    //task 3
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    window.auth.register(username, email, password, function(isSuccessful,errorCode, errorMessage){
        if(isSuccessful){
            alert("Successfull registration");
            location.replace("./posts.html");
        }
        else
        {
            errors.innerText = errorMessage;
        }
    });
}

//task 4 bonus
function submitLogin(event) {
    
    event.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    window.auth.login(email, password, function(isSuccessful,errorCode, errorMessage){
            if (isSuccessful) {
                alert("Successful login");
                location.replace("./posts.html");
            } else {
                errors.innerText = errorMessage;
            }
    });
}



/* didnt work out.
document.getElementById("register-button").addEventListener("click", function() {
    /* // task 1
    if (document.getElementById("errors").innerHTML.toString() == "" && 
        allInputsAreFilled()) {
            alert("Successful registration!");
    }
    if ( !allInputsAreFilled() ) {
        alert("Please, fill all input bars!");
    }
    else {
        alert("Enter valid info!");
    }*
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    window.auth.register(username, email, password, function(isSuccessful,errorCode, errorMessage){
        if(isSuccessful){
            alert("Successfull registration");
            location.replace("./posts.html");
        }
        else
        {
            errors.innerText = errorMessage;
        }
    });
})

/*
document.getElementById("login-button").addEventListener("click", function(){
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    window.auth.login(email, password, function(isSuccessful,errorCode, errorMessage){
            if (isSuccessful) {
                alert("Successful login");
                location.replace("./posts.html");
            } else {
                errors.innerText = errorMessage;
            }
    });
})*/
