async function executeStockLedger(){
    const fetchedStocks = await getDashBoardData(user.LoggedInInvestorId)
    const currentStocks = fetchedStocks.Stock
    const oldStocks = fetchedStocks.OldStock

    function stockLedger(){
        document.getElementById('mainContentSection').innerHTML = 
        `
            <div class="pageHeading" id="financial-Heading">
                <div class="heading">
                    <h1>Stock Ledger</h1>
                </div>
            </div>
            <div class="section section-availableStok-btn">
                <div class="container">
                    <div class="btnRow">
                        <div class="btnGroup">
                            <div class="stockBtn active" onclick="showStockData('currentStockBody')">
                                <div class="currentBtn">CURRENT STOCK</div>
                            </div>
                            <div class="stockBtn" onclick="showStockData('oldStockBody')">
                                <div class="oldButton">OLD STOCK</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="section section-availableStok">
                <div class="container">
                    <div class="stockBody">
                        <div class="currentStockBody" id="currentStockBody"></div>
                        <div class="oldStockBody" id="oldStockBody"></div>
                    </div>
                </div>
            </div>
           
        `
    }


    function renderCurrentStockTable() {
        const tableBody = document.getElementById('currentStockBody');
        tableBody.innerHTML =
         `
            <table>
                <tr>
                    <th>Company</th>
                    <th>Stock<br>Qty</th>
                    <th>Avg<br>Cost</th>
                    <th>Last<br>Price</th>
                    <th>Total<br>Price</th>
                </tr>
            </table>
            <div id="currentStockFooter" class="currentStockFooter"></div>
        `;
    
        currentStocks.forEach(stock => {
            const newRow = document.createElement('tr');
    
            newRow.innerHTML = `
            <td>${stock.company}</td>
            <td>${stock.Stock}</td>
            <td>${stock.FIFO}</td>
            <td>${stock.LTP}</td>
            <td>${stock.Total_Taka}</td>
            `;
        tableBody.querySelector('tbody').appendChild(newRow);
        });
        const tableFooter = document.getElementById('currentStockFooter');
        const totalCount = currentStocks.length;
        const totalValue = currentStocks.reduce((total, stock) => total + stock.stock_qty, 0);
    
        tableFooter.innerHTML = `
            <p>Count : ${totalCount}</p>
            <p>Total Value: ${totalValue}</p>
        `;
    }
    function renderOldStockTable() {
        const tableBody = document.getElementById('oldStockBody');
        tableBody.innerHTML =
         `
            <table>
                <tr>
                    <th>Company</th>
                    <th>Stock<br>Qty</th>
                    <th>Avg<br>Cost</th>
                    <th>Last<br>Price</th>
                    <th>Total<br>Price</th>
                </tr>
            </table>
            <div id="oldStockFooter" class="oldStockFooter"></div>
        `;
    
        oldStocks.forEach(stock => {
            const newRow = document.createElement('tr');
    
            newRow.innerHTML = `
                <td>${stock.company}</td>
                <td>${stock.Stock}</td>
                <td>${stock.FIFO}</td>
                <td>${stock.LTP}</td>
                <td>${stock.Total_Taka}</td>
            `;
        tableBody.querySelector('tbody').appendChild(newRow);
        });
        const tableFooter = document.getElementById('oldStockFooter');
        const totalCount = oldStocks.length;
        const totalValue = oldStocks.reduce((total, stock) => total + stock.stock_qty, 0);
    
        tableFooter.innerHTML = `
            <p>Count : ${totalCount}</p>
            <p>Total Value: ${totalValue}</p>
        `;
    }


    stockLedger()
    renderCurrentStockTable()
    renderOldStockTable()
    document.getElementById('currentStockBody').style.display = 'block';
    document.getElementById('oldStockBody').style.display = 'none';
}

function showStockData(stockType) {
    document.getElementById('currentStockBody').style.display = 'none';
    document.getElementById('oldStockBody').style.display = 'none';

    document.getElementById(stockType).style.display = 'block';
    updateButtonState(stockType);

}
function updateButtonState(activeButton) {
    var buttons = document.querySelectorAll('.btnGroup .stockBtn');
    buttons.forEach(function (button) {
        button.classList.remove('active');
    });

    var activeButtonElement = document.querySelector('.btnGroup .stockBtn[onclick*="' + activeButton + '"]');
    if (activeButtonElement) {
        activeButtonElement.classList.add('active');
    }
}

