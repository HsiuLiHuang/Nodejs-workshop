let ary = [1, 2, 3, 4, 5];
let result = ary.reduce((acc, cur) => acc + cur, 10);
console.log(result);

// 用 for-loop
function reduce(ary) {
  let result = 10;
  for (let i = 0; i < ary.length; i++) {
    if ((result = result + ary[i])) {
    }
  }
  return result;
}

console.log(reduce(ary));
