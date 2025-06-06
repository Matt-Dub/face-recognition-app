import React from 'react';

function ImageLinkForm ({ onInputChange, onButtonSubmit }) {
    return (
        <div className='magic-input'>
            <p className="center intro-msg">
                {'This magic brain will detect faces in your pictures.'}
            </p>
            <div className='center'>
                <div className="submit-container">
                    <input
                        className='f4 pa2 w-70 center form-field'
                        type="text"
                        onChange={onInputChange}/>
                    <button 
                        className='submit-btn'
                        onClick={onButtonSubmit}>
                            Detect
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;