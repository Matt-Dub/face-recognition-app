import React from 'react';

function FaceRecognition ({ onNewImageUrl, onNewCanvas }) {

    return (
        <div className="center ma image-wrapper">
            {onNewImageUrl === '' ? <div></div> : <img id='display-img' className='output-image relative mt2' src={onNewImageUrl} alt="image"/>}
            {Object.keys(onNewCanvas).length === 0 ? <div></div> : onNewCanvas.map((face) => {
                return <div
                    key={face[0]}
                    className="face-box"
                    style={{top: face[0], left: face[1], bottom: face[2], right: face[3]}}>
                </div>})}
            <div></div>
        </div>
    )
}

export default FaceRecognition;

