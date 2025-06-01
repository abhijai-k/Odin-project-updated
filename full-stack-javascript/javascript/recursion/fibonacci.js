function fibs(n) {
  const result = [0, 1];
  if (n <= 0) return [];
  if (n === 1) return [0];
  for (let i = 2; i < n; i++) {
    result.push(result[i - 1] + result[i - 2]);
  }
  return result;
}

function fibsRec(n, result = [0, 1]) {
  console.log("This was printed recursively");
  if (n <= 0) return [];
  if (n === 1) return [0];
  if (n === 2) return result;
  result.push(result[result.length - 1] + result[result.length - 2]);
  return fibsRec(n - 1, result);
}

console.log("Iterative fibs(8):", fibs(8));
console.log("Recursive fibsRec(8):", fibsRec(8));
