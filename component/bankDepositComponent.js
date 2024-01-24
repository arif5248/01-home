function executeBankDeposit_0(){
    function moneyDeposit(){
        document.getElementById('mainContentSection').innerHTML =`
            <div class="pageHeading" id="financial-Heading">
                <div class="heading">
                    <h1>Bank Deposit ( City Bank )</h1>
                </div>
            </div>
            <div class="container">
                <div class="bottomBox">
                    <form action="#">
                        <div class="form-box-1">
                            <input type="text" value="01 LIMITED" readonly>
                            <input type="text" value="3102912335001" readonly>
                            <input type="text" value="The City Bank Limited" readonly>
                            <input type="text" value="AGRABAD BRANCH" readonly>
                        </div>

                        <div class="form-box-3">
                            <label for="amount">Deposit Amount</label>
                            <input type="number" id="amount" name="amount" placeholder="Enter Taka" required>
                        </div>
                        <div class="form-box-3">
                            <label for="date">Chargeable Amount</label>
                            <input type="date" id="date" name="date" required>
                        </div>
                        <div class="form-box-3">
                            <label for="purpose">Purpose</label>
                            <select id="purpose" name="purpose" required>
                                <option value="invest">Invest</option>
                                <option value="cdbl_fee">CDBL fee</option>
                                <!-- Add more IPO options as needed -->
                            </select>
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

    moneyDeposit()
}

function executeBankDeposit_1(){
    function moneyDeposit(){
        document.getElementById('mainContentSection').innerHTML =`
            <div class="pageHeading" id="financial-Heading">
                <div class="heading">
                    <h1>Bank Deposit ( Dutch Bangla )</h1>
                </div>
            </div>
            <div class="container">
                <div class="bottomBox">
                    <form action="#">
                        <div class="form-box-1">
                            <input type="text" value="01 LIMITED" readonly>
                            <input type="text" value="1291100022133" readonly>
                            <input type="text" value="Dutch-Bangla Bank Limited" readonly>
                            <input type="text" value="O. R. nizam Road Branch" readonly>
                        </div>

                        <div class="form-box-3">
                            <label for="amount">Deposit Amount</label>
                            <input type="number" id="amount" name="amount" placeholder="Enter Taka" required>
                        </div>
                        <div class="form-box-3">
                            <label for="date">Chargeable Amount</label>
                            <input type="date" id="date" name="date" required>
                        </div>
                        <div class="form-box-3">
                            <label for="purpose">Purpose</label>
                            <select id="purpose" name="purpose" required>
                                <option value="invest">Invest</option>
                                <option value="cdbl_fee">CDBL fee</option>
                                <!-- Add more IPO options as needed -->
                            </select>
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

    moneyDeposit()
}

function executeBankDeposit_2(){
    function moneyDeposit(){
        document.getElementById('mainContentSection').innerHTML =`
            <div class="pageHeading" id="financial-Heading">
                <div class="heading">
                    <h1>Bank Deposit ( Eastern Bank )</h1>
                </div>
            </div>
            <div class="container">
                <div class="bottomBox">
                    <form action="#">
                        <div class="form-box-1">
                            <input type="text" value="01 LIMITED" readonly>
                            <input type="text" value="0251070124099" readonly>
                            <input type="text" value="Eastern Bank Limited" readonly>
                            <input type="text" value="Khulshi BRANCH" readonly>
                        </div>

                        <div class="form-box-3">
                            <label for="amount">Deposit Amount</label>
                            <input type="number" id="amount" name="amount" placeholder="Enter Taka" required>
                        </div>
                        <div class="form-box-3">
                            <label for="date">Chargeable Amount</label>
                            <input type="date" id="date" name="date" required>
                        </div>
                        <div class="form-box-3">
                            <label for="purpose">Purpose</label>
                            <select id="purpose" name="purpose" required>
                                <option value="invest">Invest</option>
                                <option value="cdbl_fee">CDBL fee</option>
                                <!-- Add more IPO options as needed -->
                            </select>
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

    moneyDeposit()
}
function resizeTextbox(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = (textarea.scrollHeight) + "px";
}
function previewFile() {
    let fileInput = document.getElementById('file-input');
    let previewContainer = document.getElementById('preview-container');
    let previewImage = document.getElementById('preview-image');

    let file = fileInput.files[0];

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