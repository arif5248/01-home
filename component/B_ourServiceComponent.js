function executeB_OurService(){
    const serviceContents = [
        {
            heading: "Stock Brokerage Service",
            url:"#",
        },
        {
            heading: "IPO Application Service",
            url:"#",
        },
        {
            heading: "DP Service",
            url:"#",
        },
        {
            heading: "Custodian Service",
            url:"#",
        },
        {
            heading: "Advisory Service",
            url:"#",
        },
        {
            heading: "Alternative Investment Service",
            url:"#",
        },
        {
            heading: "Halal/Shariah Compliant Investment Service",
            url:"#",
        }
    ]
    function B_OurService(){
        document.getElementById('page_heading').innerHTML=`Our Service`
        document.getElementById('beforeMain').innerHTML = `
        <div class="our-service-section" id="our-service-section">
            <div class="container">
                <div class="our-service-content" id="our-service-content"></div>
            </div>
        </div>
    `
    }
    function populateOurService() {
        const why01Div = document.getElementById('our-service-content');
    
        serviceContents.forEach(content=> {
            console.log(content)
            const newContent = document.createElement('div');
            newContent.classList.add('ourService_item');
    
            newContent.innerHTML = `
            <a href=${content.url} class="ourService_item_heading">
                <h4>${content.heading}</h4>
            </a>
            `;
    
            why01Div.appendChild(newContent);
    
        });
    }


    B_OurService()
    populateOurService()
}
