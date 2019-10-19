import React, { useState, useEffect } from 'react'
import './app.scss'
import PropTypes from 'prop-types'

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
      <div>
        <FormInput label="Title:" id="title" setVal={val => setTitle(val)} />
        <FormInput label="Name:" id="name" setVal={val => setName(val)} />
        <FormInput label="Date of birth:" id="dob" setVal={val => setDob(val)} type="date" />
      </div>
      <div>
        <FormInput label="Current location:" id="location" setVal={setLocation} />
        <FormInput label="Current date and time:" id="dateTime" setVal={setDateTime} type="datetime-local" />
        <FormInput label="User feedback:" id="feedback" setVal={setFeedback} />
        <button
          onClick={async () => {
            console.log(title)
            try {
              await fetch('/api/submitForm', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({title, name, dob, location, dateTime, feedBack})
              })
            } catch (e) {
              alert(e.message)
            }
          }}
          type="button">
        Submit
        </button>
      </div>
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
        onChange={(event) => {
          setVal(event.target.value)
        }}
      />
    </label>
  )
}

FormInput.defaultProps = {
  type: 'text'
}
FormInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  setVal: PropTypes.func.isRequired
}

export default App
