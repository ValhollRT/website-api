
import express, { Application } from 'express';
import indexRoutes from './routes/databaseRoutes';
import morgan from 'morgan';
import path from 'path';
import bodyParser from 'body-parser';
import mariadb, { Pool } from 'mariadb';
import { configuration } from './configuration'


class Server {

	public app: Application;
	public pool: Pool;
	private env: any;

	constructor() {
		this.app = express();
		this.config();
		this.routes();

		this.pool = mariadb.createPool({
			host: configuration.dbIp,
			database: configuration.dbSchema,
			user: configuration.dbUser,
			password: configuration.dbPass
		});

		this.checkConnectionDatabase();
	}
	config(): void {
		this.app.set('port', configuration.hostPort);
		this.app.use(bodyParser.urlencoded({ extended: false }));
		this.app.use(bodyParser.json());
		this.app.use(express.static(__dirname + './../../website-valhollrt/dist/website-valhollrt/'));
		this.app.get('/*', (req, res) => {
			res.sendFile(path.join(__dirname));
		});

		this.app.use(morgan('dev'));
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));

		//CORS Middleware
	}
	routes(): void {
		this.app.use('/api/db', indexRoutes);
	}

	start(): void {
		this.app.listen(this.app.get('port'), `${configuration.hostIp}`, () => {
			console.log('Servidor iniciado en el puerto', configuration.hostPort);
		});
	}

	async checkConnectionDatabase() {
		let conn;
		try {
			conn = await this.pool.getConnection();
			console.log(conn);
			const rows = await conn.query('SELECT 10 as val');
			console.log(rows); //[ {val: 1}, meta: ... ]
			// const res = await conn.query('INSERT INTO myTable value (?, ?)', [1, 'mariadb']);
			// console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
		} catch (err) {
			throw err;
		} finally {
			if (conn) return conn.end();
		}
	}
}

const server = new Server();
server.start();