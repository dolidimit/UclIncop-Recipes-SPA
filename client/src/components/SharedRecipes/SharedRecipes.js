import './SharedRecipes.css';

import { useParams } from 'react-router-dom';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';

import * as userService from "../../services/userService";
import RecipeShared from '../Recipe/RecipeShared/RecipeShared';
import { AuthContext } from '../../contexts/AuthContext';
import ErrorPage from '../ErrorPage/ErrorPage';


const SharedRecipes = () => {
    

    const [recipe,setRecipe] = useState([]);
    const {recipeId} = useParams();
    const {user} = useContext(AuthContext);
    const [recipessh,setRecipessh] = useState([]);
   


    const recipesd = async () => {
        let reciperes =   await userService.getOne(recipeId);

        console.log(reciperes);
        setRecipe(reciperes);
    };

    useEffect(() => { recipesd(recipe); },[]);


    
    useLayoutEffect(() => {
       
        setTimeout(() => {
            userService.getAll()
            .then(result => {
                setRecipessh(result);
            })
            .catch(err => {            
                console.log(err);
            });
        },300)

    },[]);



 

    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    });


    return (
        <div>
           <h1>Shared Recipes</h1>
           <section className="sec4">

                {
                   recipessh.length > 0
                        ? <>
                            {recipessh.filter(x=>x._ownerId!=user._id && x.publicp=="yes").map(x => <RecipeShared key ={x._id} 
                            recipe={x} /> )}
                          </>
                        : <div className="errorpaper">
                             <h1>. . . . .</h1>
                             <ErrorPage/>
                           </div> 
                }


    </section>
        </div>
    );
}

export default SharedRecipes;