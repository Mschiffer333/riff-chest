import { Router } from 'express';
import { TuningController } from './tuning.controllers.js';

const router = Router();
const tuningController = new TuningController();

/*router.get('/', (request, response) => {
    return tuningController.getAll(request, response);
});*/

router.get('/', tuningController.getAll.bind(tuningController))

export default router;