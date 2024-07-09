// server.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'custom',
  password: '0252',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.get('/api/custom', async (req, res) => {
   try {
    const [rows] = await pool.promise().query('SELECT * FROM custom');
    console.log(rows); // 데이터 확인을 위해 로그 추가
    res.json(rows);
  } catch (error) {
    console.error('Error fetching custom data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
