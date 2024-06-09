async function executeRefer01(){
    let referListData = []
    let referDetailsInfo={}

    const today = new Date().toISOString().split('T')[0];
    let oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    oneMonthAgo = oneMonthAgo.toISOString().split('T')[0]

    const fetchedRefer01Data = await getRefer01Data(user.LoggedInInvestorId)
    const fetchedRefer01Details = await getRefer01Details(user.LoggedInInvestorId, oneMonthAgo, today )
  
    referDetailsInfo = fetchedRefer01Data.RewardData[0]
   
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
                    <p id='copied' style='display: none;'>Copied</p>
                    <p id='referLink'>${referDetailsInfo.ReferLink}</p>
                </div>
            </div>
        `
        document.getElementById('referLink').addEventListener('click',()=>{
            const tempTextarea = document.createElement('textarea');
            tempTextarea.value = referLink.textContent.trim();
            document.body.appendChild(tempTextarea);

            tempTextarea.select();
            document.execCommand('copy');

            document.body.removeChild(tempTextarea);
            document.getElementById('copied').style.display ='block'
            setTimeout(() => {
                document.getElementById('copied').style.display ='none'
            }, 3000);
            
            
        })
    }
    function renderReferredList(){
        const body = document.getElementById('referredList')
        body.innerHTML = ''
        document.getElementById('referredList').innerHTML = `
            <div style="display: flex; flex-direction: column;" class="box">
                <div style="flex: 0 auto;" class="btnRow">
                    <div class="searchContent">
                        <div class="input-box">
                            <input type="text" id="date-from" readonly>
                            <span>To</span>
                            <input type="text" id="date-to" readonly>
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
                                <th>01 ID</th>
                                <th>Trade Amount</th>
                                <th>Last Trade</th>
                            </tr>
                        </tbody>
                    </table>
                    
                </div>
                <div id="referredListFooter" class="referListFooter"></div>
                
            </div>
            
        `
        $("#date-from").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "dd/M/yy"
        });
    
        $("#date-to").datepicker({
            changeMonth: true,
            changeYear: true,
            dateFormat: "dd/M/yy"
        });
        let totalValue = 0
        referListData.forEach((data) => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${data.SlNo}</td>
                <td style='text-align: left;'>${data.Name}</td>
                <td>${data['01ID']}</td>
                <td>${data.TradeAmount}</td>
                <td style='text-align: left;'>${data.LastTradeDate}</td>
            `;
            body.querySelector('tbody').appendChild(newRow);
            totalValue = totalValue + Number(data.TradeAmount.replace(/,/g, ''))
        });
        const tableFooter = document.getElementById('referredListFooter');
        tableFooter.innerHTML = `
            <p>Total Value:</p>
            <p>${totalValue.toLocaleString("en-IN")}</p>
        `;
    }

    refer01()
    renderReferDetails()
    renderReferredList()
    document.getElementById('date-from').value = customDateConverter(oneMonthAgo, 'defaultToCustom');
    document.getElementById('date-to').value = customDateConverter(today, 'defaultToCustom');

    document.getElementById('searchReferList').addEventListener('click', async (event)=>{
        const dateFrom = document.getElementById('date-from').value
        const dateTo = document.getElementById('date-to').value
        const fetchedRefer01Details = await getRefer01Details(user.LoggedInInvestorId, dateFrom, dateTo)
        if(fetchedRefer01Details.status === true){
            referListData = fetchedRefer01Details.ReferDetails
            renderReferredList()
            document.getElementById('date-from').value = dateFrom
            document.getElementById('date-to').value = dateTo
        }
    })
}