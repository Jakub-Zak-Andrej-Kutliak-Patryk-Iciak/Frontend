const LETTERS_UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const LETTERS_LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
const DIGITS = '0123456789'
const LETTERS = LETTERS_UPPERCASE + LETTERS_LOWERCASE
const SIGNS = LETTERS + DIGITS


export const generateRandomString = (length = 1) => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += SIGNS.charAt(Math.floor(Math.random() * SIGNS.length));
  }
  return result
}