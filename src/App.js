import { useState } from "react";
import "./index.css";

export default function App() {
  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <ExpenseTracker />
    </div>
  );
}

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([
    { id: 1, description: "Coffee", amount: 3 },
    { id: 2, description: "Groceries", amount: 15 },
  ]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  function handleAdd() {
    if (!description || !amount) return;

    const newExpense = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
    };
    setExpenses([...expenses, newExpense]);
    setDescription("");
    setAmount("");
  }

  function handleDelete(id) {
    setExpenses(expenses.filter((item) => item.id !== id));
  }

  const total = expenses.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div>
      <div className="form">
        <input
          type="text"
          placeholder="Expense description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={handleAdd}>Add Expense</button>
      </div>

      <ul className="expense-list">
        {expenses.map((item) => (
          <li key={item.id}>
            {item.description} — ${item.amount}
            <button onClick={() => handleDelete(item.id)}>❌</button>
          </li>
        ))}
      </ul>

      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
}
