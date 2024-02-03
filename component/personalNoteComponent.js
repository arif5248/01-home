function executePersonalNote(){

    function personalNoteComponent(){
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('mainContentSection').innerHTML = `
        <div class="pageHeading" id="financial-Heading">
            <div class="heading">
                <h1>Personal Notes</h1>
            </div>
        </div>

        <div class="date-box-body">
            <div class="container">
                <div class="box" >
                    <div class="date-box">
                        <label for="reqDate">Date</label>
                        <input type="date" id="reqDate" name="reqDate" value=${today} required >
                    </div>
                </div>
            </div>
        </div>

        <div class="note-box-body">
            <div class="container">
                <div class="box" >
                    <div class="note-box">
                        <div class="text-box">
                            <textarea placeholder="Enter your notes here" id="dynamic-textbox" rows="1" oninput="resizeTextbox(this)"></textarea>
                        </div>
                        <div class="proceed-btn">
                            <input type="button" value="CLEAR" onclick="clearText()">
                            <input type="submit" value="SAVE">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="all-note-box-body">
            <div class="container">
                <div class="box" >
                    <div class="all_note_heading">
                        <p>Date</p>
                        <p>Note</p>
                    </div>
                    <div class="all-note-box">
                        
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

    personalNoteComponent()
}
function resizeTextbox(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = (textarea.scrollHeight) + "px";
}
function clearText(){
    document.getElementById('dynamic-textbox').value= ''
}


