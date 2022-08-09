// 記得要放編碼 utf8
// callback
// readFile 去硬碟讀檔案，這是很慢的事，他是非同步

const fs = require('fs');

function readFile() {
  return new Promise((resolve, reject) => {
    fs.readFile('test.txt', 'utf8', (err, data) => {
      if (err){
        reject(err)
      }{
        resolve(data)
      }
      
    });
  });
}

let reading = readFile();
reading
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    // 用來接住 reject
    console.error('在 promise 發生錯誤:', err);
  });

//fs.readFile('test.txt', 'utf8', (err, data) => {
//if (err) {
// return console.error('發生錯誤', err);
// }
// console.log(data);
//});
