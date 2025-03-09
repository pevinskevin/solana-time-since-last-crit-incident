import express from 'express';
const app = express();
import path from 'path';

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.sendFile(path.resolve('./public/frontpage/index.html'));
});

app.listen(8080, () => {
	console.log('Server is running.');
});
