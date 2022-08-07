import "./Home.css";

import React, { useLayoutEffect, useState, useEffect } from 'react';

import * as recipeService from "../../services/recipeService";
import RecipeModel from "../Recipe/RecipeModel/RecipeModel";


const Home = () =>  {


    const [recipes,setRecipes] = useState([]);

    useEffect(() => {

        recipeService.getAll()
        .then(result => {
            setRecipes(result);
        })
        .catch(err => {            
            console.log(err);
        });

    },[]);

    



    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    });


    return (
        <div className = "mainds">
            <div className = "mainds">
              <h1 className="welcome">Welcome to UclIncop Recipes!</h1>
              <hr className="hrt"/>
              <h2 className="headper">Your personal recipe book.</h2>
     <article className="roword">
       <img  className="homeim" src ="https://hips.hearstapps.com/hmg-prod/images/delish-200114-baked-avocado-boats-0361-landscape-pflo-jpg-1647890967.jpg"/>
       <img className="imgh2" src="https://lh3.googleusercontent.com/p82p6mZjHu2Ch2XTBqw5s23-_60Fw84uzh0Fon-C1a5TvPxu7sPqfxsKBgHeYc9mx4kEJ7aEbbgOdQRBZKAMLz6UlRXmuzkjWg=w1667-h1250-c-rj-v1-e365"/>
       <img className="img4fr" src="https://i.guim.co.uk/img/media/b95032d90ac08c4ab9993238e3bf1ff7396b4d10/0_0_3555_4177/master/3555.jpg?width=620&quality=85&fit=max&s=b4026f1a9c1749a6d63de05fcc967540"/>
       <img  className="homeim2" src ="https://assets.bonappetit.com/photos/608983855799229a8ef966d3/4:3/w_1956,h_1467,c_limit/Go-Live-Thai-Roast-Chicken.jpg"/>
       <img className="iimg3" src = "https://www.bibbyskitchenat36.com/wp-content/uploads/2022/07/DSC_5686-510x640.jpg?x69959"/>
     </article>
        </div>
    <p className="textp">
        <h2>Thai Roast Chicken Thighs With Coconut Rice</h2>
    Chicken thighs marinated in coconut milk, lime juice, and fish sauce give this one-skillet meal plenty of umami. 
    Lining the skillet with cabbage wedges allows them to catch every drop of the rich juices as they become melt-in-your-mouth 
    tender. While the chicken roasts, there is plenty of time to make fragrant rice with the leftover coconut milk and slices of ginger. 
    This dish was inspired by the rotisserie chicken from the now closed Uncle Boon’s, one of my favorite restaurants in New York. 
    They had it on rotating spits with heads of cabbage to catch all the juices. This at 
    home version with thighs is a more approachable way to highlight all those good flavors. —Diana Yen

    <p>Arrange chicken on a platter; drizzle with reserved marinade and top with cilantro leaves. Serve with coconut rice and lime wedges for squeezing over.</p>
        </p>
        <article class="rowbreakor">
        {recipes.slice(-4).map(x => <RecipeModel key ={x._id} recipe={x}/>)}
        </article>
        </div>
    );
}

export default Home;