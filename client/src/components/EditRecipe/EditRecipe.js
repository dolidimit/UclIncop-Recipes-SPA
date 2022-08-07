import "./EditRecipe.css";

import { Link, useParams, useNavigate } from 'react-router-dom';
import React, {  useLayoutEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';

import * as userService from "../../services/userService";
import useRecipeState from "../../services/RecipeState";


const EditRecipe = () =>  {


    const {recipeId} = useParams();
    const [recipe, setRecipe] = useRecipeState(recipeId);
    const [errors,setErrors] = useState({name: false});
    const history = useNavigate();


    const recipeEditSubmitHandler = (e) => {
        
        e.preventDefault();

        let recipeData = Object.fromEntries(new FormData(e.currentTarget))

        userService.update(recipe._id, recipeData);

        history('/personal-list');

    }

    const namecheckValid = (e) => {
        let currentname = e.target.value;

        if(currentname.length < 4 || currentname.length > 40) {
            setErrors(state => ({...state, name: 'Name should be between 4 and 40 characters.'}))
        }
        else {
            setErrors(state => ({...state, name: false}))
        }
    };

    const timecheckValid = (e) => {
        let currenttime = e.target.value;

        if(currenttime.length > 3 || currenttime.length == 0) {
            setErrors(state => ({...state, name: 'Time should be maximum 3 characters long.'}))
        }
        else {
            setErrors(state => ({...state, name: false}))
        }
    };






    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    });
    

    return (
        <div className = "maind">
            <section className="sec3">
            <button smooth="true" className="leavedeed" onClick={()=> history(-1)}><i class="fas fa-solid fa-circle-xmark"></i></button>
        <div>
           <h1 className="head">Edit "{recipe.name}"</h1>
           <form id="createform" method="POST" onSubmit={recipeEditSubmitHandler}>
            <label name="namel">Name</label>
            <input type="text" name = "name" id="name"  defaultValue={recipe.name} onChange={namecheckValid}/>
            <Alert variant="warning" show={errors.name}>{errors.name}</Alert>
            <label name="preptimel">Prep Time</label>
            <input type="text" name = "preptime" id="preptime" defaultValue={recipe.preptime} onChange={timecheckValid}/>
            <label name="timel">Cooking Time</label>
            <input type="text" name = "time" id="time" defaultValue={recipe.time} onChange={timecheckValid}/>
            <label name="url">Image Url</label>
            <input type="text" name = "imageUrl" id="imageUrl" defaultValue={recipe.imageUrl}/>
            <label name="timel">Servings</label>
            <input type="text" name = "servings" id="servings" defaultValue={recipe.servings}/>
            <label name="ingredl">Ingredients</label>
            <textarea  name = "ingredients" id="ingredients" defaultValue={recipe.ingredients}/>
            <label name="instl">Instructions</label>
            <textarea  name = "instructions" id="instructions" defaultValue={recipe.instructions}/>
            <button className="btnad" type="submit" history="/recipes">Edit</button>
            <Link smooth="true" className="leavebtn" to={`/personal-list`}>Cancel</Link>
           </form>
        </div>
    
    </section>
        </div>
    );
}

export default EditRecipe;