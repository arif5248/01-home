async function executeOpenBoForm(){

    function openBoForm(){
        document.getElementById('mainContentSection').innerHTML = `
        <div class="pageHeading" id="financial-Heading">
            <div class="heading">
                <h1>BO FORM</h1>
            </div>
        </div>

        <div class=" boFormContainer">
            <div id='boFormDiv'></div>
        </div>
        
        `
    }
    function renderBoForm(){
        document.getElementById('boFormDiv').innerHTML = `
        <iframe onscroll="resetLogoutTimer()" class="content" id="contentIframe"></iframe>
        `
        document.getElementById('contentIframe').src = `https://01.limited/wvboaccount.aspx?id=${user.LoggedInInvestorId}`;
        intervalClosere = setInterval(() => {
           resetLogoutTimer()
        }, 60 * 1000);
    }
    openBoForm()
    renderBoForm()
}