import React from 'react';

const WinMessage = ({ moves, timer }) => {
    return (
        <div style={{
            fontSize: '20px',
            color: '#4CAF50',
            marginTop: '20px',
            textAlign: 'center'
        }}>
            🏆 You matched all pairs in {moves} moves and {timer}s!
        </div>
    );
};

export default WinMessage;
