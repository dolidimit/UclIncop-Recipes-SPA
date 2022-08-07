import "./DetailsUser.css";

import { Link, useParams, useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';

import ConfirmDialog from "../../../common/ConfirmDialog";
import * as userService from '../../../services/userService';
import { AuthContext } from "../../../contexts/AuthContext";


const DetailsUser = () =>  {

    const [recipe,setRecipe] = useState({}); 
    const {recipeId} = useParams();
    const [showDeleteDialog,setShowDeleteDialog] = useState(false);

    const {user} = useContext(AuthContext);
    const history = useNavigate();


    const recipesd = async () => {
        let reciperes =   await userService.getOne(recipeId);

        console.log(reciperes);
        setRecipe(reciperes);
    };

    useEffect(() => { recipesd(recipe); },[]);



    const deleteHandler = (e) => {

        e.preventDefault();

        userService.remove(recipeId, user.accessToken)
            .then(() => {
                history(-1);
            })
            .finally(() => {
                console.log(`Deleted ${recipeId}`);
                setShowDeleteDialog(false);
            })

    };

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
            <ConfirmDialog show={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} onSave={deleteHandler}></ConfirmDialog>
       <section className="sec11">
        <h1>{recipe.name}</h1>
        <button smooth="true" className="leavede" onClick={()=> history(-1)}><i class="fas fa-solid fa-circle-xmark"></i></button>
        <article className="main">
            <article className="artsm">
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
                <p>Servings: {recipe.servings} </p>
                <p className="cut-text">{recipe.instructions}</p>
                <Link smooth= "true" className="editb" to={`/edit-recipe/${recipe._id}`}>Edit</Link>
                <button smooth= "true" className="deleteb" onClick={deleteclickHandler}>Delete</button>
            </article>
            <article className="artsm">
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

export default DetailsUser;