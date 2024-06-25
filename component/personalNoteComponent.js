async function executePersonalNote(){
    // let user = null;
    let allNoteData = []
    // const storedData = sessionStorage.getItem('loginData');
    // if (storedData) {
    //     const loginData = JSON.parse(storedData);
    //     user = loginData[0]
    // }else{
    //     window.location.href = '../index.html';
    // }
    
    let fetchedData =await getAllNotes(user.LoggedInInvestorId)
    if(fetchedData.status === true){
        allNoteData = fetchedData.NoteList
    }

    function showPopUp(heading, body, footer){
        document.getElementById('overlay').style.display = 'block'
        document.getElementById('popUpDiv').style.display = 'block'
        document.getElementById('popUpDiv').innerHTML = `
            <div class='popUpHeader'>
                <h5>${heading}</h5>
            </div>
            <div class='popUpBody'>${body}</div>
            <div class='popUpFooter'>${footer}</div>
        `
        document.getElementById('overlay').addEventListener('click', ()=>{
            document.getElementById('overlay').style.display = 'none'
            document.getElementById('popUpDiv').style.display = 'none'
        })
    }
    function personalNoteComponent(){
        let today = new Date().toISOString().split('T')[0];
        today = customDateConverter(today, 'defaultToCustom')
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
                                <input style="text-align: center;" type="text" id="noteDate" name="reqDate" value=${today} required readonly>
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
                                    <input id='noteBoxClear' class='btn btn-danger' style="border: none;" type="button" value="CLEAR">
                                    <input class='btn btn-success' style="border: none;" value="SAVE" type='submit'>
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
                    <div onscroll="resetLogoutTimer()" class="all-note-box" id='all_note_box'>
                        
                    </div>
                </div>
            </div>
        </div>
        <div style='display: none;' id='popUpDiv'></div>
        `
        async function saveNote () {
            const note_date = document.getElementById('noteDate').value
            const note_body = document.getElementById('noteBody').value
            const note_atn = document.getElementById('atn').value ? document.getElementById('atn').value : null
        
            const result = await createOrEditPersonalNote(user.LoggedInInvestorId, note_date, note_body, note_atn)
            
            if(result){
                let fetchedData =await getAllNotes(user.LoggedInInvestorId)
                if(fetchedData.status === true){
                    allNoteData = fetchedData.NoteList
                }
                const heading = `${result.status === true ? 'Success' : 'Failed'}`
                const body =`
                    <p>${result.message}</p>
                `
                const footer = `
                    <p style='width: 98%' class='btn btn-success' id='submitPopUp'>Ok</p>
                `
                showPopUp(heading,body,footer)
                document.getElementById('submitPopUp').addEventListener('click', async ()=>{
                    document.getElementById('overlay').style.display = 'none';
                    document.getElementById('popUpDiv').style.display = 'none';
                    personalNoteComponent()
                    renderAllNote()
                })
                
            }
        }
        document.getElementById('noteBoxClear').addEventListener('click', ()=>{
            document.getElementById('noteBody').value= '';
            // const heading = 'Confirmation'
            // const body =`
            //     <p>Are you sure to clear the note?</p>
            // `
            // const footer = `
            //     <p class='btn btn-danger' id='cancelPopUp'>Cancel</p>
            //     <p class='btn btn-success' id='submitPopUp'>Ok</p>
            // `
            // showPopUp(heading,body,footer)
            // document.getElementById('cancelPopUp').addEventListener('click', ()=>{
            //     document.getElementById('popUpDiv').style.display = 'none'
            //     document.getElementById('overlay').style.display = 'none';
            // })
            // document.getElementById('submitPopUp').addEventListener('click', ()=>{
            //     document.getElementById('popUpDiv').style.display = 'none';
            //     document.getElementById('overlay').style.display = 'none';
            //     document.getElementById('noteBody').value= '';
            // })

        })
        document.getElementById('personalnoteForm').addEventListener('submit', (event)=>{
            event.preventDefault()
            const heading = 'Confirmation'
            const body =`
                <p>Are you sure to save the note?</p>
            `
            const footer = `
                <p class='btn btn-danger' id='cancelPopUp'>Cancel</p>
                <p class='btn btn-success' id='submitPopUp'>Ok</p>
            `
            showPopUp(heading,body,footer)
            document.getElementById('cancelPopUp').addEventListener('click', ()=>{
                document.getElementById('popUpDiv').style.display = 'none'
                document.getElementById('overlay').style.display = 'none';
            })
            document.getElementById('submitPopUp').addEventListener('click', async ()=>{
                document.getElementById('popUpDiv').style.display = 'none';
                document.getElementById('overlay').style.display = 'none';
                await saveNote()
            })

        })
    }
    async function renderAllNote(){
        const noteBox = document.getElementById('all_note_box')
        allNoteData.forEach(note => {
            const newDiv = document.createElement('div')
            newDiv.innerHTML = `
                <div class = 'box'>
                    <div class="note-content">
                        <div class='note_date'>${customDateConverter(note.Date.split(' ')[0], 'defaultToCustom')}</div>
                        <div class='note_body'>${note.Notes}</div>
                    </div>
                    <div class="note_btn">
                        <div id='editNote${note.atn}' class='btn btn-success'  class="edtBtn">EDIT</div>

                        <div id='deleteNote${note.atn}' class='btn btn-danger'  class='deleteBtn'>DELETE</div>
                    </div>
                </div>
            `
            noteBox.appendChild(newDiv)
            async function deleteNote(id, atn){
                const deleteUpdate = await deletePersonalNote(id, atn)
                if(deleteUpdate){
                    let fetchedData =await getAllNotes(user.LoggedInInvestorId)
                    if(fetchedData.status === true){
                        allNoteData = fetchedData.NoteList
                    }
                    const heading = `${deleteUpdate.status === true ? 'Success' : 'Failed'}`
                    const body =`
                        <p>${deleteUpdate.message}</p>
                    `
                    const footer = `
                        <p style='width: 98%' class='btn btn-success' id='submitPopUp'>Ok</p>
                    `
                    showPopUp(heading,body,footer)
                    document.getElementById('submitPopUp').addEventListener('click', async ()=>{
                        document.getElementById('popUpDiv').style.display = 'none';
                        document.getElementById('overlay').style.display = 'none';
                        personalNoteComponent()
                        renderAllNote()
                    })
                    
                }
            }

            document.getElementById(`editNote${note.atn}`).addEventListener('click', async ()=>{
                const heading = 'Confirmation'
                const body =`
                    <p>Are you sure to Edit the note?</p>
                `
                const footer = `
                    <p class='btn btn-danger' id='cancelPopUp'>Cancel</p>
                    <p class='btn btn-success' id='submitPopUp'>Ok</p>
                `
                showPopUp(heading,body,footer)
                document.getElementById('cancelPopUp').addEventListener('click', ()=>{
                    document.getElementById('popUpDiv').style.display = 'none'
                    document.getElementById('overlay').style.display = 'none';
                })
                document.getElementById('submitPopUp').addEventListener('click', ()=>{
                    document.getElementById('noteBody').value = note.Notes
                    document.getElementById('atn').value = note.atn
                    document.getElementById('popUpDiv').style.display = 'none';
                    document.getElementById('overlay').style.display = 'none';
                })
            })

            document.getElementById(`deleteNote${note.atn}`).addEventListener('click', async ()=>{
                const heading = 'Confirmation'
                const body =`
                    <p>Are you sure to Delete the note?</p>
                `
                const footer = `
                    <p class='btn btn-danger' id='cancelPopUp'>Cancel</p>
                    <p class='btn btn-success' id='submitPopUp'>Ok</p>
                `
                showPopUp(heading,body,footer)
                document.getElementById('cancelPopUp').addEventListener('click', ()=>{
                    document.getElementById('popUpDiv').style.display = 'none'
                    document.getElementById('overlay').style.display = 'none';
                })
                document.getElementById('submitPopUp').addEventListener('click', async ()=>{
                    document.getElementById('popUpDiv').style.display = 'none';
                    document.getElementById('overlay').style.display = 'none';
                    await deleteNote(user.LoggedInInvestorId, note.atn)
                })
            })
        });
        
        
    }
    
    personalNoteComponent()
    renderAllNote()

    

}
// async function executeDeleteNote(id, atn){
//     await deletePersonalNote(id, atn)
//     await route('../component/personalNoteComponent.js','../css/personalNoteComponent.css', 'personalNote')
// }

function resizeTextbox(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = (textarea.scrollHeight) + "px";
}



