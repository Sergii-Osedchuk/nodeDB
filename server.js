const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello Node devs')
})

app.listen(3001, () => {
  console.log('Node API is runing')
})