async function executeBankDeposit(data){
    const bank = data[0]
    const purposeOptions = data[1]
    const allBankList = data[2]
    let counryCode = []
    let shareTo = 'Telegram'

    const fetchedCountryCode = await getCountryCode()
    if(fetchedCountryCode.status === true){
        counryCode = fetchedCountryCode.CCodeList
    }

    function handleClickBox(id){
        return function(event){  
            document.getElementById('telegramBox').classList.remove('activeSharedBox')
            document.getElementById('emailBox').classList.remove('activeSharedBox')
            document.getElementById('telegramInput').style.display = 'none'
            document.getElementById('emailInput').style.display = 'none'

            document.getElementById(id).classList.add('activeSharedBox');
            shareTo = id
            switch (id) {
                case 'telegramBox':
                    document.getElementById('telegramInput').style.display = 'block'
                    document.getElementById('emailInput').style.display = 'none'
                    document.getElementById('sharedToEmail').value = ''
                    document.getElementById('showError').innerHTML = ''
                    shareTo = 'Telegram'
                    break;
                case 'emailBox':
                    document.getElementById('telegramInput').style.display = 'none'
                    document.getElementById('telegramNumber').value = ''
                    document.getElementById('showError').innerHTML = ''
                    document.getElementById('emailInput').style.display = 'block'
                    shareTo = 'Email'
                    break;
            }
        }
    }

    function moneyDeposit(){
        document.getElementById('mainContentSection').innerHTML =`
            <div class="pageHeading" id="financial-Heading">
                <div class="heading">
                    <h1>Bank Deposit</h1>
                </div>
            </div>
            <div class="container">
                <div class="bottomBox">
                    <div class='shareBox'>
                        <div id='shareBankDetails' class='shareImageBox'>
                            <img src='../images/icons/share.png' alt='Share' style='width: 30px; height: auto;'>
                            Share Bank Details
                        </div>
                    </div>
                    <form action="#">
                        <div class="form-box-1">
                            <input type="text" value='${bank['Account Name']}' readonly>
                            <input type="text" value='${bank['Account Number']}' readonly>
                            <input type="text" value='${bank['Bank Name']}' readonly>
                            <input type="text" value='${bank.Branch}' readonly>
                        </div>

                        <div class="form-box-3">
                            <label for="amount">Deposit Amount</label>
                            <input type="number" id="amount" name="amount" placeholder="Enter Taka" required>
                        </div>
                        <div class="form-box-3">
                            <label for="date">Deposit Date</label>
                            <input type="date" id="date" name="date" required>
                        </div>
                        <div class="form-box-3">
                            <label for="bank_purpose">Purpose</label>
                            <select id="bank_purpose" name="purpose" required></select>
                        </div>
                        <div class="form-box-2">
                            <div>
                                <input type="radio" name="paymentMethod" value="Cash" checked>
                                <label>Cash</label>
                            </div>
                            <div>
                                <input type="radio" name="paymentMethod" value="Cheque">
                                <label>Cheque</label>
                            </div>
                            <div>
                                <input type="radio" name="paymentMethod" value="Bank Transfer">
                                <label>Bank Transfer</label>
                            </div>
                        </div>
                        <div class="text-box">
                            <textarea placeholder="Enter your notes here" id="dynamic-textbox" rows="1" oninput="resizeTextbox(this)"></textarea>
                        </div>
                        <div id='chequeMode' style='display: none;'>
                            <div class="form-box-3">
                                <label for="chequeNo">Cheque No.</label>
                                <input type="text" id="chequeNo" name="chequeNo" placeholder="Enter Cheque Number" required>
                            </div>
                            <div class="form-box-3">
                                <label for="chequeBankName">Select Bank</label>
                                <select id="chequeBankName" name="chequeBankName" required>
                                    <option>--Select a Bank--</option>
                                </select>
                            </div>
                        </div>
                        <div class="fileContent">
                            <div class="file-box">
                                <label for="file-input" id="file-label">Browse</label>
                                <input type="file" id="file-input" onchange="previewFile()">
                            </div>
                            <h5>Attach your Deposit Proof here</h5>
                            <div id="preview-container">
                                <img id="preview-image" alt="File Preview">
                                <div id="undo-button" onclick="undoSelection()">
                                    <img src="../images/icons/remove.png" alt="close">
                                </div>
                            </div>
                        </div>

                        <div class="proceed-btn">
                            <input type="button" value="Cancel" onclick="removeFooterBtnState(); route('../component/moneyDepositComponent.js','../css/moneyDepositComponent.css', 'moneyDeposit')">
                            <input type="submit" value="PROCEED">
                        </div>
                    </form>
                </div>
            </div>
            <div style='display: none;' id='shareBankDetailsBox'></div>
            <div style='display: none;' id='shareBankDetailsMsg'></div>
        `
        const selectElement = document.getElementById('bank_purpose')
        purposeOptions.forEach(option =>{
            const newOption = document.createElement('option')
            newOption.value = option.name;
            newOption.textContent = option.name;
            selectElement.appendChild(newOption)
        })
        
        allBankList.forEach(option =>{
            const newOption = document.createElement('option')
            newOption.value = option['Bank Name'];
            newOption.textContent = option['Bank Name'];
            document.getElementById('chequeBankName').appendChild(newOption)
        })
        document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === 'Cheque') {
                    document.getElementById('chequeMode').style.display = 'block';
                } else {
                    document.getElementById('chequeMode').style.display = 'none';
                }
            });
        });
    }

    moneyDeposit()
    document.getElementById('shareBankDetails').addEventListener('click', ()=>{
        document.getElementById('overlay').style.display = 'block'
        document.getElementById('shareBankDetailsBox').style.display = 'block'
        document.getElementById('shareBankDetailsBox').innerHTML = `
            <div class='outerBox'>
                <div class="heading">
                    <h5>Share Bank Account Details</h5>
                </div>
                <div class='shareBoxBody'>
                    <div class='sharedToRow'>
                        <div id='telegramBox' class='sharedToBox'>
                            <img style='width: 30px; height: auto;' src='../images/icons/telegram.png' alt='Telegram'>
                            <p>Telegram</p>
                        </div>
                        <div id='emailBox' class='sharedToBox'>
                            <img style='width: 30px; height: auto;' src='../images/icons/email.png' alt='Email'>
                            <p>Email</p>
                        </div>
                    </div>
                    <div class='inputBox'>
                        <div id='telegramInput'>
                            <select id="countryCode" name="countryCode" required></select> 
                            <input type="number" id="telegramNumber" name="telegramNumber" placeholder="Enter Telegram Number" required>
                        </div>
                        <div style='display: none;' id='emailInput'>
                            <input type="email" id="sharedToEmail" name="sharedToEmail" placeholder="Enter A Email" required>
                        </div>
                        <div style='text-align: right;' id='showError'></div>
                    </div>
                </div>
                <hr style="opacity: 1;">
                <div class='footer'>
                    <div class="proceed-btn">
                        <input type="button" value="CANCEL" onclick="hideShareBankDetailsBox()">
                        <input id='shareBankDetailsBtn' type="submit" value="SHARE">
                    </div>
                </div>
            </div>
        `
        document.getElementById('telegramBox').classList.add('activeSharedBox');
        document.getElementById('telegramBox').addEventListener('click', handleClickBox('telegramBox'))
        document.getElementById('emailBox').addEventListener('click', handleClickBox('emailBox'))

        const selectElement = document.getElementById('countryCode')
        counryCode.forEach(option =>{
            const newOption = document.createElement('option')
            newOption.value = option.CCode;
            newOption.textContent = option.CCode;
            selectElement.appendChild(newOption)
            if (option.CCode === '+88') {
                newOption.selected = true;
            }
        })
        document.getElementById('shareBankDetailsBtn').addEventListener('click', async ()=>{
            if((shareTo === 'Telegram' && document.getElementById('telegramNumber').value !== '') || (shareTo === 'Email' && document.getElementById('sharedToEmail').value !== '' && document.getElementById('sharedToEmail').value.indexOf('@') !== -1) ){
                document.getElementById('showError').innerHTML = ''
                let queryData = {}
                queryData.inv_id = user.LoggedInInvestorId
                queryData.share_to = shareTo
                queryData.bank = bank['Bank Name']
                queryData.MobileNo = document.getElementById('telegramNumber').value
                queryData.CCode = shareTo === 'Telegram'  ? document.getElementById('countryCode').value : ''
                queryData.Email = document.getElementById('sharedToEmail').value
                const result = await postShareBankDetails(queryData)
                
                if(result.status === true){
                    document.getElementById('shareBankDetailsBox').style.display = 'none'
                    document.getElementById('overlay').style.display = 'none'

                    document.getElementById('shareBankDetailsMsg').style.display = 'block'
                    document.getElementById('shareBankDetailsMsg').innerHTML= ''
                    document.getElementById('shareBankDetailsMsg').innerHTML= `
                        <p>${result.message}</p>
                    `

                    setTimeout(() => {
                        document.getElementById('shareBankDetailsMsg').style.display = 'none'
                        document.getElementById('shareBankDetailsMsg').innerHTML= ''
                    }, 3000);
                }else{
                    document.getElementById('shareBankDetailsMsg').style.backgroundColor = 'red'
                    document.getElementById('shareBankDetailsMsg').style.display = 'block'
                    document.getElementById('shareBankDetailsMsg').innerHTML= ''
                    document.getElementById('shareBankDetailsMsg').innerHTML= `
                        <p>${result.message}</p>
                    `

                    setTimeout(() => {
                        document.getElementById('shareBankDetailsMsg').style.display = 'none'
                        document.getElementById('shareBankDetailsMsg').innerHTML= ''
                    }, 3000);
                }
            }else{
                if(shareTo === 'Telegram' && document.getElementById('telegramNumber').value === ''){
                    document.getElementById('showError').innerHTML = ''
                    document.getElementById('showError').innerHTML = `
                        <p style='color: red; margin-top: -10px;'>Please Enter a Telegram Number</p>
                    `
                }
                if(shareTo === 'Email' && document.getElementById('sharedToEmail').value === ''){
                    document.getElementById('showError').innerHTML = ''
                    document.getElementById('showError').innerHTML = `
                        <p style='color: red; margin-top: -10px;'>Please Enter a Email</p>
                    `
                }
                if(shareTo === 'Email' && document.getElementById('sharedToEmail').value.indexOf('@') === -1){
                    document.getElementById('showError').innerHTML = ''
                    document.getElementById('showError').innerHTML = `
                        <p style='color: red; margin-top: -10px;'>Please Enter a Valid Email</p>
                    `
                }
            }
            
        })
    })
    document.getElementById('overlay').addEventListener('click', ()=>{
        document.getElementById('shareBankDetailsBox').style.display = 'none'
        document.getElementById('overlay').style.display = 'none'
    })
}
function resizeTextbox(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = (textarea.scrollHeight) + "px";
}
function previewFile() {
    let fileInput = document.getElementById('file-input');
    let previewContainer = document.getElementById('preview-container');
    let previewImage = document.getElementById('preview-image');
    let file = null
    file = fileInput.files[0];

    if (file) {
        let reader = new FileReader();

      reader.onload = function (e) {
        previewImage.src = e.target.result;
      };

      reader.readAsDataURL(file);

      previewContainer.style.display = 'block';
    }
}
function undoSelection() {
    let fileInput = document.getElementById('file-input');
    let previewContainer = document.getElementById('preview-container');

    fileInput.value = ''; // Clear the file input
    previewContainer.style.display = 'none'; // Hide the preview container
}
function hideShareBankDetailsBox(){
    document.getElementById('shareBankDetailsBox').style.display = 'none'
    document.getElementById('overlay').style.display = 'none'

}