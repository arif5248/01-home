

function executeProfitLoss(){
    const currentStocks = [
        {
            company_name:'AIL',
            total_stock_qty: 100,
            realizes_profit_loss: 0,
            unrealizes_profit_loss: 0,
            buy_sell:[
                {
                    type: 'Buy',
                    qty:1,
                    price_per_qty:90.36,
                    total_price:90
                },
                {
                    type: 'Sell',
                    qty:0,
                    price_per_qty:0,
                    total_price:0,
                },
            ],
        },
        {
            company_name:'GP',
            total_stock_qty: 2,
            realizes_profit_loss: 0,
            unrealizes_profit_loss: -14,
            buy_sell:[{
                    type: 'Buy',
                    qty:2,
                    price_per_qty:363.45,
                    total_price:727,
                },
                {
                    type: 'Sell',
                    qty:0,
                    price_per_qty:0,
                    total_price:0,
                }
            ]
        },
        {
            company_name:'KEYACOSMET',
            total_stock_qty: 12,
            realizes_profit_loss: 926,
            unrealizes_profit_loss: -10,
            buy_sell:[
                {
                    type: 'Buy',
                    qty:2743,
                    price_per_qty:7.33,
                    total_price:20106
                },{
                    type: 'Sell',
                    qty:2731,
                    price_per_qty:7.67,
                    total_price:20947,
                }
            ]
        },
        {
            company_name:'MAKSONSPIN',
            total_stock_qty: 278,
            realizes_profit_loss: 0,
            unrealizes_profit_loss: -778,
            buy_sell:[
                {
                    type: 'Buy',
                    qty:278,
                    price_per_qty:25.4,
                    total_price:7061
                },{
                    type: 'Sell',
                    qty:0,
                    price_per_qty:0,
                    total_price:0,
                }
            ]
        },
        {
            company_name:'SSSTEEL',
            total_stock_qty: 292,
            realizes_profit_loss: -17443,
            unrealizes_profit_loss: -1606,
            buy_sell:[
                {
                    type: 'Buy',
                    qty:5001,
                    price_per_qty:22.2,
                    total_price:111022
                },
                {
                    type: 'Sell',
                    qty:4709,
                    price_per_qty:19.88,
                    total_price:93615,
                }
            ]
        },
        {
            company_name:'AIL',
            total_stock_qty: 100,
            realizes_profit_loss: 0,
            unrealizes_profit_loss: 0,
            buy_sell:[
                {
                    type: 'Buy',
                    qty:1,
                    price_per_qty:90.36,
                    total_price:90
                },
                {
                    type: 'Sell',
                    qty:0,
                    price_per_qty:0,
                    total_price:0,
                }
            ]
        },
        {
            company_name:'AIL',
            total_stock_qty: 100,
            realizes_profit_loss: 0,
            unrealizes_profit_loss: 0,
            buy_sell:[
                {
                    type: 'Buy',
                    qty:1,
                    price_per_qty:90.36,
                    total_price:90
                },
                {
                    type: 'Sell',
                    qty:0,
                    price_per_qty:0,
                    total_price:0,
                }
            ]
        },
        {
            company_name:'AIL',
            total_stock_qty: 100,
            realizes_profit_loss: 0,
            unrealizes_profit_loss: 0,
            buy_sell:[
                {
                    type: 'Buy',
                    qty:1,
                    price_per_qty:90.36,
                    total_price:90
                },
                {
                    type: 'Sell',
                    qty:0,
                    price_per_qty:0,
                    total_price:0,
                }
            ]
        },
    ]
    const oldStocks = [
        {
            company_name:'MAKSONSPIN',
            total_stock_qty: 278,
            realizes_profit_loss: 0,
            unrealizes_profit_loss: -778,
            buy_sell:[
                {
                    type: 'Buy',
                    qty:278,
                    price_per_qty:25.4,
                    total_price:7061
                },
                {
                    type: 'Sell',
                    qty:0,
                    price_per_qty:0,
                    total_price:0,
                }
            ]
        },
        {
            company_name:'KEYACOSMET',
            total_stock_qty: 12,
            realizes_profit_loss: 926,
            unrealizes_profit_loss: -10,
            buy_sell:[
                {
                    type: 'Buy',
                    qty:2743,
                    price_per_qty:7.33,
                    total_price:20106
                },
                {
                    type: 'Sell',
                    qty:2731,
                    price_per_qty:7.67,
                    total_price:20947,
                }
            ]
        },
        {
            company_name:'AIL',
            total_stock_qty: 100,
            realizes_profit_loss: 0,
            unrealizes_profit_loss: 0,
            buy_sell:[
                {
                    type: 'Buy',
                    qty:1,
                    price_per_qty:90.36,
                    total_price:90
                },
                {
                    type: 'Sell',
                    qty:0,
                    price_per_qty:0,
                    total_price:0,
                }
            ]
        },
        {
            company_name:'GP',
            total_stock_qty: 2,
            realizes_profit_loss: 0,
            unrealizes_profit_loss: -14,
            buy_sell:[
                {
                    type: 'Buy',
                    qty:2,
                    price_per_qty:363.45,
                    total_price:727,
                },
                {
                    type: 'Sell',
                    qty:0,
                    price_per_qty:0,
                    total_price:0,
                }
            ]
        },
        {
            company_name:'MAKSONSPIN',
            total_stock_qty: 278,
            realizes_profit_loss: 0,
            unrealizes_profit_loss: -778,
            buy_sell:[
                {
                    type: 'Buy',
                    qty:278,
                    price_per_qty:25.4,
                    total_price:7061
                },
                {
                    type: 'Sell',
                    qty:0,
                    price_per_qty:0,
                    total_price:0,
                }
            ]
        },
        {
            company_name:'SSSTEEL',
            total_stock_qty: 292,
            realizes_profit_loss: -17443,
            unrealizes_profit_loss: -1606,
            buy_sell:[
                {
                    type: 'Buy',
                    qty:5001,
                    price_per_qty:22.2,
                    total_price:111022
                },
                {
                    type: 'Sell',
                    qty:4709,
                    price_per_qty:19.88,
                    total_price:93615,
                }
            ]
        },
        {
            company_name:'AIL',
            total_stock_qty: 100,
            realizes_profit_loss: 0,
            unrealizes_profit_loss: 0,
            buy_sell:[
                {
                    type: 'Buy',
                    qty:1,
                    price_per_qty:90.36,
                    total_price:90
                },
                {
                    type: 'Sell',
                    qty:0,
                    price_per_qty:0,
                    total_price:0,
                }
            ]
        },
        {
            company_name:'AIL',
            total_stock_qty: 100,
            realizes_profit_loss: 0,
            unrealizes_profit_loss: 0,
            buy_sell:[
                {
                    type: 'Buy',
                    qty:1,
                    price_per_qty:90.36,
                    total_price:90
                },
                {
                    type: 'Sell',
                    qty:0,
                    price_per_qty:0,
                    total_price:0,
                }
            ]
        },
        {
            company_name:'AIL',
            total_stock_qty: 100,
            realizes_profit_loss: 0,
            unrealizes_profit_loss: 0,
            buy_sell:[
                {
                    type: 'Buy',
                    qty:1,
                    price_per_qty:90.36,
                    total_price:90
                },
                {
                    type: 'Sell',
                    qty:0,
                    price_per_qty:0,
                    total_price:0,
                }
            ]
        },
    ]

    function profitLoss(){
        document.getElementById('mainContentSection').innerHTML = 
        `
            <div class="pageHeading" id="financial-Heading">
                <div class="heading">
                    <h1>Profit Loss</h1>
                </div>
                <div class="sub-heading">
                    <p>Statement As On</p>
                    <p>18-Jan-2024</p>
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
                <tbody>
                </tbody>
            </table>
        `;
    
        currentStocks.forEach(stock => {
            const newRow = document.createElement('tr');
    
            newRow.innerHTML = `
                <td class='td'>
                    <div class="top">
                        <div class="topHead">
                            <h2>${stock.company_name}</h2>
                            <h2>${stock.total_stock_qty}</h2>  
                        </div>
                        <div class="profit-loss">
                            <p>Realized Profit/Loss</p>
                            <p>${stock.realizes_profit_loss}</p>
                        </div>
                        <div class="profit-loss">
                            <p>Unrealized Profit/Loss</p>
                            <p>${stock.unrealizes_profit_loss}</p>
                        </div>
                    </div>
                    <div class="bottom"></div>
                    
                </td>
            `;
        tableBody.querySelector('tbody').appendChild(newRow);
        const trades = stock.buy_sell
        trades.forEach(trade=>{
            const bottomData = newRow.querySelector('.bottom');
            const newDiv = document.createElement('div')
            newDiv.innerHTML = 
            `
                <p>${trade.type}</p>
                <p>${trade.qty}</p>
                <p>${trade.price_per_qty}</p>
                <p>Tk ${trade.total_price}</p>
            `;
            bottomData.appendChild(newDiv);
        })
        
        });
    }
    function renderOldStockTable() {
        const tableBody = document.getElementById('oldStockBody');
        tableBody.innerHTML =
         `
            <table>
                <tbody>
                </tbody>
            </table>
        `;
    
        oldStocks.forEach(stock => {
            const newRow = document.createElement('tr');
    
            newRow.innerHTML =
            `
                <td>
                    <div class="top">
                        <div class="topHead">
                            <h2>${stock.company_name}</h2>
                            <h2>${stock.total_stock_qty}</h2>  
                        </div>
                        <div class="profit-loss">
                            <p>Realized Profit/Loss</p>
                            <p>${stock.realizes_profit_loss}</p>
                        </div>
                        <div class="profit-loss">
                            <p>Unrealized Profit/Loss</p>
                            <p>${stock.unrealizes_profit_loss}</p>
                        </div>
                    </div>
                    <div class="bottom"></div>
                </td>
            `;
        tableBody.querySelector('tbody').appendChild(newRow);
        const trades = stock.buy_sell
        trades.forEach(trade=>{
            const bottomData = newRow.querySelector('.bottom');
            const newDiv = document.createElement('div')
            newDiv.innerHTML = 
            `
                <p>${trade.type}</p>
                <p>${trade.qty}</p>
                <p>${trade.price_per_qty}</p>
                <p>Tk ${trade.total_price}</p>
            `;
            bottomData.appendChild(newDiv);
        })
        });
    }


    profitLoss()
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

