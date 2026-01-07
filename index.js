const App = require('./framework/app');
const bodyParser = require('./framework/bodyParser');

const app = new App();

app.use(bodyParser);

app.use((req,res,next) => {
  console.log(`[${req.method}]:${req.url}`);
  next();
});


app.get('/hello', (req, res) => {
  res.status(200).json({
    message: 'Hello!',
    query: req.query
  });
});

app.post('/data', (req, res) => {
  res.json({
    message: 'Data received',
    body: req.body
  });
});


app.listen(3000, () => {
  console.log('Server started http://127.0.0.1:3000');
});
