import tokenService from "./tokenService"

const BASE_URL = '/api/groceries'

export function addGroceries(recipeId){
    return fetch(`${BASE_URL}/${recipeId}`, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => {
        if(res.ok) return res.json();
        throw new Error('Error adding groceries')
    })
}

export function getGroceries(){
    return fetch(BASE_URL, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => {
        if(res.ok) return res.json();
        throw new Error('Error getting groceries')
    })
}

export function emptyGroceries(){
    return fetch(BASE_URL, {
		method: 'PUT',
	    headers: {
			'Authorization': 'Bearer ' + tokenService.getToken() // <- the jwt contains the user who is sending the like
		}	
	}).then(res => {
		if(res.ok) return res.json();
		throw new Error('Error in deleting the like, check your express terminal!')
	})
}