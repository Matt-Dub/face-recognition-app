import { useState } from 'react';

function Register ( { onRouteChange, loadUser } ) {

    const [ name, setName] = useState('');
    const [ email, setEmail] = useState('');
    const [ password, setPassword] = useState('');
    const [ displayError, setDisplayError] = useState('');

    const onNameChange = (event) => {
        setName(event.target.value);
    }

    const onEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const onSubmitRegister = () => {
        if(name !== '' && email !== '' && password !== '') {
            fetch('http://localhost:3000/register', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
                })
                .then(response => response.json())
                .then(user => {
                    if(user) {
                        loadUser(user);
                        onRouteChange('home');
                    } else {
                        setDisplayError('Something went wrong...')
                    }
            })
        } else {
            setDisplayError('Fields must not be empty');
        }

        
    }

    return (
        <div className="br3 ba light-gray b--black-20 mv4 w-25-l mw6 center shadow-5 pa5 flex justify-center flex-column bg-black-10">
            <div className='flex justify-center flex-column'>
                <fieldset id="register" className="ba b--transparent ph0 mh0 ">
                <legend className="f2 fw6 ph0 mh0 w-100 tc">Register</legend>
                <div className="form-field-container">
                    <label className="form-lbl" htmlFor="username">Name</label>
                    <input className="form-field"
                    type="text"
                    name="username"
                    id="register-name"
                    onChange={onNameChange} />
                </div>
                <div className="form-field-container">
                    <label className="form-lbl" htmlFor="email-address">Email</label>
                    <input className="form-field"
                    type="email"
                    name="email-address"
                    id="register-email"
                    onChange={onEmailChange} />
                </div>
                <div className="form-field-container">
                    <label className="form-lbl" htmlFor="password">Password</label>
                    <input className="form-field"
                    type="password"
                    name="password"
                    id="register-password"
                    onChange={onPasswordChange} />
                </div>
                </fieldset>
                <div>
                    <input
                        className="form-btn"
                        type="button"
                        value="Register"
                        onClick={onSubmitRegister} />
                </div>
                <div className="lh-copy mt3">
                    <p className="form-link-s" onClick={() => onRouteChange('signin')}>Sign In →</p>
                </div>
                <div className='error-msg-wrapper'>
                    <p className="error-msg">{displayError}</p>
                </div>
            </div>
        </div>
    )
}

export default Register;