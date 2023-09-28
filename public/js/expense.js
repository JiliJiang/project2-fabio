
    const incomeElement = document.getElementById('income');
    const expensesElement = document.getElementById('expenses');
    const netElement = document.getElementById('net');
    const transactionForm = document.getElementById('expense-form');
    const transactionTypeSelect = document.getElementById('transaction-type');
    const transactionCategorySelect = document.getElementById('transaction-category');
    const transactionAmountInput = document.getElementById('transaction-amount');
    const transactionList = document.getElementById('transaction-list');


    // Function to fetch and render transactions from the server
    
        fetch('/api/expense')
            .then(res => res.json())
            .then(transactions => 
                {console.log(transactions);
                transactions.forEach(transaction => {
                document.getElementById('transaction-history').innerHTML +=`
                <li>Expense: ${transaction.expense}</li>
                <li>Income: ${transaction.income}</li>
                <li>Month: ${transaction.month}</li>
                
                `;})
            
                    }
            )
    

    // Event listener for the transaction form submission
    document.getElementById('save-expense-button').addEventListener('click',
        (event) => {
            console.log('click')
            event.preventDefault();

            const type = transactionTypeSelect.value;
            const category = transactionCategorySelect.value;
            const amount = parseFloat(transactionAmountInput.value);
            const month = localStorage.getItem('month') || 1;
            console.log(type, category, amount, month);

            if (!type || category === 'Select Transaction Category' || isNaN(amount)) {
                // Show an error message
                Swal.fire('Error', 'Please fill in all fields with valid values.', 'error');
                return;
            }

            const newTransaction = {
                type,
                category,
                amount,
                month
            };

            // Send the new transaction to the server
            fetch('/api/expense', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTransaction),
            })           
            .then((response) => {
                
                    console.log(response);

                    transactionTypeSelect.value = 'Select Transaction Type';
                    transactionCategorySelect.value = 'Select Transaction Category';
                    transactionAmountInput.value = '';
       
                    Swal.fire('Saved', 'The transaction has been saved.', 'success');           
                
                document.getElementById('transaction-list').innerHTML += `
                <li>type: ${type}</li>
                <li>category: ${category}</li>
                <li>amount: ${amount}</li>
                <li>month: ${month}</li>`
                    // Clear form fields after saving
                })
                .catch((error) => {
                    console.error('Error saving transaction:', error);
                    // Show an error message
                    Swal.fire('Error', 'An error occurred while saving the transaction.', 'error');
                });
        });

    document.querySelector('#month').addEventListener('click',
        function (e) {
            const target = e.target
            if (target.matches("button")) {
                console.log(target.dataset.value);
                target.style.backgroundColor = 'pink';
                let month = target.dataset.value;
                //getMonthdata(target.dataset.value);
                localStorage.setItem("month", month);
            }
        })

