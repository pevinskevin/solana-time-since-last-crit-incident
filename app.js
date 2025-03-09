import express from 'express';
const app = express();
import path from 'path';

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.sendFile(path.resolve('./public/frontpage/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
	console.log('Server is running.');
});
