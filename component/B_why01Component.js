async function executeB_Why01(){
    let contents = []
    const fetchedData = await getCmsHome()
    if(fetchedData.status === true){
        contents =  fetchedData.Why
    }
    function B_Why01(){
        document.getElementById('page_heading').innerHTML=`Why 01`
        document.getElementById('beforeMain').innerHTML = `
        <div class="why-01-section" id="why-01-section">
            <div class="container">
                <div class="why-01-content" id="why-01-content"></div>
            </div>
        </div>
    `
    }
    function populateWhy01() {
        const why01Div = document.getElementById('why-01-content');
    
        contents.forEach(content=> {
            console.log(content)
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
