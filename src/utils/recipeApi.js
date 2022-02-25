import tokenService from "./tokenService"

const BASE_URL = '/api/recipes'

export function create(recipeInfo) {
    return fetch(BASE_URL, {
        method: 'POST',
        body: JSON.stringify(recipeInfo),
        headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokenService.getToken()})
    }).then(res => {
        if (res.ok) return res.json();
        throw new Error ('Error submitting, check express terminal')
    })
}

export function getAll() {
    return fetch(BASE_URL, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => {
        // valid login if there's a status of 2xx
        if (res.ok) return res.json();
        throw new Error('bad credentials');
    })
}