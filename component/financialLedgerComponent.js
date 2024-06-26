async function executeFinancialLedger(){
    let openingBalance = 0
    let closingBalance = 0
    const ledgerSummuryData = {
        opening_Balance: 0,
        total_Debit: 0,
        total_Credit: 0,
        closing_Balance:0,               
    }
    const today = new Date().toISOString().split('T')[0];
    let oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    oneMonthAgo = oneMonthAgo.toISOString().split('T')[0]
    let ledgerData = []

    const fetchedData = await getFinacialLedger(user.LoggedInInvestorId, oneMonthAgo, today)
    if(fetchedData.status === true){
        ledgerData = fetchedData.FinancialStatement
        openingBalance = Math.round(Number(fetchedData.OpeningBalance.replace(/,/g, '')))
        ledgerSummuryData.opening_Balance = openingBalance
    }
    
    
    async function financialLedger(){
        document.getElementById('mainContentSection').innerHTML = 
        `
            <div class="pageHeading" id="financial-Heading">
                <div class="heading">
                    <h1>Financial Ledger</h1>
                </div>
            </div>

            <div style='margin-top: 5px' class="container">
                <div class="searchContent">
                    <div class="input-box">
                        <input type="text" id="FL_date-from" readonly>
                        <span>To</span>
                        <input type="text" id="FL_date-to" readonly>
                    </div>
                    <div class="searchLedger">
                        <h5>SEARCH</h5>
                    </div>
                </div>
            </div>

            <div class="container">
                <div class="ledgerSummury" id="ledgerSummury"></div>
            </div>

            <div onscroll="resetLogoutTimer()" class="container" style="flex: 1 auto;overflow-y: auto;min-height: 300px;">
                <div class="ledgerTable" id="ledgerTable"></div>
            </div>
            
        `
        $("#FL_date-from").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "dd/M/yy"
        });
    
        $("#FL_date-to").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "dd/M/yy"
        });
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
                    <p>${ledgerSummuryData.opening_Balance.toLocaleString("en-IN")}</p>
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
        const tableBody = document.getElementById('ledgerTable')
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
                <td style='text-align: right;'>${Math.floor(Number(data.debit.replace(/,/g, ''))).toLocaleString("en-IN")}</td>
                <td style='text-align: right;'>${Math.floor(Number(data.credit.replace(/,/g, ''))).toLocaleString("en-IN")}</td>
            `;
            closingBalance = openingBalance + Math.round(Number(data.credit.replace(/,/g, '')))
            closingBalance = closingBalance - Math.round(Number(data.debit.replace(/,/g, '')))
            openingBalance = closingBalance
            
            total_debit = total_debit + Math.round(Number(data.debit.replace(/,/g, '')))
            total_credit = total_credit + Math.round(Number(data.credit.replace(/,/g, '')))
            newP.innerHTML=`
                <td style='text-align:right;' colspan='4'>Balance Tk ${closingBalance.toLocaleString("en-IN")}</td>
            `
            tableBody.querySelector('tbody').appendChild(newRow);
            tableBody.querySelector('tbody').appendChild(newP);

            if(data.note.includes('Buy')){
                newRow.style.backgroundColor = 'rgb(100, 102, 252)'
                newP.style.backgroundColor = 'rgb(100, 102, 252)'
                newP.style.color = '#fff';
                
                
                const tdElements = newRow.getElementsByTagName('td');
                for (let i = 0; i < tdElements.length; i++) {
                    
                    tdElements[i].style.color = '#fff';
                }
            }
            else if(data.note.includes('Sell')){
                newRow.style.backgroundColor = '#8329A5'
                newP.style.color = '#fff';
                newP.style.backgroundColor = '#8329A5'
                
                const tdElements = newRow.getElementsByTagName('td');
                for (let i = 0; i < tdElements.length; i++) {
                  
                    tdElements[i].style.color = '#fff';
                }
            }else{
                newP.style.backgroundColor = '#CFCDCE'
            }
            
        });
        ledgerSummuryData.closing_Balance = closingBalance.toLocaleString("en-IN")
        ledgerSummuryData.total_Credit = total_credit.toLocaleString("en-IN")
        ledgerSummuryData.total_Debit = total_debit.toLocaleString("en-IN")
        renderLedgerSummury()
    }

    await financialLedger()
    document.getElementById('FL_date-from').value = customDateConverter(oneMonthAgo, 'defaultToCustom');
    document.getElementById('FL_date-to').value = customDateConverter(today, 'defaultToCustom');
    renderLedgerSummury()
    renderLedgerTable()
   
    document.querySelector('.searchLedger').addEventListener('click', async () => {
        const date_from = document.getElementById('FL_date-from').value 
        const date_to= document.getElementById('FL_date-to').value 
        const fetchedData =await getFinacialLedger(user.LoggedInInvestorId, date_from, date_to)
        
        if(fetchedData.status === true){
            ledgerData = fetchedData.FinancialStatement
            openingBalance = Math.round(Number(fetchedData.OpeningBalance.replace(/,/g, '')))
            ledgerSummuryData.opening_Balance = openingBalance
            renderLedgerTable()
            renderLedgerSummury()
        }
        
    });
    
    
}

