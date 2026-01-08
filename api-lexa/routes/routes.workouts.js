const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/workouts.json');

function read() 
{
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function write(data) 
{
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = app => {

  app.get('/workouts', (req, res) => {
    res.json(read());
  });

  app.get('/workouts/:id', (req, res) => {
    const data = read();
    const workout = data.find(w => w.id == req.params.id);
    if (!workout) 
    {
      return res.status(404).send('Workout not found');
    }
    res.json(workout);
  });

  app.post('/workouts', (req, res) => {
    const data = read();
    const workout = { id: Date.now(), ...req.body };
    data.push(workout);
    write(data);
    res.status(201).json(workout);
  });

  app.put('/workouts/:id', (req, res) => {
    const data = read();
    const index = data.findIndex(w => w.id == req.params.id);
    if (index === -1) 
    {
      return res.status(404).send('Workout not found');
    }

    data[index] = { id: data[index].id, ...req.body };
    write(data);
    res.json(data[index]);
  });

  app.patch('/workouts/:id', (req, res) => {
    const data = read();
    const workout = data.find(w => w.id == req.params.id);
    if (!workout)
    {
      return res.status(404).send('Workout not found');
    }

    Object.assign(workout, req.body);
    write(data);
    res.json(workout);
  });

  app.delete('/workouts/:id', (req, res) => {
    const data = read().filter(w => w.id != req.params.id);
    write(data);
    res.status(204).send();
  });
};