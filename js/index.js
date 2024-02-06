const countryCityCodeinfo = [
    {
        country: "Bangladesh",
        cities: ["Dhaka", "Chittagong", "Naogaon", "Rajshahi"],
        countryCode: "+880"
    },
    {
        country: "United States",
        cities: ["New York", "Deer Park", "New Jersey"],
        countryCode: "+1"
    }
];


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

function showGetNew01Id(){
    document.getElementById('logInDetails').style.display = 'none'
    document.getElementById('get-new-01-ID').style.display = 'block'
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

    for (let countryObject of countryCityCodeinfo) {
        selectCountry.options[selectCountry.options.length] = new Option(countryObject.country, countryObject.countryCode);
    }

    selectCountry.onchange = function () {
        const selectedCountryCode = this.value;
        const selectedCountry = countryCityCodeinfo.find(country => country.countryCode === selectedCountryCode);

        if (selectedCountry) {
            selectCity.innerHTML = "";
            for (let city of selectedCountry.cities) {
                selectCity.options[selectCity.options.length] = new Option(city, city);
            }

            selectCountryCode.innerHTML = selectedCountry.countryCode;

            selectCity.disabled = false;
            selectCountryCode.disabled = false;
        } else {
            console.error("Selected country not found in the data.");
        }
    };
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


window.onload = function() {
    closeForgotPasswordModal();
    closeGetNew01Id();
    closeSendMessage();
    closeVideoChat();
    selectCountryCityCode();
    closeSupportTeam();
    videoChat();
    sendMessage();
    hidePassword();
    
};
