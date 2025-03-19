document.addEventListener("DOMContentLoaded", () => {
    loadExpenses();
});

const addExpenseBtn = document.getElementById("add-expense");
const expenseNameInput = document.getElementById("expense-name");
const expenseAmountInput = document.getElementById("expense-amount");
const expenseList = document.getElementById("expense-list");
const totalAmount = document.getElementById("total-amount");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

addExpenseBtn.addEventListener("click", () => {
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value.trim());

    if (name === "" || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid expense name and amount.");
        return;
    }

    const expense = { id: Date.now(), name, amount };
    expenses.push(expense);
    saveExpenses();
    renderExpenses();

    expenseNameInput.value = "";
    expenseAmountInput.value = "";
});

function renderExpenses() {
    expenseList.innerHTML = "";
    let total = 0;

    expenses.forEach(expense => {
        total += expense.amount;

        const li = document.createElement("li");
        li.innerHTML = `${expense.name} - ₹${expense.amount}
            <button class="delete-btn" onclick="deleteExpense(${expense.id})">X</button>`;
        expenseList.appendChild(li);
    });

    totalAmount.textContent = total;
}

function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    saveExpenses();
    renderExpenses();
}

function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function loadExpenses() {
    renderExpenses();
}
