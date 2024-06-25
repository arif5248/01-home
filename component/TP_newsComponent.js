async function executeTP_News(data){
    let mediaNews = []
    let exchangeNews = []
    
    function news(){
        document.getElementById('mainContentSection').innerHTML =
         `
         <div class="pageHeading" id="financial-Heading" style="flex: 0 auto;">
                <div class="heading">
                    <h1>News of: ${data}</h1>
                </div>
            </div>
            <div class="newsBtnGroup">
                <div class="btn active" onclick="showNews('mediaNews')">
                    MEDIA NEWS
                </div>
                <div class="btn" onclick="showNews('exchangeNews')">
                    EXCHANGE NEWS
                </div>
            </div>
            <div onscroll="resetLogoutTimer()" class="newsBody" style="flex: 1 auto; overflow-y: auto;">
                <div class='container'>
                    <div class="mediaNews" id="mediaNews"></div>
                    <div class="exchangeNews" id="exchangeNews"></div>
                </div>
            </div>
            <div style='display: none;' id='showMediaNewsDetails'></div> 
            
        `
    }
    
    function populatedExchangeNews() {
        let exchangeNewsDiv = document.getElementById('exchangeNews');
    
        exchangeNews.forEach(function (newsItem) {
            var newsElement = document.createElement('div');
            newsElement.classList.add('exchange-news-item');
    
            newsElement.innerHTML = `
                <div style='padding: 5px;' >
                    <p>${newsItem.rec_dt}</p>
                </div>
                
                <div class="exchangeContent"><p>${newsItem.dividend}</p></div>
               
            `;
    
            exchangeNewsDiv.appendChild(newsElement);
    
        });
    }

    

    function populatedMediaNews(companyName, storeAllMediaNews) {
        
        let meadiaNewsDiv = document.getElementById('mediaNews');
        meadiaNewsDiv.innerHTML=''
        mediaNews.forEach(function (newsItem) {
            const newsElement = document.createElement('div');
            newsElement.classList.add('news-item');
    
            newsElement.innerHTML = `
                <div class="newsImage">
                    <img src="${newsItem.ImgLink}" alt=${companyName ? companyName+'NewsImage' : 'NewsImage'}>
                </div>
                <div class="newsContent">
                    <div class="date-source">
                        <div class="date">${newsItem.news_date}</div>
                        <div class="source">${newsItem.news_source}</div>
                    </div>
                    <div class="headline"><h4>${newsItem.heading}</h4></div>
                    <button class="btn btn-primary btn-details">Details</button>
                </div>
            `;
            meadiaNewsDiv.appendChild(newsElement);
            newsElement.addEventListener('click', showNewsDetails(newsItem))
        }); 
    }

    function showNewsDetails(newsItem){
        return function(event){
            document.getElementById('overlay').style.display = 'block'
            document.getElementById('showMediaNewsDetails').style.display = 'flex'
            document.getElementById('showMediaNewsDetails').innerHTML = `
                
                <div class='selectedNewsBody' id='selectedNewsBody'>
                    <div style='flex: 0 auto;' class="heading">
                        <h1>News Details</h1>
                    </div>
                    <div style='flex: 1 auto;height: 100%;overflow-y: auto;' class='container'>
                        <div style="margin-top: 10px;" class='imgBox'>
                            <img style='width: 100%; height: auto;' src=${newsItem.ImgLink} alt='news details picture'>
                        </div>
                        <div class='newsSourceDate'>
                            <p>Date: ${customDateConverter(newsItem.news_date, 'defaultToCustom')}</p>
                            <p>Source: ${newsItem.news_source}</p>
                        </div>
                        <div style="margin: 10px 0px;" class='selectedNewsHeading'>
                            <h3 style="text-align: center; margin: 10px 0px; font-weight: 600;"> ${newsItem.heading} </h3>
                        </div>
                        <div class='selectedNewsBodyDetails'>
                            <p style='text-align: justify;font-size:14px'>${newsItem.news_body}</p>
                        </div>
                    </div>
                    <div id='closeNewsDetails'>
                        <p>CLOSE</p>
                    </div>
                </div>
            `
            document.getElementById('closeNewsDetails').addEventListener('click', ()=>{
                document.getElementById('showMediaNewsDetails').style.display = 'none'
                document.getElementById('overlay').style.display = 'none'
            })
            document.getElementById('overlay').addEventListener('click', ()=>{
                document.getElementById('showMediaNewsDetails').style.display = 'none'
                document.getElementById('overlay').style.display = 'none'
            })
        }
    }
   
    news()
    populatedExchangeNews()
    populatedMediaNews();
    
    document.getElementById('mediaNews').style.display = 'block';
    document.getElementById('exchangeNews').style.display = 'none';
    const fetchedMediaNews = await getSelectedCompanyNews(data)
    console.log(fetchedMediaNews)
    if(fetchedMediaNews.status === true){
        mediaNews = fetchedMediaNews.Data
        populatedMediaNews()
    }

    exchangeNews = await get_SCRIPNEWS_(data)
    if(exchangeNews.status === false){
        exchangeNews = []
    }
}

function showNews(newsType) {
    document.getElementById('mediaNews').style.display = 'none';
    document.getElementById('exchangeNews').style.display = 'none';

    document.getElementById(newsType).style.display = 'block';

    updateBtnState(newsType);
} 
function updateBtnState(activeButton) {
    let buttons = document.querySelectorAll('.newsBtnGroup .btn');
    buttons.forEach(function (button) {
        button.classList.remove('active');
    });

    let activeButtonElement = document.querySelector('.newsBtnGroup .btn[onclick*="' + activeButton + '"]');
    if (activeButtonElement) {
        activeButtonElement.classList.add('active');
    }
}
