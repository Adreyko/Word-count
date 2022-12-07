import React, { useState, useEffect, useRef } from "react";

function App() {
  
const TIMER = 20
  const [text, setText] = useState('')
  const [timeRemaining, setTimeRemaining] = useState(TIMER)
  const [isTimeRemaining, setIsTimeRemaining] = useState(false)
  const [worldCount, setWorldCount] = useState(0)
 const areaRef = useRef(null)
  function handleText(event) {
    setText(event.currentTarget.value)
  }

  function startGame() {
    setIsTimeRemaining(true)
    setTimeRemaining(TIMER)
    setText('')
    areaRef.current.disabled = false
    areaRef.current.focus()
  }

  function endGame() {
    setWorldCount(worldCalculater(text))
    setIsTimeRemaining(false)
  }

  useEffect(() => {
    setTimeout(() => {
      if (isTimeRemaining && timeRemaining > 0) {
        setTimeRemaining(prevTime => prevTime - 1)
      } else if (timeRemaining === 0) {
        endGame()
      }

    }, 1000)
  }, [timeRemaining, isTimeRemaining])

  const worldCalculater = (text) => {
    let word = text.split(" ")
    return word.filter(el => el !== "").length
  }


  return (
    <div className="App">
      <h1>Наскільки швидко ти друкуєш? </h1>
      <textarea
      ref={areaRef}
        value={text}
        onChange={handleText}
        placeholder="Ваш текст..."
        disabled ={!isTimeRemaining}
      />
      <h1>Часу залишилось : {timeRemaining}</h1>
      <button disabled={isTimeRemaining} onClick={startGame}>Почати</button>
      <h1>Слів набрано: {worldCount}</h1>
    </div>
  );
}

export default App;
