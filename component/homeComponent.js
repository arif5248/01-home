async function executeHome(){
    let user = null;
    let dashBoardData = null;
    let loginDashData = null

    const storedData = localStorage.getItem('loginData');
    const storedDashBoardData = localStorage.getItem('dashBoard');
    if (storedData) {
        const loginData = JSON.parse(storedData);
        user = loginData[0]
    }else{
        window.location.href = '../index.html';
    }
    const fetchedDashData = await getDashBoardData(user.LoggedInInvestorId)
    if (fetchedDashData.status === true) {
        loginDashData = fetchedDashData;
        dashBoardData = fetchedDashData.Data[0]
    }
    
    const table1 = [
        {
            fieldName: "Ledger Balance",
            value: dashBoardData.Ledger
        },
        {
            fieldName: "Profile Balance",
            value: dashBoardData.profit_bal
        },
        {
            fieldName: "Total Stock Value",
            value: dashBoardData.stk_val
        },
        {
            fieldName: "Total Portfolio",
            value: parseInt(dashBoardData.Equity.replace(/,/g, ''),10) + parseInt(dashBoardData.profit_bal.replace(/,/g, ''),10)
        },
        {
            fieldName: "Change from Last Day",
            value: dashBoardData.EquityChange
        },
        {
            fieldName: "Available Fund",
            value: dashBoardData.pur_lim
        },
        {
            fieldName: "Available Reward Points",
            value: dashBoardData.reward
        },
    ]
    
    const table2 = [
        {
            fieldName: "Investment",
            value: dashBoardData.Investment
        },
        {
            fieldName: "Withdrawn",
            value: dashBoardData.Withdrawn
        },
        {
            fieldName: "Net Investment",
            value: dashBoardData.NetInvestment
        },
        {
            fieldName: "Realized Profit/(Loss)",
            value: dashBoardData.Realized
        },
        {
            fieldName: "Unrealized Profit/(Loss)",
            value: dashBoardData.UnRealized
        },
        {
            fieldName: "Net Profit/(Loss)",
            value: dashBoardData.NetProfit
        },
    ]
    
    function handleClick(script){
        return function(event){
            removeFooterBtnState();
            route('../component/stockDetailsComponent.js', '../css/stockDetailsComponent.css', 'stockDetails', script)
        }
    }
    function homeComponent (){
        document.getElementById('mainContentSection').innerHTML = `
        <div class="section section-profile" id="section-profile">
            <div class="container">
                <div class="profile-content" id="profile-content"></div>
            </div>
        </div>
        <div id='home_marquee_section' class='home_marquee_section'>
            <div class='container'>
                <div class='home_marquee'>
                    <marquee behavior="scroll" direction="left" scrollamount="5" id="marqueeContainer"></marquee>
                </div>
            </div>
        </div>
        <div class="eligibleIPO" id="eligibleIPO"></div>
    
        <div class="section section-table-1">
            <div class="container">
                <div class="table1Content-btn">
                    <div id="table-1Content" class="table-1Content"></div>
                    <div class="moreBtn">
                        <div class="more" onclick="removeFooterBtnState();getTable1More()">More...</div>
                    </div>
                </div> 
            </div>
        </div>
    
        <div class="section section-table-2">
            <div class="container">
                <div id="table-2Content" class="table-2Content"></div>
            </div>
        </div>
    
        <div class="section section-availableStok">
            <div class="container">
                <div class="availableStockHeading">
                    <h3>AVAILABLE STOCKS</h3>
                </div>
                <div class="btnRow">
                    <div class="btnGroup">
                        <div class="stockBtn active" onclick="showStockData('currentStockBody')">
                            <div class="currentBtn">
                                <h5>CURRENT STOCK</h5>
                            </div>
                        </div>
                        <div class="stockBtn" onclick="showStockData('oldStockBody')">
                            <div class="oldButton">
                                <h5>OLD STOCK</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="stockBody">
                    <div class="currentStockBody" id="currentStockBody"></div>
                    <div class="oldStockBody" id="oldStockBody"></div>
                </div>
            </div>
        </div>
    
        <div class="section section-ExecutedTrades" style='flex: 1 auto;'>
            <div class="container">
                <div class="availeExecutedTradesHeading">
                    <h3>Executed Trades</h3>
                </div>
                <div class="executedTrades" id="executedTrades"></div>     
            </div>
        </div>
        `
    }
    function renderProfile() {
        document.getElementById('profile-content').innerHTML = `
        <div class="leftSide">
            <div class="userImage">
                <img style="width:75px" src=${user.ProfileImage} alt=${user.LoggedInInvestorName}'s Image>
            </div>
            <div class="profileBtn">
                <div onclick='removeFooterBtnState(); getUserDetails(${user.LoggedInInvestorId})'>PROFILE</div>
            </div>
        </div>
        <div class="rightSide">
            <div class="mainInfo">
                <h3>ID: ${user.LoggedInInvestorId}</h3>
                <h3>${user.LoggedInInvestorName}</h3>
            </div>
            <hr class="hr_profile">
            <div class="contactInfo">
                <p>${user.phone}</p> <p> ${user.email}</p>
            </div>
        </div>
        `
    }
    function renderMarquee(){
        const marqueeContainer = document.getElementById('marqueeContainer');

        loginDashData.marquee.forEach(function(item) {
        if(item.marquee && item.marquee !== ''){
            marqueeContainer.innerHTML += item.marquee + `&emsp;<img style='width:25px !important; height: auto' src='../images/icons/01_icon.jpeg' alt='01'>&emsp;`;
        }else{
            document.getElementById('home_marquee_section').style.display = 'none'
        }
    });
    }
    function renderTable1(){
        var tableContent = document.getElementById('table-1Content')
        var table= tableContent.appendChild(document.createElement('table'))
        table.classList.add('tablee','table-borderlesss')
    
        table1.forEach(function (row, index) {
            var tableRow = document.createElement('tr');
            tableRow.classList.add('item');
    
            tableRow.innerHTML = `
                <td class="column-left">${row.fieldName}</td>
                <td class="column-right">
                    <div> <span>TK</span> <span>${row.value}</span> </div>
                </td>
            `;
    
            table.appendChild(tableRow);
            if(index===4){
                var breakRow = document.createElement('br');
                table.appendChild(breakRow);
            }
        })
    }

    
    function renderTable2(){
        var tableContent = document.getElementById('table-2Content')
        var table= tableContent.appendChild(document.createElement('table'))
        table.classList.add('tablee','table-borderlesss')
    
        table2.forEach(function (row, index) {
            var tableRow = document.createElement('tr');
            tableRow.classList.add('item');
    
            tableRow.innerHTML = `
                <td class="column-left">${row.fieldName}</td>
                <td class="column-right">
                    <div> <span>TK</span> <span>${row.value}</span> </div>
                </td>
            `;
    
            table.appendChild(tableRow);
            if(index===2){
                var breakRow = document.createElement('br');
                table.appendChild(breakRow);
            }
        })
    }
    function renderCurrentStockTable() {
        const tableBody = document.getElementById('currentStockBody');
        tableBody.innerHTML =
         `
            <table>
                <tr>
                    <th>Company</th>
                    <th>Stock<br>Qty</th>
                    <th>Avg<br>Cost</th>
                    <th>Last<br>Price</th>
                    <th>Total<br>Price</th>
                </tr>
            </table>
            <div id="currentStockFooter" class="currentStockFooter"></div>
        `;
        loginDashData.Stock.forEach(stock => {
            const newRow = document.createElement('tr');
    
            newRow.innerHTML = `
                <td>${stock.company}</td>
                <td>${stock.Stock}</td>
                <td>${stock.FIFO}</td>
                <td>${stock.LTP}</td>
                <td>${stock.Total_Taka}</td>
            `;
        tableBody.querySelector('tbody').appendChild(newRow);
        newRow.querySelectorAll('td').forEach(td=>{
            td.style.color = Number(stock.Profit.replace(/,/g, '')) >= 0 ? (Number(stock.Profit.replace(/,/g, '')) > 0 ? '#04A41E' : '#000') : '#FE0000'
        })
        newRow.addEventListener('click', handleClick(stock.company))
        });
        const tableFooter = document.getElementById('currentStockFooter');
        const totalCount = loginDashData.Stock.length;
        const totalValue = loginDashData.Stock.reduce((total, stock) => total + parseInt(stock.Total_Taka.replace(/,/g, ''),10), 0);
    
        tableFooter.innerHTML = `
            <p>Count : ${totalCount}</p>
            <p>Total Value: ${totalValue}</p>
        `;
    }
    function renderOldStockTable() {
        const tableBody = document.getElementById('oldStockBody');
        tableBody.innerHTML =
         `
            <table>
                <tr>
                    <th>Company</th>
                    <th>Stock<br>Qty</th>
                    <th>Avg<br>Cost</th>
                    <th>Last<br>Price</th>
                    <th>Total<br>Price</th>
                </tr>
            </table>
            <div id="oldStockFooter" class="oldStockFooter"></div>
        `;
        loginDashData.OldStock.forEach(stock => {
            const newRow = document.createElement('tr');
    
            newRow.innerHTML = `
                <td>${stock.company}</td>
                <td>${stock.Stock}</td>
                <td>${stock.FIFO}</td>
                <td>${stock.LTP}</td>
                <td>${stock.Total_Taka}</td>
            `;
        tableBody.querySelector('tbody').appendChild(newRow);
        newRow.querySelectorAll('td').forEach(td=>{
            td.style.color = Number(stock.Profit.replace(/,/g, '')) >= 0 ? (Number(stock.Profit.replace(/,/g, '')) > 0 ? '#04A41E' : '#000') : '#FE0000'
        })
        newRow.addEventListener('click', handleClick(stock.company))
        });
        const tableFooter = document.getElementById('oldStockFooter');
        const totalCount = loginDashData.OldStock.length;
        const totalValue = loginDashData.OldStock.reduce((total, stock) => total + parseInt(stock.Total_Taka.replace(/,/g, ''),10), 0);
    
        tableFooter.innerHTML = `
            <p>Count : ${totalCount}</p>
            <p>Total Value: ${totalValue}</p>
        `;
    }
    function renderExecutionTrades() {
        const today = new Date().toISOString().split('T')[0];
        const executedTrades = document.getElementById('executedTrades');
        executedTrades.innerHTML =
         `  <div class="btnRow">
                <div class="searchContent">
                    <div class="input-box">
                        <input type="date" id="date-from" value= ${today} >
                        <span>To</span>
                        <input type="date" id="date-to" value= ${today}>
                        <div onclick='allExecuteTrades(${user.LoggedInInvestorId})' class="searchImg">
                            <img style="width: 20px;" src="../images/icons/magnifying-glass.png" alt="search">
                        </div>
                    </div>
                </div>
            </div>
            <table>
                <tr>
                    <th>Company</th>
                    <th>B/S</th>
                    <th>Qty</th>
                    <th>Rate</th>
                    <th>Amount</th>
                </tr>
            </table>
            <div id="executionStockFooter" class="oldStockFooter"></div>
        `;
    }
    
    
    homeComponent()
    renderProfile()
    renderMarquee()
    renderTable1()
    
    renderTable2()
    renderCurrentStockTable()
    renderOldStockTable()
    renderExecutionTrades() 
    document.getElementById('currentStockBody').style.display = 'block';
    document.getElementById('oldStockBody').style.display = 'none';
    allExecuteTrades(user.LoggedInInvestorId)

   

}
async function allExecuteTrades(inv_Id) {
    
    let executedTradesData = []
    const tableRows = document.querySelectorAll('.excTrdRow');
    if(tableRows){
        tableRows.forEach(row => {
            row.remove();
        });
    }  
    const executedTrades = document.getElementById('executedTrades');
    const dateFrom = document.getElementById('date-from').value;
    const dateTo = document.getElementById('date-to').value;
    const fetchedTradesData = await getAllExecuteTrades(dateFrom, dateTo, inv_Id)
    executedTradesData = fetchedTradesData.Data
    executedTradesData.forEach((stock, index) => {
        const newRow = document.createElement('tr');
        newRow.classList.add('excTrdRow')
        newRow.innerHTML = `
            <td>${stock.company}</td>
            <td id='B_S${index}'>${stock['B/S']}</td>
            <td>${stock.Qty}</td>
            <td>${stock.Rate}</td>
            <td>${stock.Amount}</td>
        `;
        executedTrades.querySelector('tbody').appendChild(newRow);
        document.getElementById(`B_S${index}`).style.color = stock['B/S'] === 'Buy' ? '#04A41E' : '#FE0000'
        
    });
    const tableFooter = document.getElementById('executionStockFooter');
    const totalCount = executedTradesData.length;
    const totalValue = executedTradesData.reduce((total, stock) => total + parseInt(stock.Amount.replace(/,/g, ''),10), 0);

    tableFooter.innerHTML = `
        <p>Count : ${totalCount}</p>
        <p>Total Value: ${totalValue}</p>
    `;
    
    
}

async function getUserDetails(userId){
    const userDetails = await getUserDetailsData(userId)
    document.getElementById('mainContentSection').innerHTML=`
    <div class="invProfileSection">
        <div class="pageHeading" id="pageHeading">
            <div class="heading">
                <h1>Investor Profile</h1>
            </div>
        </div>
        <div class="container">
            <div class="inv_ProfileBox">
                <div id='img_box_1' class="img_box">
                    <div class="img_border_box">
                        <div class='invImgDiv'>
                            <img class='invPhoto' alt='Investor Photo' src=${userDetails.Photo[0].Photo}>
                        </div>
                        <div class='divHeading'>
                            <p>Photo</p>
                        </div> 
                    </div>
                </div>
                <div id='img_box_2' class="img_box">
                    <div class="img_border_box">
                        <div class='invImgDiv'>
                            <img style='width: 95%; height: auto;' class='invSign' alt='Investor Signature' src=${userDetails.Sign[0].Sign}>
                        </div>
                        <div class='divHeading'>
                            <p>Signature</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class='container'>
            <div class='invDetailsBody' id='invDetailsBody'>
                <table>
                    <tbody>
                        
                    </tbody>
                </table>
            </div>
        </div>
        
    </div> 
    <br>  
    <br>  
    <br>  
    <br>  
    `
   squareDiv()
   const invDetails = document.getElementById('invDetailsBody')
   userDetails.Data.forEach(item => {
        const newRow = document.createElement('tr')
        newRow.innerHTML=`
        <td>
            <p>${item.title}</P>
            <p>${item.value}</P>
        </td>
        `
        invDetails.querySelector('tbody').appendChild(newRow)
   })
    

}
async function getTable1More(){
    let dashBoardData = null
    const storedDashBoardData = localStorage.getItem('dashBoard');
    if (storedDashBoardData) {
        const loginDashData = JSON.parse(storedDashBoardData);
        dashBoardData = loginDashData.Data[0]
    }
    const table1More =[
        {
            fieldName: "Unposted Amount",
            value: dashBoardData.un_tk
        },
        {
            fieldName: "Due CDBL Fee",
            value: dashBoardData.cdbl_fee
        },
        {
            fieldName: "Pending Withdrawl",
            value: dashBoardData.req_with
        },
        {
            fieldName: "IPO Fund Block",
            value: dashBoardData.ipo_blk
        },
        {
            fieldName: "Purchase Limit",
            value: dashBoardData.pur_lim
        },
    ]

     document.getElementById('mainContentSection').innerHTML=`
     <div class="table1More">
        <div class="pageHeading" id="pageHeading">
            <div class="heading">
                <h1>More</h1>
            </div>
        </div>
        <div class="container">
            <div class="table1MoreDetails">
                <table id="table">
                    <tbody id="tbody">
                    </tbody
                </table>
            </div>
        </div>
     </div>   
    `
    const table = document.getElementById('table')
    table1More.forEach(function (row) {
        var tableRow = document.createElement('tr');
        tableRow.classList.add('item');

        tableRow.innerHTML = `
            <td class="column-left">${row.fieldName}</td>
            <td class="column-right">
                <div> <span>TK</span> <span>${row.value}</span> </div>
            </td>
        `;

        table.querySelector('tbody').appendChild(tableRow);
    })
}

function showStockData(stockType) {
    document.getElementById('currentStockBody').style.display = 'none';
    document.getElementById('oldStockBody').style.display = 'none';

    document.getElementById(stockType).style.display = 'block';
    updateButtonState(stockType);

}
function updateButtonState(activeButton) {
    var buttons = document.querySelectorAll('.btnGroup .stockBtn');
    buttons.forEach(function (button) {
        button.classList.remove('active');
    });

    var activeButtonElement = document.querySelector('.btnGroup .stockBtn[onclick*="' + activeButton + '"]');
    if (activeButtonElement) {
        activeButtonElement.classList.add('active');
    }
}
function squareDiv()  {
    const imgBoxWidth = document.querySelector('.img_box').offsetWidth;
    const imgBoxes = document.querySelectorAll('.img_box');
    imgBoxes.forEach(imgBox => {
        imgBox.style.height = `${imgBoxWidth}px`;
    });
};

