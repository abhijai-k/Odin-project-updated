function capitalize(str) {
  if (!str) return '';
  return str[0].toUpperCase() + str.slice(1);
}

function reverseString(str) {
  return str.split('').reverse().join('');
}

const calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  divide: (a, b) => a / b,
  multiply: (a, b) => a * b,
};

function caesarCipher(str, shift) {
  return str.split('').map(char => shiftChar(char, shift)).join('');
}

function shiftChar(char, shift) {
  const isUpper = char >= 'A' && char <= 'Z';
  const isLower = char >= 'a' && char <= 'z';

  if (!isUpper && !isLower) return char;

  const base = isUpper ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
  const newCharCode = ((char.charCodeAt(0) - base + shift) % 26 + 26) % 26 + base;
  return String.fromCharCode(newCharCode);
}

function analyzeArray(arr) {
  const sum = arr.reduce((acc, val) => acc + val, 0);
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const length = arr.length;
  const average = sum / length;
  return { average, min, max, length };
}

module.exports = {
  capitalize,
  reverseString,
  calculator,
  caesarCipher,
  analyzeArray,
};
