async function executeProfitLoss(){
    const currentStocks = []
    const oldStocks = []
    let profitLossSummaryData = {}
    const fetchedData = await getProfitLossStocksData(user.LoggedInInvestorId)
    if(fetchedData.status === true){
        profitLossSummaryData.real_val = 0
        profitLossSummaryData.unreal_val = 0
        profitLossSummaryData.tsv = 0
        fetchedData.Data.forEach(item => {
            profitLossSummaryData.real_val = profitLossSummaryData.real_val + Number(item.real_val.replace(/,/g, ''))
            profitLossSummaryData.unreal_val = profitLossSummaryData.unreal_val + Number(item.unreal_val.replace(/,/g, ''))
            if(item.bal_qty === '0'){
                oldStocks.push(item)
            }else{
                currentStocks.push(item)
                profitLossSummaryData.tsv = profitLossSummaryData.tsv + Math.round(Number(item.bal_qty.replace(/,/g, '')) * Number(item.cur_price.replace(/,/g, '')))

                
            }
        })  
    }
    function profitLoss(){
        let today = new Date().toISOString().split('T')[0];
        today = customDateConverter(today, 'defaultToCustom');
        document.getElementById('mainContentSection').innerHTML = 
        `
            <div class="pageHeading" id="financial-Heading">
                <div class="heading">
                    <h1>Profit Loss Statement</h1>
                </div>
                <div class="sub-heading">
                    <p>Statement As On</p>
                    <p>${today}</p>
                </div>
            </div>
            
            <div class="section section-profitLossSummary">
                <div class='container'>
                    <div class= 'profitLossSummary' id= 'profitLossSummary'></div>
                </div>
            </div>
            <div onscroll="resetLogoutTimer()" class="section section-availableStok" style="flex: 1 auto;overflow-y: auto;">
                <div class="container" style="position: relative;">
                    <div class="btnRow" style="position: sticky;top: -1px;">
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
        `
    }

    function renderProfitLossSummary(){
        profitLossSummaryData.tsv = profitLossSummaryData.tsv === undefined ? 0 : profitLossSummaryData.tsv
        profitLossSummaryData.real_val = profitLossSummaryData.real_val === undefined ? 0 : profitLossSummaryData.real_val
        profitLossSummaryData.unreal_val = profitLossSummaryData.unreal_val === undefined ? 0 : profitLossSummaryData.unreal_val
        const profitLossSummaryBody = document.getElementById('profitLossSummary')
        // console.log(typeof(profitLossSummaryData.tsv))
        profitLossSummaryBody.innerHTML = `
        <div class='itemRow'>
            <p>Total Stock Value</P>
            <p>${profitLossSummaryData.tsv.toLocaleString("en-IN")} </p>
        </div>
        <div class='itemRow'>
            <p>Total Realized Profit/Loss</P>
            <p id='trpl'>${profitLossSummaryData.real_val.toLocaleString("en-IN")}</p>
        </div>
        <div class='itemRow'>
            <p>Total Unrealized Profit/Loss</P>
            <p id='tupl'>${profitLossSummaryData.unreal_val.toLocaleString("en-IN")}</p>
        </div>
        `
        document.getElementById(`trpl`).style.color = profitLossSummaryData.real_val >= 0 ? (profitLossSummaryData.real_val > 0 ? '#04A41E' : '#000') : '#FE0000'
        document.getElementById(`tupl`).style.color = profitLossSummaryData.unreal_val >= 0 ? (profitLossSummaryData.unreal_val > 0 ? '#04A41E' : '#000') : '#FE0000'
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
    
        currentStocks.forEach((stock, index) => {
            const newRow = document.createElement('tr');
    
            newRow.innerHTML = `
                <td class='td'>
                    <div class="top">
                        <div class="topHead">
                            <h2>${stock.company}</h2>
                            <h2>${stock.bal_qty}</h2>  
                        </div>
                        <div class="profit-loss">
                            <p>Realized Profit/Loss</p>
                            <p id='C_realProfitLoss${index}'>${stock.real_val}</p>
                        </div>
                        <div class="profit-loss">
                            <p>Unrealized Profit/Loss</p>
                            <p id='C_unrealProfitLoss${index}'>${stock.unreal_val}</p>
                        </div>
                    </div>
                    <div class="bottom"></div>
                    
                </td>
            `;
        tableBody.querySelector('tbody').appendChild(newRow);
        const r_value = Number(stock.real_val.replace(/,/g, ''))
        document.getElementById(`C_realProfitLoss${index}`).style.color = r_value >= 0 ? (r_value > 0 ? '#04A41E' : '#000') : '#FE0000'

        const ur_value = Number(stock.unreal_val.replace(/,/g, ''))
        document.getElementById(`C_unrealProfitLoss${index}`).style.color = ur_value >= 0 ? (ur_value > 0 ? '#04A41E' : '#000') : '#FE0000'
        const trades = [
            {
                type: 'Buy',
                qty : stock.b_qty,
                price_per_qty: stock.b_rate,
                total_price: Math.round(Number(stock.b_qty.replace(/,/g, '')) * Number(stock.b_rate.replace(/,/g, '')))
            },
            {
                type: 'Sell',
                qty : stock.s_qty,
                price_per_qty: stock.s_rate,
                total_price: Math.round(Number(stock.s_qty.replace(/,/g, '')) * Number(stock.s_rate.replace(/,/g, '')))
            }
        ]
        trades.forEach(trade=>{
            const bottomData = newRow.querySelector('.bottom');
            const newDiv = document.createElement('div')
            newDiv.innerHTML = 
            `
                <p style="text-align:left">${trade.type}</p>
                <p>${trade.qty}</p>
                <p>${trade.price_per_qty}</p>
                <p>Tk ${trade.total_price.toLocaleString("en-IN")}</p>
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
    
        oldStocks.forEach((stock, index) => {
            const newRow = document.createElement('tr');
    
            newRow.innerHTML =
            `
                <td>
                    <div class="top">
                        <div class="topHead">
                            <h2>${stock.company}</h2>
                            <h2>${stock.bal_qty}</h2>    
                        </div>
                        <div class="profit-loss">
                            <p>Realized Profit/Loss</p>
                            <p id='P_realProfitLoss${index}'>${stock.real_val}</p>
                        </div>
                        <div class="profit-loss">
                            <p>Unrealized Profit/Loss</p>
                            <p id='P_unrealProfitLoss${index}'>${stock.unreal_val}</p>
                        </div>
                    </div>
                    <div class="bottom"></div>
                </td>
            `;
        
        
        tableBody.querySelector('tbody').appendChild(newRow);
        const r_value = Number(stock.real_val.replace(/,/g, ''))
        document.getElementById(`P_realProfitLoss${index}`).style.color = r_value >= 0 ? (r_value > 0 ? '#04A41E' : '#000') : '#FE0000'

        const ur_value = Number(stock.unreal_val.replace(/,/g, ''))
        document.getElementById(`P_unrealProfitLoss${index}`).style.color = ur_value >= 0 ? (ur_value > 0 ? '#04A41E' : '#000') : '#FE0000'
        
        const trades = [
            {
                type: 'Buy',
                qty : stock.b_qty,
                price_per_qty: stock.b_rate,
                total_price: Math.round(Number(stock.b_qty.replace(/,/g, '')) * Number(stock.b_rate.replace(/,/g, '')))
            },
            {
                type: 'Sell',
                qty : stock.s_qty,
                price_per_qty: stock.s_rate,
                total_price: Math.round(Number(stock.s_qty.replace(/,/g, '')) * Number(stock.s_rate.replace(/,/g, '')))
            }
        ]
        trades.forEach(trade=>{
            const bottomData = newRow.querySelector('.bottom');
            const newDiv = document.createElement('div')
            newDiv.innerHTML = 
            `
                <p style="text-align:left">${trade.type}</p>
                <p>${trade.qty}</p>
                <p>${trade.price_per_qty}</p>
                <p>Tk ${trade.total_price.toLocaleString("en-IN")}</p>
            `;
            bottomData.appendChild(newDiv);
        })
        });
    }


    profitLoss()
    renderProfitLossSummary()
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

