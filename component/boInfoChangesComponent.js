async function executeBoInfoChanges(){
    let historyData = []
    const fetchedInvInfo = await getInvInfo(user.LoggedInInvestorId)
    const fetchedHistory = await getBoInfoChangeHistory(user.LoggedInInvestorId)
    if(fetchedHistory.status === true){
        historyData = fetchedHistory.Data
    }
    
    function boInfoChanges(){
        document.getElementById('mainContentSection').innerHTML = `
        <div class="pageHeading" id="financial-Heading">
            <div class="heading">
                <h1>BO Info Change</h1>
            </div>
        </div>

        <div style='margin-top: 5px' class="boInfoChangeForm">
            <div class="container">
                <div id='boChangeForm'></div>
            </div>
        </div>
        <div style='margin-top: 5px;' class="boInfoChangeHistory">
            <div class="container">
                <div id='boChangeHistory'></div>
            </div>
        </div>
        <div id='errorDiv'></div>
        `
    }

    function renderBoChangeForm(){
        const boChangeFormContent = document.getElementById('boChangeForm')

        boChangeFormContent.innerHTML = `
            <form id='boChangeRequestForm' action="#" method="post">
                <div class="box">
                    <div class="box-data">
                        <label for="userName">Name</label>
                        <input type="text" id="userName" name="userName" value='${user.LoggedInInvestorName}' required readonly>
                    </div>
                    <div class="box-data">
                        <label for="changeType">Change Type</label>
                        <select id="changeType" name="changeType" required>
                            <option>--Select Change Type--</option>.
                        </select>
                    </div>
                    <div class="box-data">
                        <label for="existingInfo">Existing Info</label>
                        <input type="text" id="existingInfo" name="existingInfo" required readonly>
                    </div>
                    <div class="box-data">
                        <label for="newInfo">New Info</label>
                        <input type="text" id="newInfo" name="newInfo" required>
                    </div>
                    <div class="box-data">
                        <label for="remarks">Remarks</label>
                        <input type="text" id="remarks" name="remarks">
                    </div>
                    <div class="fileContent">
                        <div class="file-box">
                            <label for="file-input" id="file-label">Browse</label>
                            <input type="file" id="file-input">
                        </div>
                        <h5>Attach your Document here</h5>
                        <div id="preview-container" style="display: none;">
                            <iframe id="preview-iframe" style="width:50%; height:auto; border:none;"></iframe>
                            <img id="preview-image" alt="File Preview" style="max-width:100%; max-height:auto; display: none;">
                            <div id="undo-button">
                                <img src="../images/icons/remove.png" alt="close">
                            </div>
                        </div>

                    </div>
                    <div class='submitButton'>
                        <input class='btn btn-primary' id='boChangeSubmit' type='submit' value='Submit'>
                    </div>
                </div>
            </form>
        `
        if(fetchedInvInfo.status === true){
            fetchedInvInfo.Data.forEach(option =>{
                const newOption = document.createElement('option')
                newOption.setAttribute('id', `${option.title}`);
                newOption.value = option.title;
                newOption.textContent = option.title;
                document.getElementById('changeType').appendChild(newOption)
                
            })
            document.getElementById('changeType').addEventListener('change', function(){
                fetchedInvInfo.Data.forEach(item =>{
                    if(item.title === document.getElementById('changeType').value){
                        document.getElementById('existingInfo').value = item.value
                        document.getElementById('newInfo').value = ''
                        
                        if(item.title === 'Close BO ID'){
                            document.getElementById('newInfo').setAttribute('placeholder', `Enter BO Closing Cause`);
                        }else{
                            document.getElementById('newInfo').setAttribute('placeholder', `Enter New ${item.title}`);
                        }
                    }
                })
            })
        }
    }
    function renderBoChangeHistory(){
        document.getElementById('boChangeHistory').innerHTML=`
        <div class="pageHeading" id="financial-Heading">
            <div class="heading">
                <h1>BO Info Change History</h1>
            </div>
        </div>
        <div id='historyBody'></div>
        `
        function populateHistoryBody(){
            const historyBody = document.getElementById('historyBody')
            historyData.forEach(data =>{
                const newTable = document.createElement('table')
                newTable.innerHTML = `
                            <tr>
                                <td>ID</td>
                                <td>${data.InvestorID}</td>
                            </tr>
                            <tr>
                                <td>Req Date</td>
                                <td>${data.ReqDate}</td>
                            </tr>
                            <tr>
                                <td>Req Type</td>
                                <td>${data.ReqType}</td>
                            </tr>
                            <tr>
                                <td>New Info</td>
                                <td>${data.NewInfo}</td>
                            </tr>
                            <tr>
                                <td>Remarks</td>
                                <td>${data.Remarks}</td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td>${data.Status}</td>
                            </tr>
                `
                historyBody.appendChild(newTable)
            })

        }
        populateHistoryBody()
    }
    function previewFile(event) {
        let fileInput = document.getElementById('file-input');
        let previewContainer = document.getElementById('preview-container');
        let previewIframe = document.getElementById('preview-iframe');
        let previewImage = document.getElementById('preview-image');
        let file = null;
        file = fileInput.files[0];
    
        if (file) {
            let reader = new FileReader();
    
            reader.onload = function (e) {
                if (file.type === 'application/pdf') {
                    previewIframe.src = e.target.result;
                    previewIframe.style.display = 'block';
                    previewImage.style.display = 'none';
                } else {
                    previewImage.src = e.target.result;
                    previewImage.style.display = 'block';
                    previewIframe.style.display = 'none';
                }
                previewContainer.style.display = 'block';
            };
    
            if (file.type === 'application/pdf') {
                reader.readAsDataURL(file);
            } else {
                reader.readAsDataURL(file);
            }
        }
    }
    
    function undoFileSelection(event) {
        let fileInput = document.getElementById('file-input');
        let previewContainer = document.getElementById('preview-container');
    
        fileInput.value = ''; // Clear the file input
        previewContainer.style.display = 'none'; // Hide the preview container
    }

    boInfoChanges()
    renderBoChangeForm()
    renderBoChangeHistory()

    document.getElementById('file-input').addEventListener('change', previewFile)
    document.getElementById('undo-button').addEventListener('click', undoFileSelection)

    document.getElementById('boChangeRequestForm').addEventListener('submit', async (event) => {
        event.preventDefault()

        if( document.getElementById('newInfo').value && document.getElementById('changeType').value  !== '--Select Change Type--'){
            const service_type = document.getElementById('changeType').value;
            const old_data = document.getElementById('existingInfo').value;
            const new_data = document.getElementById('newInfo').value;
            const remarks = document.getElementById('remarks').value;
            const file = document.getElementById('file-input').files[0];

            const formData = new FormData();
            
            formData.append('inv_id', user.LoggedInInvestorId);
            formData.append('service_type', service_type);
            formData.append('old_data', old_data);
            formData.append('new_data', new_data);
            formData.append('remarks', remarks);
            
            if(file){
                formData.append('file', file);
            }
            console.log(service_type)
            if(service_type === 'Bank Info' || service_type === 'Student ID Card' || service_type === 'TIN'){
                if(file){
                    // console.log('action')
                    const result = await postBoInfoChangeRequest(formData)
                }else{
                    const displayBox = document.getElementById('errorDiv')
                    document.getElementById('overlay').style.display = 'block' 
                    displayBox.style.display = 'block'
                    displayBox.innerHTML = ''
                    displayBox.innerHTML = `
                        <p style='font-weight: 700; padding-bottom: 10px; background-color: #000; color: #fff;border-radius: 10px 10px 0px 0px;'>Error</p>
                        <p style='color: red;padding: 10px 0px;font-size: 14px;'>Please upload the necessary documents</p>
                        <hr style='opacity:1;'>
                        <div id='closePopUp'>OK</div>
                    `
                    document.getElementById('closePopUp').addEventListener('click', ()=>{
                        document.getElementById('overlay').style.display = 'none' 
                        document.getElementById('errorDiv').style.display = 'none' 
                    })
                    document.getElementById('overlay').addEventListener('click', ()=>{
                        document.getElementById('overlay').style.display = 'none' 
                        document.getElementById('errorDiv').style.display = 'none'
                    })
                }
                
            }else{
                // console.log('action')
                const result = await postBoInfoChangeRequest(formData)
            }
            
        }else{
            const displayBox = document.getElementById('errorDiv')
            document.getElementById('overlay').style.display = 'block' 
            displayBox.style.display = 'block'
            displayBox.innerHTML = ''
            displayBox.innerHTML = `
                <p style='font-weight: 700; padding-bottom: 10px;background-color: #000; color: #fff;'>Error:</p>
                <p style='color: red; font-weight: 600; padding-bottom: 10px;'>Please Choose a Change Type</p>
                <hr style='opacity:1;'>
                <div id='closePopUp'>OK</div>
            `
            document.getElementById('closePopUp').addEventListener('click', ()=>{
                document.getElementById('overlay').style.display = 'none' 
                document.getElementById('errorDiv').style.display = 'none' 
            })
            document.getElementById('overlay').addEventListener('click', ()=>{
                document.getElementById('overlay').style.display = 'none' 
                document.getElementById('errorDiv').style.display = 'none'
            })
        }
    })
}