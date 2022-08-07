import "./Login.css";

import { useNavigate } from 'react-router-dom';
import React, { useContext, useLayoutEffect, useState } from 'react';
import { Icon } from 'react-icons-kit';
import {eye} from 'react-icons-kit/feather/eye';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';

import * as authService from '../../../services/authService';
import { AuthContext } from '../../../contexts/AuthContext';
import * as validator from '../../../utils/authValidator';
import { Alert } from 'react-bootstrap';


const Login = () => {

    const {onlogin} = useContext(AuthContext);

    const navigate = useNavigate();
    const [errors,setErrors] = useState({name: false});
    let emailinv = false;
    let passwordinv = false;

    const [type, setType]=useState('password');
    const [icon, setIcon]=useState(eyeOff);


    
    const handleToggle=()=>{    
      if(type==='password'){
        setIcon(eye);      
        setType('text');
       }
       else{
        setIcon(eyeOff);     
        setType('password');
       }
     }


    
    const onLoginHandler = (e) => {

        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        let email = formData.get('email');
        let password = formData.get('password');

        authService.login(email,password)
        .then((authData) => {
            
            onlogin(authData);

            navigate('/');

        })
        .catch(err => {            
            console.log(err);
        });
       
    }


    
    const emailcheckValid = (e) => {
        let currentemail = e.target.value;

        if(validator.validEmail(currentemail) !== '' || currentemail.length < 10) {
            emailinv=true;
            setErrors(state => ({...state, name: 'Email should be at least 10 characters long and contain "@" character.'}))
        }
        else {
            setErrors(state => ({...state, name: false}))
        }
      };

      const passwordcheckValid = (e) => {
        let currentpassword = e.target.value;

        if( currentpassword.length < 8 ) {
            passwordinv=true;
            setErrors(state => ({...state, name: 'Password should be at least 8 characters long.'}))
        }
        else {
            setErrors(state => ({...state, name: false}))
        }
      };





      
    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    });


    return (
        <div>
    <section className="sec9">
        <form onSubmit={onLoginHandler} method="POST">
        <h1>Log In</h1>
        <p className='form'>
        <h2 className="backw">Welcome back!</h2>
         <label className="email">Email</label>
            <span className="email">
            <input type="email" name = "email" id = "email" onChange={emailcheckValid}/>
            </span>
            <label className="password">Password</label>
            <span className="password">
            <input  type={type} name = "password" id = "password" onChange={passwordcheckValid}/>
            <span onClick={handleToggle}><Icon icon={icon} size={25}/></span>
            {
                passwordinv=true
                ?  <Alert variant="dark" show={errors.name}>{errors.name}</Alert>
                : null
            }
            </span>
            <button className="btnlog" type = "submit">Log in</button> 
            <span>
            Thank you, enjoy your UclIncop journey!
            </span>
            <i className="fas fa-thin fa-book-bookmark lo"></i>
        </p>
        </form>
    </section>
        </div>
    );
};

export default Login;
