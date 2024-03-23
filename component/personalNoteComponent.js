async function executePersonalNote(){
    let user = null;
    let allNoteData = []
    const storedData = localStorage.getItem('loginData');
    if (storedData) {
        const loginData = JSON.parse(storedData);
        user = loginData[0]
    }else{
        window.location.href = '../index.html';
    }
    
    let fetchedData =await getAllNotes(user.LoggedInInvestorId)
    if(fetchedData.status === true){
        allNoteData = fetchedData.NoteList
    }
    function personalNoteComponent(){
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('mainContentSection').innerHTML = `
        <div class="pageHeading" id="financial-Heading">
            <div class="heading">
                <h1>Personal Notes</h1>
            </div>
        </div>

        <div class='personalNoteBody'>
            <form method="post" id='personalnoteForm'>
                <div class="date-box-body">
                    <div class="container">
                        <div class="box" >
                            <div class="date-box">
                                <label for="noteDate">Date</label>
                                <input style="text-align: center;" type="date" id="noteDate" name="reqDate" value=${today} required readonly>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="note-box-body">
                    <div class="container">
                        <div class="box" >
                            <div class="note-box">
                                <input style='display: none;' type="text" id="atn" name="atn" readonly>
                                <div class="text-box">
                                    <textarea placeholder="Enter your notes here" id="noteBody" rows="1" oninput="resizeTextbox(this)" required></textarea>
                                </div>
                                <div class="proceed-btn">
                                    <input type="button" value="CLEAR" onclick="clearText()">
                                    <input type="submit" value="SAVE">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>

        <div class="all-note-box-body">
            <div class="container">
                <div class="box" >
                    <div class="all_note_heading">
                        <p>Date</p>
                        <p>Note</p>
                    </div>
                    <div class="all-note-box" id='all_note_box'>
                        
                    </div>
                </div>
            </div>
        </div>

        <br>
        <br>
        <br>
        <br>
        
        `
    }
    async function renderAllNote(){
        const noteBox = document.getElementById('all_note_box')
        allNoteData.forEach(note => {
            const newDiv = document.createElement('div')
            newDiv.innerHTML = `
                <div class = 'box'>
                    <div class="note-content">
                        <div class='note_date'>${note.Date.split(' ')[0]}</div>
                        <div class='note_body'>${note.Notes}</div>
                    </div>
                    <div class="note_btn">
                    <div onclick="executeEditNote('${user.LoggedInInvestorId}', ${note.atn}, '${note.Notes}')" class="edtBtn">EDIT</div>

                        <div onclick='executeDeleteNote(${user.LoggedInInvestorId} ,${note.atn})' class='deleteBtn'>DELETE</div>
                    </div>
                </div>
            `
            noteBox.appendChild(newDiv)
        });
        
        
    }
    
    personalNoteComponent()
    renderAllNote()

    const personalNoteForm = document.getElementById('personalnoteForm')
    personalNoteForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const note_date = document.getElementById('noteDate').value
        const note_body = document.getElementById('noteBody').value
        const note_atn = document.getElementById('atn').value ? document.getElementById('atn').value : null
    
        const result = await createOrEditPersonalNote(user.LoggedInInvestorId, note_date, note_body, note_atn)
        await removeFooterBtnState(); 
        await route('../component/personalNoteComponent.js','../css/personalNoteComponent.css', 'personalNote')
    })

}
async function executeDeleteNote(id, atn){
    await deletePersonalNote(id, atn)
    await route('../component/personalNoteComponent.js','../css/personalNoteComponent.css', 'personalNote')
}
async function executeEditNote(id, atn, noteBody){
    console.log(id,atn, noteBody)
    
    document.getElementById('noteBody').value = noteBody
    document.getElementById('atn').value = atn
    
    // await route('../component/personalNoteComponent.js','../css/personalNoteComponent.css', 'personalNote')

}
function resizeTextbox(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = (textarea.scrollHeight) + "px";
}
function clearText(){
    document.getElementById('noteBody').value= ''
}


