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