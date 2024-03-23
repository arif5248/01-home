async function executeProfitLedger(){
    let openingBalance = 0
    let closingBalance = 0
    const ledgerSummuryData = {
        opening_Balance: 0,
        total_Debit: 0,
        total_Credit: 0,
        closing_Balance: 0,               
    }
    const today = new Date().toISOString().split('T')[0];
    let ledgerData = []

    const fetchedData =await getProfitLedger(user.LoggedInInvestorId, today, today)  
    if(fetchedData.status === true){
        ledgerData = fetchedData.FinancialStatement
        openingBalance = Math.round(Number(fetchedData.OpeningBalance.replace(/,/g, '')))
        ledgerSummuryData.opening_Balance = openingBalance
    }

    function financialLedger(){
        document.getElementById('mainContentSection').innerHTML = 
        `
            <div class="pageHeading" id="financial-Heading">
                <div class="heading">
                    <h1>Profit Ledger</h1>
                </div>
            </div>

            <div style='margin-top: 5px' class="container">
                <div class="searchContent">
                    <div class="input-box">
                        <input type="date" id="PL_date-from" >
                        <span>To</span>
                        <input type="date" id="PL_date-to">
                    </div>
                    <div class="PL_searchLedger">
                        <h5>SEARCH</h5>
                    </div>
                </div>
            </div>

            <div class="container">
                <div class="ledgerSummury" id="PL_ledgerSummury"></div>
            </div>

            <div class="container" style="flex: 1 auto;overflow-y: auto;">
                <div class="ledgerTable" id="PL_ledgerTable"></div>
            </div>
        `
    }

    function renderLedgerSummury(){
        document.getElementById('PL_ledgerSummury').innerHTML = 
        `
            <div class= "item">
                <div class="left">
                    <p>Opening Balance</p>
                    <p>:</p>
                </div>
                <div class="right">
                    <p>${ledgerSummuryData.opening_Balance}</p>
                </div>     
            </div>
            <div class= "item">
                <div class="left">
                    <p>Total Debit</p>
                    <p>:</p>
                </div>
                <div class="right">
                    <p>${ledgerSummuryData.total_Debit}</p>
                </div>     
            </div>
            <div class= "item">
                <div class="left">
                    <p>Total Credit</p>
                    <p>:</p>
                </div>
                <div class="right">
                    <p>${ledgerSummuryData.total_Credit}</p>
                </div>     
            </div>
            <div class= "item">
                <div class="left">
                    <p>Closing Balance</p>
                    <p>:</p>
                </div>
                <div class="right">
                    <p>${ledgerSummuryData.closing_Balance}</p>
                </div>     
            </div>
        `
    }

    function renderLedgerTable(){
        let total_debit = 0
        let total_credit = 0
        const tableBody = document.getElementById('PL_ledgerTable')
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
            const newP = document.createElement('tr')
            newP.classList.add('balanceRow')

            newRow.innerHTML = `
                <td>${data.date}</td>
                <td>${data.note}</td>
                <td>${data.debit}</td>
                <td>${data.credit}</td>
            `;
            closingBalance = openingBalance + Math.round(Number(data.credit.replace(/,/g, '')))
            closingBalance = closingBalance - Math.round(Number(data.debit.replace(/,/g, '')))
            openingBalance = closingBalance

            total_debit = total_debit + Math.round(Number(data.debit.replace(/,/g, '')))
            total_credit = total_credit + Math.round(Number(data.credit.replace(/,/g, '')))
            newP.innerHTML=`
                <td style='text-align: right;' colspan='4'>Balance Tk ${closingBalance.toLocaleString("en-IN")}</td>
            `
            tableBody.querySelector('tbody').appendChild(newRow);
            tableBody.querySelector('tbody').appendChild(newP);

            newP.style.backgroundColor = '#CFCDCE'
        });
        ledgerSummuryData.closing_Balance = closingBalance.toLocaleString("en-IN")
        ledgerSummuryData.total_Credit = total_credit.toLocaleString("en-IN")
        ledgerSummuryData.total_Debit = total_debit.toLocaleString("en-IN")
    }

    
    financialLedger()
    document.getElementById('PL_date-from').value = today;
    document.getElementById('PL_date-to').value = today;
    renderLedgerSummury()
    renderLedgerTable()

    document.querySelector('.PL_searchLedger').addEventListener('click', async () => {
        const date_from = document.getElementById('PL_date-from').value 
        const date_to= document.getElementById('PL_date-to').value 
        
        const fetchedData =await getProfitLedger(user.LoggedInInvestorId, date_from, date_to)
        
        if(fetchedData.status === true){
            
            ledgerData = fetchedData.FinancialStatement
            openingBalance = Math.round(Number(fetchedData.OpeningBalance.replace(/,/g, '')))
            ledgerSummuryData.opening_Balance = openingBalance
            renderLedgerTable()
            renderLedgerSummury()
        }
        
    });
    
}

