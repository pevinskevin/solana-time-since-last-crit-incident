import express from 'express';
const app = express();
import path from 'path';

app.use(express.static('public'));

import { fetchIncident } from './util/solanaFetcher.js';


app.get('/', async (req, res) => {
	res.sendFile(path.resolve('./public/frontpage/index.html'))
	const obj = await fetchIncident();
	res.send({ data: obj });
});

app.listen(8080, () => {
	console.log('Server is running.');
});


