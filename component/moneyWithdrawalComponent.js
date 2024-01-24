function executeMoneyWithdrawal(){
    const statusData=[
        {
            date: "30/Dec/2023",
            type: "Withdrawn",
            form_to: "Withdrawn from<brID.28>",
            purpose: "Investment",
            taka: 10,
            status: "Cleared",
        },
        {
            date: "30/Dec/2023",
            type: "Withdrawn",
            form_to: "Withdrawn from<brID.28>",
            purpose: "Investment",
            taka: 10,
            status: "Cleared",
        },
        {
            date: "30/Dec/2023",
            type: "Withdrawn",
            form_to: "Withdrawn from<brID.28>",
            purpose: "Investment",
            taka: 10,
            status: "Cleared",
        },
    ]
    const today = new Date().toISOString().split('T')[0];

    function moneyWithdrawal(){
        document.getElementById('mainContentSection').innerHTML = `
            <div class="pageHeading" id="financial-Heading">
                <div class="heading" id="heading">
                    <h1>Requisition</h1>
                </div>
            </div>
            <div class="btnGroup" id="btnGroup">
                <div onclick="show('requisitionContent')" class="Btn active" id="requisition">Requisition</div>
                <div onclick="show('statusContent')" class="Btn" id="status">Status</div>
            </div>
            <div class="container">
                <div class="ipoContent" id="requisitionContent"></div>
                <div class="ipoContent" id="statusContent"></div>
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

    function renderRequisitionContent(){
        const body = document.getElementById('requisitionContent')
        body.innerHTML = `
            <form action="#" method="post">

                <div class="box">
                    <div class="box-data">
                        <label for="reqDate">Req Date</label>
                        <input type="date" id="reqDate" name="reqDate" value=${today} required readonly>
                    </div>
                    <div class="box-data">
                        <label for="id">01 ID</label>
                        <input type="text" id="id" name="id" value="28" required readonly>
                    </div>
                    <div class="box-data">
                        <label for="mobileNumber">Mobile Number</label>
                        <input type="text" id="mobileNumber" name="mobileNumber" value="01836720974" required readonly>
                    </div>
                    <div class="box-data">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" value="kaiserctg3467@gmail.com" required readonly>
                    </div>
                    <div class="box-data">
                        <label for="availableBalance">Available Balance</label>
                        <input type="text" id="availableBalance" name="availableBalance" value="2396" required readonly>
                    </div>
                    <div class="box-data">
                        <label for="withdrawalType">Withdrawal Type</label>
                        <select id="withdrawalType" name="withdrawalType" required>
                            <option value="ipo1">--Select Type--</option>
                            <option value="ipo2">Capital</option>
                            <option value="ipo2">Profit</option>
                            <option value="ipo2">Capital & Profit</option>
                        </select>
                    </div>
                    <div class="box-data">
                        <label for="amount">Amount</label>
                        <input type="number" id="amount" name="amount" placeholder="Enter Taka"  required>
                    </div>
                </div>

                <div class="box">
                    <div class="form-box-2">
                        <div>
                            <input id="bankCheck" type="radio" name="paymentMethod" value="payToMyBank" onclick="showMethod('payToMyBank')" checked>
                            <label for="bankCheck">Pay to My Bank</label>
                        </div>
                        <div>
                            <input id="bKashCheck" type="radio" name="paymentMethod" onclick="showMethod('payToMyBkash')" value="payToMyBkash">
                            <label for="bKashCheck">Pay to My Bkash</label>
                        </div>
                    </div>
                    <div class="box">
                        <div id="payToMyBank">
                            <div class="box-data">
                                <label for="bankName">Bank Name</label>
                                <input type="text" id="bankName" name="bankName" value="The City Bank Limited" required readonly>
                            </div>
                            <div class="box-data">
                                <label for="accNo">A/C No.</label>
                                <input type="number" id="accNo" name="accNo" value="3468346095237" required readonly>
                            </div>
                        </div>
                        <div id="payToMyBkash">
                            <div class="box-data">
                                <label for="bKashNum">bKash Number</label>
                                <input type="number" id="bKashNum" name="bKashNum" value="0184762901" required readonly>
                            </div>
                        </div>
                    </div>
                    <div class="box-data">
                        <label for="note">Note (If any)</label>
                        <input type="text" id="note" name="note" placeholder="Enter Note"  required >
                    </div>
                </div>
                <div class="box">
                    <div class="box">
                        <p class="otpSelectText">Select where to send OTP</p>
                        <div class="form-box-2">
                            <div>
                                <input id="mobileOtp" type="radio" name="otpMethod" value="01872567289" checked>
                                <label for="mobileOtp">Mobile</label>
                            </div>
                            <div>
                                <input id="emailOtp" type="radio" name="otpMethod" value="xyz@gmail.com">
                                <label for="emailOtp">Email</label>
                            </div>
                        </div>
                        <div class="proceed-btn">
                            <input type="button" value="GetOTP" >
                            <input type="number" placeholder="Enter OTP">
                        </div>
                    </div>
                    <div class="submit-box">
                        <input type="submit" value="APPLY">
                    </div>
                </div>
            </form>
            `
    }
    function renderStatusContent(){
        
        const body = document.getElementById('statusContent')
        statusData.forEach((status,index) => {
            const newDiv = document.createElement('div')
            newDiv.classList.add('ipo_item')
            newDiv.innerHTML=`
                <div class="contentBody">
                    <table>
                        <tbody>
                            <tr>
                                <td>Date</td>
                                <td>${status.date}</td>
                            </tr>
                            <tr>
                                <td>Type</td>
                                <td>${status.type}</td>
                            </tr>
                            <tr>
                                <td>From/To</td>
                                <td>${status.form_to}</td>
                            </tr>
                            <tr>
                                <td>Purpose</td>
                                <td>${status.purpose}</td>
                            </tr>
                            <tr>
                                <td>Taka</td>
                                <td>${status.taka}</td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td>${status.status}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `
    
            body.appendChild(newDiv)
        })
    }


    moneyWithdrawal()
    renderRequisitionContent()
    renderStatusContent()

    document.getElementById('requisitionContent').style.display = 'block'
    document.getElementById('statusContent').style.display = 'none'
    document.getElementById('payToMyBkash').style.display= 'none'
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

    switch(content){
        case 'requisitionContent' :
        const heading_1 = document.getElementById('heading');
        heading_1.querySelector('h1').innerHTML=`Requisition`;
        break;

        case 'statusContent' :
        const heading_2 = document.getElementById('heading');
        heading_2.querySelector('h1').innerHTML=`Status`;
        break;
    }

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



