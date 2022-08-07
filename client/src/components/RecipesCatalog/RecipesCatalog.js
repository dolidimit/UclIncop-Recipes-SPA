import "./RecipesCatalog.css";

import React, { useLayoutEffect } from 'react';

import RecipeModel from "../Recipe/RecipeModel/RecipeModel";


const RecipesCatalog = ({recipes}) => {


    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    });


    return (
        <div>
           <section className="sec4">
              {recipes.map(x => <RecipeModel key ={x._id} recipe={x}/>)}
           </section>
        </div>
    );

}

export default RecipesCatalog;