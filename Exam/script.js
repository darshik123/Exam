
let authContainer = document.getElementById('auth-container');
let appContainer = document.getElementById('app-container');
let loginForm = document.getElementById('login-form');
let signupForm = document.getElementById('signup-form');
let logoutBtn = document.getElementById('logout-btn');
let welcomeUser = document.getElementById('welcome-user');
let expenseForm = document.getElementById('expense-form');
let filterForm = document.getElementById('filter-form');
let resetFiltersBtn = document.getElementById('reset-filters');
let expensesTable = document.getElementById('expenses-table');
let totalExpensesElement = document.getElementById('total-expenses');
let monthExpensesElement = document.getElementById('month-expenses');
let todayExpensesElement = document.getElementById('today-expenses');


let editExpenseModal = new bootstrap.Modal(document.getElementById('editExpenseModal'));
let editExpenseForm = document.getElementById('edit-expense-form');
let saveEditBtn = document.getElementById('save-edit-btn');


let currentUser = null;
let expenses = [];
let filteredExpenses = [];


init();

function init() {

    let loggedInUser = localStorage.getItem('currentUser');
    if (loggedInUser) {
        currentUser = JSON.parse(loggedInUser);
        showApp();
        loadExpenses();
        updateSummary();
    } else {
        showAuth();
    }


    let today = new Date().toISOString().split('T')[0];
    document.getElementById('expense-date').value = today;
}

function showAuth() {
    authContainer.classList.remove('d-none');
    appContainer.classList.add('d-none');
}

function showApp() {
    authContainer.classList.add('d-none');
    appContainer.classList.remove('d-none');
    welcomeUser.textContent = `Welcome, ${currentUser.name}`;
}


loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let email = document.getElementById('login-email').value;
    let password = document.getElementById('login-password').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let user = users.find(u => u.email === email && u.password === password);

    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showApp();
        loadExpenses();
        updateSummary();


        loginForm.reset();
    } else {
        alert('Invalid email or password');
    }
});

signupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let name = document.getElementById('signup-name').value;
    let email = document.getElementById('signup-email').value;
    let password = document.getElementById('signup-password').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];


    if (users.some(u => u.email === email)) {
        alert('User with this email already exists');
        return;
    }


    let newUser = {
        id: Date.now().toString(),
        name,
        email,
        password
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));


    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));


    localStorage.setItem(`expenses_${currentUser.id}`, JSON.stringify([]));

    showApp();


    signupForm.reset();
});

logoutBtn.addEventListener('click', function () {
    currentUser = null;
    localStorage.removeItem('currentUser');

    showAuth();
    location.reload();
});











expenseForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let expense = {
        id: Date.now().toString(),
        name: document.getElementById('expense-name').value,
        amount: parseFloat(document.getElementById('expense-amount').value),
        category: document.getElementById('expense-category').value,
        date: document.getElementById('expense-date').value
    };

    expenses.push(expense);
    saveExpenses();
    updateExpensesTable();
    updateSummary();


    expenseForm.reset();
    document.getElementById('expense-date').value = new Date().toISOString().split('T')[0];
});

function loadExpenses() {
    if (!currentUser || !currentUser.id) {
        expenses = [];
        filteredExpenses = [];
        return;
    }

    let expensesData = localStorage.getItem(`expenses_${currentUser.id}`);
    expenses = expensesData ? JSON.parse(expensesData) : [];
    filteredExpenses = [...expenses];
}


function saveExpenses() {
    localStorage.setItem(`expenses_${currentUser.id}`, JSON.stringify(expenses));
}

function updateExpensesTable() {
    expensesTable.innerHTML = '';

    if (filteredExpenses.length === 0) {
        expensesTable.innerHTML = '<tr><td colspan="5" class="text-center">No expenses found</td></tr>';
        return;
    }

    filteredExpenses.forEach(expense => {
        let row = document.createElement('tr');
        row.innerHTML = `
                <td>${expense.name}</td>
                <td>$${expense.amount.toFixed(2)}</td>
                <td>${expense.category}</td>
                <td>${formatDate(expense.date)}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary edit-btn" data-id="${expense.id}">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${expense.id}">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            `;
        expensesTable.appendChild(row);
    });


    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            let expenseId = this.getAttribute('data-id');
            editExpense(expenseId);
        });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            let expenseId = this.getAttribute('data-id');
            deleteExpense(expenseId);
        });
    });
}
updateExpensesTable()
function editExpense(expenseId) {
    let expense = expenses.find(e => e.id === expenseId);
    if (!expense) return;

    document.getElementById('edit-expense-id').value = expense.id;
    document.getElementById('edit-expense-name').value = expense.name;
    document.getElementById('edit-expense-amount').value = expense.amount;
    document.getElementById('edit-expense-category').value = expense.category;
    document.getElementById('edit-expense-date').value = expense.date;

    editExpenseModal.show();
}

saveEditBtn.addEventListener('click', function () {
    let expenseId = document.getElementById('edit-expense-id').value;
    let expenseIndex = expenses.findIndex(e => e.id === expenseId);

    if (expenseIndex === -1) return;

    expenses[expenseIndex] = {
        id: expenseId,
        name: document.getElementById('edit-expense-name').value,
        amount: parseFloat(document.getElementById('edit-expense-amount').value),
        category: document.getElementById('edit-expense-category').value,
        date: document.getElementById('edit-expense-date').value
    };

    saveExpenses();
    applyFilters();
    updateSummary();
    editExpenseModal.hide();
});

function deleteExpense(expenseId) {
    if (confirm('Are you sure you want to delete this expense?')) {
        expenses = expenses.filter(e => e.id !== expenseId);
        saveExpenses();
        applyFilters();
        updateSummary();
    }
}


filterForm.addEventListener('submit', function (e) {
    e.preventDefault();
    applyFilters();
});

resetFiltersBtn.addEventListener('click', function () {
    document.getElementById('filter-category').value = '';
    document.getElementById('filter-start-date').value = '';
    document.getElementById('filter-end-date').value = '';
    applyFilters();
});

function applyFilters() {
    let category = document.getElementById('filter-category').value;
    let startDate = document.getElementById('filter-start-date').value;
    let endDate = document.getElementById('filter-end-date').value;

    filteredExpenses = expenses.filter(expense => {

        if (category && expense.category !== category) return false;


        if (startDate && expense.date < startDate) return false;
        if (endDate && expense.date > endDate) return false;

        return true;
    });

    updateExpensesTable();
}


function updateSummary() {
    let today = new Date().toISOString().split('T')[0];
    let currentMonth = new Date().toISOString().slice(0, 7);

    let total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    let todayTotal = expenses
        .filter(expense => expense.date === today)
        .reduce((sum, expense) => sum + expense.amount, 0);
    let monthTotal = expenses
        .filter(expense => expense.date.startsWith(currentMonth))
        .reduce((sum, expense) => sum + expense.amount, 0);

    totalExpensesElement.textContent = `$${total.toFixed(2)}`;
    todayExpensesElement.textContent = `$${todayTotal.toFixed(2)}`;
    monthExpensesElement.textContent = `$${monthTotal.toFixed(2)}`;
}


function formatDate(dateString) {
    let options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}







