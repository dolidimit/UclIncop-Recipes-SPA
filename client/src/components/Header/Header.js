import './Header.css';

import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';


const Header = () => {


    const {user} = useContext(AuthContext);


    let guestnav = (
        <div className='btnsign'>
        <button className="btnsig"> <Link smooth= "true" to="/signup">Sign up</Link></button>
        <button className="btnlin"> <Link smooth= "true" to="/login">Log in</Link></button>
        </div>
    );

    let usernav = (
        <div className='userl'>
            <div className='navlinks'>
             <Link  smooth= "true" to="/shared-recipes">Shared Recipes</Link>
             <Link  smooth= "true" to="/favourites">Favourites</Link>
             <Link  smooth= "true" to="/personal-list">Personal List</Link>
             <Link  smooth= "true" to="/create-recipe">Create Recipe</Link>
            </div>
        <div className='btnlogb'>
        <Link  smooth= "true" className='userl' to="/user-profile-page"><i class="fas fa-solid fa-user"></i>Your Profile</Link>
        <button className="btnlout"> <Link smooth= "true" to="/logout">Log out</Link></button>
        </div>
        
        </div>
    );


    return (
        <div>
         <header className="header">
            <nav className="nav2">
                <i class="fas fa-thin fa-book-bookmark"></i>
 
                <Link  smooth= "true" to="/">Home</Link>
                <Link  smooth= "true" to="/recipes">Recipes</Link>
                
                {
                   user.email
                        ? usernav
                        : guestnav  
                }
               
        </nav>
        </header>
        
        </div>
    );
};

export default Header;