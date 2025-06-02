import React from 'react';
import Tilt from 'react-parallax-tilt';
import BrainIcon from '../assets/icon_brain.png';

function Logo () {
    return (
        <div className="ma4 mt0">
            <Tilt className='shadow-2' style={{ height: '120px', width: '120px', backgroundColor: 'darkgreen' }}>
                <div className='brain-logo__wrapper pa3'>
                    <img className='brain-logo' src={BrainIcon} alt="Brain Logo" />
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;