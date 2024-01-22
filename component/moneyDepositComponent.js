function executeMoneyDeposit(){
    
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