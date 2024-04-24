async function executeB_Promotions(){
    let contents = []
    const fetchedData = await getPromotions()
    if(fetchedData.status === true){
        contents = fetchedData.promotionList
    }
    function B_Promotions(){
        document.getElementById('page_heading').innerHTML=`Promotions`
        document.getElementById('beforeMain').innerHTML = `
        <div class="promotionsSection">
            <div class="container">
                <div  id="promotions_content"></div>
            </div>
        </div>
        <div class="promotionsDetailsSection">
            <div class="container">
                <div style='display: none;'  id="promotionsDetails_content"></div>
            </div>
        </div>
    `
    }
    function renderPromotions() {
        const div = document.getElementById('promotions_content');
    
        contents.forEach(content=> {
            console.log(content)
            const newContent = document.createElement('div');
            newContent.classList.add('promotions_item');
            newContent.innerHTML = `
                <img style='width: 100%; height: auto; padding:5px;' src='${content.Thumbnail}' alt='promotions thumbnail'>
                <div class='promotionsDetailsBtn' id='showDetails${content.atn}'>
                    <div class='promotionsDetailsBtnInner'>View Details</div>
                </div>
            `;
    
            div.appendChild(newContent);

            document.getElementById(`showDetails${content.atn}`).addEventListener('click', ()=>{
                document.getElementById('promotions_content').style.display = 'none'
                document.getElementById('promotionsDetails_content').style.display = 'flex'
                document.getElementById('promotionsDetails_content').innerHTML = `
                    <div class='promotionImgBox'>
                        <img style='width: 100%; height: auto; padding:5px;' src='${content.MainImage}' alt='promotions Main Image'>
                    </div>
                    <div class='promotionDetailBox'>
                        <div class='itemBox'>
                            <p>Valid Till: </p>
                            <p>${content.EndDate}</p>
                        </div>
                        <div class='itemBox'>
                            <p>Purpose: </p>
                            <p>${content.Purpose}</p>
                        </div>
                        <div>
                            <p>Terms & Conditions: </p>
                            <p>${content.Conditions}</p>
                        </div>
                    </div>
                `
                const newUrl = window.location.origin + window.location.pathname + `?case=promotionDetails`;
                history.pushState({ case_name : case_name }, null, newUrl);
            })
    
        });
    }

    window.addEventListener('popstate', () => {
        const currentState = history.state;
        if (currentState && currentState.case_name === 'promotionDetails') {
            document.getElementById('promotions_content').style.display = 'none';
            document.getElementById('promotionsDetails_content').style.display = 'flex';
        } else {
            document.getElementById('promotions_content').style.display = 'block';
            document.getElementById('promotionsDetails_content').style.display = 'none';
        }
    });
    B_Promotions()
    renderPromotions()
}
