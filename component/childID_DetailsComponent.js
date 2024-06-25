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

            <div style='margin-bottom: 5px;' class="container">
                <div class="total_stock" id="total_stock"></div>
            </div>

            <div onscroll="resetLogoutTimer()" onscroll="resetLogoutTimer()" class="container" style="flex: 1 auto;overflow-y: auto;">
                <div class="allStock" id="allStock"></div>
            </div>
        `
    }

    function renderChildDetails(){
        document.getElementById('total_stock').innerHTML=`
        <table class="table table-bordered">
            <tbody>
                <tr>
                    <td>Total Stock Value</td>
                    <td style='text-align: right;'>${fetchedChildIdStocks.status === true ? fetchedChildIdStocks.totalStockVal : ''}</td>
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
                    <th>Stock Qty</th>
                    <th>Last Price</th>
                    <th>Stock Value</th>
                </tr>
            </tbody
        </table>
        `

        childIdDataDetails.forEach((data)=>{
            const newRow = document.createElement('tr')
            newRow.innerHTML=`
                <td style='text-align: left;'>${data.Sl}</td>
                <td style='text-align: left;'>${data.CompanyID}</td>
                <td>${data.Quantity}</td>
                <td>${data.LTP}</td>
                <td style="text-align:right">${data.StockValue}</td>
            `
            allStockBody.querySelector('tbody').appendChild(newRow)
            newRow.style.backgroundColor = data.GainLoss >= 0 ? (data.GainLoss > 0 ? '#04A41E' : '#fff') : '#FE0000'
            if(parseFloat(data.GainLoss) !== 0){
                const cells = newRow.getElementsByTagName("td");
                for (let i = 0; i < cells.length; i++) {
                    cells[i].style.color = "#fff"; 
                }
            }
        })

    }


    childID_Details()
    renderChildDetails()
    
}

