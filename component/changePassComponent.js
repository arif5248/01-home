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
                <form action="#">
                <div class="inputItem">
                    <input id="oldPass" type="password" placeholder="Enter Old Password">
                    <div class="iconPass">
                        <img onclick="showPass('hide_old_pass','show_old_pass','oldPass')" style="width: 30px;" id="hide_old_pass" src="../images/icons/closeEye.png" alt="hide password">
                        <img onclick="hidePass('hide_old_pass','show_old_pass','oldPass')" style="width: 30px;" id="show_old_pass" src="../images/icons/view.png"" alt="hide password">
                    </div>
                </div>
                <div class="inputItem">
                    <input id="newPass" type="password" placeholder="Enter New Password">
                    <div class="iconPass">
                        <img onclick="showPass('hide_new_pass','show_new_pass','newPass')" style="width: 30px;" id="hide_new_pass" src="../images/icons/closeEye.png" alt="hide password">
                        <img onclick="hidePass('hide_new_pass','show_new_pass','newPass')" style="width: 30px;" id="show_new_pass" src="../images/icons/view.png"" alt="hide password">
                    </div>
                </div>
                <div class="inputItem">
                    <input id="confirm_New_Pass" type="password" placeholder="Confirm New Password">
                    <div class="iconPass">
                        <img onclick="showPass('hide_cn_pass','show_cn_pass','confirm_New_Pass')" style="width: 30px;" id="hide_cn_pass" src="../images/icons/closeEye.png" alt="hide password">
                        <img onclick="hidePass('hide_cn_pass','show_cn_pass','confirm_New_Pass')" style="width: 30px;" id="show_cn_pass" src="../images/icons/view.png"" alt="hide password">
                    </div> 
                </div>
                </form>
            </div>
        </div>
        
        `
    }

    changePass()
    document.getElementById('show_old_pass').style.display = 'none'
    document.getElementById('show_new_pass').style.display = 'none'
    document.getElementById('show_cn_pass').style.display = 'none'

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
