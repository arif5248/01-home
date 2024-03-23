function executeInternalFundTransfer(){

    function internalFundTransfer(){
        document.getElementById('mainContentSection').innerHTML = `
        <div class="pageHeading" id="financial-Heading">
            <div class="heading">
                <h1>Internal Fund Transfer</h1>
            </div>
        </div>

        <div class="container">
            <div onclick="route('../component/mainToProfitLedgerComponent.js', '../css/mainToProfitLedgerComponent.css', 'mainToProfitLedger')" class="transferBtn" id="transferBtn">MAIN LEDGER TO PROFIT LEDGER (VICE VERSA)</div>
        </div>
        <div class="container">
            <div onclick="route('../component/childIdToMotherIdTransComponent.js', '../css/childIdToMotherIdTransComponent.css', 'childIdToMotherIdTrans')" class="transferBtn" id="transferBtn">CHILD ID TO MOTHER ID ( MAIN LEDGER )</div>
        </div>
        
        `
    }
    internalFundTransfer()
}

function renderInternalFundTransfer(){
    const transHisData = [
        {
            invId: 2,
            type: "Main to Profit",
            amount: 46.00,
            trDate: "12/Dec/2022",
            trBy: 28
        },
        {
            invId: 2,
            type: "Profit to Main",
            amount: 50.00,
            trDate: '12/Jan/2023',
            trBy: 25
        },
        {
            invId: 2,
            type: "Main Ledger to Profit Ledger",
            amount: 13.00,
            trDate: "12/Dec/2022",
            trBy: 23
        },
        {
            invId: 2,
            type: "Profit Ledger to Main Ledger",
            amount: 13.00,
            trDate: "12/Dec/2022",
            trBy: 28
        },
        {
            invId: 2,
            type: "Main to Profit",
            amount: 46.00,
            trDate: "12/Dec/2022",
            trBy: 28
        },
        {
            invId: 2,
            type: "Main to Profit",
            amount: 46.00,
            trDate: "12/Dec/2022",
            trBy: 28
        }
    ]
    document.getElementById('mainContentSection').innerHTML = `
        <br>
        <br> 
    `

    function renderTransferHistory(){
        const contentBody = document.getElementById('transferHistory')
        contentBody.innerHTML =
         `
            <table>
                <tr>
                    <th>Inv Id</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Tr.Date</th>
                    <th>Tr.By</th>
                </tr>
            </table>
        `;
        transHisData.forEach((data) => {
            const newRow = document.createElement('tr');
    
            newRow.innerHTML = `
                <td>${data.invId}</td>
                <td>${data.type}</td>
                <td>${data.amount}</td>
                <td>${data.trDate}</td>
                <td>${data.trBy}</td>
            `;
            contentBody.querySelector('tbody').appendChild(newRow);
        })
    }
    document.getElementById('amountForTrans').addEventListener('input', function(event) {
        function checkValidity(value) {
            const amount = document.getElementById('availableBalanceFrom').value
            if (amount !== null && parseFloat(value) > parseFloat(amount)) {
                document.getElementById('invalidAmount').style.display = 'block'
            }else{
                document.getElementById('invalidAmount').style.display = 'none'
            }
        }
        checkValidity(event.target.value);
    });
    renderTransferHistory()
    document.getElementById('tansferFrom').addEventListener('change', handleSelectChange)
}
function handleSelectChange(event){
    const data = event.target
    console.log(data.value)
    return function(event){
        let availableBalance_from = null
        let availableBalance_to = null
        let to = null
        const dataSet = [
            {
                name: "Main Ledger",
                availableBalance: 300
            },
            {
                name: "Profit Ledger",
                availableBalance: 156
            }
        ]
        document.getElementById('amountForTrans').removeAttribute('readonly');
        dataSet.forEach(item => {
            if(item.name === data.value){
                availableBalance_from = item.availableBalance
            }
            if(item.name !== data.value){
                to = item.name
                availableBalance_to = item.availableBalance
            }
            if(data.value === "default"){
                console.log("hiiiii")
                availableBalance_from = null;
                to = null;
                availableBalance_to = null;
                document.getElementById('amountForTrans').setAttribute('readonly', 'true');
            }
        })
        document.getElementById('availableBalanceFrom').value = availableBalance_from
        document.getElementById('to').value = to
        document.getElementById('availableBalanceTo').value = availableBalance_to
    }
    
    

}
function checkValidity(value) {
    console.log("=======================");
    // Your validation logic goes here
    console.log("Entered value:", value);
}