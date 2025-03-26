export const validateOnlyNumbers = (event: any) => {
  const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'] // Teclas permitidas
  const key = event.key

  if (allowedKeys.includes(key)) {
    return
  }

  const regex = /^[0-9]$/
  if (!regex.test(key)) {
    event.preventDefault()
  }
}

export const validateNumbersAndLetters = (event: any) => {
  const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'] // Teclas permitidas
  const key = event.key

  if (allowedKeys.includes(key)) {
    return
  }

  const regex = /^[0-9a-zA-Z]$/
  if (!regex.test(key)) {
    event.preventDefault()
  }
}

export const validateNumbersAndDots = (event: any, value = '') => {
  const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'] // Teclas permitidas
  const key = event.key

  if (allowedKeys.includes(key)) {
    return
  }

  if (value.includes('.') && key === '.') {
    event.preventDefault()
    return
  }

  const regex = /^[0-9.]$/
  if (!regex.test(key)) {
    event.preventDefault()
  }
}
