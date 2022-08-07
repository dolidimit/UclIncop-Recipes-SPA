import "./Details.css";

import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useLayoutEffect, useState } from 'react';

import * as recipeService from "../../../services/recipeService";


const Details = () =>  {

    const [recipe,setRecipe] = useState({}); 
    const {recipeId} = useParams();
    
    const history = useNavigate();


    const recipesd = async () => {
        let reciperes =   await recipeService.getOne(recipeId);

        console.log(reciperes);
        setRecipe(reciperes);
    };

    useEffect(() => { recipesd(recipe); },[]);






    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    });
    

    return (
        <div>
    <section className="sec11">
        <h1>{recipe.name}</h1>
        <button smooth="true" className="leavede" onClick={()=> history(-1)}><i class="fas fa-solid fa-circle-xmark"></i></button>
        <article className="main">
            <article className="artsmde">
                <h4>Ingredients</h4>
                <p className="ingre">
                    {recipe.ingredients}
                </p>
            </article>
            <article className="artm">
                <img src={recipe.imageUrl}/>
                <hr/>
                <h4>{recipe.name}</h4>
                <p>Prep Time: {recipe.preptime}min</p>
                <p>Cooking Time: {recipe.time}min</p>
                <p>Servings: {recipe.servings}</p>
                <p className="cut-text">{recipe.instructions}</p>
            </article>
            <article className="artsmde">
                <h4>Instructions</h4>
                <p className="inst">
                    {recipe.instructions}
                </p>
            </article>
        </article>
        <button className="gob" onClick={()=> history(-1)}><i class="fas fa-solid fa-arrow-left-long"></i></button>
    </section>
        </div>
    );
}

export default Details;