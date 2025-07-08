import React from 'react';

const Scoreboard = ({ moves, time }) => {
    return (
        <div style={{
            fontSize: '16px',
            color: '#222222',
            marginBottom: '10px'
        }}>
            Moves: {moves} | Time: {time}s
        </div>
    );
};

export default Scoreboard;
