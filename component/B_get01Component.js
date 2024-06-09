async function executeB_Get01Technology(){
    let get01TechData = []
    let getTechList = []
    const fetchedData = await getCmsHome()
    if(fetchedData.status === true){
        get01TechData = fetchedData.GetTech
        getTechList = fetchedData.TechList
    }
    function B_Get01Technology(){
        document.getElementById('beforeMain').innerHTML = `
        <h3 id="page_heading">Get 01 Technology</h3>
        <div class="get-01-section" id="get-01-section">
            <div class="container">
                <div class="get-01-content" id="get-01-content1"></div>
            </div>
            <div class="container">
                <div class="get-01-content" id="get-01-content2"></div>
            </div>
        </div>
    `
    }
    function populateGet01Technology() {
        const why01Div1 = document.getElementById('get-01-content1');
    
        get01TechData.forEach(content=> {
            const newContent = document.createElement('div');
            newContent.classList.add('get01_item');
    
            newContent.innerHTML = `
                <h4 class="get01_item_heading">'${content.value}'</h4>
            `;
    
            why01Div1.appendChild(newContent);
    
        });
    }
    function populateGet01Technology2() {
        const why01Div2 = document.getElementById('get-01-content2');
    
        getTechList.forEach(content=> {
            const newContent = document.createElement('div');
            newContent.classList.add('get01_item');
    
            newContent.innerHTML = `
                <h4 class="get01_item_heading">${content.Name}</h4>
            `;
    
            why01Div2.appendChild(newContent);
    
        });
    }


    B_Get01Technology()
    populateGet01Technology()
    populateGet01Technology2()
}
