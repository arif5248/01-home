async function executeTP_dividend(data){
    const  upComingDividend = await get_SCRIPDIV_(data)
    
    function dividend(){
        document.getElementById('mainContentSection').innerHTML = `
            <div class="pageHeading" id="financial-Heading">
                <div class="heading" id="heading">
                    <h1>Dividend</h1>
                </div>
            </div>
            <div style='flex: 1 auto; overflow-y: auto;' class="dividendContentSection">
                <div id="dividendContent"></div>
            </div>
        `
    }

    function renderDividendContent(){
        const contentBody = document.getElementById('dividendContent')
        contentBody.innerHTML =
         `
            <table>
                <tr>
                    <th>Record Date</th>
                    <th>AGM</th>
                    <th>Declare Date</th>
                    <th>Dividend</th>
                </tr>
            </table>
        `;
        upComingDividend.forEach((data) => {
            const newRow = document.createElement('tr');
    
            newRow.innerHTML = `
                <td>${data.rec_dt}</td>
                <td>${data.agm_dt}</td>
                <td>${data.dec_dt}</td>
                <td>${data.dividend}</td>
            `;
            contentBody.querySelector('tbody').appendChild(newRow);
        }) 
    }

    dividend()
    renderDividendContent()
}




