import { Router } from 'express';
import * as ExpenseController from '../controllers/expense.controller';

const router = Router();

router.get('/', ExpenseController.getAllExpenses);
router.get('/:id', ExpenseController.getExpenseById);
router.post('/', ExpenseController.addExpense);
router.put('/:id', ExpenseController.updateExpense);
router.delete('/:id', ExpenseController.deleteExpense);

export default router;