
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

