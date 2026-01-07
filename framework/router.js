class Router 
{
	constructor() 
	{
		this.routes = [];
	}
	register(method, path, handler) 
	{
		const parts = path.split('/').filter(Boolean);
		const params = parts.map(p => p.startsWith(':'));

		this.routes.push({ method, path, parts, params, handler });
	}

	findRoute(method, pathname) 
	{
		const urlParts = pathname.split('/').filter(Boolean);

		for (const route of this.routes) 
		{
			if (route.method !== method) continue;
			if (route.parts.length !== urlParts.length) continue;

			const reqParams = {};
			let match = true;

			for (let i = 0; i < route.parts.length; i++) 
			{
				if (route.params[i]) 
				{
					reqParams[route.parts[i].slice(1)] = urlParts[i];
				} 
				else if (route.parts[i] !== urlParts[i]) 
				{
					match = false;
					break;
				}
			}

			if (match)
			{
				return { handler: route.handler, params: reqParams };
			} 
		}
		return null;
	}
}

module.exports = Router;
