const express = require('express');
const router = express.Router();
const pool = require('../utils/db');
const bcrypt = require('bcrypt');

// 可以針對這個 router 使用某些中間件
//只對這個Router有效
// router.use(express.json());

// /api/1.0/auth/register

router.post('/api/1.0/auth/register', async (req, res, next) => {
  // 確認資料有沒有收到資料通常都會在body裡面
  console.log('register', req.body);
  // TODO: 檢查 email 有沒有重複
  //方法1:交給DB 把email欄位設定成unique
  //方法2:自行檢查->去撈撈看有沒有這筆email
  //先與資料串接
  let [members] = await pool.execute('SELECT * From members Where email=?', [req.body.email]);
  if (members.length === 0) {
    // 密碼要雜湊 hash

    let hashPassword = await bcrypt.hash(req.body.password, 10);

    //此步驟->將雜湊後密碼與資料庫所需的資料送進資料庫中
    let result = await pool.execute('INSERT INTO members (email, password, name) VALUES (?,?,?);', [req.body.email, hashPassword, req.body.name]);
    console.log('insert new member', result);
    //  回覆前端
    res.json({ message: 'ok' });
  } else {
    //  如果有，回覆 400 跟錯誤訊息
    //回覆400與錯誤訊息
    //因上面條件if條件設定members.length === 0
    //所以 長度 > 0 ->有資料 -> 此email已註冊過
    return res.status(400).json({ message: '這個email已註冊過' });
  }
});

module.exports = router;
