const express = require('express');
const request = require('request');

const PORT = 8000;

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/:num', (req, res) => {
  request(
    { url: `http://xkcd.com/${req.params.num}/info.0.json` },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: error.message });
      }
      res.json(JSON.parse(body));
    }
  )
});

app.listen(PORT, () => {
  console.log(`app running at http:${PORT}`);
});