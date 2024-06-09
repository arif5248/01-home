async function executeDividend_Record(){
    let upComingDividend= []
    let passedDividend=[]

    const  fetchedUpcomingDividend = await getUpcomingDividend()
    const fetchedPassedDividend = await getPassedDividend()
    if(fetchedUpcomingDividend.status === true){
        upComingDividend = fetchedUpcomingDividend.Data
    }
    if(fetchedPassedDividend.status === true){
        passedDividend = fetchedPassedDividend.Data
    }
    
    
    
    function dividendRecord(){
        document.getElementById('mainContentSection').innerHTML = `
            <div class="pageHeading" id="financial-Heading">
                <div class="heading" id="heading">
                    <h1>Dividend & Record Dates</h1>
                </div>
            </div>
            <div class="btnGroup" id="btnGroup">
                <div onclick="show('upcomingDividendContent')" class="Btn active" id="upcomig">Upcoming</div>
                <div onclick="show('passedDividendContent')" class="Btn" id="history">Passed</div>
            </div>
            <div style="flex: 1 auto;height: 100%;overflow-y: auto;" class="container">
                <div class="ipoContent" id="upcomingDividendContent"></div>
                <div class="ipoContent" id="passedDividendContent"></div>
            </div>
            
        `
    }

    function renderUpcomingDividendContent(){
        const contentBody = document.getElementById('upcomingDividendContent')
        contentBody.innerHTML =
         `
            <table>
                <tbody></tbody>
            </table>
        `;
        upComingDividend.forEach((data) => {
            const newRow = document.createElement('tr');
                
            newRow.innerHTML = `
                <div class='boxItem'>
                    <div class='headingRow innerRow'>
                        <div class='innerCol1'>
                            <h5 class='itemHeading'>${data.Company}</h5>
                        </div>
                        <div class='itemDeclarationDate innerCol2'>
                            <p>Declaration Date:</p>
                            <p>${data.DeclarationDate}</p>
                        </div>
                    </div>
                    <div class='innerRow'>
                        <div class='innerCol1'>
                            <p>Record Date: </p>
                        </div>
                        <div class='innerCol2'>
                            <p>${data.RecordDate}</p>
                        </div>
                    </div>
                    <div class='innerRow'>
                        <div class='innerCol1'>
                            <p>AGM: </p>
                        </div>
                        <div class='innerCol2'>
                            <p>${data.AGM}</p>
                        </div>
                    </div>
                    <div class='footerRow innerRow'>
                        <div class='innerCol1'>
                            <p>Dividend: </p>
                        </div>
                        <div class='innerCol2'>
                            <p>${data.Dividend}</p>
                        </div>
                    </div>
                </div>
            `;
            contentBody.querySelector('tbody').appendChild(newRow);
        }) 
    }
    function renderPassedDividendContent(){
        const contentBody = document.getElementById('passedDividendContent')
        contentBody.innerHTML =
         `
            <table>
                <tbody></tbody>
            </table>
        `;
        passedDividend.forEach((data) => {
            const newRow = document.createElement('tr');
    
            newRow.innerHTML = `
            <div class='boxItem'>
                <div class='headingRow innerRow'>
                    <div class='innerCol1'>
                        <h5 class='itemHeading'>${data.Company}</h5>
                    </div>
                    <div class='itemDeclarationDate innerCol2'>
                        <p>Declaration Date:</p>
                        <p>${data.DeclarationDate}</p>
                    </div>
                </div>
                <div class='innerRow'>
                    <div class='innerCol1'>
                        <p>Record Date: </p>
                    </div>
                    <div class='innerCol2'>
                        <p>${data.RecordDate}</p>
                    </div>
                </div>
                <div class='innerRow'>
                    <div class='innerCol1'>
                        <p>AGM: </p>
                    </div>
                    <div class='innerCol2'>
                        <p>${data.AGM}</p>
                    </div>
                </div>
                <div class='footerRow innerRow'>
                    <div class='innerCol1'>
                        <p>Dividend: </p>
                    </div>
                    <div class='innerCol2'>
                        <p>${data.Dividend}</p>
                    </div>
                </div>
            </div>
            `;
            contentBody.querySelector('tbody').appendChild(newRow);
        }) 
    }


    dividendRecord()
    renderUpcomingDividendContent()
    renderPassedDividendContent()

    document.getElementById('upcomingDividendContent').style.display = 'block'
    document.getElementById('passedDividendContent').style.display = 'none'
}

function show(content){
    document.getElementById('upcomingDividendContent').style.display = 'none'
    document.getElementById('passedDividendContent').style.display = 'none'

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



