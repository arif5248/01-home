async function executeTP_todayTrade(){
    let todaysTrade = await get_TICKPRICE_()
    
    function todayTrade(){
        document.getElementById('mainContentSection').innerHTML = `
        <div class="pageHeading" id="financial-Heading">
            <div class="heading">
                <h1>Today's All Price</h1>
            </div>
        </div>

        <div class='container'>
            <div class="tradeSearchBox" id="tradeSearchBox"></div>
        </div>
        
        <div onscroll="resetLogoutTimer()" class='container' style="flex: 1  auto; height: 100%; overflow-y: auto;">
            <div class="todaysTradeBody" id="todaysTradeBody"></div>
        </div>
       
        `
    }

    function renderTradeSearchBox(){
        document.getElementById('tradeSearchBox').innerHTML = `
        <div class="search">
            <input id='searchTodayPrice' type="text" name="searchBox" placeholder="Search">
        </div>
        <div id='reloadTodayPrice' class="relaod">
            <img src="../images/icons/reload.png" alt="reload" style="width: 30px;">
        </div>
        `
    }

    function renderTodayTrades(){
        const tableBody = document.getElementById('todaysTradeBody')
        tableBody.innerHTML =
         `
            <table>
                <tr>
                    <th>Time</th>
                    <th>Company</th>
                    <th>Price</th>
                    <th>Volume</th>
                </tr>
            </table>
        `;
        todaysTrade.forEach(data => {
            const newRow = document.createElement('tr');
            newRow.classList.add('todayPriceItem')
            newRow.innerHTML = `
                <td style='text-align: left;'>${data.dt}</td>
                <td style='text-align: left;'>${data.nam}</td>
                <td>${parseFloat(data.ltp).toLocaleString("en-IN")}</td>
                <td>${parseFloat(data.vol).toLocaleString("en-IN")}</td>
            `;
            tableBody.querySelector('tbody').appendChild(newRow);

            newRow.style.backgroundColor = `${data.chng >= 0 ? (data.chng > 0 ? '#04A41E' : '#fff') : '#FE0000'}`
            if(parseFloat(data.chng) !== 0){
                const cells = newRow.getElementsByTagName("td");
                for (let i = 0; i < cells.length; i++) {
                    cells[i].style.color = "#fff"; 
                }
            }
         });
        
    }

    todayTrade()
    renderTradeSearchBox()
    renderTodayTrades()

    document.getElementById('searchTodayPrice').addEventListener('input', async () => {
        const existList = document.querySelectorAll('.todayPriceItem');
        if(existList){
            existList.forEach(item => {
                item.remove();
            });
        } 
        const inputedValue = document.getElementById('searchTodayPrice').value.toLowerCase()
        const tableBody = document.getElementById('todaysTradeBody')
        todaysTrade.forEach(data =>{
            const symbol = data.nam.toLowerCase()
            if(symbol.includes(inputedValue)){
                const newRow = document.createElement('tr');
                newRow.classList.add('todayPriceItem')
                newRow.innerHTML = `
                    <td>${data.dt}</td>
                    <td>${data.nam}</td>
                    <td>${data.ltp}</td>
                    <td>${data.vol}</td>
                `;
                tableBody.querySelector('tbody').appendChild(newRow);
                newRow.style.backgroundColor = `${data.chng >= 0 ? (data.chng > 0 ? '#04A41E' : '#fff') : '#FE0000'}`

                if(parseFloat(data.chng) !== 0){
                    const cells = newRow.getElementsByTagName("td");
                    for (let i = 0; i < cells.length; i++) {
                        cells[i].style.color = "#fff"; 
                    }
                }
            }
        })
    })
    document.getElementById('reloadTodayPrice').addEventListener('click', async () => {
        document.getElementById('searchTodayPrice').value = ''
        todaysTrade = await get_TICKPRICE_()
        renderTodayTrades()
    })
}