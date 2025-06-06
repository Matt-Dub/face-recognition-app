import React from 'react';

function Rank ( { name, entries }) {
    return (
        <div className='rank-wrapper' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <div className="white f3">
                {`Hi ${name}, you current entry count is `}
            </div>
            <div className="white f1">
                {entries}
            </div>
        </div>
    )
}

export default Rank;