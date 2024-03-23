let user = null;
    const storedData = localStorage.getItem('loginData');
    if (storedData) {
        const loginData = JSON.parse(storedData);
        user = loginData[0]
    }else{
        window.location.href = '../index.html';
    } 

    let dashBoardData = null;
    const storedDashBoardData = localStorage.getItem('dashBoard');
   
    if (storedDashBoardData) {
        dashBoardData = JSON.parse(storedDashBoardData); 
    }
console.log(user)
console.log(dashBoardData)

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
}
function closeSupportTeam(){
    document.getElementById('support-slide').style.display = 'none'
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
            <textarea id="messageTextarea" name="message" rows="7" placeholder="Enter your message..."></textarea>
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
            <input class= "submitSendMsg" type="submit" value='Submit'>
        </form>
        <div class='messageHistorySection'>
            <div class='container'>
                <div class='messageHisHeading'>
                    <h3>Sent Message History</h3>
                </div>
                <div class='sent_message_body' id='sent_message_body'></div>
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
    
    document.getElementById('sendMessageSection').style.display = 'block'
    setOptionAndMessageList()
    excuteSendMessage()
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
function showSettings(){
    document.getElementById('settings').style.display = 'block'
    document.getElementById('overlay').style.display = 'block';
    
}
function closeSettings(){
    document.getElementById('settings').style.display = 'none'
    document.getElementById('overlay').style.display = 'none';
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

function logout(){
    localStorage.removeItem('loginData');
    localStorage.removeItem('dashBoard');
    window.location.href = '../index.html';

}
// let logoutTimer;

// function startLogoutTimer() {
//     logoutTimer = setTimeout(logout, 3 * 60 * 1000);
// }

// function resetLogoutTimer() {
//     clearTimeout(logoutTimer);
//     startLogoutTimer();
// }

// document.addEventListener('mousemove', resetLogoutTimer); 
// document.addEventListener('keypress', resetLogoutTimer);
// window.addEventListener('scroll', resetLogoutTimer); 

// startLogoutTimer();


