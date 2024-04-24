async function executeStockDetails(script){
    const stockSummuryData = {
        company: '',
        companyInfo: '',
        total_buy: '',
        total_sell: '',             
    }
    let stockData = []

    const currentDate = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const formattedCurrentDate = currentDate.toISOString().split('T')[0];
    const formattedOneYearAgo = oneYearAgo.toISOString().split('T')[0];

    const fetchedStockDetails =await getStockDetails(user.LoggedInInvestorId, formattedOneYearAgo, formattedCurrentDate, script)
    if(fetchedStockDetails.status === true){
        stockData = fetchedStockDetails.Data
        stockSummuryData.companyInfo = fetchedStockDetails.scripName[0].company
    }
    
    async function stockDetails(){
        document.getElementById('mainContentSection').innerHTML = 
        `
            <div class="financial-Heading" id="financial-Heading">
                <div class="heading">
                    <h1>Stock Details(${script})</h1>
                </div>
            </div>

            <div style='margin-top: 5px' class="container">
                <div class="searchContent">
                    <div class="input-box">
                        <input type="date" id="FL_date-from" >
                        <span>To</span>
                        <input type="date" id="FL_date-to">
                    </div>
                    <div class="searchLedger">
                        <h5>SEARCH</h5>
                    </div>
                </div>
            </div>

            <div class="container">
                <div class="ledgerSummury" id="stockSummury"></div>
            </div>

            <div class="container">
            <div class="ledgerTable" id="stockTable"></div>
            </div>
            
        `
    }
    function renderStockSummury(){
        stockSummuryData.company = script;
        
        document.getElementById('stockSummury').innerHTML = 
        `
            <div class= "item">
                <div class="left">
                    <p>Company</p>
                    <p>:</p>
                </div>
                <div class="right">
                    <p>${stockSummuryData.company}</p>
                </div>     
            </div>
            <div class= "item">
                <div class="left">
                    <p>Category</p>
                    <p>:</p>
                </div>
                <div class="right">
                    <p>${stockSummuryData.companyInfo}</p>
                </div>     
            </div>
            <div class= "item">
                <div class="left">
                    <p>Total Buy Tk</p>
                    <p>:</p>
                </div>
                <div class="right">
                    <p>${stockSummuryData.total_buy}</p>
                </div>     
            </div>
            <div class= "item">
                <div class="left">
                    <p>Total Sell Tk</p>
                    <p>:</p>
                </div>
                <div class="right">
                    <p>${stockSummuryData.total_sell}</p>
                </div>     
            </div>
        `
    }

    function renderStockTable(){
        let total_buy = 0
        let total_sell = 0
        const tableBody = document.getElementById('stockTable')
        tableBody.innerHTML =
         `
            <table>
                <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Qty</th>
                    <th>Rate</th>
                    <th>Taka</th>
                </tr>
            </table>
            <br>
            <br>
            <br>
            <br>
        `;
        stockData.forEach(data => {
            const newRow = document.createElement('tr');
    
            newRow.innerHTML = `
                <td>${data.Date}</td>
                <td>${data.Type}</td>
                <td>${data.Type === 'Sales' ? data.SQt : data.BQt}</td>
                <td>${data.Type === 'Sales' ? data.Srt : data.Brt}</td>
                <td>${data.Type === 'Sales' ? data.Stk : data.Btk}</td>
            `;
            total_buy = total_buy + Number(data.Btk.replace(/,/g, ''))
            total_sell = total_sell + Number(data.Stk.replace(/,/g, ''))

            tableBody.querySelector('tbody').appendChild(newRow);

            if(data.Type === 'Purchase'){
                newRow.style.backgroundColor = '#3766FC'
            }
            if(data.Type === 'Sales'){
                newRow.style.backgroundColor = '#8329A5'
            }
            
            
        });
        stockSummuryData.total_buy = Math.round(total_buy).toLocaleString("en-IN")
        stockSummuryData.total_sell = Math.round(total_sell).toLocaleString("en-IN")
    }

    await stockDetails()
    document.getElementById('FL_date-from').value = formattedOneYearAgo;
    document.getElementById('FL_date-to').value = formattedCurrentDate;
    renderStockTable()
    renderStockSummury()
    
   
    document.querySelector('.searchLedger').addEventListener('click', async () => {
        const date_from = document.getElementById('FL_date-from').value 
        const date_to= document.getElementById('FL_date-to').value 
        const fetchedStockDetails =await getStockDetails(user.LoggedInInvestorId, date_from, date_to, script)
        
        if(fetchedStockDetails.status === true){
            stockData = fetchedStockDetails.Data
            stockSummuryData.companyInfo = fetchedStockDetails.scripName[0].company
            renderStockTable()
            renderStockSummury()
        }
        
    });
    
    
}

