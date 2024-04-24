async function executeB_Ipo(){
    const { fetchedUpcomingIpo, fetchedRunningIpo } = await getIpo()
    function B_sharePrice(){
        document.getElementById('page_heading').innerHTML=`Running IPO`
        document.getElementById('beforeMain').innerHTML = `
            <div class="btnGroup" id="btnGroup">
                <div onclick="show('runningIpoContent')" class="Btn active" id="history">Running</div>
                <div onclick="show('upcomingIpoContent')" class="Btn" id="upcomimg">Upcomimg</div>
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
        let upComingIPO = []
        console.log(fetchedUpcomingIpo)
        if(fetchedUpcomingIpo.status){
            upComingIPO = fetchedUpcomingIpo.Data
        }
        const ipoContentBody = document.getElementById('upcomingIpoContent')

        if(upComingIPO.length === 0){
            ipoContentBody.innerHTML = `
                <h3>No Upcoming IPO Data Found</h3>
            `
        }
        upComingIPO.forEach(async (ipo,index) => {
            const newDiv = document.createElement('div')
            newDiv.classList.add('ipo_item')
            newDiv.innerHTML=`
                <div class="contentHeader">
                <div class="ipoHeading" id="B_ipoHeading_${index}"> 
                    <h3 class="static-heading" id="B_staticHeading_${index}">${ipo.Offer_Category}</h3>
                    <h3 class="headingForIPO" id="B_DynamicHeading_${index}">${ipo.Company}</h3>
                </div>
                    <div class="subscriptionDate">
                        <h5 class="date-title">Subscription Date</h5>
                        <h5 class="date">${ipo.Start_Date}-${ipo.End_Date}</h5>
                    </div>
                </div>
    
                <div class="contentBody">
                    <table>
                        <tbody>
                            <tr>
                                <td>Platform</td>
                                <td>${ipo.Offer_Platform}</td>
                            </tr>
                            <tr>
                                <td>Cut Off Date</td>
                                <td>${ipo.cut_date}</td>
                            </tr>
                            <tr>
                                <td>Price</td>
                                <td>${ipo.Rate}</td>
                            </tr>
                            <tr>
                                <td>Minimum Application<br>Amount (Tk)</td>
                                <td>${ipo.Minamt}</td>
                            </tr>
                            <tr>
                                <td>Maximum Application<br>Amount (Tk)</td>
                                <td>${ipo.MaxAmt === 0 ? '' : ipo.MaxAmt}</td>
                            </tr>
                            <tr>
                                <td>Total Share</td>
                                <td>${ipo.Share}</td>
                            </tr><tr>
                                <td>Total Value</td>
                                <td>${ipo.Total_Value}</td>
                            </tr>
                            <tr>
                                <td>IPO Type</td>
                                <td>${ipo.IPO_Type === 0 ? 'Share': (ipo.IPO_Type === 1 ? 'Mutual Fund': (ipo.IPO_Type === 2 ? 'Bond' : 'undefined'))}</td>
                            </tr>
                            <tr>
                                <td>Quantity/Lot</td>
                                <td>${ipo.Qty}</td>
                            </tr>
                            <tr>
                                <td>NAV</td>
                                <td>${ipo.NAV}</td>
                            </tr>
                            <tr>
                                <td>EPS</td>
                                <td>${ipo.EPS}</td>
                            </tr>
                            <tr>
                                <td>Eligibility</td>
                                <td>${ipo.Offer_Eligibility}</td>
                            </tr>
                                <td>Company Prospectus</td>
                                <td>
                                    <Button class="btn">
                                        <a style='text-decoration: none; color: #000;' href='${ipo.Link_Prospectus}'>PDF</a>
                                    </Button>
                                </td>
                            </tr>
                            </tr>
                                <td>Summary</td>
                                <td>
                                    <Button class="btn">
                                        <a style='text-decoration: none; color: #000;' href='${ipo.Link_Summary}'>PDF</a>
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `
    
            ipoContentBody.appendChild(newDiv)

            async function setHeight(){
                let dynamicHeadingHeight = document.getElementById(`B_DynamicHeading_${index}`).offsetHeight;
                document.getElementById(`B_ipoHeading_${index}`).style.height = dynamicHeadingHeight + 'px';
                document.getElementById(`B_staticHeading_${index}`).style.height = '100%'
            }
            await setHeight()
            
            
        }) 
    }
    function renderRunningIpoContent(){
        let runningIPO = []
        if(fetchedRunningIpo.status){
            runningIPO = fetchedRunningIpo.Data
        }
        const ipoContentBody = document.getElementById('runningIpoContent')

        if(runningIPO.length === 0){
            ipoContentBody.innerHTML = `
                <h3 style='text-align: center;'>No Running IPO Data Found</h3>
            `
        }
        runningIPO.forEach((ipo,index) => {
            const newDiv = document.createElement('div')
            newDiv.classList.add('ipo_item')
            newDiv.innerHTML=`
            <div class="contentHeader"> 
            <div class="ipoHeading" id="R_ipoHeading_${index}"> 
                <h3 class="static-heading" id="R_staticHeading_${index}">${ipo.Offer_Category}</h3>
                <h3 class="headingForIPO" id="R_DynamicHeading_${index}">${ipo.Company}</h3>
            </div>
                <div class="subscriptionDate">
                    <h5 class="date-title">Subscription Date</h5>
                    <h5 class="date">${ipo.Start_Date}-${ipo.End_Date}</h5>
                </div>
            </div>

            <div class="contentBody">
                <table>
                    <tbody>
                        <tr>
                            <td>Platform</td>
                            <td>${ipo.Offer_Platform}</td>
                        </tr>
                        <tr>
                            <td>Cut Off Date</td>
                            <td>${ipo.cut_date}</td>
                        </tr>
                        <tr>
                            <td>Price</td>
                            <td>${ipo.Rate}</td>
                        </tr>
                        <tr>
                            <td>Minimum Application<br>Amount (Tk)</td>
                            <td>${ipo.Minamt}</td>
                        </tr>
                        <tr>
                            <td>Maximum Application<br>Amount (Tk)</td>
                            <td>${ipo.MaxAmt === 0 ? '' : ipo.MaxAmt}</td>
                        </tr>
                        <tr>
                            <td>Total Share</td>
                            <td>${ipo.Share}</td>
                        </tr><tr>
                            <td>Total Value</td>
                            <td>${ipo.Total_Value}</td>
                        </tr>
                        <tr>
                            <td>IPO Type</td>
                            <td>${ipo.IPO_Type === 0 ? 'Share': (ipo.IPO_Type === 1 ? 'Mutual Fund': (ipo.IPO_Type === 2 ? 'Bond' : 'undefined'))}</td>
                        </tr>
                        <tr>
                            <td>Quantity/Lot</td>
                            <td>${ipo.Qty}</td>
                        </tr>
                        <tr>
                            <td>NAV</td>
                            <td>${ipo.NAV}</td>
                        </tr>
                        <tr>
                            <td>EPS</td>
                            <td>${ipo.EPS}</td>
                        </tr>
                        <tr>
                            <td>Eligibility</td>
                            <td>${ipo.Offer_Eligibility}</td>
                        </tr>
                            <td>Company Prospectus</td>
                            <td>
                                <Button class="btn">
                                    <a style='text-decoration: none; color: #000;' href='${ipo.Link_Prospectus}'>PDF</a>
                                </Button>
                            </td>
                        </tr>
                        </tr>
                            <td>Summary</td>
                            <td>
                                <Button class="btn">
                                    <a style='text-decoration: none; color: #000;' href='${ipo.Link_Summary}'>PDF</a>
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `
          
            ipoContentBody.appendChild(newDiv)
            let dynamicHeadingHeight = document.getElementById(`R_DynamicHeading_${index}`).offsetHeight;
            document.getElementById(`R_ipoHeading_${index}`).style.height = dynamicHeadingHeight + 'px';
            document.getElementById(`R_staticHeading_${index}`).style.height = '100%'

        })
    }

    B_sharePrice()
    renderUpcomingIpoContent()
    renderRunningIpoContent()
    document.getElementById('upcomingIpoContent').style.display = 'none'
    document.getElementById('runningIpoContent').style.display = 'block'
}
function show(content){
    document.getElementById('upcomingIpoContent').style.display = 'none'
    document.getElementById('runningIpoContent').style.display = 'none'

    document.getElementById(content).style.display = 'block'

    switch(content){
        case 'upcomingIpoContent' :
        document.getElementById('page_heading').innerHTML=`Upcomin IPO`
        break;

        case 'runningIpoContent' :
        const heading_2 = document.getElementById('page_heading');
        document.getElementById('page_heading').innerHTML=`Running IPO`

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