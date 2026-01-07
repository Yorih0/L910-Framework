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

module.exports = {
	getAll()
	{ 
		return read();
	},

	getById(id) 
	{ 
		return read().find(s => s.id === id);
	},

	create(show) 
	{
		const data = read();
		data.push(show);
		write(data);
		return show;
	},

	update(id, newShow) 
	{
		const data = read();
		const index = data.findIndex(s => s.id === id);
		if (index === -1) return null;

		data[index] = newShow;
		write(data);
		return newShow;
	},

	patch(id, patchData) 
	{
		const data = read();
		const show = data.find(s => s.id === id);
		if (!show) return null;

		Object.assign(show, patchData);
		write(data);
		return show;
	},

	remove(id) 
	{
		const data = read().filter(s => s.id !== id);
		write(data);
	}
};
