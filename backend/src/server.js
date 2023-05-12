import * as dotenv from 'dotenv'
dotenv.config();

import express from 'express';
import path from 'path';
import cors from 'cors';
import * as url from 'url';
import mongoose from 'mongoose';
import routes from './routes/index.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/', routes);

const dirname = url.fileURLToPath(new URL('.', import.meta.url));
app.use(express.static(path.join(dirname, 'public')));

if (process.env.NODE_ENV === 'production') {
    console.log('Running in production!');
    app.use(express.static(path.join(dirname, '../frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(dirname, '../frontend/dist/index.html'));
    });
}

await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
app.listen(port, () => console.log(`App server listening on port ${port}!`));