import "./RecipeModel.css";

import { Link, useNavigate} from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';

import * as favouritesService from '../../../services/favouritesService';
import { AuthContext } from "../../../contexts/AuthContext";
import { useNotificationContext, types } from '../../../contexts/NotificationContext';



const RecipeModel = ({recipe}) => {

    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    const {recipeId} = recipe._id;

    const [favourites,setFavourites] = useState([]);
    const { addNotification } = useNotificationContext();


    useEffect(() => {
        
        favouritesService.userFavourites(user._id)
        .then(result => {
            setFavourites(result);
        })
        .catch(err => {            
            console.log(err);
        });

    },[]);


        const HandleFavourite = (e) =>  {

            e.preventDefault();

            console.log(`Recipe ${recipeId}`);
         

                const name = recipe.name;
                const preptime = recipe.preptime;
                const time = recipe.time;
                const imageUrl = recipe.imageUrl;
                const servings = recipe.servings;
                const ingredients = recipe.ingredients;
                const instructions = recipe.instructions;
                
                    if(favourites.some(x => x.name === name)) {
                            addNotification('You already added the recipe to your favourites list.)', types.warn);     
                    }

                    else {

                        favouritesService.addFavourite({
                            name,
                            preptime,
                            time,
                            imageUrl,
                            servings,
                            ingredients,
                            instructions
                        },user.accessToken)
                         .then(result => {
                            console.log(result);
                            navigate('/favourites');
                        })

    
                    }

        }




    return (
        <article className="articles">
            <img className="img2" src={recipe.imageUrl}/>
            <h1>{recipe.name}</h1>
            <p className="cut-text">{recipe.instructions}</p>
            <div className="btns1">
            <Link  smooth= "true" className="btnd" to={`/recipe-details/recipe-number:${recipe._id}`}>Details</Link>
        
                {
                   user.email
                        ? <button className="favour" onClick={HandleFavourite}><i className="fas fa-solid fa-heart-circle-plus"></i></button>
                        : null
                }
                
           
            </div>
        </article>
    );

};

export default RecipeModel;