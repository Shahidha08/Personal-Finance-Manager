"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const expense_routes_1 = __importDefault(require("./routes/expense.routes"));
const budget_routes_1 = __importDefault(require("./routes/budget.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/expenses', expense_routes_1.default);
app.use('/api/budget', budget_routes_1.default);
app.get('/', (_, res) => {
    res.send('Personal Finance Manager API running!');
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
