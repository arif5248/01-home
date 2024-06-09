let user = null;
    const storedData = sessionStorage.getItem('loginData');
    if (storedData) {
        const loginData = JSON.parse(storedData);
        user = loginData[0]
    }else{
        window.location.href = '../index.html';
    } 

    let dashBoardData = null;
    const storedDashBoardData = sessionStorage.getItem('dashBoard');
   
    if (storedDashBoardData) {
        dashBoardData = JSON.parse(storedDashBoardData); 
    }
// console.log(user)
// console.log(dashBoardData)
function setNotificationNum(){
    const unreadNoti = localStorage.getItem('unreadNoti');
    const unreadNotificationNumber = unreadNoti ? unreadNoti : dashBoardData.ipo_eli[0].Notification
    if(unreadNotificationNumber === 0){
        document.getElementById('unreadNotiNo').innerHTML = ''
    }else{
        document.getElementById('unreadNotiNo').innerHTML = unreadNotificationNumber
    }
    
}
function updateFooterBtnState(activeButton) {
    let buttons = document.querySelectorAll('.bottomSection .footer-icon');
    buttons.forEach(function (button) {
        button.classList.remove('activeBtn');
    });

    let activeButtonElement = document.querySelector('.bottomSection .footer-icon[onclick*="' + activeButton + '"]');
    if (activeButtonElement) {
        activeButtonElement.classList.add('activeBtn');
    }
}

function removeFooterBtnState() {
    let buttons = document.querySelectorAll('.bottomSection .footer-icon');
    buttons.forEach(function (button) {
        button.classList.remove('activeBtn');
    });
}

function showSupportTeam(){
    document.getElementById('support-slide').style.display = 'block'
    document.getElementById('overlay').style.display = 'block'
}
function closeSupportTeam(){
    document.getElementById('support-slide').style.display = 'none'
    document.getElementById('overlay').style.display = 'none'

}
async function showSendMessage(){
    const getMessageData = await getAllMessage(user.LoggedInInvestorId)
    const messageType = getMessageData.TypeList.split(/-/);
    document.getElementById('sendMessageBody').innerHTML=`
        <form action="" method="post" enctype="multipart/form-data" id='sendMessageForm'>
            <select name="" id="sendMessageType">
                <option value="">-- Select Type --</option>
            </select>
            <input type="text" placeholder="Enter Name" class="inputStyle input-color" value='${user.LoggedInInvestorName}' id="msg_req_user_name" name="name" readonly>
            <input type="text" placeholder="Enter Mobile Number" class="inputStyle input-color" value='${user.phone}' id="msg_req_user_mobile" name="mobile" readonly>
            <input type="text" placeholder="Enter Email Address" class="inputStyle input-color" id="msg_req_user_email" value='${user.email}' name="email" readonly>
            <textarea id="messageTextarea" name="message" rows="4" placeholder="Enter your message..."></textarea>
            <div class="fileContent">
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
            <input style='margin: 10px 0px' class= "btn btn-primary submitSendMsg" type="submit" value='Submit'>
        </form>
        <div class='messageHistorySection'>
            <div class='container'>
                <div class='messageHisHeading'>
                    <h3>Sent Message History</h3>
                </div>
                <div onscroll="resetLogoutTimer()" class='sent_message_body' id='sent_message_body'></div>
            </div>
        </div>
    `
    function setOptionAndMessageList(){
        const selectElement = document.getElementById('sendMessageType')
        if(messageType){
            messageType.forEach(item => {
                const option = document.createElement('option');
                option.textContent = item;
                selectElement.appendChild(option)
            })
        }

        const messageListBody = document.getElementById('sent_message_body')
        if(getMessageData.MsgList){
            getMessageData.MsgList.forEach(msgBox =>{
                const newDiv = document.createElement('div')
                newDiv.classList.add('msgBox')
                newDiv.innerHTML = `
                    <div class='msgBoxItem'>
                        <p>Message Date:</p>
                        <p>${msgBox.msgDate}</p>
                    </div>

                    <div class='msgBoxItem'>
                        <p>Message Type:</p>
                        <p>${msgBox.msgType}</p>
                    </div>

                    <div class='msgBoxItem'>
                        <p>Message:</p>
                        <p>${msgBox.msgBody}</p>
                    </div>

                    <div class='msgBoxItem'>
                        <p>Reply:</p>
                        <p>${msgBox.msgReply}</p>
                    </div>

                    <div class='msgBoxItem'>
                        <p>Status:</p>
                        <p>${msgBox.msgStatus}</p>
                    </div>
                `
                messageListBody.appendChild(newDiv)
            })
        }
        
    }
    async function excuteSendMessage (){
        const selectSendMessageForm = document.getElementById('sendMessageForm')
        selectSendMessageForm.addEventListener('submit', async (event) => {
            event.preventDefault()
            
            try {
                const response = await fetch('https://api.ipify.org?format=json');
                const data = await response.json();
                const messageIpAddr = data.ip;
                const messageType = document.getElementById('sendMessageType').value;
                const messageBody = document.getElementById('messageTextarea').value;
                const messageFile = document.getElementById('file-inputMP').files[0];

                const formData = new FormData();
                
                formData.append('inv_id', user.LoggedInInvestorId);
                formData.append('name', user.LoggedInInvestorName);
                formData.append('mobile', user.phone);
                formData.append('email', user.email);
                formData.append('msg_type', messageType);
                formData.append('msg_body', messageBody);
                formData.append('ipAddr', messageIpAddr);
                if(messageFile){
                    formData.append('file', messageFile);
                }
                

                const result = await sendMessage(formData)
            } catch (error) {
                console.error('Error fetching IP address:', error);
            }

            
        })
    }
    
    document.getElementById('sendMessageSection').style.display = 'flex'
    document.getElementById('sendMessageSection').style.flexDirection = 'column'
    setOptionAndMessageList()
    excuteSendMessage()
}
function closeSendMessage(){
    document.getElementById('sendMessageSection').style.display = 'none'
}
async function showVideoChat(){
    async function executeSetTimeOption(){
        setTimeOption = fetched_vChatTime.status === true ? fetched_vChatTime.Data : []
        
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
    document.getElementById('videoChatSection').style.display = 'block' 
    let today = new Date().toISOString().split('T')[0];
    today = customDateConverter(today,'defaultToCustom')
    let fetched_vChatTime = await get_vChatTime(today)
    await executeSetTimeOption()
    
    document.getElementById('video_req_user_name').value = user.LoggedInInvestorName
    document.getElementById('video_req_user_mobile').value = user.phone
    document.getElementById('video_req_user_email').value = user.email
    let reqTime = document.getElementById('video_req_time').value
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

    document.getElementById('videoChatReqForm').addEventListener('submit', async (event)=>{
        event.preventDefault()
        
        if(document.getElementById('video_req_time').value === ''){
            document.getElementById('reqTimeValidationSpan').style.display = 'block'
            document.getElementById('video_req_time').style.borderColor = 'red'
        }else{
            const formData = new FormData();        
            formData.append('name', user.LoggedInInvestorName);
            formData.append('ccode', document.getElementById('video_req_countryCode').value);
            formData.append('mobile', user.phone);
            formData.append('email', user.email);
            formData.append('chat_date', document.getElementById('video_req_date').value);
            formData.append('chat_time', reqTime);
            const result = await post_vChatRequest(formData)
            // const result = {status: false,  message: 'Failed to submit video request'}
        
            if(result){
                document.getElementById('overlayVideoChat').style.display = 'block'
                document.getElementById('settings').style.display = 'block'
                document.getElementById('settings').innerHTML = `
                    <div class="head">${result.status === true ? 'Success' : 'Failed'}</div>
                    <div class="body">${result.message}</div>
                    <div class="footer" id="vChatClose"><p class='btn btn-primary'>OK</p></div>
                `
                document.getElementById('vChatClose').addEventListener('click',()=>{
                    document.getElementById('overlayVideoChat').style.display = 'none'
                    document.getElementById('settings').style.display = 'none'
                })
                document.getElementById('overlayVideoChat').addEventListener('click',()=>{
                    document.getElementById('overlayVideoChat').style.display = 'none'
                    document.getElementById('settings').style.display = 'none'
                })
            }
        }
    })
    
}
function closeVideoChat(){
    document.getElementById('videoChatSection').style.display = 'none'
}
function showSettings(){
    document.getElementById('settings').style.display = 'block'
    document.getElementById('overlay').style.display = 'block';
    
}
function closeSettings(){
    document.getElementById('settings').style.display = 'none'
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('overlay').style.zIndex = '1001';
    document.body.style.overflow = 'scroll';
}

function changePass(){
    document.getElementById('settings').style.display = 'none'
    document.getElementById('overlay').style.display = 'none';
    document.body.style.overflow = 'scroll';
    route("../component/changePassComponent.js","../css/changePassComponent.css", 'changePass')
    
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
// async function isBoAccountOpened(){
//     const fetchedData = await getBoStatus(user.LoggedInInvestorId)
//     if (fetchedData.status === true) {
//         boData = fetchedData.Data
//     }
//     if (boData[0].bo_id !== '') {
//         const item =  document.getElementById('boAccountOpenListItem')
//         if(item){
//             item.style.display = 'none'
//         }
        
//     }
// }
// isBoAccountOpened()
// ============= Auto Logout ==============//
async function logout(){
    await saveLog(user.LoggedInInvestorId, 'Log out');
    sessionStorage.removeItem('loginData');
    sessionStorage.removeItem('dashBoard');
    window.location.href = '../index.html';

}
let logoutTimer;

function popUpLogout(){
    document.getElementById('popUpLogoutDiv').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('popUpLogoutDiv').innerHTML = `
        <h5>Alert</h5>
        <p>Session Expired <br>Please Login Again</p>
        <div id='loginAgain'>
            <p>OK</p>
        </div>
    `
    document.getElementById('loginAgain').addEventListener('click', ()=>{
        logout()
    })
    document.getElementById('overlay').addEventListener('click', ()=>{
        logout()
    })
}
function startLogoutTimer() {
    logoutTimer = setTimeout(popUpLogout, 5 * 60 * 5000);
}

function resetLogoutTimer() {
    // console.log('reset Logout')
    clearTimeout(logoutTimer);
    startLogoutTimer();
}
document.addEventListener('DOMContentLoaded', function() {
    const mainContentSection = document.getElementById('mainContentSection');
    mainContentSection.addEventListener('scroll', resetLogoutTimer); 
    window.addEventListener('click', resetLogoutTimer);
});

startLogoutTimer();


