import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';


function emailReducer(state,action) {


  if(action.type === 'USER_INPUT'){
    return {value: action.val, isValid: action.val.includes('@')}
  }

  if(action.type === 'INPUT_BLUR'){
  return {value: state.value, isValid: state.value.includes('@')}}

return {value: '', isValid: false}
}


function passwordReducer(state,action) {


  if(action.type === 'USER_INPUT'){
    return {value: action.val, isValid: action.val.length >6}
  }

  if(action.type === 'INPUT_BLUR'){
  return {value: state.value, isValid: state.value.length >6}}

return {value: '', isValid: false}
}

const Login = (props) => {
  //const [enteredEmail, setEnteredEmail] = useState('');
  //const [emailIsValid, setEmailIsValid] = useState();
 // const [enteredPassword, setEnteredPassword] = useState('');
  //const [passwordIsValid, setPasswordIsValid] = useState();
 const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer,{ value:'', isValid:null,});
  const [passwordState, dispatchPassword] = useReducer(passwordReducer,{ value:'', isValid:null,});


  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('form validity')

    setFormIsValid(
     //enteredEmail.includes('@') && enteredPassword.trim().length > 6
     emailState.isValid && passwordState.isValid
    );

    },200);

    //needs to run before every side effect function execution but??
    return () =>{
    console.log('CLEAN')
    clearTimeout(identifier)
  };

  }, [ emailState, passwordState]) //rerun whenever these states change
  

  const emailChangeHandler = (event) => {
    //setEnteredEmail(event.target.value);

    dispatchEmail({type: 'USER_INPUT', val: event.target.value})
  
   /* setFormIsValid(
      //enteredEmail.includes('@') && enteredPassword.trim().length > 6
      event.tager.value.includes('@') && passwordState.isValid
     );*/

  };

  const passwordChangeHandler = (event) => {
    //setEnteredPassword(event.target.value);

    dispatchPassword({type: 'USER_INPUT', val:event.target.value})

   /* setFormIsValid(
      //enteredEmail.includes('@') && enteredPassword.trim().length > 6
      emailState.isValid && event.target.value.trim().length > 6
     );*/

  };

  const validateEmailHandler = () => {
    //setEmailIsValid(enteredEmail.includes('@'));
    //setEmailIsValid(emailState.isValid);
    dispatchEmail({type: 'INPUT_BLUR'})
  }; 
  const validatePasswordHandler = () => {
    //setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({type: 'INPUT_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    //props.onLogin(enteredEmail, enteredPassword);
    props.onLogin(emailState.value, passwordState.value); //doğru
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            //emailIsValid === false ? classes.invalid : ''
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            //value={enteredEmail}
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
