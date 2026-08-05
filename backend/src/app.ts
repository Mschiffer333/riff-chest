import express from 'express';
import tuningRoutes from './modules/tunings/tuning.routes.js';
import songRoutes from './modules/songs/song.routes.js';
import { errorHandler } from './shared/middlewares/error-handler.middleware.js';

const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
  res.status(200).json({
    message: 'Hello from Riffchest API',
    version: '1.0.0',
    status: 'running',
  });
});

app.use('/api/tunings', tuningRoutes);
app.use('/api/songs', songRoutes)
app.use(errorHandler);

export default app;
