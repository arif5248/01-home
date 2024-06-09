async function executeMoneyDeposit(){
    let bankList = []
    let allBankList = []
    let msgList = []
    let purposeOptions = []
    let paycutmssg = []
    const fetchedMoneyDepositData = await getMoneyDepositData()
    if(fetchedMoneyDepositData.status === true){
        bankList = fetchedMoneyDepositData.bankListNew
        msgList = fetchedMoneyDepositData.msgList
        purposeOptions = fetchedMoneyDepositData.Data
        allBankList = fetchedMoneyDepositData.bankListAll
        paycutmssg = fetchedMoneyDepositData.paycutmssg
    }

    async function renderPDF(pdfUrl, containerId) {
        var container = document.getElementById(containerId);
        async function showLoader(){
            document.getElementById('docBody').style.alignContent = 'center';
            document.getElementById('docBody').style.backgroundColor = '#F1F2F3';
            document.getElementById('pdfPreviewer').style.display = 'none';
            document.getElementById('pdfLoader').style.display = 'block';
            document.getElementById('pdfLoader').style.textAlign = 'center';
        }
        async function hideLoader(){
            document.getElementById('docBody').style.alignContent = 'center';
            document.getElementById('docBody').style.backgroundColor = '#fff';
            document.getElementById('pdfLoader').style.display = 'none';
            document.getElementById('pdfPreviewer').style.display = 'block';
            document.getElementById('pdfLoader').style.textAlign = 'center';
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
    
    function moneyDeposit(){
        document.getElementById('mainContentSection').innerHTML =`
            <div class="pageHeading" id="financial-Heading">
                <div class="heading">
                    <h1>Money Deposit</h1>
                </div>
            </div>

            <div class="container">
                <div class='box bank' id='bank'>
                    <div class="heading_box">
                        <h5>Bank Deposit</h5>
                        <div class="drop-box">
                            <img onclick="show_details('bank-more','bank-up','bank-down')" id="bank-down" src="../images/icons/down-arrow.png" alt="Down Arrow">
                            <img onclick="hide_details('bank-up','bank-down')" id="bank-up" src="../images/icons/down-arrow.png" alt="Down UP">
                        </div>
                    </div>
                    <div onscroll="resetLogoutTimer()" class="box-more" id="bank-more"></div>
                </div>
            </div>

            <div class="container">
                <div class='box card' id='card'>
                    <div class="heading_box">
                        <h5>Credit/Debit Card</h5>
                        <div class="drop-box">
                            <img onclick="show_details('card-more','card-up','card-down')" id="card-down" src="../images/icons/down-arrow.png" alt="Down Arrow">
                            <img onclick="hide_details('card-up','card-down')" id="card-up" src="../images/icons/down-arrow.png" alt="Down UP">
                        </div>
                    </div>
                    <div onscroll="resetLogoutTimer()" class="box-more" id="card-more"></div>
                </div>
            </div>

            <div class="container">
                <div class='box bKash' id='bKash'>
                    <div class="heading_box">
                        <h5>Bkash Payment</h5>
                        <div class="drop-box">
                            <img onclick="show_details('bKash-more','bKash-up','bKash-down')" id="bKash-down" src="../images/icons/down-arrow.png" alt="Down Arrow">
                            <img onclick="hide_details('bKash-up','bKash-down')" id="bKash-up" src="../images/icons/down-arrow.png" alt="Down UP">
                        </div>
                    </div>
                    <div onscroll="resetLogoutTimer()" class="box-more" id="bKash-more"></div>
                </div>
            </div>
            <div class="container">
                <div class='box nagad' id='nagad'>
                    <div class="heading_box">
                        <h5>Nagad Payment</h5>
                        <div class="drop-box">
                            <img onclick="show_details('nagad-more','nagad-up','nagad-down')" id="nagad-down" src="../images/icons/down-arrow.png" alt="Down Arrow">
                            <img onclick="hide_details('nagad-up','nagad-down')" id="nagad-up" src="../images/icons/down-arrow.png" alt="Down UP">
                        </div>
                    </div>
                    <div onscroll="resetLogoutTimer()" class="box-more" id="nagad-more"></div>
                </div>
            </div>
            <div style='margin-top: 10px'class='container'>
                <div id='depositHistory' class='allDepositeBtn'>DEPOSIT HISTORY</div>
            </div>
            <div id='depositHistorySection' style='display: none;'>
                <div class='depositHisHeading'>
                    <h5>Deposit History</h5>
                </div>
                <div onscroll="resetLogoutTimer()" id='historyBody'></div>
                <div id='cancelDepHis'>
                    <p>CLOSE</p>
                </div>
            </div>
            <div class='container'>
                <div style='display: none;' id='showPopUp'></div>
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
        `
        document.getElementById('closeModal').addEventListener('click', function () {
            document.getElementById('pdfModal').style.display = 'none';
        });
        document.getElementById('overlay').addEventListener('click', function () {
            document.getElementById('pdfModal').style.display = 'none';
        });
    }
        // <div id='close_img_Box' class='close'>
        //     <img style='width:30px; height: auto' src='../images/icons/remove.png'>
        // </div>
    function renderBankList(){
        const body = document.getElementById('bank-more')
        body.innerHTML=`
            <div class="wrapper_box">
            </div>
        `

        bankList.forEach((bank) => {
            const newDiv = document.createElement('div')
            newDiv.classList.add('outer-box')
            newDiv.innerHTML = `
                <div  class="inner-box">
                    <div class="img-box">
                        <img src=${bank.Logo}>
                    </div>
                    <div class="name">
                        <h5>${bank['Bank Name']}</h5>
                    </div>
                </div>
            `
            body.querySelector('.wrapper_box').appendChild(newDiv)
            newDiv.addEventListener('click', ()=>{
                route('../component/bankDepositComponent.js','../css/bankDepositComponent.css', 'bankDeposit', [bank, purposeOptions, allBankList])
            })
        })
        
    }
    function renderCard(){
        
        let charge = Number(paycutmssg.find(item => 'bank' in item) ? paycutmssg.find(item => 'bank' in item).bank : null);

        const body = document.getElementById('card-more')
        const msg = msgList.find(item => item.Type === 'Card')
        body.innerHTML=`
            <div class="topBox">
                <h5>We Accept</h5>
                <img src="../images/payment-img/visa-master-express.png" alt="visa-master-express">
                <div class="caution">
                    <p>We are not saving any of your card information. We will redirect you to Bank's Secured Payment Gateway. Please complete payment within 10 minutes</p>
                    <p>${msg.Messages}</p>
                </div>
            </div>
            <div class="bottomBox">
            <form id='cardForm'>
                <div class="form-box-1">
                    <input type="text" value="${user.LoggedInInvestorId}" readonly>
                    <input type="text" value="${user.LoggedInInvestorName}" readonly>
                    <input type="text" value="${user.phone}" readonly>
                    <input type="email" value="${user.email}" readonly>
                </div>
                
                <div class="form-box-2">
                    <div>
                        <input type="radio" name="paymentMethod" value="visa_master" checked>
                        <label>Visa/MasterCard</label>
                    </div>
                    <div>
                        <input type="radio" name="paymentMethod" value="amex">
                        <label>Amex</label>
                    </div>
                </div>

                <div class="form-box-3">
                    <label for="amount">Payment Amount</label>
                    <input type="number" id="amount" name="amount" placeholder="Enter Taka" required>
                </div>
                <div class="form-box-3">
                    <label for="onlyCharge">Charge Amount</label>
                    <input type="number" id="onlyCharge" name="onlyCharge" placeholder="Tk" readonly required>
                </div>
                <div class="form-box-3">
                    <label for="charge">Total Amount</label>
                    <input type="number" id="charge" name="charge" placeholder="Tk" readonly required>
                </div>
                <div class="form-box-3">
                    <label for="card_purpose">Purpose</label>
                    <select id="card_purpose" name="purpose" required></select>
                </div>
                <div class="proceed-btn">
                    <input type="submit" value="PROCEED">
                </div>
            </form>
            </div>
        `
        const selectElement = document.getElementById('card_purpose')
        purposeOptions.forEach(option =>{
            const newOption = document.createElement('option')
            newOption.value = option.name;
            newOption.textContent = option.name;
            selectElement.appendChild(newOption)
        })
        const paymentMethodRadios = document.querySelectorAll('input[name="paymentMethod"]');
        paymentMethodRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                if (radio.checked) {
                    const key = radio.value === 'visa_master' ? 'bank' : 'bank_amex';
                    charge = Number(paycutmssg.find(item => key in item)?.[key]);
                    if(document.getElementById('amount').value !== ''){
                        document.getElementById('charge').value =Math.ceil( Number(document.getElementById('amount').value) + (Number(document.getElementById('amount').value) * (charge/100)))
                        document.getElementById('onlyCharge').value =Number(document.getElementById('amount').value) * (charge/100)
                    }
                }
            });
        });
        document.getElementById('amount').addEventListener('input', (event)=>{
            document.getElementById('onlyCharge').value = Number(event.target.value) * (charge/100)
            document.getElementById('charge').value =Math.ceil( Number(event.target.value) + (Number(event.target.value) * (charge/100)))
        })
    }
    function renderBkash(){
        let charge = Number(paycutmssg.find(item => 'bkash' in item) ? paycutmssg.find(item => 'bkash' in item).bkash : null);

        const body = document.getElementById('bKash-more')
        const msg = msgList.find(item => item.Type === 'bKash')
        body.innerHTML=`
            <div class="topBox">
                <img src="../images/payment-img/bkash.png" alt="bkash">
                <div class="caution">
                    <p>${msg.Messages}</p>
                </div>
            </div>
            <div class="bottomBox">
            <form id='bkash_submit'>
                <div class="form-box-1">
                    <input type="text" value="${user.LoggedInInvestorId}" readonly>
                    <input type="text" value="${user.LoggedInInvestorName}" readonly>
                    <input type="text" value="${user.phone}" readonly>
                    <input type="email" value="${user.email}" readonly>
                </div>
                <div class="form-box-3">
                    <label for="bkash_amount">Payment Amount</label>
                    <input type="number" id="bkash_amount" name="amount" placeholder="Enter Taka" required>
                </div>
                <div class="form-box-3">
                    <label for="only_bkash_charge">Charge Amount</label>
                    <input type="number" id="only_bkash_charge" name="only_bkash_charge" placeholder="Tk" required readonly>
                </div>
                <div class="form-box-3">
                    <label for="bkash_charge">Total Amount</label>
                    <input type="number" id="bkash_charge" name="charge" placeholder="Tk" readonly required>
                </div>
                <div class="form-box-3">
                    <label for="bkash_purpose">Purpose</label>
                    <select id="bkash_purpose" name="purpose" required></select>
                </div>
                <p>( bKash verification code will be sent to your bKash registered mobile number )</p>
                <div class="proceed-btn">
                    <input  type="submit" value="VERIFY">
                </div>
            </form>
            </div>
        `
        const selectElement = document.getElementById('bkash_purpose')
        purposeOptions.forEach(option =>{
            const newOption = document.createElement('option')
            newOption.value = option.name;
            newOption.textContent = option.name;
            selectElement.appendChild(newOption)
        })
        document.getElementById('bkash_amount').addEventListener('input', (event)=>{
            document.getElementById('bkash_charge').value = Math.ceil(Number(event.target.value) + (Number(event.target.value) * (charge/100)))
            document.getElementById('only_bkash_charge').value =Number(event.target.value) * (charge/100)
        })
    }
    function renderNagad(){
        let charge = Number(paycutmssg.find(item => 'nagad' in item) ? paycutmssg.find(item => 'nagad' in item).nagad : null);
        const body = document.getElementById('nagad-more')
        const msg = msgList.find(item => item.Type === 'Nagad')
        body.innerHTML=`
            <div class="topBox">
                <img src="../images/payment-img/nagad.png" alt="Nagad">
                <div class="caution">
                    <p>${msg.Messages}</p>
                </div>
            </div>
            <div class="bottomBox">
                <form id='nagad_submit'>
                    <div class="form-box-1">
                        <input type="text" value="${user.LoggedInInvestorId}" readonly>
                        <input type="text" value="${user.LoggedInInvestorName}" readonly>
                        <input type="text" value="${user.phone}" readonly>
                        <input type="email" value="${user.email}" readonly>
                    </div>

                    <div class="form-box-3">
                        <label for="nagad_amount">Payment Amount</label>
                        <input type="number" id="nagad_amount" name="nagad_amount" placeholder="Enter Taka" required>
                    </div>
                    <div class="form-box-3">
                        <label for="only_nagad_charge">Charge Amount</label>
                        <input type="number" id="only_nagad_charge" name="only_nagad_charge" placeholder="Tk" readonly required>
                    </div>
                    <div class="form-box-3">
                        <label for="nagad_charge">Total Amount</label>
                        <input type="number" id="nagad_charge" name="nagad_charge" placeholder="Tk" readonly required>
                    </div>
                    <div class="form-box-3">
                        <label for="nagad_purpose">Purpose</label>
                        <select id="nagad_purpose" name="purpose" required></select>
                    </div>
                    <p>( Nagad verification code will be sent to your Nagad registered Number )</p>
                    <div class="proceed-btn">
                        <input  type="submit" value="VERIFY">
                    </div>
                </form>
            </div>
        `
        const selectElement = document.getElementById('nagad_purpose')
        purposeOptions.forEach(option =>{
            const newOption = document.createElement('option')
            newOption.value = option.name;
            newOption.textContent = option.name;
            selectElement.appendChild(newOption)
        })
        document.getElementById('nagad_amount').addEventListener('input', (event)=>{
            document.getElementById('nagad_charge').value =Math.ceil(Number(event.target.value) + (Number(event.target.value) * (charge/100)))
            document.getElementById('only_nagad_charge').value = Number(event.target.value) * (charge/100)
        })
    }
    async function renderDepositHistory(event){
        document.getElementById('depositHistorySection').style.display = 'flex'
        document.getElementById('depositHistorySection').style.flexDirection = 'column'
        document.getElementById('overlay').style.display = 'block'
        let history = []
        const fetchedDepositHistory = await getDepositHistory(user.LoggedInInvestorId)
        if(fetchedDepositHistory.status === true){
            history = fetchedDepositHistory.Data
        }
        const hisBody = document.getElementById('historyBody')
        hisBody.innerHTML = '';
        history.forEach(data =>{
            const newDiv = document.createElement('div')
            newDiv.classList.add('box')
            newDiv.innerHTML = `
                <div class='box_item'>
                    <p>Mode</p>
                    <p>${data.Mode}</p>
                </div>
                <div class='box_item'>
                    <p>Date</p>
                    <p>${data.Date}</p>
                </div>
                <div class='box_item'>
                    <p>Purpose</p>
                    <p>${data.Purpose}</p>
                </div>
                <div class='box_item'>
                    <p>Taka</p>
                    <p>${data.Taka}</p>
                </div>
                <div class='box_item'>
                    <p>Status</p>
                    <p id='status${data.atn}'>${data.Status}</p>
                </div>
                <div style='display: none;' class='viewPdf' id='viewPdf${data.atn}'></div>
            `
            
            hisBody.appendChild(newDiv)
            document.getElementById(`viewPdf${data.atn}`).addEventListener('click', async ()=>{
                if(data.Mr_no !== ''){
                    const result = await getMrPrintFile(data.Mr_no)
                    if(result.status === true){
                        var pdfUrl = `https://docs.google.com/gview?embedded=true&url=${result.message}`;
                        
                        // var pdfUrl = '../images/123.pdf';
                        document.getElementById('pdfPreviewer').innerHTML = '';
                        document.getElementById('pdfModal').style.display = 'block';
                        renderPDF(pdfUrl, 'pdfPreviewer');
                    }
                }
            })
            if(data.Status === 'Posted'){
                document.getElementById(`viewPdf${data.atn}`).style.display = 'block'
                document.getElementById(`viewPdf${data.atn}`).innerHTML = `VIEW PDF`
                document.getElementById(`status${data.atn}`).style.color = '#4CB050'
                document.getElementById(`status${data.atn}`).style.fontSize = '15px'
                document.getElementById(`status${data.atn}`).style.fontWeight = 500
            }
            if(data.Status === 'Cancelled'){
                document.getElementById(`status${data.atn}`).style.color = 'red'
                document.getElementById(`status${data.atn}`).style.fontSize = '15px'
                document.getElementById(`status${data.atn}`).style.fontWeight = 500


            }
            if(data.Status === 'Pending'){
                document.getElementById(`viewPdf${data.atn}`).innerHTML = `DELETE`
                document.getElementById(`viewPdf${data.atn}`).style.backgroundColor = `red`
                document.getElementById(`viewPdf${data.atn}`).style.display = 'block'
                document.getElementById(`viewPdf${data.atn}`).addEventListener('click', async()=>{
                    const result =await deleteMoneyDeposit(user.LoggedInInvestorId, data.atn)
                    if(result.status){
                        document.getElementById('showPopUp').innerHTML = ''
                        document.getElementById('showPopUp').innerHTML = result.message
                        document.getElementById('showPopUp').style.display = 'block'
                        setTimeout(() => {
                            document.getElementById('showPopUp').innerHTML = ''
                            document.getElementById('showPopUp').style.display = 'none'
                        }, 3000);
                        reCallMoneyDepositHistory()
                    }
                })
            }
        })
    }
    function dropDown(){
        document.getElementById('bank-up').style.display = 'none'
        document.getElementById('card-up').style.display = 'none'
        document.getElementById('bKash-up').style.display = 'none'
        document.getElementById('nagad-up').style.display = 'none'
    }
    function hide_All_details(){
        document.getElementById('bank-more').style.display = 'none'
        document.getElementById('card-more').style.display = 'none'
        document.getElementById('bKash-more').style.display = 'none'
        document.getElementById('nagad-more').style.display = 'none'
    }
    
    moneyDeposit()
    dropDown()
    renderBankList()
    renderCard()
    renderBkash()
    renderNagad()
    hide_All_details()
    document.getElementById('depositHistory').addEventListener('click', renderDepositHistory)
    document.getElementById('cancelDepHis').addEventListener('click', ()=>{
        document.getElementById('depositHistorySection').style.display = 'none'
        document.getElementById('overlay').style.display = 'none'
    })
    document.getElementById('overlay').addEventListener('click', ()=>{
        document.getElementById('depositHistorySection').style.display = 'none'
        document.getElementById('overlay').style.display = 'none'
    })
    async function reCallMoneyDepositHistory(){
        await renderDepositHistory()
    }
    document.getElementById('cardForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const returnPageurl = window.location.origin + '/mainPage/return.html'
        const data = {
            name: user.LoggedInInvestorName,
            mobile: user.phone,
            email: user.email,
            amount: document.getElementById('charge').value,
            mrType: document.getElementById('card_purpose').value,
            payType: 'Card',
            ret: returnPageurl,
        }
        const result = await postOnlinePay01(data)
        if(result.status === true){
            window.location.href = result.Data;
        }
    })
    document.getElementById('bkash_submit').addEventListener('submit', async (event) => {
        event.preventDefault();
        const returnPageurl = window.location.origin + '/mainPage/return.html'
        const data = {
            name: user.LoggedInInvestorName,
            mobile: user.phone,
            email: user.email,
            amount: document.getElementById('bkash_charge').value,
            mrType: document.getElementById('bkash_purpose').value,
            payType: 'bkash',
            ret: returnPageurl,
        }
        const result = await postOnlinePay01(data)
        if(result.status === true){
            window.location.href = result.Data;
        }
    })
    document.getElementById('nagad_submit').addEventListener('submit', async (event) => {
        event.preventDefault();
        const returnPageurl = window.location.origin + '/mainPage/return.html'
        const data = {
            name: user.LoggedInInvestorName,
            mobile: user.phone,
            email: user.email,
            amount: document.getElementById('nagad_charge').value,
            mrType: document.getElementById('nagad_purpose').value,
            payType: 'Nagad',
            ret: returnPageurl,
        }
        
        const result = await postOtherPay01(data)
        if(result.status === true){
            window.location.href = result.Data;
        }
    })
}

function show_details(id,up,down){
    document.getElementById('bank-more').style.display = 'none'
    document.getElementById('card-more').style.display = 'none'
    document.getElementById('bKash-more').style.display = 'none'
    document.getElementById('nagad-more').style.display = 'none'

    document.getElementById(id).style.display = 'block'

    document.getElementById('bank-up').style.display = 'none'
    document.getElementById('card-up').style.display = 'none'
    document.getElementById('bKash-up').style.display = 'none'
    document.getElementById('nagad-up').style.display = 'none'

    document.getElementById('bank-down').style.display = 'block'
    document.getElementById('card-down').style.display = 'block'
    document.getElementById('bKash-down').style.display = 'block'
    document.getElementById('nagad-down').style.display = 'block'

    
    document.getElementById(down).style.display = 'none'

    document.getElementById(up).style.display = 'block'
}
function hide_details(up,down){
    document.getElementById('bank-more').style.display = 'none'
    document.getElementById('card-more').style.display = 'none'
    document.getElementById('bKash-more').style.display = 'none'
    document.getElementById('nagad-more').style.display = 'none'

    document.getElementById(down).style.display = 'block'
    document.getElementById(up).style.display = 'none'
}