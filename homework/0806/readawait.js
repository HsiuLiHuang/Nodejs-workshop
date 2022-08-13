const fs = require('fs');

function readFile() {
  return new Promise((resolve, reject) => {
    fs.readFile('test.txt', 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      {
        resolve(data);
      }
    });
  });
}

// async function readFile2() {
//   try {
//     let reading = await readFile();
//     console.log(reading);
//   } catch (err) {
//     console.error(err);
//   }
// }
// readFile2();

//立即呼叫函式表達式（
//英文：immediately-invoked function expression，縮寫：IIFE）
(async()=>  {
  try {
    let reading = await readFile();
    console.log(reading);
  } catch (err) {
    console.error(err);
  }
})()


