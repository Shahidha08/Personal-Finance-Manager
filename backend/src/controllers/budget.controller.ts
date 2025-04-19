import { Request, Response } from 'express';
import { db } from '../db';

export const getBudgets = async (_: Request, res: Response):Promise<void> => {
  const [rows] = await db.query('SELECT * FROM budgets');
  res.json(rows);
};

export const addBudget = async (req: Request, res: Response): Promise<void> => {
  const { category, limit } = req.body;

  if (!category || limit <= 0) {
    res.status(400).json({ error: 'Invalid input' });
    return;
  }

  await db.query(
    'INSERT INTO budgets (category, `limit`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `limit`= ?',
    [category, limit, limit]
  );

  res.status(201).json({ message: 'Budget set successfully' });
};

export const updateBudget = async (req: Request, res: Response): Promise<void>=> {
  const { category, limit } = req.body;
  await db.query('UPDATE budgets SET category = ?, `limit `= ? WHERE id = ?', [category, limit, req.params.id]);
  res.json({ message: 'Budget updated successfully' });
};

export const deleteBudget = async (req: Request, res: Response):Promise<void> => {
  await db.query('DELETE FROM budgets WHERE id = ?', [req.params.id]);
  res.json({ message: 'Budget deleted successfully' });
};