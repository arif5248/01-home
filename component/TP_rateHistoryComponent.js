function executeTP_rateHistory(){

    const rateHistoryData = [
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

    function rateHistory(){
        document.getElementById('mainContentSection').innerHTML = `
        <div class="pageHeading" id="financial-Heading">
            <div class="heading">
                <h1>Price History: (---) </h1>
            </div>
        </div>

        <div class='container'>
            <div class="tp_rate_history" id="tp_rate_history"></div>
        </div>
        <br>
        <br>
        <br>
        <br>
        
        `
    }

    function renderRateHistory(){
        const tableBody = document.getElementById('tp_rate_history')
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
        rateHistoryData.forEach(data => {
            const newRow = document.createElement('tr');
    
            newRow.innerHTML = `
                <td>${data.time}</td>
                <td>${data.price}</td>
                <td>${data.volume}</td>
            `;
        tableBody.querySelector('tbody').appendChild(newRow);
        });
    }
    rateHistory()
    renderRateHistory()
}