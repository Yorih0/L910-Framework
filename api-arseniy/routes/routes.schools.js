const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/schools.json');

function read() 
{
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function write(data) 
{
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = app => {

  app.get('/schools', (req, res) => {
    res.json(read());
  });

  app.get('/schools/:id', (req, res) => {
    const data = read();
    const school = data.find(s => s.id == req.params.id);
    if (!school) 
    {
      return res.status(404).send('Philosophical school not found');
    }
    res.json(school);
  });

  app.post('/schools', (req, res) => {
    const data = read();
    const school = { id: Date.now(), ...req.body };
    data.push(school);
    write(data);
    res.status(201).json(school);
  });

  app.put('/schools/:id', (req, res) => {
    const data = read();
    const index = data.findIndex(s => s.id == req.params.id);
    if (index === -1) 
    {
      return res.status(404).send('Philosophical school not found');
    }

    data[index] = { id: data[index].id, ...req.body };
    write(data);
    res.json(data[index]);
  });

  app.patch('/schools/:id', (req, res) => {
    const data = read();
    const school = data.find(s => s.id == req.params.id);
    if (!school)
    {
      return res.status(404).send('Philosophical school not found');
    }

    Object.assign(school, req.body);
    write(data);
    res.json(school);
  });

  app.delete('/schools/:id', (req, res) => {
    const data = read().filter(s => s.id != req.params.id);
    write(data);
    res.status(204).send();
  });
};