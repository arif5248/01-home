async function executeChildIdToMotherIdTrans(){
    let Data = [];
    let selectedIds = [];

    const fetchedAllChildIdList = await getAllChildIdList(user.LoggedInInvestorId)
    if(fetchedAllChildIdList.status === true){
        Data = fetchedAllChildIdList.Data
    }
    
    function childIdToMotherIdTrans(){
        document.getElementById('mainContentSection').innerHTML = `
        <div class="pageHeading pageHeading_2" id="financial-Heading">
            <div class="heading">
                <h1>CHILD ID TO MOTHER ID (MAIN LEDGER)</h1>
            </div>
        </div>

        <div class='listSection' style="margin-top: 5px;">
            <div class="container">
                <div id='allChildIdList' class='allChildIdList'></div>
            </div>
        </div>
        <div style='display:none;' id='showMessage'>
            
        </div>
        <div class='listSectionFooter'>
            <div class="container">
                <div class='childIdListFooter' id='childIdListFooter'></div>
            </div>
            <div class='container'>
                <div id='submitBtn'>SUBMIT REQUEST</div>
            </div>
        </div>
        `
    }

    function renderAllChildIdList(){
        const listBody = document.getElementById('allChildIdList')
        listBody.innerHTML =
        `
           <table>
               <tr>
                   <th>
                        <input type="checkbox" name="select-all" id="select-all">
                        <label>All</label>
                    </th>
                   <th>ID</th>
                   <th>Name</th>
                   <th>Balance</th>
               </tr>
           </table>
           <br>
           <br>
           <br>
           <br>
           
       `;
       Data.forEach((data) => {
           const newRow = document.createElement('tr');
   
           newRow.innerHTML = `
               <td><input type="checkbox" name="user-select" class="user-select" data-id="${data.id}" data-balance="${data.amount}"></td>
               <td>${data.id}</td>
               <td>${data.name}</td>
               <td>${data.amount}</td>
           `;
           listBody.querySelector('tbody').appendChild(newRow);
       })

       const selectAllCheckbox = document.getElementById('select-all');
       selectAllCheckbox.addEventListener('change', function () {
            const checkboxes = document.querySelectorAll('.user-select');
            checkboxes.forEach((checkbox) => {
                checkbox.checked = false;
                selectedIds = [];
            })
            checkboxes.forEach((checkbox) => {
               if (checkbox.dataset.balance !== '0') {
                   checkbox.checked = selectAllCheckbox.checked;
                   if (selectAllCheckbox.checked && !selectedIds.includes(checkbox.dataset.id)) {
                       selectedIds.push(checkbox.dataset.id);
                   } else if (!selectAllCheckbox.checked && selectedIds.includes(checkbox.dataset.id)) {
                       selectedIds.splice(selectedIds.indexOf(checkbox.dataset.id), 1);
                   }
               }
            });
           updateSelectedInfo();
       });

       const userCheckboxes = document.querySelectorAll('.user-select');
       userCheckboxes.forEach((checkbox) => {
           checkbox.addEventListener('change', function () {
               if (this.checked && !selectedIds.includes(this.dataset.id)) {
                   selectedIds.push(this.dataset.id);
               } else if (!this.checked && selectedIds.includes(this.dataset.id)) {
                   selectedIds.splice(selectedIds.indexOf(this.dataset.id), 1);
               }
               updateSelectedInfo();
           });
       });
   
    }
    function renderChildIdListFooter(){
        document.getElementById('childIdListFooter').innerHTML = `
            <div style='display: flex;'>
                <p> Total ID:</p>
                <p id='total-selected-ids'></p>
            </div>
            <div style='display: flex;'>
                <p> Total Tk:</p>
                <p id='total-selected-amount'></p>
            </div>
        `
    }
    function updateSelectedInfo() {
        const selectedCheckboxes = document.querySelectorAll('.user-select:checked');
        const totalSelectedIds = selectedCheckboxes.length;
        let totalSelectedAmount = 0;
        selectedCheckboxes.forEach((checkbox) => {
            totalSelectedAmount += parseFloat(checkbox.getAttribute('data-balance').replace(/,/g, ''));
        });

        document.getElementById('total-selected-ids').textContent = totalSelectedIds;
        document.getElementById('total-selected-amount').textContent = totalSelectedAmount.toLocaleString();
   
    }
    async function handleSubmitRequest(event){
        selectedIdsString = selectedIds.join(',');
        const formData = new FormData();
                
        formData.append('data', selectedIdsString);

        const result =await postFundTransToMothereIDMain(formData, user.LoggedInInvestorId)
        if(result.status === true){
            const displayBox = document.getElementById('showMessage')
            displayBox.style.display = 'block'
            document.getElementById('overlay').style.display = 'block' 
            displayBox.innerHTML = ''
            displayBox.innerHTML = `
                <p style='font-weight: 700; padding-bottom: 10px;'>Success:</p>
                <p style='color: #4CB050; font-weight: 700; padding-bottom: 10px;'>${result.message}</p>
                <hr style='opacity:1;'>
                <div id='closePopUp'>OK</div>
            `
            document.getElementById('closePopUp').addEventListener('click', ()=>{
                route('../component/childIdToMotherIdTransComponent.js', '../css/childIdToMotherIdTransComponent.css', 'childIdToMotherIdTrans')
            })
        }else{
            const displayBox = document.getElementById('showMessage')
            document.getElementById('overlay').style.display = 'block' 
            displayBox.style.display = 'block'
            displayBox.innerHTML = ''
            displayBox.innerHTML = `
                <p style='font-weight: 700; padding-bottom: 10px;'>Error:</p>
                <p style='color: red; font-weight: 600; padding-bottom: 10px;'>Request Failed ( ${result.message} )</p>
                <hr style='opacity:1;'>
                <div id='closePopUp'>OK</div>
            `
            document.getElementById('closePopUp').addEventListener('click', ()=>{
                document.getElementById('overlay').style.display = 'none' 
                route('../component/childIdToMotherIdTransComponent.js', '../css/childIdToMotherIdTransComponent.css', 'childIdToMotherIdTrans')
            })
        }
         
    }

    childIdToMotherIdTrans()
    renderAllChildIdList()
    renderChildIdListFooter()

    document.getElementById('submitBtn').addEventListener('click', handleSubmitRequest)
    
}