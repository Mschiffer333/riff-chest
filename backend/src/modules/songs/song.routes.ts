import { Router } from 'express';
import { validate } from '../../shared/middlewares/validation.middleware.js';
import { SongController } from './song.controller.js';
import { createSongSchema } from './song.schema.js';

const router = Router();
const songController = new SongController();

router.get('/', (request, response) => {
  return songController.getAll(request, response);
});

router.get('/:id', (request, response) => {
  return songController.getById(request, response);
});

router.post(
    '/',
    validate(createSongSchema),
    (request, response) => songController.create(request, response),
);

router.put(
  '/:id',
  validate(createSongSchema),
  (request, response) => songController.update(request, response),
);

router.delete('/:id', (request, response) =>
  songController.delete(request, response),
);

export default router;