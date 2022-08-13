// 記得要放編碼 utf8
// callback
// readFile 去硬碟讀檔案，這是很慢的事，他是非同步

const fs = require('fs');

function readFile() {
  return new Promise((resolve, reject) => {
    fs.readFile('test.txt', 'utf8', (err, data) => {
      if (err) {
        reject(err); //可寫成 return reject(err) 確保下一行inside不會被log出來
        //console.log('inside')
      }
      {
        resolve(data);
      }
    });
  });
}

let reading = readFile();
reading
  .then((data) => {
    console.log(data);
    return readFile('test.txt', 'utf8');
  })
  .catch((err) => {
    // 用來接住 reject
    console.error('在 promise 發生錯誤:', err);  //也可寫成.catch(console.error)
  });

//fs.readFile('test.txt', 'utf8', (err, data) => {
//if (err) {
// return console.error('發生錯誤', err);
// }
// console.log(data);
//});
