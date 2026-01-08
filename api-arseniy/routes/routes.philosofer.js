const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/philosophers.json');

function read() {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function write(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = app => {

  app.get('/philosophers', (req, res) => {
    res.json(read());
  });

  app.get('/philosophers/:id', (req, res) => {
    const data = read();
    const philosopher = data.find(p => p.id == req.params.id);
    if (!philosopher) 
    {
      return res.status(404).send('Philosopher not found');
    }
    res.json(philosopher);
  });

  app.post('/philosophers', (req, res) => {
    const data = read();
    const philosopher = { id: Date.now(), ...req.body };
    data.push(philosopher);
    write(data);
    res.status(201).json(philosopher);
  });

  app.put('/philosophers/:id', (req, res) => {
    const data = read();
    const index = data.findIndex(p => p.id == req.params.id);
    if (index === -1)
    {
      return res.status(404).send('Philosopher not found');
    }
    data[index] = { id: data[index].id, ...req.body };
    write(data);
    res.json(data[index]);
  });

  app.patch('/philosophers/:id', (req, res) => {
    const data = read();
    const philosopher = data.find(p => p.id == req.params.id);
    if (!philosopher)
    {
      return res.status(404).send('Philosopher not found');
    }
    Object.assign(philosopher, req.body);
    write(data);
    res.json(philosopher);
  });

  app.delete('/philosophers/:id', (req, res) => {
    const data = read().filter(p => p.id != req.params.id);
    write(data);
    res.status(204).send();
  });
};