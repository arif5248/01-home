async function executeB_Ipo(){
    const { fetchedUpcomingIpo, fetchedRunningIpo } = await getIpo()
    function renderPDF(pdfUrl, containerId) {
        var container = document.getElementById(containerId);
      
        // Clear the container
        // container.innerHTML = '';
       
        pdfjsLib.getDocument(pdfUrl).promise.then(function(pdf) {
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
    function B_Ipo(){
        document.getElementById('beforeMain').innerHTML = `
            <h3 id="page_heading">Running IPO</h3>
            <div class="btnGroup" id="btnGroup">
                <div onclick="show('runningIpoContent')" class="Btn active" id="history">Running</div>
                <div onclick="show('upcomingIpoContent')" class="Btn" id="upcomimg">Upcomimg</div>
            </div>
            <div class="container" style="flex: 1 auto;height: 100%;overflow-y: auto;">
                <div class="ipoContent" id="upcomingIpoContent"></div>
                <div class="ipoContent" id="runningIpoContent"></div>
            </div>
            <div id="pdfModal" class="pdf-modal">
                <div class="pdf-modal-content">
                    <div class='docHeading'>
                        <h5>Document Viewer</h5>
                    </div>
                    <div class='docBody'>
                        <div id='pdfPreviewer'></div>
                    </div>
                    <div id="closeModal" class="close"><p>CLOSE</p></div>
                </div>
            </div>
        `
        document.getElementById('closeModal').addEventListener('click', function () {
            document.getElementById('pdfModal').style.display = 'none';
        });
    }

    function renderUpcomingIpoContent(){
        let upComingIPO = []
        if(fetchedUpcomingIpo.status){
            upComingIPO = fetchedUpcomingIpo.Data
        }
        const ipoContentBody = document.getElementById('upcomingIpoContent')

        if(upComingIPO.length === 0){
            ipoContentBody.innerHTML = `
                <h3 style='text-align: center;font-size: 14px;'>No Upcoming IPO Data Found</h3>
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
           
            ipoContentBody.appendChild(newDiv)
            document.getElementById(`upPdfViewerPros${index}`).addEventListener('click', ()=>{
                var pdfUrl = ipo.Link_Prospectus;
                // var pdfUrl = '../images/123.pdf';
                renderPDF(pdfUrl, 'pdfPreviewer');
                // document.getElementById('pdfIframe').setAttribute('src', pdfUrl);
                document.getElementById('pdfModal').style.display = 'block';
            })
            document.getElementById(`upPdfViewerSum${index}`).addEventListener('click', ()=>{
                var pdfUrl = ipo.Link_Summary;
                // var pdfUrl = '../images/123.pdf';
                renderPDF(pdfUrl, 'pdfPreviewer');
                // document.getElementById('pdfIframe').setAttribute('src', pdfUrl);
                document.getElementById('pdfModal').style.display = 'block';
            })
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
                <h3 style='text-align: center;font-size: 14px;'>No Running IPO Data Found</h3>
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

    B_Ipo()
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
        document.getElementById('page_heading').innerHTML=`Upcoming IPO`
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