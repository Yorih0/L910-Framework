const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/actors.json');

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

	create(performer) 
	{
		const data = read();
		data.push(performer);
		write(data);
		return performer;
	},

	update(id, newPerformer) 
	{
		const data = read();
		const index = data.findIndex(p => p.id === id);
		if (index === -1) return null;

		data[index] = newPerformer;
		write(data);
		return newPerformer;
	},

	patch(id, patchData) 
	{
		const data = read();
		const performer = data.find(p => p.id === id);
		if (!performer) return null;

		Object.assign(performer, patchData);
		write(data);
		return performer;
	},

	remove(id) 
	{
		const data = read().filter(p => p.id !== id);
		write(data);
	}
};
