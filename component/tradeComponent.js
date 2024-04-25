async function executeTrade(data){
    let selectedScript = data
    let companyList =[]
    let stock_ticker_data = []
    let tradeHour = {}
    let cse_buySellData = []
    let fetchedCse_buySellData = {}
    let fetchedDse_buySellData = {}
    let dse_buySellData = []
    let scriptInfo = {}
    let activeBuy = false
    let activeSell = false
    let fetchedClientDetails = {}
    let availableShare
    let availableFund
    const openOrderData = [ 
        {
            type: 'BUY',
            script: 'ALI',
            status: 'SUBMITTED',
            qty: 100,
            rate: 14,
            excQty: 0,
            taka: 1249,
            date: '25-Apr-24 10:25'
        },
        {
            type: 'SELL',
            script: 'ALI',
            status: 'SUBMITTED',
            qty: 100,
            rate: 14,
            excQty: 0,
            taka: 1249,
            date: '25-Apr-24 10:25'
        },
        {
            type: 'BUY',
            script: 'ALI',
            status: 'CANCELLED',
            qty: 100,
            rate: 14,
            excQty: 0,
            taka: 1249,
            date: '25-Apr-24 10:25'
        },
        {
            type: 'BUY',
            script: 'ALI',
            status: 'SUBMITTED',
            qty: 100,
            rate: 14,
            excQty: 0,
            taka: 1249,
            date: '25-Apr-24 10:25'
        },
    ]

    const tradePageLogin = await Post_LOGIN_({
        CMND: "_LOGIN_",
        tid: "447",
        inv_id: user.inv_id,
        inv_pass: user.ngts_pass2, 
        force: "0"
    })
    if(tradePageLogin.success === true){
        sessionStorage.setItem('userData', JSON.stringify(tradePageLogin));

        const fetchedData = await getCompanyList()
        if(fetchedData.status === true){
            companyList = fetchedData.Data
        }
        tradeHour = await get_THOUR_()
        fetchedClientDetails = await get_CLIENTDET_()
    }

    async function handleListItemClick(event) {
        let companyName
        if(event){
            companyName = event.target.textContent;
        }
        selectedScript = companyName || selectedScript;
        const allCompanyList = document.getElementById('allCompanyList');
        allCompanyList.innerHTML = '';
        allCompanyList.style.display = 'none'
        document.getElementById('searchCompany').value = selectedScript

        fetchedCse_buySellData = await get_OFFER_(selectedScript)
        if(fetchedCse_buySellData.success === true){
            cse_buySellData = fetchedCse_buySellData.Offers
        }
        fetchedDse_buySellData = await get_OFFERD_(selectedScript)
        if(fetchedDse_buySellData.success === true){
            dse_buySellData = fetchedDse_buySellData.Offers
        }
        scriptInfo = await get_SCRIPINFO_(selectedScript)
        
        if(cse_buySellData !== null){
            renderCseContent()
        }
        if(dse_buySellData !== null){
            renderDseContent()
        }
        renderBuyContent()
        renderSellContent()
        document.getElementById('showScriptInfo').style.display = 'block'
        renderSelectedStockBox()
    }
    function handlePopUpMessage(heading, errorMessage, case_name){
        document.getElementById('overlay').style.display = 'block'
        document.getElementById('popupDiv').style.display = 'block'
        document.getElementById('popupDiv').innerHTML= `
            <h5>${heading}</h5>
            <p>${errorMessage}</p>
            <div><p id='invalidLoginCancel'>Cancel</p></div> 
        `
        document.getElementById('invalidLoginCancel').addEventListener('click', hidepopupDiv)
        document.getElementById('overlay').addEventListener('click', hidepopupDiv)
        function hidepopupDiv(){
            document.getElementById('overlay').style.display = 'none'
            document.getElementById('popupDiv').style.display = 'none'
            if (case_name){
                updateFooterBtnState('case_name');
                route(`../component/${case_name}Component.js`,`../css/${case_name}Component.css`,`${case_name}`)
            }
        }
    }
    function handleTradeBtn(case_name){
        return function(event){
            if(selectedScript || case_name === 'TP_halted' || case_name === 'TP_stockStatus' || case_name === 'TP_todayTrade' || case_name === 'TP_marketMover'){
                route(`../component/${case_name}Component.js`, `../css/${case_name}Component.css`, case_name, selectedScript);
            }else{
                const heading = 'Error'
                const errorMessage = 'Please Select a Script'
                handlePopUpMessage(heading, errorMessage)
            } 
        }   
    }

    function trade(){
        document.getElementById('mainContentSection').innerHTML = `
            <div id='popupDiv' style='display:none;'></div>
            <div id='confirmBuy' style='display:none;'></div>
            <div id='confirmSell' style='display:none;'></div>
            <div id='modifyOrder' style='display:none;'></div>
            <div class="pageHeading" id="financial-Heading">
                <div class="heading">
                    <h1>Trade</h1>
                </div>
            </div>

            <div class="stock_ticker_box">
                <div class="scrolling-content" id="scrolling-content">
                    <div id="tradeMarqueeContainer"></div>
                </div>
            </div>

            <div class="marketScheduale" id="marketScheduale"></div>

            <div class='container'>
                <div class="tradeSearchBox" id="tradeSearchBox"></div>
            </div>

            <div class="container">
                <div class="box">
                    <div class="tradeAllBtnBox" id="tradeAllBtnBox">
                        <div id='TP_companyInfo' class="singleBtn">COMP INFO</div>
                        <div id='TP_news' class="singleBtn">NEWS</div>
                        <div id='TP_todayTrade' class="singleBtn">ALL TRADES</div>
                        <div style='background-color: #73737366; color: #ffffff87;' id='TP_priceAlert' class="singleBtn">PRICE ALERT</div>
                        <div class="singleBtn" onclick="showFund()" >FUND STATUS</div>
                        <div id='TP_lastTrade' class="singleBtn">LAST TRADES</div>   
                        <div id='TP_marketMover' class="singleBtn">MKT MOVER</div>                        
                        <div id='TP_dividend' class="singleBtn">DIVIDEND</div>                       
                        <div id='TP_stockStatus' class="singleBtn">STK STATUS</div>
                        <div id='TP_rateHistory' class="singleBtn">RATE HISTORY</div>                       
                        <div id='TP_halted' class="singleBtn">HALTED COMP</div>
                        <div style='background-color: #73737366; color: #ffffff87;' id='TP_favourit' class="singleBtn">FAVOURITES</div>
                    </div>
                </div>
            </div>
            <div class="selectedStockSection">
                <div class= "container">
                    <div style='display:none;' id='showScriptInfo' class= "box">
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
                            <div style='flex-direction: column; min-height:390px;' class="ipoContent" id="cseContent">cse</div>
                            <div style='flex-direction: column; min-height:390px;' class="ipoContent" id="dseContent">dse</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="buySellSection">
                <div class= "container">
                    <div class= "box">
                        <div class="btnGroup" id="btnGroup">
                            <div  class="Btn" id="buy">BUY</div>
                            <div  class="Btn" id="sell">SELL</div>
                        </div>
                        <div class="buySellOrder">
                            <div class="ipoContent" id="buyContent"></div>
                            <div class="ipoContent" id="sellContent"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="openOrderSection" style='flex: 1 auto'>
                <div class= "container">
                    <div class= "box">
                        <div id='openOrderContent'></div>
                    </div>
                </div>
            </div>

            <div class="fundStatusBox" id="fundStatusBox"> 
                <div class="container">
                    <div class="box">
                        <div class="head">FUND STATUS</div>
                        <div class="body">
                            <div class="item">
                                <p>Opening Balance</p>
                                <p>77</p>
                            </div>
                            <div class="item">
                                <p>Net Blocked</p>
                                <p>0</p>
                            </div>
                            <div class="item">
                                <p>Purchase Limit</p>
                                <p>0</p>
                            </div>
                        </div>
                        <div class="footer" onclick="closeFund()">CANCEL</div>
                    </div>
                </div>
            </div>
        `
        document.getElementById('TP_companyInfo').addEventListener('click', handleTradeBtn('TP_companyInfo'))
        document.getElementById('TP_dividend').addEventListener('click', handleTradeBtn('TP_dividend'))
        document.getElementById('TP_halted').addEventListener('click', handleTradeBtn('TP_halted'))
        document.getElementById('TP_lastTrade').addEventListener('click', handleTradeBtn('TP_lastTrade'))
        document.getElementById('TP_marketMover').addEventListener('click', handleTradeBtn('TP_marketMover'))
        document.getElementById('TP_news').addEventListener('click', handleTradeBtn('TP_news'))
        document.getElementById('TP_rateHistory').addEventListener('click', handleTradeBtn('TP_rateHistory'))
        document.getElementById('TP_stockStatus').addEventListener('click', handleTradeBtn('TP_stockStatus'))
        document.getElementById('TP_todayTrade').addEventListener('click', handleTradeBtn('TP_todayTrade'))

        // document.getElementById('TP_priceAlert').addEventListener('click', handleTradeBtn('TP_priceAlert'))
        // document.getElementById('TP_favourit').addEventListener('click', handleTradeBtn('TP_favourit'))

        document.getElementById('buy').addEventListener('click', render('buyContent'))
        document.getElementById('sell').addEventListener('click', render('sellContent'))

        function render(content){
            return function(event){
                document.getElementById('buyContent').style.display = 'none'
                document.getElementById('sellContent').style.display = 'none'
    
                document.getElementById(content).style.display = 'block'
    
                updateButton(content)
            }
        }
        function updateButton(activeButton) {
            activeBuy = false
            activeSell = false
            if(activeButton === 'buyContent'){
                document.getElementById('buy').style.backgroundColor = '#4CB050'
                document.getElementById('buy').style.color = '#fff'
                document.getElementById('buyOrderSubmit').style.backgroundColor = '#4CB050'
                document.getElementById('buyOrderSubmit').style.color = '#fff'
                document.getElementById('sell').style.backgroundColor = '#868686'
                document.getElementById('sell').style.color = '#000'
                activeBuy = true
            }
            if(activeButton === 'sellContent'){
                document.getElementById('sell').style.backgroundColor = '#FE0000'
                document.getElementById('sell').style.color = '#fff'
                document.getElementById('sellOrderSubmit').style.color = '#fff'
                document.getElementById('sellOrderSubmit').style.backgroundColor = '#FE0000'
                document.getElementById('buy').style.backgroundColor = '#868686'
                document.getElementById('buy').style.color = '#000'
                activeSell = true
            }
        }
    }
    function renderStockTicker(){
        const stockTickerBody = document.getElementById('tradeMarqueeContainer')
        stockTickerBody.innerHTML = ''
        stock_ticker_data.forEach((ticker, index) => {
            const newDiv = document.createElement('div')
            newDiv.classList.add(`ticker_item`, `ticker_item_${index}`)
            newDiv.innerHTML=`
                <h6 class = "ticker_heading">${ticker.scrip}</h6>
                <p class = "ticker_data">${ticker.LTP}(${ticker.Chng})</p>
            `
            stockTickerBody.appendChild(newDiv)
            document.querySelector(`.ticker_item_${index}`).style.backgroundColor = `${ticker.chng >= 0 ? (ticker.chng > 0 ? '#04A41E' : '#0D279B') : '#FE0000' }`
        });
        
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
                            <h4 id="trade_status"></h4>
                            <h4 id="countdown"></h4>
                        </div>
                    </div>
                </div>
            </div>
        `
        tradeTimeIntervalId = setInterval(()=>{
            updateCountdown();
        }, 1000); 
    }
    async function updateCountdown() {
        if(tradeHour.trade === 1 || tradeHour.trade === 0){
            stock_ticker_data = await get_TICKER_()
            
            renderStockTicker()
        }
        const now = new Date().toLocaleString("en-US", {timeZone: "Asia/Dhaka"});
        const currentTime = new Date(now);
    
        const dayOfWeek = currentTime.getDay();
        if (dayOfWeek === 5 || dayOfWeek === 6){
            document.getElementById('countdown').innerHTML = 'No trading on Friday and Saturday.';
            document.getElementById('trade_status').innerHTML = `Closed`
            document.getElementById('trade_status').style.color = `red`
            document.getElementById('countdown').style.fontSize = `12px`

            return;
        }
        const targetTime = new Date(currentTime);
        targetTime.setHours(10, 0, 0, 0);
        const targetTime2 = new Date(currentTime);
        targetTime2.setHours(14, 30, 0, 0);
        if (currentTime.getTime() === targetTime.getTime() || currentTime.getTime() === targetTime2.getTime()) {
            tradeHour = await get_THOUR_()
        }

        const tradeStartTime = tradeHour.trade === 0 ? new Date(tradeHour.cntm) : ''
        const tradeEndTime = tradeHour.trade === 1 ? new Date(tradeHour.cntm) : ''
        
        let timeDifference = tradeEndTime - currentTime;
        let beforeTimeDifference = tradeStartTime - currentTime
        
        if (new Date(tradeHour.cntm).toISOString().split('T')[0] !== currentTime.toISOString().split('T')[0] && timeDifference < 0) {
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
        
            const countdownText = `${hours}h ${minutes < 10 ? '0' + minutes : minutes}m ${seconds < 10 ? '0' + seconds : seconds}s`;
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
        const countdownText = `${hours}h ${minutes < 10 ? '0' + minutes : minutes}m ${seconds < 10 ? '0' + seconds : seconds}s`;
        document.getElementById('countdown').innerHTML = countdownText;
        document.getElementById('trade_status').innerHTML = `Open`
        document.getElementById('trade_status').style.color = `#0aeb0a`
        document.getElementById('remaining_trade_time').innerHTML = `Remaining Trade Time`
    }
    function renderTradeSearchBox(){
        document.getElementById('tradeSearchBox').innerHTML = `
        <div class="search">
            <input id='searchCompany' type="text" name="searchBox" placeholder="Select Script" value='${selectedScript !== undefined ? selectedScript : ''}'>
            <ul style='display: none' class='allCompanyList' id='allCompanyList'></ul>
        </div>
        <div class="relaod" id='reloadSearchBox'>
            <img src="../images/icons/reload.png" alt="reload" style="width: 30px;">
        </div>
        `
        document.getElementById('searchCompany').addEventListener('input', async () => {
        const existList = document.querySelectorAll('.allCompanyListItem');
        if(existList){
            existList.forEach(item => {
                item.remove();
            });
        } 
        document.getElementById('allCompanyList').style.display = 'block'
        const setWidth = document.getElementById('searchCompany').offsetWidth
        document.getElementById('allCompanyList').style.width = setWidth+'px'

        const inputValue = document.getElementById('searchCompany').value;
        companyList.forEach(item => {
            const companyName = item.Company.toLowerCase();
            if (companyName.includes(inputValue.toLowerCase()) && inputValue !== '') {
                const listItem = document.createElement('li');
                listItem.innerHTML = item.Company
                listItem.id = item.Company
                listItem.classList.add('allCompanyListItem')
                listItem.addEventListener('click', handleListItemClick);
                document.getElementById('allCompanyList').appendChild(listItem)
            }
        });
    });
    }
    function renderSelectedStockBox(){
        document.getElementById('selectedStockBox').innerHTML = `
            <div class="innerCol">
                <h4 id="selectedStockID">${scriptInfo.ID} (${scriptInfo.sCat})</h4>
                <p id="selectedStockName">${scriptInfo.sNam}</p>
            </div>
            <div class="innerCol">
                <h4 id="selectedStockPrice">${scriptInfo.sLTP}</h4>
                <p id="selectedStockChange">TK ${scriptInfo.sChng} (${scriptInfo.sChngP}%)</p>
            </div>
        `
        
        document.getElementById('selectedStockPrice').style.color = `${scriptInfo.sChng >= 0 ? (scriptInfo.sChng > 0 ? '#04A41E' : '#fff') : '#FE0000' }`
        document.getElementById('selectedStockChange').style.color = `${scriptInfo.sChng >= 0 ? (scriptInfo.sChng > 0 ? '#04A41E' : '#fff') : '#FE0000' }`
    }
    function renderCseContent() {
        const tableBody = document.getElementById('cseContent');
        tableBody.innerHTML =
         `
            <div style='flex: 1 auto'>
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
            </div>
            <div id="cseFooter" class="cseFooter"></div>
        `;
    
        cse_buySellData.forEach(data => {
            const newRow = document.createElement('tr');
    
            newRow.innerHTML = `
                <td>${data.BO}</td>
                <td>${data.BQ}</td>
                <td>${data.BP}</td>
                <td>${data.SO}</td>
                <td>${data.SQ}</td>
                <td>${data.SP}</td>
            `;
        tableBody.querySelector('tbody').appendChild(newRow);
        });
        const tableFooter = document.getElementById('cseFooter');
    
        tableFooter.innerHTML = `
            <div>
                <div class= "item">
                    <div class="left">
                        <p>Last Trade Price</p>
                        <p>:</p>
                    </div>
                    <div class="right">
                        <p>${fetchedCse_buySellData.success === true ? fetchedCse_buySellData.LTP : ''}</p>
                    </div>     
                </div>
                <div class= "item">
                    <div class="left">
                        <p>Total Volume</p>
                        <p>:</p>
                    </div>
                    <div class="right">
                        <p>${fetchedCse_buySellData.success === true ? fetchedCse_buySellData.TotVolume : ''}</p>
                    </div>     
                </div>
                <div class= "item">
                    <div class="left">
                        <p>Day's Low</p>
                        <p>:</p>
                    </div>
                    <div class="right">
                        <p>${fetchedCse_buySellData.success === true ? fetchedCse_buySellData.dyLow : ''}</p>
                    </div>     
                </div>
                <div class= "item">
                    <div class="left">
                        <p>YCP</p>
                        <p>:</p>
                    </div>
                    <div class="right">
                        <p>${fetchedCse_buySellData.success === true ? fetchedCse_buySellData.YCP : ''}</p>
                    </div>     
                </div>
            </div>
            <div>
                <div class= "item">
                <div class="left">
                    <p>Last Trade Qty</p>
                    <p>:</p>
                </div>
                <div class="right">
                    <p>${fetchedCse_buySellData.success === true ? fetchedCse_buySellData.LastQt : ''}</p>
                </div>     
                </div>
                <div class= "item">
                    <div class="left">
                        <p>Total Value</p>
                        <p>:</p>
                    </div>
                    <div class="right">
                        <p>${fetchedCse_buySellData.success === true ? fetchedCse_buySellData.TotValue : ''}</p>
                    </div>     
                </div>
                <div class= "item">
                    <div class="left">
                        <p>Day's High</p>
                        <p>:</p>
                    </div>
                    <div class="right">
                        <p>${fetchedCse_buySellData.success === true ? fetchedCse_buySellData.dyHigh : ''}</p>
                    </div>     
                </div>
                <div class= "item">
                    <div class="left">
                        <p>Circuit</p>
                        <p>:</p>
                    </div>
                    <div class="right">
                        <p>${fetchedCse_buySellData.success === true ? fetchedCse_buySellData.lowLimit+' - '+fetchedCse_buySellData.upLimit : ''}</p>
                    </div>     
                </div>
            </div>
        `;
    }
    function renderDseContent() {
        const tableBody = document.getElementById('dseContent');
        tableBody.innerHTML =
         `
            <div style='flex: 1 auto'>
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
            </div>
            <div id="dseFooter" class="cseFooter"></div>
        `;
    
        dse_buySellData.forEach(data => {
            const newRow = document.createElement('tr');
    
            newRow.innerHTML = `
                <td>${data.BO}</td>
                <td>${data.BQ}</td>
                <td>${data.BP}</td>
                <td>${data.SO}</td>
                <td>${data.SQ}</td>
                <td>${data.SP}</td>
            `;
        tableBody.querySelector('tbody').appendChild(newRow);
        });
        const tableFooter = document.getElementById('dseFooter');
    
        tableFooter.innerHTML = `
        <div>
            <div class= "item">
                <div class="left">
                    <p>Last Trade Price</p>
                    <p>:</p>
                </div>
                <div class="right">
                    <p>${fetchedDse_buySellData.success === true ? fetchedDse_buySellData.LTP : ''}</p>
                </div>     
            </div>
            <div class= "item">
                <div class="left">
                    <p>Total Volume</p>
                    <p>:</p>
                </div>
                <div class="right">
                    <p>${fetchedDse_buySellData.success === true ? fetchedDse_buySellData.TotVolume : ''}</p>
                </div>     
            </div>
            <div class= "item">
                <div class="left">
                    <p>Day's Low</p>
                    <p>:</p>
                </div>
                <div class="right">
                    <p>${fetchedDse_buySellData.success === true ? fetchedDse_buySellData.dyLow : ''}</p>
                </div>     
            </div>
            <div class= "item">
                <div class="left">
                    <p>YCP</p>
                    <p>:</p>
                </div>
                <div class="right">
                    <p>${fetchedDse_buySellData.success === true ? fetchedDse_buySellData.YCP : ''}</p>
                </div>     
            </div>
        </div>
        <div>
            <div class= "item">
            <div class="left">
                <p>Last Trade Qty</p>
                <p>:</p>
            </div>
            <div class="right">
                <p>${fetchedDse_buySellData.success === true ? fetchedDse_buySellData.LastQt : ''}</p>
            </div>     
            </div>
            <div class= "item">
                <div class="left">
                    <p>Total Value</p>
                    <p>:</p>
                </div>
                <div class="right">
                    <p>${fetchedDse_buySellData.success === true ? fetchedDse_buySellData.TotValue : ''}</p>
                </div>     
            </div>
            <div class= "item">
                <div class="left">
                    <p>Day's High</p>
                    <p>:</p>
                </div>
                <div class="right">
                    <p>${fetchedDse_buySellData.success === true ? fetchedDse_buySellData.dyHigh : ''}</p>
                </div>     
            </div>
            <div class= "item">
                <div class="left">
                    <p>Circuit</p>
                    <p>:</p>
                </div>
                <div class="right">
                    <p>${fetchedDse_buySellData.success === true ? fetchedDse_buySellData.lowLimit+' - '+fetchedCse_buySellData.upLimit : ''}</p>
                </div>     
            </div>
        </div>
        `;
    }
    function renderBuyContent() {
        availableFund = fetchedClientDetails.success === true ? fetchedClientDetails.freeCash : 'invalid'
        document.getElementById('buyContent').innerHTML=`
        <div class="availableFund">
            <p>Available Fund</p>
            <p>Tk ${availableFund}</p>
        </div>
        <div class="buySellFormContent">
            <form id='buyFormSubmit'>
                <div class="rowForm rowForm-1">
                    <div class="rowItem">
                        <input id="b_marketPrice" type="checkbox" name="marketPrice" >
                        <label for="marketPrice">Market Price</label>
                    </div>
                </div>
                <div class="rowForm">
                    <label for="b_quantity">Quantity</label>
                    <input type="number" id="b_quantity" name="b_quantity" placeholder="Enter Qty" required>
                </div>
                <div class="rowForm">
                    <label for="b_rate">Rate</label>
                    <input type="number" id="b_rate" name="b_rate" placeholder="Enter Rate"  required>
                </div>
                <div class="rowForm">
                    <label for="estimatedTotal">Estimated Taka, You Need</label>
                    <input type="number" id="estimatedTotal" name="" placeholder="Tk0" required readonly>
                </div>
                <div class="orderSubmit">
                    <input type="submit" id="buyOrderSubmit" value="ORDER SUBMIT">
                </div>
            </form>
        </div>
        `
        function goConfirmBuy(){
            document.getElementById('overlay').style.display = 'block'
            document.getElementById('confirmBuy').style.display = 'block'
            document.getElementById('confirmBuy').innerHTML= `
                <h5>BUY CONFIRMATION</h5>
                <p>
                    <span>Are you sure to BUY ${selectedScript}?</span>
                    <br>
                    Quantity: ${document.getElementById('b_quantity').value} @ Rate: ${document.getElementById('b_marketPrice').checked ? 'Market Price' : document.getElementById('b_rate').value }
                </p>
                <div>
                    <p style='background-color: #000;' id='cancelBtn'>CANCEL</p>
                    <p style='background-color: #4CB050;' id='buyConfirmBtn'>CONFIRM</p>
                </div> 
            `
            function cancelConfirmBuy(){
                document.getElementById('overlay').style.display = 'none'
                document.getElementById('confirmBuy').style.display = 'none'
            }
            document.getElementById('cancelBtn').addEventListener('click', cancelConfirmBuy)
            document.getElementById('overlay').addEventListener('click', cancelConfirmBuy)
        }
        function handleCalcQuantityAndRate(){
            if(document.getElementById('b_quantity').value !== '' && document.getElementById('b_rate').value !== ''){
                document.getElementById('estimatedTotal').value = Number(document.getElementById('b_quantity').value) * Number(document.getElementById('b_rate').value)
            }
        }
        document.getElementById('b_quantity').addEventListener('input', handleCalcQuantityAndRate)
        document.getElementById('b_rate').addEventListener('input', handleCalcQuantityAndRate)
        document.getElementById('b_marketPrice').addEventListener('change', function() {
            if(this.checked){
                document.getElementById('b_rate').setAttribute('readonly' , 'true')
                document.getElementById('b_rate').style.backgroundColor = '#98989A'
                document.getElementById('estimatedTotal').setAttribute('readonly' , 'true')
                document.getElementById('estimatedTotal').style.backgroundColor = '#98989A'
            }else{
                document.getElementById('b_rate').removeAttribute('readonly' , 'false')
                document.getElementById('b_rate').style.backgroundColor = 'unset'
                document.getElementById('estimatedTotal').removeAttribute('readonly' , 'false')
                document.getElementById('estimatedTotal').style.backgroundColor = 'unset'
            }
        })
        document.getElementById('buyFormSubmit').addEventListener('submit', async (event) => {
            event.preventDefault();
            if(activeBuy){
                if(selectedScript !== undefined){
                    goConfirmBuy()
                }else{
                    const heading = 'Error'
                    const errorMessage = 'Please Select a Script'
                    handlePopUpMessage(heading, errorMessage)
                }
            }else{
                const heading = 'Error'
                const errorMessage = 'Please Select Buy or Sell'
                handlePopUpMessage(heading, errorMessage,)
            }
        })
    }
    function renderSellContent() {
        if(fetchedClientDetails.success === true){
            availableShare = fetchedClientDetails.Stocks.find(obj => obj.Scrip === selectedScript) ? fetchedClientDetails.Stocks.find(obj => obj.Scrip === selectedScript).Qt : 0
        }
        
        document.getElementById('sellContent').innerHTML=`
        <div class="availableFund">
            <p>Available Shares</p>
            <p>${availableShare}</p>
        </div>
        <div class="buySellFormContent">
            <form id="sellFormSubmit">
                <div class="rowForm rowForm-1">
                    <div class="rowItem">
                        <input id="s_marketPrice" type="checkbox" name="s_marketPrice" >
                        <label for="s_marketPrice">Market Price</label>
                    </div>
                    <div class="box">
                        <div>
                            <input id="halfSell" type="radio" name="sellType" value="half">
                            <label for="halfSell">Half</label>
                        </div>
                        <div>
                            <input id="fullSell" type="radio" name="sellType" value="full" >
                            <label for="fullSell">Full</label>
                        </div>
                    </div>
                </div> 
                <div class="rowForm">
                    <label for="s_quantity">Quantity</label>
                    <input type="number" id="s_quantity" name="s_quantity" placeholder="Enter Qty" required>
                </div>
                <div class="rowForm">
                    <label for="s_rate">Rate</label>
                    <input type="number" id="s_rate" name="s_rate" placeholder="Enter Rate"  required>
                </div>
                <div class="rowForm">
                    <label for="sellTotal">Total Taka, You Received</label>
                    <input type="number" id="sellTotal" name="sellTotal" placeholder="Tk0" required readonly>
                </div>
                <div class="orderSubmit">
                    <input type="submit" id="sellOrderSubmit" value="ORDER SUBMIT">
                </div>
            </form>
        </div>
        `
        function goConfirmSell(){
            document.getElementById('overlay').style.display = 'block'
            document.getElementById('confirmSell').style.display = 'block'
            document.getElementById('confirmSell').innerHTML= `
                <h5>Sell CONFIRMATION</h5>
                <p>
                    <span>Are you sure to Sell ${selectedScript}?</span>
                    <br>
                    Quantity: ${document.getElementById('s_quantity').value} @ Rate: ${document.getElementById('s_marketPrice').checked ? 'Market Price' : document.getElementById('s_rate').value }
                </p>
                <div>
                    <p style='background-color: #000;' id='cancelBtn'>CANCEL</p>
                    <p style='background-color: red;' id='buyConfirmBtn'>CONFIRM</p>
                </div> 
            `
            function cancelConfirmSell(){
                document.getElementById('overlay').style.display = 'none'
                document.getElementById('confirmSell').style.display = 'none'
            }
            document.getElementById('cancelBtn').addEventListener('click', cancelConfirmSell)
            document.getElementById('overlay').addEventListener('click', cancelConfirmSell)
        }
        document.querySelectorAll('input[name="sellType"]').forEach(radio => {
            let stockQuantity = availableShare;
            console.log(availableShare)
            radio.addEventListener('change', function() {
                if (this.value === 'half') {
                    const halfStockQuantity = stockQuantity/2
                    document.getElementById('s_quantity').value = Math.floor(halfStockQuantity)
                    handleCalcQuantityAndRate()
                } else {
                    document.getElementById('s_quantity').value = Math.floor(stockQuantity)
                    handleCalcQuantityAndRate()
                }
            });
        });
        function handleCalcQuantityAndRate(){
            let stockQuantity = availableShare;
            if(stockQuantity !== 0 && (Number(document.getElementById('s_quantity').value) === Math.floor(stockQuantity/2))){
                document.getElementById('halfSell').checked = true;
            }
            else if(stockQuantity !== 0 && (Number(document.getElementById('s_quantity').value) === stockQuantity)){
                document.getElementById('fullSell').checked = true;
            }else{
                document.getElementById('halfSell').checked = false;
                document.getElementById('fullSell').checked = false;
            }
            
            if(document.getElementById('s_quantity').value !== '' && document.getElementById('s_rate').value !== ''){
                document.getElementById('sellTotal').value = Number(document.getElementById('s_quantity').value) * Number(document.getElementById('s_rate').value)
            }
        }
        document.getElementById('s_quantity').addEventListener('input', handleCalcQuantityAndRate)
        document.getElementById('s_rate').addEventListener('input', handleCalcQuantityAndRate)
        document.getElementById('s_marketPrice').addEventListener('change', function() {
            if(this.checked){
                document.getElementById('s_rate').setAttribute('readonly' , 'true')
                document.getElementById('s_rate').style.backgroundColor = '#98989A'
                document.getElementById('sellTotal').setAttribute('readonly' , 'true')
                document.getElementById('sellTotal').style.backgroundColor = '#98989A'
            }else{
                document.getElementById('s_rate').removeAttribute('readonly' , 'false')
                document.getElementById('s_rate').style.backgroundColor = 'unset'
                document.getElementById('sellTotal').removeAttribute('readonly' , 'false')
                document.getElementById('sellTotal').style.backgroundColor = 'unset'
            }
        })
        document.getElementById('sellFormSubmit').addEventListener('submit', async (event) => {
            event.preventDefault();
      
            if(selectedScript !== undefined){
                goConfirmSell()
            }else{
                const heading = 'Error'
                const errorMessage = 'Please Select a Script'
                handlePopUpMessage(heading, errorMessage)
            }
            
        })
    }
    function renderModifyOrder(){
        document.getElementById('overlay').style.display = 'block'
        document.getElementById('modifyOrder').style.display = 'block'
        document.getElementById('modifyOrder').innerHTML= `
            <h5>MODIFY CONFIRMATION</h5>
            <p>
                <span>Are you sure to BUY ${selectedScript}?</span>
                <br>
                Quantity: ${document.getElementById('b_quantity').value} @ Rate: ${document.getElementById('b_marketPrice').checked ? 'Market Price' : document.getElementById('b_rate').value }
            </p>
            <div>
                <p style='background-color: #000;' id='cancelBtn'>CANCEL</p>
                <p style='background-color: red;' id='modifyConfirmBtn'>CONFIRM</p>
            </div> 
        `
        function cancelModifyBuy(){
            document.getElementById('overlay').style.display = 'none'
            document.getElementById('modifyOrder').style.display = 'none'
        }
        document.getElementById('cancelBtn').addEventListener('click', cancelModifyBuy)
        document.getElementById('overlay').addEventListener('click', cancelModifyBuy)
        
    }
    function renderOperOrder(){
        document.getElementById('openOrderContent').innerHTML=`
            <div class='openOrderHeading'>
                <h3>Open Orders</h3>
            </div>
            <div id='openOrderList'></div>    
        `
        const contentBody = document.getElementById('openOrderList')
        openOrderData.forEach((data, index)=> {
            const newDiv = document.createElement('div');
            newDiv.classList.add('openOrderItem');
            newDiv.innerHTML = `
                <div id='heading${index}' class='heading'>
                    <h5>${data.type}</h5>
                    <div class='script_status'>
                        <h5>${data.script}</h5>
                        <h5>${data.status}</h5>
                    </div>
                </div>
                <div class='body'>
                    <div class='openOrderDetails'>
                        <div class='openOrderColumn'>
                            <p>Qty</p>
                            <p>${data.qty}</p>
                        </div>
                        <div class='openOrderColumn'>
                            <p>Rate</p>
                            <p>${data.rate}</p>
                        </div>
                    </div>
                    <hr>
                    <div class='openOrderDetails'>
                        <div class='openOrderColumn'>        
                            <p>Exec Qty</p>
                            <p>${data.excQty}</p>
                        </div>
                        <div class='openOrderColumn'>
                            <p>Taka</p>
                            <p>${data.taka}</p>
                        </div>
                    </div>
                </div>
                <div class='footerBtn'>
                    <div class='openOrderDate'>
                        <p>${data.date}</p>
                    </div>
                    <div class='openOrderBtn'>
                        <p class='openOrderCancele' id='openOrderCancele${index}'>CANCEL</p>
                        <p class='openOrderModify' id='openOrderModify${index}'>MODIFY</p>
                    </div>
                </div>
            `
            contentBody.appendChild(newDiv)
            document.getElementById(`openOrderModify${index}`).addEventListener('click', async ()=>{
                renderModifyOrder()
            })
            if(data.status === 'CANCELLED'){
                document.getElementById(`heading${index}`).style.backgroundColor = '#120181'
                document.getElementById(`heading${index}`).style.color = '#fff'
                document.getElementById(`openOrderCancele${index}`).style.display = 'none'
                document.getElementById(`openOrderModify${index}`).style.display = 'none'
            }
            if(data.status === 'SUBMITTED'){
                document.getElementById(`heading${index}`).style.backgroundColor = '#DFE1DC'
                document.getElementById(`heading${index}`).style.color = '#4CB050'
            }

            
        })
        
    }

    trade()
    renderStockTicker()
    renderMarketScheduale()
    updateCountdown()
    renderTradeSearchBox()
    renderSelectedStockBox()
    renderCseContent()
    renderDseContent()
    renderBuyContent()
    renderSellContent() 
    renderOperOrder()
    document.getElementById('fundStatusBox').style.display = 'none'
    document.getElementById('cseContent').style.display = 'flex'
    document.getElementById('dseContent').style.display = 'none'
    document.getElementById('buyContent').style.display = 'block'
    document.getElementById('sellContent').style.display = 'none'
    document.getElementById('overlay').style.display = 'none';
 
    
    

    

    if(tradePageLogin.success === false){
        const heading = 'Unauthorized Access'
        const errorMessage = 'Invalid Password or User ID for Trade Page'
        const case_name = 'home'
        handlePopUpMessage(heading, errorMessage, case_name)
    }
              
    

   document.getElementById('reloadSearchBox').addEventListener('click', ()=>{
        if(selectedScript !== undefined){
            handleListItemClick()
        } 
   })
    document.getElementById('overlay').addEventListener('click', ()=>{
        closeFund()
    })
    if(selectedScript !== undefined){
        handleListItemClick()
    }

    
}

document.getElementById('overlay').style.display = 'none';
function showFund(){
    document.getElementById('fundStatusBox').style.display = 'block'
    document.getElementById('overlay').style.display = 'block';
    document.body.style.overflow = 'hidden';
}
function closeFund(){
    document.getElementById('fundStatusBox').style.display = 'none'
    document.getElementById('overlay').style.display = 'none';
    document.body.style.overflow = 'scroll';
}
function show(content){
    document.getElementById('cseContent').style.display = 'none'
    document.getElementById('dseContent').style.display = 'none'

    document.getElementById(content).style.display = 'flex'

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
