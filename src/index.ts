import express, { Application } from 'express';
import suggestionRoutes from './routes/SuggestionRoutes';
import morgan from 'morgan';
import path from 'path';
import bodyParser from 'body-parser';
import { configuration } from './configuration';
import http from 'http';
import errorHandler from 'express';
import { pool } from './pool';


class Server {

	private app: Application;
	private server: any;

	constructor() {
		this.app = express();
		this.config();
		this.routes();
		this.checkConnectionDatabase();
	}
	config(): void {
		this.app.set('port', configuration.hostPort);
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: false }));
		this.app.use(morgan('dev'));
		this.app.use(express.urlencoded({ extended: false }));

		var cors = require('cors');

		// use it before all route definitions
		this.app.use(cors({origin: 'http://localhost:4200'}));

		this.app.use(express.static(__dirname + configuration.hostUrl));
		this.app.get('/*', (req, res) => {
			res.sendFile(path.join(__dirname));
		});

		// error handling middleware should be loaded after the loading the routes
		if ('development' == this.app.get('env')) {
			this.app.use(errorHandler());
		}
	}
	routes(): void {
		this.app.use('/api/', suggestionRoutes);
	}

	start(): void {
		this.server = http.createServer(this.app);
		this.server.listen(this.app.get('port'), () => {
			console.log('Server started port: ' + configuration.hostPort);
		});
	}

	async checkConnectionDatabase() {
		let conn;
		try {
			conn = await pool.getConnection();
			const rows = await conn.query('SELECT 1 as val');
		} catch (err) {
			throw err;
		} finally {
			if (conn) return conn.end();
		}
	}
}

const server = new Server();
server.start();