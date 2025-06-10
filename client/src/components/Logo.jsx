import React from 'react';
import Tilt from 'react-parallax-tilt';
import BrainIcon from '../assets/icon_brain.png';

function Logo () {
    return (
        <div className="logo-container">
            <p>Welcome to my</p>
            <h1>Face Reckon App</h1>
            <Tilt 
                className='shadow-2 tilt-logo parallax-effect-glare-scale' 
                style={{ height: '120px', backgroundColor: '#fcc35a' }}
                perspective={500}
                glareEnable={true}
                glareMaxOpacity={0.9}
                glareBorderRadius={5}
            >
                <div className='brain-logo__wrapper pa3'>
                    <img className='brain-logo' src={BrainIcon} alt="Brain Logo" />
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;