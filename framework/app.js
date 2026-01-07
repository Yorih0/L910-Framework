const http = require('http');
const Router = require('./router');
const enhanceRequest = require('./request');
const enhanceResponse = require('./response');

class App 
{
  constructor() 
  {
    this.router = new Router();
    this.middlewares = [];
  }

  use(middleware)
  {
    this.middlewares.push(middleware);
  }

  get(path,handler)
  {
    this.router.register('GET',path,handler);
  }
  
  post(path,handler)
  {
    this.router.register('POST',path,handler);
  }

  handle(req,res)
  {
    enhanceRequest(req);
    enhanceResponse(res);

    let i = 0;

    const next = () => {
      if(i < this.middlewares.length)
      {
        const middlewares = this.middlewares[i++];
        middlewares(req,res,next);
      }
      else
      {
        const route = this.router.findRoute(req.method,req.url);

        if(route)
        {
          route.handler(req,res);
        }
        else
        {
          res.status(404).send('Not Found');
        }
      }
    };
    next();
  }

  listen(port, callback) 
  {
    const server = http.createServer((req,res) => {
      this.handle(req,res)
    });
    server.listen(port,callback);
  }
}

module.exports = App;
