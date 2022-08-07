import "./RecipeFavourite.css";

import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useContext } from 'react';

import * as favouritesService from '../../../services/favouritesService';
import { AuthContext } from "../../../contexts/AuthContext";
import ConfirmDialog from "../../../common/ConfirmDialog";


const RecipeFavourite = ({recipe}) => {


    const {user} = useContext(AuthContext);
    const recipeId = recipe._id;
    const history = useNavigate();

    const [showDeleteDialog,setShowDeleteDialog] = useState(false);


    const onRemoveFavourite = (e) => {

        e.preventDefault();

        favouritesService.removeFavourite(recipeId, user.accessToken)
         .then(() => {
            history('/recipes');
        })
        .catch(err => {            
            console.log(err);
        });

    }

    const favouriteHandler = (e) => {
        e.preventDefault();
        setShowDeleteDialog(true);
    }




    return (
        <article className="articles">
             <ConfirmDialog show={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} onSave={onRemoveFavourite}></ConfirmDialog>
            <img className="img4" src={recipe.imageUrl}/>
            <h1>{recipe.name}</h1>
            <p className="cut-text">{recipe.instructions}</p>
            <div className="btns1">
            <Link  smooth= "true" className="btnd" to={`/recipe-details-your-favourite/recipe-number:${recipe._id}`}>Details</Link>
            <button className="favnon" onClick={favouriteHandler}><i className="fas fa-solid fa-heart-circle-minus"></i></button>
            </div>
        </article>
    );
};

export default RecipeFavourite;