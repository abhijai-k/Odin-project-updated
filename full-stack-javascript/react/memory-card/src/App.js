import React, { useEffect, useState } from 'react';
import Scoreboard from './components/Scoreboard';
import CardGrid from './components/CardGrid';
import './styles/App.css';

interface CardData {
  id: number;
  name: string;
  image: string;
}

const App = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [clickedCards, setClickedCards] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const fetchCards = async () => {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=12');
    const data = await res.json();

    const fetchedCards = await Promise.all(
      data.results.map(async (pokemon: any) => {
        const pokeRes = await fetch(pokemon.url);
        const pokeData = await pokeRes.json();
        return {
          id: pokeData.id,
          name: pokeData.name,
          image: pokeData.sprites.other["official-artwork"].front_default,
        };
      })
    );
    setCards(shuffleArray(fetchedCards));
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const shuffleArray = (array: CardData[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleCardClick = (id: number) => {
    if (clickedCards.includes(id)) {
      setScore(0);
      setClickedCards([]);
    } else {
      const newScore = score + 1;
      setScore(newScore);
      setClickedCards([...clickedCards, id]);
      if (newScore > bestScore) setBestScore(newScore);
    }
    setCards(shuffleArray(cards));
  };

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <Scoreboard score={score} bestScore={bestScore} />
      <CardGrid cards={cards} onCardClick={handleCardClick} />
    </div>
  );
};

export default App;
