async function executechildID_Details(data){ 
    let childIdDataDetails = []
    const fetchedChildIdStocks = await getChildIdStocks(data)
    if(fetchedChildIdStocks.status === true){
        childIdDataDetails = fetchedChildIdStocks.Data
    }
    

    function childID_Details(){
        document.getElementById('mainContentSection').innerHTML = 
        `
            <div class="pageHeading" id="financial-Heading">
                <div class="heading">
                    <h1>Child ID Details</h1>
                </div>
            </div>

            <div class="container">
                <div class="total_stock" id="total_stock"></div>
            </div>

            <div class="container">
                <div class="allStock" id="allStock"></div>
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

    function renderChildDetails(){
        document.getElementById('total_stock').innerHTML=`
        <table class="table table-bordered">
            <tbody>
                <tr>
                    <td>Total Stock Value</td>
                    <td>${fetchedChildIdStocks.status === true ? fetchedChildIdStocks.totalStockVal : ''}</td>
                </tr>
            </tbody
        </table>
        `

        const allStockBody = document.getElementById('allStock')
        allStockBody.innerHTML=`
        <table >
            <tbody>
                <tr>
                    <th>Sl</th>
                    <th>Company</th>
                    <th>Qty</th>
                    <th>Ltp</th>
                    <th>Stock<br>Value</th>
                </tr>
            </tbody
        </table>
        `

        childIdDataDetails.forEach((data)=>{
            const newRow = document.createElement('tr')
            newRow.innerHTML=`
                <td>${data.Sl}</td>
                <td>${data.CompanyID}</td>
                <td>${data.Quantity}</td>
                <td>${data.LTP}</td>
                <td>${data.StockValue}</td>
            `
            allStockBody.querySelector('tbody').appendChild(newRow)
            newRow.style.backgroundColor = data.GainLoss >= 0 ? (data.GainLoss > 0 ? '#04A41E' : '#fff') : '#FE0000'
        })

    }


    childID_Details()
    renderChildDetails()
    
}

