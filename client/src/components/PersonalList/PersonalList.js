import "./PersonalList.css";
import "../ErrorPage/ErrorPage.css";

import React, { useLayoutEffect, useState,useEffect,useContext } from 'react';

import RecipePersonalModel from "../Recipe/RecipePersonalModel/RecipePersonalModel";
import { AuthContext } from "../../contexts/AuthContext";
import * as userService from '../../services/userService';
import ErrorPage from '../../components/ErrorPage/ErrorPage';


const PersonalList = () => {


    const [recipes,setRecipes] = useState([]);
    const {user} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    
        useEffect(() => {
          setIsLoading(true);
          setTimeout(() => {
            userService.ownRecipes(user._id)
            .then(recipeResult => {
                setRecipes(recipeResult);
                setIsLoading(false);
            })
            .catch(err => {            
                console.log(err);
            });
          }, 300);

        }, []);
    
 


        useLayoutEffect(() => {
            window.scrollTo(0, 0)
        });

    return (
        <div>
            <h1>Your Recipes</h1>
            <section className="secper">

                {
                   recipes.length > 0
                        ? 
                        <>  
                        {recipes.map(x => <RecipePersonalModel key ={x._id} recipe={x}/>)}
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

export default PersonalList;