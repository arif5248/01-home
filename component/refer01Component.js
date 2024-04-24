async function executeRefer01(){
    let referListData = []
    let referDetailsInfo={}
    const currentDate = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const formattedCurrentDate = currentDate.toISOString().split('T')[0];
    const formattedOneYearAgo = oneYearAgo.toISOString().split('T')[0];

    const fetchedRefer01Data = await getRefer01Data(user.LoggedInInvestorId)
    const fetchedRefer01Details = await getRefer01Details(user.LoggedInInvestorId, formattedOneYearAgo, formattedCurrentDate )
    if(fetchedRefer01Data.status === true){
        referDetailsInfo = fetchedRefer01Data.RewardData[0]
    }
    if(fetchedRefer01Details.status === true){
        referListData = fetchedRefer01Details.ReferDetails
    }
        
    
    function refer01(){
        document.getElementById('mainContentSection').innerHTML = `
        <div class="pageHeading" id="financial-Heading">
            <div class="heading">
                <h1>Refer 01 to Friends and Family</h1>
            </div>
        </div>

        <div class="container">
            <div class="referDetails" id="referDetails"></div>
        </div>
        <div class="container">
            <div class="heading_refer">
                <h3>Reference Details</h3>
            </div>
            <div class="referredList" id="referredList"></div>
        </div>
        <br>
        <br>
        <br>
        <br>
        <br>
        `
    }

    function renderReferDetails(){

        document.getElementById('referDetails').innerHTML = `
            <div class="box">
                <div class="box-data">
                    <p>Total No. of Persons Referred :</p>
                    <p>${referDetailsInfo.PersonReferred}</p>
                </div>
                <div class="box-data">
                    <p>Total Trade Amount by Referred Person (Tk) :</p>
                    <p>${referDetailsInfo.TradeAmount}</p>
                </div>
                <div class="box-data">
                    <p>Total Reward Points Earned :</p>
                    <p>${referDetailsInfo.RewardPoint}</p>
                </div>
                <div class="link-box">
                    <p>Please Share Your Referral Link with Your Friends & Family Member</p>
                    <p>${referDetailsInfo.ReferLink}</p>
                </div>
            </div>
        `
    }
    function renderReferredList(){
        const body = document.getElementById('referredList')
        body.innerHTML = ''
        document.getElementById('referredList').innerHTML = `
            <div class="box">
                <div class="btnRow">
                    <div class="searchContent">
                        <div class="input-box">
                            <input type="date" id="date-from">
                            <span>To</span>
                            <input type="date" id="date-to">
                            <div id='searchReferList' class="searchImg">
                                <img style="width: 20px;" src="../images/icons/magnifying-glass.png" alt="search">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="table-content">
                    <table>
                        <tbody>
                            <tr>
                                <th>Sl</th>
                                <th>Name</th>
                                <th>01 Id</th>
                                <th>Trade Amount</th>
                                <th>Last Trade</th>
                            </tr>
                        </tbody>
                    </table>
                    
                </div>
                <div id="referredListFooter" class="referListFooter"></div>
                
            </div>
            
        `

        referListData.forEach((data) => {
            const newRow = document.createElement('tr');
    
            newRow.innerHTML = `
                <td>${data.SlNo}</td>
                <td>${data.Name}</td>
                <td>${data['01ID']}</td>
                <td>${data.TradeAmount}</td>
                <td>${data.LastTradeDate}</td>
            `;
            body.querySelector('tbody').appendChild(newRow);
        });
        const tableFooter = document.getElementById('referredListFooter');
        const totalValue = referListData.reduce((total, data) => total + data.trade_amount, 0);
    
        tableFooter.innerHTML = `
            <p>Total Value:</p>
            <p>${totalValue}</p>
        `;
    }

    refer01()
    renderReferDetails()
    renderReferredList()
    document.getElementById('date-from').value = formattedOneYearAgo
    document.getElementById('date-to').value = formattedCurrentDate

    document.getElementById('searchReferList').addEventListener('click', async (event)=>{
        const dateFrom = document.getElementById('date-from').value
        const dateTo = document.getElementById('date-to').value
        const fetchedRefer01Details = await getRefer01Details(user.LoggedInInvestorId, dateFrom, dateTo)
        if(fetchedRefer01Details.status === true){
            referListData = fetchedRefer01Details.ReferDetails
            console.log(referListData)
            renderReferredList()
            document.getElementById('date-from').value = dateFrom
            document.getElementById('date-to').value = dateTo
        }
    })
}