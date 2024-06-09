const urlParams = new URLSearchParams(window.location.search);
const case_name = urlParams.get('case');
let fetchedData = {}
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#logInDetails form');
    const saveMeCheckbox = document.getElementById('saveMe');
    const userIDInput = document.getElementById('user_id');
    const passwordInput = document.getElementById('loginPass');

    const savedUserID = localStorage.getItem('savedUserID');
    const savedPassword = localStorage.getItem('savedPassword');

    if (savedUserID && savedPassword) {
        userIDInput.value = savedUserID;
        passwordInput.value = savedPassword;
        saveMeCheckbox.checked = true;
    }
    
    saveMeCheckbox.addEventListener('change', function() {
        if (this.checked) {
            localStorage.setItem('savedUserID', userIDInput.value);
            localStorage.setItem('savedPassword', passwordInput.value);
        } else {
            localStorage.removeItem('savedUserID');
            localStorage.removeItem('savedPassword');
        }
    });

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const userId = userIDInput.value;
        let password = passwordInput.value;
        
        try {
            password = encodeURIComponent(password)
            const loginResponse = await investorLogin(userId, password);
            console.log(loginResponse)
            if (loginResponse[0].LoggedInStatus === 'Success'){
                if(saveMeCheckbox.checked){
                    localStorage.setItem('savedUserID', userIDInput.value);
                    localStorage.setItem('savedPassword', passwordInput.value);
                }
                sessionStorage.setItem('loginData', JSON.stringify(loginResponse));
                const userDashBoard = await getDashBoardData(loginResponse[0].LoggedInInvestorId)
                
                if(userDashBoard && userDashBoard !== undefined){
                    sessionStorage.setItem('dashBoard', JSON.stringify(userDashBoard));
                    window.location.href = `../mainPage/home.html`;
                }
                const result = await saveLog('', 'Login Successfully')
                console.log(result)
                
            } else {
                document.getElementById('failed_login').style.display = 'block'
                setTimeout(() => {
                    document.getElementById('failed_login').style.display = 'none'
                }, 3000);
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    });
});


function hidePassword(){
    document.getElementById('showPass').style.display = 'block'
    document.getElementById('hidePass').style.display = 'none'
    document.getElementById('loginPass').type = 'password'
}

function showPassword(){
    document.getElementById('showPass').style.display = 'none'
    document.getElementById('hidePass').style.display = 'block'
    document.getElementById('loginPass').type = 'text'
}
async function sendMessage(){
    document.getElementById('sendMessageSection').innerHTML = `
    <div class="sendMessageHeading">
        <span></span>
        <h3>Send Message</h3>
        <img onclick="closeSendMessage()" src="./images/icons/remove.png" alt="Close" style="width: 30px; padding-right:5px;">
    </div>
    <div class="container">
        <div class="sendMessageBody">
            <form id='b_sendMsgForm' action="" method="post" enctype="multipart/form-data">
                <select name="" id="sendMessageType"style="padding-left: 15px;"></select>
                <input type="text" placeholder="Enter Name" class="inputStyle input-color" id="msg_req_user_name" name="name" required> 
                <input type="text" placeholder="Enter Mobile Number" class="inputStyle input-color" id="msg_req_user_mobile" name="mobile" maxlength='15' required>
                <input type="email" placeholder="Enter Email Address" class="inputStyle input-color" id="msg_req_user_email" name="email" required>
                <textarea id="messageTextarea" name="message" rows="5" placeholder="Enter your message..."></textarea>
                <div style='display: none;' class="fileContent">
                    <div class="file-box">
                        <label for="file-inputMP" id="file-labelMP">Browse</label>
                        <input type="file" accept=".png, .jpeg, .jpg, .pdf" id="file-inputMP" onchange="previewFileMP()">
                    </div>
                    <h5>Allowed file type PNG, JPEG, PDF</h5>
                    <div id="preview-containerMP">
                        <img id="preview-imageMP" alt="File Preview">
                        <div id="undo-button" onclick="undoSelectionMP()">
                            <img src="../images/icons/remove.png" alt="close">
                        </div>
                    </div>
                </div>
                <input class= "btn btn-primary submitSendMsg" type="submit"></input>
            </form>
        </div>
    </div>
    `
    const getMessageData = await getAllMessage()
    const messageType = getMessageData.TypeList.split(/-/);
    const selectElement = document.getElementById('sendMessageType')
        if(messageType){
            messageType.forEach(item => {
                const option = document.createElement('option');
                option.textContent = item;
                selectElement.appendChild(option)
            })
        }
    document.getElementById('b_sendMsgForm').addEventListener('submit', async (event)=>{
        event.preventDefault()
        const name = document.getElementById('msg_req_user_name').value;
        const phone = document.getElementById('msg_req_user_mobile').value;
        const email = document.getElementById('msg_req_user_email').value;
        const message = document.getElementById('messageTextarea').value;
        const purpose = encodeURIComponent(document.getElementById('sendMessageType').value)
        const encodedBody = btoa(message + '<br/><br/>' + 'With Regards<br/><br/>' + name + '<br/>' + phone + '<br/>' + email);

        // Create form data
        const formData = new FormData();
        formData.append('email_body', encodedBody);
        const result =await post_SendEmail(formData, purpose)
        // const  result = {status: false, message: 'hello brother'}
        if(result){
            document.getElementById('overlayVideoChat').style.display = 'block'
            document.getElementById('popUpSection').style.display = 'block'
            document.getElementById('popUpSection').innerHTML = `
                <div class="head">${result.status === true ? 'Success' : 'Failed'}</div>
                <div class="body">${result.message}</div>
                <div class="footer" id="vChatClose"><p class=' btn-primary'>OK</p></div>
            `
            document.getElementById('vChatClose').addEventListener('click',()=>{
                document.getElementById('overlayVideoChat').style.display = 'none'
                document.getElementById('popUpSection').style.display = 'none'
                document.getElementById('msg_req_user_name').value = result.status === true ? '' : name
                document.getElementById('msg_req_user_mobile').value = result.status === true ? '' : phone
                document.getElementById('msg_req_user_email').value = result.status === true ? '' : email
                document.getElementById('messageTextarea').value = result.status === true ? '' : message
            })
            document.getElementById('overlayVideoChat').addEventListener('click',()=>{
                document.getElementById('overlayVideoChat').style.display = 'none'
                document.getElementById('popUpSection').style.display = 'none'
                document.getElementById('msg_req_user_name').value = result.status === true ? '' : name
                document.getElementById('msg_req_user_mobile').value = result.status === true ? '' : phone
                document.getElementById('msg_req_user_email').value = result.status === true ? '' : email
                document.getElementById('messageTextarea').value = result.status === true ? '' : message
            })
        }
    })
}
function previewFileMP() {
    let fileInput = document.getElementById('file-inputMP');
    let previewContainer = document.getElementById('preview-containerMP');
    let previewImage = document.getElementById('preview-imageMP');
    let file = null
    file = fileInput.files[0];

    if (file) {
        let reader = null
        reader = new FileReader();

      reader.onload = function (e) {
        previewImage.src = e.target.result;
      };

      reader.readAsDataURL(file);

      previewContainer.style.display = 'block';
    }
}

function undoSelectionMP() {
    let fileInput = document.getElementById('file-inputMP');
    let previewContainer = document.getElementById('preview-containerMP');

    fileInput.value = ''; 
    previewContainer.style.display = 'none'; 
}
async function videoChat(){
    document.getElementById('videoChatSection').innerHTML = `
    <div class="sendMessageHeading">
        <span></span>
        <h3>Video Chat(Via Zoom)</h3>
        <img onclick="closeVideoChat()" src="./images/icons/remove.png" alt="Close" style='width: 30px; padding-right: 5px'>
    </div>
    <div class="container">
        <div class="sendMessageBody">
            <form action="" method="post" id='videoChatReqForm'>
                <input type="text" placeholder="Enter Name" class="inputStyle input-color" id="video_req_user_name" name="name" required>
                <div class="video_req_mobileContainer" id="video_req_mobileContainer">
                    <select id="video_req_countryCode" class="countryCode"></select>
                    <input type="text"  placeholder="Enter Mobile Number" name="mobile" id="video_req_user_mobile"  required maxlength='15'>
                </div>
                <input type="email" placeholder="Enter Email Address" class="inputStyle input-color" id="video_req_user_email" name="email" required>
                <input type="text"  class="inputStyle input-color" id="video_req_date" name="date">
                <select  class="inputStyle input-color" id="video_req_time" name="time"></select>
                <span id='reqTimeValidationSpan'></span>
                <input class= "btn btn-primary submitSendMsg" type="submit"></select>
            </form>
        </div>
    </div>
   `
    let today = new Date().toISOString().split('T')[0];
    today = customDateConverter(today,'defaultToCustom')
    $("#video_req_date").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: "dd/M/yy",
        onSelect:async function(dateText, inst) {
            fetched_vChatTime = await get_vChatTime(dateText)
            await executeSetTimeOption()
        }
    });
    document.getElementById('video_req_date').value = customDateConverter(today, 'defaultToCustom');
    let fetchedCountryCode = await getCountryCode ()
    let countryCodeList = fetchedCountryCode.status === true ? fetchedCountryCode.CCodeList : []
    countryCodeList.forEach(option =>{
        const newOption = document.createElement('option')
        newOption.setAttribute('id', `${option.CCode}`);
        newOption.value = option.CCode;
        newOption.textContent = option.CCode;
        document.getElementById('video_req_countryCode').appendChild(newOption)
        if (option.CCode === '+88') {
            newOption.selected = true;
        }
    })
    async function executeSetTimeOption(){
       let setTimeOption = fetched_vChatTime.status === true ? fetched_vChatTime.Data : []
        
        setTimeOption.forEach(option =>{
            const newOption = document.createElement('option')
            newOption.setAttribute('id', `${option.timeSlot}`);
            newOption.value = option.timeSlot;
            newOption.textContent = option.timeSlot;
            document.getElementById('video_req_time').appendChild(newOption)
        })
        document.getElementById('video_req_time').style.borderColor = '#000'
        document.getElementById('reqTimeValidationSpan').style.display = 'none'
    }
    
    let fetched_vChatTime = await get_vChatTime(today)
    await executeSetTimeOption()

    document.getElementById('videoChatReqForm').addEventListener('submit', async (event)=>{
        event.preventDefault()
        
        if(document.getElementById('video_req_time').value === ''){
            document.getElementById('reqTimeValidationSpan').style.display = 'block'
            document.getElementById('video_req_time').style.borderColor = 'red'
        }else{
            const formData = new FormData();        
            formData.append('name', document.getElementById('video_req_user_name').value);
            formData.append('ccode', document.getElementById('video_req_countryCode').value);
            formData.append('mobile', document.getElementById('video_req_user_mobile').value);
            formData.append('email', document.getElementById('video_req_user_email').value);
            formData.append('chat_date', document.getElementById('video_req_date').value);
            formData.append('chat_time', document.getElementById('video_req_time').value);
            const result = await post_vChatRequest(formData)
            // const result = {status: false,  message: 'Failed to submit video request'}
        
            if(result){
                document.getElementById('overlayVideoChat').style.display = 'block'
                document.getElementById('popUpSection').style.display = 'block'
                document.getElementById('popUpSection').innerHTML = `
                    <div class="head">${result.status === true ? 'Success' : 'Failed'}</div>
                    <div class="body">${result.message}</div>
                    <div class="footer" id="vChatClose"><p class=' btn-primary'>OK</p></div>
                `
                document.getElementById('vChatClose').addEventListener('click',()=>{
                    document.getElementById('overlayVideoChat').style.display = 'none'
                    document.getElementById('popUpSection').style.display = 'none'
                })
                document.getElementById('overlayVideoChat').addEventListener('click',()=>{
                    document.getElementById('overlayVideoChat').style.display = 'none'
                    document.getElementById('popUpSection').style.display = 'none'
                })
            }
        }
    })
}

async function showGetNew01Id(){
    document.getElementById('logInDetails').style.display = 'none'
    document.getElementById('get-new-01-ID').style.display = 'block'
    fetchedData =  await getCreateNewIDData()
    selectCountryCityCode()
    
    fetchedData.occupationList.forEach(item => {
        const newOption = document.createElement('option')
        newOption.setAttribute('id', `${item.Occupation}`);
        newOption.value = item.Occupation;
        newOption.textContent = item.Occupation;
        document.getElementById('occupation').appendChild(newOption)
    });
    fetchedData.howToList.forEach(item => {
        const newOption = document.createElement('option')
        newOption.setAttribute('id', `${item.HowToFind}`);
        newOption.value = item.HowToFind;
        newOption.textContent = item.HowToFind;
        document.getElementById('howFindUs').appendChild(newOption)
    });
    document.getElementById('createNew01Id').addEventListener('submit', async (event) => {
        event.preventDefault();
        const data = {
            inv_Name: document.getElementById('new_user_nid').value,
            inv_Phone: document.getElementById('mobile').value,
            inv_Email: document.getElementById('new_user_email').value,
            inv_Country: document.getElementById('country').value,
            inv_City: document.getElementById('city').value,
            inv_CCode: document.getElementById('countryCode').innerHTML,
            howto_findus: document.getElementById('howFindUs').value,
            inv_occupation: document.getElementById('occupation').value,
            reff_id : document.getElementById('userReference').value,
        }
        if(data.inv_City === '-- Select City --' || data.inv_occupation === '--Occupation--' || data.howto_findus === '--How you find 01?--'){
            if(data.inv_City === '-- Select City --'){
                const newP = document.createElement('p')
                newP.innerHTML = ` Please Select City.`
                document.getElementById('validationError').appendChild(newP)
                newP.style.display = 'inline-block'
                newP.style.fontSize = '12px'
                newP.style.color = 'red'
                newP.style.margin = '0'
                document.getElementById('city').style.borderColor = 'red'
            }
            if(data.inv_occupation === '--Occupation--'){
                const newP = document.createElement('p')
                newP.innerHTML = ` Please Select Occupation.`
                document.getElementById('validationError').appendChild(newP)
                newP.style.display = 'inline-block'
                newP.style.fontSize = '12px'
                newP.style.color = 'red'
                newP.style.margin = '0'
                document.getElementById('occupation').style.borderColor = 'red'
            }
            if(data.howto_findus === '--How you find 01?--'){
                const newP = document.createElement('p')
                newP.innerHTML = ` Please Select Occupation.`
                document.getElementById('validationError').appendChild(newP)
                newP.style.display = 'inline-block'
                newP.style.fontSize = '12px'
                newP.style.color = 'red'
                newP.style.margin = '0'
                document.getElementById('howFindUs').style.borderColor = 'red'
            }
        }else{
            const result = await createNew01ID(data)
            if(result.status === true){
                document.getElementById('logInDetails').style.display = 'block'
                document.getElementById('get-new-01-ID').style.display = 'none'
                document.getElementById('showResult').style.display = 'block'
                document.getElementById('showResult').innerHTML = `
                    <p id='resultMessage'>${result.message}</p>
                `
                setTimeout(() => {
                    document.getElementById('showResult').style.display = 'none'
                    document.getElementById('showResult').innerHTML = ''
                }, 3000);

            }
        }
        
        
    })
}

async function recoverPass(id, phone){
    const postRecoverPass = await getRecoverPass(id, phone)
    await saveLog(id, 'Password Recovered');
    if(postRecoverPass.status === true){
        document.getElementById('resultRecoverPassDiv').style.display = 'block'
        document.getElementById('resultRecoverPassDiv').innerHTML = `
            <p style='color: green;'>${postRecoverPass.message}</p>
        `
        setTimeout(() => {
            document.getElementById('resultRecoverPassDiv').style.display = 'none'
            document.getElementById('resultRecoverPassDiv').innerHTML = ''
            closeForgotPasswordModal()
        }, 3000);
    }else{
        document.getElementById('resultRecoverPassDiv').style.display = 'block'
        document.getElementById('resultRecoverPassDiv').innerHTML = `
            <p style='color: red;'>${postRecoverPass.message}</p>
        `
        setTimeout(() => {
            document.getElementById('resultRecoverPassDiv').style.display = 'none'
            document.getElementById('resultRecoverPassDiv').innerHTML = ''
        }, 3000);
    }
}
function showForgotPassword() {
    var modal = document.getElementById('forgotPasswordModal');
    modal.style.display = 'block';
    document.getElementById('popupOverlay').style.display = 'block'
}
function closeForgotPasswordModal() {
   document.getElementById('forgotPasswordModal').style.display = 'none';
   document.getElementById('popupOverlay').style.display = 'none';
}
function navigateToPage(pageUrl) {
    window.location.href = pageUrl;
}
function selectCountryCityCode() {
    const selectCountry = document.getElementById('country'),
    selectCity = document.getElementById('city'),
    selectCountryCode = document.getElementById('countryCode');

    selectCity.disabled = true;
    selectCountryCode.disabled = true;
    const countryCityCodeinfo = fetchedData.countryList
    countryCityCodeinfo.forEach(item => {
        const newOption = document.createElement('option')
        newOption.setAttribute('id', `${item.Country}`);
        newOption.value = item.Country;
        newOption.textContent = item.Country;
        selectCountry.appendChild(newOption)
    });
    selectCountry.addEventListener('change', async ()=>{
        countryCityCodeinfo.forEach(async (item) =>{
            if(item.Country === selectCountry.value){
                selectCountryCode.innerHTML = item.DialCode
                document.getElementById('mobile').removeAttribute('readonly')
                const fetchedCity = await getStateCity(item.Country)
                if(fetchedCity.status === true){
                    selectCity.disabled = false;
                    selectCity.innerHTML = ''
                    fetchedCity.cityListAll.forEach(item => {
                        const newOption = document.createElement('option')
                        newOption.setAttribute('id', `${item.Country}`);
                        newOption.value = item.City;
                        newOption.textContent = item.City;
                        selectCity.appendChild(newOption)
                    });
                }            
            }
        })
    })
}
function showSupportTeam(){
    document.getElementById('popupOverlay').style.display = 'block'
    document.getElementById('support-slide').style.display = 'block'
}
function closeSupportTeam(){
    document.getElementById('support-slide').style.display = 'none'
    document.getElementById('popupOverlay').style.display = 'none'
}
function showSendMessage(){
    document.getElementById('sendMessageSection').style.display = 'block'
}
function closeSendMessage(){
    document.getElementById('sendMessageSection').style.display = 'none'
}
function showVideoChat(){
    document.getElementById('videoChatSection').style.display = 'block'
}
function closeVideoChat(){
    document.getElementById('videoChatSection').style.display = 'none'
}
function existUser(){
    const existUser = sessionStorage.getItem('loginData');
    if(existUser){
        window.location.href = '../mainPage/home.html';
    }
}


