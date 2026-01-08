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

module.exports = {
  getAll()
  { 
    return read();
  },

  getById(id) 
  { 
    return read().find(s => s.id === id);
  },

  create(school) 
  {
    const data = read();
    data.push(school);
    write(data);
    return school;
  },

  update(id, newSchool) 
  {
    const data = read();
    const index = data.findIndex(s => s.id === id);
    if (index === -1) return null;

    data[index] = newSchool;
    write(data);
    return newSchool;
  },

  patch(id, patchData) 
  {
    const data = read();
    const school = data.find(s => s.id === id);
    if (!school) return null;

    Object.assign(school, patchData);
    write(data);
    return school;
  },

  remove(id) 
  {
    const data = read().filter(s => s.id !== id);
    write(data);
  }
};