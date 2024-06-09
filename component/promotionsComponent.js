async function executePromotions(){
    let contents = []
    const fetchedData = await getPromotions()
    if(fetchedData.status === true){
        contents = fetchedData.promotionList
    }
    function promotions(){
        document.getElementById('mainContentSection').innerHTML = `
        <div class="pageHeading" id="financial-Heading">
            <div class="heading">
                <h1>Special Offer</h1>
            </div>
        </div>
        <div id="promotionsSection" class="promotionsSection">
            <div class='container'>
                <div  id="promotions_content"></div>
            </div>
        </div>
        <div style='display: none' id="promotionsDetailsSection" class="promotionsDetailsSection">
            <div class='promotionsDetailsHeading'>
                <h5>Promotion Details</h5>
            </div>
            <div style="flex: 1 auto;height: 100%;overflow-y: auto;" class="container">
                <div id="promotionsDetails_content"></div>
            </div>
            <div id='closePromotionDetails'>
                <p>CLOSE</p>
            </div>
        </div>
        
        `
        document.getElementById('closePromotionDetails').addEventListener('click', ()=>{
            document.getElementById('promotionsDetailsSection').style.display = 'none'
            document.getElementById('overlay').style.display = 'none'
        })
        document.getElementById('overlay').addEventListener('click', ()=>{
            document.getElementById('promotionsDetailsSection').style.display = 'none'
            document.getElementById('overlay').style.display = 'none'
        })
    }
    function renderPromotions() {
        const div = document.getElementById('promotions_content');
    
        contents.forEach(content=> {
            const newContent = document.createElement('div');
            newContent.classList.add('promotions_item');
            newContent.innerHTML = `
                <img style='width: 100%; height: auto; padding:5px;' src='${content.Thumbnail}' alt='promotions thumbnail'>
                <div class='promotionsDetailsBtn' id='showDetails${content.atn}'>
                    <div class='promotionsDetailsBtnInner'>Details</div>
                </div>
            `;
    
            div.appendChild(newContent);

            document.getElementById(`showDetails${content.atn}`).addEventListener('click', ()=>{
                document.getElementById('overlay').style.display = 'block'
                document.getElementById('promotionsDetailsSection').style.display = 'flex'
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
                
            })
    
        });
    }
    promotions()
    renderPromotions()
}