async function executeMoneyWithdrawal(){
    let statusData = []
    const fetchedMoneReqInfo = await getMoneyReqInfo(user.LoggedInInvestorId)
    let fetchedMoneyReqStatus = await getMoneyReqStatus(user.LoggedInInvestorId)
    if(fetchedMoneyReqStatus.status === true){
        statusData = fetchedMoneyReqStatus.Data
    }

    function handleDeleteMoneyReq(atn) {
        return async function(event){
            const result = await deleteMoneyReq(atn)

            fetchedMoneyReqStatus = await getMoneyReqStatus(user.LoggedInInvestorId)
            if(fetchedMoneyReqStatus.status = true){
                statusData = fetchedMoneyReqStatus.Data
            }
            await moneyWithdrawal()
            await renderRequisitionContent()
            await renderStatusContent()

            document.getElementById('statusContent').style.display = 'block'
            document.getElementById('requisitionContent').style.display = 'none'
            document.getElementById('payToMyBkash').style.display= 'none'
            updateButtonState('statusContent')
        };
        
    }

    const today = new Date().toISOString().split('T')[0];

    async function moneyWithdrawal(){
        document.getElementById('mainContentSection').innerHTML = `
            <div class="pageHeading" id="financial-Heading">
                <div class="heading" id="heading">
                    <h1>Money Withdrawal</h1>
                </div>
            </div>
            <div class="btnGroup" id="btnGroup">
                <div onclick="show('requisitionContent')" class="Btn active" id="requisition">Requisition</div>
                <div onclick="show('statusContent')" class="Btn" id="status">Status</div>
            </div>
            <div onscroll="resetLogoutTimer()" class="container" style=" flex: 1 auto; height: 100%; overflow-y: auto;">
                <div class="ipoContent" id="requisitionContent"></div>
                <div class="ipoContent" id="statusContent"></div>
            </div>
           
        `
    }

    async function renderRequisitionContent(){
        let details = []

        if(fetchedMoneReqInfo.status === true){
            details = fetchedMoneReqInfo.Data[0]
        }
        const body = document.getElementById('requisitionContent')
        console.log()
        body.innerHTML = `
            <form action="#" method="post">

                <div class="box">
                    <div class="box-data">
                        <label for="reqDate">Req Date</label>
                        <input type="text" id="reqDate" name="reqDate" value=${customDateConverter(today, 'defaultToCustom')} required readonly>
                    </div>
                    <div class="box-data">
                        <label for="userId">01 ID</label>
                        <input type="text" id="userId" name="id" value="${user.LoggedInInvestorId}" required readonly>
                    </div>
                    <div class="box-data">
                        <label for="mobileNumber">Mobile Number</label>
                        <input type="text" id="mobileNumber" name="mobileNumber" value="${details.Mobile}" required readonly>
                    </div>
                    <div class="box-data">
                        <label for="userMail">Email</label>
                        <input type="email" id="userMail" name="email" value="${details.Email}" required readonly>
                    </div>
                    <div class="box-data">
                        <label for="availableBalance">Available Balance</label>
                        <input type="text" id="availableBalance" name="availableBalance" value="${parseFloat(details.Ledger).toLocaleString("en-IN")}" required readonly>
                    </div>
                    <div class="box-data">
                        <label for="withdrawalType">Withdrawal Type</label>
                        <select id="withdrawalType" name="withdrawalType" required></select>
                    </div>
                    <div class="box-data">
                        <label for="amount">Amount</label>
                        <input type="number" id="amount" name="amount" placeholder="Enter Taka"  required>
                    </div>
                </div>

                <div class="box">
                    <div class="form-box-2">
                        <div>
                            <input id="bankCheck" type="radio" name="paymentMethod" value="" onclick="showMethod('payToMyBank')" checked>
                            <label for="bankCheck">Pay to My Bank</label>
                        </div>
                        <div style='pointer-events: none; opacity: 0.5;'>
                            <input id="bKashCheck" type="radio" name="paymentMethod" onclick="showMethod('payToMyBkash')" value="bKash" disabled>
                            <label for="bKashCheck">Pay to My Bkash</label>
                        </div>
                    </div>
                    <div class="box">
                        <div id="payToMyBank">
                            <div class="box-data">
                                <label for="bankName">Bank Name</label>
                                <input type="text" id="bankName" name="bankName" value="${details.Bank}" required readonly>
                            </div>
                            <div class="box-data">
                                <label for="accNo">A/C No.</label>
                                <input type="number" id="accNo" name="accNo" value="${details.BankAccount}" required readonly>
                            </div>
                        </div>
                        <div id="payToMyBkash">
                            <div class="box-data">
                                <label for="bKashNum">bKash Number</label>
                                <input type="number" id="bKashNum" name="bKashNum" value="${details.Bkash}" required readonly>
                            </div>
                        </div>
                    </div>
                    <div class="box-data">
                        <label for="note">Note (If any)</label>
                        <input type="text" id="note" name="note" placeholder="Enter Note">
                    </div>
                </div>
                <div class="box">
                    <div class="box">
                        <p class="otpSelectText">Select where to send OTP</p>
                        <div class="form-box-2">
                            <div>
                                <input id="mobileOtp" type="radio" name="otpMethod" value="sms" checked>
                                <label for="mobileOtp">Mobile</label>
                            </div>
                            <div>
                                <input id="emailOtp" type="radio" name="otpMethod" value="mail">
                                <label for="emailOtp">Email</label>
                            </div>
                        </div>
                        <div class="proceed-btn">
                            <input id='getOtp' type="button" value="Get OTP" >
                            <input type="text" id='placedOtp'placeholder="Enter OTP" required>
                        </div>
                        <div id='otpExpiredIn'></div>
                        <div id='otpError'></div>
                    </div>
                    <div class="submit-box">
                        <input class=' btn btn-primary' id='moneyWihdrawSubmit' type="submit" value="APPLY">
                    </div>
                </div>
            </form>
            `
            if(fetchedMoneReqInfo.status === true){
                fetchedMoneReqInfo.Type.forEach(option =>{
                    const newOption = document.createElement('option')
                    newOption.setAttribute('id', `${option.value}`);
                    newOption.value = option.value;
                    newOption.textContent = option.value;
                    document.getElementById('withdrawalType').appendChild(newOption)
                })
            }
    }
    async function renderStatusContent(){
        const body = document.getElementById('statusContent')
        statusData.forEach((status) => {
            const newDiv = document.createElement('div')
            newDiv.classList.add('ipo_item')
            newDiv.innerHTML=`
                <div class="contentBody">
                    <table>
                        <tbody>
                            <tr>
                                <td>Date</td>
                                <td>${status.req_date}</td>
                            </tr>
                            <tr>
                                <td>Type</td>
                                <td>${status.type}</td>
                            </tr>
                            <tr>
                                <td>From/To</td>
                                <td>${status['frm/to']}</td>
                            </tr>
                            <tr>
                                <td>Purpose</td>
                                <td>${status.purpose}</td>
                            </tr>
                            <tr>
                                <td>Taka</td>
                                <td>${status.tk}</td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td id='withdrawalStatus${status.atn}'>${status.status}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class='WDcancelBtn' style='display:none;' id='${status.atn}_CancelBtn'>CANCEL</div>
                </div>
            `
            body.appendChild(newDiv)
            document.getElementById(`withdrawalStatus${status.atn}`).style.color = document.getElementById(`withdrawalStatus${status.atn}`).innerHTML === 'Cancelled' ? 'red' : 'green'
            if(status.status === 'Pending'){
                document.getElementById(`${status.atn}_CancelBtn`).style.display = 'block'
                const deleteBtn = document.getElementById(`${status.atn}_CancelBtn`);
                deleteBtn.addEventListener('click', handleDeleteMoneyReq(status.atn));
            }
            
        })
    }

    async function handleOtp(event){
        const selectedValue = document.querySelector('input[name="otpMethod"]:checked').value;
        if(selectedValue && document.getElementById('amount').value !== '' && document.getElementById('withdrawalType').value !== '--Select Type--'){
            const fetchedOtp = await getOTP(user.LoggedInInvestorId, selectedValue)
            document.getElementById('otpError').innerHTML = '';
            document.getElementById('withdrawalType').style.borderColor = '#000';
            document.getElementById('amount').style.borderColor = '#000';

            // const fetchedOtp = {status: true, code: '5248'}
            if(fetchedOtp.status === true){
                sessionStorage.setItem('otp', fetchedOtp.code);
                const expiredTime = new Date().getTime() + 121*1000
                otpCountDownInterval = setInterval(function(){
                    let remainingTime = expiredTime - new Date().getTime()
                    const min = parseInt(remainingTime / (1000 * 60));
                    remainingTime %= (1000 * 60);
                    const sec = parseInt(remainingTime / 1000);

                    document.getElementById('otpExpiredIn').innerHTML = `
                        <p style='text-align: right; color: red;'>OTP Expired In: ${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}</p>
                    `
                },1000)
                setTimeout(function() {
                    sessionStorage.removeItem('otp');
                    clearInterval(otpCountDownInterval)
                    document.getElementById('otpExpiredIn').innerHTML = ''
                }, 120 * 1000);
            }
        }
        else{
            const errorBox = document.getElementById('otpError')
            document.getElementById('withdrawalType').style.borderColor = '#000'
            document.getElementById('amount').style.borderColor = '#000'
            errorBox.innerHTML= ''
            if(document.getElementById('withdrawalType').value === '--Select Type--'){
                const newP = document.createElement('p')
                newP.innerHTML = `Please Select a Withdrawal Type Option.`
                errorBox.appendChild(newP)
                newP.style.textAlign = 'center'
                newP.style.fontSize = '13px'
                newP.style.color = 'red'
                document.getElementById('withdrawalType').style.borderColor = 'red'
            }
            if(document.getElementById('amount').value === ''){
                const newP = document.createElement('p')
                newP.innerHTML = `Please Enter a  Withdrawal Amount.`
                errorBox.appendChild(newP)
                newP.style.textAlign = 'center'
                newP.style.fontSize = '13px'
                newP.style.color = 'red'
                document.getElementById('amount').style.borderColor = 'red'
            }
        }
    }
    async function handleSubmit(event){
        event.preventDefault();
        const otpRetrived = sessionStorage.getItem('otp')
        
        if(otpRetrived && document.getElementById('placedOtp').value === otpRetrived && document.getElementById('amount').value !== '' && document.getElementById('withdrawalType').value !== '--Select Type--'){
            clearInterval(otpCountDownInterval)
            document.getElementById('otpError').innerHTML = '';
            document.getElementById('otpExpiredIn').innerHTML = '';
            const data = {
                id: document.getElementById('userId').value,
                phn: document.getElementById('mobileNumber').value,
                email: document.getElementById('userMail').value,
                amo: document.getElementById('amount').value,
                purpose: document.getElementById('withdrawalType').value,
                mode: document.querySelector('input[name="paymentMethod"]:checked').value,
                note: document.getElementById('note').value,
                bkash_no: document.querySelector('input[name="paymentMethod"]:checked').value === 'bKash' ? document.getElementById('bKashNum').value : '',
    
            }
            const result = await postMoneyReq(data)

            fetchedMoneyReqStatus = await getMoneyReqStatus(user.LoggedInInvestorId)
            if(fetchedMoneyReqStatus.status = true){
                statusData = fetchedMoneyReqStatus.Data
            }
            await moneyWithdrawal()
            await renderRequisitionContent()
            await renderStatusContent()
        }else{
            const errorBox = document.getElementById('otpError')
            document.getElementById('withdrawalType').style.borderColor = '#000'
            document.getElementById('amount').style.borderColor = '#000'
            errorBox.innerHTML= ''
            if(document.getElementById('withdrawalType').value === '--Select Type--'){
                const newP = document.createElement('p')
                newP.innerHTML = `Please Select a Withdrawal Type Option.`
                errorBox.appendChild(newP)
                newP.style.textAlign = 'center'
                newP.style.fontSize = '13px'
                newP.style.color = 'red'
                document.getElementById('withdrawalType').style.borderColor = 'red'
            }
            if(document.getElementById('amount').value === ''){
                const newP = document.createElement('p')
                newP.innerHTML = `Please Enter a  Withdrawal Amount.`
                errorBox.appendChild(newP)
                newP.style.textAlign = 'center'
                newP.style.fontSize = '13px'
                newP.style.color = 'red'
                document.getElementById('amount').style.borderColor = 'red'
            }
            if(!otpRetrived){
                const newP = document.createElement('p')
                newP.innerHTML = `Please Click on Get OTP Button and Enter the OTP.`
                errorBox.appendChild(newP)
                newP.style.textAlign = 'center'
                newP.style.fontSize = '13px'
                newP.style.color = 'red'
            }
            
            if(otpRetrived && otpRetrived !== document.getElementById('placedOtp').value){
                if(otpRetrived && document.getElementById('placedOtp').value === ''){
                    const newP = document.createElement('p')
                    newP.innerHTML = `Please Enter OTP`
                    errorBox.appendChild(newP)
                    newP.style.textAlign = 'center'
                    newP.style.color = 'red'
                    newP.style.fontSize = '13px'
                }else{
                    const newP = document.createElement('p')
                    newP.innerHTML = `OTP does not matched or expired. Please try again.`
                    errorBox.appendChild(newP)
                    newP.style.textAlign = 'center'
                    newP.style.color = 'red'
                    newP.style.fontSize = '13px'
                }
                
            }
        }
        
    }

    moneyWithdrawal()
    renderRequisitionContent()
    renderStatusContent()

    document.getElementById('requisitionContent').style.display = 'block'
    document.getElementById('statusContent').style.display = 'none'
    document.getElementById('payToMyBkash').style.display= 'none'

    document.getElementById('getOtp').addEventListener('click', handleOtp)
    document.getElementById('moneyWihdrawSubmit').addEventListener('click', handleSubmit)
}

function showMethod(type){
    document.getElementById('payToMyBank').style.display= 'none'
    document.getElementById('payToMyBkash').style.display= 'none'

    document.getElementById(type).style.display= 'block'
}
function show(content){
    document.getElementById('requisitionContent').style.display = 'none'
    document.getElementById('statusContent').style.display = 'none'

    document.getElementById(content).style.display = 'block'

    // switch(content){
    //     case 'requisitionContent' :
    //     const heading_1 = document.getElementById('heading');
    //     heading_1.querySelector('h1').innerHTML=`Requisition`;
    //     break;

    //     case 'statusContent' :
    //     const heading_2 = document.getElementById('heading');
    //     heading_2.querySelector('h1').innerHTML=`Status`;
    //     break;
    // }

    updateButtonState(content)
}
function updateButtonState(activeButton) {
    let buttons = document.querySelectorAll('.btnGroup .Btn');
    buttons.forEach(function (button) {
        button.classList.remove('active');
    });

    let activeButtonElement = document.querySelector('.btnGroup .Btn[onclick*="' + activeButton + '"]');
    if (activeButtonElement) {
        activeButtonElement.classList.add('active');
    }
}



