const App = require('./framework/app');
const bodyParser = require('./framework/bodyParser');

const actorsRoutes = require('./framework/api-ivan/routes/routes.actors');
const showsRoutes = require('./framework/api-ivan/routes/routes.show');

const app = new App();

app.use(bodyParser);

actorsRoutes(app);
showsRoutes(app);

app.listen(3000, () => {
	console.log('Server started http://127.0.0.1:3000');
});
