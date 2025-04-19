import express from 'express';
import cors from 'cors';
import expenseRoutes from './routes/expense.routes';
import budgetRoutes from './routes/budget.routes';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/expenses', expenseRoutes);
app.use('/api/budget', budgetRoutes);

app.get('/', (_, res) => {
  res.send('Personal Finance Manager API running!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});