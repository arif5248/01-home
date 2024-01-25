function executeInternalFundTransfer(){

    function internalFundTransfer(){
        document.getElementById('mainContentSection').innerHTML = `
        <div class="pageHeading" id="financial-Heading">
            <div class="heading">
                <h1>Internal Fund Transfer</h1>
            </div>
        </div>

        <div class="container">
            <div onclick="renderInternalFundTransfer()" class="transferBtn" id="transferBtn">MAIN LEDGER TO PROFIT LEDGER (VICE VERSA)</div>
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
        <div class="pageHeading pageHeading_2" id="financial-Heading">
            <div class="heading">
                <h1>MAIN LEDGER TO PROFIT LEDGER (VICE VERSA)</h1>
            </div>
        </div>

        <div class="container">
            <div class="box">
                <div class="box-data">
                    <label for="tansferfrom">From</label>
                    <select onchange="handleSelectChange(this)" id="tansferfrom" name="tansferfrom" required>
                        <option value="default">--Select Type--</option>
                        <option value="Main Ledger">Main Ledger</option>
                        <option value="Profit Ledger">Profit Ledger</option>
                    </select>
                </div>
                <div class="box-data">
                    <label for="availableBalanceFrom">Available Balance</label>
                    <input type="number" id="availableBalanceFrom" name="availableBalanceFrom"  required readonly>
                </div>
            </div>

            <div class="box">
                <div class="box-data">
                    <label for="to">To</label>
                    <input type="text" id="to" name="to"  required readonly>
                </div>
                <div class="box-data">
                    <label for="availableBalanceTo">Available Balance</label>
                    <input type="number" id="availableBalanceTo" name="availableBalanceTo" required readonly>
                </div>
            </div>

            <div class="box">
                <div class="box-data">
                    <label for="amountForTrans">Enter Amount</label>
                    <input type="number" id="amountForTrans" name="amountForTrans" required readonly><br>
                </div>
                <p style="display: none;" id="invalidAmount">Entered amount exceeds available balance.</p>
                <div class="submit-box">
                    <input type="submit" value="SUBMIT">
                </div>
            </div>
        </div>

        <div class="pageHeading pageHeading_2" id="financial-Heading">
            <div class="heading">
                <h1>Transfer History</h1>
            </div>
        </div>

        <div class="container">
            <div class="transferHistory" id="transferHistory"></div>
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
}
function handleSelectChange(data){
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
function checkValidity(value) {
    console.log("=======================");
    // Your validation logic goes here
    console.log("Entered value:", value);
}