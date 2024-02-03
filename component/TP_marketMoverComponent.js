function executeTP_marketMover(){

    const topGainerData=[
        {
            company: "NAVANACNG",
            ltp: 29.70,
            change: 10.00
        },
        {
            company: "NAVANACNG",
            ltp: 29.70,
            change: 10.00
        },
        {
            company: "NAVANACNG",
            ltp: 29.70,
            change: 10.00
        },
        {
            company: "NAVANACNG",
            ltp: 29.70,
            change: 10.00
        },
        {
            company: "NAVANACNG",
            ltp: 29.70,
            change: 10.00
        },
        {
            company: "NAVANACNG",
            ltp: 29.70,
            change: 10.00
        },
        {
            company: "NAVANACNG",
            ltp: 29.70,
            change: 10.00
        },
        {
            company: "NAVANACNG",
            ltp: 29.70,
            change: 10.00
        },
        {
            company: "NAVANACNG",
            ltp: 29.70,
            change: 10.00
        },
        {
            company: "NAVANACNG",
            ltp: 29.70,
            change: 10.00
        },
    ]
    const topLooserData=[
        {
            company: "NAVANACNG",
            ltp: 29.70,
            change: 10.00
        },
        {
            company: "NAVANACNG",
            ltp: 29.70,
            change: 10.00
        },
        {
            company: "NAVANACNG",
            ltp: 29.70,
            change: 10.00
        },
        {
            company: "NAVANACNG",
            ltp: 29.70,
            change: 10.00
        },
        {
            company: "NAVANACNG",
            ltp: 29.70,
            change: 10.00
        },
        {
            company: "NAVANACNG",
            ltp: 29.70,
            change: 10.00
        },
        {
            company: "NAVANACNG",
            ltp: 29.70,
            change: 10.00
        },
        {
            company: "NAVANACNG",
            ltp: 29.70,
            change: 10.00
        },
        {
            company: "NAVANACNG",
            ltp: 29.70,
            change: 10.00
        },
        {
            company: "NAVANACNG",
            ltp: 29.70,
            change: 10.00
        },
    ]
    const topValueData=[
        {
            company: "NAVANACNG",
            ltp: 29.70,
            change: 10.00
        },
        {
            company: "NAVANACNG",
            ltp: 29.70,
            change: 10.00
        },
        {
            company: "NAVANACNG",
            ltp: 29.70,
            change: 10.00
        },
        {
            company: "NAVANACNG",
            ltp: 29.70,
            change: 10.00
        },
        {
            company: "NAVANACNG",
            ltp: 29.70,
            change: 10.00
        },
        {
            company: "NAVANACNG",
            ltp: 29.70,
            change: 10.00
        },
        {
            company: "NAVANACNG",
            ltp: 29.70,
            change: 10.00
        },
        {
            company: "NAVANACNG",
            ltp: 29.70,
            change: 10.00
        },
        {
            company: "NAVANACNG",
            ltp: 29.70,
            change: 10.00
        },
        {
            company: "NAVANACNG",
            ltp: 29.70,
            change: 10.00
        },
    ]
    const topVolumeData=[
        {
            company: "NAVANACNG",
            ltp: 29.70,
            change: 10.00
        },
        {
            company: "NAVANACNG",
            ltp: 29.70,
            change: 10.00
        },
        {
            company: "NAVANACNG",
            ltp: 29.70,
            change: 10.00
        },
        {
            company: "NAVANACNG",
            ltp: 29.70,
            change: 10.00
        },
        {
            company: "NAVANACNG",
            ltp: 29.70,
            change: 10.00
        },
        {
            company: "NAVANACNG",
            ltp: 29.70,
            change: 10.00
        },
        {
            company: "NAVANACNG",
            ltp: 29.70,
            change: 10.00
        },
        {
            company: "NAVANACNG",
            ltp: 29.70,
            change: 10.00
        },
        {
            company: "NAVANACNG",
            ltp: 29.70,
            change: 10.00
        },
        {
            company: "NAVANACNG",
            ltp: 29.70,
            change: 10.00
        },
    ]

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
                <h3>Top Gainer</h3>
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

        topGainerData.forEach((data, index)=>{
            const newRow = document.createElement('tr')
            newRow.innerHTML=`
                <td>${index + 1}</td>
                <td>${data.company}</td>
                <td>${data.ltp}</td>
                <td>${data.change}</td>
            `
            contentBody.querySelector('tbody').appendChild(newRow)
        })
    }
    function renderTopLooser(){
        
        const contentBody = document.getElementById('topLooserBody')
        
        contentBody.innerHTML= `
            <div class="dataBody">
                <h3>Top Looser</h3>
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
        
        topLooserData.forEach((data, index)=>{
            const newRow = document.createElement('tr')
            newRow.innerHTML=`
                <td>${index + 1}</td>
                <td>${data.company}</td>
                <td>${data.ltp}</td>
                <td>${data.change}</td>
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

        topValueData.forEach((data, index)=>{
            const newRow = document.createElement('tr')
            newRow.innerHTML=`
                <td>${index + 1}</td>
                <td>${data.company}</td>
                <td>${data.ltp}</td>
                <td>${data.change}</td>
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
            <br>
            <br>
            <br>
        `
        

        createSticky(contentBody);

        topVolumeData.forEach((data, index)=>{
            const newRow = document.createElement('tr')
            newRow.innerHTML=`
                <td>${index + 1}</td>
                <td>${data.company}</td>
                <td>${data.ltp}</td>
                <td>${data.change}</td>
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

