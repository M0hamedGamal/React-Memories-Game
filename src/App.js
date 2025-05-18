import './App.css'
import React, {useEffect, useState} from "react";
import Card from "./components/Card";

const cardImages = [
    {src: '/img/helmet-1.png', matched: false},
    {src: '/img/potion-1.png', matched: false},
    {src: '/img/ring-1.png', matched: false},
    {src: '/img/scroll-1.png', matched: false},
    {src: '/img/shield-1.png', matched: false},
    {src: '/img/sword-1.png', matched: false},
]

function App() {
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)

    useEffect(() => {
        shuffleCards()
    }, []);

    useEffect(() => {
        if (choiceOne && choiceTwo) {
            if (choiceOne.src === choiceTwo.src) {
                setCards(prevCards => (
                    prevCards.map(card => (
                        card.src === choiceOne.src ? {...card, matched: true} : card
                    ))
                ))
            } else {
                console.log('Don\'t Match...')
            }
            setTimeout(() => {
                increaseTurn()
            }, 1000)
        }

    }, [choiceOne, choiceTwo])

    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map(card => ({id: Math.random(), ...card}))

        setCards(shuffledCards)
        resetGame()
    }

    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    const increaseTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurn => prevTurn + 1)
    }

    const resetGame = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(0)
    }

    return (
        <div className="App">
            <h1>Magic Match</h1>
            <button onClick={shuffleCards}>New Game</button>
            <div className="card-grid">
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        card={card}
                        handleChoice={handleChoice}
                        flipped={card === choiceOne || card === choiceTwo || card.matched}
                        disabled={choiceOne && choiceTwo}
                    />
                ))}
            </div>
            <p>Turns: {turns}</p>
        </div>
    );
}

export default App