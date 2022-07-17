const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../dist')));

const basePath = '/api';
const routes = require('./routes')
app.use(basePath, routes);
app.set('port', 8081);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → ${server.address().port} [http://localhost:${server.address().port}]`);
});
