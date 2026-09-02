import { BASE_URL, getHeaders, METHOD_POST } from '../common/api.js';

let inputEmail = document.getElementById("inputEmail");
let inputName = document.getElementById("inputName");
let inputPassword = document.getElementById("inputPassword");
let btnPing = document.getElementById("btnPing");
let btnRegister = document.getElementById("btnRegister");

btnPing.onclick = apiRequestPing
btnRegister.onclick = register

async function apiRequestPing() {
    let api_url = `${BASE_URL}/auth/ping`;

    let response = await fetch(api_url);

    if (!response.ok) {
        alert("what have u done looser!!! ");
        return;
    }

    let jsonResponse = await response.json();

    alert(JSON.stringify(jsonResponse));
}

function isFormValid() {
    let errorMsg = "";
    let flag = true;

    if (inputName.value == "" || inputName.value.length < 2) {
        errorMsg = "invalid name, you should at least insert 2 or more letters!\n\n";
        flag = false;
    }

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

function register() {

    if (!isFormValid()) {
        return;
    }

    apiRequestRegister()

}

async function apiRequestRegister() {
    let api_url = `${BASE_URL}/auth/register`;

    let data = {
        name: inputName.value,
        email: inputEmail.value,
        password: inputPassword.value,
        c_password: inputPassword.value
    }


    let response = await fetch(api_url, getHeaders(METHOD_POST, data));


    if (!response.ok) {
        alert("what have u done looser!!! ");
        return;
    }

    let jsonResponse = await response.json();

    alert(JSON.stringify(jsonResponse));
}


