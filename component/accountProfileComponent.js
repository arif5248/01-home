async function executeAccountProfile(){
    // await saveLog(user.LoggedInInvestorId, 'Account Profile');
    const userDetails = await getUserDetailsData(user.LoggedInInvestorId)
    function accountProfile(){
        document.getElementById('mainContentSection').innerHTML = `
        <div class="pageHeading" id="financial-Heading">
            <div class="heading">
                <h1>Account Profile</h1>
            </div>
        </div>

        <div class="container">
            <div class="inv_ProfileBox">
                <div id='img_box_1' class="img_box">
                    <div class="img_border_box">
                        <div class='invImgDiv'>
                            <img class='invPhoto' alt='Investor Photo' src=${userDetails.Photo[0].Photo}>
                        </div>
                        <div class='divHeading'>
                            <p>Photo</p>
                        </div> 
                    </div>
                </div>
                <div id='img_box_2' class="img_box">
                    <div class="img_border_box">
                        <div class='invImgDiv'>
                            <img style='width: 95%; height: auto;' class='invSign' alt='Investor Signature' src=${userDetails.Sign[0].Sign}>
                        </div>
                        <div class='divHeading'>
                            <p>Signature</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class='container'>
            <div class='invDetailsBody' id='invDetailsBody'>
                <table>
                    <tbody>
                        
                    </tbody>
                </table>
            </div>
        </div>
        <div style="margin-bottom: 10px;" class='container boInformationBtn'>
            <p style="width: 100%;border-radius: 10px;" class='btn btn-primary' onclick="removeFooterBtnState(); route('../component/openBoAccountComponent.js','../css/openBoAccountComponent.css', 'openBoAccount')">BO Information</p>
        </div>
        
        `
        const invDetails = document.getElementById('invDetailsBody')
        userDetails.Data.forEach(item => {
            const newRow = document.createElement('tr')
            newRow.innerHTML=`
            <td>
                <p>${item.title}</P>
                <p>${item.value}</P>
            </td>
            `
            invDetails.querySelector('tbody').appendChild(newRow)
        })
    }
    function squareDiv()  {
        const imgBoxWidth = document.querySelector('.img_box').offsetWidth;
        const imgBoxes = document.querySelectorAll('.img_box');
        imgBoxes.forEach(imgBox => {
            imgBox.style.height = `${imgBoxWidth}px`;
        });
    };
    accountProfile()
    squareDiv() 
}