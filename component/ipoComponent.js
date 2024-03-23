async function executeIpo(){
    const { fetchedUpcomingIpo, fetchedRunningIpo, fetchedHistoryIpo } = await getIpo()
    const fetchedIpoName = await getIpoName(user.LoggedInInvestorId)
    const fetchedResultIpo = await getIpoResult(user.LoggedInInvestorId)
    
    let ipoList = []
    
    function handleSelectedIpo(event){
        const selectedIpo = ipoList.filter(data =>{
            return data.IPOName === event.target.value
        })
        document.getElementById('valuePerShare').value = selectedIpo[0].IPORate
         switch (selectedIpo[0].IPOType) {
            case 0:
                document.getElementById('ipoType').value = "Share"
                break;
            case 1:
                document.getElementById('ipoType').value = "Bond"
                break;
            case 2:
                document.getElementById('ipoType').value = "Mutual Fund"
                break;
        
            default:
                break;
        } 

        const ApplicationAmountElement = document.getElementById('appAmount')

        const existList = document.querySelectorAll('.amountItem');
        if(existList){
            existList.forEach(item => {
                item.remove();
            });
        } 
        
        for( x = Number(selectedIpo[0].IPOLimMin.replace(/,/g, '')); x <= Number(selectedIpo[0].IPOLimMax.replace(/,/g, '')); x = x + Number(selectedIpo[0].IPOLimStep.replace(/,/g, '')) ){
            const newOption = document.createElement('option')
            newOption.classList.add('amountItem')
            newOption.value = x;
            newOption.textContent = x.toLocaleString("en-IN");
            ApplicationAmountElement.appendChild(newOption)
        }
        ApplicationAmountElement.addEventListener('change', (event)=>{
            document.getElementById('appQuantity').value =Math.round(event.target.value / Number(selectedIpo[0].IPORate.replace(/,/g, '')))
            
        })
    }
    function ipo(){
        document.getElementById('mainContentSection').innerHTML = `
            <div class="pageHeading" id="financial-Heading">
                <div class="heading" id="heading">
                    <h1>Upcomimg & Running IPO</h1>
                </div>
            </div>
            <div class="btnGroup" id="btnGroup">
                <div onclick="show('upcomingIpoContent')" class="Btn active" id="upcomimg">All IPO</div>
                <div onclick="show('historyIpoContent')" class="Btn" id="history">History</div>
                <div onclick="show('applyIpoContent')" class="Btn" id="apply">Apply</div>
                <div onclick="show('resultIpoContent')" class="Btn" id="result">Result</div>
            </div>
            <div class="container allContent">
                <div class="ipoContent" id='upcomingIpoContent'>
                    <div>
                        <div class="heading" id="heading">
                            <h1>Running IPO</h1>
                        </div>
                        <div id='runningIPO'></div>
                    </div>
                    <div>
                        <div class="heading" id="heading">
                            <h1>Upcomimg IPO</h1>
                        </div>
                        <div id='upcomingIPO'></div>
                    </div>
                </div>
                <div class="ipoContent" id="historyIpoContent"></div>
                <div class="ipoContent" id="applyIpoContent"></div>
                <div class="ipoContent" id="resultIpoContent"></div>
            </div>
        `
    }

    function renderAllIpoContent(){
        function renderRunningIpoContent(){
            let runningIPO = []
            if(fetchedRunningIpo.status === true){
                runningIPO = fetchedRunningIpo.Data
            }
            const ipoContentBody = document.getElementById('runningIPO')
            
            if(runningIPO.length === 0){
                ipoContentBody.innerHTML = `
                    <h3 class='NoIPO' style='text-align: center;'>No Running IPO Found</h3>
                `
            }
            runningIPO.forEach((ipo,index) => {
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
                                        <a href='${ipo.Link_Prospectus}'>PDF</a>
                                    </Button>
                                </td>
                            </tr>
                            </tr>
                                <td>Summary</td>
                                <td>
                                    <Button class="btn">
                                        <a href='${ipo.Link_Summary}'>PDF</a>
                                    </Button>
                                </td>
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
        function renderUpcomingIpoContent(){
            let upComingIPO = []
            if(fetchedUpcomingIpo.status === true){
                upComingIPO = fetchedUpcomingIpo.Data
            }
            const upcomingIpoContentBody = document.getElementById('upcomingIPO')
            console.log('=======',upComingIPO)
            if(upComingIPO.length === 0){
                upcomingIpoContentBody.innerHTML = `
                    <h3 class='NoIPO' style='text-align: center;'>No Upcoming IPO Found</h3>
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
                                            <a href='${ipo.Link_Prospectus}'>PDF</a>
                                        </Button>
                                    </td>
                                </tr>
                                </tr>
                                    <td>Summary</td>
                                    <td>
                                        <Button class="btn">
                                            <a href='${ipo.Link_Summary}'>PDF</a>
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                `
        
                upcomingIpoContentBody.appendChild(newDiv)
    
                async function setHeight(){
                    let dynamicHeadingHeight = document.getElementById(`B_DynamicHeading_${index}`).offsetHeight;
                    document.getElementById(`B_ipoHeading_${index}`).style.height = dynamicHeadingHeight + 'px';
                    document.getElementById(`B_staticHeading_${index}`).style.height = '100%'
                }
                setHeight()
                
                
            }) 
        } 
        
        renderRunningIpoContent()
        renderUpcomingIpoContent()
        
    }
    function renderHistoryIpoContent(){
        let historyIPO = []

        if(fetchedHistoryIpo.status === true){
            historyIPO = fetchedHistoryIpo.Data
        }
        const historyIpoContentBody = document.getElementById('historyIpoContent')
        if(historyIPO.length === 0){
            historyIpoContentBody.innerHTML = `
                <h3 class='NoIPO' style='text-align: center;'>No History IPO Found</h3>
            `
        }

        historyIPO.forEach((ipo,index) => {
            const newDiv = document.createElement('div')
            newDiv.classList.add('ipo_item')
            newDiv.innerHTML=`
                <div class="contentHeader">
                <div class="ipoHeading" id="historyIpoHeading_${index}"> 
                    <h3 class="static-heading" id="history_staticHeading_${index}">${ipo.Offer_Category}</h3>
                    <h3 class="headingForIPO" id="history_dynamicHeading_${index}">${ipo.Company}</h3>
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
                                        <a href='${ipo.Link_Prospectus}'>PDF</a>
                                    </Button>
                                </td>
                            </tr>
                            </tr>
                                <td>Summary</td>
                                <td>
                                    <Button class="btn">
                                        <a href='${ipo.Link_Summary}'>PDF</a>
                                    </Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `
    
            historyIpoContentBody.appendChild(newDiv)
            let dynamicHeadingHeight = document.getElementById(`history_dynamicHeading_${index}`).offsetHeight;
            document.getElementById(`historyIpoHeading_${index}`).style.height = dynamicHeadingHeight + 'px';
            document.getElementById(`history_staticHeading_${index}`).style.height = '100%'

        })
    }
    function renderApplyIpoContent(){
        const today =  new Date().toISOString().split('T')[0];
        
        const ipoContentBody = document.getElementById('applyIpoContent')
        ipoContentBody.innerHTML = `
            <div style='display: none' id = 'NoIpoRunning_overlay'> </div>
            <div style='display: none' id='NoIpoRunning'></div>
            
            <form id='ipoApplyForm' method="post">
                <div class="box">
                    <div class="box-data">
                        <label for="appRefNo">Application Ref No.</label>
                        <input type="text" id="appRefNo" name="appRefNo" readonly>
                    </div>
                    <div class="box-data">
                        <label for="appDate">Application Date</label>
                        <input type="date" id="appDate" name="appDate" value= '${today}' required readonly>
                    </div>
                </div>

                <div class="box">
                    <div class="box-data">
                        <label for="availBalance">Available Balance</label>
                        <input type="number" id="availBalance" name="availBalance" value='${fetchedIpoName.balance}' required readonly>
                    </div>
                    <div class="box-data">
                        <label for="ipoName">IPO Name</label>
                        <select id="ipoName" name="ipoName" required>
                            <option value="default">--Choose Ipo--</option>
                        </select>
                    </div>
                    <div class="box-data">
                        <label for="valuePerShare">Value Per Share/<br>Unit (Tk)</label>
                        <input id='valuePerShare' type="text" id="valuePerShare" name="valuePerShare" required readonly>
                    </div>
                    <div class="box-data">
                        <label for="appAmount">Application Amount</label>
                        <select id="appAmount" name="appAmount" required>
                            <option value="default">--Choose Option--</option>
                        </select>
                    </div>
                    <div class="box-data">
                        <label for="appQuantity">Application<br>Quantity (Nos)</label>
                        <input type="number" id="appQuantity" name="appQuantity" required readonly>
                    </div>
                    <div class="box-data">
                        <label for="ipoType">IPO Type</label>
                        <input type="text" id="ipoType" name="ipoType" required readonly>
                    </div>
                    <div class="box-data">
                        <label for="confirmation">Confirmation</label>
                        <input class="checkbox" type="checkbox" id="confirmation" name="confirmation" required>
                        <label for="confirmation">I Agree</label>
                    </div>
                    <div style='text-align: center; height: 40px;' id='showErrorInIpoApply'></div>
                    <div class="submit-box">
                        <input type="submit" value="APPLY">
                    </div>
                </div>
            </form>
            `
            if(fetchedIpoName.status === false){
                document.getElementById('NoIpoRunning_overlay').style.display = 'block'
                document.getElementById('NoIpoRunning').style.display = 'block'
                document.getElementById('NoIpoRunning').innerHTML=`
                    <p>Error</p>
                    <p>${fetchedIpoName.message}</P>
                    <hr style='opacity: 1;'>
                    <div style='margin-top: 5px;color: #0f0f87;font-weight: 600;' id='cancelBtn' onclick='closeNoError()'>OK</div>
                `
                

            }
            const ipoNameElement = document.getElementById('ipoName')
            if(fetchedIpoName.status === true){
                ipoList = fetchedIpoName.IPOList
                ipoList.forEach( selectedIpo =>{
                    const newOption = document.createElement('option')
                    newOption.setAttribute('id', `${selectedIpo.IPOName}`);
                    newOption.value = selectedIpo.IPOName;
                    newOption.textContent = selectedIpo.IPOName;
                    ipoNameElement.appendChild(newOption)
                })
                document.getElementById('ipoName').addEventListener('change', handleSelectedIpo)
            }
            
    }
    function renderResultIpoContent(){
        let resultIPO = []
        if(fetchedResultIpo.status === true){
            resultIPO = fetchedResultIpo.IPOResult
        }
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
                                <td>${ipo.id}</td>
                            </tr>
                            <tr>
                                <td>Applied Amount</td>
                                <td>${ipo.amount_app}</td>
                            </tr>
                            <tr>
                                <td>Applied Qty</td>
                                <td>${ipo.qty}</td>
                            </tr>
                            <tr>
                                <td>Allotment Amount</td>
                                <td>${ipo.amount_allo}</td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td>${ipo.status}</td>
                            </tr>
                            <tr>
                                <td>Total Value</td>
                                <td id='resultStyle${index}'>${ipo.result}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            `
    
            ipoContentBody.appendChild(newDiv)
            document.getElementById(`resultStyle${index}`).style.color = ipo.result === 'Won' ? '#04a41e' : '#fe0000'
            document.getElementById(`resultStyle${index}`).style.fontWeight = '700'
        })
    }


    ipo()
    renderAllIpoContent()
    renderHistoryIpoContent()
    renderApplyIpoContent()
    renderResultIpoContent()

    document.getElementById('upcomingIpoContent').style.display = 'block'
    document.getElementById('historyIpoContent').style.display = 'none'
    document.getElementById('applyIpoContent').style.display = 'none'
    document.getElementById('resultIpoContent').style.display = 'none'

    document.getElementById('ipoApplyForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        document.getElementById('showErrorInIpoApply').innerHTML= ''
        document.getElementById('ipoName').style.borderColor = '#000'
        document.getElementById('appAmount').style.borderColor = '#000'


        if(document.getElementById('ipoName').value === 'default' || document.getElementById('appAmount').value === 'default' ){
            if(document.getElementById('ipoName').value === 'default'){
                const newP = document.createElement('p')
                newP.innerHTML = `
                    Please select a IPO. &nbsp
                `
                document.getElementById('showErrorInIpoApply').append(newP)
                newP.style.display = 'inline-block'
                newP.style.color = 'red'
                document.getElementById('ipoName').style.borderColor = 'red'
            }
            if(document.getElementById('appAmount').value === 'default'){
                const newP = document.createElement('p')
                newP.innerHTML = `
                    Please select a Amount.
                `
                document.getElementById('showErrorInIpoApply').append(newP)
                newP.style.color = 'red'
                newP.style.display = 'inline-block'
                document.getElementById('appAmount').style.borderColor = 'red'
            }
        }else{
            if(fetchedIpoName.balance >= Number(document.getElementById('appAmount').value)){
                const formData = new FormData();
                
                formData.append('inv_id', user.LoggedInInvestorId);
                formData.append('applicant_id', user.LoggedInInvestorId);
                formData.append('ipo_name', document.getElementById('ipoName').value);
                formData.append('ipo_qty', document.getElementById('appAmount').value);

                const result = await ipoApply(formData)
            }else{
                document.getElementById('applyIpoContent').style.overflowY = 'hidden';
                document.getElementById('applyIpoContent').style.overscrollBehaviorY = 'none';
                document.getElementById('NoIpoRunning_overlay').style.display = 'block';
                document.getElementById('NoIpoRunning').style.display = 'block';
                document.getElementById('NoIpoRunning').innerHTML=`
                    <p>Error</p>
                    <p>Insufficient IPO Balance</p>
                    <hr style='opacity: 1;'>
                    <div style='margin-top: 5px;color: #0f0f87;font-weight: 600;' id='cancelBtn' onclick='closeNoError()'>OK</div>
                `;    
            }
        }
    })
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
        heading_1.querySelector('h1').innerHTML=`Upcoming & Running IPO`;
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
function closeNoError(){
    document.getElementById('NoIpoRunning').style.display = 'none'
    document.body.style.overflow = 'scroll';
    document.getElementById('NoIpoRunning_overlay').style.display = 'none'
    document.getElementById('applyIpoContent').style.overflowY = 'auto'
    document.getElementById('applyIpoContent').style.overscrollBehaviorY = 'auto'
}



