async function executePriceHistory(script){
    let closingPrice = []
    let totalUp = 0;
    let totalDown = 0;
    let noChange =0;

    const fetchedClosePriceHistory =await getClosePriceHistory(script)
    console.log(fetchedClosePriceHistory)
    if(fetchedClosePriceHistory.status === true){
        closingPrice = fetchedClosePriceHistory.Data
    }
    function priceHistory(){
        document.getElementById('mainContentSection').innerHTML = `
        <div class="pageHeading" id="financial-Heading">
            <div class="heading">
                <h1>Price History</h1>
            </div>
        </div>
        <div style='margin-top: 5px' class='priceHisSummarySection'>
            <div class="container">
                <div id='priceHisSummary'></div>
            </div>
        </div>
        <div style='margin-top: 5px; flex: 1 auto; overflow-y: auto;' class='priceHisTableSection'>
            <div class="container">
                <div id='priceHisTable'></div>
            </div>
        </div>
        
        `
    }

    function renderPriceHisSummary(){
        document.getElementById('priceHisSummary').innerHTML=`
        <div class="companyHeaderBox">
            <h3>${script}</h3>
            <h3>${fetchedClosePriceHistory.status === true ? fetchedClosePriceHistory.ltp : ''}</h3>
        </div>
        <div class="companyCategoryBox">
            <p>${fetchedClosePriceHistory.status === true ? fetchedClosePriceHistory.fname+'('+fetchedClosePriceHistory.cat+')' : ''}</p>
        </div>
        <div class="price_up_down">
            <p>totalUp : ${totalUp} </p>
            <p>totalDown : ${totalDown}</p>
            <p>noChange : ${noChange}</p>
        </div>
        `
    }
    function renderPriceHisTable(){
        const tableContent = document.getElementById('priceHisTable')
        tableContent.innerHTML = `
        <table>
            <tbody>
                <tr>
                    <th>Trade Date</th>
                    <th>Closing<br>Price</th>
                    <th>Change</th>
                    <th>Volume</th>
                </tr>
            </tbody>
        </table>
        `
        closingPrice.reverse()
        closingPrice.forEach(price => {
            const newRow = document.createElement('tr');
    
            newRow.innerHTML = `
                <td>${price.td_date}</td>
                <td>${price.cl_pr}</td>
                <td>${price.change}</td>
                <td>${price.vol}</td>
            `;

            if (parseFloat(price.change) < 0) {
                newRow.classList.add('negative-change');
                totalDown -= 1
            }
            else if (parseFloat(price.change) > 0) {
                newRow.classList.add('positive-change');
                totalUp += 1
            }else{
                noChange += 1
            }
            tableContent.querySelector('tbody').appendChild(newRow);
        });
    }
    priceHistory()
    renderPriceHisTable()
    renderPriceHisSummary()
}