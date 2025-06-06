import React from 'react';

function Navigation ({onRouteChange, isSignedIn }) {
    
        if(isSignedIn) {
            return (
            <nav className='nav-wrapper'>
                <p onClick={() => onRouteChange('signout')} id='nav-bar-wrapper' className='nav-link'>Sign Out</p>
            </nav>
            )
        } else {
            return (
                <nav className='nav-wrapper'>
                    <p onClick={() => onRouteChange('signin')} className='nav-link'>Sign In</p>
                    <p onClick={() => onRouteChange('register')} className='nav-link'>Register</p>
                </nav>
            )
        }
}

export default Navigation;