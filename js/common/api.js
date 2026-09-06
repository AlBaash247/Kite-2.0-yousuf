
export const BASE_URL = "https://albaash247.cloud/api";

export const METHOD_GET = "GET";
export const METHOD_POST = "POST";
export const METHOD_PUT = "PUT";
export const METHOD_DELETE = "DELETE";

export function getHeaders(method, data) {

    let headerObject = {
        method: method,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + localStorage.getItem(STORAGE_KEY_TOKEN)
        },

    }

    if (method !== METHOD_GET) {
        headerObject.body = new URLSearchParams(data)
    }

    return headerObject;
}



export async function fetchApiData(method, url, data) {
    let api_url = `${BASE_URL}${url}`;


    let response = await fetch(api_url, getHeaders(method, data));

    if (!response.ok) {
        alert("what have u done looser!!! ");
        return;
    }

    let jsonResponse = await response.json();

    if (jsonResponse?.data?.token) {
        let token = jsonResponse.data.token;
        //STORE token in local storage
        localStorage.setItem(STORAGE_KEY_TOKEN, token);
    }

    return jsonResponse;
}




// storage keys
export const STORAGE_KEY_TOKEN = "TOKEN";