import { Router } from 'express';
import { validate } from '../../shared/middlewares/validation.middleware.js';
import { SongController } from './song.controller.js';
import { createSongSchema } from './song.schema.js';

const router = Router();
const songController = new SongController();

router.post(
    '/',
    validate(createSongSchema),
    (request, response) => songController.create(request, response),
);

export default router;