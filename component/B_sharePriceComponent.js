function executeB_SharePrice(){
    const SP_tableData = [
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
    function B_sharePrice(){
        document.getElementById('page_heading').innerHTML=`Share Price`
        document.getElementById('beforeMain').innerHTML = `
        <div class="container">
            <div class="sharePrice_buttonRow">
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

        <div class="container indexClass">
            <div class="searchBox">
                <div class="SP_searchRow">
                    <div style="width: 90%; height:auto" class="SP_searchBox">
                        <input type="text" class="form-control" placeholder="Search" aria-label="Search" aria-describedby="searchIcon">
                        <img class="MS_searchIcon" style="width: 20px; height:auto" src="../images//icons/magnifying-glass.png" alt="search icon">
                    </div>
                    <div class="reload">
                        <img style="width: 30px; height:auto" src="../images/icons/reload.png" alt="Reload">
                    </div>
                </div>
            </div>
        </div>

        <div class="sharePriceSection">
                <div class="container">
                    <div class="SP_table" id="SP_table"></div>
                </div>
            </div>
    
    `
    }

    function renderSP_table(){
        const tableBody = document.getElementById('SP_table')
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
        SP_tableData.forEach(data => {
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

    B_sharePrice()
    renderSP_table()
}