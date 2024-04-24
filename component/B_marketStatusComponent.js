async function executeB_MarketStatus(){
    const fetchedData = await getCseDseData()
    const fetchedMS_tableData = await getSharePrice('Name')
    const { fetchedCseData, fetchedDseData } = fetchedData
    let MS_tableData = []
    let MS_sortedTableData = null
    MS_tableData = fetchedMS_tableData.status === true ? fetchedMS_tableData.CurrentSharePrice : []

    function handleClick(script){
        return function (event){
            // route('../component/priceHistoryComponent.js', '../css/priceHistoryComponent.css', 'priceHistory', script)
            window.location.href = `../mainPage/template.html?case=B_priceHistory&data=${script}`
        }
    }

    function B_marketStatus(){
        document.getElementById('page_heading').innerHTML=`Market Status`
        document.getElementById('beforeMain').innerHTML = `
        <div class="marketMainSection" id="marketMainSection">
        <div class="cseSection" id="cseSection">
            <div class="container">
                <div class="table-responsive">
                    <table class="table customTable table-bordered">
                        <tr>
                            <th rowspan="6" class="verticaclAlign">
                                <div class="cse_logo">
                                    <img src="../images/cse_logo.jpg" alt="Chittagong Stock Exchange">
                                </div>
                            </th>
                            <th colspan="2">Today-${fetchedCseData.Data[0].Date1}</th>
                        </tr>
                        <tr> 
                            <td>
                                <div class="dataBox">
                                    <div id='td_cse_index1' class="data">${fetchedCseData.Data[0].Index1}</div>
                                    <div class="data"><span id='td_cse_IndexChv1'>${fetchedCseData.Data[0].IndexChv1}</span> <br> <span>${fetchedCseData.Data[0].IndexChp1}</span></div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">BDT ${fetchedCseData.Data[0].Value1}</td>
                        </tr>
                        <tr>
                            <th colspan="2">Yesterday-${fetchedCseData.Data[0].Date2}</th>
                        </tr>
                        <tr>
                            <td>
                                <div class="dataBox">
                                    <div id='td_cse_index2' class="data">${fetchedCseData.Data[0].Index2}</div>
                                    <div class="data"><span id='td_cse_IndexChv2'>${fetchedCseData.Data[0].IndexChv2}</span> <br> <span>${fetchedCseData.Data[0].IndexChp2}</span></div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">BDT ${fetchedCseData.Data[0].Value2}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>

        <div class="dseSection">
            <div class="container">
                <div class="table-responsive">
                    <table class="table customTable table-bordered">
                        <tr>
                            <th rowspan="6" class="verticaclAlign">
                                <div class="cse_logo">
                                    <img src="../images/dse_logo.jpg" alt="Chittagong Stock Exchange">
                                </div>
                            </th>
                            <th colspan="2">Today-${fetchedDseData.Data[0].Date1}</th>
                        </tr>
                        <tr>
                            <td >
                                <div class="dataBox">
                                    <div id='td_dse_index1' class="data">${fetchedDseData.Data[0].Index1}</div>
                                    <div class="data"> <span id='td_dse_IndexChv1'>${fetchedDseData.Data[0].IndexChv1}</span> <br> <span>${fetchedDseData.Data[0].IndexChp1}</span></div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">BDT ${fetchedDseData.Data[0].Value1}</td>
                        </tr>
                        <tr>
                            <th colspan="2">Yesterday-${fetchedDseData.Data[0].Date2}</th>
                        </tr>
                        <tr>
                            <td >
                                <div class="dataBox">
                                    <div id='td_dse_index2' class="data">${fetchedDseData.Data[0].Index2}</div>
                                    <div class="data"><span id='td_dse_IndexChv2'>${fetchedDseData.Data[0].IndexChv2}</span> <br> <span>${fetchedDseData.Data[0].IndexChp2}</span></div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">BDT ${fetchedDseData.Data[0].Value2}</td>
                        </tr>
                    </table>
                </div>
            </div>  
        </div>

        <div class="button_search_section">
            <div class="container">
                <div class="buttonRow">
                    <div class="allButton">
                        <select id='MS_selectType' class=" allBtn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <option>Select type</option>
                        </select>
                        <select id='MS_selectSector'  class=" allBtn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <option>Select Sector</option>
                        </select>
                        <select id='MS_selectSort' class=" allBtn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <option>Select Sort</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="container">
                <div class="searchBox">
                        <div class="MS_searchRow">
                            <div style="width: 90%; height:auto" class="MS_searchBox">
                                <input id='searchSharePrice' type="text" class="form-control" placeholder="Search" aria-label="Search" aria-describedby="searchIcon">
                                <img class="MS_searchIcon" style="width: 20px; height:auto" src="../images//icons/magnifying-glass.png" alt="search icon">
                            </div>
                            <div id='MS_Reload' class="reload">
                                <img style="width: 30px; height:auto" src="../images/icons/reload.png" alt="Reload">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="companyDataSection">
                <div class="container">
                    <div class="MS_table" id="MS_table"></div>
                </div>
            </div>
        </div>
    
    `
    if(fetchedCseData.Data[0].IndexChv1 < 0){ 
        document.getElementById('td_cse_index1').style.color = '#FE0000'
        document.getElementById('td_cse_IndexChv1').style.color = '#FE0000'
    }
    if(fetchedCseData.Data[0].IndexChv1 > 0){
        document.getElementById('td_cse_index1').style.color = '#04A41E'
        document.getElementById('td_cse_IndexChv1').style.color = '#04A41E'
    }
    if(fetchedCseData.Data[0].IndexChv2 < 0){ 
        document.getElementById('td_cse_index2').style.color = '#FE0000'
        document.getElementById('td_cse_IndexChv2').style.color = '#FE0000'
    }
    if(fetchedCseData.Data[0].IndexChv2 > 0){
        document.getElementById('td_cse_index2').style.color = '#04A41E'
        document.getElementById('td_cse_IndexChv2').style.color = '#04A41E'
    }

    if(fetchedDseData.Data[0].IndexChv1 < 0){ 
        document.getElementById('td_dse_index1').style.color = '#FE0000'
        document.getElementById('td_dse_IndexChv1').style.color = '#FE0000'
    }
    if(fetchedDseData.Data[0].IndexChv1 > 0){
        document.getElementById('td_dse_index1').style.color = '#04A41E'
        document.getElementById('td_dse_IndexChv1').style.color = '#04A41E'
    }
    if(fetchedDseData.Data[0].IndexChv2 < 0){ 
        document.getElementById('td_dse_index2').style.color = '#FE0000'
        document.getElementById('td_dse_IndexChv2').style.color = '#FE0000'
    }
    if(fetchedDseData.Data[0].IndexChv2 > 0){
        document.getElementById('td_dse_index2').style.color = '#04A41E'
        document.getElementById('td_dse_IndexChv2').style.color = '#04A41E'
    }
    }

    async function renderOptions(){
        const fetchedData = await getSectorList()
        const sortData = ['Name', 'Price', 'Change', 'Volume']
        const selectElement = document.getElementById('MS_selectType')
        const selectElement2 = document.getElementById('MS_selectSector')
        const selectElement3 = document.getElementById('MS_selectSort')
        if(fetchedData.status === true){
            fetchedData.Type.forEach(item => {
                const option = document.createElement('option');
                option.textContent = item.Title;
                selectElement.appendChild(option)
            })
            fetchedData.sectorList.forEach(item => {
                const option = document.createElement('option');
                option.textContent = item.sector;
                selectElement2.appendChild(option)
            })
            sortData.forEach(item => {
                const option = document.createElement('option');
                option.textContent = item;
                selectElement3.appendChild(option)
            })
        }
    }
    function renderMS_table(){
        let dataArray = MS_sortedTableData === null ? MS_tableData : MS_sortedTableData
        const tableBody = document.getElementById('MS_table')
        tableBody.innerHTML =
         `
            <table>
                <tr>
                    <th>Company</th>
                    <th>LTP</th>
                    <th>YCP</th>
                    <th>+/-</th>
                </tr>
            </table>
            <br>
            <br>
            <br>
            <br>
        `;
        dataArray.forEach(data => {
            const newRow = document.createElement('tr');
            newRow.classList.add('MS_sharePrice')
            newRow.innerHTML = `
                <td>${data.symbol}</td>
                <td>${data.ltp}</td>
                <td>${data.ycp}</td>
                <td>${data.change}</td>
            `;
        tableBody.querySelector('tbody').appendChild(newRow);
        newRow.style.backgroundColor =parseFloat(data.change) >= 0 ? (parseFloat(data.change) > 0 ? '#04A41E' : '#fff' ): '#FE0000'
        newRow.addEventListener('click', handleClick(data.symbol))
    });
    }
    B_marketStatus()
    renderOptions()
    renderMS_table()

    document.getElementById('MS_selectSort').addEventListener('change', filter)
    document.getElementById('MS_selectSector').addEventListener('change', filter)
    document.getElementById('MS_selectType').addEventListener('change', filter)
   async function filter(event){
        let selectType = document.getElementById('MS_selectType').value
        let selectSort = document.getElementById('MS_selectSort').value
        let selectSector = document.getElementById('MS_selectSector').value

        if(selectType !== 'Select type' || selectSort !== 'Select Sort' || selectSector !== 'Select Sector'){
            if(selectSort !== 'Select Sort'){
                const sortedMS_tableData = await getSharePrice(selectSort)
                MS_tableData = sortedMS_tableData.status === true ? sortedMS_tableData.CurrentSharePrice : []
                
                
                if(selectType !== 'Select type' && selectSector !== 'Select Sector'){
                    if(selectType === 'CSE Shariah Shares'){
                        MS_sortedTableData = MS_tableData.filter(function(item) {
                            return item.shariah === '1';
                        })
                    }else{
                        MS_sortedTableData = MS_tableData
                    }
                    MS_sortedTableData = MS_sortedTableData.filter(function(item) {
                        return item.category === selectSector;
                    });
                    
                }
                else if(selectType !== 'Select type'){
                    if(selectType === 'CSE Shariah Shares'){
                        MS_sortedTableData = MS_tableData.filter(function(item) {
                            return item.shariah === '1';
                        })
                    }else{
                        MS_sortedTableData = MS_tableData
                    }
                }
                else if(selectSector !== 'Select Sector'){
                    MS_sortedTableData = MS_tableData.filter(function(item) {
                        return item.category === selectSector;
                    });
                }
                renderMS_table()
            }else{
                if(selectType !== 'Select type' && selectSector !== 'Select Sector'){
                    if(selectType === 'CSE Shariah Shares'){
                        MS_sortedTableData = MS_tableData.filter(function(item) {
                            return item.shariah === '1';
                        })
                    }else{
                        MS_sortedTableData = MS_tableData
                    }
                    MS_sortedTableData = MS_sortedTableData.filter(function(item) {
                        return item.category === selectSector;
                    });
                    
                }
                else if(selectType !== 'Select type'){
                    if(selectType === 'CSE Shariah Shares'){
                        MS_sortedTableData = MS_tableData.filter(function(item) {
                            return item.shariah === '1';
                        })
                    }else{
                        MS_sortedTableData = MS_tableData
                    }
                }
                else if(selectSector !== 'Select Sector'){
                    MS_sortedTableData = MS_tableData.filter(function(item) {
                        return item.category === selectSector;
                    });
                }
                renderMS_table()
            }
        }
        
    }
    document.getElementById('searchSharePrice').addEventListener('input', async () => {
        const existList = document.querySelectorAll('.MS_sharePrice');
        if(existList){
            existList.forEach(item => {
                item.remove();
            });
        } 
        const inputedValue = document.getElementById('searchSharePrice').value.toLowerCase()
        const tableBody = document.getElementById('MS_table')
        MS_sortedTableData = MS_sortedTableData === null ? MS_tableData : MS_sortedTableData
        MS_sortedTableData.forEach(data =>{
            const symbol = data.symbol.toLowerCase()
            if(symbol.includes(inputedValue)){
                const newRow = document.createElement('tr');
                newRow.classList.add('MS_sharePrice')
                newRow.innerHTML = `
                    <td>${data.symbol}</td>
                    <td>${data.ltp}</td>
                    <td>${data.ycp}</td>
                    <td>${data.change}</td>
                `;
                tableBody.querySelector('tbody').appendChild(newRow);
                newRow.style.backgroundColor =parseFloat(data.change) >= 0 ? (parseFloat(data.change) > 0 ? '#04A41E' : '#fff' ): '#FE0000'
                newRow.addEventListener('click', handleClick(data.symbol))
            }
        })
    })
    document.getElementById('MS_Reload').addEventListener('click', async () => {
        const existList = document.querySelectorAll('.MS_sharePrice');
        if(existList){
            existList.forEach(item => {
                item.remove();
            });
        } 
        document.getElementById('searchSharePrice').value = ''
        const tableBody = document.getElementById('MS_table')
        MS_sortedTableData = MS_sortedTableData === null ? MS_tableData : MS_sortedTableData
        MS_sortedTableData.forEach(data =>{
            const newRow = document.createElement('tr');
            newRow.classList.add('MS_sharePrice')
            newRow.innerHTML = `
                <td>${data.symbol}</td>
                <td>${data.ltp}</td>
                <td>${data.ycp}</td>
                <td>${data.change}</td>
            `;
            tableBody.querySelector('tbody').appendChild(newRow);
            newRow.style.backgroundColor =parseFloat(data.change) >= 0 ? (parseFloat(data.change) > 0 ? '#04A41E' : '#fff' ): '#FE0000'
            newRow.addEventListener('click', handleClick(data.symbol))
        })
    })
}
