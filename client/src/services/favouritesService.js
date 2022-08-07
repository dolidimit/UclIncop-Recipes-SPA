import * as request from './requester';

const baseUrl = 'http://localhost:3030/data';


export const addFavourite = async (recipeData,token) => {
    let response = await fetch(`${baseUrl}/favourites`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token,
        },
        body: JSON.stringify(recipeData)
    });
    
    let  result = await response.json();

    
    return result;
};


export const removeFavourite = (recipeId, token) => {
    return fetch(`${baseUrl}/favourites/${recipeId}`, {
        method: 'DELETE',
        headers: {
            'X-Authorization': token,
        },
    }).then(res => res.json());
};


export const getOneFav = (recipeId) => {
    return fetch(`${baseUrl}/favourites/${recipeId}`)
        .then(res => res.json())
};

export const userFavourites = (ownerId) => {
    let query = encodeURIComponent(`_ownerId="${ownerId}"`);

    return request.get(`${baseUrl}/favourites?where=${query}`);
};
