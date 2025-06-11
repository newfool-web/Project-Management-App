import express from 'express';
import authRoutes from '../src/routes/auth.route';

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

export default (req: any, res: any) => {
  // Let Express handle the request
  app(req, res);
}; 