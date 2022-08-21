const express = require('express');
// 初始化 dotenv
require('dotenv').config();
// 利用 express 這個框架/函式庫 來建立一個 web application
const app = express();
const port = process.env.SERVER_PORT;

const cors = require('cors');
app.use(cors());

// TODO:連接mysql2'

const mysql = require('mysql2');
let pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10,
  })
  .promise();

//API
//列出所有股票代碼
app.get('/api/1.0/stocks', async (req, res, next) => {
  //寫法一
  // let result = await pool.execute('SELECT * FROM stocks');
  // let data = result[0];
  //寫法二
  let [data] = await pool.execute('SELECT * FROM stocks');
  //console.log('result', data);

  res.json(data);
});

app.use((req, res, next) => {
  console.log('在所有路由中間件的下面 -> 404 了！');
  res.status(404).send('Not Found!!');
});
// app.[method]
// method: get, post, delete, put, patch, ...

app.get('/', (req, res, next) => {
  console.log('第2個中間件');
  next();
});

app.get('/', (req, res) => {
  console.log('Hey');
  res.send('The end ');
});

app.listen(port, () => {
  console.log(`server start at ${port}`);
});
