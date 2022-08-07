import "./RecipeShared.css";

import { Link} from 'react-router-dom';
import React, { useEffect, useContext } from 'react';

import { AuthContext } from "../../../contexts/AuthContext";
import * as likeService from '../../../services/likeService';
import useRecipeState from "../../../services/RecipeState";
import { useNotificationContext, types } from '../../../contexts/NotificationContext';


const RecipeShared = ({recipe}) => {


    const {user} = useContext(AuthContext);
    const recipeId = recipe._id;
    const [recipel,setRecipe] = useRecipeState(recipeId);
    const { addNotification } = useNotificationContext();
   
    
 
     useEffect(() => {

        likeService.getLikes(recipeId)
            .then(likes => {
                setRecipe(state => ({...state, likes}))
            })
            .catch(err => {            
                console.log(err);
            });

    }, [{}]);


    


     const likeButtonClick = () => {

        if (user._id === recipel._ownerId) {
            return;
        }

        if (recipel.likes.includes(user._id)) {
            addNotification(`You already liked ${recipel.name} !)`, types.warn);
            return;
        }

        likeService.like(user._id, recipeId)

            .then(() => {
                setRecipe(state => ({...state, likes: [...state.likes, user._id]}));
                addNotification(`You liked ${recipel.name} !)`, types.warn);
            })
            .catch(err => {            
                console.log(err);
            });

        
    };


   
   


    return (
        <article className="articles">
            <img className="img2" src={recipe.imageUrl}/>
            <h1>{recipe.name}</h1>
            <p className="cut-text">{recipe.instructions}</p>
            <div className="btns1">
            <Link  smooth= "true" className="btnd" to={`/recipe-details-shared/recipe-number:${recipe._id}`}>Details</Link>

            {
                user._id && (user._id != recipel._ownerId)

                ? <>
                   <button className="like" onClick={likeButtonClick} ><i className="fas fa-solid fa-thumbs-up"></i> {recipel.likes?.length || 0}</button>
                  </>
                
                : null
            }
            
  
            </div>
        </article>
    );
};

export default RecipeShared;