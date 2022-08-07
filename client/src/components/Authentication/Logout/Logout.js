import './Logout.css';

import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';

import * as authService from '../../../services/authService';


const Logout = () => {
    
    const {user,onlogout} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        authService.logout(user.accessToken)
        .then(()=> {

            onlogout();
            navigate('/');

        })
        .catch(err => {            
            console.log(err);
        });
    },[])
    
    return null;
};



export default Logout;
