const urlModule = require('url');
const URL = urlModule.URL;

module.exports = function enhanceRequest(req)
{
    const url = new URL(req.url,`http://${req.headers.host}`);

    req.query = Object.fromEntries(url.searchParams.entries());
    req.pathname = url.pathname;
}