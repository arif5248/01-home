function executeB_SharePrice(){
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
    function B_sharePrice(){
        document.getElementById('page_heading').innerHTML=`Upcomig/Runnung IPO`
        document.getElementById('beforeMain').innerHTML = `
            <div class="btnGroup" id="btnGroup">
                <div onclick="show('runningIpoContent')" class="Btn" id="history">Running</div>
                <div onclick="show('upcomingIpoContent')" class="Btn active" id="upcomimg">Upcomimg</div>
            </div>
            <div class="container">
                <div class="ipoContent" id="upcomingIpoContent"></div>
                <div class="ipoContent" id="runningIpoContent"></div>
            </div>
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
                <div class="ipoHeading" id="ipoHeading_${index}"> 
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
            let dynamicHeadingHeight = document.getElementById(`dynamicHeading_${index}`).offsetHeight;
            document.getElementById(`ipoHeading_${index}`).style.height = dynamicHeadingHeight + 'px';
            document.getElementById(`staticHeading_${index}`).style.height = '100%'
            
        }) 
    }
    function renderRunningIpoContent(){
        const ipoContentBody = document.getElementById('historyIpoContent')
        historyIPO.forEach((ipo,index) => {
            const newDiv = document.createElement('div')
            newDiv.classList.add('ipo_item')
            newDiv.innerHTML=`
                <div class="contentHeader">
                <div class="ipoHeading" id="historyIpoHeading_${index}"> 
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
            let dynamicHeadingHeight = document.getElementById(`history_dynamicHeading_${index}`).offsetHeight;
            document.getElementById(`historyIpoHeading_${index}`).style.height = dynamicHeadingHeight + 'px';
            document.getElementById(`history_staticHeading_${index}`).style.height = '100%'

        })
    }

    B_sharePrice()
    renderUpcomingIpoContent()
    renderRunningIpoContent()
}