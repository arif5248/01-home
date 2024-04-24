async function executeTP_StockStatus(data){
    // const fetchedClientDetails = await get_CLIENTDET_()
    let TP_stockStatus
    const fetchedClientDetails = {
        "success":true,
        "message":"",
        "inv_id":"28",
        "inv_name":null,
        "inv_phn":null,
        "opBalance":131,
        "curBalance":131,
        "blockCash":0,
        "freeCash":131,
        "matureStock":0,
        "usrMargin":0,
        "usrLimit":0,
        "Exch":"CSE",
        "FundIN":"CSE",
        "StockIN":"CSE",
        "Stocks":[
            {
                "Scrip":"AIL",
                "Qt":1,
                "mQt":1,
                "LTP":126.0,
                "Valu":126,
                "Exch":"CSE"
            },
            {
                "Scrip":"APOLOISPAT",
                "Qt":7070,
                "mQt":7070,
                "LTP":4.8,
                "Valu":33936,
                "Exch":"CSE"
            },
            {
                "Scrip":"CONFIDCEM",
                "Qt":2,
                "mQt":2,
                "LTP":71.8,
                "Valu":144,
                "Exch":"CSE"
            },
            {
                "Scrip":"FUWANGFOOD",
                "Qt":2,
                "mQt":2,
                "LTP":30.8,
                "Valu":62,
                "Exch":"CSE"
            },
            {
                "Scrip":"GP",
                "Qt":2,
                "mQt":2,
                "LTP":233.5,
                "Valu":467,
                "Exch":"CSE"
            },
            {
                "Scrip":"KEYACOSMET",
                "Qt":12,
                "mQt":12,
                "LTP":5.2,
                "Valu":62,
                "Exch":"CSE"
            },
            {
                "Scrip":"MAKSONSPIN",
                "Qt":278,
                "mQt":278,
                "LTP":12.7,
                "Valu":3531,
                "Exch":"CSE"
            },
            {
                "Scrip":"SSSTEEL",
                "Qt":292,
                "mQt":292,
                "LTP":12.9,
                "Valu":3767,
                "Exch":"CSE"
            }
        ],
        "OrderBook":[],
        "OrderSumm":[],
        "exch_typ":0
    }
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