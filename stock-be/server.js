const express = require('express');

require('dotenv').config();
//是讀取這一個

const app = express();

// ||=或的意思 undefined是flase , 設定3002為預設值
//在env檔設定aaa=0 ，雖然0是false，
//傳進來是"0"，字串0是true，盡量避免將0用這方式設定
const port = process.env.SERVER_PORT || 3002;

// npm i cors
const cors = require('cors');
//瀏覽器不允許跨源AJAX請求，只有後端網站可允許
//cors為第三方中間件來允許跨源存取

app.use(cors());
// 使用情境: 當前後端網址不同時，只想允許自己的前端來跨源存取
//          就可以利用 origin 這個設定來限制，不然預設是 * (全部)
//只有這個前端可以對我後端做跨源 設定 *就是預設給所有人
// const corsOptions = {
//   origin: ['http://localhost:3000'],
// };
// app.use(cors(corsOptions));

const pool = require('./utils/db');

//要讓express認得json
//express內建的中間件
//放在authRouter下面的話會讀不到
//全站有效
app.use(express.json());

// 設定視圖引擎，我們用的是 pug
// npm i pug
app.set('view engine', 'pug');
// 告訴 express 視圖在哪裡
app.set('views', 'views');

// 測試 server side render 的寫法
app.get('/ssr', (req, res, next) => {
  // views/index.pug
  res.render('index', {
    stocks: ['台積電', '長榮航', '聯發科'],
  });
});

// 一般的 middleware
app.use((req, res, next) => {
  console.log('這是中間件 A');
  let now = new Date();
  console.log(`有人來訪問喔 at ${now.toISOString()}`);
  // 一定要寫，讓 express 知道要跳去下一個中間件
  next();
});

app.use((req, res, next) => {
  console.log('這是中間件 C');
  // 一定要寫，讓 express 知道要跳去下一個中間件
  next();
});

// 路由中間件
// app.[method]
// method: get, post, delete, put, patch, ...
// GET /
app.get('/', (req, res, next) => {
  console.log('這裡是首頁');
  res.send('Hello Express');
});
app.get('/test', (req, res, next) => {
  console.log('這裡是 test 1');
  res.send('Hello Test 1');
  // next();
});

let stockRouter = require('./routers/stocks');
app.use('/api/1.0/stocks', stockRouter);
// app.get('/test', (req, res, next) => {
//   console.log('這裡是 test 2');
//   res.send('Hello Test 2');
// });

let authRouter = require('./routers/auth');
app.use(authRouter);

// 在所有的路由中間件的下面
// 既然前面所有的「網址」都比不到，表示前面沒有任何符合的網址 (旅程一直沒有被結束)
// --> 404
// 利用這個特殊的順序，把這裡當成 404
app.use((req, res, next) => {
  console.log('在所有路由中間件的下面 -> 404 了！');
  res.status(404).send('Not Found!!');
});

// 啟動 server，並且開始 listen 一個 port
app.listen(port, () => {
  console.log(`server start at ${port}`);
});
