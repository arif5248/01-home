function executePersonalNotification(){

    function personalNotification(){
        document.getElementById('mainContentSection').innerHTML = `
        <div class="pageHeading" id="financial-Heading">
            <div class="heading">
                <h1>Personal Notification</h1>
            </div>
        </div>

        <div class="container">
            <div >No Notce available right now</div>
        </div>
        
        `
    }

    personalNotification()
}