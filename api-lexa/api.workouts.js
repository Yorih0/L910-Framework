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

module.exports = {
  getAll()
  { 
    return read();
  },

  getById(id) 
  { 
    return read().find(w => w.id === id);
  },

  create(workout) 
  {
    const data = read();
    data.push(workout);
    write(data);
    return workout;
  },

  update(id, newWorkout) 
  {
    const data = read();
    const index = data.findIndex(w => w.id === id);
    if (index === -1) return null;

    data[index] = newWorkout;
    write(data);
    return newWorkout;
  },

  patch(id, patchData) 
  {
    const data = read();
    const workout = data.find(w => w.id === id);
    if (!workout) return null;

    Object.assign(workout, patchData);
    write(data);
    return workout;
  },

  remove(id) 
  {
    const data = read().filter(w => w.id !== id);
    write(data);
  }
};