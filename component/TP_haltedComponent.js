function executeTP_halted(){

    function halted(){
        document.getElementById('mainContentSection').innerHTML = `
        <div class="pageHeading" id="financial-Heading">
            <div class="heading">
                <h1>HALTED COMPANIES</h1>
            </div>
        </div>

        <div class="haltedSection">
                <div class= "container">
                    <div class= "box">
                        <div class="btnGroup" id="btnGroup">
                            <div onclick="show('no_seller')" class="Btn active" id="seller">NO SELLER</div>
                            <div onclick="show('no_buyer')"" class="Btn" id="buyer">NO BUYER</div>
                        </div>
                        <div class="buySellOrder">
                            <div class="no_seller" id="no_seller"></div>
                            <div class="no_buyer" id="no_buyer"></div>
                        </div>
                    </div>
                </div>
            </div>
        
        `
    }

    halted()
}
function show(content){
    document.getElementById('no_seller').style.display = 'none'
    document.getElementById('no_buyer').style.display = 'none'

    document.getElementById(content).style.display = 'block'

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