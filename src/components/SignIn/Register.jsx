import React from 'react';

function Register ({onRouteChange}) {
    return (
        <div className="br3 ba light-gray b--black-20 mv4 w-25-l mw6 center shadow-5 pa5 flex justify-center flex-column bg-black-10">
            <div className='flex justify-center flex-column'>
                <fieldset id="register" className="ba b--transparent ph0 mh0 ">
                <legend className="f4 fw6 ph0 mh0 w-100 tc">Register</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6 tc" htmlFor="name">Name</label>
                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="name" name="name"  id="register-name" />
                </div>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6 tc" htmlFor="email-address">Email</label>
                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="register-email" />
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6 tc" htmlFor="password">Password</label>
                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="register-password" />
                </div>
                </fieldset>
                <div>
                    <input
                        className="w-100 b ph3 pv2 input-reset ba white-80 bg-transparent grow pointer f6 dib"
                        type="submit"
                        value="Sign in"
                        onClick={() => onRouteChange('home')} />
                </div>
                <div className="lh-copy mt3">
                    <p className="f6 link dim white-50 db tc pointer" onClick={() => onRouteChange('signin')}>Sign In</p>
                </div>
            </div>
        </div>
    )
}

export default Register;