const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/actors.json');

function read() {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function write(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = app => {

  app.get('/actors', (req, res) => {
	res.json(read());
  });

  app.get('/actors/:id', (req, res) => {
	const data = read();
	const actor = data.find(a => a.id == req.params.id);
	if (!actor) 
	{
		return res.status(404).send('Actor not found');
	}
	res.json(actor);
  });

  app.post('/actors', (req, res) => {
	const data = read();
	const actor = { id: Date.now(), ...req.body };
	data.push(actor);
	write(data);
	res.status(201).json(actor);
  });

  app.put('/actors/:id', (req, res) => {
	const data = read();
	const index = data.findIndex(a => a.id == req.params.id);
	if (index === -1)
	{
		return res.status(404).send('Actor not found');
	}
	data[index] = { id: data[index].id, ...req.body };
	write(data);
	res.json(data[index]);
  });

  app.patch('/actors/:id', (req, res) => {
	const data = read();
	const actor = data.find(a => a.id == req.params.id);
	if (!actor)
	{
		return res.status(404).send('Actor not found');
	}
	Object.assign(actor, req.body);
	write(data);
	res.json(actor);
  });

  app.delete('/actors/:id', (req, res) => {
	const data = read().filter(a => a.id != req.params.id);
	write(data);
	res.status(204).send();
  });
};
