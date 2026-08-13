const search = document.getElementById("search");
const filterCategory = document.getElementById("filterCategory");
const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

const expenseForm = document.getElementById("expenseForm");

const title = document.getElementById("title");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const date = document.getElementById("date");
const incomeForm = document.getElementById("incomeForm");
const incomeTitle = document.getElementById("incomeTitle");
const incomeAmount = document.getElementById("incomeAmount");

let totalIncome =
    Number(localStorage.getItem("totalIncome")) || 0;

const transactionList = document.getElementById("transactionList");
let transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];
expenseForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const transaction = {
        title: title.value,
        amount: Number(amount.value),
        category: category.value,
        date: date.value
    };

    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    displayTransactions();
    updateSummary();

    console.log(transaction);

    expenseForm.reset();
});
function displayTransactions() {

    transactionList.innerHTML = "";

    transactions.forEach(function (transaction, index) {

        const li = document.createElement("li");

        li.innerHTML = `
            <span>
                ${transaction.title} - ₹${transaction.amount}
            </span>

            <div>
                <button onclick="editTransaction(${index})">
                    Edit
                </button>

                <button onclick="deleteTransaction(${index})">
                    Delete
                </button>
            </div>
        `;

        transactionList.appendChild(li);
    });
}
function deleteTransaction(index) {

    transactions.splice(index, 1);

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

    displayTransactions();
    updateSummary();
}
function editTransaction(index) {

    const transaction = transactions[index];

    const newTitle = prompt("Enter new title:", transaction.title);
    const newAmount = prompt("Enter new amount:", transaction.amount);

    if (newTitle && newAmount) {

        transaction.title = newTitle;
        transaction.amount = Number(newAmount);

        displayTransactions();
        updateSummary();
    }
}
function updateSummary() {

    let totalExpense = 0;

    transactions.forEach(function (transaction) {
        totalExpense += transaction.amount;
    });

    expense.innerText = `₹${totalExpense}`;

  balance.innerText = `₹${totalIncome - totalExpense}`;
}
incomeForm.addEventListener("submit", function (e) {

    e.preventDefault();

    totalIncome += Number(incomeAmount.value);

    localStorage.setItem("totalIncome", totalIncome);

    income.innerText = `₹${totalIncome}`;

    updateSummary();

    incomeForm.reset();
});
displayTransactions();
updateSummary();
income.innerText = `₹${totalIncome}`;

displayTransactions();
updateSummary();
search.addEventListener("input", displayTransactions);

filterCategory.addEventListener("change", displayTransactions);



