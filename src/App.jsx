import { nanoid } from 'nanoid'
import './App.css'
import { useEffect, useState } from 'react'

function RatingCircle(props){
  return (
    <div className={`rating-circle ${props.isSelected ? "selected" : ""}`} onClick={() => props.onClick(props.id, props.number)}>{props.number}</div>
  )
}

function App() {
  const [choices, setChoices] = useState([])
  const [selectedChoice, setSelectedChoice] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(()=> {
    let temp_arr = [];
    for(let i=0;i<5;i++){
      temp_arr.push({
        id: nanoid(),
        number: i+1,
        isSelected: false
      })
    }
    setChoices(temp_arr)
  }, [])

  function toggleBackground(id, number){
    setSelectedChoice(number)
    setChoices(prevChoices => prevChoices.map(choice => {
      return choice.id === id ? {...choice, isSelected: !choice.isSelected} : {...choice, isSelected: false}
    }))
  }

  return <> 
  {isSubmitted 
    ? (
      <main className='submitted'>
        <img src="/illustration-thank-you.svg" alt="Thank you" style={{width: "50%"}}/>
        <div className='your-choice'>You selected {selectedChoice} out of 5</div>
        <div className='text-container'>
          <h1>Thank you!</h1>
          <p>We appreciate you taking the time to give a rating. If you ever need more support, don’t hesitate to get in touch!</p>
        </div>
      </main>
    ) 
    : (
      <main>
        <div className='start-icon-container'>
          <img src="/icon-star.svg" alt="Star icon" />
        </div>
        <div className='text-container'>
          <h1>How did we do?</h1>
          <p>Please let us know how we did with your support request. All feedback is appreciated to help us improve our offering!</p>
        </div>
        <div className='rating-container'>
          {choices.map(choice => <RatingCircle key={choice.id} onClick={toggleBackground} id={choice.id} number={choice.number} isSelected={choice.isSelected}/> )}
        </div>
        <button className='btn' disabled={selectedChoice==null} onClick={() => setIsSubmitted(true)}>SUBMIT</button>
      </main>
    ) 
  }
  <footer className="attribution">
      Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
      Coded by <a href="https://github.com/aveandrian">aveandrian</a>.
  </footer>
  </>
}


export default App
