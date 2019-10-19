import React, { useState, useEffect } from 'react'
import './app.scss'

const App = () => {
  const [username, setUsername] = useState()
  const [title, setTitle] = useState()
  const [name, setName] = useState()
  const [dob, setDob] = useState()
  const [location, setLocation] = useState()
  const [dateTime, setDateTime] = useState()
  const [feedBack, setFeedback] = useState()

  useEffect(() => {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => setUsername(user.username))
  }, [])

  return (
    <div>
      {username ? <h1>{`Hello ${username}`}</h1> : <h1>Loading.. please wait!</h1>}
      <form>
        <FormInput label="Title:" id="title" />
        <FormInput label="Date of birth:" id="dob" setVal={setDob} type="date" />

        <label htmlFor="date-time">
        Current date and time:
          <input
            type="datetime-local"
            id="date-time"
            name="date-time"
          />
        </label>
      </form>
    </div>
  )
}

const FormInput = ({id, label, type, setVal}) => {
  return (
    <label htmlFor={id}>
      {label}
      <input
        type={type}
        id={id}
        onChange={event => setVal(event.target.value)}
      />
    </label>
  )
}

export default App
