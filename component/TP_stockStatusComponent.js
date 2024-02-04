function executeTP_StockStatus(){

    const TP_stockStatus = [
        {
            company: "INDEXAGRO",
            stock: 20,
            ltp: 400,
            value: 400,
        },
        {
            company: "INDEXAGRO",
            stock: 20,
            ltp: 400,
            value: 400,
        },
        {
            company: "INDEXAGRO",
            stock: 20,
            ltp: 400,
            value: 400,
        },
        {
            company: "INDEXAGRO",
            stock: 20,
            ltp: 400,
            value: 400,
        },
        {
            company: "INDEXAGRO",
            stock: 20,
            ltp: 400,
            value: 400,
        },
        {
            company: "INDEXAGRO",
            stock: 20,
            ltp: 400,
            value: 400,
        },
        {
            company: "INDEXAGRO",
            stock: 20,
            ltp: 400,
            value: 400,
        },
        {
            company: "INDEXAGRO",
            stock: 20,
            ltp: 400,
            value: 400,
        },
        {
            company: "INDEXAGRO",
            stock: 20,
            ltp: 400,
            value: 400,
        },
        {
            company: "INDEXAGRO",
            stock: 20,
            ltp: 400,
            value: 400,
        },
        {
            company: "INDEXAGRO",
            stock: 20,
            ltp: 400,
            value: 400,
        },
        {
            company: "INDEXAGRO",
            stock: 20,
            ltp: 400,
            value: 400,
        },
        {
            company: "INDEXAGRO",
            stock: 20,
            ltp: 400,
            value: 400,
        },
        {
            company: "INDEXAGRO",
            stock: 20,
            ltp: 400,
            value: 400,
        },
        {
            company: "INDEXAGRO",
            stock: 20,
            ltp: 400,
            value: 400,
        },
        {
            company: "INDEXAGRO",
            stock: 20,
            ltp: 400,
            value: 400,
        },
        {
            company: "INDEXAGRO",
            stock: 20,
            ltp: 400,
            value: 400,
        },

    ]

    function stockStatus(){
        document.getElementById('mainContentSection').innerHTML = `
        <div class="pageHeading" id="financial-Heading">
            <div class="heading">
                <h1>Stock Status </h1>
            </div>
        </div>

        <div class='container'>
            <div class="tp_stock_status" id="tp_stock_status"></div>
        </div>
        <br>
        <br>
        <br>
        <br>
        
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
                <td>${data.company}</td>
                <td>${data.stock}</td>
                <td>${data.ltp}</td>
                <td>${data.value}</td>
            `;
        tableBody.querySelector('tbody').appendChild(newRow);
        });
    }
    stockStatus()
    renderStockStatus()
}