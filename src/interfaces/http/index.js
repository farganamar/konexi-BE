const express = require('express');
const expressUserAgent = require('express-useragent');
const helmet = require('helmet');
const cors = require('cors');
const httpErrors = require('http-errors');
const requestIp = require('request-ip');
const path = require('path');

require('dotenv').config();
const rawBody = require('./middlewares/rawBody');
const rawHeader = require('./middlewares/rawHeader');
const errorHandler = require('./middlewares/errorHandler')
const routes = require('./routes/index');

require('../../drivers')

const app = express()
const corsOptions = {
  origin: String(process.env.CORS || '').split(','),
  optionsSuccessStatus: 200,
};
const basePath = process.env.BASE_PATH || '/';

if (app.get('env') === 'production') {
  app.use(helmet());
} else {
  app.use(helmet({
    frameguard: false,
  }));
}

app.use(cors(corsOptions));
app.use(requestIp.mw());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: 1024102420, type: 'application/json' }));
app.use(rawBody);
app.use(rawHeader);
app.use(expressUserAgent.express());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.send(`API File for ${process.env.NODE_ENV}`));
app.use(basePath, routes);

app.use((req, res, next) => {
  next(httpErrors.NotFound());
});

app.use(errorHandler);

app.listen(process.env.REST_PORT || 3000, () => {
  console.info(
    `Server running on port: ${process.env.REST_PORT || 3000}`
  )
});

module.exports = app;
