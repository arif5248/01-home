function executeHome(){
    let user = null;
    let dashBoardData = null;
    let loginDashData = null
    let getCurrentStocks = []
    const storedData = localStorage.getItem('loginData');
    const storedDashBoardData = localStorage.getItem('dashBoard');
    if (storedData) {
        const loginData = JSON.parse(storedData);
        user = loginData[0]
    }
    if (storedDashBoardData) {
        loginDashData = JSON.parse(storedDashBoardData);
        dashBoardData = loginDashData.Data[0]
        

    }
    
    const table1 = [
        {
            fieldName: "Ledger Balance",
            value: dashBoardData.Ledger
        },
        {
            fieldName: "Profile Balance",
            value: dashBoardData.profit_bal
        },
        {
            fieldName: "Total Stock Value",
            value: dashBoardData.stk_val
        },
        {
            fieldName: "Total Portfolio",
            value: parseInt(dashBoardData.Equity.replace(/,/g, ''),10) + parseInt(dashBoardData.profit_bal.replace(/,/g, ''),10)
        },
        {
            fieldName: "Change from Last Day",
            value: dashBoardData.EquityChange
        },
        {
            fieldName: "Available Fund",
            value: dashBoardData.pur_lim
        },
        {
            fieldName: "Available Reward Points",
            value: dashBoardData.reward
        },
    ]
    
    const table2 = [
        {
            fieldName: "Investment",
            value: dashBoardData.Investment
        },
        {
            fieldName: "Withdrawn",
            value: dashBoardData.Withdrawn
        },
        {
            fieldName: "Net Investment",
            value: dashBoardData.NetInvestment
        },
        {
            fieldName: "Realized Profit/(Loss)",
            value: dashBoardData.Realized
        },
        {
            fieldName: "Unrealized Profit/(Loss)",
            value: dashBoardData.UnRealized
        },
        {
            fieldName: "Net Profit/(Loss)",
            value: dashBoardData.NetProfit
        },
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
    const executedTradesData = [
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
    
    function homeComponent (){
        document.getElementById('mainContentSection').innerHTML = `
        <div class="section section-profile" id="section-profile">
            <div class="container">
                <div class="profile-content" id="profile-content"></div>
            </div>
        </div>
    
        <div class="eligibleIPO" id="eligibleIPO"></div>
    
        <div class="section section-table-1">
            <div class="container">
                <div class="table1Content-btn">
                    <div id="table-1Content" class="table-1Content"></div>
                    <div class="moreBtn">
                        <div class="more" onclick="removeFooterBtnState();getTable1More()">More...</div>
                    </div>
                </div> 
            </div>
        </div>
    
        <div class="section section-table-2">
            <div class="container">
                <div id="table-2Content" class="table-2Content"></div>
            </div>
        </div>
    
        <div class="section section-availableStok">
            <div class="container">
                <div class="availableStockHeading">
                    <h3>AVAILABLE STOCKS</h3>
                </div>
                <div class="btnRow">
                    <div class="btnGroup">
                        <div class="stockBtn active" onclick="showStockData('currentStockBody')">
                            <div class="currentBtn">
                                <h5>CURRENT STOCK</h5>
                            </div>
                        </div>
                        <div class="stockBtn" onclick="showStockData('oldStockBody')">
                            <div class="oldButton">
                                <h5>OLD STOCK</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="stockBody">
                    <div class="currentStockBody" id="currentStockBody"></div>
                    <div class="oldStockBody" id="oldStockBody"></div>
                </div>
            </div>
        </div>
    
        <div class="section section-ExecutedTrades">
            <div class="container">
                <div class="availeExecutedTradesHeading">
                    <h3>Executed Trades</h3>
                </div>
    
                <div class="executionTradesBody" id="executionTradesBody">
                    <div class="stockBody">
                        <div class="executedTrades" id="executedTrades"></div>
                    </div>
                </div>
            </div>
        </div>
    
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        `
    }
    function renderProfile() {
        document.getElementById('profile-content').innerHTML = `
        <div class="leftSide">
            <div class="userImage">
                <img style="width:75px" src=${user.ProfileImage} alt=${user.LoggedInInvestorName}'s Image>
            </div>
            <div class="profileBtn">
                <a href="#">PROFILE</a>
            </div>
        </div>
        <div class="rightSide">
            <div class="mainInfo">
                <h3>ID: ${user.LoggedInInvestorId}</h3>
                <h3>${user.LoggedInInvestorName}</h3>
            </div>
            <hr class="hr_profile">
            <div class="contactInfo">
                <p>${user.phone}</p> <p> ${user.email}</p>
            </div>
        </div>
        `
    }
    function renderTable1(){
        var tableContent = document.getElementById('table-1Content')
        var table= tableContent.appendChild(document.createElement('table'))
        table.classList.add('tablee','table-borderlesss')
    
        table1.forEach(function (row, index) {
            var tableRow = document.createElement('tr');
            tableRow.classList.add('item');
    
            tableRow.innerHTML = `
                <td class="column-left">${row.fieldName}</td>
                <td class="column-right">
                    <div> <span>TK</span> <span>${row.value}</span> </div>
                </td>
            `;
    
            table.appendChild(tableRow);
            if(index===4){
                var breakRow = document.createElement('br');
                table.appendChild(breakRow);
            }
        })
    }

    
    function renderTable2(){
        var tableContent = document.getElementById('table-2Content')
        var table= tableContent.appendChild(document.createElement('table'))
        table.classList.add('tablee','table-borderlesss')
    
        table2.forEach(function (row, index) {
            var tableRow = document.createElement('tr');
            tableRow.classList.add('item');
    
            tableRow.innerHTML = `
                <td class="column-left">${row.fieldName}</td>
                <td class="column-right">
                    <div> <span>TK</span> <span>${row.value}</span> </div>
                </td>
            `;
    
            table.appendChild(tableRow);
            if(index===2){
                var breakRow = document.createElement('br');
                table.appendChild(breakRow);
            }
        })
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
    
        loginDashData.Stock.forEach(stock => {
            console.log(stock)
            const newRow = document.createElement('tr');
    
            newRow.innerHTML = `
                <td>${stock.company}</td>
                <td>${stock.Stock}</td>
                <td>${stock.FIFO}</td>
                <td>${stock.LTP}</td>
                <td>${stock.Total_Taka}</td>
            `;
        tableBody.querySelector('table').appendChild(newRow);
        });
        const tableFooter = document.getElementById('currentStockFooter');
        const totalCount = loginDashData.Stock.length;
        const totalValue = loginDashData.Stock.reduce((total, stock) => total + parseInt(stock.Total_Taka.replace(/,/g, ''),10), 0);
    
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
    
        loginDashData.OldStock.forEach(stock => {
            const newRow = document.createElement('tr');
    
            newRow.innerHTML = `
                <td>${stock.company}</td>
                <td>${stock.Stock}</td>
                <td>${stock.FIFO}</td>
                <td>${stock.LTP}</td>
                <td>${stock.Total_Taka}</td>
            `;
        tableBody.querySelector('table').appendChild(newRow);
        });
        const tableFooter = document.getElementById('oldStockFooter');
        const totalCount = loginDashData.OldStock.length;
        const totalValue = loginDashData.OldStock.reduce((total, stock) => total + parseInt(stock.Total_Taka.replace(/,/g, ''),10), 0);
    
        tableFooter.innerHTML = `
            <p>Count : ${totalCount}</p>
            <p>Total Value: ${totalValue}</p>
        `;
    }
    function renderExecutionTrades() {
        const today = new Date().toISOString().split('T')[0];
        const executedTrades = document.getElementById('executedTrades');
        executedTrades.innerHTML =
         `  <div class="btnRow">
                <div class="searchContent">
                    <div class="input-box">
                        <input type="date" id="date-from" value= ${today} >
                        <span>To</span>
                        <input type="date" id="date-to" value= ${today}>
                        <div class="searchImg">
                            <img style="width: 20px;" src="../images/icons/magnifying-glass.png" alt="search">
                        </div>
                    </div>
                </div>
            </div>
            <table>
                <tr>
                    <th>Company</th>
                    <th>B/S</th>
                    <th>Qty</th>
                    <th>Rate</th>
                    <th>Amount</th>
                </tr>
            </table>
            <div id="executionStockFooter" class="oldStockFooter"></div>
        `;
    
        executedTradesData.forEach(stock => {
            const newRow = document.createElement('tr');
    
            newRow.innerHTML = `
                <td>${stock.company_name}</td>
                <td>${stock.stock_qty}</td>
                <td>${stock.avg_cost}</td>
                <td>${stock.last_price}</td>
                <td>${stock.total_price}</td>
            `;
            executedTrades.querySelector('table').appendChild(newRow);
        });
        const tableFooter = document.getElementById('executionStockFooter');
        const totalCount = executedTradesData.length;
        const totalValue = executedTradesData.reduce((total, stock) => total + stock.stock_qty, 0);
    
        tableFooter.innerHTML = `
            <p>Count : ${totalCount}</p>
            <p>Total Value: ${totalValue}</p>
        `;
    }
    
    
    homeComponent()
    renderProfile()
    renderTable1()
    
    renderTable2()
    renderCurrentStockTable()
    renderOldStockTable()
    renderExecutionTrades() 
    document.getElementById('currentStockBody').style.display = 'block';
    document.getElementById('oldStockBody').style.display = 'none';

}

async function getTable1More(){
    let dashBoardData = null
    const storedDashBoardData = localStorage.getItem('dashBoard');
    if (storedDashBoardData) {
        const loginDashData = JSON.parse(storedDashBoardData);
        dashBoardData = loginDashData.Data[0]
    }
    const table1More =[
        {
            fieldName: "Unposted Amount",
            value: dashBoardData.un_tk
        },
        {
            fieldName: "Due CDBL Fee",
            value: dashBoardData.cdbl_fee
        },
        {
            fieldName: "Pending Withdrawl",
            value: dashBoardData.req_with
        },
        {
            fieldName: "IPO Fund Block",
            value: dashBoardData.ipo_blk
        },
        {
            fieldName: "Purchase Limit",
            value: dashBoardData.pur_lim
        },
    ]

     document.getElementById('mainContentSection').innerHTML=`
     <div class="table1More">
        <div class="pageHeading" id="pageHeading">
            <div class="heading">
                <h1>More</h1>
            </div>
        </div>
        <div class="container">
            <div class="table1MoreDetails">
                <table id="table">
                    <tbody id="tbody">
                    </tbody
                </table>
            </div>
        </div>
     </div>   
    `
    const table = document.getElementById('table')
    table1More.forEach(function (row) {
        var tableRow = document.createElement('tr');
        tableRow.classList.add('item');

        tableRow.innerHTML = `
            <td class="column-left">${row.fieldName}</td>
            <td class="column-right">
                <div> <span>TK</span> <span>${row.value}</span> </div>
            </td>
        `;

        table.querySelector('tbody').appendChild(tableRow);
    })
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

