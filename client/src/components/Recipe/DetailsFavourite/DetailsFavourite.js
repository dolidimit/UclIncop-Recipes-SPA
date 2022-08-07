import "./DetailsFavourite.css";

import { useParams, useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';

import * as favouritesService from "../../../services/favouritesService";
import { AuthContext } from '../../../contexts/AuthContext';
import ConfirmDialog from "../../../common/ConfirmDialog";


const DetailsFavourite = () =>  {

    const [recipe,setRecipe] = useState({}); 
    const {recipeId} = useParams();
    const {user} = useContext(AuthContext);
    const history = useNavigate();
    const [showDeleteDialog,setShowDeleteDialog] = useState(false);


    const recipesd = async () => {
        let reciperes =   await favouritesService.getOneFav(recipeId);

        console.log(reciperes);
        setRecipe(reciperes);
    };

    useEffect(() => { recipesd(recipe); },[]);


    
    const onRemoveFavourite = (e) => {

        e.preventDefault();

        favouritesService.removeFavourite(recipeId,user.accessToken)
         .then(result => {
            console.log(result);
            history('/favourites');
        })
        .finally(() => {
            console.log(`Deleted ${recipeId}`);
        })
    }

    const deleteclickHandler = (e) => {
        e.preventDefault();
        console.log(process.env.NODE_ENV);
        setShowDeleteDialog(true);
    }


    

    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    });


    return (
        <div>
        <ConfirmDialog show={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} onSave={onRemoveFavourite}></ConfirmDialog>
      <section className="sec11">
        <h1>{recipe.name}</h1>
        <button smooth="true" className="leavedef" onClick={()=> history(-1)}><i class="fas fa-solid fa-circle-xmark"></i></button>
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
                <button className="favnon" onClick={deleteclickHandler}><i className="fas fa-solid fa-heart-circle-minus"></i></button>
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

export default DetailsFavourite;