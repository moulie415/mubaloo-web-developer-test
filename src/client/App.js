import React, { useState, useEffect } from 'react'
import './app.scss'
import FormInput from './FormInput'

const App = () => {
  const [username, setUsername] = useState()
  const [title, setTitle] = useState('')
  const [name, setName] = useState('')
  const [dob, setDob] = useState('')
  const [location, setLocation] = useState('')
  const [dateTime, setDateTime] = useState('')
  const [feedback, setFeedback] = useState('')
  const [step, setStep] = useState(1)

  useEffect(() => {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => setUsername(user.username))
  }, [])

  return (
    <div>

      {step === 1 && (
        <>
          {username ? <h3>{`Hello ${username} please complete the following survey`}</h3> : <h3>Loading.. please wait!</h3>}
        </>
      )}
      {step === 1 && (
        <div>
          <FormInput label="Title" id="title" val={title} setVal={val => setTitle(val)} required />
          <FormInput label="Name" id="name" val={name} setVal={val => setName(val)} required />
          <FormInput label="Date of birth" id="dob" val={dob} setVal={val => setDob(val)} type="date" required />
          <button
            onClick={() => {
              // check if required fields have been entered
              if (title && name && dob) {
                setStep(2)
              }
              else alert('Please enter all the required fields')
            }}
            type="button"
          >
            Next
          </button>
        </div>
      )}
      {step === 2 && (
        <div className="step2">
          <FormInput label="Current location" id="location" val={location} setVal={setLocation} required />
          <FormInput label="Current date and time" id="dateTime" val={dateTime} setVal={setDateTime} type="datetime-local" required />
          <FormInput label="User feedback" id="feedback" val={feedback} setVal={setFeedback} type="text-area" />
          <button onClick={() => setStep(1)} type="button">Back</button>
          <button
            onClick={async () => {
              // check if required fields have been entered
              if (location && dateTime) {
                try {
                  // post survey data to api endpoint
                  await fetch('/api/submitSurvey', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({title, name, dob, location, dateTime, feedback})
                  })
                  setStep(3)
                } catch (e) {
                  alert(e.message)
                }
              }
              else alert('Please enter all the required fields')
            }}
            className="submit"
            type="submit"
          >
          Submit
          </button>
        </div>
      )}
      {step === 3 && (
        <div className="step3">
          <h3>
            Thank you!
          </h3>
        </div>
      )}
    </div>
  )
}

export default App
