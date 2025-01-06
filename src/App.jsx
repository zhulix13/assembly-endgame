import { useState } from 'react';
import { languages } from '../languages';
import clsx from 'clsx';
import { getFarewellText } from '../utils';
import { words } from '../words';
import ReactConfetti from 'react-confetti';
import { requestFormReset } from 'react-dom';

function App() {
 

  const [currentWord, setCurrentWord] = useState(() => getRandomWord())
  

  function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * (words.length )); // Include 500
    return words[randomIndex]
    
}


  const lettersArray = currentWord.split('');
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  const alphabetArray = alphabet.split('');
  
  const [guessedLetters, setGuessedLetters] = useState([]);
  

  const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length
  
  const isGameWon = lettersArray.every(letter => guessedLetters.includes(letter))
  const isGameLost = wrongGuessCount >= 8 
  const isGameOver = isGameLost || isGameWon
  const initGuessChancesRem = languages.length - 1
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
  const isLastGuessedIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

  function handleLetterClick(letter) {
    setGuessedLetters((prev) => 
      prev.includes(letter) ? prev : [...prev, letter]
    );
  }
  
  
  function resetGame(){
    setGuessedLetters([])
    setCurrentWord(() => getRandomWord())
  }

 
  
  return (
    <>
    {isGameWon && <ReactConfetti 
          recycle = {false}
          numberOfPieces={1000}
          
        /> }
      <main className='game-container'>
        
          <header>
        <nav className='game-header'>
          <h2 className='title'>Assembly: Endgame</h2>
          <h2 className='description'>Guess the word in under 8 attempts to keep the 
            programming world safe from Assembly!</h2>
        </nav>
        </header> 

        <section
          aria-live='polite'
          role='status'
          className={clsx('notification', {
            'won-notification': isGameWon,
            'lost-notification': isGameLost,
            'farewell': !isGameOver && isLastGuessedIncorrect
          })}
        >
          {
              
              isGameWon ? (
                <>
                  <h2>You win</h2>
                  <p>Well done! 🎉</p>
                </>
              ) : isGameLost ? (
                <>
                  <h2>Game over!</h2>
                  <p>You lose! Better start learning Assembly 😭</p>
                </>
              ) : isLastGuessedIncorrect && !isGameOver ? (
                <p className='farewell-message'> {getFarewellText(languages[wrongGuessCount - 1].name)} </p>
              ) : null
            
          }
        </section>

          {/* Combined Visually hidden region for aria-live status updates */}
          <section 
            aria-live='polite'
            role='status'
            className='sr-only'
          >
            <p>
              {currentWord.includes(lastGuessedLetter) ? 
                `Correct. The letter ${lastGuessedLetter} is in the word.` :
                `Sorry. The letter ${lastGuessedLetter} is not in the word.`
              }
              You have {initGuessChancesRem - wrongGuessCount} chances left.
            </p>
            <p>
              Current Word: {lettersArray.map(letter => 
              guessedLetters.includes(letter) ? letter + '.' : 'blank.'
                ).join('')}
            </p>
                
          </section>
                {/* The region ends here */}

        <section className="chips-section">
          {languages.map((language, index) => 
            {
              const className = clsx(
                'chip',
                {'lost': index < wrongGuessCount}
              )
              
           return ( <span style={{backgroundColor: language.backgroundColor , color: language.color}} key={language.name} className={className}>
              {language.name}
              </span>)
              }
          )}
        </section>

          <section className='language-display'>
            {
              lettersArray.map((letter, index) => {
                const letterClassName = clsx(
                  'selected-letter',
                  {"missed-letter": isGameLost && !guessedLetters.includes(letter)}
                )
                return ( 
              <span key={index} className = {letterClassName} >
                  {guessedLetters.includes(letter) ? letter.toUpperCase() :
                   isGameOver ? letter.toUpperCase() : ''
                  }
                </span>
                )}
                
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
                   disabled = {isGameOver} 
                   aria-disabled = {guessedLetters.includes(letter)}
                   aria-label = {`Letter ${letter}`}
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
