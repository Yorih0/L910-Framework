class Router 
{
  constructor() 
  {
    this.routes = [];
  }

  register(method, path, handler) 
  {
    this.routes.push({ method, path, handler });
  }

  findRoute(method, url) 
  {
    return this.routes.find(route => route.method === method && route.path === url);
  }
}

module.exports = Router;
