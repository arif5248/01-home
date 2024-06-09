async function executeCompanyInfo(data){
    const fetchedData = await getCompanyList()
    let companyList =[]
    
    if(fetchedData.status === true){
        companyList = fetchedData.Data
    }
     
    let basicInfoData = []
    let financeInfo = []
    let dividendRecord = []
    let closingPrice = []
    let priceData = []
    let tempDayData = []

    async function handleListItemClick(event) {
        let companyName
        if(event){
            companyName = event.target.textContent ;
        }
        if(companyName === undefined && data){
            companyName = data
        }
        
        const allCompanyList = document.getElementById('allCompanyList');
        allCompanyList.innerHTML = '';
        allCompanyList.style.display = 'none'
        document.getElementById('searchCompany').value = companyName

        const fetchedCompanyInfoData = await getCompanyInfo(companyName)
        if (fetchedCompanyInfoData.status === true){
            basicInfoData = fetchedCompanyInfoData.BasicData[0]
            financeInfo = fetchedCompanyInfoData.FinancialPerformanceData
            dividendRecord = fetchedCompanyInfoData.RDAgmDividendData
            closingPrice = fetchedCompanyInfoData.ClosingPriceData
            priceData = fetchedCompanyInfoData.PriceData[0]
            if(basicInfoData){
                renderBasicInfo()
            }
            if(financeInfo){
                renderFinance()
            }
            if(dividendRecord){
                renderDividendRecord()
            }
            if(closingPrice && priceData && basicInfoData){
                renderClosingPrice(companyName)
            }
            document.getElementById('basic-more').style.display = 'block'
            document.getElementById('basic-up').style.display = 'block'
            document.getElementById('basic-down').style.display = 'none'

        }
        const fetched365ClosingPriceData = await getGraphdata(companyName, 365)
        if(fetched365ClosingPriceData.status === true){
            tempDayData = []
            fetched365ClosingPriceData.ClosingPriceData.forEach(item => {
                const { TradeDate, ClosingPrice } = item;
                let obj ={
                    time: TradeDate.toString(),
                    value: Number(ClosingPrice)
                }
                
                tempDayData.push(obj)
            })
           // renderPriceGraph(tempDayData)
        }
        
    }

    function companyInfo(){
        document.getElementById('mainContentSection').innerHTML =`
            <div class="pageHeading" id="financial-Heading">
                <div class="heading">
                    <h1>Listed Company Info</h1>
                </div>
            </div>

            <div class= 'container' style="position: relative;">
                <div class="search-reload" id="search-reload">
                    <input id='searchCompany' type="text" class="form-control" placeholder="Select Company" aria-label="Search" aria-describedby="searchIcon">                
                    <div class="reload" onclick="removeFooterBtnState(); route('../component/companyInfoComponent.js','../css/companyInfoComponent.css', 'companyInfo')">
                        <img style='width:35px' src="../images/icons/reload.png" alt="Reload">
                    </div>
                </div>
                <div class= 'container' style="position: absolute;z-index: 1;padding-left:0px;">
                    <ul style='display: none' class='allCompanyList' id='allCompanyList'></ul>
                </div>
            </div>

            

            <div class="container">
                <div class='box basic_info' id='basic_info'>
                    <div class="heading_box">
                        <h5>Basic Information</h5>
                        <div class="drop-box">
                            <img style='width:25px' onclick="show_details('basic-more','basic-up','basic-down')" id="basic-down" src="../images/icons/down-arrow.png" alt="Down Arrow">
                            <img style='width:25px' onclick="hide_details('basic-up','basic-down')" id="basic-up" src="../images/icons/down-arrow.png" alt="Down UP">
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
                            <img style='width:25px' onclick="show_details('finance-more','finance-up','finance-down')" id="finance-down" src="../images/icons/down-arrow.png" alt="Down Arrow">
                            <img style='width:25px' onclick="hide_details('finance-up','finance-down')" id="finance-up" src="../images/icons/down-arrow.png" alt="Down UP">
                        </div>
                    </div>
                    <div onscroll="resetLogoutTimer()" class="box-more" id="finance-more"></div>
                </div>
            </div>

            <div class="container">
                <div class='box dividend' id='dividend'>
                    <div class="heading_box">
                        <h5>Dividend Record Date & AGM</h5>
                        <div class="drop-box">
                            <img style='width:25px' onclick="show_details('dividend-more','dividend-up','dividend-down')" id="dividend-down" src="../images/icons/down-arrow.png" alt="Down Arrow">
                            <img style='width:25px' onclick="hide_details('dividend-up','dividend-down')" id="dividend-up" src="../images/icons/down-arrow.png" alt="Down UP">
                        </div>
                    </div>
                    <div onscroll="resetLogoutTimer()" class="box-more" id="dividend-more"></div>
                </div>
            </div>

            <div class="container">
                <div class='box price_his' id='price_his'>
                    <div class="heading_box">
                        <h5>Closing Price History</h5>
                        <div class="drop-box">
                            <img style='width:25px' onclick="show_details('priceHistory-more','price_his-up','price_his-down')" id="price_his-down" src="../images/icons/down-arrow.png" alt="Down Arrow">
                            <img style='width:25px' onclick="hide_details('price_his-up','price_his-down')" id="price_his-up" src="../images/icons/down-arrow.png" alt="Down UP">
                        </div>
                    </div>
                    <div onscroll="resetLogoutTimer()" class="box-more" id="priceHistory-more"></div>
                </div>
            </div>

            <div class="container" style='flex: 1 auto;display:none'>
                <div class='box price_graph' id='price_grraph'>
                    <div class="heading_box">
                        <h5>Closing Price Graph</h5>
                        <div class="drop-box">
                            <img style='width:25px' onclick="show_details('priceGraph-more','price_graph-up','price_graph-down')" id="price_graph-down" src="../images/icons/down-arrow.png" alt="Down Arrow">
                            <img style='width:25px' onclick="hide_details('price_graph-up','price_graph-down')" id="price_graph-up" src="../images/icons/down-arrow.png" alt="Down UP">
                        </div>
                    </div>
                    <div onscroll="resetLogoutTimer()" class="box-more" id="priceGraph-more">
                        <div id="myChart"></div>
                    </div>
                </div>
            </div>
             
        `
    }

    function renderBasicInfo(){
        document.getElementById('basic-more').innerHTML = `
            <table class="basicInfoTable table table-bordered">
                <tbody>
                    <tr>
                        <td>Paid-up Capital</td>
                        <td>${basicInfoData.paidup_cap ? basicInfoData.paidup_cap : ''}</td>
                    </tr>
                    <tr>
                        <td>No. of Issued Shares</td>
                        <td>${basicInfoData.no_of_shares ? basicInfoData.no_of_shares : ''}</td>
                    </tr>
                    <tr>
                        <td>Category</td>
                        <td>${basicInfoData.cdbl_cat ? basicInfoData.cdbl_cat : ''}</td>
                    </tr>
                    <tr>
                        <td>Sector</td>
                        <td>${basicInfoData.sector ? basicInfoData.sector : ''}</td>
                    </tr>
                    <tr>
                        <td>Face Value</td>
                        <td>${basicInfoData.face_value ? basicInfoData.face_value : ''}</td>
                    </tr>
                    <tr>
                        <td>Year End</td>
                        <td>${basicInfoData.year_end ? basicInfoData.year_end : ''}</td>
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
                    <th>Turnover (Cr.)</th>
                    <th>Net Profit (Cr.)</th>
                    <th>NAV</th>
                    <th>EPS</th>
                </tr>
            </table>
        `;
    
        financeInfo.forEach(finance => {
            const newRow = document.createElement('tr');
    
            newRow.innerHTML = `
            <td>${finance.Period}</td>
            <td>${parseFloat(finance["Turnover (Tk in Cr.)"]).toLocaleString("en-IN")}</td>
            <td>${parseFloat(finance["Net Profit (Tk in Cr.)"]).toLocaleString("en-IN")}</td>
            <td>${parseFloat(finance.NAV).toLocaleString("en-IN")}</td>
            <td>${parseFloat(finance.EPS).toLocaleString("en-IN")}</td>
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
                    <th style="text-align:right">Year</th>
                </tr>
            </table>
        `;
    
        dividendRecord.forEach(dividend => {
            const newRow = document.createElement('tr');
    
            newRow.innerHTML = `
                <td>${dividend["Record Date"]}</td>
                <td>${dividend.AGM}</td>
                <td>${dividend.Dividend}</td>
                <td style="text-align:right">${dividend.DividendYear}</td>
            `;
        tableBody.querySelector('tbody').appendChild(newRow);
        });
    
    }

    function renderClosingPrice(companyName) {
        let totalUp = 0;
        let totalDown = 0;
        let noChange =0;

        closingPrice.forEach(count => {
            if (parseFloat(count.Change) < 0) {
                totalDown = totalDown + 1
            }
            else if (parseFloat(count.Change) > 0) {
                totalUp = totalUp + 1
            }
            else{
                noChange =noChange + 1
            }
        })
        
        const tableBody = document.getElementById('priceHistory-more');
        tableBody.innerHTML =
         `
            <div class="companyInfoBox border">
                <div class="companyHeaderBox">
                    <h3>${companyName ? companyName : ''}</h3>
                    <h3>${priceData.cp ? priceData.cp : ''}</h3>
                </div>
                <div class="companyCategoryBox">
                    <p>${priceData.name ? priceData.name : ''}  ${basicInfoData.cdbl_cat ? '('+basicInfoData.cdbl_cat+' Category)' : ''}</p>
                </div>
                <div class="price_up_down" style="font-size:12px">
                    <p> ${companyName ? 'Total Up: '+totalUp : ''} </p>
                    <p>${companyName ? 'Total Down: '+totalDown : ''}</p>
                    <p>${companyName ? 'No Change: '+noChange : ''}</p>
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
        closingPrice.reverse()
        closingPrice.forEach(price => {
            const newRow = document.createElement('tr');
    
            newRow.innerHTML = `
                <td>${price["Trade Date"]}</td>
                <td>${price["Closing Price"]}</td>
                <td>${price.Change}</td>
                <td>${price.Volume}</td>
            `;

            if (parseFloat(price.Change) < 0) {
                newRow.classList.add('negative-change');
            }
            else if (parseFloat(price.Change) > 0) {
                newRow.classList.add('positive-change');
            }
            if(parseFloat(price.Change) !== 0){
                const cells = newRow.getElementsByTagName("td");
                for (let i = 0; i < cells.length; i++) {
                    cells[i].style.color = "#fff"; 
                }
            }
            tableBody.querySelector('tbody').appendChild(newRow);
        });
    
    }

    function renderPriceGraph(tempDayData){
        function createSimpleSwitcher(items, activeItem, activeItemChangedCallback) {
            let switcherElement = document.createElement('div');
            switcherElement.classList.add('switcher');
        
            let intervalElements = items.map(function(item) {
                let itemEl = document.createElement('button');
                itemEl.innerText = item;
                itemEl.classList.add('switcher-item');
                itemEl.classList.toggle('switcher-active-item', item === activeItem);
                itemEl.addEventListener('click', function() {
                    onItemClicked(item);
                });
                switcherElement.appendChild(itemEl);
                return itemEl;
            });
        
            function onItemClicked(item) {
                if (item === activeItem) {
                    return;
                }
        
                intervalElements.forEach(function(element, index) {
                    element.classList.toggle('switcher-active-item', items[index] === item);
                });
        
                activeItem = item;
        
                activeItemChangedCallback(item);
            }
        
            return switcherElement;
        }
        
        let intervals = ['1D', '1W', '1M', '1Y'];
        
        
       let dayData = tempDayData ? tempDayData : []
        
        let weekData = [
            { time: '2016-07-18', value: 26.10 },
            { time: '2016-07-25', value: 26.19 },
            { time: '2016-08-01', value: 26.24 },
            { time: '2016-08-08', value: 26.22 },
            { time: '2016-08-15', value: 25.98 },
            { time: '2016-08-22', value: 25.85 },
            { time: '2016-08-29', value: 25.98 },
            { time: '2016-09-05', value: 25.71 },
            { time: '2016-09-12', value: 25.84 },
            { time: '2016-09-19', value: 25.89 },
            { time: '2016-09-26', value: 25.65 },
            { time: '2016-10-03', value: 25.69 },
            { time: '2016-10-10', value: 25.67 },
            { time: '2016-10-17', value: 26.11 },
            { time: '2016-10-24', value: 25.80 },
            { time: '2016-10-31', value: 25.70 },
            { time: '2016-11-07', value: 25.40 },
            { time: '2016-11-14', value: 25.32 },
            { time: '2016-11-21', value: 25.48 },
            { time: '2016-11-28', value: 25.08 },
            { time: '2016-12-05', value: 25.06 },
            { time: '2016-12-12', value: 25.11 },
            { time: '2016-12-19', value: 25.34 },
            { time: '2016-12-26', value: 25.20 },
            { time: '2017-01-02', value: 25.33 },
            { time: '2017-01-09', value: 25.56 },
            { time: '2017-01-16', value: 25.32 },
            { time: '2017-01-23', value: 25.71 },
            { time: '2017-01-30', value: 25.85 },
            { time: '2017-02-06', value: 25.77 },
            { time: '2017-02-13', value: 25.94 },
            { time: '2017-02-20', value: 25.67 },
            { time: '2017-02-27', value: 25.60 },
            { time: '2017-03-06', value: 25.54 },
            { time: '2017-03-13', value: 25.84 },
            { time: '2017-03-20', value: 25.96 },
            { time: '2017-03-27', value: 25.90 },
            { time: '2017-04-03', value: 25.97 },
            { time: '2017-04-10', value: 26.00 },
            { time: '2017-04-17', value: 26.13 },
            { time: '2017-04-24', value: 26.02 },
            { time: '2017-05-01', value: 26.30 },
            { time: '2017-05-08', value: 26.27 },
            { time: '2017-05-15', value: 26.24 },
            { time: '2017-05-22', value: 26.02 },
            { time: '2017-05-29', value: 26.20 },
            { time: '2017-06-05', value: 26.12 },
            { time: '2017-06-12', value: 26.20 },
            { time: '2017-06-19', value: 26.46 },
            { time: '2017-06-26', value: 26.39 },
            { time: '2017-07-03', value: 26.52 },
            { time: '2017-07-10', value: 26.57 },
            { time: '2017-07-17', value: 26.65 },
            { time: '2017-07-24', value: 26.45 },
            { time: '2017-07-31', value: 26.37 },
            { time: '2017-08-07', value: 26.13 },
            { time: '2017-08-14', value: 26.21 },
            { time: '2017-08-21', value: 26.31 },
            { time: '2017-08-28', value: 26.33 },
            { time: '2017-09-04', value: 26.38 },
            { time: '2017-09-11', value: 26.38 },
            { time: '2017-09-18', value: 26.50 },
            { time: '2017-09-25', value: 26.39 },
            { time: '2017-10-02', value: 25.95 },
            { time: '2017-10-09', value: 26.15 },
            { time: '2017-10-16', value: 26.43 },
            { time: '2017-10-23', value: 26.22 },
            { time: '2017-10-30', value: 26.14 },
            { time: '2017-11-06', value: 26.08 },
            { time: '2017-11-13', value: 26.27 },
            { time: '2017-11-20', value: 26.30 },
            { time: '2017-11-27', value: 25.92 },
            { time: '2017-12-04', value: 26.10 },
            { time: '2017-12-11', value: 25.88 },
            { time: '2017-12-18', value: 25.82 },
            { time: '2017-12-25', value: 25.82 },
            { time: '2018-01-01', value: 25.81 },
            { time: '2018-01-08', value: 25.95 },
            { time: '2018-01-15', value: 26.03 },
            { time: '2018-01-22', value: 26.04 },
            { time: '2018-01-29', value: 25.96 },
            { time: '2018-02-05', value: 25.99 },
            { time: '2018-02-12', value: 26.00 },
            { time: '2018-02-19', value: 26.06 },
            { time: '2018-02-26', value: 25.77 },
            { time: '2018-03-05', value: 25.81 },
            { time: '2018-03-12', value: 25.88 },
            { time: '2018-03-19', value: 25.72 },
            { time: '2018-03-26', value: 25.75 },
            { time: '2018-04-02', value: 25.70 },
            { time: '2018-04-09', value: 25.73 },
            { time: '2018-04-16', value: 25.74 },
            { time: '2018-04-23', value: 25.69 },
            { time: '2018-04-30', value: 25.76 },
            { time: '2018-05-07', value: 25.89 },
            { time: '2018-05-14', value: 25.89 },
            { time: '2018-05-21', value: 26.00 },
            { time: '2018-05-28', value: 25.79 },
            { time: '2018-06-04', value: 26.11 },
            { time: '2018-06-11', value: 26.43 },
            { time: '2018-06-18', value: 26.30 },
            { time: '2018-06-25', value: 26.58 },
            { time: '2018-07-02', value: 26.33 },
            { time: '2018-07-09', value: 26.33 },
            { time: '2018-07-16', value: 26.32 },
            { time: '2018-07-23', value: 26.20 },
            { time: '2018-07-30', value: 26.03 },
            { time: '2018-08-06', value: 26.15 },
            { time: '2018-08-13', value: 26.17 },
            { time: '2018-08-20', value: 26.28 },
            { time: '2018-08-27', value: 25.86 },
            { time: '2018-09-03', value: 25.69 },
            { time: '2018-09-10', value: 25.69 },
            { time: '2018-09-17', value: 25.64 },
            { time: '2018-09-24', value: 25.67 },
            { time: '2018-10-01', value: 25.55 },
            { time: '2018-10-08', value: 25.59 },
            { time: '2018-10-15', value: 26.19 },
            { time: '2018-10-22', value: 25.81 },
            { time: '2018-10-29', value: 25.74 },
            { time: '2018-11-05', value: 25.75 },
            { time: '2018-11-12', value: 25.75 },
            { time: '2018-11-19', value: 25.72 },
            { time: '2018-11-26', value: 25.41 },
            { time: '2018-12-03', value: 25.39 },
            { time: '2018-12-10', value: 25.52 },
            { time: '2018-12-17', value: 25.66 },
            { time: '2018-12-24', value: 25.68 },
            { time: '2018-12-31', value: 25.71 },
            { time: '2019-01-07', value: 25.92 },
            { time: '2019-01-14', value: 25.60 },
            { time: '2019-01-21', value: 25.80 },
            { time: '2019-01-28', value: 25.60 },
            { time: '2019-02-04', value: 25.72 },
            { time: '2019-02-11', value: 25.89 },
            { time: '2019-02-18', value: 26.00 },
            { time: '2019-02-25', value: 25.86 },
            { time: '2019-03-04', value: 25.94 },
            { time: '2019-03-11', value: 26.11 },
            { time: '2019-03-18', value: 25.88 },
            { time: '2019-03-25', value: 25.77 },
            { time: '2019-04-01', value: 26.16 },
            { time: '2019-04-08', value: 26.04 },
            { time: '2019-04-15', value: 26.00 },
            { time: '2019-04-22', value: 25.88 },
            { time: '2019-04-29', value: 26.02 },
            { time: '2019-05-06', value: 26.08 },
            { time: '2019-05-13', value: 26.09 },
            { time: '2019-05-20', value: 26.16 },
            { time: '2019-05-27', value: 26.23 },
        ];
        let monthData = [
            { time: '2006-12-01', value: 25.40 },
            { time: '2007-01-01', value: 25.50 },
            { time: '2007-02-01', value: 25.11 },
            { time: '2007-03-01', value: 25.24 },
            { time: '2007-04-02', value: 25.34 },
            { time: '2007-05-01', value: 24.82 },
            { time: '2007-06-01', value: 23.85 },
            { time: '2007-07-02', value: 23.24 },
            { time: '2007-08-01', value: 23.05 },
            { time: '2007-09-03', value: 22.26 },
            { time: '2007-10-01', value: 22.52 },
            { time: '2007-11-01', value: 20.84 },
            { time: '2007-12-03', value: 20.37 },
            { time: '2008-01-01', value: 23.90 },
            { time: '2008-02-01', value: 22.58 },
            { time: '2008-03-03', value: 21.74 },
            { time: '2008-04-01', value: 22.50 },
            { time: '2008-05-01', value: 22.38 },
            { time: '2008-06-02', value: 20.58 },
            { time: '2008-07-01', value: 20.60 },
            { time: '2008-08-01', value: 20.82 },
            { time: '2008-09-01', value: 17.50 },
            { time: '2008-10-01', value: 17.70 },
            { time: '2008-11-03', value: 15.52 },
            { time: '2008-12-01', value: 18.58 },
            { time: '2009-01-01', value: 15.40 },
            { time: '2009-02-02', value: 11.68 },
            { time: '2009-03-02', value: 14.89 },
            { time: '2009-04-01', value: 16.24 },
            { time: '2009-05-01', value: 18.33 },
            { time: '2009-06-01', value: 18.08 },
            { time: '2009-07-01', value: 20.07 },
            { time: '2009-08-03', value: 20.35 },
            { time: '2009-09-01', value: 21.53 },
            { time: '2009-10-01', value: 21.48 },
            { time: '2009-11-02', value: 20.28 },
            { time: '2009-12-01', value: 21.39 },
            { time: '2010-01-01', value: 22.00 },
            { time: '2010-02-01', value: 22.31 },
            { time: '2010-03-01', value: 22.82 },
            { time: '2010-04-01', value: 22.58 },
            { time: '2010-05-03', value: 21.02 },
            { time: '2010-06-01', value: 21.45 },
            { time: '2010-07-01', value: 22.42 },
            { time: '2010-08-02', value: 23.61 },
            { time: '2010-09-01', value: 24.40 },
            { time: '2010-10-01', value: 24.46 },
            { time: '2010-11-01', value: 23.64 },
            { time: '2010-12-01', value: 22.90 },
            { time: '2011-01-03', value: 23.73 },
            { time: '2011-02-01', value: 23.52 },
            { time: '2011-03-01', value: 24.15 },
            { time: '2011-04-01', value: 24.37 },
            { time: '2011-05-02', value: 24.40 },
            { time: '2011-06-01', value: 24.45 },
            { time: '2011-07-01', value: 24.24 },
            { time: '2011-08-01', value: 24.00 },
            { time: '2011-09-01', value: 22.77 },
            { time: '2011-10-03', value: 24.21 },
            { time: '2011-11-01', value: 23.40 },
            { time: '2011-12-01', value: 23.90 },
            { time: '2012-01-02', value: 24.84 },
            { time: '2012-02-01', value: 25.04 },
            { time: '2012-03-01', value: 24.90 },
            { time: '2012-04-02', value: 25.06 },
            { time: '2012-05-01', value: 24.63 },
            { time: '2012-06-01', value: 25.07 },
            { time: '2012-07-02', value: 25.30 },
            { time: '2012-08-01', value: 25.08 },
            { time: '2012-09-03', value: 25.27 },
            { time: '2012-10-01', value: 25.39 },
            { time: '2012-11-01', value: 25.06 },
            { time: '2012-12-03', value: 25.03 },
            { time: '2013-01-01', value: 25.26 },
            { time: '2013-02-01', value: 25.20 },
            { time: '2013-03-01', value: 25.30 },
            { time: '2013-04-01', value: 25.38 },
            { time: '2013-05-01', value: 25.22 },
            { time: '2013-06-03', value: 24.88 },
            { time: '2013-07-01', value: 24.98 },
            { time: '2013-08-01', value: 24.60 },
            { time: '2013-09-02', value: 24.65 },
            { time: '2013-10-01', value: 24.62 },
            { time: '2013-11-01', value: 24.65 },
            { time: '2013-12-02', value: 24.70 },
            { time: '2014-01-01', value: 24.98 },
            { time: '2014-02-03', value: 24.95 },
            { time: '2014-03-03', value: 25.45 },
            { time: '2014-04-01', value: 25.40 },
            { time: '2014-05-01', value: 25.51 },
            { time: '2014-06-02', value: 25.34 },
            { time: '2014-07-01', value: 25.30 },
            { time: '2014-08-01', value: 25.36 },
            { time: '2014-09-01', value: 25.16 },
            { time: '2014-10-01', value: 25.53 },
            { time: '2014-11-03', value: 25.40 },
            { time: '2014-12-01', value: 25.70 },
            { time: '2015-01-01', value: 25.95 },
            { time: '2015-02-02', value: 25.81 },
            { time: '2015-03-02', value: 25.63 },
            { time: '2015-04-01', value: 25.39 },
            { time: '2015-05-01', value: 25.62 },
            { time: '2015-06-01', value: 25.23 },
            { time: '2015-07-01', value: 25.47 },
            { time: '2015-08-03', value: 25.18 },
            { time: '2015-09-01', value: 25.30 },
            { time: '2015-10-01', value: 25.68 },
            { time: '2015-11-02', value: 25.63 },
            { time: '2015-12-01', value: 25.57 },
            { time: '2016-01-01', value: 25.55 },
            { time: '2016-02-01', value: 25.05 },
            { time: '2016-03-01', value: 25.61 },
            { time: '2016-04-01', value: 25.91 },
            { time: '2016-05-02', value: 25.84 },
            { time: '2016-06-01', value: 25.94 },
            { time: '2016-07-01', value: 26.19 },
            { time: '2016-08-01', value: 26.06 },
            { time: '2016-09-01', value: 25.65 },
            { time: '2016-10-03', value: 25.80 },
            { time: '2016-11-01', value: 25.06 },
            { time: '2016-12-01', value: 25.20 },
            { time: '2017-01-02', value: 25.70 },
            { time: '2017-02-01', value: 25.78 },
            { time: '2017-03-01', value: 25.90 },
            { time: '2017-04-03', value: 26.02 },
            { time: '2017-05-01', value: 26.02 },
            { time: '2017-06-01', value: 26.39 },
            { time: '2017-07-03', value: 26.30 },
            { time: '2017-08-01', value: 26.14 },
            { time: '2017-09-01', value: 26.39 },
            { time: '2017-10-02', value: 26.12 },
            { time: '2017-11-01', value: 25.81 },
            { time: '2017-12-01', value: 25.82 },
            { time: '2018-01-01', value: 26.06 },
            { time: '2018-02-01', value: 25.78 },
            { time: '2018-03-01', value: 25.75 },
            { time: '2018-04-02', value: 25.72 },
            { time: '2018-05-01', value: 25.75 },
            { time: '2018-06-01', value: 26.58 },
            { time: '2018-07-02', value: 26.14 },
            { time: '2018-08-01', value: 25.86 },
            { time: '2018-09-03', value: 25.67 },
            { time: '2018-10-01', value: 25.82 },
            { time: '2018-11-01', value: 25.41 },
            { time: '2018-12-03', value: 25.77 },
            { time: '2019-01-01', value: 25.35 },
            { time: '2019-02-01', value: 25.79 },
            { time: '2019-03-01', value: 25.77 },
            { time: '2019-04-01', value: 25.90 },
            { time: '2019-05-01', value: 26.23 },
        ];
        
        let yearData = [
            { time: '2006-01-02', value: 24.89 },
            { time: '2007-01-01', value: 25.50 },
            { time: '2008-01-01', value: 23.90 },
            { time: '2009-01-01', value: 15.40 },
            { time: '2010-01-01', value: 22.00 },
            { time: '2011-01-03', value: 23.73 },
            { time: '2012-01-02', value: 24.84 },
            { time: '2013-01-01', value: 25.26 },
            { time: '2014-01-01', value: 24.98 },
            { time: '2015-01-01', value: 25.95 },
            { time: '2016-01-01', value: 25.55 },
            { time: '2017-01-02', value: 25.70 },
            { time: '2018-01-01', value: 26.06 },
            { time: '2019-01-01', value: 26.23 },
        ];
        
        let seriesesData = new Map([
          ['1D', dayData ],
          ['1W', weekData ],
          ['1M', monthData ],
          ['1Y', yearData ],
        ]);
        
        let switcherElement = createSimpleSwitcher(intervals, intervals[0], syncToInterval);
        
        let chartElement = document.createElement('div');
        
        let chart = LightweightCharts.createChart(chartElement, {
            width: 600,
            height: 300,
            layout: {
                background: {
                    type: 'solid',
                    color: '#000000',
                },
                textColor: '#d1d4dc',
            },
            grid: {
                vertLines: {
                    visible: false,
                },
                horzLines: {
                    color: 'rgba(42, 46, 57, 0.5)',
                },
            },
            rightPriceScale: {
                borderVisible: false,
            },
            timeScale: {
                borderVisible: false,
            },
            crosshair: {
                horzLine: {
                    visible: false,
                },
            },
        });
        
        document.getElementById('myChart').appendChild(chartElement);
        document.getElementById('myChart').appendChild(switcherElement);
        
        let areaSeries = null;
        
        function syncToInterval(interval) {
            if (areaSeries) {
                chart.removeSeries(areaSeries);
                areaSeries = null;
            }
            areaSeries = chart.addAreaSeries({
            topColor: 'rgba(76, 175, 80, 0.56)',
            bottomColor: 'rgba(76, 175, 80, 0.04)',
            lineColor: 'rgba(76, 175, 80, 1)',
            lineWidth: 2,
            });
            areaSeries.setData(seriesesData.get(interval));
        }
        
        syncToInterval(intervals[0]);
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
    renderPriceGraph()

    hide_All_details()
    document.getElementById('searchCompany').addEventListener('click', async () => {
        const existList = document.querySelectorAll('.allCompanyListItem');
        if(existList){
            existList.forEach(item => {
                item.remove();
            });
        }
        document.getElementById('allCompanyList').style.display = 'block'
        const setWidth = document.getElementById('searchCompany').offsetWidth
        document.getElementById('allCompanyList').style.width = setWidth+'px'
        companyList.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = item.Company
            listItem.id = item.Company
            listItem.classList.add('allCompanyListItem')
            listItem.addEventListener('click', handleListItemClick);
            document.getElementById('allCompanyList').appendChild(listItem)
        });
    })
    document.getElementById('searchCompany').addEventListener('input', async () => {
        const existList = document.querySelectorAll('.allCompanyListItem');
        if(existList){
            existList.forEach(item => {
                item.remove();
            });
        } 
        document.getElementById('allCompanyList').style.display = 'block'
        const setWidth = document.getElementById('searchCompany').offsetWidth
        document.getElementById('allCompanyList').style.width = setWidth+'px'

        const inputValue = document.getElementById('searchCompany').value;
        companyList.forEach(item => {
            const companyName = item.Company.toLowerCase();
            if (companyName.includes(inputValue.toLowerCase()) && inputValue !== '') {
                const listItem = document.createElement('li');
                listItem.innerHTML = item.Company
                listItem.id = item.Company
                listItem.classList.add('allCompanyListItem')
                listItem.addEventListener('click', handleListItemClick);
                document.getElementById('allCompanyList').appendChild(listItem)
            }
            if(inputValue === ''){
                const listItem = document.createElement('li');
                listItem.innerHTML = item.Company
                listItem.id = item.Company
                listItem.classList.add('allCompanyListItem')
                listItem.addEventListener('click', handleListItemClick);
                document.getElementById('allCompanyList').appendChild(listItem)
            }
        });
    });
    if(data){
        handleListItemClick()
    }
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