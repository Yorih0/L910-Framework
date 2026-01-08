const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/athletes.json');

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
    return read().find(a => a.id === id);
  },

  create(athlete) 
  {
    const data = read();
    data.push(athlete);
    write(data);
    return athlete;
  },

  update(id, newAthlete) 
  {
    const data = read();
    const index = data.findIndex(a => a.id === id);
    if (index === -1) return null;

    data[index] = newAthlete;
    write(data);
    return newAthlete;
  },

  patch(id, patchData) 
  {
    const data = read();
    const athlete = data.find(a => a.id === id);
    if (!athlete) return null;

    Object.assign(athlete, patchData);
    write(data);
    return athlete;
  },

  remove(id) 
  {
    const data = read().filter(a => a.id !== id);
    write(data);
  }
};