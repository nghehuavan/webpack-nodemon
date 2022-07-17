const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));

async function startup() {
  const apiPath = '/api';
  app.get(`${apiPath}/test`, async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ a: 'test' }, null, 4));
  });

  app.set('port', 8081);
  const server = app.listen(app.get('port'), () => {
    console.log(`Express running → ${server.address().port} [http://localhost:${server.address().port}]`);
  });
}

startup()
  .catch(console.error)
  .then(() => console.log('Server startup success !'));
