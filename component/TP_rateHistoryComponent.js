async function executeTP_rateHistory(data){
    const fetchedScriptInfo = await get_SCRIPINFO_(data)
    const rateHistoryData = fetchedScriptInfo.prclist

    function rateHistory(){
        document.getElementById('mainContentSection').innerHTML = `
        <div class="pageHeading" id="financial-Heading" style="flex: 0 auto;">
            <div class="heading">
                <h1>Price History: ${data}</h1>
            </div>
        </div>

        <div class='container' style="flex: 1 auto;height: 100%;overflow-y: auto;">
            <div class="tp_rate_history" id="tp_rate_history"></div>
        </div>
        
        `
    }

    function renderRateHistory(){
        const tableBody = document.getElementById('tp_rate_history')
        tableBody.innerHTML =
         `
            <table>
                <tr>
                    <th>Date</th>
                    <th>Price</th>
                    <th>Volume</th>
                </tr>
            </table>
        `;
        rateHistoryData.forEach(data => {
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
    rateHistory()
    renderRateHistory()
}