

function executeStockLedger(){
    const currentStocks = [
        {
            company_name:'abcd',
            stock_qty: 100,
            avg_cost: 20,
            last_price: 123,
            total_price: 34785
        },
        {
            company_name:'efgh',
            stock_qty: 145,
            avg_cost: 25,
            last_price: 233,
            total_price: 1275
        },
        {
            company_name:'ijkl',
            stock_qty: 567,
            avg_cost: 12,
            last_price: 890,
            total_price: 3582
        },
        {
            company_name:'mnop',
            stock_qty: 907,
            avg_cost: 236,
            last_price: 985,
            total_price: 1268
        },
        {
            company_name:'qrst',
            stock_qty: 952,
            avg_cost: 89,
            last_price: 429,
            total_price: 3903
        },
        {
            company_name:'uvwx',
            stock_qty: 469,
            avg_cost: 45,
            last_price: 279,
            total_price: 4903
        },
        {
            company_name:'yzab',
            stock_qty: 468,
            avg_cost: 12,
            last_price: 906,
            total_price: 4567
        },
        {
            company_name:'abcd',
            stock_qty: 100,
            avg_cost: 20,
            last_price: 123,
            total_price: 34785
        },
        {
            company_name:'abcd',
            stock_qty: 100,
            avg_cost: 20,
            last_price: 123,
            total_price: 34785
        },
        {
            company_name:'abcd',
            stock_qty: 100,
            avg_cost: 20,
            last_price: 123,
            total_price: 34785
        },
        {
            company_name:'abcd',
            stock_qty: 100,
            avg_cost: 20,
            last_price: 123,
            total_price: 34785
        },
        {
            company_name:'abcd',
            stock_qty: 100,
            avg_cost: 20,
            last_price: 123,
            total_price: 34785
        },
        {
            company_name:'abcd',
            stock_qty: 100,
            avg_cost: 20,
            last_price: 123,
            total_price: 34785
        },
        {
            company_name:'abcd',
            stock_qty: 100,
            avg_cost: 20,
            last_price: 123,
            total_price: 34785
        },
        {
            company_name:'abcd',
            stock_qty: 100,
            avg_cost: 20,
            last_price: 123,
            total_price: 34785
        },
        {
            company_name:'abcd',
            stock_qty: 100,
            avg_cost: 20,
            last_price: 123,
            total_price: 34785
        },
        {
            company_name:'abcd',
            stock_qty: 100,
            avg_cost: 20,
            last_price: 123,
            total_price: 34785
        },
        {
            company_name:'abcd',
            stock_qty: 100,
            avg_cost: 20,
            last_price: 123,
            total_price: 34785
        },
        {
            company_name:'abcd',
            stock_qty: 100,
            avg_cost: 20,
            last_price: 123,
            total_price: 34785
        }
    ]
    const oldStocks = [
        {
            company_name:'qrst',
            stock_qty: 1002,
            avg_cost: 89,
            last_price: 429,
            total_price: 3903
        },
        {
            company_name:'abcd',
            stock_qty: 100,
            avg_cost: 20,
            last_price: 123,
            total_price: 34785
        },
        {
            company_name:'uvwx',
            stock_qty: 469,
            avg_cost: 45,
            last_price: 279,
            total_price: 4903
        },
        {
            company_name:'yzab',
            stock_qty: 468,
            avg_cost: 12,
            last_price: 906,
            total_price: 4567
        },
        {
            company_name:'abcd',
            stock_qty: 100,
            avg_cost: 20,
            last_price: 123,
            total_price: 34785
        },
        {
            company_name:'efgh',
            stock_qty: 145,
            avg_cost: 25,
            last_price: 233,
            total_price: 1275
        },
        {
            company_name:'ijkl',
            stock_qty: 567,
            avg_cost: 12,
            last_price: 890,
            total_price: 3582
        },
        {
            company_name:'mnop',
            stock_qty: 907,
            avg_cost: 236,
            last_price: 985,
            total_price: 1268
        },
        
        {
            company_name:'abcd',
            stock_qty: 100,
            avg_cost: 20,
            last_price: 123,
            total_price: 34785
        },
        {
            company_name:'abcd',
            stock_qty: 100,
            avg_cost: 20,
            last_price: 123,
            total_price: 34785
        },
        {
            company_name:'abcd',
            stock_qty: 100,
            avg_cost: 20,
            last_price: 123,
            total_price: 34785
        },
        {
            company_name:'abcd',
            stock_qty: 100,
            avg_cost: 20,
            last_price: 123,
            total_price: 34785
        },
        {
            company_name:'abcd',
            stock_qty: 100,
            avg_cost: 20,
            last_price: 123,
            total_price: 34785
        },
        {
            company_name:'abcd',
            stock_qty: 100,
            avg_cost: 20,
            last_price: 123,
            total_price: 34785
        },
        {
            company_name:'abcd',
            stock_qty: 100,
            avg_cost: 20,
            last_price: 123,
            total_price: 34785
        },
        {
            company_name:'abcd',
            stock_qty: 100,
            avg_cost: 20,
            last_price: 123,
            total_price: 34785
        },
        {
            company_name:'abcd',
            stock_qty: 100,
            avg_cost: 20,
            last_price: 123,
            total_price: 34785
        },
        {
            company_name:'abcd',
            stock_qty: 100,
            avg_cost: 20,
            last_price: 123,
            total_price: 34785
        },
        {
            company_name:'abcd',
            stock_qty: 100,
            avg_cost: 20,
            last_price: 123,
            total_price: 34785
        },
        {
            company_name:'abcd',
            stock_qty: 100,
            avg_cost: 20,
            last_price: 123,
            total_price: 34785
        }
    ]

    function stockLedger(){
        document.getElementById('mainContentSection').innerHTML = 
        `
            <div class="pageHeading" id="financial-Heading">
                <div class="heading">
                    <h1>Stock Ledger</h1>
                </div>
            </div>

            <div class="section section-availableStok">
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
                    <div class="stockBody">
                        <div class="currentStockBody" id="currentStockBody"></div>
                        <div class="oldStockBody" id="oldStockBody"></div>
                    </div>
                </div>
            </div>
            <br>
            <br>
            <br>
           
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
                <td>${stock.company_name}</td>
                <td>${stock.stock_qty}</td>
                <td>${stock.avg_cost}</td>
                <td>${stock.last_price}</td>
                <td>${stock.total_price}</td>
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
                <td>${stock.company_name}</td>
                <td>${stock.stock_qty}</td>
                <td>${stock.avg_cost}</td>
                <td>${stock.last_price}</td>
                <td>${stock.total_price}</td>
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

