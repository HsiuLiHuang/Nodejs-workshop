let ary = [
  {
    name: "Joe",
    age: "18",
    country: "Japan",
  },
  {
    name: "Sue",
    age: "30",
    country: "Italy",
  },
  {
    name: "Lily",
    age: "25",
    country: "Taiwan",
  },
  {
    name: "Coco",
    age: "25",
    country: "Italy",
  },
];

//找出country是在Italy的人
let result = ary.filter((item) => {
  return item.country === "Italy";
});

// O(n)
ary.filter((item) => item.country === "Italy");

// result 也會是一個陣列
console.log(result);

function filter(ary) {
  let result = [];
  for (let i = 0; i < ary.length; i++) {
    if (ary[i].country === "Italy") {
      result.push(ary[i]);
    }
  }
  return result;
}
console.log(filter(ary));
