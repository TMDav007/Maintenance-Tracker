import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from 'morgan';
import path from 'path';
/* eslint-disable */
import babelPolyfill from 'babel-polyfill';

import routes from './route/routes';

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));

routes(app);

app.use(express.static(path.join(__dirname,'../client')));

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

app.listen(port, () => {
  console.log('we are running live');
});

export default app;
