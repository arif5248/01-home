async function executeB_Notification(){
    let notificationData= [];
    const fetchedData = await getGeneralNotification()
    if(fetchedData.status === true){
        notificationData = fetchedData.Data
    }
    function B_Notification(){
        document.getElementById('page_heading').innerHTML=`Notifications`
        document.getElementById('beforeMain').innerHTML = `
            <div class="noti-section" id="noti-section">
                <div class="container">
                    <div class="noti-content" id="noti-content"></div>
                </div>
            </div>
            <div style='display: none' id='notiDetails'></div>
            <div style='display: none' id='overlay'></div>
        `
    }
    function populateNoti() {
        const newDiv = document.getElementById('noti-content');
    
        notificationData.forEach((content, index)=> {
            const newContent = document.createElement('div');
            newContent.classList.add('noti_item');
    
            newContent.innerHTML = `
            <div class="notification">
                <div class="date">${content.NotificationDate}</div>
                <div style="width: 100%;" class="headline"><h4>${content.NotificationTitle}</h4></div>
                <button id='noti${index}' class="btn btn-primary btn-details">View</button>
            </div>
            `;
    
            newDiv.appendChild(newContent);
            document.getElementById(`noti${index}`).addEventListener('click', ()=>{
                document.getElementById('overlay').style.display = 'block'
                document.getElementById('notiDetails').style.display = 'block'
                document.getElementById('notiDetails').innerHTML = `
                    <div class='notiDetails'>${content.Notification}</div>
                    <div style='text-align: right;' class='notiClose' id='notiClose'>
                        <div class='btn btn-primary'>OK</div>
                    </div>
                `
                document.getElementById('notiClose').addEventListener('click', ()=>{
                    document.getElementById('overlay').style.display = 'none'
                document.getElementById('notiDetails').style.display = 'none'
                })
            })
    
        });
    }


    B_Notification()
    populateNoti()
}
