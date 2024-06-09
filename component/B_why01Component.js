async function executeB_Why01(){
    let contents = []
    const fetchedData = await getCmsHome()
    if(fetchedData.status === true){
        contents =  fetchedData.Why
    }
    function B_Why01(){
        document.getElementById('beforeMain').innerHTML = `
        <h3 id="page_heading">Why 01</h3>
        <div class="why-01-section" id="why-01-section" style="flex: 1 auto;height: 100%;overflow-y: auto;">
            <div class="container">
                <div class="why-01-content" id="why-01-content"></div>
            </div>
        </div>
    `
    }
    function populateWhy01() {
        const why01Div = document.getElementById('why-01-content');
    
        contents.forEach(content=> {
            const newContent = document.createElement('div');
            newContent.classList.add('why01_item');
    
            newContent.innerHTML = `
                <h4 class="why01_item_heading">${content.Name}</h4>
            `;
    
            why01Div.appendChild(newContent);
    
        });
    }


    B_Why01()
    populateWhy01()
}
