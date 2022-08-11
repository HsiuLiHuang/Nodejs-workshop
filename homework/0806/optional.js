const fsPromises = require('fs').promises;

async function doRead() {
  try {
    let data = await fsPromises.readFile('test.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
doRead();
