function executeChangePass(){

    function changePass(){
        document.getElementById('mainContentSection').innerHTML = `
        <div class="pageHeading" id="financial-Heading">
            <div class="heading">
                <h1>Change Password</h1>
            </div>
        </div>

        <div class="container">
            <div class="changePassBody">
                <form id='changePassForm'>
                    <input type="text" id="userId" name="userId" style="display: none;" aria-hidden="true" autocomplete="user-Id">
                    <div class="inputItem">
                        <input id="oldPass" type="password" placeholder="Enter Old Password" autocomplete="current-password" required>
                        <div class="iconPass">
                            <img onclick="showPass('hide_old_pass','show_old_pass','oldPass')" style="width: 30px;" id="hide_old_pass" src="../images/icons/closeEye.png" alt="hide password">
                            <img onclick="hidePass('hide_old_pass','show_old_pass','oldPass')" style="width: 30px;" id="show_old_pass" src="../images/icons/view.png"" alt="hide password">
                        </div>
                    </div>
                    <div class="inputItem">
                        <input id="newPass" type="password" placeholder="Enter New Password" autocomplete="new-password" required>
                        <div class="iconPass">
                            <img onclick="showPass('hide_new_pass','show_new_pass','newPass')" style="width: 30px;" id="hide_new_pass" src="../images/icons/closeEye.png" alt="hide password">
                            <img onclick="hidePass('hide_new_pass','show_new_pass','newPass')" style="width: 30px;" id="show_new_pass" src="../images/icons/view.png"" alt="hide password">
                        </div>
                    </div>
                    <div class="inputItem">
                        <input id="confirm_New_Pass" type="password" placeholder="Confirm New Password" autocomplete="new-password" required>
                        <div class="iconPass">
                            <img onclick="showPass('hide_cn_pass','show_cn_pass','confirm_New_Pass')" style="width: 30px;" id="hide_cn_pass" src="../images/icons/closeEye.png" alt="hide password">
                            <img onclick="hidePass('hide_cn_pass','show_cn_pass','confirm_New_Pass')" style="width: 30px;" id="show_cn_pass" src="../images/icons/view.png"" alt="hide password">
                        </div> 
                    </div>
                    <p style='display: none' id=showError></p>
                    <div class="inputItem">
                        <input style='background-color: #4CB050; color: #fff;' type='submit' value='Change Password'>
                    </div>
                </form>
                <div style='display: none; text-align: center;' id=showResult></div>
            </div>
        </div>
        
        `
    }

    changePass()
    document.getElementById('show_old_pass').style.display = 'none'
    document.getElementById('show_new_pass').style.display = 'none'
    document.getElementById('show_cn_pass').style.display = 'none'
    document.getElementById('changePassForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const inv_id = user.LoggedInInvestorId
        const oldPass = document.getElementById('oldPass').value
        const newPass = document.getElementById('newPass').value
        const confirmPass = document.getElementById('confirm_New_Pass').value
        if(newPass === confirmPass){
            document.getElementById('showError').style.display = 'none'
            document.getElementById('newPass').style.borderColor = '#000'
            document.getElementById('confirm_New_Pass').style.borderColor = '#000'
            document.getElementById('showError').innerHTML = ''

            const result = await postPassChange({inv_id, oldPass, newPass})
            
            if(result.status === true){
                document.getElementById('oldPass').value=''
                document.getElementById('newPass').value=''
                document.getElementById('confirm_New_Pass').value=''

                document.getElementById('showResult').style.display = 'block'
                document.getElementById('showResult').innerHTML = `
                    <p id='resultMsg'>${result.message}</p>
                `
                setTimeout(() => {
                    document.getElementById('showResult').style.display = 'none'
                    document.getElementById('showResult').innerHTML = ''
                }, 3000);
            }else{
                document.getElementById('showResult').style.display = 'block'
                document.getElementById('showResult').innerHTML = `
                    <p id='resultMsg'>${result.message}</p>
                `
                document.getElementById('resultMsg').style.backgroundColor = 'red'
                setTimeout(() => {
                    document.getElementById('showResult').style.display = 'none'
                    document.getElementById('showResult').innerHTML = ''
                }, 5000);
            }
            console.log(result)
        }else{
            document.getElementById('showError').style.display = 'block'
            document.getElementById('showError').style.textAlign = 'right'
            document.getElementById('showError').style.color = 'red'
            document.getElementById('newPass').style.borderColor = 'red'
            document.getElementById('confirm_New_Pass').style.borderColor = 'red'
            document.getElementById('showError').innerHTML = `New Password Doesn't Match`
        }

    })

}
function showPass(h_iconId,s_iconId,inputId){
    

    document.getElementById(s_iconId).style.display = 'block'
    document.getElementById(h_iconId).style.display = 'none'
    document.getElementById(inputId).type='text'


}
function hidePass(h_iconId,s_iconId,inputId){
    document.getElementById(s_iconId).style.display = 'none'
    document.getElementById(h_iconId).style.display = 'block'
    document.getElementById(inputId).type='password'
}
