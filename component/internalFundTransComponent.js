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
    document.getElementById('mainContentSection').innerHTML = `
        <div class="pageHeading" id="financial-Heading">
            <div class="heading">
                <h1>MAIN LEDGER TO PROFIT LEDGER (VICE VERSA)</h1>
            </div>

            <div class="container">
                <div class="box">
                    <div class="box-data">
                        <label for="tansferfrom">Available Balance</label>
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
                        <input onchange="checkValidity(this)" type="number" id="amountForTrans" name="amountForTrans" required>
                    </div>
                    <div class="submit-box">
                        <input type="submit" value="SUBMIT">
                    </div>
                </div>
            </div>
        </div>
    `
    document.getElementById('amountForTrans').addEventListener('change', function(event) {
        checkValidity(event.target.value);
    });
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
    dataSet.forEach(item => {
        
        if(item.name === data.value){
             availableBalance_from = item.availableBalance
        }
        if(item.name !== data.value){
             to = item.name
             availableBalance_to = item.availableBalance
        }
        if(data.value === "default"){
            availableBalance_from = null;
            to = null;
            availableBalance_to = null;
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