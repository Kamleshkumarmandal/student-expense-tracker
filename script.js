let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

let totalAmount = 0;

function saveToLocalStorage() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function renderExpenses() {
    let expenseList = document.getElementById("expense-list");
    expenseList.innerHTML = "";
    totalAmount = 0;

    expenses.forEach((expense, index) => {
        totalAmount += expense.amount;

        let li = document.createElement("li");
        li.innerHTML = `
            ${expense.category} - ₹${expense.amount}
            <button onclick="deleteExpense(${index})">❌</button>
        `;

        expenseList.appendChild(li);
    });

    document.getElementById("total").innerText = totalAmount;
}

function addExpense() {
    let amount = document.getElementById("amount").value;
    let category = document.getElementById("category").value;

    if (amount === "") {
        alert("Enter amount");
        return;
    }

    let newExpense = {
        category: category,
        amount: parseInt(amount)
    };

    expenses.push(newExpense);

    saveToLocalStorage();
    renderExpenses();

    document.getElementById("amount").value = "";
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    saveToLocalStorage();
    renderExpenses();
}

// Load data when page opens
renderExpenses();
