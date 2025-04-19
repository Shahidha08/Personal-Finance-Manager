import { Router } from 'express';
import {
  getBudgets,
  addBudget,
  updateBudget,
  deleteBudget,
} from '../controllers/budget.controller';

const router = Router();

router.get('/', getBudgets);
router.post('/', addBudget);
router.put('/:id', updateBudget);
router.delete('/:id', deleteBudget);

export default router;