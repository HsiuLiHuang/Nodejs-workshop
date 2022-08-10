let customers = [
  {
    name: "Jack",
    credit: 100,
    age: 25,
  },
  {
    name: "Coco",
    credit: 200,
    age: 18,
  },
  {
    name: "Joe",
    credit: 300,
    age: 19,
  },
];

//找出age小於20的第一個人
console.log(customers.find((c) => c.age < 20));

//用for-loop
function find(customers) {
  // let result = [];
  for (let i = 0; i < customers.length; i++) {
    if (customers[i].age < 20) {
      return customers[i];
      // break
    }
  }
  // return result;
}

console.log(find(customers));
