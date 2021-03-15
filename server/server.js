const express = require('express');
const cors = require('cors')

const response = require('./response.json');
const port = 3001;
const app = express();

app.use(cors());

app.get('/data', (_, res) => {
  res.send(response)
})

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});