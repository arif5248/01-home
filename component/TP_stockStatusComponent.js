async function executeTP_StockStatus(data){
    const fetchedClientDetails = await get_CLIENTDET_()
    let TP_stockStatus
    
    if(fetchedClientDetails.success === true){
        TP_stockStatus = fetchedClientDetails.Stocks
    }
     
    function handleClick(script){
        return function(event){
            removeFooterBtnState();
            route('../component/stockDetailsComponent.js', '../css/stockDetailsComponent.css', 'stockDetails', script)
        }
    }

    function stockStatus(){
        document.getElementById('mainContentSection').innerHTML = `
        <div class="pageHeading" id="financial-Heading" style="flex: 0 auto;">
            <div class="heading">
                <h1>Stock Status </h1>
            </div>
        </div>

        <div class='container' style="flex: 1 auto;height: 100%;overflow-y: auto;">
            <div class="tp_stock_status" id="tp_stock_status"></div>
        </div>
        `
    }

    function renderStockStatus(){
        const tableBody = document.getElementById('tp_stock_status')
        tableBody.innerHTML =
         `
            <table>
                <tr>
                    <th>Company</th>
                    <th>Stock</th>
                    <th>LTP</th>
                    <th>Value</th>
                </tr>
            </table>
        `;
        TP_stockStatus.forEach(data => {
            const newRow = document.createElement('tr');
    
            newRow.innerHTML = `
                <td>${data.Scrip}</td>
                <td>${data.Qt}</td>
                <td>${data.LTP}</td>
                <td>${data.Valu}</td>
            `;
        tableBody.querySelector('tbody').appendChild(newRow);
        newRow.addEventListener('click', handleClick(data.Scrip))
        });
    }
    stockStatus()
    renderStockStatus()
}