async function executeTP_halted(){
    const fetchedHaltedCompany = await get_HALTED_()
    haltedCompany = fetchedHaltedCompany ? fetchedHaltedCompany : []
    function halted(){
        document.getElementById('mainContentSection').innerHTML = `
        <div class="pageHeading" id="financial-Heading">
            <div class="heading">
                <h1>Halted Companies</h1>
            </div>
        </div>
        <div class='btnSection'>
            <div class= "container">
                <div class= "box">
                    <div class="btnGroup" id="btnGroup">
                        <div onclick="show('no_seller')" class="Btn active" id="seller">NO SELLER</div>
                        <div onclick="show('no_buyer')"" class="Btn" id="buyer">NO BUYER</div>
                    </div>
                </div>
            </div>
        </div>
        <div style='flex: 1 1 auto; overflow-y: auto; height: 100%; margin-top: 5px;' class="haltedSection">
            <div class= "container">   
                <div class="buySellOrder">
                    <div class="no_seller" id="no_seller"></div>
                    <div class="no_buyer" id="no_buyer"></div>
                </div>
            </div>
        </div>
        `
    }

    function renderHaltedBuyer(){
        const tableBody = document.getElementById('no_seller')
        tableBody.innerHTML =
         `
            <table>
                <tr>
                    <th>Company</th>
                    <th>Sell Quantity</th>
                    <th>Sell Rate</th>
                </tr>
            </table>
        `;
        haltedCompany.forEach(data => {
            if(data.SQ > 0){
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${data.CNam}</td>
                    <td>${data.SQ}</td>
                    <td>${data.SP}</td>
                `;
                tableBody.querySelector('tbody').appendChild(newRow);
            }
        });
    }
    function renderHaltedSeller() {
        const tableBody = document.getElementById('no_buyer')
        tableBody.innerHTML =
         `
            <table>
                <tr>
                    <th>Company</th>
                    <th>Buy Quantity</th>
                    <th>Buy Rate</th>
                </tr>
            </table>
        `;
        haltedCompany.forEach(data => {
            if(data.BQ > 0){
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${data.CNam}</td>
                    <td>${data.BQ}</td>
                    <td>${data.BP}</td>
                `;
                tableBody.querySelector('tbody').appendChild(newRow);
            }
        });
    }
    halted()
    renderHaltedSeller()
    renderHaltedBuyer()
    document.getElementById('no_seller').style.display = 'none'
}
function show(content){
    document.getElementById('no_seller').style.display = 'block'
    document.getElementById('no_buyer').style.display = 'block'

    document.getElementById(content).style.display = 'none'

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