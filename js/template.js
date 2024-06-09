function showSupportTeam(){
    document.getElementById('popupOverlay').style.display = 'block'
    document.getElementById('support-slide').style.display = 'block'
}
function closeSupportTeam(){
    document.getElementById('popupOverlay').style.display = 'none'
    document.getElementById('support-slide').style.display = 'none'
}
async function videoChat(){
    document.getElementById('videoChatSection').innerHTML = `
    <div class="sendMessageHeading">
        <span></span>
        <h3>Video Chat(Via Zoom)</h3>
        <img onclick="closeVideoChat()" src="../images/icons/remove.png" alt="Close" style='width: 30px; padding-right: 5px;'>
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
async function sendMessage(){
    document.getElementById('sendMessageSection').innerHTML = `
    <div class="sendMessageHeading">
        <span></span>
        <h3>Send Message</h3>
        <img onclick="closeSendMessage()" src="../images/icons/remove.png" alt="Close" style="width: 30px; padding-right:5px;">
    </div>
    <div class="container">
        <div class="sendMessageBody">
            <form id='b_sendMsgForm' action="" method="post" enctype="multipart/form-data">
                <select name="" id="sendMessageType"style="padding-left: 15px;"></select>
                <input type="text" placeholder="Enter Name" class="inputStyle input-color" id="msg_req_user_name" name="name" required> 
                <input type="text" placeholder="Enter Mobile Number" class="inputStyle input-color" id="msg_req_user_mobile" name="mobile" maxlength='15' required>
                <input type="email" placeholder="Enter Email Address" class="inputStyle input-color" id="msg_req_user_email" name="email" required>
                <textarea id="messageTextarea" name="message" rows="5" placeholder="Enter your message..." required></textarea>
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
function showVideoChat(){
    document.getElementById('videoChatSection').style.display = 'block'
    videoChat()
}
function closeVideoChat(){
    document.getElementById('videoChatSection').style.display = 'none'
}
function showSendMessage(){
    document.getElementById('sendMessageSection').style.display = 'block'
    sendMessage()
}
function closeSendMessage(){
    document.getElementById('sendMessageSection').style.display = 'none'
}