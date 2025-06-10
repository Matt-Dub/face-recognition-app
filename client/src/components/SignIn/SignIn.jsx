import { useState } from 'react';

function SignIn ({ onRouteChange, loadUser }) {

    const [ email, setEmail] = useState('');
    const [ password, setPassword] = useState('');
    const [ displayError, setDisplayError] = useState('');

    const onEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const onSubmitSignIn = () => {

        if(!email) {
            return setDisplayError('Email address is missing...');
        }

        if(!password) {
            return setDisplayError('Please enter your password...');
        }

        fetch('http://localhost:3000/signing', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user.id){ // does the user exist? Did we receive a user with a property of id?
                loadUser(user);
                onRouteChange('home');
            } else {
                setDisplayError('Wrong Credentials...');
            }
        })
        
    }

    return (
        <div className="br3 ba light-gray b--black-20 mv4 w-25-l mw6 center shadow-5 pa5 flex justify-center flex-column bg-black-60">
            <div className='flex justify-center flex-column'>
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0 ">
                <legend className="f2 fw6 ph0 mh0 w-100 tc">Sign In</legend>
                <div className="form-field-container">
                    <label className="form-lbl" htmlFor="email-address">Email</label>
                    <input
                        className="form-field"
                        type="email"
                        name="email-address"
                        id="email-address"
                        onChange={onEmailChange}
                        />
                </div>
                <div className="form-field-container">
                    <label className="form-lbl" htmlFor="password">Password</label>
                    <input
                        className="form-field"
                        type="password"
                        name="password"
                        id="password"
                        onChange={onPasswordChange}
                        />
                </div>
                </fieldset>
                <div>
                    <input
                        className="form-btn"
                        type="button"
                        value="Sign in"
                        onClick={onSubmitSignIn} />
                </div>
                <div className="lh-copy mt3">
                    <p className="form-link-s" onClick={() => onRouteChange('register')}>Register →</p>
                </div>
                <div className='error-msg-wrapper'>
                    <p className="error-msg">{displayError}</p>
                </div>
            </div>
        </div>
    )
}

export default SignIn;