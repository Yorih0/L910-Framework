const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/philosophers.json');

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
    return read().find(p => p.id === id);
  },

  create(philosopher) 
  {
    const data = read();
    data.push(philosopher);
    write(data);
    return philosopher;
  },

  update(id, newPhilosopher) 
  {
    const data = read();
    const index = data.findIndex(p => p.id === id);
    if (index === -1) return null;

    data[index] = newPhilosopher;
    write(data);
    return newPhilosopher;
  },

  patch(id, patchData) 
  {
    const data = read();
    const philosopher = data.find(p => p.id === id);
    if (!philosopher) return null;

    Object.assign(philosopher, patchData);
    write(data);
    return philosopher;
  },

  remove(id) 
  {
    const data = read().filter(p => p.id !== id);
    write(data);
  }
};