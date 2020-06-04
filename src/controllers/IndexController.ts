import { Request, Response } from 'express';
import { Server } from 'http';

class IndexController {

	public checkConnection(req: Request, res: Response) {
		res.status(200).send({ connection: 'YES' });
	}

	public addSugestion(req: Request, res: Response) {
		console.log(req.body);
		res.status(404).send({ message: 'el producto no se ha recibido' });
	}
}

export const indexController = new IndexController();