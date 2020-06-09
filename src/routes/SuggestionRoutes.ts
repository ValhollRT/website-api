import { Router } from 'express';
import { suggestionController } from '../controllers/SuggestionController';

class SuggestionRoutes {
	public router: Router = Router();
	constructor() {
		this.config();
	}

	config(): void {
		this.router.get('/suggestions', suggestionController.getAllSuggestionBoard);
		this.router.post('/new-suggestion', suggestionController.setNewSuggestion);
	}
}

const suggestionRoutes = new SuggestionRoutes();
export default suggestionRoutes.router;