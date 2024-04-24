async function executeOpenBOAcc(){
    let boData = []
    const fetchedData = await getBoStatus(user.LoggedInInvestorId)
    if(fetchedData.status === true){
        boData = fetchedData.Data
    }
    if(boData[0].bo_id === ''){
        window.location.href = 'https://01.limited/wvboaccount.aspx?id=101'
    }
    function openBoAccount(){
        document.getElementById('mainContentSection').innerHTML = 
        `
            <div class="BO-Heading" id="BO-Heading">
                <div class="heading">
                    <h1>Open BO Account</h1>
                </div>
            </div>
            <div class='boContentSection'>
                <div class="container">
                    <div class="BO-content" id="BO-content"></div>
                </div>
            </div>
        `
    }
    
    
    function bo_account_details (){
        document.getElementById('BO-content').innerHTML =
        `
            <div class="BO-status">
                <h3>${boData[0].bo_id === ''? "You Don't have BO Account. Please Click on Show BO Form":'BO Account Opened Successfully'}</h3>
            </div>
            
            <table>
                <tr>
                    <td>BO Number</td>
                    <td>${boData[0].bo_id}</td>
                </tr>
    
                <tr>
                    <td>BO Date</td>
                    <td>${boData[0].bo_date}</td>
                </tr>
    
                <tr>
                    <td>BO Name</td>
                    <td>${boData[0].inv_name}</td>
                </tr>
    
                <tr>
                    <td>CDBL BO<br>Acknowledgement</td>
                    <td><a href=${boData[0].CDBL}>View File</a></td>
                </tr>
    
                <tr>
                    <td>All Signed Documents</td>
                    <td><a href=${boData[0].Signed}>View File</a></td>
                </tr>
            </table>
            <div class="showBOForm">
                <a href='https://01.limited/wvboaccount.aspx?id=101'>    
                    <h5>SHOW BO FORM</h5>
                </a>
            </div>
        ` 
    }
    
    openBoAccount()
    bo_account_details ()
    
    
}