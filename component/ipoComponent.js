function executeIpo(){
    const upComingIPO=[
        {
            ipo_heading: "NRB BANK LIMITED (NRBBANK)",
            sub_date: "04/02/2024-08/02/2024",
            platform: "Main Platform",
            cut_off_Date: "18/Jan/2024",
            price: 10,
            minimum_app: 10000,
            maximum_app: 100000,
            total_share: 100000000,
            total_value: 1000000000,
            ipo_type: "Share",
            quantity: 1,
            nav: 12.72,
            eps: 0.27,
            eligibility: 50000,
            companyProspectus: "#",
            summary: "#"
        },
        {
            ipo_heading: "ASIATIC LABORATORIES LIMITED (ASIATICLAB)",
            sub_date: "04/02/2024-08/02/2024",
            platform: "Main Platform",
            cut_off_Date: "25/Jan/2024",
            price: 20,
            minimum_app: 10000,
            maximum_app: 10000,
            total_share: 34545455,
            total_value: 950000000,
            ipo_type: "Share",
            quantity: 1,
            quantity: 1,
            nav: 12.72,
            eps: 0.27,
            eligibility: 50000,
            companyProspectus: "#",
            summary: "#"
        }
    ]
    const historyIPO=[
        {
            ipo_heading: "ASIATIC LABORATORIES LIMITED (ASIATICLAB)",
            sub_date: "04/02/2024-08/02/2024",
            platform: "Main Platform",
            cut_off_Date: "25/Jan/2024",
            price: 20,
            minimum_app: 10000,
            maximum_app: 10000,
            total_share: 34545455,
            total_value: 950000000,
            ipo_type: "Share",
            quantity: 1,
            quantity: 1,
            nav: 12.72,
            eps: 0.27,
            eligibility: 50000,
            companyProspectus: "#",
            summary: "#"
        },
        {
            ipo_heading: "NRB BANK LIMITED (NRBBANK)",
            sub_date: "04/02/2024-08/02/2024",
            platform: "Main Platform",
            cut_off_Date: "18/Jan/2024",
            price: 10,
            minimum_app: 10000,
            maximum_app: 100000,
            total_share: 100000000,
            total_value: 1000000000,
            ipo_type: "Share",
            quantity: 1,
            nav: 12.72,
            eps: 0.27,
            eligibility: 50000,
            companyProspectus: "#",
            summary: "#"
        },
        
    ]
    const resultIPO=[
        {
            ipo: "NAVANA PHARMACEUTIC ALS LTD",
            applicant_id: 28,
            applied_amount: 10000,
            applied_qty: 47,
            allotment_amount: 1128,
            status: "Submitted",
            result: "Won"
        },
        {
            ipo: "MEGHNA INSURANCE CO. LTD",
            applicant_id: 28,
            applied_amount: 10000,
            applied_qty: 20,
            allotment_amount: 200,
            status: "Submitted",
            result: "Won"
        },
        {
            ipo: "NAVANA PHARMACEUTIC ALS LTD",
            applicant_id: 28,
            applied_amount: 10000,
            applied_qty: 47,
            allotment_amount: 1128,
            status: "Submitted",
            result: "Won"
        },
    ]


    function ipo(){
        document.getElementById('mainContentSection').innerHTML = `
            <div class="pageHeading" id="financial-Heading">
                <div class="heading" id="heading">
                    <h1>Upcomimg IPO</h1>
                </div>
            </div>
            <div class="btnGroup" id="btnGroup">
                <div onclick="show('upcomingIpoContent')" class="Btn active" id="upcomimg">Upcomimg</div>
                <div onclick="show('historyIpoContent')" class="Btn" id="history">History</div>
                <div onclick="show('applyIpoContent')" class="Btn" id="apply">Apply</div>
                <div onclick="show('resultIpoContent')" class="Btn" id="result">Result</div>
            </div>
            <div class="container">
                <div class="ipoContent" id="upcomingIpoContent"></div>
                <div class="ipoContent" id="historyIpoContent"></div>
                <div class="ipoContent" id="applyIpoContent"></div>
                <div class="ipoContent" id="resultIpoContent"></div>
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

    function renderUpcomingIpoContent(){
        const ipoContentBody = document.getElementById('upcomingIpoContent')
        upComingIPO.forEach((ipo,index) => {
            const newDiv = document.createElement('div')
            newDiv.classList.add('ipo_item')
            newDiv.innerHTML=`
                <div class="contentHeader">
                <div class="ipoHeading"> 
                    <h3 class="static-heading" id="staticHeading_${index}">IPO</h3>
                    <h3 class="headingForIPO" id="dynamicHeading_${index}">${ipo.ipo_heading}</h3>
                </div>
                    <div class="subscriptionDate">
                        <h5 class="date-title">Subscription Date</h5>
                        <h5 class="date">${ipo.sub_date}</h5>
                    </div>
                </div>
    
                <div class="contentBody">
                    <table>
                        <tbody>
                            <tr>
                                <td>Platform</td>
                                <td>${ipo.platform}</td>
                            </tr>
                            <tr>
                                <td>Cut Off Date</td>
                                <td>${ipo.cut_off_Date}</td>
                            </tr>
                            <tr>
                                <td>Price</td>
                                <td>${ipo.price}</td>
                            </tr>
                            <tr>
                                <td>Minimum Application<br>Amount (Tk)</td>
                                <td>${ipo.minimum_app}</td>
                            </tr>
                            <tr>
                                <td>Maximum Application<br>Amount (Tk)</td>
                                <td>${ipo.maximum_app}</td>
                            </tr>
                            <tr>
                                <td>Total Share</td>
                                <td>${ipo.total_share}</td>
                            </tr><tr>
                                <td>Total Value</td>
                                <td>${ipo.total_value}</td>
                            </tr>
                            <tr>
                                <td>IPO Type</td>
                                <td>${ipo.ipo_type}</td>
                            </tr>
                            <tr>
                                <td>Quantity/Lot</td>
                                <td>${ipo.quantity}</td>
                            </tr>
                            <tr>
                                <td>NAV</td>
                                <td>${ipo.nav}</td>
                            </tr>
                            <tr>
                                <td>EPS</td>
                                <td>${ipo.eps}</td>
                            </tr>
                            <tr>
                                <td>Eligibility</td>
                                <td>${ipo.eligibility}</td>
                            </tr>
                                <td>Company Prospectus</td>
                                <td><Button class="btn">PDF</Button></td>
                            </tr>
                            </tr>
                                <td>Summary</td>
                                <td><Button class="btn">PDF</Button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `
    
            ipoContentBody.appendChild(newDiv)
            var dynamicHeadingHeight = document.getElementById(`dynamicHeading_${index}`).offsetHeight;
            document.getElementById(`staticHeading_${index}`).style.height = dynamicHeadingHeight + 'px';
        }) 
    }
    function renderHistoryIpoContent(){
        const ipoContentBody = document.getElementById('historyIpoContent')
        historyIPO.forEach((ipo,index) => {
            const newDiv = document.createElement('div')
            newDiv.classList.add('ipo_item')
            newDiv.innerHTML=`
                <div class="contentHeader">
                <div class="ipoHeading"> 
                    <h3 class="static-heading" id="history_staticHeading_${index}">IPO</h3>
                    <h3 class="headingForIPO" id="history_dynamicHeading_${index}">${ipo.ipo_heading}</h3>
                </div>
                    <div class="subscriptionDate">
                        <h5 class="date-title">Subscription Date</h5>
                        <h5 class="date">${ipo.sub_date}</h5>
                    </div>
                </div>
    
                <div class="contentBody">
                    <table>
                        <tbody>
                            <tr>
                                <td>Platform</td>
                                <td>${ipo.platform}</td>
                            </tr>
                            <tr>
                                <td>Cut Off Date</td>
                                <td>${ipo.cut_off_Date}</td>
                            </tr>
                            <tr>
                                <td>Price</td>
                                <td>${ipo.price}</td>
                            </tr>
                            <tr>
                                <td>Minimum Application<br>Amount (Tk)</td>
                                <td>${ipo.minimum_app}</td>
                            </tr>
                            <tr>
                                <td>Maximum Application<br>Amount (Tk)</td>
                                <td>${ipo.maximum_app}</td>
                            </tr>
                            <tr>
                                <td>Total Share</td>
                                <td>${ipo.total_share}</td>
                            </tr><tr>
                                <td>Total Value</td>
                                <td>${ipo.total_value}</td>
                            </tr>
                            <tr>
                                <td>IPO Type</td>
                                <td>${ipo.ipo_type}</td>
                            </tr>
                            <tr>
                                <td>Quantity/Lot</td>
                                <td>${ipo.quantity}</td>
                            </tr>
                            <tr>
                                <td>NAV</td>
                                <td>${ipo.nav}</td>
                            </tr>
                            <tr>
                                <td>EPS</td>
                                <td>${ipo.eps}</td>
                            </tr>
                            <tr>
                                <td>Eligibility</td>
                                <td>${ipo.eligibility}</td>
                            </tr>
                                <td>Company Prospectus</td>
                                <td><Button class="btn">PDF</Button></td>
                            </tr>
                            </tr>
                                <td>Summary</td>
                                <td><Button class="btn">PDF</Button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `
    
            ipoContentBody.appendChild(newDiv)
            var dynamicHeadingHeight = document.getElementById(`history_dynamicHeading_${index}`).offsetHeight;
            document.getElementById(`history_staticHeading_${index}`).style.height = dynamicHeadingHeight + 'px';
        })
    }
    function renderApplyIpoContent(){
        const ipoContentBody = document.getElementById('applyIpoContent')
        ipoContentBody.innerHTML = `
            <form action="#" method="post">

                <div class="box">
                    <div class="box-data">
                        <label for="appRefNo">Application Ref No.</label>
                        <input type="text" id="appRefNo" name="appRefNo" required>
                    </div>
                    <div class="box-data">
                        <label for="appDate">Application Date</label>
                        <input type="date" id="appDate" name="appDate" required>
                    </div>
                </div>

                <div class="box">
                    <div class="box-data">
                        <label for="availBalance">Available Balance</label>
                        <input type="number" id="availBalance" name="availBalance" required>
                    </div>
                    <div class="box-data">
                        <label for="ipoName">IPO Name</label>
                        <select id="ipoName" name="ipoName" required>
                            <option value="ipo1">IPO 1</option>
                            <option value="ipo2">IPO 2</option>
                            <!-- Add more IPO options as needed -->
                        </select>
                    </div>
                    <div class="box-data">
                        <label for="valuePerShare">Value Per Share/<br>Unit (Tk)</label>
                        <input type="number" id="valuePerShare" name="valuePerShare" required>
                    </div>
                    <div class="box-data">
                        <label for="appAmount">Application Amount</label>
                        <select id="appAmount" name="appAmount" required>
                            <option value="amount1">Amount 1</option>
                            <option value="amount2">Amount 2</option>
                            <!-- Add more amount options as needed -->
                        </select>
                    </div>
                    <div class="box-data">
                        <label for="appQuantity">Application<br>Quantity (Nos)</label>
                        <input type="number" id="appQuantity" name="appQuantity" required>
                    </div>
                    <div class="box-data">
                        <label for="confirmation">Confirmation</label>
                        <input class="checkbox" type="checkbox" id="confirmation" name="confirmation" required>
                        <label for="confirmation">I Agree</label>
                    </div>
                    <div class="submit-box">
                        <input type="submit" value="APPLY">
                    </div>
                </div>
            </form>
            `
    }
    function renderResultIpoContent(){
        
        const ipoContentBody = document.getElementById('resultIpoContent')
        resultIPO.forEach((ipo,index) => {
            const newDiv = document.createElement('div')
            newDiv.classList.add('ipo_item')
            newDiv.innerHTML=`
                <div class="contentBody">
                    <table>
                        <tbody>
                            <tr>
                                <td>IPO</td>
                                <td>${ipo.ipo}</td>
                            </tr>
                            <tr>
                                <td>Applicant Id</td>
                                <td>${ipo.applicant_id}</td>
                            </tr>
                            <tr>
                                <td>Applied Amount</td>
                                <td>${ipo.applied_amount}</td>
                            </tr>
                            <tr>
                                <td>Applied Qty</td>
                                <td>${ipo.applied_qty}</td>
                            </tr>
                            <tr>
                                <td>Allotment Amount</td>
                                <td>${ipo.allotment_amount}</td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td>${ipo.status}</td>
                            </tr>
                            <tr>
                                <td>Total Value</td>
                                <td>${ipo.result}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `
    
            ipoContentBody.appendChild(newDiv)
        })
    }


    ipo()
    renderUpcomingIpoContent()
    renderHistoryIpoContent()
    renderApplyIpoContent()
    renderResultIpoContent()

    document.getElementById('upcomingIpoContent').style.display = 'block'
    document.getElementById('historyIpoContent').style.display = 'none'
    document.getElementById('applyIpoContent').style.display = 'none'
    document.getElementById('resultIpoContent').style.display = 'none'
}

function show(content){
    document.getElementById('upcomingIpoContent').style.display = 'none'
    document.getElementById('historyIpoContent').style.display = 'none'
    document.getElementById('applyIpoContent').style.display = 'none'
    document.getElementById('resultIpoContent').style.display = 'none'

    document.getElementById(content).style.display = 'block'

    switch(content){
        case 'upcomingIpoContent' :
        const heading_1 = document.getElementById('heading');
        heading_1.querySelector('h1').innerHTML=`Upcoming IPO`;
        break;

        case 'historyIpoContent' :
        const heading_2 = document.getElementById('heading');
        heading_2.querySelector('h1').innerHTML=`History`;
        break;

        case 'applyIpoContent' :
        const heading_3 = document.getElementById('heading');
        heading_3.querySelector('h1').innerHTML=`Apply`;
        break;

        case 'resultIpoContent' :
        const heading_4 = document.getElementById('heading');
        heading_4.querySelector('h1').innerHTML=`Result`;
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



