import express from 'express';
import tuningRoutes from './routes/tuning.routes.js'

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

export default app;
