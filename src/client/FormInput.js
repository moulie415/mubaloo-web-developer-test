import React from 'react'
import PropTypes from 'prop-types'

const FormInput = ({id, label, type, val, setVal, required}) => {
  return (
    <label htmlFor={id}>
      {label}
      {required && <span>*</span>}
      {type === 'text-area'
        ? (
          <textarea
            value={val}
            rows={4}
            cols={25}
            id={id}
            onChange={event => setVal(event.target.value)}
          />
        )
        : (
          <input
            value={val}
            type={type}
            id={id}
            onChange={event => setVal(event.target.value)}
          />
        )}
    </label>
  )
}

FormInput.defaultProps = {
  type: 'text',
  required: false
}

FormInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  setVal: PropTypes.func.isRequired,
  required: PropTypes.bool,
  val: PropTypes.any
}

export default FormInput
