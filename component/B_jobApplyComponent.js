async function executeB_jobApply(data){
    const today = new Date().toISOString().split('T')[0];
    const obj = data.split('_')
    function B_jobApply(){
        document.getElementById('beforeMain').innerHTML = `
            <h3 id="page_heading">Job Apply</h3>
            <div class='heading'>
                <h5 style='font-size: 15px; margin: 0;'>${obj[1]}</h5>
            </div>
            <div class="jobApply-section">
                <div class="container">
                    <div class="jobApplyContent" id="jobApplyContent"></div>
                </div>
            </div>
        `
    }

    function renderJobApplyForm(){
        document.getElementById('jobApplyContent').innerHTML=`
            <form id='submitJobApply'>
                <div class="form-box-3">
                    <label for="date">Date: </label>
                    <input type="date" id="date" name="date" value='${today}' required>
                </div>
                <div class="form-box-3">
                    <label for="name">Name: </label>
                    <input type="text" id="name" name="name" placeholder="Enter Your Name" required>
                </div>
                <div class="form-box-3">
                    <label for="mobile">Mobile: </label>
                    <input type="text" id="mobile" name="mobile" placeholder="Enter Your Mobile" required>
                </div>
                <div class="form-box-3">
                    <label for="email">Email: </label>
                    <input type="email" id="email" name="email" placeholder="Enter Your Email" required>
                </div>
                <div class="fileContent">
                    <div class="file-box">
                        <label for="file-input" id="file-label">Browse</label>
                        <input type="file" id="file-input" name='file' onchange="previewFile()">
                    </div>
                    <h5>Attach your CV/Resume here(Only pdf/doc/docx Allowed)</h5>
                    <div id="preview-container">
                        <img id="preview-image" alt="File Preview">
                        <div id="undo-button" onclick="undoSelection()">
                            <img style='width:20px' src="../images/icons/remove.png" alt="close">
                        </div>
                    </div>
                </div>
                <div id='formValidationError'></div>
                <div class="proceed-btn">
                    <input id='cancelBtn' type="button" value="Cancel">
                    <input type="submit" value="PROCEED">
                </div>
            </form>
            <div id='showResult'></div>
        `
    }

    B_jobApply()
    renderJobApplyForm()

    document.getElementById('submitJobApply').addEventListener('submit', async (event) => {
        event.preventDefault()
        const file = document.getElementById('file-input').files[0];

        const formData = new FormData();
        formData.append('job_id', obj[0]);
        formData.append('date', document.getElementById('date').value);
        formData.append('name', document.getElementById('name').value);
        formData.append('mobile', document.getElementById('mobile').value);
        formData.append('email', document.getElementById('email').value);
        
        if(file){
            formData.append('profile_image', file);
            document.getElementById('formValidationError').innerHTML=''
            document.getElementById('file-label').style.borderColor = '#000'

            const result = await postCareer(formData)
            
            if(result.status === true){
                document.getElementById('showResult').innerHTML=`
                    <p id='showResultMessage'>${result.message}</p>
                `
                document.getElementById('showResultMessage').style.backgroundColor = '#4CB050'
                document.getElementById('file-input').value = ''; 
                document.getElementById('preview-container').style.display = 'none';
                setTimeout(() => {
                    document.getElementById('showResult').innerHTML=''
                    document.getElementById('showResult').style.display = 'none'
                }, 3000);
            }else{
                document.getElementById('showResult').innerHTML=`
                    <p id='showResultMessage'>${result.message}</p>
                `
                document.getElementById('showResultMessage').style.backgroundColor = 'red'
                setTimeout(() => {
                    document.getElementById('showResult').innerHTML=''
                    document.getElementById('showResult').style.display = 'none'
                }, 5000);
            }
            
        }else{
            document.getElementById('formValidationError').innerHTML=`
                <p style='text-align: right; color: red;'>Please Select Your File(pdf/doc)</p>
            `
            document.getElementById('file-label').style.borderColor = 'red'
        }
             
        
        
    })
    document.getElementById('cancelBtn').addEventListener('click',()=>{
        window.location.href = 'template.html?case=B_careerWith01'
    })
}
function previewFile() {
    let fileInput = document.getElementById('file-input');
    let previewContainer = document.getElementById('preview-container');
    let previewImage = document.getElementById('preview-image');
    let file = null
    file = fileInput.files[0];

    if (file) {
        let reader = new FileReader();

      reader.onload = function (e) {
        previewImage.src = e.target.result;
      };

      reader.readAsDataURL(file);

      previewContainer.style.display = 'block';
    }
}
function undoSelection() {
    let fileInput = document.getElementById('file-input');
    let previewContainer = document.getElementById('preview-container');

    fileInput.value = ''; // Clear the file input
    previewContainer.style.display = 'none'; // Hide the preview container
}