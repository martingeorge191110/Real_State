
/**
 * Function to change inputs value state with each set State function
 * @value: value to change to
 * @setFunction: set State function
 */

const changeInputValue = (value, setFunction) => {
      setFunction(value)
}

/**
 * Function to change post values requirements
 */

const changeStateValues = (value, state, input, setFunction) => {
      setFunction({
            ...state,
            [`${input}`]: value
      })
}

export {changeInputValue, changeStateValues}