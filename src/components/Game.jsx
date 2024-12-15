import _ from "lodash";
import "../index.css";
import { useEffect, useState } from "react";
import pokemonNames from "../data/pokemonNames";
import Card from "./Card";
import Score from "./Score";
import DifficultyBtn from "./DifficultyBtn";

const Game = () => {
  const [numCards, setNumCards] = useState(12);
  const [pokeOptions, setPokeOptions] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);

  useEffect(() => {
    const selectedFew = _.shuffle(pokemonNames).slice(0, numCards);
    const normalizedSelection = selectedFew.map((name) => name.toLowerCase());
    setPokeOptions(normalizedSelection);
    setCurrentScore(0);
  }, [numCards]);

  const handleMaxScore = () => {
    if (currentScore > maxScore) setMaxScore(currentScore);
  };

  const handleClick = (e) => {
    const clickedCardId = e.target.id;
    clicked.includes(clickedCardId)
      ? handleGameOver()
      : handleGameContinues(clickedCardId);
    setPokeOptions(_.shuffle(pokeOptions));
  };

  const handleGameContinues = (clickedCardId) => {
    setCurrentScore(currentScore + 1);
    setClicked([...clicked, clickedCardId]);
  };

  const handleGameOver = () => {
    handleMaxScore();
    setClicked([]);
    setCurrentScore(0);
  };

  const pokemonList = pokeOptions.map((name) => (
    <Card key={name} pokemonName={name} handleClick={handleClick} />
  ));

  const changeDifficulty = (num) => {
    setNumCards(num);
  };

  return (
    <main>
      <header>
        <div>
          <h1>Pokememory</h1>
          <p>
            Click on a card to catch the pokemon, but never catch the same
            pokemon twice! <br /> Can you catch them all ?
          </p>
        </div>
        <div className="score-difficulty">
          <Score current={currentScore} max={maxScore} />
          <div className="difficulty-btns">
            <DifficultyBtn
              text={"Easy"}
              numCards={8}
              changeDifficulty={changeDifficulty}
            />
            <DifficultyBtn
              text={"Moderate"}
              numCards={12}
              changeDifficulty={changeDifficulty}
            />
            <DifficultyBtn
              text={"Hard"}
              numCards={16}
              changeDifficulty={changeDifficulty}
            />
            <DifficultyBtn
              text={"Extreme"}
              numCards={24}
              changeDifficulty={changeDifficulty}
            />
          </div>
        </div>
      </header>
      <div className="gameBoard">{pokemonList}</div>
      <footer>
        <div className="text-sm text-center p-2">
          <p>&copy; 2024 Daniel Echevarria. All Rights Reserved.</p>
        </div>
      </footer>
    </main>
  );
};

export default Game;
