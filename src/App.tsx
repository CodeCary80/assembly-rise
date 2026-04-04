import { useState } from "react"
import { clsx } from "clsx"
import { languages,Language } from "./languages"
import { getFarewellText, getRandomWord } from "./utils"
import React from 'react'
import Confetti from 'react-confetti'

export default function AssemblyEndgame() {

//state values
  const [currentWord, setCurrentWord] = useState<string>(():string=>getRandomWord())
  const [guessLetters, setGuessLetters] = useState<string[]>([])


  //derived values
  const numGuessesLeft:number = languages.length -1 
  const wrongGuessCount:number = 
          guessLetters.filter((letter:string):boolean=>!currentWord.includes(letter)).length
  const isGameWon:boolean = 
        currentWord.split("").every((letter:string):boolean=>guessLetters.includes(letter))
  const isGameLost:boolean =
         wrongGuessCount >= numGuessesLeft
  const isGameOver:boolean = isGameWon || isGameLost
  const lastGuessedLetter:string = guessLetters[guessLetters.length -1]
  const isLastGuessedLetterInCorrect:boolean = Boolean(!currentWord.includes(lastGuessedLetter) && lastGuessedLetter)

  //static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  function addGuessedLetter(letter:string){
        setGuessLetters((prevLetter:string[]):string[]=>
            prevLetter.includes(letter)?
            prevLetter:
            [...prevLetter,letter]
        )
  }

  function startNewGame():void{
        setGuessLetters([])
        setCurrentWord(getRandomWord())
  }

  const languageElements = languages.map((lang:Language,index:number)=>{
        const isLanguageLost = index < wrongGuessCount
        const styles = {
              backgroundColor : lang.backgroundColor,
              color:lang.color
          }
        const className = clsx("chip", isLanguageLost && "lost")  
      return(
        <span 
            className={className}
            key={lang.name}
            style={styles}
        >{lang.name}</span>
      )
      
    }

  )

  const letterElements = currentWord.split("").map((letter:string,index:number)=>{
    const shouldRevealLetter = isGameLost || guessLetters.includes(letter)
    const letterClassName = clsx(isGameLost && !guessLetters.includes(letter) && "missed-letter")
    return(
        <span
            className={letterClassName}
            key={index}
        >{shouldRevealLetter ? letter.toUpperCase() : ""}</span>
    )
  })


  const keyboardElements = alphabet.split("").map((letter:string)=>{
        const isGuessed = guessLetters.includes(letter)
        const isCorrect = isGuessed && currentWord.includes(letter)
        const isWrong = isGuessed && !currentWord.includes(letter)
        const className = clsx({
           correct: isCorrect,
           wrong:isWrong
        })
    return(
      <button
          className={className}
          key={letter}
          onClick={()=>addGuessedLetter(letter)}
      >{letter.toUpperCase()}</button>
    )
  })

  const renderGameStatusClassName = clsx("game-status",{
    won:isGameWon,
    lost:isGameLost,
    farewell: !isGameOver && isLastGuessedLetterInCorrect
  })

  function renderGameStatus(){
        if(!isGameOver && isLastGuessedLetterInCorrect){
            return(
              <p className="farewell-message">
                    {getFarewellText(languages[wrongGuessCount-1].name)}
                </p>
            )
        }

        if(isGameWon){
           return (
                <>
                    <h2>You win!</h2>
                    <p>Well done! 🎉</p>
                </>
            )
        }

        if(isGameLost){
          return (
                <>
                    <h2>Game over!</h2>
                    <p>You lose! Better start learning Assembly 😭</p>
                </>
            )
        }

        return null
  }

  return (
    <main>
        {isGameWon &&
          <Confetti 
                recycle={false}
                numberOfPieces={2000}
          />
        }
        <header>
            <h1>Assembly: Endgame</h1>
            <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
            <p>Remain Guess :{numGuessesLeft - wrongGuessCount}</p>
        </header>
        <section 
              aria-live="polite"
              role="status"
              className={renderGameStatusClassName}>
              {renderGameStatus()}
        </section>
        <section className="language-chips">
              {languageElements}
        </section>
        <section className="word">
              {letterElements}
        </section>
         {/* Combined visually-hidden aria-live region for status updates */}
            <section
                className="sr-only"
                aria-live="polite"
                role="status"
            >
                <p>
                    {currentWord.includes(lastGuessedLetter) ?
                        `Correct! The letter ${lastGuessedLetter} is in the word.` :
                        `Sorry, the letter ${lastGuessedLetter} is not in the word.`
                    }
                    You have {numGuessesLeft} attempts left.
                </p>
                <p>Current word: {currentWord.split("").map(letter =>
                    guessLetters.includes(letter) ? letter + "." : "blank.")
                    .join(" ")}</p>

            </section>
        <section className="keyboard">
                {keyboardElements}
        </section>
        {isGameOver && <button
            className="new-game"
            onClick={startNewGame}
        >New Game
        </button>}
    </main>
  )
}


