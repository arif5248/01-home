async function executeTP_marketMover(){
    const fetchedMarketMover = await get_TOPLIST_()
    let upArray = [];
    let dnArray = [];
    let valArray = [];
    let volArray = [];
    
    fetchedMarketMover.forEach(item => {
        switch(item.sTyp) {
            case 'UP':
                upArray.push(item);
                break;
            case 'DN':
                dnArray.push(item);
                break;
            case 'VAL':
                valArray.push(item);
                break;
            case 'VOL':
                volArray.push(item);
                break;
            default:
                break;
        }
    });

    function TP_marketMover(){
        document.getElementById('mainContentSection').innerHTML = `
        <div class="pageHeading" id="financial-Heading">
            <div class="heading">
                <h1 id="pageHeading">Market Mover</h1>
            </div>
        </div>

        <div class="container">
            <div class="marketMoverContainer" id="marketMoverContainer">
                <div class="topGainerBody" id="topGainerBody"></div>
                <div class="topLooserBody" id="topLooserBody"></div>
                <div class="topValueBody" id="topValueBody"></div>
                <div class="topVolumeBody" id="topVolumeBody"></div>
            </div>
        </div>
        `
    }

    function createSticky(contentBody) {
        const stickyHeaders = contentBody.querySelectorAll('tbody tr:first-child');
        stickyHeaders.forEach((element) => {
            element.style.position = 'sticky';
            element.style.top = '40px';
        });
    }

    function renderTopGainere(){
        
        const contentBody = document.getElementById('topGainerBody')
        contentBody.innerHTML= `
            <div class="dataBody">
                <h3 class='topGainerFontColor'>Top Gainer</h3>
                <table>
                    <tbody>
                        <tr id="h1">
                            <th>#</th>
                            <th>Company</th>
                            <th>LTP</th>
                            <th>#Change</th>
                        </tr>
                    </tbody>
                </table>         
            </div>
        `
        
        createSticky(contentBody);

        upArray.forEach((data, index)=>{
            const newRow = document.createElement('tr')
            newRow.innerHTML=`
                <td style='text-align:left;' class='topGainerFontColor'>${index + 1}</td>
                <td style='text-align:left; class='topGainerFontColor'>${data.sNam}</td>
                <td class='topGainerFontColor'>${data.LTP}</td>
                <td class='topGainerFontColor'>${data.sData}</td>
            `
            contentBody.querySelector('tbody').appendChild(newRow)
        })
    }
    function renderTopLooser(){
        
        const contentBody = document.getElementById('topLooserBody')
        
        contentBody.innerHTML= `
            <div class="dataBody">
                <h3 class='topLooserFontColor'>Top Looser</h3>
                <table>
                    <tbody>
                        <tr id="h2">
                            <th>#</th>
                            <th>Company</th>
                            <th>LTP</th>
                            <th>#Change</th>
                        </tr>
                    </tbody>
                </table>         
            </div>
        `
        
        createSticky(contentBody);
        
        dnArray.forEach((data, index)=>{
            const newRow = document.createElement('tr')
            newRow.innerHTML=`
                <td style='text-align:left; class='topLooserFontColor'>${index + 1}</td>
                <td style='text-align:left; class='topLooserFontColor'>${data.sNam}</td>
                <td class='topLooserFontColor'>${data.LTP}</td>
                <td class='topLooserFontColor'>${data.sData}</td>
            `
            contentBody.querySelector('tbody').appendChild(newRow)
        })
    }
    function renderTopValue(){
        const contentBody = document.getElementById('topValueBody')
        
        contentBody.innerHTML= `
            <div class="dataBody">
                <h3>Top Value</h3>
                <table>
                    <tbody>
                        <tr id="h3">
                            <th>#</th>
                            <th>Company</th>
                            <th>LTP</th>
                            <th>#Change</th>
                        </tr>
                    </tbody>
                </table>         
            </div>
        `
        createSticky(contentBody);

        valArray.forEach((data, index)=>{
            const newRow = document.createElement('tr')
            newRow.innerHTML=`
                <td style='text-align:left;'>${index + 1}</td>
                <td style='text-align:left;'>${data.sNam}</td>
                <td>${data.LTP}</td>
                <td>${data.sData}</td>
            `
            contentBody.querySelector('tbody').appendChild(newRow)
        })
    }
    function renderTopVolume(){
        const contentBody = document.getElementById('topVolumeBody')
        
        contentBody.innerHTML= `
            <div class="dataBody">
                <h3>Top Volume</h3>
                <table>
                    <tbody>
                        <tr id="h4">
                            <th>#</th>
                            <th>Company</th>
                            <th>LTP</th>
                            <th>#Change</th>
                        </tr>
                    </tbody>
                </table>         
            </div>
        `
        

        createSticky(contentBody);

        volArray.forEach((data, index)=>{
            const newRow = document.createElement('tr')
            newRow.innerHTML=`
                <td style='text-align:left;'>${index + 1}</td>
                <td style='text-align:left;'>${data.sNam}</td>
                <td>${data.LTP}</td>
                <td>${data.sData}</td>
            `
            contentBody.querySelector('tbody').appendChild(newRow)
        })
    }

    TP_marketMover()
    renderTopGainere()
    renderTopLooser()
    renderTopValue()
    renderTopVolume()

  
}

