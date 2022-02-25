import tokenService from "./tokenService"

const BASE_URL = '/api'

// Function to create a like
export function create(recipeId){
    return fetch(`${BASE_URL}/recipes/${recipeId}/favorites`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => {
        if(res.ok) return res.json();
        throw new Error('Error in creating the like')
    })
}

// Function to remove a like
export function removeFavorite(favoriteId){
    return fetch(`${BASE_URL}/recipes/${favoriteId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => {
        if(res.ok) return res.json();
        throw new Error('Error in deleting the like')
    })
}