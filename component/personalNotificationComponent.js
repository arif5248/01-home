function executePersonalNotification(){

    function personalNotification(){
        document.getElementById('mainContentSection').innerHTML = `
        <div class="pageHeading" id="financial-Heading">
            <div class="heading">
                <h1>Personal Notification</h1>
            </div>
        </div>

        <div onscroll="resetLogoutTimer()" style="flex: 1 auto;height: 100%;overflow-y: auto;" class='noticeBodySection'>
            <div class="container">
                <div class='noticeBody' id='noticeBody'></div>
            </div>
        </div>
        `
    }
    async function renderNotifications(){
        const allPersonalNotification =await getPersonalNotification(user.LoggedInInvestorId)
        if(allPersonalNotification.status === true){
            const notificationBody = document.getElementById('noticeBody')
            allPersonalNotification.CompanyList.forEach(notification => {
                const newDiv = document.createElement('div')
                newDiv.classList.add('singleNoti')
                newDiv.innerHTML=`
                    <div class= 'date_status_row'>
                        <p>${notification.dt}</p>
                        <p>${notification.status}</p>
                    </div>
                    <div class='title_row'>
                        <h4>${notification.title}</h4>
                    </div>
                    <hr>
                    <div class='details_row'>
                        <h4>Details</h4>
                        <p>${notification.body}</P>
                    </div>
                    <div class='readBtnRow' id=${notification.id}>
                        <div onclick='executeNotificationStatus(${user.LoggedInInvestorId},${notification.id}, ${allPersonalNotification.unread})' class='btn btn-primary readBtn'>Mark as Read</div>
                    </div>
                    
                `
                
                notificationBody.appendChild(newDiv)
                if(notification.status === 'Read'){
                    document.getElementById(notification.id).style.display = 'none'
                }
            });
        }
    }
    
    personalNotification()
    renderNotifications()
}
async function executeNotificationStatus(inv_Id, msgId, unread){
    const result = await setNotificationStatus(inv_Id, msgId)
    localStorage.setItem('unreadNoti', Number(unread) - 1);
    route('../component/personalNotificationComponent.js','../css/personalNotificationComponent.css', 'personalNotification')
    
}