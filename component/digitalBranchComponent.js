async function executeDigitalBranch(){
    const today = new Date().toISOString().split('T')[0];
    let oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    oneMonthAgo = oneMonthAgo.toISOString().split('T')[0]

    let fundStatusData = []
    let totalTrades = []
    let total_fundStatus = 0
    let fundInOut = []
    let totalClients = []
    let tradedClients = []
    let totalID_tradedClients = 0
    let totalTrade_tradedClients = 0
    let loggedInClients = []

    // const fetchedFundStatusData =await getDigitalBranchFundStatus(user.LoggedInInvestorId, today)
    // if(fetchedFundStatusData.status === true){
    //     fundStatusData = fetchedFundStatusData.Data
    //     total_fundStatus = fetchedFundStatusData.totalABal
    // }

    // const fetchedTradesData =await getDigitalBranchTrades(user.LoggedInInvestorId, oneMonthAgo, today)
    // if(fetchedTradesData.status === true){
    //     totalTrades = fetchedTradesData.Data
    // }

    // const fetchedFundInOutData =await getDigitalBranchFundInOut(user.LoggedInInvestorId, oneMonthAgo, today)
    // if(fetchedFundInOutData.status === true){
    //     fundInOut = fetchedFundInOutData.Data
    // }

    // const fetchedTradedClientnsData =await getDigitalBranchTradedClients(user.LoggedInInvestorId, oneMonthAgo, today)
    // if(fetchedTradedClientnsData.status === true){
    //     tradedClients = fetchedTradedClientnsData.Data
    //     totalID_tradedClients = fetchedTradedClientnsData.totalID
    //     totalTrade_tradedClients = fetchedTradedClientnsData.totalTrade
    // }

    // const fetchedTotalClientData =await getDigitalBranchTotClients(user.LoggedInInvestorId, oneMonthAgo, today)
    // if(fetchedTotalClientData.status === true){
    //     totalClients = fetchedTotalClientData.Data
    // }
    
    // const fetchedLoggedInClientData =await getDigitalBranchLoggedInClients(user.LoggedInInvestorId, oneMonthAgo, today)
    // if(fetchedLoggedInClientData.status === true){
    //     loggedInClients = fetchedLoggedInClientData.Data
    // }

    function digitalBranch(){
        document.getElementById('mainContentSection').innerHTML = `
        <div class="pageHeading" id="financial-Heading">
            <div class="heading">
                <h1>Digital Branch</h1>
            </div>
        </div>

        <div class='tradesSection'>
            <div class="container">
                <div id='tradesContent'></div>
            </div>
        </div>

        <div class='fundInOutSection'>
            <div class="container">
                <div id='fundInOutContent'></div>
            </div>
        </div>

        <div class='totalClientSection'>
            <div class="container">
                <div id='totalClientContent'></div>
            </div>
        </div>

        <div class='tradedClientsSection'>
            <div class="container">
                <div id='tradedClientsContent'></div>
            </div>
        </div>

        <div class='loggedInClientsSection'>
            <div class="container">
                <div id='loggedInClientsContent'></div>
            </div>
        </div>

        <div class='fundStatusSection'>
            <div class="container">
                <div id='fundStatusContent'></div>
            </div>
        </div>

        <div style='display: none;' id='showBO_Details'></div>
        `
    }  
    function renderTrades(startDate, endDate, data){
        document.getElementById('tradesContent').innerHTML=`
            <div class='boxHeading'>
                <h5>Trades</h5>
            </div>
            <div class='date_search'>
                <div class='dateSearchBox'>
                    <input type='text' id='tradesStrtDate' name='tradesStrtDate' value=${startDate ? startDate : customDateConverter(oneMonthAgo, 'defaultToCustom')} readonly>
                    <p style='padding: 0px 5px;'>To</p>
                    <input type='text' id='tradesEndDate' name='tradesEndDate' value=${endDate ? endDate : customDateConverter(today, 'defaultToCustom')} readonly>
                </div>
                <div class='searchBox'>
                    <img id='searchBoxtrades' style='width:30px; height:auto;' src='../images/icons/magnifying-glass.png' alt='search'>
                </div>
            </div>
            <div class='contentBody'>
                <p>Clients</p>
                <h4>${data ? data : ''}</h4>
            </div>
        `
        $("#tradesStrtDate").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "dd/M/yy"
        });
    
        $("#tradesEndDate").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "dd/M/yy"
        });
    }

    function renderFundInOut(startDate, endDate, In, Out){
        document.getElementById('fundInOutContent').innerHTML=`
            <div class='boxHeading'>
                <h5>Fund In-Out</h5>
            </div>
            <div class='date_search'>
                <div class='dateSearchBox'>
                    <input type='text' id='fundInOutStrtDate' name='fundInOutStrtDate' value=${startDate ? startDate : customDateConverter(oneMonthAgo, 'defaultToCustom')} readonly>
                    <p style='padding: 0px 5px;'>To</p>
                    <input type='text' id='fundInOutEndDate' name='fundInOutEndDate' value=${endDate ? endDate : customDateConverter(today, 'defaultToCustom')} readonly>
                </div>
                <div class='searchBox'>
                    <img id='searchBoxFundInOut' style='width:30px; height:auto;' src='../images/icons/magnifying-glass.png' alt='search'>
                </div>
            </div>
            <div class='contentBody'>
                <p>In</p>
                <h4>Tk. ${In ? In : ''}</h4>
                <p>Out</p>
                <h4>Tk. ${Out ? Out : ''}</h4>
            </div>
        `
        $("#fundInOutStrtDate").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "dd/M/yy"
        });
    
        $("#fundInOutEndDate").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "dd/M/yy"
        });
    }
    
    function renderTotalClient(startDate, endDate, withBo, withoutBo){
        document.getElementById('totalClientContent').innerHTML=`
            <div class='boxHeading'>
                <h5>Total Clients</h5>
            </div>
            <div class='date_search'>
                <div class='dateSearchBox'>
                    <input type='text' id='totalClientStrtDate' name='totalClientStrtDate' value=${startDate ? startDate : customDateConverter(oneMonthAgo, 'defaultToCustom')} readonly>
                    <p style='padding: 0px 5px;'>To</p>
                    <input type='text' id='totalClientEndDate' name='totalClientEndDate' value=${endDate ? endDate : customDateConverter(today, 'defaultToCustom')} readonly>
                </div>
                <div class='searchBox'>
                    <img id='searchBoxTotalClient' style='width:30px; height:auto;' src='../images/icons/magnifying-glass.png' alt='search'>
                </div>
            </div>
            <div class='contentBody'>
                <p>With BO</p>
                <h4>${withBo ? withBo : ''} <span id='withBO_Details'>D</span></h4>
                <p>Without BO</p>
                <h4>${withoutBo ? withoutBo : ''} <span id='withoutBO_Details'>D</span></h4>
            </div>
        `
        $("#totalClientStrtDate").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "dd/M/yy"
        });
    
        $("#totalClientEndDate").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "dd/M/yy"
        });
    }
    
    function renderTradedClients(startDate, endDate){
        document.getElementById('tradedClientsContent').innerHTML=`
            <div class='boxHeading'>
                <h5>Traded Clients</h5>
            </div>
            <div class='date_search'>
                <div class='dateSearchBox'>
                    <input type='text' id='tradedClientsStrtDate' name='tradedClientsStrtDate' value=${startDate ? startDate : customDateConverter(oneMonthAgo, 'defaultToCustom')} readonly>
                    <p style='padding: 0px 5px;'>To</p>
                    <input type='text' id='tradedClientsEndDate' name='tradedClientsEndDate' value=${endDate ? endDate : customDateConverter(today, 'defaultToCustom')} readonly>
                </div>
                <div class='searchBox'>
                    <img id='searchBoxTradedClients' style='width:30px; height:auto;' src='../images/icons/magnifying-glass.png' alt='search'>
                </div>
            </div>
            <div onscroll="resetLogoutTimer()" style='flex: 1 auto;overflow-y: auto; ' id='tradedClientsTable'>
                <table>
                    <tbody>
                        <tr>
                            <th>Sl</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Amount</th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style='flex: 0 auto; box-shadow: 0px -1px 5px 0px #5d5959;padding: 5px;' id='tableFooter'>
                <div class='tableFooterDiv'>
                    <p>Total ID: ${totalID_tradedClients}</p>
                    <p>Total Trade: ${totalTrade_tradedClients}</p>
                </div>
            </div>
        `
        $("#tradedClientsStrtDate").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "dd/M/yy"
        });
    
        $("#tradedClientsEndDate").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "dd/M/yy"
        });
        const tableBody = document.getElementById('tradedClientsTable')
        tradedClients.forEach(data => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${data.sl}</td>
                <td style='text-align: right;'>${data.id}</td>
                <td>${data.name}</td>
                <td style='text-align: right;'>${data.amount}</td>
            `;
            tableBody.querySelector('tbody').appendChild(newRow);
        })
    }
    
    function renderLoggedInClients(startDate, endDate){
        document.getElementById('loggedInClientsContent').innerHTML=`
            <div class='boxHeading'>
                <h5>Logged In Clients</h5>
            </div>
            <div class='date_search'>
                <div class='dateSearchBox'>
                    <input type='text' id='loggedInClientsStrtDate' name='loggedInClientsStrtDate' value=${startDate ? startDate : customDateConverter(oneMonthAgo, 'defaultToCustom')} readonly>
                    <p style='padding: 0px 5px;'>To</p>
                    <input type='text' id='loggedInClientsEndDate' name='loggedInClientsEndDate' value=${endDate ? endDate : customDateConverter(today, 'defaultToCustom')} readonly>
                </div>
                <div class='searchBox'>
                    <img id='searchBoxLoggedInClients' style='width:30px; height:auto;' src='../images/icons/magnifying-glass.png' alt='search'>
                </div>
            </div>
            <div onscroll="resetLogoutTimer()" style='flex: 1 auto;overflow-y: auto;height:300px ' id='loggedInClientsTable'>
                <table>
                    <tbody>
                        <tr>
                            <th>Sl</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>In Time</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        `
        $("#loggedInClientsStrtDate").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "dd/M/yy"
        });
    
        $("#loggedInClientsEndDate").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "dd/M/yy"
        });
        const tableBody = document.getElementById('loggedInClientsTable')
        loggedInClients.forEach(data => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${data.sl}</td>
                <td>${data.id}</td>
                <td>${data.name}</td>
                <td>${data.inTime}</td>
            `;
            tableBody.querySelector('tbody').appendChild(newRow);
        })
    }

    function renderFundStatus(startDate){
        document.getElementById('fundStatusContent').innerHTML=`
            <div class='boxHeading'>
                <h5>Fund Status</h5>
            </div>
            <div class='date_search'>
                <p style='margin-right: 15px;'>As On</p>
                <div class='dateSearchBox'>
                    <input type='text' id='fundStatusDate' name='fundStatusDate' value=${startDate ? startDate : customDateConverter(today, 'defaultToCustom')} readonly>
                    <div class='searchBox'>
                        <img id='searchBoxFundStatus' style='width:30px; height:auto;' src='../images/icons/magnifying-glass.png' alt='search'>
                    </div>
                </div>
            </div>
            <div onscroll="resetLogoutTimer()" style='flex: 1 auto;overflow-y: auto; ' id='tableContent'>
                <table>
                    <tbody>
                        <tr>
                            <th>Sl</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Ledger Balance</th>
                            <th>Availabe Balance</th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style='flex: 0 auto; box-shadow: 0px -1px 5px 0px #5d5959;padding: 5px;' id='tableFooter'>
                <p>Total: ${total_fundStatus}</p>
            </div>
        `
        $("#fundStatusDate").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "dd/M/yy"
        });
        const tableBody = document.getElementById('tableContent')
        fundStatusData.forEach(data => {
            const newRow = document.createElement('tr');
    
            newRow.innerHTML = `
                <td>${data.sl}</td>
                <td style='text-align: right;'>${data.id}</td>
                <td>${data.name}</td>
                <td style='text-align: right;'>${data.lBal}</td>
                <td style='text-align: right;'>${data.avBal}</td>
            `;
            tableBody.querySelector('tbody').appendChild(newRow);
        })
    }

    function renderBO_Details(heading, tableData, total){
        document.getElementById('showBO_Details').innerHTML=`
            <div class='boxHeading'>
                <h5>${heading}</h5>
            </div>
            <div onscroll="resetLogoutTimer()" style='flex: 1 auto;overflow-y: auto; ' id='${heading}'>
                <table>
                    <tbody>
                        <tr>
                            <th>Sl</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Mobile</th>
                            <th>Email</th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style='flex: 0 auto; box-shadow: 0px -1px 5px 0px #5d5959;padding: 5px;' id='tableFooter'>
                <div class='tableFooterDiv'>
                    <p>Total: ${total}</p>
                </div>
            </div>
        `
        const tableBody = document.getElementById(`${heading}`)
        tableData.forEach(data => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${data.sl}</td>
                <td>${data.id}</td>
                <td>${data.name}</td>
                <td>${data.mobile}</td>
                <td>${data.email}</td>
            `;
            tableBody.querySelector('tbody').appendChild(newRow);
        })
    }

    digitalBranch()
    renderTrades()
    renderFundInOut()
    renderTotalClient()
    renderTradedClients()
    renderLoggedInClients()
    renderFundStatus()

    
    document.body.addEventListener('click', async (event) => {
        if (event.target.id === 'searchBoxtrades') {
            const startDate = document.getElementById('tradesStrtDate').value;
            const endDate = document.getElementById('tradesEndDate').value;
            const fetchedTradesData =await getDigitalBranchTrades(user.LoggedInInvestorId, startDate, endDate);
            
            if(fetchedTradesData.status === true){
                totalTrades = fetchedTradesData.Data
                renderTrades(startDate, endDate, totalTrades[0].totTrade)
            }
        }
        if (event.target.id === 'searchBoxFundInOut') {
            const startDate = document.getElementById('fundInOutStrtDate').value;
            const endDate = document.getElementById('fundInOutEndDate').value;
            const fetchedFundInOutData = await getDigitalBranchFundInOut(user.LoggedInInvestorId, startDate, endDate);
            if(fetchedFundInOutData.status === true){
                fundInOut = fetchedFundInOutData.Data
                renderFundInOut(startDate, endDate, fundInOut[0].find_in, fundInOut[0].find_out)
            }
        }
        if (event.target.id === 'searchBoxTotalClient') {
            const startDate = document.getElementById('totalClientStrtDate').value;
            const endDate = document.getElementById('totalClientEndDate').value;
            const fetchedTotalClientData = await getDigitalBranchTotClients(user.LoggedInInvestorId, startDate, endDate);
            if(fetchedTotalClientData.status === true){
                totalClients = fetchedTotalClientData.Data
                renderTotalClient(startDate, endDate, totalClients[0].with_bo, totalClients[0].without_bo)
            }
        }
        if (event.target.id === 'searchBoxTradedClients') {
            const startDate = document.getElementById('tradedClientsStrtDate').value;
            const endDate = document.getElementById('tradedClientsEndDate').value;
            const fetchedTradedClientnsData = await getDigitalBranchTradedClients(user.LoggedInInvestorId, startDate, endDate);
            if (fetchedTradedClientnsData.status === true) {
                tradedClients = fetchedTradedClientnsData.Data;
                totalID_tradedClients = fetchedTradedClientnsData.totalID;
                totalTrade_tradedClients = fetchedTradedClientnsData.totalTrade;
                const startDate = document.getElementById('tradedClientsStrtDate').value;
                renderTradedClients(startDate, endDate);
            }
        }







        if (event.target.id === 'searchBoxFundStatus') {
            const startDate = document.getElementById('fundStatusDate').value;
            const fetchedFundStatusData = await getDigitalBranchFundStatus(user.LoggedInInvestorId, startDate);
            if (fetchedFundStatusData.status === true) {
                fundStatusData = fetchedFundStatusData.Data;
                total_fundStatus = fetchedFundStatusData.totalABal;
                renderFundStatus(startDate);
            }
        }
        

        
        
        if (event.target.id === 'searchBoxLoggedInClients') {
            const startDate = document.getElementById('loggedInClientsStrtDate').value;
            const endDate = document.getElementById('loggedInClientsEndDate').value;
            const fetchedLoggedInClientData = await getDigitalBranchLoggedInClients(user.LoggedInInvestorId, startDate, endDate);
            if(fetchedLoggedInClientData.status === true){
                loggedInClients = fetchedLoggedInClientData.Data
                renderLoggedInClients(startDate, endDate)
            }
        }
        if (event.target.id === 'withBO_Details') {
            document.getElementById('showBO_Details').innerHTML = ''
            const startDate = document.getElementById('totalClientStrtDate').value;
            const endDate = document.getElementById('totalClientEndDate').value;
            const fetchedWithBoClientData = await getDigitalBranchWithBO(user.LoggedInInvestorId, startDate, endDate);
            if(fetchedWithBoClientData.status === true){
                const tableData = fetchedWithBoClientData.Data
                const total = fetchedWithBoClientData.total
                renderBO_Details('With BO Details', tableData, total)
                document.getElementById('showBO_Details').style.display = 'flex'
                document.getElementById('showBO_Details').style.flexDirection = 'column'
                document.getElementById('overlay').style.display = 'block'
            }
        }
        if (event.target.id === 'withoutBO_Details') {
            document.getElementById('showBO_Details').innerHTML = ''
            const startDate = document.getElementById('totalClientStrtDate').value;
            const endDate = document.getElementById('totalClientEndDate').value;
            const fetchedWithOutClientData = await getDigitalBranchWithoutBO(user.LoggedInInvestorId, startDate, endDate);
            if(fetchedWithOutClientData.status === true){
                const tableData = fetchedWithOutClientData.Data
                const total = fetchedWithOutClientData.total
                renderBO_Details('Without BO Details', tableData, total)
                document.getElementById('showBO_Details').style.display = 'flex'
                document.getElementById('showBO_Details').style.flexDirection = 'column'
                document.getElementById('overlay').style.display = 'block'

            }
        }
        if (event.target.id === 'overlay') {
            document.getElementById('showBO_Details').style.display = 'none'
                document.getElementById('overlay').style.display = 'none'
        }
    });
}   
     