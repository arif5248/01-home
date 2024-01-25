function executeOpenBOAcc(){
    const data = {
        status:'BO Account opened successfully',
        BO_Number:123434380398308,
        BO_Date:'18/Aug/2021',
        BO_Name:'MD. KAISER RAIHAN',
        CDBL_BO_Acknowledgement_url:'#',
        signed_Doc_url:'#'                
    }
    
    function openBoAccount(){
        document.getElementById('mainContentSection').innerHTML = 
        `
            <div class="BO-Heading" id="BO-Heading">
                <div class="heading">
                    <h1>Open BO Account</h1>
                </div>
    
                <div class="container">
                    <div class="BO-content" id="BO-content">
                        
                    </div>
                </div>
            </div>
        `
    }
    
    
    function bo_account_details (){
        document.getElementById('BO-content').innerHTML =
        `
            <div class="BO-status">
                <h3>${data.status}</h3>
            </div>
            
            <table>
                <tr>
                    <td>BO Number</td>
                    <td>${data.BO_Number}</td>
                </tr>
    
                <tr>
                    <td>BO Date</td>
                    <td>${data.BO_Date}</td>
                </tr>
    
                <tr>
                    <td>BO Name</td>
                    <td>${data.BO_Name}</td>
                </tr>
    
                <tr>
                    <td>CDBL BO<br>Acknowledgement</td>
                    <td><a href=${data.CDBL_BO_Acknowledgement_url}">View File</a></td>
                </tr>
    
                <tr>
                    <td>All Signed Documents</td>
                    <td><a href=${data.signed_Doc_url}>View File</a></td>
                </tr>
            </table>
            <div class="showBOForm"><h5>SHOW BO FORM</h5></div>
        ` 
    }
    const myNameSpace = {}
    myNameSpace.v1=data
    openBoAccount()
    bo_account_details ()
}