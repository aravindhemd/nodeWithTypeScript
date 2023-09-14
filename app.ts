import express, {Express, Request, Response} from  'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userRoutes from './components/users/users.route';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.use("/api/users", userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server is running');
});

export default app;
// module.exports = app;