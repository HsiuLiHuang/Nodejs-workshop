let A = [100, 500, 200, 600];
let B = A.map((item) => item * 2);
console.log(B);

// 用 for-loop
function map(B) {
  let result = [];
  for (let i = 0; i < A.length; i++) {
    if ((B[i] = A[i] * 2)) {
      result.push(B[i]);
    }
  }

  return result;
}

console.log(map(B));

