function executeB_MarketStatus(){
    const MS_tableData = [
        {
            comapny: '1JANATAMF',
            ltp: 5.10,
            ycp: 5.10,
            changes: 0.00
        },
        {
            comapny: '1JANATAMF',
            ltp: 5.10,
            ycp: 5.10,
            changes: 0.00
        },
        {
            comapny: '1JANATAMF',
            ltp: 5.10,
            ycp: 5.10,
            changes: 0.00
        },
        {
            comapny: '1JANATAMF',
            ltp: 5.10,
            ycp: 5.10,
            changes: 0.00
        },
        {
            comapny: '1JANATAMF',
            ltp: 5.10,
            ycp: 5.10,
            changes: 0.00
        },
        {
            comapny: '1JANATAMF',
            ltp: 5.10,
            ycp: 5.10,
            changes: 0.00
        },
        {
            comapny: '1JANATAMF',
            ltp: 5.10,
            ycp: 5.10,
            changes: 0.00
        },
        {
            comapny: '1JANATAMF',
            ltp: 5.10,
            ycp: 5.10,
            changes: 0.00
        },
        {
            comapny: '1JANATAMF',
            ltp: 5.10,
            ycp: 5.10,
            changes: 0.00
        },
        {
            comapny: '1JANATAMF',
            ltp: 5.10,
            ycp: 5.10,
            changes: 0.00
        },
        {
            comapny: 'KEYACOSMET',
            ltp: 5.10,
            ycp: 5.10,
            changes: 0.00
        },
        
    ]
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
                            <th colspan="2">Today-03/jan/2024</th>
                        </tr>
                        <tr>
                            <td ><div class="dataBox">
                                    <div class="data">18486</div>
                                    <div class="data">0 <br> <span>.00%</span></div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">BDT 65340716</td>
                        </tr>
                        <tr>
                            <th colspan="2">Yesterday-02/jan/2024</th>
                        </tr>
                        <tr>
                            <td ><div class="dataBox">
                                    <div class="data">18486</div>
                                    <div class="data">0 <br> <span>.00%</span></div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">BDT 65340716</td>
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
                            <th colspan="2">Today-03/jan/2024</th>
                        </tr>
                        <tr>
                            <td >
                                <div class="dataBox">
                                    <div class="data">18486</div>
                                    <div class="data">0 <br> <span>.00%</span></div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">BDT 65340716</td>
                        </tr>
                        <tr>
                            <th colspan="2">Yesterday-02/jan/2024</th>
                        </tr>
                        <tr>
                            <td >
                                <div class="dataBox">
                                    <div class="data">18486</div>
                                    <div class="data">0 <br> <span>.00%</span></div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">BDT 65340716</td>
                        </tr>
                    </table>
                </div>
            </div>  
        </div>

        <div class="button_search_section">
            <div class="container">
                <div class="buttonRow">
                    <div class="allButton">
                        <button type="button" class="btn allBtn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Select type
                        </button>
                        <button type="button" class="btn allBtn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Select Sector
                        </button>
                        <button type="button" class="btn allBtn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Select Sort
                        </button>
                    </div>
                </div>
            </div>

            <div class="container">
                <div class="searchBox">
                        <div class="MS_searchRow">
                            <div style="width: 90%; height:auto" class="MS_searchBox">
                                <input type="text" class="form-control" placeholder="Search" aria-label="Search" aria-describedby="searchIcon">
                                <img class="MS_searchIcon" style="width: 20px; height:auto" src="../images//icons/magnifying-glass.png" alt="search icon">
                            </div>
                            <div class="reload">
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
    }


    function renderMS_table(){
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
        `;
        MS_tableData.forEach(data => {
            const newRow = document.createElement('tr');
    
            newRow.innerHTML = `
                <td>${data.comapny}</td>
                <td>${data.ltp}</td>
                <td>${data.ycp}</td>
                <td>${data.changes}</td>
            `;
        tableBody.querySelector('tbody').appendChild(newRow);
        });
    }
    B_marketStatus()
    renderMS_table()
}