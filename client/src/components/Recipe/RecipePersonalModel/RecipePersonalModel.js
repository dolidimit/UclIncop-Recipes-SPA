import './RecipePersonalModel.css';

import { Link, useNavigate} from 'react-router-dom';
import React, { useState, useContext, useEffect } from 'react';

import * as userService from "../../../services/userService";
import ConfirmDialog from '../../../common/ConfirmDialog';
import { AuthContext } from '../../../contexts/AuthContext';


const RecipePersonalModel  = ({recipe}) => {


    const navigate = useNavigate();
    const recipeId = recipe._id;
    const [showDeleteDialog,setShowDeleteDialog] = useState(false);
    const {user} = useContext(AuthContext);
    const [persl,setPersl] = useState([]);
   

    const deleteHandler = (e) => {

        e.preventDefault();

        userService.remove(recipeId,user.accessToken)
            .then(() => {
                navigate('/user-profile-page');
            })
            .catch(err => {            
                console.log(err);
            });
    };


    

    useEffect(() => {

        userService.ownRecipes(user._id)
            .then(recipeResult => {
                setPersl(recipeResult);
            })
            .catch(err => {            
                console.log(err);
            });

    }, []);

    
    const clickHandler = (e) => {
        e.preventDefault();

        setShowDeleteDialog(true);
    }





    return (
        <article className='articles'>
        <ConfirmDialog show={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} onSave={deleteHandler}></ConfirmDialog>
        <img className="img2" src={recipe.imageUrl}/>
        <h1>{recipe.name}</h1>
        <p className="cut-text">
            {recipe.instructions}
        </p>
            <div className="btns4">
            <Link  smooth= "true" className="detbtn" to={`/recipe-details-user-view/recipe-id:${recipe._id}`}>Details</Link>
            <Link smooth= "true" className="edbtn" to={`/edit-recipe/${recipe._id}`}>Edit</Link>
            <button smooth= "true" className="deletebp" onClick={clickHandler}>Delete</button>
        </div>
    </article>
       
    );
};

export default RecipePersonalModel;