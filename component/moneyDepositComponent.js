function executeMoneyDeposit(){
    const bankList = [
        {
            imgUrl: "../images/payment-img/cityBank.png",
            name:"The City Bank Limited"
        },
        {
            imgUrl: "../images/payment-img/dutch.png",
            name:"Dutch Bangla Bank Limited"
        },
        {
            imgUrl: "../images/payment-img/eastern.png",
            name:"Eastern Bank Limited"
        },
    ]
    
    function moneyDeposit(){
        document.getElementById('mainContentSection').innerHTML =`
            <div class="pageHeading" id="financial-Heading">
                <div class="heading">
                    <h1>Money Deposit</h1>
                </div>
            </div>

            <div class="container">
                <div class='box bank' id='bank'>
                    <div class="heading_box">
                        <h5>Bank Deposit</h5>
                        <div class="drop-box">
                            <img onclick="show_details('bank-more','bank-up','bank-down')" id="bank-down" src="../images/icons/down-arrow.png" alt="Down Arrow">
                            <img onclick="hide_details('bank-up','bank-down')" id="bank-up" src="../images/icons/down-arrow.png" alt="Down UP">
                        </div>
                    </div>
                    <div class="box-more" id="bank-more"></div>
                </div>
            </div>

            <div class="container">
                <div class='box card' id='card'>
                    <div class="heading_box">
                        <h5>Credit/Debit Card</h5>
                        <div class="drop-box">
                            <img onclick="show_details('card-more','card-up','card-down')" id="card-down" src="../images/icons/down-arrow.png" alt="Down Arrow">
                            <img onclick="hide_details('card-up','card-down')" id="card-up" src="../images/icons/down-arrow.png" alt="Down UP">
                        </div>
                    </div>
                    <div class="box-more" id="card-more"></div>
                </div>
            </div>

            <div class="container">
                <div class='box mobile' id='mobile'>
                    <div class="heading_box">
                        <h5>Bkash Payment</h5>
                        <div class="drop-box">
                            <img onclick="show_details('mobile-more','mobile-up','mobile-down')" id="mobile-down" src="../images/icons/down-arrow.png" alt="Down Arrow">
                            <img onclick="hide_details('mobile-up','mobile-down')" id="mobile-up" src="../images/icons/down-arrow.png" alt="Down UP">
                        </div>
                    </div>
                    <div class="box-more" id="mobile-more"></div>
                </div>
            </div>

            <br>  
            <br>  
            <br>  
            <br>  
            <br>  
            <br>  
            <br>  
        `
    }

    function renderBankList(){
        const body = document.getElementById('bank-more')
        body.innerHTML=`
            <div class="wrapper_box">
            </div>
        `

        bankList.forEach((bank, index) => {
            const newDiv = document.createElement('div')
            newDiv.classList.add('outer-box')
            newDiv.innerHTML = `
                <div onclick="removeFooterBtnState(); route('../component/bankDepositComponent.js','../css/bankDepositComponent.css', 'bankDeposit-${index}')" class="inner-box">
                    <div class="img-box">
                        <img src=${bank.imgUrl}>
                    </div>
                    <div class="name">
                        <h5>${bank.name}</h5>
                    </div>
                </div>
            `
            body.querySelector('.wrapper_box').appendChild(newDiv)
        })
        
    }
    function renderCard(){
        const body = document.getElementById('card-more')
        body.innerHTML=`
            <div class="topBox">
                <h5>We Accept</h5>
                <img src="../images/payment-img/visa-master-express.png" alt="visa-master-express">
                <div class="caution">
                    <p>We are not saving any of your card information. We will redirect you to Bank's Secured Payment Gateway. Please complete payment within 10 minutes</p>
                    <p>Additional 2.5% for Visa/Master and 4% for Amex card will be charged on payment amount.</p>
                </div>
            </div>
            <div class="bottomBox">
            <form action="#">
                <div class="form-box-1">
                    <input type="text" value="28" readonly>
                    <input type="text" value="MD. KAISER RAIHAN" readonly>
                    <input type="text" value="01857024681" readonly>
                    <input type="email" value="xyz@gmail.com" readonly>
                </div>
                
                <div class="form-box-2">
                    <div>
                        <input type="radio" name="paymentMethod" value="visa_master" checked>
                        <label>Visa/MasterCard</label>
                    </div>
                    <div>
                        <input type="radio" name="paymentMethod" value="amex">
                        <label>Amex</label>
                    </div>
                </div>

                <div class="form-box-3">
                    <label for="amount">Payment Amount</label>
                    <input type="number" id="amount" name="amount" placeholder="Enter Taka" required>
                </div>
                <div class="form-box-3">
                    <label for="charge">Chargeable Amount</label>
                    <input type="number" id="charge" name="charge" placeholder="Tk" readonly required>
                </div>
                <div class="form-box-3">
                    <label for="purpose">IPO Name</label>
                    <select id="purpose" name="purpose" required>
                        <option value="invest">Invest</option>
                        <option value="cdbl_fee">CDBL fee</option>
                        <!-- Add more IPO options as needed -->
                    </select>
                </div>
                <div class="proceed-btn">
                    <input type="submit" value="PROCEED">
                </div>
            </form>
            </div>
        `
    }
    function renderBkash(){
        const body = document.getElementById('mobile-more')
        body.innerHTML=`
            <div class="topBox">
                <img src="../images/payment-img/bkash.png" alt="bkash">
                <div class="caution">
                    <p>Additional 2.5% will be charged on payment amount.</p>
                </div>
            </div>
            <div class="bottomBox">
            <form action="#">
                <div class="form-box-1">
                    <input type="text" value="28" readonly>
                    <input type="text" value="MD. KAISER RAIHAN" readonly>
                    <input type="text" value="01857024681" readonly>
                    <input type="email" value="xyz@gmail.com" readonly>
                </div>

                <div class="form-box-3">
                    <label for="amount">Payment Amount</label>
                    <input type="number" id="amount" name="amount" placeholder="Enter Taka" required>
                </div>
                <div class="form-box-3">
                    <label for="charge">Chargeable Amount</label>
                    <input type="number" id="charge" name="charge" placeholder="Tk" readonly required>
                </div>
                <div class="form-box-3">
                    <label for="purpose">IPO Name</label>
                    <select id="purpose" name="purpose" required>
                        <option value="invest">Invest</option>
                        <option value="cdbl_fee">CDBL fee</option>
                        <!-- Add more IPO options as needed -->
                    </select>
                </div>
                <p>( bkash verification code will be sent to your bkash registered mobile number )</p>
                <div class="proceed-btn">
                    <input type="submit" value="VERIFY">
                </div>
            </form>
            </div>
        `
    }

    function dropDown(){
        document.getElementById('bank-up').style.display = 'none'
        document.getElementById('card-up').style.display = 'none'
        document.getElementById('mobile-up').style.display = 'none'
    }
    function hide_All_details(){
        document.getElementById('bank-more').style.display = 'none'
        document.getElementById('card-more').style.display = 'none'
        document.getElementById('mobile-more').style.display = 'none'
    }
    
    moneyDeposit()
    dropDown()
    renderBankList()
    renderCard()
    renderBkash()
    hide_All_details()
}

function show_details(id,up,down){
    document.getElementById('bank-more').style.display = 'none'
    document.getElementById('card-more').style.display = 'none'
    document.getElementById('mobile-more').style.display = 'none'

    document.getElementById(id).style.display = 'block'

    document.getElementById('bank-up').style.display = 'none'
    document.getElementById('card-up').style.display = 'none'
    document.getElementById('mobile-up').style.display = 'none'

    document.getElementById('bank-down').style.display = 'block'
    document.getElementById('card-down').style.display = 'block'
    document.getElementById('mobile-down').style.display = 'block'

    
    document.getElementById(down).style.display = 'none'

    document.getElementById(up).style.display = 'block'
}
function hide_details(up,down){
    document.getElementById('bank-more').style.display = 'none'
    document.getElementById('card-more').style.display = 'none'
    document.getElementById('mobile-more').style.display = 'none'

    document.getElementById(down).style.display = 'block'
    document.getElementById(up).style.display = 'none'
}