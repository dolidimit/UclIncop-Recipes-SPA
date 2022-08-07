import "./Favourites.css";

import React, { useLayoutEffect, useState , useEffect, useContext } from 'react';

import RecipeFavourite from "../Recipe/RecipeFavourite/RecipeFavourite";
import * as favouritesService from '../../services/favouritesService';
import { AuthContext } from "../../contexts/AuthContext";
import ErrorPage from "../ErrorPage/ErrorPage";


function Favourites() {


    const [favourites,setFavourites] = useState([]);
    const {user} = useContext(AuthContext);

    useEffect(() => {

        setTimeout(() => {
            favouritesService.userFavourites(user._id)
            .then(result => {
                setFavourites(result);
            })
            .catch(err => {            
                console.log(err);
            });

        },300)
    
    },[]);





    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    });


    return (
        <div>
            <h1 className = "h1m">Your Favourite Recipes</h1>

            <section className="secfav">
          
                {
                   favourites.length > 0
                        ? <>
                            {favourites.map(x => <RecipeFavourite key ={x._id} recipe={x} />)}
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

export default Favourites;
