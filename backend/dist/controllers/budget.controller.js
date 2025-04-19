"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBudget = exports.updateBudget = exports.addBudget = exports.getBudgets = void 0;
const db_1 = require("../db");
const getBudgets = async (_, res) => {
    const [rows] = await db_1.db.query('SELECT * FROM budgets');
    res.json(rows);
};
exports.getBudgets = getBudgets;
const addBudget = async (req, res) => {
    const { category, limit } = req.body;
    if (!category || limit <= 0) {
        res.status(400).json({ error: 'Invalid input' });
        return;
    }
    await db_1.db.query('INSERT INTO budgets (category, limit) VALUES (?, ?) ON DUPLICATE KEY UPDATE limit = ?', [category, limit, limit]);
    res.status(201).json({ message: 'Budget set successfully' });
};
exports.addBudget = addBudget;
const updateBudget = async (req, res) => {
    const { category, limit } = req.body;
    await db_1.db.query('UPDATE budgets SET category = ?, limit = ? WHERE id = ?', [category, limit, req.params.id]);
    res.json({ message: 'Budget updated successfully' });
};
exports.updateBudget = updateBudget;
const deleteBudget = async (req, res) => {
    await db_1.db.query('DELETE FROM budgets WHERE id = ?', [req.params.id]);
    res.json({ message: 'Budget deleted successfully' });
};
exports.deleteBudget = deleteBudget;
