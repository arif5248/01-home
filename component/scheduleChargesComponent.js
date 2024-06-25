async function executeScheduleCharges(){
    let data =[]
    const fetchedScheduleOfCharges = await getScheduleOfCharges()
    if(fetchedScheduleOfCharges.status === true){
        data = fetchedScheduleOfCharges.Data
    }
    function scheduleCharges(){
        document.getElementById('mainContentSection').innerHTML = `
        <div class="pageHeading" id="financial-Heading">
            <div class="heading">
                <h1>Schedule of Charges</h1>
            </div>
        </div>

        <div onscroll="resetLogoutTimer()" style='flex: 1 auto; height: 100%; overflow-y: auto;' class="chargeSection">
            <div class="container">
                <div id='scheduleChargesItem'></div>
            </div>
        </div>
        `
    }

    function renderAllCharges(){
        const contentBody = document.getElementById('scheduleChargesItem')
        data.forEach((item, index)=> {
            const newDiv = document.createElement('div')
            newDiv.innerHTML=`
            <p style='padding: 5px' id='item1${index}'>${item.title}</p>
            <p style='padding: 5px' id='item2${index}'>${item.value}</p>
            `
            contentBody.appendChild(newDiv)
            const items = document.querySelectorAll('.item');
            const height1 = document.getElementById(`item1${index}`).offsetHeight
            const height2 = document.getElementById(`item2${index}`).offsetHeight
            if(height1 >= height2){
                document.getElementById(`item2${index}`).style.height = height1 + 'px'
            }else{
                document.getElementById(`item1${index}`).style.height = height2 + 'px'
            }
        })
    }

    scheduleCharges()
    renderAllCharges()
}