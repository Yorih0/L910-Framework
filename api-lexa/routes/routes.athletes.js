const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/athletes.json');

function read() {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function write(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = app => {

  app.get('/athletes', (req, res) => {
    res.json(read());
  });

  app.get('/athletes/:id', (req, res) => {
    const data = read();
    const athlete = data.find(a => a.id == req.params.id);
    if (!athlete) 
    {
      return res.status(404).send('Athlete not found');
    }
    res.json(athlete);
  });

  app.post('/athletes', (req, res) => {
    const data = read();
    const athlete = { id: Date.now(), ...req.body };
    data.push(athlete);
    write(data);
    res.status(201).json(athlete);
  });

  app.put('/athletes/:id', (req, res) => {
    const data = read();
    const index = data.findIndex(a => a.id == req.params.id);
    if (index === -1)
    {
      return res.status(404).send('Athlete not found');
    }
    data[index] = { id: data[index].id, ...req.body };
    write(data);
    res.json(data[index]);
  });

  app.patch('/athletes/:id', (req, res) => {
    const data = read();
    const athlete = data.find(a => a.id == req.params.id);
    if (!athlete)
    {
      return res.status(404).send('Athlete not found');
    }
    Object.assign(athlete, req.body);
    write(data);
    res.json(athlete);
  });

  app.delete('/athletes/:id', (req, res) => {
    const data = read().filter(a => a.id != req.params.id);
    write(data);
    res.status(204).send();
  });
};