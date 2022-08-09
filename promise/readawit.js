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
console.log(data);
async function readFile(){
    console.log(data)
    try{
        let reading = await readFile();
        console.log('test.txt', 'utf8', reading)

    }catch(err) {
        // 用來接住 reject
        console.error(err);
      }
    

}


