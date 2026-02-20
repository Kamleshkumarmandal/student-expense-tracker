let totalAmount = 0;

function addExpense() {
    let amount = document.getElementById("amount").value;
    let category = document.getElementById("category").value;

    if (amount === "") {
        alert("Enter amount");
        return;
    }

    totalAmount += parseInt(amount);

    document.getElementById("total").innerText = totalAmount;

    let li = document.createElement("li");
    li.innerText = category + " - ₹" + amount;

    document.getElementById("expense-list").appendChild(li);

    document.getElementById("amount").value = "";
}
