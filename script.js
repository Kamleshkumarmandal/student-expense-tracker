let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let totalAmount = 0;
let chart;

function saveToLocalStorage() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function renderExpenses() {
    let expenseList = document.getElementById("expense-list");
    expenseList.innerHTML = "";
    totalAmount = 0;

    let categoryTotals = {};

    expenses.forEach((expense, index) => {
        totalAmount += expense.amount;

        if (!categoryTotals[expense.category]) {
            categoryTotals[expense.category] = 0;
        }
        categoryTotals[expense.category] += expense.amount;

        let li = document.createElement("li");
        li.innerHTML = `
            ${expense.category} - ₹${expense.amount}
            <button onclick="deleteExpense(${index})">❌</button>
        `;
        expenseList.appendChild(li);
    });

    document.getElementById("total").innerText = totalAmount;

    updateChart(categoryTotals);
}

function addExpense() {
    let amount = document.getElementById("amount").value;
    let category = document.getElementById("category").value;

    if (amount === "") {
        alert("Enter amount");
        return;
    }

    expenses.push({
        category: category,
        amount: parseInt(amount)
    });

    saveToLocalStorage();
    renderExpenses();
    document.getElementById("amount").value = "";
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    saveToLocalStorage();
    renderExpenses();
}

function clearAll() {
    expenses = [];
    saveToLocalStorage();
    renderExpenses();
}

function updateChart(categoryTotals) {
    let ctx = document.getElementById("expenseChart").getContext("2d");

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: Object.keys(categoryTotals),
            datasets: [{
                label: "Expenses by Category",
                data: Object.values(categoryTotals)
            }]
        }
    });
}

renderExpenses();
