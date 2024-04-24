async function executeB_OurService(){
    let serviceContents = []
    const fetchedData = await getCmsHome()
    if(fetchedData.status === true){
        serviceContents = fetchedData.service
    }
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
                <h4 class="ourService_item_heading">${content.Name}</h4>
            `;
    
            why01Div.appendChild(newContent);
    
        });
    }


    B_OurService()
    populateOurService()
}
