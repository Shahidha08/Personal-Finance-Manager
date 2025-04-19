import { Request, Response } from 'express';
import { db } from '../db';

export const getAllExpenses = async (_: Request, res: Response):Promise<void> => {
  const [rows] = await db.query('SELECT * FROM expenses ORDER BY date DESC');
  res.json(rows);
};

export const getExpenseById = async (req: Request, res: Response) :Promise<void>=> {
  const [rows] = await db.query<any[]>('SELECT * FROM expenses WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
};

export const addExpense = async (req: Request, res: Response): Promise<void> => {
  const { title, amount, category, date } = req.body;
  if (!title || amount <= 0 || !category || !date) {
    res.status(400).json({ error: 'Invalid input' });
    return;
  }
  await db.query(
    'INSERT INTO expenses (title, amount, category, date) VALUES (?, ?, ?, ?)',
    [title, amount, category, date]
  );
  res.status(201).json({ message: 'Expense added successfully' });
};

export const updateExpense = async (req: Request, res: Response):Promise<void> => {
  const { title, amount, category, date } = req.body;
  await db.query(
    'UPDATE expenses SET title = ?, amount = ?, category = ?, date = ? WHERE id = ?',
    [title, amount, category, date, req.params.id]
  );
  res.json({ message: 'Expense updated successfully' });
};

export const deleteExpense = async (req: Request, res: Response):Promise<void>=> {
  await db.query('DELETE FROM expenses WHERE id = ?', [req.params.id]);
  res.json({ message: 'Expense deleted successfully' });
};