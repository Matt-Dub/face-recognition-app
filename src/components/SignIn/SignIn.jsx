import React from 'react';

function SignIn ({onRouteChange}) {
    return (
        <div className="br3 ba light-gray b--black-20 mv4 w-25-l mw6 center shadow-5 pa5 flex justify-center flex-column bg-black-10">
            <div className='flex justify-center flex-column'>
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0 ">
                <legend className="f4 fw6 ph0 mh0 w-100 tc">Sign In</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6 tc" htmlFor="email-address">Email</label>
                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6 tc" htmlFor="password">Password</label>
                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
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
                    <p className="f6 link dim white-50 db tc pointer" onClick={() => onRouteChange('register')}>Register</p>
                </div>
            </div>
        </div>
    )
}

export default SignIn;