const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/show.json');

function read() 
{
	return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function write(data) 
{
	fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = app => {

	app.get('/shows', (req, res) => {
		res.json(read());
	});

	app.get('/shows/:id', (req, res) => {
		const data = read();
		const show = data.find(s => s.id == req.params.id);
		if (!show) 
		{
			return res.status(404).send('Show not found');
		}
		res.json(show);
	});

	app.post('/shows', (req, res) => {
		const data = read();
		const show = { id: Date.now(), ...req.body };
		data.push(show);
		write(data);
		res.status(201).json(show);
	});

	// PUT /shows/:id
	app.put('/shows/:id', (req, res) => {
		const data = read();
		const index = data.findIndex(s => s.id == req.params.id);
		if (index === -1) 
		{
			return res.status(404).send('Show not found');
		}

		data[index] = { id: data[index].id, ...req.body };
		write(data);
		res.json(data[index]);
	});

	app.patch('/shows/:id', (req, res) => {
		const data = read();
		const show = data.find(s => s.id == req.params.id);
		if (!show)
		{
			return res.status(404).send('Show not found');
		}

		Object.assign(show, req.body);
		write(data);
		res.json(show);
	});

	app.delete('/shows/:id', (req, res) => {
		const data = read().filter(s => s.id != req.params.id);
		write(data);
		res.status(204).send();
	});
};
