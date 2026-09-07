import { BASE_URL, fetchApiData, getHeaders, METHOD_GET, METHOD_POST, STORAGE_KEY_TOKEN } from '../common/api.js';

let inputEmail = document.getElementById("inputEmail");
let inputPassword = document.getElementById("inputPassword");
let btnLogin = document.getElementById("btnLogin");

btnLogin.onclick = login


function isFormValid() {
    let errorMsg = "";
    let flag = true;


    if (inputEmail.value == "") {
        errorMsg += "invalid email, you should write something looser!\n\n";
        flag = false;
    }

    if (inputPassword.value == "" || inputPassword.value.length < 6) {
        errorMsg += "invalid password, you should at least insert 6 or more letters!\n\n";
        flag = false;
    }

    // check email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    flag = emailRegex.test(inputEmail.value);


    // TODO: regex for the password!±!!!!

    if (!flag) {
        errorMsg += "email format is wrong!\n\n";
        alert(errorMsg);
    }

    // 6 chars or more + 1 capital at least, 1 small, 1 number, 1 special

    return flag
}

function login() {

    if (!isFormValid()) {
        return;
    }

    apiRequestLogin()

}

async function apiRequestLogin() {

    const url = "/auth/login";

    let data = {
        email: inputEmail.value,
        password: inputPassword.value,
    }

    let result = await fetchApiData(METHOD_POST, url, data);

    if(result.success){
    // after successful registration, open index.html
    window.open("../index.html", '_self');
    }
    else{
        alert("Something went wrong with you!!!!");
    }

}

