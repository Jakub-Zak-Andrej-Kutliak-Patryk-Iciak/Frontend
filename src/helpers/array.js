export const isArrayEmpty = (array) => {
  if (!Array.isArray(array)) {
    throw Error(`${array} is not an array!`)
  }
  return array.length === 0;
}