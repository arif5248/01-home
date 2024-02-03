function executeTP_todayTrade(){
    const todaysTrade = [
        {
            time: "12:29",
            company: "INDEXAGRO",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            company: "INDEXAGRO",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            company: "INDEXAGRO",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            company: "INDEXAGRO",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            company: "INDEXAGRO",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            company: "INDEXAGRO",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            company: "INDEXAGRO",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            company: "INDEXAGRO",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            company: "INDEXAGRO",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            company: "INDEXAGRO",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            company: "INDEXAGRO",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            company: "INDEXAGRO",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            company: "INDEXAGRO",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            company: "INDEXAGRO",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            company: "INDEXAGRO",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            company: "INDEXAGRO",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            company: "INDEXAGRO",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            company: "INDEXAGRO",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            company: "INDEXAGRO",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            company: "INDEXAGRO",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            company: "INDEXAGRO",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            company: "INDEXAGRO",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            company: "INDEXAGRO",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            company: "INDEXAGRO",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            company: "INDEXAGRO",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            company: "INDEXAGRO",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            company: "INDEXAGRO",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            company: "INDEXAGRO",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            company: "INDEXAGRO",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            company: "INDEXAGRO",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            company: "INDEXAGRO",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            company: "INDEXAGRO",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            company: "INDEXAGRO",
            price: 20,
            volume: 400
        },
    ]

    function todayTrade(){
        document.getElementById('mainContentSection').innerHTML = `
        <div class="pageHeading" id="financial-Heading">
            <div class="heading">
                <h1>TODAY'S ALL PRICE</h1>
            </div>
        </div>

        <div class='container'>
            <div class="tradeSearchBox" id="tradeSearchBox"></div>
        </div>
        
        <div class='container'>
            <div class="todaysTradeBody" id="todaysTradeBody"></div>
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

    function renderTradeSearchBox(){
        document.getElementById('tradeSearchBox').innerHTML = `
        <div class="search">
            <input type="text" name="searchBox" placeholder="Select Script">
        </div>
        <div class="relaod">
            <img src="../images/icons/reload.png" alt="reload" style="width: 30px;">
        </div>
        `
    }

    function renderTodayTrades(){
        var tableBody = document.getElementById('todaysTradeBody')
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
    
            newRow.innerHTML = `
                <td>${data.time}</td>
                <td>${data.company}</td>
                <td>${data.price}</td>
                <td>${data.volume}</td>
            `;
        tableBody.querySelector('tbody').appendChild(newRow);
        });
    }

    todayTrade()
    renderTradeSearchBox()
    renderTodayTrades()
}