function executechildID_Details(){ 
    const childIdDataDetails = [
        {
            company: "EPGL",
            qty:10,
            ltp:34.70,
            stock_Value:347
        },
        {
            company: "KPL",
            qty:34,
            ltp:42.10,
            stock_Value:1431.4
        }
    ]

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
                    <td>347</td>
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

        childIdDataDetails.forEach((data, index)=>{
            const sl = index + 1;
            const newRow = document.createElement('tr')
            newRow.innerHTML=`
                <td>${sl}</td>
                <td>${data.company}</td>
                <td>${data.qty}</td>
                <td>${data.ltp}</td>
                <td>${data.stock_Value}</td>
            `
            allStockBody.querySelector('tbody').appendChild(newRow)
        })

    }


    childID_Details()
    renderChildDetails()
    
}

