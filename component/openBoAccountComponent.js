async function executeOpenBOAcc() {
    let boData = []
    const fetchedData = await getBoStatus(user.LoggedInInvestorId)
    if (fetchedData.status === true) {
        boData = fetchedData.Data
    }
    if (boData[0].bo_id === '') {
        route('../component/openBoFormComponent.js', '../css/openBoFormComponent.css', 'openBoForm')
        
    }

    function openBoAccount() {
        document.getElementById('mainContentSection').innerHTML =
            `
            <div class="pageHeading" id="BO-Heading">
                <div class="heading">
                    <h1>Open BO Account</h1>
                </div>
            </div>
            <div class='boContentSection'>
                <div class="container">
                    <div class="BO-content" id="BO-content"></div>
                </div>
            </div>
            <div id="pdfModal" class="pdf-modal">
                <div class="pdf-modal-content">
                    <div class='docHeading'>
                        <h5>Document Viewer</h5>
                    </div>
                    <div id='docBody' class='docBody'>
                        <div id='pdfPreviewer'></div>
                        <div style='display: none;' id='pdfLoader'>
                            <img style='width: 50px; height: auto;' src='../images/loading.gif' alt='loader'>
                        </div>
                    </div>
                    <div id="closeModal" class="close"><p>CLOSE</p></div>
                </div>
            </div>
            <div id='pdfContainer'></div>
        `
    }
{/* <iframe id="pdfIframe" src="" frameborder="0" style="width: 100%; height: 100%;"></iframe> */}
    function bo_account_details() {
        document.getElementById('BO-content').innerHTML =
            `
            <div class="BO-status">
                <h3>${boData[0].bo_id === '' ? "You Don't have BO Account. Please Click on Show BO Form" : 'BO Account Opened Successfully'}</h3>
            </div>
            
            <table>
                <tr>
                    <td>BO Number</td>
                    <td>${boData[0].bo_id}</td>
                </tr>
                <tr>
                    <td>BO Date</td>
                    <td>${boData[0].bo_date}</td>
                </tr>
                <tr>
                    <td>BO Name</td>
                    <td>${boData[0].inv_name}</td>
                </tr>
                <tr>
                    <td>CDBL BO<br>Acknowledgement</td>
                    <td><div class='pdfBtnStyle' id="pdfViewer1">View File</div></td>
                    
                </tr>
                <tr>
                    <td>All Signed Documents</td>
                    <td><div class='pdfBtnStyle' id="pdfViewer2" style="cursor: pointer;">View File</div>
                    </td>
                </tr>
            </table>
            <div class="showBOForm" id='showBOForm'>
               <h5>SHOW BO FORM</h5>
            </div>

        `
        // ========================================================//

       document.getElementById('showBOForm').addEventListener('click', ()=>{
            route('../component/openBoFormComponent.js', '../css/openBoFormComponent.css', 'openBoForm')
       })

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

          
        // ========================================================//
        document.getElementById('pdfViewer1').addEventListener('click', function () {
            
            // var pdfUrl = boData[0].CDBL;
            // document.getElementById('pdfIframe').setAttribute('src', pdfUrl);
            // document.getElementById('pdfModal').style.display = 'block';
            const pdfUrl = boData[0].CDBL;
            
            // Swal.fire({
            //     title: '<strong>HTML <u>example</u></strong>',
            //     imageHeight: 1500,
            //     html: '<div id="pdfPreviewer"></div>',
            //     showCloseButton: true,
            //     didOpen: () => {
            //      renderPDF(pdfUrl, 'pdfPreviewer');
            //     }
            //   });
            // 
            document.getElementById('pdfPreviewer').innerHTML = '';
            document.getElementById('pdfModal').style.display = 'block';
            // document.getElementById('pdfLoader').style.display = 'block';
            renderPDF(pdfUrl, 'pdfPreviewer' ) 
            
        });
        document.getElementById('pdfViewer2').addEventListener('click', async ()=> {
            var pdfUrl = boData[0].Signed;
            // var pdfUrl = '../images/123.pdf';
            
            
          
                document.getElementById('pdfPreviewer').innerHTML = '';
                document.getElementById('pdfModal').style.display = 'block';
                renderPDF(pdfUrl, 'pdfPreviewer');
               
                
          
            
            
            // document.getElementById('pdfIframe').setAttribute('src', pdfUrl);
           
        });

        document.getElementById('closeModal').addEventListener('click', function () {
            document.getElementById('pdfModal').style.display = 'none';
        });
    }

    openBoAccount()
    bo_account_details()
}