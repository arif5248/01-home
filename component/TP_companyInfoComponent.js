function executeTP_CompanyInfo(){
    const financeInfo = [
        {
            period: "Half Yearly Report ( July,2020 To December,2020 )",
            Turnover: 53.36,
            net_profit: 7.03,
            nav: 36.20,
            eps: 1.25
        },
        {
            period: "First Quarter Report ( July,2020 To September,2020 )",
            Turnover: 28.62,
            net_profit: 4.39,
            nav: 36.73,
            eps: 0.78
        },
        {
            period: "July,2019 To June,2020 )",
            Turnover: 97.21,
            net_profit: 17.94,
            nav: 35.95,
            eps: 3.19
        },
        {
            period: "July,2019 To June,2020 )",
            Turnover: 97.21,
            net_profit: 17.94,
            nav: 35.95,
            eps: 3.19
        },
        {
            period: "July,2019 To June,2020 )",
            Turnover: 97.21,
            net_profit: 17.94,
            nav: 35.95,
            eps: 3.19
        },
        {
            period: "July,2019 To June,2020 )",
            Turnover: 97.21,
            net_profit: 17.94,
            nav: 35.95,
            eps: 3.19
        },
        {
            period: "July,2019 To June,2020 )",
            Turnover: 97.21,
            net_profit: 17.94,
            nav: 35.95,
            eps: 3.19
        },
    ]
    const dividendRecord = [
        {
            record: "12/Sep/2023",
            agm: "04/Oct/2023",
            dividend: "11% Cash",
            year: 2023
        },
        {
            record: "12/Sep/2023",
            agm: "04/Oct/2023",
            dividend: "11% Cash",
            year: 2023
        },
        {
            record: "12/Sep/2023",
            agm: "04/Oct/2023",
            dividend: "11% Cash",
            year: 2023
        },
        {
            record: "12/Sep/2023",
            agm: "04/Oct/2023",
            dividend: "11% Cash",
            year: 2023
        },
        {
            record: "12/Sep/2023",
            agm: "04/Oct/2023",
            dividend: "11% Cash",
            year: 2023
        },
        {
            record: "12/Sep/2023",
            agm: "04/Oct/2023",
            dividend: "11% Cash",
            year: 2023
        },
        {
            record: "12/Sep/2023",
            agm: "04/Oct/2023",
            dividend: "11% Cash",
            year: 2023
        },
        {
            record: "12/Sep/2023",
            agm: "04/Oct/2023",
            dividend: "11% Cash",
            year: 2023
        },
        {
            record: "12/Sep/2023",
            agm: "04/Oct/2023",
            dividend: "11% Cash",
            year: 2023
        }
    ]
    const closingPrice = [
        {
            trade_date: "15/Jan/2024",
            closing_price: "52.60",
            change: -0.90,
            volume: 2016
        },
        {
            trade_date: "15/Jan/2024",
            closing_price: "52.60",
            change: 0.90,
            volume: 2016
        },
        {
            trade_date: "15/Jan/2024",
            closing_price: "52.60",
            change: 0.90,
            volume: 2016
        },
        {
            trade_date: "15/Jan/2024",
            closing_price: "52.60",
            change: 0.00,
            volume: 2016
        },
        {
            trade_date: "15/Jan/2024",
            closing_price: "52.60",
            change: -0.90,
            volume: 2016
        },
        {
            trade_date: "15/Jan/2024",
            closing_price: "52.60",
            change: 0.90,
            volume: 2016
        },
        {
            trade_date: "15/Jan/2024",
            closing_price: "52.60",
            change: -0.90,
            volume: 2016
        }
    ]


  
    function companyInfo(){
        document.getElementById('mainContentSection').innerHTML =`
            <div class="pageHeading" id="financial-Heading">
                <div class="heading">
                    <h1>Company Info</h1>
                </div>
            </div>

            <div class="container">
                <div class='box basic_info' id='basic_info'>
                    <div class="heading_box">
                        <h5>Basic Information</h5>
                        <div class="drop-box">
                            <img onclick="show_details('basic-more','basic-up','basic-down')" id="basic-down" src="../images/icons/down-arrow.png" alt="Down Arrow">
                            <img onclick="hide_details('basic-up','basic-down')" id="basic-up" src="../images/icons/down-arrow.png" alt="Down UP">
                        </div>
                    </div>
                    <div class="box-more" id="basic-more"></div>
                </div>
            </div>

            <div class="container">
                <div class='box financial' id='financial'>
                    <div class="heading_box">
                        <h5>Financial Pereformance</h5>
                        <div class="drop-box">
                            <img onclick="show_details('finance-more','finance-up','finance-down')" id="finance-down" src="../images/icons/down-arrow.png" alt="Down Arrow">
                            <img onclick="hide_details('finance-up','finance-down')" id="finance-up" src="../images/icons/down-arrow.png" alt="Down UP">
                        </div>
                    </div>
                    <div class="box-more" id="finance-more"></div>
                </div>
            </div>

            <div class="container">
                <div class='box dividend' id='dividend'>
                    <div class="heading_box">
                        <h5>Dividend Record Date & AGM</h5>
                        <div class="drop-box">
                            <img onclick="show_details('dividend-more','dividend-up','dividend-down')" id="dividend-down" src="../images/icons/down-arrow.png" alt="Down Arrow">
                            <img onclick="hide_details('dividend-up','dividend-down')" id="dividend-up" src="../images/icons/down-arrow.png" alt="Down UP">
                        </div>
                    </div>
                    <div class="box-more" id="dividend-more"></div>
                </div>
            </div>

            <div class="container">
                <div class='box price_his' id='price_his'>
                    <div class="heading_box">
                        <h5>Closing Price History</h5>
                        <div class="drop-box">
                            <img onclick="show_details('priceHistory-more','price_his-up','price_his-down')" id="price_his-down" src="../images/icons/down-arrow.png" alt="Down Arrow">
                            <img onclick="hide_details('price_his-up','price_his-down')" id="price_his-up" src="../images/icons/down-arrow.png" alt="Down UP">
                        </div>
                    </div>
                    <div class="box-more" id="priceHistory-more"></div>
                </div>
            </div>

            <div class="container">
                <div class='box price_graph' id='price_grraph'>
                    <div class="heading_box">
                        <h5>Closing Price Graph</h5>
                        <div class="drop-box">
                            <img onclick="show_details('priceGraph-more','price_graph-up','price_graph-down')" id="price_graph-down" src="../images/icons/down-arrow.png" alt="Down Arrow">
                            <img onclick="hide_details('price_graph-up','price_graph-down')" id="price_graph-up" src="../images/icons/down-arrow.png" alt="Down UP">
                        </div>
                    </div>
                    <div class="box-more" id="priceGraph-more"></div>
                </div>
            </div>
            <br>  
            <br>  
            <br>  
            <br>  
            <br>  
            <br>  
            <br>  
        `
    }

    function renderBasicInfo(){
        document.getElementById('basic-more').innerHTML = `
            <table class="table table-bordered">
                <tbody>
                    <tr>
                        <td>Paid-up Capital</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>No. of Issued Shares</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Category</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Sector</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Face Value</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Year End</td>
                        <td></td>
                    </tr>

                </tbody>
            </table>
        `
    }

    function renderFinance() {
        const tableBody = document.getElementById('finance-more');
        tableBody.innerHTML =
         `
            <table>
                <tr>
                    <th>Period</th>
                    <th>Turnover<br>(Tk in<br>Cr)</th>
                    <th>Net<br>Profit(Tk<br>in Cr)</th>
                    <th>NAV</th>
                    <th>EPS</th>
                </tr>
            </table>
        `;
    
        financeInfo.forEach(finance => {
            const newRow = document.createElement('tr');
    
            newRow.innerHTML = `
                <td>${finance.period}</td>
                <td>${finance.Turnover}</td>
                <td>${finance.net_profit}</td>
                <td>${finance.nav}</td>
                <td>${finance.eps}</td>
            `;
        tableBody.querySelector('tbody').appendChild(newRow);
        });
    
    }

    function renderDividendRecord() {
        const tableBody = document.getElementById('dividend-more');
        tableBody.innerHTML =
         `
            <table>
                <tr>
                    <th>Record</th>
                    <th>AGM</th>
                    <th>Dividend</th>
                    <th>Year</th>
                </tr>
            </table>
        `;
    
        dividendRecord.forEach(dividend => {
            const newRow = document.createElement('tr');
    
            newRow.innerHTML = `
                <td>${dividend.record}</td>
                <td>${dividend.agm}</td>
                <td>${dividend.dividend}</td>
                <td>${dividend.year}</td>
            `;
        tableBody.querySelector('tbody').appendChild(newRow);
        });
    
    }

    function renderClosingPrice() {
        const tableBody = document.getElementById('priceHistory-more');
        tableBody.innerHTML =
         `
            <div class="companyInfoBox">
                <div class="companyHeaderBox">
                    <h3>AAMRANET</h3>
                    <h3>54.10</h3>
                </div>
                <div class="companyCategoryBox">
                    <p>aamra network limited ( A category )</p>
                </div>
                <div class="price_up_down">
                    <p>Total Up: 12</p>
                    <p>Total Down: 12</p>
                    <p>No Change: 7</p>
                </div>
            </div>
            <table>
                <tr>
                    <th>Trade Date</th>
                    <th>Closing<br>Price</th>
                    <th>Change</th>
                    <th>Volume</th>
                </tr>
            </table>
        `;
    
        closingPrice.forEach(price => {
            const newRow = document.createElement('tr');
    
            newRow.innerHTML = `
                <td>${price.trade_date}</td>
                <td>${price.closing_price}</td>
                <td>${price.change}</td>
                <td>${price.volume}</td>
            `;

            if (parseFloat(price.change) < 0) {
                newRow.classList.add('negative-change');
            }
            if (parseFloat(price.change) > 0) {
                newRow.classList.add('positive-change');
            }
            tableBody.querySelector('tbody').appendChild(newRow);
        });
    
    }



    function dropDown(){
        document.getElementById('basic-up').style.display = 'none'
        document.getElementById('finance-up').style.display = 'none'
        document.getElementById('dividend-up').style.display = 'none'
        document.getElementById('price_his-up').style.display = 'none'
        document.getElementById('price_graph-up').style.display = 'none'
    }
    function hide_All_details(){
        document.getElementById('basic-more').style.display = 'none'
        document.getElementById('finance-more').style.display = 'none'
        document.getElementById('dividend-more').style.display = 'none'
        document.getElementById('priceHistory-more').style.display = 'none'
        document.getElementById('priceGraph-more').style.display = 'none'
    }
    
    companyInfo()
    dropDown()
    renderBasicInfo()
    renderFinance()
    renderDividendRecord()
    renderClosingPrice()

    hide_All_details()
}

function show_details(id,up,down){
    document.getElementById('basic-more').style.display = 'none'
    document.getElementById('finance-more').style.display = 'none'
    document.getElementById('dividend-more').style.display = 'none'
    document.getElementById('priceHistory-more').style.display = 'none'
    document.getElementById('priceGraph-more').style.display = 'none'

    document.getElementById(id).style.display = 'block'

    document.getElementById('basic-up').style.display = 'none'
    document.getElementById('finance-up').style.display = 'none'
    document.getElementById('dividend-up').style.display = 'none'
    document.getElementById('price_his-up').style.display = 'none'
    document.getElementById('price_graph-up').style.display = 'none'

    document.getElementById('basic-down').style.display = 'block'
    document.getElementById('finance-down').style.display = 'block'
    document.getElementById('dividend-down').style.display = 'block'
    document.getElementById('price_his-down').style.display = 'block'
    document.getElementById('price_graph-down').style.display = 'block'

    
    document.getElementById(down).style.display = 'none'

    document.getElementById(up).style.display = 'block'
}
function hide_details(up,down){
    document.getElementById('basic-more').style.display = 'none'
    document.getElementById('finance-more').style.display = 'none'
    document.getElementById('dividend-more').style.display = 'none'
    document.getElementById('priceHistory-more').style.display = 'none'
    document.getElementById('priceGraph-more').style.display = 'none'

    document.getElementById(down).style.display = 'block'
    document.getElementById(up).style.display = 'none'
}