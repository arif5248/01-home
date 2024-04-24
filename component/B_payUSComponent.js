async function executeB_HowToPayUs(){
    let  mobile = []
    let  card = []
    let  bank = []

    const fetchedData = await getPayUsList()
    if(fetchedData.status === true){
        mobile = fetchedData.Mobile
        card = fetchedData.Card
        bank = fetchedData.Bank
    }

    function B_HowToPayUs(){
        document.getElementById('page_heading').innerHTML=`How To Pay Us`
        document.getElementById('beforeMain').innerHTML = `
        <div class="howToPayUsSection">
            <div class="container">
                <div class="payUscontent" id="payUscontent">
                    <div class="payUsMobile">
                        <div class="payUsHeading">
                            <h4>Mobile</h4>
                            <hr style='opacity: 1;'>
                        </div>
                        <div id ='payUsMobile' class="payUs"></div>
                    </div>
                    <div class="payUsCard">
                        <div class="payUsHeading">
                            <h4>Card</h4>
                            <hr style='opacity: 1;'>
                        </div>
                        <div id ='payUsCard' class="payUs"></div>
                    </div>
                    <div class="payUsBank">
                        <div class="payUsHeading">
                            <h4>Bank</h4>
                            <hr style='opacity: 1;'>
                        </div>
                        <div id ='payUsBank' class="payUs"></div>
                    </div>
                </div>
            </div>
        </div>
    `
   
    }
    
function renderAllImage(){
    const mobileSection = document.getElementById('payUsMobile')
    mobile.forEach(item => {
        const newDiv = document.createElement('div')
        newDiv.classList.add('payUsType')
        newDiv.innerHTML=`
            <img style='width: 70px; height: aut0;' src='${item.Image}' alt='${item.Name}'>
        `
        mobileSection.appendChild(newDiv)
    })

    const cardSection = document.getElementById('payUsCard')
    card.forEach(item => {
        const newDiv = document.createElement('div')
        newDiv.classList.add('payUsType')
        newDiv.innerHTML=`
            <img style='width: 70px; height: aut0;' src='${item.Image}' alt='${item.Name}'>
        `
        cardSection.appendChild(newDiv)
    })

    const bankSection = document.getElementById('payUsBank')
    bank.forEach(item => {
        const newDiv = document.createElement('div')
        newDiv.classList.add('payUsType')
        newDiv.innerHTML=`
            <img style='width: 70px; height: aut0;' src='${item.Image}' alt='${item.Name}'>
        `
        bankSection.appendChild(newDiv)
    })
}

    B_HowToPayUs()
    renderAllImage()
}
