const http = require("http");

const routes = {
    GET: {},
    POST: {},
    PUT: {},
    PATCH: {},
    DELETE: {}
};

function addRoute(method, path, handler) 
{
    routes[method][path] = handler;
}

function createServer() 
{
    return http.createServer((req, res) => {
        const method = req.method;
        const url = req.url;

        console.log(`${method} | ${url}`);

        const handler = routes[method]?.[url];

        if (handler) 
        {
            handler(req, res);
        } 
        else
        {
            res.writeHead(404);
            res.end("Not found");
        }
    });
}

function startServer(port) 
{
    const server = createServer();
    server.listen(port, "0.0.0.0", () => {
        console.log(`Server running at http://localhost:${port}/`);
    });
}

addRoute("GET", "/", (req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify("НАЧАЛО GET"));
});

addRoute("POST", "/", (req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify("НАЧАЛО POST"));
});

addRoute("PUT", "/", (req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify("НАЧАЛО PUT"));
});

addRoute("PATCH", "/", (req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify("НАЧАЛО PATCH"));
});

addRoute("DELETE", "/", (req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify("НАЧАЛО DELETE"));
});

startServer(3000);
