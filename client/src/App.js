import './App.css';

import { Route, Routes} from 'react-router-dom';

import Register from './components/Authentication/Register/Register';
import Home from './components/Home/Home.js';
import Login from './components/Authentication/Login/Login';
import User from './components/User/User';
import CreateRecipe from './components/Recipe/CreateRecipe/CreateRecipe';
import RecipesCatalog from './components/RecipesCatalog/RecipesCatalog';
import { useState, useEffect,useLayoutEffect } from 'react';
import Header from './components/Header/Header';
import Favourites from './components/Favourites/Favourites';
import PersonalList from './components/PersonalList/PersonalList';
import Footer from './components/Footer/Footer';
import { Navigate } from 'react-router-dom';
import Details from './components/Recipe/Details/Details';
import * as recipeService from './services/recipeService';
import EditRecipe from './components/EditRecipe/EditRecipe';
import DetailsUser from './components/Recipe/DetailsUser/DetailsUser';
import Logout from './components/Authentication/Logout/Logout';
import { NotificationProvider } from './contexts/NotificationContext';
import Notification from './common/Notification';
import { AuthContext } from './contexts/AuthContext';
import Navbar from './components/NavBar/NavBar';
import useLocalStorage from './hooks/useLocalStorage';
import ShareRecipes from './components/SharedRecipes/SharedRecipes';
import * as userService from './services/userService';
import DetailsShared from './components/Recipe/DetailsShared/DetailsShared';
import DetailsFavourite from './components/Recipe/DetailsFavourite/DetailsFavourite';


const initialAuthState = {
  _id: '',
  email: '',
  accessToken: '',
};


function App() {

  const [user,setUser] = useLocalStorage('user',initialAuthState);
  
  const onlogin = (authData) => {
    setUser(authData);
  }

  const onlogout = () => {
    setUser(initialAuthState);
  }


  

  const [recipes,setRecipes] = useState([]);
  const [recipessh,setRecipesh] = useState([]);
   
    useEffect(() => {
       
        recipeService.getAll()
        .then(result => {
            setRecipes(result);
        })
        .catch(err => {            
          console.log(err);
      });

    } ,[]);

    
    useLayoutEffect(() => {
       
       
            userService.getAll()
            .then(result => {
                setRecipesh(result);
            })
            .catch(err => {            
                console.log(err);
            });

    },[]);

 




  return (
    <AuthContext.Provider value={{user,onlogin,onlogout}}>
      <NotificationProvider>

    <div className="App">
      <Header/>
      <Notification />

      <main id = "main-content">
        <Routes>

        <Route path='/' element={<Home />}/>
        <Route path='/recipes' element={<RecipesCatalog recipes={recipes}/>}/>
        <Route path='/recipe-details/recipe-number::recipeId' element={<Details/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup'  element={<Register/>}/>

        <Route path='/logout' element={<Logout/>} />
        <Route path='/create-recipe' element={<CreateRecipe />}/>
        <Route path='/shared-recipes' element={<ShareRecipes   />}/>
        <Route path='/recipe-details-shared/recipe-number::recipeId' element={<DetailsShared recipessh={recipessh} />}/>
        <Route path='/recipe-details-your-favourite/recipe-number::recipeId' element={<DetailsFavourite/>}/>
        <Route path='/recipe-details-user-view/recipe-id::recipeId' element={<DetailsUser />}/>
        <Route path='/personal-list' element={<PersonalList />}/>
        <Route path='/favourites' element={<Favourites/>}/>
        <Route path='/user-profile-page' element={<User />}/>
        <Route path='/edit-recipe/:recipeId' element={<EditRecipe/>}/>
        <Route path="/logout" element={<Navigate to="/"/>}/>
       
        </Routes>
      </main>
  
      <Navbar/>
      <Footer/>
    </div>

    </NotificationProvider>
    </AuthContext.Provider>
  );
}

export default App;

