import { useState } from 'react';
import { languages } from '../languages';
import clsx from 'clsx';

function App() {
 
  const [currentWord, setCurrentWord] = useState('react')
  const lettersArray = currentWord.split('');

  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  const alphabetArray = alphabet.split('');
  
  const [guessedLetters, setGuessedLetters] = useState([]);
  console.log(guessedLetters)

  const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length
  
  const isGameWon = lettersArray.every(letter => guessedLetters.includes(letter))
  const isGameLost = wrongGuessCount >= 8 
  const isGameOver = isGameLost || isGameWon
console.log([isGameLost, isGameWon, isGameOver ])

  function handleLetterClick(letter) {
    setGuessedLetters((prev) => 
      prev.includes(letter) ? prev : [...prev, letter]
    );
  }
  
  
  function resetGame(){
    setGuessedLetters([])
  }

  
  
  return (
    <>
      <main className='game-container'>
          <header>
        <nav className='game-header'>
          <h2 className='title'>Assembly: Endgame</h2>
          <h2 className='description'>Guess the word in under 8 attempts to keep the 
            programming world safe from Assembly!</h2>
        </nav>
        </header> 

        <section
          className={clsx('notification', {
            'won-notification': isGameWon,
            'lost-notification': isGameLost,
          })}
        >
          {isGameWon ? (
            <>
              <h2>You win</h2>
              <p>Well done! 🎉</p>
            </>
          ) : isGameLost ? (
            <>
              <h2>Game over!</h2>
              <p>You lose! Better start learning Assembly 😭</p>
            </>
          ) : null}
        </section>



        <section className="chips-section">
          {languages.map((language, index) => 
            {
              const className = clsx(
                'chip',
                {lost: index < wrongGuessCount}
              )
              
           return ( <span style={{backgroundColor: language.backgroundColor , color: language.color}} key={language.name} className={className}>
              {language.name}
              </span>)
              }
          )}
        </section>

          <section className='language-display'>
            {
              lettersArray.map((letter, index) => 
                {
                  
              return ( 
              <span key={index} className='selected-letter'>
                  {guessedLetters.includes(letter) ? letter.toUpperCase() : ''}
                </span>
                )
                }
              )
            }
          </section>
         
            <section className='keyboard-section'>
              {
                alphabetArray.map((letter, index) => {
                  const isGuessed = guessedLetters.includes(letter)
                  const isCorrect = currentWord.includes(letter) && isGuessed;

                  const isWrong = !currentWord.includes(letter) && isGuessed
                 

                  const className = clsx(
                    'alphabet-button', 
                    {
                      correct: isCorrect,
                      wrong: isWrong
                    }
                  )
                  
                  return(
                    <button className= {className}
                   key={index}
                   onClick={() => handleLetterClick(letter)}
                   >{letter.toUpperCase()}
                   
                  </button>
                  )
                }
                  
                )
              }
            </section>
            {isGameOver && <button className="new-game" 
            onClick={resetGame}
            >New Game</button>}
      </main>
     
      
    </>
  );
}

export default App;
