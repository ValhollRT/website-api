import { Router } from 'express';
import { indexController } from '../controllers/IndexController';

class IndexRoutes {
	public router: Router = Router();
	constructor() {
		this.config();
	}

	config(): void {
		this.router.get('/', indexController.checkConnection);
		this.router.post('/', indexController.addSugestion);
	}
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;