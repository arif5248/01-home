function executeB_Get01Technology(){
    const get01TechData = [
        {
            heading: "'01' offers multiexchange, multi-product, multi-broker supported Technological platform / Software for Capital & Financial market related business.",
            url:"#",
        },
        {
            heading: "Software that are ready to Sell to Brokerage Houses of CSE & DSE",
            url:"#",
        },
        {
            heading: "Web based Order Management System (OMS) for Clients",
            url:"#",
        },
        {
            heading: "Android App based Order Management System (OMS)for Clients",
            url:"#",
        },
        {
            heading: "Order Management System (OMS) for Authorized Representatives (Web & Directly connected Terminal)",
            url:"#",
        },
        {
            heading: "Back Office Software (Covers Operations, Accounts, HR & Admin etc.)",
            url:"#",
        },
    ]
    function B_Get01Technology(){
        document.getElementById('page_heading').innerHTML=`Get 01 Technology`
        document.getElementById('beforeMain').innerHTML = `
        <div class="get-01-section" id="get-01-section">
            <div class="container">
                <div class="get-01-content" id="get-01-content"></div>
            </div>
        </div>
    `
    }
    function populateGet01Technology() {
        const why01Div = document.getElementById('get-01-content');
    
        get01TechData.forEach(content=> {
            console.log(content)
            const newContent = document.createElement('div');
            newContent.classList.add('get01_item');
    
            newContent.innerHTML = `
            <a href=${content.url} class="get01_item_heading">
                <h4>${content.heading}</h4>
            </a>
            `;
    
            why01Div.appendChild(newContent);
    
        });
    }


    B_Get01Technology()
    populateGet01Technology()
}
