function executeDividend_Record(){
    const upComingDividend=[
        {
            name: "AOL",
            record_date: "25/Jan/2024",
            agm: "18/Feb/2024",
            dividend: "1% Cash"
        },
        {
            name: "AOL",
            record_date: "25/Jan/2024",
            agm: "18/Feb/2024",
            dividend: "1% Cash"
        },
        {
            name: "AOL",
            record_date: "25/Jan/2024",
            agm: "18/Feb/2024",
            dividend: "1% Cash"
        },
        {
            name: "AOL",
            record_date: "25/Jan/2024",
            agm: "18/Feb/2024",
            dividend: "1% Cash"
        },
    ]
    const passedDividend=[
        {
            name: "KCL",
            record_date: "26/Aug/2024",
            agm: "18/Feb/2024",
            dividend: "1% Cash"
        },
        {
            name: "KCL",
            record_date: "15/Aug/2024",
            agm: "18/Feb/2024",
            dividend: "1% Cash"
        },
        {
            name: "KCL",
            record_date: "25/Jan/2024",
            agm: "18/Feb/2024",
            dividend: "1% Cash"
        },
        {
            name: "KCL",
            record_date: "22/jul/2024",
            agm: "18/Feb/2024",
            dividend: "1% Cash"
        },
        
    ]
    
    function dividendRecord(){
        document.getElementById('mainContentSection').innerHTML = `
            <div class="pageHeading" id="financial-Heading">
                <div class="heading" id="heading">
                    <h1>Dividend & Record Dates</h1>
                </div>
            </div>
            <div class="btnGroup" id="btnGroup">
                <div onclick="show('upcomingDividendContent')" class="Btn active" id="upcomimg">Upcomimg</div>
                <div onclick="show('passedDividendContent')" class="Btn" id="history">Passed</div>
            </div>
            <div class="container">
                <div class="ipoContent" id="upcomingDividendContent"></div>
                <div class="ipoContent" id="passedDividendContent"></div>
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

    function renderUpcomingDividendContent(){
        const contentBody = document.getElementById('upcomingDividendContent')
        contentBody.innerHTML =
         `
            <table>
                <tr>
                    <th>Name</th>
                    <th>Record Date</th>
                    <th>AGM</th>
                    <th>Dividend</th>
                </tr>
            </table>
        `;
        upComingDividend.forEach((data) => {
            const newRow = document.createElement('tr');
    
            newRow.innerHTML = `
                <td>${data.name}</td>
                <td>${data.record_date}</td>
                <td>${data.agm}</td>
                <td>${data.dividend}</td>
            `;
            contentBody.querySelector('tbody').appendChild(newRow);
        }) 
    }
    function renderPassedDividendContent(){
        const contentBody = document.getElementById('passedDividendContent')
        contentBody.innerHTML =
         `
            <table>
                <tr>
                    <th>Name</th>
                    <th>Record Date</th>
                    <th>AGM</th>
                    <th>Dividend</th>
                </tr>
            </table>
        `;
        passedDividend.forEach((data) => {
            const newRow = document.createElement('tr');
    
            newRow.innerHTML = `
                <td>${data.name}</td>
                <td>${data.record_date}</td>
                <td>${data.agm}</td>
                <td>${data.dividend}</td>
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



