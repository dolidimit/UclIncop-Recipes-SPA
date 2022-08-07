import "./CreateRecipe.css";

import { useNavigate } from 'react-router-dom';
import React, { useLayoutEffect, useState,useContext } from 'react';
import { Alert } from 'react-bootstrap';

import { AuthContext } from "../../../contexts/AuthContext";
import * as userService from '../../../services/userService';


const CreateRecipe = () => {


    const {user} = useContext(AuthContext);
    const [errors,setErrors] = useState({name: false});
    const history = useNavigate();

   

    const onCreateRecipe = (e) => {

        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const name = formData.get('name');
        const preptime = formData.get('preptime');
        const time = formData.get('time');
        const imageUrl = formData.get('imageUrl');
        const servings = formData.get('servings');
        const ingredients = formData.get('ingredients');
        const instructions = formData.get('instructions');
        const publicp = formData.get('public');



        userService.create({
            name,
            preptime,
            time,
            imageUrl,
            servings,
            ingredients,
            instructions,
            publicp
        },user.accessToken)
         .then(result => {
            console.log(result);
            history('/personal-list');
        })
         .catch(err => {            
            console.log(err);
        });

    };


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
        <div className = "maind2">
            <section className="seccre">
            <button smooth="true" className="leavede" onClick={()=> history(-1)}><i class="fas fa-solid fa-circle-xmark"></i></button>
        <div>
           <h1>Add Your Recipe</h1>
           <form id="createform" onSubmit={onCreateRecipe} method="POST">
            <label name="namel">Name</label>
            <input type="text" name = "name" id="name" placeholder="   . . . ." onChange={namecheckValid}/>
            <Alert variant="warning" show={errors.name}>{errors.name}</Alert>
            <label name="preptimel">Prep Time</label>
            <input type="text" name = "preptime" id="preptime" placeholder="   . . . ." onChange={timecheckValid}/>
            <label name="timel">Cooking Time</label>
            <input type="text" name = "time" id="time" placeholder="   . . . ." onChange={timecheckValid}/>
            <label name="url">Image Url</label>
            <input type="text" name = "imageUrl" id="imageUrl" placeholder="   . . . ."/>
            <label name="timel">Servings</label>
            <input type="text" name = "servings" id="servings" placeholder="   . . . ."/>
            <label name="ingredl">Ingredients</label>
            <textarea  name = "ingredients" id="ingredients" placeholder=" . . . ." />
            <label name="instl">Instructions</label>
            <textarea  name = "instructions" id="instructions" placeholder=" . . . ."/>
            <label name="publicv">Public</label>
            <input type="text" name = "public" id="public" placeholder="   yes / no"/>
            <span>(Writing "yes" in the public field, will allow us to display your recipe in the Shared recipes page.)</span>
            <button className="btnad2" type="submit">Add</button>
           </form>
           <button className="gob3" onClick={()=> history(-1)}><i class="fas fa-solid fa-arrow-left-long"></i></button>
        </div>
    
    </section>
        </div>
    );
}

export default CreateRecipe;