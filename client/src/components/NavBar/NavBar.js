import './NavBar.css';

import { Link } from 'react-router-dom';
import { useContext} from 'react';

import { AuthContext } from "../../contexts/AuthContext";


const Navbar = () => {

    const {user} = useContext(AuthContext);


    const scrollToTop = () => {
        window.scrollTo(0, 0)
    }

 
    let navbar = (
      <ul>
        <li><Link smooth= "true" to="/"><i className="fas fa-solid fa-book-bookmark"></i></Link>Home</li>
        <li><Link smooth= "true" to="/recipes"><i className="fas fa-thin fa-bowl-rice"></i></Link>Recipes</li>
        <li><Link smooth= "true" to="/personal-list"><i className="fas fa-solid fa-list-ul"></i></Link>Your Recipes</li>
        <li><Link smooth= "true" to="/favourites"><i className="fa-solid fa-heart"></i></Link>Favourites</li>
        <li><Link smooth= "true" to="/create-recipe"><i className="fas fa-solid fa-plus"></i></Link>Add Recipe</li>
        <li><Link smooth= "true" to="/user-profile-page"><i className="fas fa-solid fa-user"></i></Link>Your Profile</li>
        <li><Link smooth= "true" onClick={scrollToTop} to="#"><i class="fas fa-solid fa-arrow-up"></i></Link>Up</li>
      </ul>
    );


    return (
       <section className="sec5navl">

                {
                   user.email
                        ? navbar
                        : null  
                }

        </section>
      
    );
}

export default Navbar;