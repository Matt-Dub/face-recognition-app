import React from 'react';

function FaceRecognition ({ onNewImageUrl, onNewCanvas}) {

    // console.log('face-recognition', onNewCanvas);


    
    return (
        <div className="center ma image-wrapper">
            {onNewImageUrl === '' ? <div></div> : <img id='display-img' className='output-image relative mt2' src={onNewImageUrl} alt="image"/>}
            {/* <div className="face-box" style={{top: onNewCanvas[0], left: onNewCanvas[1], bottom: onNewCanvas[2], right: onNewCanvas[3]}}></div> */}
        </div>
    )
}

export default FaceRecognition;

