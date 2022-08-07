import "./User.css";

import { useState, useEffect ,useContext} from 'react';
import React, { useLayoutEffect } from 'react';

import RecipePersonalModel from "../Recipe/RecipePersonalModel/RecipePersonalModel";
import * as userService from '../../services/userService';
import { AuthContext } from "../../contexts/AuthContext";



const User = () => {
  
    const {user} = useContext(AuthContext);

    const [recipes,setRecipes] = useState([]);
    const recipc = recipes.length;


    useEffect(() => {
        userService.ownRecipes(user._id)
            .then(recipeResult => {
                setRecipes(recipeResult);
            })
            .catch(err => {            
                console.log(err);
            });
    }, []);

    
    


    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    });


    return (
        <div>
              <section className="sec12">
        <article className="artsm">
            <h2 className="headinu">{user.email}</h2>
            <img className = "imgi" src="https://www.shareicon.net/download/2016/09/01/822751_user_512x512.png"/>
            <p className="inst">
                Why is it important to cook?
            </p>
            <p className="inst">
                In summary, cooking skills may help people to meet nutrition guidelines 
                in their daily nutrition supply. They allow people to make healthier food choices. It is, therefore, 
                important to teach children and teenagers how to cook and to encourage 
                them to develop their cooking skills.
            </p>
            <h4>Your have created: {recipc} recipes</h4>
            <h4>The last three recipes you have created.</h4>
            <i className="fas fa-solid fa-arrow-down"></i>
        </article>
    
    <article className="ownreci">
      {recipes.slice(-3).map(x => <RecipePersonalModel key ={x._id} recipe={x}/>)}
    </article>
   
    </section>
        </div>

    );
}

export default User;