function generateComparisonString (stringToCompare) {
  // return a string made up only of the first 10 alpha characters
  return stringToCompare.match(/[A-Za-z]/g).join('').substring(0, 11)
}

module.exports = generateComparisonString;