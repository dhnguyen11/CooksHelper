import tokenService from "./tokenService"

const BASE_URL = '/api/recipes/'

// Authorization path for creating a recipe
export function create(recipeInfo) {
    // Creation fetch
    // Unlike other fetches, headers also requires content type
    // Because no photos are added, content type can be json application
    return fetch(BASE_URL, {
        method: 'POST',
        body: JSON.stringify(recipeInfo),
        headers: new Headers ({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + tokenService.getToken()})
    }).then(res => {
        // If valid (return code 2xx) return
        // Otherwise throw an error
        if (res.ok) return res.json();
        throw new Error ('Error submitting, check express terminal')
    })
}

// Authorization path for getting all recipes
export function getAll() {
    // Fetch function
    // Since it is a search and not a write, we only need the method and authorization
    return fetch(BASE_URL, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => {
        // If valid (return code 2xx) return
        // Otherwise throw an error
        if (res.ok) return res.json();
        throw new Error('bad credentials');
    })
}

// Authorization path for getting a single recipe
export function getOne(recipeId) {
    // Fetch function
    // Since it is a search and not a write, we only need the method and authorization
    return fetch(BASE_URL + recipeId, {
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res=> {
        // If valid (return code 2xx) return
        // Otherwise throw an error
        if (res.ok) return res.json();
        throw new Error('bad credentials');
    })
}