//將stock都放在這裡
//router的起手式  router:mini app

const express = require('express');
const router = express.Router();
const pool = require('../utils/db');

// API
// 列出所有股票代碼
// GET /stocks
router.get('', async (req, res, next) => {
  console.log('/api/1.0/stocks');

  //寫法一
  // let result = await pool.execute('SELECT * FROM stocks');
  // let data = result[0];
  let [data] = await pool.execute('SELECT * FROM stocks');

  // console.log('result', data);
  res.json(data);
});

router.get('/:stockId', async (req, res, next) => {
  const stockId = req.params.stockId;

  // 分頁
  // 透過 query string 取得目前要第幾頁的資料
  // 如果沒有設定，就是預設要第一頁的資料
  let page = req.query.page || 1;
  // 每一頁取得五筆資料
  const perPage = 5;
  // 取得總筆數
  let [total] = await pool.execute('SELECT COUNT(*) AS total FROM stock_prices WHERE stock_id=?', [stockId]);

  // mysql2輸出的資校長這樣[ { total: 57 } ]
  total = total[0].total;
  // 計算總頁數(最後一夜) Math.ceil 無條件進位 相對應函式 Math.floor無條件捨去
  let lastPage = Math.ceil(total / perPage);

  // 計算 offset
  const offset = perPage * (page - 1);

  //offset跳過幾筆  LIMIT限制一次抓幾筆資料
  // 根據 perPage 及 offset 去取得資料
  //後端不可相信任何前端資料，都要抱持著懷疑
  let [data] = await pool.execute('SELECT * FROM stock_prices WHERE stock_id = ? ORDER BY date LIMIT ? OFFSET ?', [stockId, perPage, offset]);

  //page: 1 -> 1~5->從第一筆抓，抓五筆
  //      2 -> 6~10 ->從第6筆抓->要跳過前第五筆
  //      3 -> 11~15 ->從第11筆抓->要跳過前第10筆

  // 把取得的資料回覆給前端
  res.json({
    pagination: {
      total, // 總共有幾筆
      perPage, // 一頁有幾筆
      page, // 目前在第幾頁
      lastPage, // 總頁數
    },
    data,
  });
});

module.exports = router;
