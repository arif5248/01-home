async function executeStockLedger(){
    const fetchedStocks = await getDashBoardData(user.LoggedInInvestorId)
    const currentStocks = fetchedStocks.Stock
    const oldStocks = fetchedStocks.OldStock

    function stockLedger(){
        document.getElementById('mainContentSection').innerHTML = 
        `
            <div class="pageHeading" id="financial-Heading">
                <div class="heading">
                    <h1>Stock Statement</h1>
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
                <div style='height: 100%'class="container">
                    <div class="currentStockBody" id="currentStockBody"></div>
                    <div class="oldStockBody" id="oldStockBody"></div>
                </div>
            </div>
           
        `
    }


    function renderCurrentStockTable() {
        const tableBody = document.getElementById('currentStockBody');
        tableBody.innerHTML =
         `
            <div onscroll="resetLogoutTimer()" style="flex: 1 auto;">
                <table>
                    <tr>
                        <th>Company</th>
                        <th>Stock Qty</th>
                        <th>Avg Cost</th>
                        <th>Last Price</th>
                        <th>Stock<br>Value</th>
                    </tr>
                </table>
            </div>
            <div id="currentStockFooter" class="currentStockFooter"></div>
        `;
    
        currentStocks.forEach(stock => {
            const newRow = document.createElement('tr');
    
            newRow.innerHTML = `
            <td style="text-align:left">${stock.company}</td>
            <td>${stock.Stock}</td>
            <td>${stock.FIFO}</td>
            <td>${stock.LTP}</td>
            <td>${stock.Total_Taka}</td>
            `;
        tableBody.querySelector('tbody').appendChild(newRow);
        });
        const tableFooter = document.getElementById('currentStockFooter');
        const totalCount = currentStocks.length;
        let totalValue = currentStocks.reduce((total, stock) => total + Number(stock.Total_Taka.replace(/,/g, '')), 0);
        totalValue = totalValue.toLocaleString("en-IN")
        tableFooter.innerHTML = `
            <p>Count : ${totalCount}</p>
            <p>Total Value: ${totalValue}</p>
        `;
    }
    function renderOldStockTable() {
        const tableBody = document.getElementById('oldStockBody');
        tableBody.innerHTML =
         `
            <div onscroll="resetLogoutTimer()" style="flex: 1 auto;">
                <table>
                    <tr>
                        <th>Company</th>
                        <th>Stock<br>Qty</th>
                        <th>Avg<br>Cost</th>
                        <th>Last<br>Price</th>
                        <th>Stock<br>Value</th>
                    </tr>
                </table>
            </div>
            <div id="oldStockFooter" class="oldStockFooter"></div>
        `;
    
        oldStocks.forEach(stock => {
            const newRow = document.createElement('tr');
    
            newRow.innerHTML = `
                <td style="text-align:left">${stock.company}</td>
                <td>${stock.Stock}</td>
                <td>${stock.FIFO}</td>
                <td>${stock.LTP}</td>
                <td>${stock.Total_Taka}</td>
            `;
        tableBody.querySelector('tbody').appendChild(newRow);
        });
        const tableFooter = document.getElementById('oldStockFooter');
        const totalCount = oldStocks.length;
        let totalValue = oldStocks.reduce((total, stock) => total + Number(stock.Total_Taka.replace(/,/g, '')), 0);
        totalValue = totalValue.toLocaleString("en-IN")
        tableFooter.innerHTML = `
            <p>Count : ${totalCount}</p>
            <p>Total Value: ${totalValue}</p>
        `;
    }


    stockLedger()
    renderCurrentStockTable()
    renderOldStockTable()
    document.getElementById('currentStockBody').style.display = 'flex';
    document.getElementById('oldStockBody').style.display = 'none';
}

function showStockData(stockType) {
    document.getElementById('currentStockBody').style.display = 'none';
    document.getElementById('oldStockBody').style.display = 'none';

    document.getElementById(stockType).style.display = 'flex';
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

