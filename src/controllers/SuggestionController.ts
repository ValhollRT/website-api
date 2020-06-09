import { Request, Response } from 'express';
import { pool } from '../pool';

class SuggestionController {

	public async getAllSuggestionBoard(req: Request, res: Response) {
		let conn;
		let q = `SELECT * FROM SuggestionBoard ORDER BY date DESC`;
		try {
			conn = await pool.getConnection();
			conn.query(q)
				.then(list => {
					res.status(200).json(list);
				})
				.catch(e => {
					console.log(e.code);
					res.status(500).send({ message: 'database error' });
				});
		} catch (err) {
			res.status(500).send({ message: 'something was wrong in server side! ;)' });
		} finally {
			if (conn) conn.release(); //release to pool
		}
	}

	public getSuggestion(req: Request, res: Response) {
		res.status(404).send({ message: 'getSuggestion' });
	}

	public async setNewSuggestion(req: Request, res: Response) {
		let conn;
		let q = `INSERT INTO SuggestionBoard (name, title, message) VALUES ("${req.body.name}", "${req.body.title}", "${req.body.message}")`;
		console.log(req.body);
		try {
			conn = await pool.getConnection();
			const ressult = await conn.query(q)
				.then(list => {
					res.status(200).json({ message: 'message saved' });
				})
				.catch(e => {
					console.log(e.code);
					res.status(500).send({ message: 'database error' });
				});
		} catch (err) {
			res.status(500).send({ message: 'something was wrong in server side! ;)' });
		} finally {
			if (conn) conn.release(); //release to pool
		}
	}
}

export const suggestionController = new SuggestionController();