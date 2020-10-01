import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import { updateObject } from '../../utils/utility';
import { checkValidity } from '../../utils/validity';

const errorMessageMap = {
    'EMAIL_EXISTS': 'The email address is already in use by another account.',
    'OPERATION_NOT_ALLOWED': 'Password sign-in is disabled for this project.',
    'TOO_MANY_ATTEMPTS_TRY_LATER': 'We have blocked all requests from this device due to unusual activity. Try again later.',
    'EMAIL_NOT_FOUND': 'There is no user record corresponding to this email.',
    'INVALID_PASSWORD': 'The password is invalid.',
    'USER_DISABLED': 'The user account has been disabled by an administrator.'
}

const auth = props => {
    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'E-Mail Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false,
            label: 'email'
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false,
            label: 'password'
        }
    });

    const [isSignedUp, setIsSignedUp] = useState(true);

    useEffect(() => {
        if (!props.buildingBurger && props.authRedirectPath !== "/") {
            props.onSetAuthRedirectPath();
        }
    }, []);

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(
            controls, {
            [controlName]: updateObject(
                controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation),
                touched: true
            })
        });

        setControls(updatedControls);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignedUp);
    }

    const switchModeHandler = () => {
        setIsSignedUp(!isSignedUp);
    }

    const formElementsArray = [];
    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key]
        })
    }

    let form = formElementsArray.map(formElement => (
        <Input
            key={formElement.id}
            label={formElement.config.label}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event) => inputChangedHandler(event, formElement.id)}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
        />
    ));

    if (props.loading) {
        form = <Spinner />;
    }

    let errorMessage = null;

    if (props.error) {
        errorMessage = (
            <p>{errorMessageMap[props.error.message]}</p>
        )
    }

    let authRedirect = null;

    if (props.isAuth) {
        authRedirect = <Redirect to={props.authRedirectPath} />;
    }

    return (
        <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Success">Submit</Button>
            </form>
            <Button btnType="Danger" clicked={switchModeHandler}>
                Switch to {isSignedUp ? 'Sign In' : 'Sign Up'}
            </Button>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignedUp) => dispatch(actions.auth(email, password, isSignedUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(auth);