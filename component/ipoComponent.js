async function executeIpo(data , runningIpoName){
    console.log(data)
    const { fetchedUpcomingIpo, fetchedRunningIpo, fetchedHistoryIpo } = await getIpo()
    const fetchedIpoName = await getIpoName(user.LoggedInInvestorId)
    const fetchedResultIpo = await getIpoResult(user.LoggedInInvestorId)
    
    let ipoList = []
    
    function handleSelectedIpo(data){
        return function(event){
            const selectedIpo = data
            console.log(selectedIpo)
            document.getElementById('valuePerShare').value = selectedIpo.IPORate
            switch (selectedIpo.IPOType) {
                case "0":
                    document.getElementById('ipoType').value = "Share"
                    break;
                case "1":
                    document.getElementById('ipoType').value = "Bond"
                    break;
                case "2":
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
            
            for( x = Number(selectedIpo.IPOLimMin.replace(/,/g, '')); x <= Number(selectedIpo.IPOLimMax.replace(/,/g, '')); x = x + Number(selectedIpo.IPOLimStep.replace(/,/g, '')) ){
                const newOption = document.createElement('option')
                newOption.classList.add('amountItem')
                newOption.value = x;
                newOption.textContent = x.toLocaleString("en-IN");
                ApplicationAmountElement.appendChild(newOption)
            }
            ApplicationAmountElement.addEventListener('change', (event)=>{
                document.getElementById('appQuantity').value =Math.round(event.target.value / Number(selectedIpo.IPORate.replace(/,/g, '')))
                
            })
        }
        // const selectedIpo = ipoList.filter(data =>{
        //     return data.IPOName === event.target.value
        // })
        
    }
    async function renderPDF(pdfUrl, containerId) {
            var container = document.getElementById(containerId);
            async function showLoader(){
                document.getElementById('docBody').style.alignContent = 'center'
                document.getElementById('docBody').style.backgroundColor = '#F1F2F3'
                document.getElementById('pdfPreviewer').style.display = 'none'
                document.getElementById('pdfLoader').style.display = 'block'
                document.getElementById('pdfLoader').style.textAlign = 'center'
                console.log('show loader')
            }
            async function hideLoader(){
                document.getElementById('docBody').style.alignContent = 'center'
                document.getElementById('docBody').style.backgroundColor = '#fff'
                document.getElementById('pdfLoader').style.display = 'none'
                document.getElementById('pdfPreviewer').style.display = 'block'
                document.getElementById('pdfLoader').style.textAlign = 'center'
                console.log('hide loader')

            }
            async function setUpPdf(){
                await pdfjsLib.getDocument(pdfUrl).promise.then(function(pdf) {
                    // Loop through each page
                    for (var pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                      (function(pageNum) {
                        pdf.getPage(pageNum).then(function(page) {
                          var scale = 1;
                          var viewport = page.getViewport({ scale: scale });
                
                          // Create a canvas element to render the PDF page
                          var canvas = document.createElement('canvas');
                          var context = canvas.getContext('2d');
                
                          // Set canvas dimensions
                          canvas.height = viewport.height;
                          canvas.width = viewport.width;
                
                          // Append canvas to the container
                          container.appendChild(canvas);
                
                          // Render the page into the canvas context
                          var renderContext = {
                            canvasContext: context,
                            viewport: viewport
                          };
                          page.render(renderContext).promise.then(function() {
                            // Convert canvas to an image
                            var img = new Image();
                            img.src = canvas.toDataURL();
                
                            // Append the image to the container
                            container.appendChild(img);
                
                            // Optionally, you can remove the canvas if you don't need it anymore
                            canvas.remove();
                          });
                        });
                      })(pageNum);
                    }
                  });
            }
            await showLoader()
            await setUpPdf()
            await hideLoader()
            // Clear the container
            // container.innerHTML = '';
           
            
    }
    function ipo(){
        document.getElementById('mainContentSection').innerHTML = `
            <div class="modal" id="PDFModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div id="imga" class="modal-body">
                            <canvas id="pdfCanvas" style="width: 100%; height: 90vh;"></canvas>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pageHeading" id="financial-Heading">
                <div class="heading" id="heading">
                    <h1>${data}</h1>
                </div>
            </div>
            <div class="btnGroup" id="btnGroup">
                <div onclick="show('upcomingIpoContent')" class="Btn" id="Upcoming">All IPO</div>
                <div onclick="show('historyIpoContent')" class="Btn" id="history">History</div>
                <div onclick="show('applyIpoContent')" class="Btn" id="apply">Apply</div>
                <div onclick="show('resultIpoContent')" class="Btn" id="result">Result</div>
            </div>
            <div onscroll="resetLogoutTimer()" class="container allContent">
                <div class="ipoContent" id='upcomingIpoContent'>
                    <div>
                        <div class="innerHeading">
                            <h3>Running IPO</h3>
                        </div>
                        <div id='runningIPO'></div>
                    </div>
                    <div>
                        <div class="innerHeading">
                            <h3>Upcoming IPO</h3>
                        </div>
                        <div id='upcomingIPO'></div>
                    </div>
                </div>
                <div class="ipoContent" id="historyIpoContent"></div>
                <div class="ipoContent" id="applyIpoContent"></div>
                <div class="ipoContent" id="resultIpoContent"></div>
            </div>
            <div id="pdfModal" class="pdf-modal">
                <div class="pdf-modal-content">
                    <div class='docHeading'>
                        <h5>Document Viewer</h5>
                    </div>
                    <div id='docBody' class='docBody'>
                        
                        <iframe id='pdfPreviewer'style="width: 100% !important; min-width: 100% !important; *width: 100% !important; max-width: 100% !important;  border: none; height: 100% !important; min-height: 100% !important; *height: 100% !important; max-height: 100% !important; "onload="window.parent.scrollTo(0,0)" allowtransparency="true" allowfullscreen="true" allow="geolocation; microphone; camera" frameborder="0" scrolling="yes"> </iframe>
                        <div style='display: none;' id='pdfLoader'>
                            <img style='width: 50px; height: auto;' src='../images/loading.gif' alt='loader'>
                        </div>
                    </div>
                    <div id="closeModal" class="close"><p>CLOSE</p></div>
                </div>
            </div>
        `
        if(data === 'IPO Application'){
            document.getElementById('Upcoming').style.display = 'none';
            document.getElementById('history').style.display = 'none';
            document.getElementById('apply').classList.add('active');

        }else{
            document.getElementById('apply').style.display = 'none';
            document.getElementById('result').style.display = 'none';
            document.getElementById('Upcoming').classList.add('active');

        }
        document.getElementById('closeModal').addEventListener('click', function () {
            document.getElementById('pdfModal').style.display = 'none';
        });
    }

    async function renderAllIpoContent(){
        async function renderRunningIpoContent(){
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
                                <td>${ipo.Rate.toLocaleString("en-IN")}</td>
                            </tr>
                            <tr>
                                <td>Minimum Application<br>Amount (Tk)</td>
                                <td>${ipo.Minamt.toLocaleString("en-IN")}</td>
                            </tr>
                            <tr>
                                <td>Maximum Application<br>Amount (Tk)</td>
                                <td>${ipo.MaxAmt === 0 ? '' : ipo.MaxAmt.toLocaleString("en-IN")}</td>
                            </tr>
                            <tr>
                                <td>Total Share</td>
                                <td>${ipo.Share.toLocaleString("en-IN")}</td>
                            </tr><tr>
                                <td>Total Value</td>
                                <td>${ipo.Total_Value.toLocaleString("en-IN")}</td>
                            </tr>
                            <tr>
                                <td>IPO Type</td>
                                <td>${ipo.IPO_Type === 0 ? 'Share': (ipo.IPO_Type === 1 ? 'Mutual Fund': (ipo.IPO_Type === 2 ? 'Bond' : 'undefined'))}</td>
                            </tr>
                            <tr>
                                <td>Quantity/Lot</td>
                                <td>${ipo.Qty.toLocaleString("en-IN")}</td>
                            </tr>
                            <tr>
                                <td>NAV</td>
                                <td>${ipo.NAV.toLocaleString("en-IN")}</td>
                            </tr>
                            <tr>
                                <td>EPS</td>
                                <td>${ipo.EPS.toLocaleString("en-IN")}</td>
                            </tr>
                            <tr>
                                <td>Eligibility</td>
                                <td>${Number(ipo.Offer_Eligibility).toLocaleString("en-IN")}</td>
                            </tr>
                                <td>Company Prospectus</td>
                                <td>
                                    <div class='pdfViewBtn' id='RunningPdfViewerSum${index}'>View File</div>
                                </td>
                            </tr>
                            </tr>
                                <td>Summary</td>
                                <td>
                                    <div class='pdfViewBtn' id='RunningPdfViewerSum${index}'>View File</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div id='applyRunningIpo${index}' class='applyRunningIpo'><p>Apply IPO</p></div>
                </div>
            `   
                ipoContentBody.appendChild(newDiv)
                document.getElementById(`applyRunningIpo${index}`).addEventListener('click', ()=>{
                    executeIpo('IPO Application', ipo.Company)
                })
                document.getElementById(`RunningPdfViewerPros${index}`).addEventListener('click', ()=>{
                    var pdfUrl = ipo.Link_Prospectus;
                    // var pdfUrl = '../images/123.pdf';
                    renderPDF(pdfUrl, 'pdfPreviewer');
                    // document.getElementById('pdfIframe').setAttribute('src', pdfUrl);
                    document.getElementById('pdfModal').style.display = 'block';
                })
                document.getElementById(`RunningPdfViewerSum${index}`).addEventListener('click', ()=>{
                    var pdfUrl = ipo.Link_Summary;
                    // var pdfUrl = '../images/123.pdf';
                    renderPDF(pdfUrl, 'pdfPreviewer');
                    // document.getElementById('pdfIframe').setAttribute('src', pdfUrl);
                    document.getElementById('pdfModal').style.display = 'block';
                })
                let dynamicHeadingHeight = document.getElementById(`R_DynamicHeading_${index}`).offsetHeight;
                document.getElementById(`R_ipoHeading_${index}`).style.height = dynamicHeadingHeight + 'px';
                document.getElementById(`R_staticHeading_${index}`).style.height = '100%'
    
            })
        }
        async function renderUpcomingIpoContent(){
            let upComingIPO = []
            if(fetchedUpcomingIpo.status === true){
                upComingIPO = fetchedUpcomingIpo.Data
            }
            const upcomingIpoContentBody = document.getElementById('upcomingIPO')
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
                    <div class="ipoHeading" id="U_ipoHeading_${index}"> 
                        <h3 class="static-heading" id="U_staticHeading_${index}">${ipo.Offer_Category}</h3>
                        <h3 class="headingForIPO" id="U_DynamicHeading_${index}">${ipo.Company}</h3>
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
                                    <td>${ipo.Rate.toLocaleString("en-IN")}</td>
                                </tr>
                                <tr>
                                    <td>Minimum Application<br>Amount (Tk)</td>
                                    <td>${ipo.Minamt.toLocaleString("en-IN")}</td>
                                </tr>
                                <tr>
                                    <td>Maximum Application<br>Amount (Tk)</td>
                                    <td>${ipo.MaxAmt === 0 ? '' : ipo.MaxAmt.toLocaleString("en-IN")}</td>
                                </tr>
                                <tr>
                                    <td>Total Share</td>
                                    <td>${ipo.Share.toLocaleString("en-IN")}</td>
                                </tr><tr>
                                    <td>Total Value</td>
                                    <td>${ipo.Total_Value.toLocaleString("en-IN")}</td>
                                </tr>
                                <tr>
                                    <td>IPO Type</td>
                                    <td>${ipo.IPO_Type === 0 ? 'Share': (ipo.IPO_Type === 1 ? 'Mutual Fund': (ipo.IPO_Type === 2 ? 'Bond' : 'undefined'))}</td>
                                </tr>
                                <tr>
                                    <td>Quantity/Lot</td>
                                    <td>${ipo.Qty.toLocaleString("en-IN")}</td>
                                </tr>
                                <tr>
                                    <td>NAV</td>
                                    <td>${ipo.NAV.toLocaleString("en-IN")}</td>
                                </tr>
                                <tr>
                                    <td>EPS</td>
                                    <td>${ipo.EPS.toLocaleString("en-IN")}</td>
                                </tr>
                                <tr>
                                    <td>Eligibility</td>
                                    <td>${Number(ipo.Offer_Eligibility).toLocaleString("en-IN")}</td>
                                </tr>
                                <tr>
                                    <td>Company Prospectus</td>
                                    <td>
                                        <div class='pdfViewBtn' id='upPdfViewerPros${index}'>View File</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Summary</td>
                                    <td>
                                        <div class='pdfViewBtn' id='upPdfViewerSum${index}'>View File</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        
                    </div>
                `
                upcomingIpoContentBody.appendChild(newDiv)
                
                document.getElementById(`upPdfViewerPros${index}`).addEventListener('click', ()=>{
                    // var pdfUrl = ipo.Link_Prospectus;
                    // // var pdfUrl = '../images/123.pdf';
                    // renderPDF(pdfUrl, 'pdfPreviewer');
                    // // document.getElementById('pdfIframe').setAttribute('src', pdfUrl);
                    // document.getElementById('pdfModal').style.display = 'block';

                    let url = ipo.Link_Prospectus
                    const lastSlashIndex = url.lastIndexOf('/');

                    // Split the URL into two parts
                    const part1 = url.substring(0, lastSlashIndex + 1);
                    const part2 = url.substring(lastSlashIndex + 1);

                    
                    var pdfUrl =part1+encodeURIComponent(part2);
                    console.log(pdfUrl)
                    // var pdfUrl = '../images/123.pdf';
                    // renderPDF(pdfUrl, 'pdfPreviewer');
                    document.getElementById('pdfPreviewer').setAttribute('src', pdfUrl);
                    document.getElementById('pdfModal').style.display = 'block';
                })
                document.getElementById(`upPdfViewerSum${index}`).addEventListener('click', ()=>{
                    var pdfUrl = ipo.Link_Summary;
                    // var pdfUrl = '../images/123.pdf';
                    renderPDF(pdfUrl, 'pdfPreviewer');
                    // document.getElementById('pdfIframe').setAttribute('src', pdfUrl);
                    document.getElementById('pdfModal').style.display = 'block';
                })
                let dynamicHeadingHeight = document.getElementById(`U_DynamicHeading_${index}`).offsetHeight;
                document.getElementById(`U_ipoHeading_${index}`).style.height = dynamicHeadingHeight + 'px';
                document.getElementById(`U_staticHeading_${index}`).style.height = '100%'
                
            }) 
        } 
        
       await renderRunningIpoContent()
       await renderUpcomingIpoContent()
        
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
                                <td>${ipo.Rate.toLocaleString("en-IN")}</td>
                            </tr>
                            <tr>
                                <td>Minimum Application<br>Amount (Tk)</td>
                                <td>${ipo.Minamt.toLocaleString("en-IN")}</td>
                            </tr>
                            <tr>
                                <td>Maximum Application<br>Amount (Tk)</td>
                                <td>${ipo.MaxAmt === 0 ? '' : ipo.MaxAmt.toLocaleString("en-IN")}</td>
                            </tr>
                            <tr>
                                <td>Total Share</td>
                                <td>${ipo.Share.toLocaleString("en-IN")}</td>
                            </tr><tr>
                                <td>Total Value</td>
                                <td>${ipo.Total_Value.toLocaleString("en-IN")}</td>
                            </tr>
                            <tr>
                                <td>IPO Type</td>
                                <td>${ipo.IPO_Type === 0 ? 'Share': (ipo.IPO_Type === 1 ? 'Mutual Fund': (ipo.IPO_Type === 2 ? 'Bond' : 'undefined'))}</td>
                            </tr>
                            <tr>
                                <td>Quantity/Lot</td>
                                <td>${ipo.Qty.toLocaleString("en-IN")}</td>
                            </tr>
                            <tr>
                                <td>NAV</td>
                                <td>${ipo.NAV.toLocaleString("en-IN")}</td>
                            </tr>
                            <tr>
                                <td>EPS</td>
                                <td>${ipo.EPS.toLocaleString("en-IN")}</td>
                            </tr>
                            <tr>
                                <td>Eligibility</td>
                                <td>${Number(ipo.Offer_Eligibility).toLocaleString("en-IN")}</td>
                            </tr>
                                <td>Company Prospectus</td>
                                <td>

                                    <div class='pdfViewBtn' id='pdfViewer${index}'>View File</div>
                                </td>
                            </tr>
                            </tr>
                                <td>Summary</td>
                                <td>
                                    <div onclick="GetPDF('${ipo.Link_Summary}')" class='pdfViewBtn'>View File</div>
                               
                                    <div style="display:none" class='pdfViewBtn' id='pdfViewerSum${index}'>View File</div>
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

            document.getElementById(`pdfViewer${index}`).addEventListener('click', ()=>{
                var pdfUrl = ipo.Link_Prospectus;
                // var pdfUrl = '../images/123.pdf';
                renderPDF(pdfUrl, 'pdfPreviewer');
                // document.getElementById('pdfIframe').setAttribute('src', pdfUrl);
                document.getElementById('pdfModal').style.display = 'block';
            })
            document.getElementById(`pdfViewerSum${index}`).addEventListener('click', ()=>{
                var pdfUrl = ipo.Link_Summary;
                // var pdfUrl = '../images/123.pdf';
                renderPDF(pdfUrl, 'pdfPreviewer');
                // document.getElementById('pdfIframe').setAttribute('src', pdfUrl);
                document.getElementById('pdfModal').style.display = 'block';
            })
        })
    }
    function renderApplyIpoContent(runningIpoName){
        console.log(runningIpoName)
        let today = new Date().toISOString().split('T')[0];
        today = customDateConverter(today, 'defaultToCustom');
        
        const ipoContentBody = document.getElementById('applyIpoContent');
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
                        <input type="text" id="appDate" name="appDate" value= '${today}' required readonly>
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
                            <option value="default">--Choose IPO--</option>
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
                        <div>
                            <input class="checkbox" type="checkbox" id="confirmation" name="confirmation" required>
                            <label for="confirmation">I Agree</label>
                        </div>
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
                    <h5>Information</h5>
                    <p style="padding: 10px 0px;">${fetchedIpoName.message}</P>
                    <div class='cancelBtn' onclick='closeNoError()'> <p>OK</p></div>
                `
                document.getElementById('NoIpoRunning_overlay').addEventListener('click', closeNoError)

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
                    if (selectedIpo.IPOName === runningIpoName) {
                        newOption.selected = true;
                        handleSelectedIpo(selectedIpo)();
                    }
                    document.getElementById('ipoName').addEventListener('change', handleSelectedIpo(selectedIpo))
                })
                
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
                                <td>Applicant ID</td>
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
    renderApplyIpoContent(runningIpoName)
    renderResultIpoContent()
    document.getElementById('historyIpoContent').style.display = 'none'
    document.getElementById('resultIpoContent').style.display = 'none'
    document.getElementById('applyIpoContent').style.display = 'none'
    document.getElementById('upcomingIpoContent').style.display = 'none'

    if(data === 'IPO Application'){
        document.getElementById('applyIpoContent').style.display = 'block'
    }else{
        document.getElementById('upcomingIpoContent').style.display = 'block'
    }
    
    

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
                // console.log(result)
                // const result = {status: true, message: 'Succesfully Submitted the IPO Appliation'}
                if (result){
                    document.getElementById('NoIpoRunning_overlay').style.display = 'block';
                    document.getElementById('NoIpoRunning').style.display = 'block';
                    document.getElementById('NoIpoRunning').innerHTML=`
                        <h5>${result.status === true ? 'Success' : 'Failed'}</h5>
                        <p style="padding: 10px 0px;">${result.message}</p>
                        <div class='cancelBtn' onclick='closeNoError()'> <p>OK</p></div>
                    `;    
                    document.getElementById('NoIpoRunning_overlay').addEventListener('click', closeNoError)
                }
            }else{
                document.getElementById('applyIpoContent').style.overflowY = 'hidden';
                document.getElementById('applyIpoContent').style.overscrollBehaviorY = 'none';
                document.getElementById('NoIpoRunning_overlay').style.display = 'block';
                document.getElementById('NoIpoRunning').style.display = 'block';
                document.getElementById('NoIpoRunning').innerHTML=`
                    <h5>Information</h5>
                    <p style="padding: 10px 0px;">Insufficient IPO Balance</p>
                    <div class='cancelBtn' onclick='closeNoError()'> <p>OK</p></div>
                `;    
                document.getElementById('NoIpoRunning_overlay').addEventListener('click', closeNoError)
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
function GetPDF(pdfUrl) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';
             
    var loadingTask = pdfjsLib.getDocument(pdfUrl);
          loadingTask.promise.then(function(pdf) {
              pdf.getPage(1).then(function(page) {
                  var scale = .7;
                  var viewport = page.getViewport({ scale: scale });

                  var canvas = document.getElementById('pdfCanvas');
                  var context = canvas.getContext('2d');
                  canvas.height = viewport.height;
                  canvas.width = viewport.width;

                  var renderContext = {
                      canvasContext: context,
                      viewport: viewport
                  };
                  page.render(renderContext);
              });
          });
          $('#PDFModal').modal('show');
      }


