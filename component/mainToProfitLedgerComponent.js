async function executeMainToProfitLedger(){
    let toValue = null;
    let transHisData = []
    let mainBalance = null
    let profitbalance = null

    const fetchedHistoryData = await getInternalFundTransData(user.LoggedInInvestorId)
    if(fetchedHistoryData.status === true){
        transHisData = fetchedHistoryData.InternaFundTrData
        mainBalance = fetchedHistoryData.MainBalance
        profitbalance = fetchedHistoryData.ProfitBalance
    }

    function mainLedgerToProfitLedger(){
        document.getElementById('mainContentSection').innerHTML = `
        <div class="pageHeading pageHeading_2" id="financial-Heading">
            <div class="heading">
                <h1>Main Ledger To Profit Ledger (Vice Versa)</h1>
            </div>
        </div>

        <div class="container">
            <div class="box">
                <div class="box-data">
                    <label for="tansferFrom">From</label>
                    <select id="tansferFrom" name="tansferFrom" required>
                        <option value="default">--Select Type--</option>
                        <option value= 1>Main Ledger</option>
                        <option value= 2>Profit Ledger</option>
                    </select>
                </div>
                <div class="box-data">
                    <label for="availableBalanceFrom">Available Balance</label>
                    <input type="text" id="availableBalanceFrom" name="availableBalanceFrom"  required readonly>
                </div>
            </div>

            <div class="box">
                <div class="box-data">
                    <label for="to">To</label>
                    <input type="text" id="to" name="to"  required readonly>
                </div>
                <div class="box-data">
                    <label for="availableBalanceTo">Available Balance</label>
                    <input type="text" id="availableBalanceTo" name="availableBalanceTo" required readonly>
                </div>
            </div>

            <div class="box">
                <div class="box-data">
                    <label for="amountForTrans">Enter Amount</label>
                    <input type="number" id="amountForTrans" name="amountForTrans" required readonly><br>
                </div>
                <p style="display: none;" id="invalidAmount">Entered amount exceeds available balance.</p>
                <div class="submit-box">
                    <input id='submitM_to_P' type="submit" value="SUBMIT" class="btn btn-primary !important">
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
        <div id='errorDiv'></div>
        
        `
    }
    function renderTransferHistory(){
        const contentBody = document.getElementById('transferHistory')
        contentBody.innerHTML =
         `
            <table>
                <tr>
                    <th>ID</th>
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
                <td>${user.LoggedInInvestorId}</td>
                <td>${data.trType}</td>
                <td style='text-align: right;'>${parseInt(data.trAmo).toLocaleString("en-IN")}</td>
                <td>${data.trDate}</td>
                <td style='text-align: right;'>${data.trBy}</td>
            `;
            contentBody.querySelector('tbody').appendChild(newRow);
        })
    }

    mainLedgerToProfitLedger()
    renderTransferHistory()

    document.getElementById('tansferFrom').addEventListener('change', ()=>{
        const fromValue = document.getElementById('tansferFrom').value
        switch (fromValue) {
            case '1': 
                document.getElementById('availableBalanceFrom').value = parseFloat(mainBalance).toLocaleString("en-IN")
                document.getElementById('to').value = 'Profit Ledger'
                document.getElementById('availableBalanceTo').value = parseFloat(profitbalance).toLocaleString("en-IN")
                toValue = 2
                document.getElementById('amountForTrans').removeAttribute('readonly');
                document.getElementById('amountForTrans').value = null
                break;
            case '2':
                document.getElementById('availableBalanceFrom').value = parseFloat(profitbalance).toLocaleString("en-IN")
                document.getElementById('to').value = 'Main Ledger'
                document.getElementById('availableBalanceTo').value = parseFloat(mainBalance).toLocaleString("en-IN")
                toValue = 1
                document.getElementById('amountForTrans').removeAttribute('readonly');
                document.getElementById('amountForTrans').value = null
                break;
        
            default:
                toValue = null
                break;
        }
    })
    document.getElementById('submitM_to_P').addEventListener('click', async ()=>{
        if(toValue !== null && Number(document.getElementById('amountForTrans').value) <= Number(document.getElementById('availableBalanceFrom').value)){
            const fmL = Number(document.getElementById('tansferFrom').value)
            const toL = toValue
            const tbal = Number(document.getElementById('amountForTrans').value)
            const avbal =  Number(document.getElementById('availableBalanceFrom').value)
            const data = {fmL, toL, tbal, avbal}
            
            const result =await poatTrsnsLedgerBalance(user.LoggedInInvestorId, data)
            if(result.status === true){
                route('../component/mainToProfitLedgerComponent.js', '../css/mainToProfitLedgerComponent.css', 'mainToProfitLedger')
            }
        }else{
            const displayBox = document.getElementById('errorDiv')
                document.getElementById('overlay').style.display = 'block' 
                displayBox.style.display = 'block'
                displayBox.innerHTML = ''
                displayBox.innerHTML = `
                    <p style='font-weight: 700; padding-bottom: 10px;'>Error:</p>
                    <p style='color: red; font-weight: 600; padding-bottom: 10px;'>Please Select a Ledger and Enter a Valid amount</p>
                    <hr style='opacity:1;'>
                    <div id='closePopUp'>OK</div>
                `
                document.getElementById('closePopUp').addEventListener('click', ()=>{
                    document.getElementById('overlay').style.display = 'none' 
                    route('../component/mainToProfitLedgerComponent.js', '../css/mainToProfitLedgerComponent.css', 'mainToProfitLedger')
                })
        }
    })
    document.getElementById('amountForTrans').addEventListener('input', ()=>{
        const amount = document.getElementById('availableBalanceFrom').value
        const value = document.getElementById('amountForTrans').value
            if (amount !== null && parseFloat(value) > parseFloat(amount)) {
                document.getElementById('invalidAmount').style.display = 'block'
            }else{
                document.getElementById('invalidAmount').style.display = 'none'
            }
    })
}