import express from 'express';
const app = express();
import path from 'path';

// app.use(express.static('public'));

import { fetchIncident } from './util/solanaFetcher.js';

app.get('/', (req, res) => {
	res.sendFile(path.resolve('./public/frontpage/index.html'));
});

app.get('/api', async (req, res) => {
	const obj = await fetchIncident();
	res.send({ data: obj });
});

app.listen(8080, () => {
	console.log('Server is running.');
});
