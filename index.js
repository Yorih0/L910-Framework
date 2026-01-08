const App = require('./framework/app');
const bodyParser = require('./framework/bodyParser');

const actorsRoutes = require('./api-ivan/routes/routes.actors');
const showsRoutes = require('./api-ivan/routes/routes.show');

const app = new App();

app.use(bodyParser);

actorsRoutes(app);
showsRoutes(app);

const philosophersRoutes = require('./api-arseniy/routes/routes.philosofer');
const schoolsRoutes = require('./api-arseniy/routes/routes.schools');

philosophersRoutes(app);
schoolsRoutes(app);

const athletesRoutes = require('./api-lexa/routes/routes.athletes');
const workoutsRoutes = require('./api-lexa/routes/routes.workouts');

athletesRoutes(app);
workoutsRoutes(app);

app.listen(3000, () => {
	console.log('Server started http://127.0.0.1:3000');
});
