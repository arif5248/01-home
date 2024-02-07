function executeTP_lastTrade(){
    const lastTrade = [
        {
            time: "12:29",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            price: 20,
            volume: 400
        },
        {
            time: "12:29",
            price: 20,
            volume: 400
        },
    ]

    function todayTrade(){
        document.getElementById('mainContentSection').innerHTML = `
        <div class="pageHeading" id="financial-Heading">
            <div class="heading">
                <h1>LAST TRADE:</h1>
            </div>
        </div>
        
        <div class='container'>
            <div class="lastTradeBody" id="lastTradeBody"></div>
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
                <td>${data.time}</td>
                <td>${data.price}</td>
                <td>${data.volume}</td>
            `;
        tableBody.querySelector('tbody').appendChild(newRow);
        });
    }

    todayTrade()
    renderTodayTrades()
}