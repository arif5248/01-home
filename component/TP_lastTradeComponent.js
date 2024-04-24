async function executeTP_lastTrade(data){
    const fetchedScriptInfo = await get_SCRIPINFO_(data)
    const lastTrade = fetchedScriptInfo.prclisti


    function todayTrade(){
        document.getElementById('mainContentSection').innerHTML = `
            <div class="pageHeading" id="financial-Heading" style="flex: 0 auto;">
                <div class="heading">
                    <h1>LAST TRADE: ${data}</h1>
                </div>
            </div>
            
            <div class='container' style="flex: 1 auto;height: 100%;overflow-y: auto;">
                <div class="lastTradeBody" id="lastTradeBody"></div>
            </div>
        `
    }


    function renderTodayTrades(){
        const tableBody = document.getElementById('lastTradeBody')
        tableBody.innerHTML =
         `
            <table>
                <tr>
                    <th>Time</th>
                    <th>Price</th>
                    <th>Volume</th>
                </tr>
            </table>
        `;
        lastTrade.forEach(data => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${data.Dt}</td>
                <td>${data.CP}</td>
                <td>${data.CVol}</td>
            `;
        tableBody.querySelector('tbody').appendChild(newRow);
        newRow.style.backgroundColor = `${data.Chng >= 0 ? (data.Chng > 0 ? '#04A41E' : '#fff') : '#FE0000' }`
        });
    }

    todayTrade()
    renderTodayTrades()
}