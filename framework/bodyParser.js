module.exports = function bodyParser(req , res,next)
{
    if(req.method === 'GET' || req.method === 'DELETE')
    {
        return next();
    }

    let body ='';

    req.on('data',chunk => {
        body +=chunk.toString();
    });

    req.on('end', () =>{
        try 
        {
            req.body =  body?JSON.parse(body):{};
        }
        catch(err)
        {
            req.body = {};
        }

        next();
    })

    req.on('error',err => {
        console.error(err);
        res.statusCode = 400;
        res.end('Error parsing body');
    });
};