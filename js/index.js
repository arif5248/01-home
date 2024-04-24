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
        const password = passwordInput.value;
        
        try {
            const loginResponse = await investorLogin(userId, password);
            if (loginResponse[0].LoggedInStatus === 'Success'){
                localStorage.setItem('loginData', JSON.stringify(loginResponse));
                const userDashBoard = await getDashBoardData(loginResponse[0].LoggedInInvestorId)
                
                if(userDashBoard && userDashBoard !== undefined){
                    localStorage.setItem('dashBoard', JSON.stringify(userDashBoard));
                    window.location.href = '../mainPage/home.html';
                }
                
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
function sendMessage(){
    document.getElementById('sendMessageSection').innerHTML = `
    <div class="sendMessageHeading">
        <span></span>
        <h3>Send Message</h3>
        <img onclick="closeSendMessage()" src="./images/icons/remove.png" alt="Close">
    </div>
    <div class="container">
        <div class="sendMessageBody">
            <form action="" method="post" enctype="multipart/form-data">
                <select name="" id="messageType">
                    <option value="">-- Select Type --</option>
                </select>
                <input type="text" placeholder="Enter Name" class="inputStyle input-color" id="msg_req_user_name" name="name">
                <input type="text" placeholder="Enter Mobile Number" class="inputStyle input-color" id="msg_req_user_mobile" name="mobile">
                <input type="text" placeholder="Enter Email Address" class="inputStyle input-color" id="msg_req_user_email" name="email">
                <textarea id="messageTextarea" name="message" rows="7" placeholder="Enter your message..."></textarea>
                <div class="file">
                    <label for="fileInput" class="fileInputLabel">
                        <span>Browse</span>
                        <input type="file" id="fileInput" name="file" accept=".jpg, .jpeg, .png, .pdf">
                    </label>
                    <span>Allowed file type PNG, JPEG, PDF</span>
                </div>
                <button class= "submitSendMsg" type="submit">Submit</button>
            </form>
        </div>
    </div>
    `
}
function videoChat(){
    document.getElementById('videoChatSection').innerHTML = `
    <div class="sendMessageHeading">
        <span></span>
        <h3>Video Chat(Via Zoom)</h3>
        <img onclick="closeVideoChat()" src="./images/icons/remove.png" alt="Close">
    </div>
    <div class="container">
        <div class="sendMessageBody">
            <form action="" method="post" enctype="multipart/form-data">
                <input type="text" placeholder="Enter Name" class="inputStyle input-color" id="video_req_user_name" name="name">
                <input type="text" placeholder="Enter Mobile Number" class="inputStyle input-color" id="video_req_user_mobile" name="mobile">
                <input type="text" placeholder="Enter Email Address" class="inputStyle input-color" id="video_req_user_email" name="email">
                <input type="date" placeholder="Select a Date" class="inputStyle input-color" id="video_req_date" name="date">
                <input type="time" placeholder="Select a Time" class="inputStyle input-color" id="video_req_time" name="time">
                <button class= "submitSendMsg" type="submit">Submit</button>
            </form>
        </div>
    </div>
   `
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
    })
}
function closeGetNew01Id(){
    document.getElementById('get-new-01-ID').style.display = 'none'
}
function showForgotPassword() {
    var modal = document.getElementById('forgotPasswordModal');
    modal.style.display = 'block';
}
function closeForgotPasswordModal() {
   document.getElementById('forgotPasswordModal').style.display = 'none';
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
    document.getElementById('support-slide').style.display = 'block'
}
function closeSupportTeam(){
    document.getElementById('support-slide').style.display = 'none'
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
    const existUser = localStorage.getItem('loginData');
    if(existUser){
        window.location.href = '../mainPage/home.html';
    }
}

window.onload = function() {
    existUser()
    closeForgotPasswordModal();
    closeGetNew01Id();
    closeSendMessage();
    closeVideoChat();
    closeSupportTeam();
    videoChat();
    sendMessage();
    hidePassword();
    
    
};
