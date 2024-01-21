function executechildID(){ 
    const childIdData = [
        {
            id:172,
            name: "SIRAT SERENA",
            main_balance: 467,
            mature_balance: 467,
            profit_balance: 0,
            stock_value: 347,
            portfolio_value : 814,
            status: "Active"
        },
        {
            id:535,
            name: "MD. GOLAM RABBANI",
            main_balance: 429,
            mature_balance: 429,
            profit_balance: 0,
            stock_value: 73932,
            portfolio_value : 74361,
            status: "Active"
        }
    ]

    function childID(){
        document.getElementById('mainContentSection').innerHTML = 
        `
            <div class="pageHeading" id="financial-Heading">
                <div class="heading">
                    <h1>Child ID Status</h1>
                </div>
            </div>

            <div class="container">
                <div class="summuryChildID" id="summuryChildID"></div>
            </div>
            <div class="container">
                <div class="allChildID" id="allChildID"></div>
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

    function renderSummuryChildID(){
        const tableData = document.getElementById('summuryChildID')
        tableData.innerHTML =  `

        <table class="table table-bordered">
            <tbody>
                <tr>
                    <td>Total Id</td>
                    <td>2</td>
                    <td>Profit <br> Balance</td>
                    <td>74297</td>
                </tr>

                <tr>
                    <td>Main <br> Balance</td>
                    <td>896</td>
                    <td>Stock <br> Balance</td>
                    <td>0</td>
                </tr>

                <tr>
                    <td>Mature <br> Balance</td>
                    <td>896</td>
                    <td>Profolio <br> Value</td>
                    <td>75175</td>
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
                            <td>Id</td>
                            <td>${childID.id}</td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>${childID.name}</td>
                        </tr>
                        <tr>
                            <td>Main Balance</td>
                            <td>${childID.main_balance}</td>
                        </tr>
                        <tr>
                            <td>Mature Balance</td>
                            <td>${childID.mature_balance}</td>
                        </tr>
                        <tr>
                            <td>Profit Balance</td>
                            <td>${childID.profit_balance}</td>
                        </tr>
                        <tr>
                            <td>Stock Value</td>
                            <td>${childID.stock_value}</td>
                        </tr>
                        <tr>
                            <td>Portfolio Value</td>
                            <td>${childID.portfolio_value}</td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td class="idStatus">${childID.status}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="detailsBtn" onclick="route('../component/childID_DetailsComponent.js','../css/childID_DetailsComponent.css', 'childID_Details')">View Details</div>

            `
            divBody.appendChild(newDiv)
        })

    }





    childID()
    renderSummuryChildID()
    renderAllChildID()
    
}

