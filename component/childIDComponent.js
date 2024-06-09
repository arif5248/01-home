async function executechildID(){ 
    let childIdData = []

    const fetchedChildPortfolio = await getChildPortfolio(user.LoggedInInvestorId)
    if(fetchedChildPortfolio.status === true){
        childIdData = fetchedChildPortfolio.Data
    }

    function childID(){
        document.getElementById('mainContentSection').innerHTML = 
        `
            <div class="pageHeading" id="financial-Heading">
                <div class="heading">
                    <h1>Child ID Status</h1>
                </div>
            </div>

            <div style='margin-bottom: 5px;' class="container">
                <div class="summuryChildID" id="summuryChildID"></div>
            </div>
            <div onscroll="resetLogoutTimer()" class="container" style="flex: 1 auto;overflow-y: auto;">
                <div class="allChildID" id="allChildID"></div>
            </div> 
        `
    }

    function renderSummuryChildID(){
        let summaryData ={}
            summaryData = {
                totalId : fetchedChildPortfolio.Data.length,
                totalMainBal: fetchedChildPortfolio.totalMainBal,
                totalMatBal: fetchedChildPortfolio.totalMatBal,
                totalProfitBal: fetchedChildPortfolio.totalProfitBal,
                totalStockVal: fetchedChildPortfolio.totalStockVal,
                totalPortVal: fetchedChildPortfolio.totalPortVal,
            }
        const tableData = document.getElementById('summuryChildID')
        tableData.innerHTML =  `

        <table class="table table-bordered">
            <tbody>
                <tr>
                    <td>Total ID</td>
                    <td style='text-align: right'>${summaryData.totalId}</td>
                    <td>Profit <br> Balance</td>
                    <td style='text-align: right'>${summaryData.totalProfitBal}</td>
                </tr>

                <tr>
                    <td>Main <br> Balance</td>
                    <td style='text-align: right'>${summaryData.totalMainBal}</td>
                    <td>Stock <br> Balance</td>
                    <td style='text-align: right'>${summaryData.totalStockVal}</td>
                </tr>

                <tr>
                    <td>Mature <br> Balance</td>
                    <td style='text-align: right'>${summaryData.totalMatBal}</td>
                    <td>Profolio <br> Value</td>
                    <td style='text-align: right'>${summaryData.totalPortVal}</td>
                </tr>
            </tbody
        </table>
        `
    }

    function renderAllChildID(){
        const divBody = document.getElementById('allChildID')

        childIdData.forEach(childID=>{
            const newDiv = document.createElement('div')
            newDiv.classList.add('childID')
            newDiv.innerHTML = `
                <table>
                    <tbody>
                        <tr>
                            <td>ID</td><td>: &nbsp;</td>
                            <td>${childID.InvestorID}</td>
                        </tr>
                        <tr>
                            <td>Name</td><td>: &nbsp;</td>
                            <td>${childID.InvestorName}</td>
                        </tr>
                        <tr>
                            <td>Main Balance</td><td>: &nbsp;</td>
                            <td>${childID.MainBalance}</td>
                        </tr>
                        <tr>
                            <td>Mature Balance</td><td>: &nbsp;</td>
                            <td>${childID.MaturedBalance}</td>
                        </tr>
                        <tr>
                            <td>Profit Balance</td><td>: &nbsp;</td>
                            <td>${childID.ProfitBalance}</td>
                        </tr>
                        <tr>
                            <td>Stock Value</td><td>: &nbsp;</td>
                            <td>${childID.StockValue}</td>
                        </tr>
                        <tr>
                            <td>Portfolio Value</td><td>: &nbsp;</td>
                            <td>${childID.PortfolioValue}</td>
                        </tr>
                        <tr>
                            <td>Status</td><td>: &nbsp;</td>
                            <td class="idStatus">${childID.Status}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="detailsBtn" onclick="route('../component/childID_DetailsComponent.js','../css/childID_DetailsComponent.css', 'childID_Details', ${childID.InvestorID})">View Details</div>

            `
            divBody.appendChild(newDiv)
        })

    }





    childID()
    renderSummuryChildID()
    renderAllChildID()
    
}

