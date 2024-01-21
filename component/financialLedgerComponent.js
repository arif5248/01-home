

function executeFinancialLedger(){
    const data = {
        Opening_Balance:35465,
        Total_Debit:68965,
        Total_Credit:5645,
        Closing_Balance:6564,               
    }

    const ledgerData = [
        {
            date: "17/JAN/2024",
            particulars: "Unknown",
            debit: 345,
            credit: 683,
        },
        {
            date: "10/DEC/2023",
            particulars: "Unknown",
            debit: 456,
            credit: 890,
        },
        {
            date: "05/DEC/2023",
            particulars: "Unknown",
            debit: 234,
            credit: 758,
        },
        {
            date: "11/NOV/2023",
            particulars: "Unknown",
            debit: 4678,
            credit: 8954,
        },
        {
            date: "15/JAN/2023",
            particulars: "Unknown",
            debit: 347,
            credit: 974,
        },
        {
            date: "15/JAN/2023",
            particulars: "Unknown",
            debit: 345,
            credit: 683,
        },
        {
            date: "15/JAN/2023",
            particulars: "Unknown",
            debit: 345,
            credit: 683,
        },
        {
            date: "15/JAN/2023",
            particulars: "Unknown",
            debit: 345,
            credit: 683,
        },
        {
            date: "15/JAN/2023",
            particulars: "Unknown",
            debit: 345,
            credit: 683,
        },
        {
            date: "15/JAN/2023",
            particulars: "Unknown",
            debit: 345,
            credit: 683,
        },
        {
            date: "15/JAN/2023",
            particulars: "Unknown",
            debit: 345,
            credit: 683,
        },
        {
            date: "15/JAN/2023",
            particulars: "Unknown",
            debit: 345,
            credit: 683,
        },
        {
            date: "15/JAN/2023",
            particulars: "Unknown",
            debit: 345,
            credit: 683,
        },
    ]

    const today = new Date().toISOString().split('T')[0];
    

    function financialLedger(){
        document.getElementById('mainContentSection').innerHTML = 
        `
            <div class="financial-Heading" id="financial-Heading">
                <div class="heading">
                    <h1>Financial Ledger</h1>
                </div>
            </div>

            <div class="container">
                <div class="searchContent">
                    <div class="input-box">
                        <input type="date" id="date-from" >
                        <span>To</span>
                        <input type="date" id="date-to">
                    </div>
                    <div class="searchLedger">
                        <h5>SEARCH</h5>
                    </div>
                </div>
            </div>

            <div class="container">
                <div class="ledgerSummury" id="ledgerSummury"></div>
            </div>

            <div class="container">
            <div class="ledgerTable" id="ledgerTable"></div>
            </div>
            
        `
    }

    function renderLedgerSummury(){
        document.getElementById('ledgerSummury').innerHTML = 
        `
            <div class= "item">
                <div class="left">
                    <p>Opening Balance</p>
                    <p>:</p>
                </div>
                <div class="right">
                    <p>${data.Opening_Balance}</p>
                </div>     
            </div>
            <div class= "item">
                <div class="left">
                    <p>Total Debit</p>
                    <p>:</p>
                </div>
                <div class="right">
                    <p>${data.Total_Debit}</p>
                </div>     
            </div>
            <div class= "item">
                <div class="left">
                    <p>Total Credit</p>
                    <p>:</p>
                </div>
                <div class="right">
                    <p>${data.Total_Credit}</p>
                </div>     
            </div>
            <div class= "item">
                <div class="left">
                    <p>Closing Balance</p>
                    <p>:</p>
                </div>
                <div class="right">
                    <p>${data.Closing_Balance}</p>
                </div>     
            </div>
        `
    }

    function renderLedgerTable(){
        var tableBody = document.getElementById('ledgerTable')
        tableBody.innerHTML =
         `
            <table>
                <tr>
                    <th>Date</th>
                    <th>Particulars</th>
                    <th>Debit</th>
                    <th>Credit</th>
                </tr>
            </table>
        `;
        ledgerData.forEach(data => {
            const newRow = document.createElement('tr');
    
            newRow.innerHTML = `
                <td>${data.date}</td>
                <td>${data.particulars}</td>
                <td>${data.debit}</td>
                <td>${data.credit}</td>
            `;
        tableBody.querySelector('tbody').appendChild(newRow);
        });
    }

    
    financialLedger()
    document.getElementById('date-from').value = today;
    document.getElementById('date-to').value = today;
    renderLedgerSummury()
    renderLedgerTable()
    
}

