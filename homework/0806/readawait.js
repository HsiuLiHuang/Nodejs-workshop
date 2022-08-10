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

async function readFile2() {
try {
  let reading = await readFile();
  console.log(reading);
} catch (err) {
  console.error(err);
}
}
readFile2();



try {
  const controller = new AbortController();
  const { signal } = controller;
  const promise = readFile(fileName, { signal });

  // Abort the request before the promise settles.
  controller.abort();


} catch (err) {
  // When a request is aborted - err is an AbortError
  console.error(err);
}