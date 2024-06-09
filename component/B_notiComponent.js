async function executeB_Notification(){
    let notificationData= [];
    const fetchedData = await getGeneralNotification()
    if(fetchedData.status === true){
        notificationData = fetchedData.Data
    }
    function B_Notification(){
        document.getElementById('beforeMain').innerHTML = `
            <h3 id="page_heading">Notifications</h3>
            <div class="noti-section" id="noti-section" style="flex: 1 auto;height: 100%;overflow-y: auto;">
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
                <button id='noti${index}' class="btn btn-primary btn-details">Details</button>
            </div>
            `;
    
            newDiv.appendChild(newContent);
            document.getElementById(`noti${index}`).addEventListener('click', ()=>{
                document.getElementById('overlay').style.display = 'block'
                document.getElementById('notiDetails').style.display = 'block'
                document.getElementById('notiDetails').innerHTML = `
                    <div class='popUpHeading'>${content.NotificationTitle}</div>
                    <div class='notiDetails'>${content.Notification}</div>
                    <div class='notiClose' id='notiClose'>
                        <div style='width:98%;' class='btn btn-primary'>OK</div>
                    </div>
                `
                document.getElementById('overlay').addEventListener('click', ()=>{
                    document.getElementById('overlay').style.display = 'none'
                document.getElementById('notiDetails').style.display = 'none'
                })
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
