const baseUrl = 'http://localhost:3030/jsonstore';


export const getAll = async () => {
    let response = await fetch(`${baseUrl}/recipes`)

    let recipes = await response.json();

    let result = Object.values(recipes);

    return result;
}

export const getOne =  async (recipeId) => {
    return await fetch(`${baseUrl}/recipes/${recipeId}`)
    .then(res => res.json())
}



