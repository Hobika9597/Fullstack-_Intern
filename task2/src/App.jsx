import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Card from './components/Card';
import Scoreboard from './components/Scoreboard';
import WinMessage from './components/WinMessage';
import './index.css';

const emojis = ['🐶', '🐱', '🐰', '🐻', '🦁', '🐸', '🐷', '🐵'];

const App = () => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [moves, setMoves] = useState(0);
    const [time, setTime] = useState(0);
    const [isGameWon, setIsGameWon] = useState(false);

    useEffect(() => {
        const shuffledCards = [...emojis, ...emojis]
            .sort(() => Math.random() - 0.5)
            .map(emoji => ({ emoji, isFlipped: false }));
        setCards(shuffledCards);
    }, []);

    useEffect(() => {
        let timer;
        if (time > 0 && !isGameWon) {
            timer = setInterval(() => setTime(prev => prev + 1), 1000);
        }
        return () => clearInterval(timer);
    }, [time, isGameWon]);

    const handleCardClick = (index) => {
        if (isGameWon || cards[index].isFlipped || flippedCards.length === 2) return;

        const newCards = [...cards];
        newCards[index].isFlipped = true;
        setFlippedCards([...flippedCards, index]);
        setCards(newCards);
        setMoves(prev => prev + 1);

        // Start the timer when the first card is flipped
        if (flippedCards.length === 0) {
            setTime(1); // Start the timer
        }

        if (flippedCards.length === 1) {
            const firstCard = newCards[flippedCards[0]];
            const secondCard = newCards[index];

            if (firstCard.emoji === secondCard.emoji) {
                setFlippedCards([]);
                if (newCards.every(card => card.isFlipped)) {
                    setIsGameWon(true);
                }
            } else {
                setTimeout(() => {
                    firstCard.isFlipped = false;
                    secondCard.isFlipped = false;
                    setCards([...newCards]);
                    setFlippedCards([]);
                }, 1000);
            }
        }
    };

    const handleRestart = () => {
        setMoves(0);
        setTime(0);
        setIsGameWon(false);
        setFlippedCards([]);
        const shuffledCards = [...emojis, ...emojis]
            .sort(() => Math.random() - 0.5)
            .map(emoji => ({ emoji, isFlipped: false }));
        setCards(shuffledCards);
    };

    return (
        <div className="app">
            <Header />
            <button className="restart-button" onClick={handleRestart}>🔄 Restart</button>
            <Scoreboard moves={moves} time={time} />
            <div className="grid">
                {cards.map((card, index) => (
                    <Card key={index} emoji={card.emoji} isFlipped={card.isFlipped} onClick={() => handleCardClick(index)} />
                ))}
            </div>
            {isGameWon && <WinMessage moves={moves} time={time} />}
        </div>
    );
};

export default App;
