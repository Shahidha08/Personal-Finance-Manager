"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExpense = exports.updateExpense = exports.addExpense = exports.getExpenseById = exports.getAllExpenses = void 0;
const db_1 = require("../db");
const getAllExpenses = async (_, res) => {
    const [rows] = await db_1.db.query('SELECT * FROM expenses ORDER BY date DESC');
    res.json(rows);
};
exports.getAllExpenses = getAllExpenses;
const getExpenseById = async (req, res) => {
    const [rows] = await db_1.db.query('SELECT * FROM expenses WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
};
exports.getExpenseById = getExpenseById;
const addExpense = async (req, res) => {
    const { title, amount, category, date } = req.body;
    if (!title || amount <= 0 || !category || !date) {
        res.status(400).json({ error: 'Invalid input' });
        return;
    }
    await db_1.db.query('INSERT INTO expenses (title, amount, category, date) VALUES (?, ?, ?, ?)', [title, amount, category, date]);
    res.status(201).json({ message: 'Expense added successfully' });
};
exports.addExpense = addExpense;
const updateExpense = async (req, res) => {
    const { title, amount, category, date } = req.body;
    await db_1.db.query('UPDATE expenses SET title = ?, amount = ?, category = ?, date = ? WHERE id = ?', [title, amount, category, date, req.params.id]);
    res.json({ message: 'Expense updated successfully' });
};
exports.updateExpense = updateExpense;
const deleteExpense = async (req, res) => {
    await db_1.db.query('DELETE FROM expenses WHERE id = ?', [req.params.id]);
    res.json({ message: 'Expense deleted successfully' });
};
exports.deleteExpense = deleteExpense;
