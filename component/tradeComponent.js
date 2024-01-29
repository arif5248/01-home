function executeTrade(){
    let marketIntervalId;
    stock_ticker_data = [
        {
            name:  'MEGHNAPET-1',
            data: '100.0 @33.7(0.8)'
        },
        {
            name:  'MEGHNAPET-2',
            data: '100.0 @33.7(0.8)'
        },
        {
            name:  'MEGHNAPET-3',
            data: '100.0 @33.7(0.8)'
        },
        {
            name:  'MEGHNAPET-4',
            data: '100.0 @33.7(0.8)'
        },
        {
            name:  'MEGHNAPET-5',
            data: '100.0 @33.7(0.8)'
        },
        {
            name:  'MEGHNAPET-6',
            data: '100.0 @33.7(0.8)'
        },
        {
            name:  'MEGHNAPET-7',
            data: '100.0 @33.7(0.8)'
        },
        {
            name:  'MEGHNAPET-8',
            data: '100.0 @33.7(0.8)'
        },{
            name:  'MEGHNAPET-9',
            data: '100.0 @33.7(0.8)'
        },
        


    ]
    const cse_buySellData = [
        {
            no_of_buyer: 10.0,
            b_qty: 547000.0,
            b_price: 5.8,
            no_of_seller: 5.0,
            s_qty: 24475.0,
            s_price: 6.0,
        },
        {
            no_of_buyer: 10.0,
            b_qty: 547000.0,
            b_price: 5.8,
            no_of_seller: 5.0,
            s_qty: 24475.0,
            s_price: 6.0,
        },
        {
            no_of_buyer: 10.0,
            b_qty: 547000.0,
            b_price: 5.8,
            no_of_seller: 5.0,
            s_qty: 24475.0,
            s_price: 6.0,
        },
        {
            no_of_buyer: 10.0,
            b_qty: 547000.0,
            b_price: 5.8,
            no_of_seller: 5.0,
            s_qty: 24475.0,
            s_price: 6.0,
        },
        {
            no_of_buyer: 10.0,
            b_qty: 547000.0,
            b_price: 5.8,
            no_of_seller: 5.0,
            s_qty: 24475.0,
            s_price: 6.0,
        },
        {
            no_of_buyer: 10.0,
            b_qty: 547000.0,
            b_price: 5.8,
            no_of_seller: 5.0,
            s_qty: 24475.0,
            s_price: 6.0,
        },
        {
            no_of_buyer: 10.0,
            b_qty: 547000.0,
            b_price: 5.8,
            no_of_seller: 5.0,
            s_qty: 24475.0,
            s_price: 6.0,
        },
        {
            no_of_buyer: 10.0,
            b_qty: 547000.0,
            b_price: 5.8,
            no_of_seller: 5.0,
            s_qty: 24475.0,
            s_price: 6.0,
        },
        {
            no_of_buyer: 10.0,
            b_qty: 547000.0,
            b_price: 5.8,
            no_of_seller: 5.0,
            s_qty: 24475.0,
            s_price: 6.0,
        },
        {
            no_of_buyer: 10.0,
            b_qty: 547000.0,
            b_price: 5.8,
            no_of_seller: 5.0,
            s_qty: 24475.0,
            s_price: 6.0,
        },
        {
            no_of_buyer: 22.0,
            b_qty: 547000.0,
            b_price: 5.8,
            no_of_seller: 5.0,
            s_qty: 24475.0,
            s_price: 6.0,
        }
    ]

    function trade(){
        document.getElementById('mainContentSection').innerHTML = `
            <div class="pageHeading" id="financial-Heading">
                <div class="heading">
                    <h1>Trade</h1>
                </div>
            </div>

            <div class="stock_ticker_box">
                <div class="scrolling-content" id="scrolling-content"></div>
            </div>

            <div class="marketScheduale" id="marketScheduale"></div>

            <div class='container'>
                <div class="tradeSearchBox" id="tradeSearchBox"></div>
            </div>

            <div class="container">
                <div class="box">
                    <div class="tradeAllBtnBox" id="tradeAllBtnBox">
                        <div class="singleBtn">COMP INFO</div>
                        <div class="singleBtn">NEWS</div>
                        <div class="singleBtn">ALL TRADES</div>
                        <div class="singleBtn">PRICE ALERT</div>
                        <div class="singleBtn">FUND STATUS</div>
                        <div class="singleBtn">LAST TRADES</div>
                        <div class="singleBtn">MKT MOVER</div>
                        <div class="singleBtn">DIVIDEND</div>
                        <div class="singleBtn">STK STATUS</div>
                        <div class="singleBtn">RATE HISTORY</div>
                        <div class="singleBtn">HALTED COMP</div>
                        <div class="singleBtn">FAVOURITES</div>
                    </div>
                </div>
            </div>
            <div class="selectedStockSection">
                <div class= "container">
                    <div class= "box">
                        <div class="selectedStockBox" id="selectedStockBox"></div>
                    </div>
                </div>
            </div>

            <div class="mainTradeSection">
                <div class= "container">
                    <div class= "box">
                        <div class="btnGroup" id="btnGroup">
                            <div onclick="show('cseContent')" class="Btn active" id="cse">CSE</div>
                            <div onclick="show('dseContent')" class="Btn" id="dse">DSE</div>
                        </div>
                        <div class="buyerSeller">
                            <h3>Buyer</h3>
                            <h3>Seller</h3>
                        </div>
                        <div class="buySellData">
                            <div class="ipoContent" id="cseContent">cse</div>
                            <div class="ipoContent" id="dseContent">dse</div>
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
            <br>
        `
    }

    function renderStockTicker(){
        const stockTickerBody = document.getElementById('scrolling-content')
        stock_ticker_data.forEach((ticker, index) => {
            const newDiv = document.createElement('div')
            newDiv.classList.add(`ticker_item`, `ticker_item_${index}`)
            newDiv.innerHTML=`
                <h6 class = "ticker_heading">${ticker.name}</h6>
                <p class = "ticker_data">${ticker.data}</p>
            `
            stockTickerBody.appendChild(newDiv)
        });
        // const totalWidth = stock_ticker_data.length * 150
        // stockTickerBody.style.width = `${totalWidth}px`;
        
    }

    function renderMarketScheduale(){
        document.getElementById('marketScheduale').innerHTML=`
            <div class='container'>
                <div class='box'>
                    <div class='marketScheduleBox'>
                        <div class="marketStatus">
                            <p>Market Status</p>
                            <p id="remaining_trade_time">Remaining Trade Time</p>
                        </div>
                        <div class="remaining_time">
                            <h4 id="trade_status">Open</h4>
                            <h4 id="countdown"></h4>
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    function updateCountdown() {
        const now = new Date().toLocaleString("en-US", {timeZone: "Asia/Dhaka"});
        const currentTime = new Date(now);
    
        const dayOfWeek = currentTime.getDay();
        if (dayOfWeek === 5 || dayOfWeek === 6) {
            document.getElementById('countdown').innerHTML = 'No trading on Friday and Saturday.';
            document.getElementById('trade_status').innerHTML = `Closed`
            document.getElementById('trade_status').style.color = `red`
            document.getElementById('countdown').style.fontSize = `12px`

            return;
        }
        const tradeStartTime = new Date(currentTime);
        tradeStartTime.setHours(10, 0, 0, 0);
    
        const tradeEndTime = new Date(currentTime);
        tradeEndTime.setHours(14, 30, 0, 0);
    
        let timeDifference = tradeEndTime - currentTime;
        let beforeTimeDifference = tradeStartTime - currentTime
        
    
        if (timeDifference < 0) {
            document.getElementById('countdown').innerHTML = 'Trading hours have ended for today.';
            document.getElementById('trade_status').innerHTML = `Closed`
            document.getElementById('trade_status').style.color = `red`
            document.getElementById('countdown').style.fontSize = `12px`

            return;
        }
        if(beforeTimeDifference <= 60 * 60000 && beforeTimeDifference >= 0){

            const hours = Math.floor(beforeTimeDifference / (1000 * 60 * 60));
            beforeTimeDifference %= (1000 * 60 * 60);
        
            const minutes = Math.floor(beforeTimeDifference / (1000 * 60));
            beforeTimeDifference %= (1000 * 60);
        
            const seconds = Math.floor(beforeTimeDifference / 1000);
        
            const countdownText = `${hours}h ${minutes}m ${seconds}s`;
            document.getElementById('remaining_trade_time').innerHTML = `Trade will be Start in`
            document.getElementById('countdown').innerHTML = countdownText;
            document.getElementById('trade_status').innerHTML = `Closed`
            document.getElementById('trade_status').style.color = `red`

            return
        }
        if(beforeTimeDifference > 0){
            document.getElementById('countdown').innerHTML = 'Trading hours will be opened at 10:00am.';
            document.getElementById('trade_status').innerHTML = `Closed`
            document.getElementById('trade_status').style.color = `red`
            document.getElementById('countdown').style.fontSize = `12px`

            return
        }
    
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        timeDifference %= (1000 * 60 * 60);
    
        const minutes = Math.floor(timeDifference / (1000 * 60));
        timeDifference %= (1000 * 60);
    
        const seconds = Math.floor(timeDifference / 1000);
    
        const countdownText = `${hours}h ${minutes}m ${seconds}s`;
        document.getElementById('countdown').innerHTML = countdownText;
        document.getElementById('trade_status').innerHTML = `Open`
        document.getElementById('trade_status').style.color = `green`
    }

    function renderTradeSearchBox(){
        document.getElementById('tradeSearchBox').innerHTML = `
        <div class="search">
            <input type="text" name="searchBox">
        </div>
        <div class="relaod">
            <img src="../images/icons/reload.png" alt="reload" style="width: 30px;">
        </div>
        `
    }

    function renderSelectedStockBox(){
        document.getElementById('selectedStockBox').innerHTML = `
            <div class="innerCol">
                <h4 id="selectedStock">KEYACOSMET (B)</h4>
                <p id="selectedStockPrice">KEYA COSMETICS LIMITED</p>
            </div>
            <div class="innerCol">
                <h4 id="selectedStock">6.0</h4>
                <p id="selectedStockPrice">TK 0 (3.3%)</p>
            </div>
        `
    }

    function renderCseContent() {
        const tableBody = document.getElementById('cseContent');
        tableBody.innerHTML =
         `
            <table>
                <tr>
                    <th>No of<br>Buyer</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>No of<br>Seller</th>
                    <th>Qty</th>
                    <th>Price</th>
                </tr>
            </table>
            <div id="cseFooter" class="cseFooter"></div>
        `;
    
        cse_buySellData.forEach(data => {
            const newRow = document.createElement('tr');
    
            newRow.innerHTML = `
                <td>${data.no_of_buyer}</td>
                <td>${data.b_qty}</td>
                <td>${data.b_price}</td>
                <td>${data.no_of_seller}</td>
                <td>${data.s_qty}</td>
                <td>${data.s_price}</td>
            `;
        tableBody.querySelector('tbody').appendChild(newRow);
        });
        const tableFooter = document.getElementById('cseFooter');
    
        tableFooter.innerHTML = `
            <div>
                <div class= "item">
                    <div class="left">
                        <p>Last Trade<br>Price</p>
                        <p>:</p>
                    </div>
                    <div class="right">
                        <p>6.0</p>
                    </div>     
                </div>
                <div class= "item">
                    <div class="left">
                        <p>Total Volume</p>
                        <p>:</p>
                    </div>
                    <div class="right">
                        <p>53030</p>
                    </div>     
                </div>
                <div class= "item">
                    <div class="left">
                        <p>Day's Low</p>
                        <p>:</p>
                    </div>
                    <div class="right">
                        <p>5.8</p>
                    </div>     
                </div>
                <div class= "item">
                    <div class="left">
                        <p>YCP</p>
                        <p>:</p>
                    </div>
                    <div class="right">
                        <p>5.8</p>
                    </div>     
                </div>
            </div>
            <div>
                <div class= "item">
                <div class="left">
                    <p>Last Trade<br>Price</p>
                    <p>:</p>
                </div>
                <div class="right">
                    <p>6.0</p>
                </div>     
                </div>
                <div class= "item">
                    <div class="left">
                        <p>Total Volume</p>
                        <p>:</p>
                    </div>
                    <div class="right">
                        <p>53030</p>
                    </div>     
                </div>
                <div class= "item">
                    <div class="left">
                        <p>Day's High</p>
                        <p>:</p>
                    </div>
                    <div class="right">
                        <p>5.8</p>
                    </div>     
                </div>
                <div class= "item">
                    <div class="left">
                        <p>Circuit</p>
                        <p>:</p>
                    </div>
                    <div class="right">
                        <p>5.8</p>
                    </div>     
                </div>
            </div>
        `;
    }


    

    trade()
    renderStockTicker()
    renderMarketScheduale()
    updateCountdown();
    renderTradeSearchBox()
    renderSelectedStockBox()
    renderCseContent()
    document.getElementById('cseContent').style.display = 'block'
    document.getElementById('dseContent').style.display = 'none'
    

    return {
        stopMarketInterval: function () {
            clearInterval(marketIntervalId);
        },
        renderMarketScheduale: renderMarketScheduale,
        updateCountdown: updateCountdown, 
    };
}
function show(content){
    document.getElementById('cseContent').style.display = 'none'
    document.getElementById('dseContent').style.display = 'none'

    document.getElementById(content).style.display = 'block'

    updateButtonState(content)
}
function updateButtonState(activeButton) {
    let buttons = document.querySelectorAll('.btnGroup .Btn');
    buttons.forEach(function (button) {
        button.classList.remove('active');
    });

    let activeButtonElement = document.querySelector('.btnGroup .Btn[onclick*="' + activeButton + '"]');
    if (activeButtonElement) {
        activeButtonElement.classList.add('active');
    }
}