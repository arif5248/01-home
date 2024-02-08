function executeB_HowToPayUs(){
    function B_HowToPayUs(){
        document.getElementById('page_heading').innerHTML=`How To Pay Us`
        document.getElementById('beforeMain').innerHTML = `
        <div class="howToPayUsSection">
            <div class="container">
                <div class="payUscontent" id="payUscontent">
                    <div class="payUsMobile">
                        <div class="payUsHeading">
                            <h4>Mobile</h4>
                            <hr>
                        </div>
                        <div class="payUs">
                            <button class="payUsType">
                                <img src="../images/payment-img/bkash.png" alt="bkash">
                            </button>
                            <button class="payUsType">
                                <img src="../images/payment-img/nagad.png" alt="Nagad">
                            </button>
                        </div>
                    </div>
                    <div class="payUsCard">
                        <div class="payUsHeading">
                            <h4>Card</h4>
                            <hr>
                        </div>
                        <div class="payUs">
                            <button class="payUsType">
                                <img src="../images/payment-img/visa.png" alt="Visa">
                            </button>
                            <button class="payUsType">
                                <img src="../images/payment-img/mastarcard.png" alt="Mastar Card">
                            </button>
                            <button class="payUsType">
                                <img src="../images/payment-img/americanExpress.png" alt="American Express">
                            </button>
                        </div>
                    </div>
                    <div class="payUsBank">
                        <div class="payUsHeading">
                            <h4>Bank</h4>
                            <hr>
                        </div>
                        <div class="payUs">
                            <button class="payUsType">
                                <img src="../images/payment-img/cityBank.png" alt="City Bank">
                            </button>
                            <button class="payUsType">
                                <img src="../images/payment-img/dutch.png" alt="Dutch Bangla Bank">
                            </button>
                            <button class="payUsType">
                                <img src="../images/payment-img/eastern.png" alt="Eastern Bank">
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
    }
    


    B_HowToPayUs()
}
