async function executeB_News(){
    let companyName
    let companyList =[]
    let allMediaNews = []
    let storeAllMediaNews = []
    const fetchedNews =await getNews()
    const fetchedData = await getCompanyList()

    if(fetchedNews.mediaNews.status === true){
        allMediaNews = fetchedNews.mediaNews.Data
        storeAllMediaNews = fetchedNews.mediaNews.Data
    }
    if(fetchedData.status === true){
        companyList = fetchedData.Data
    }

    async function handleListItemClick(event) {
        companyName = event.target.textContent;
        
        const allCompanyList = document.getElementById('allCompanyList');
        allCompanyList.innerHTML = '';
        allCompanyList.style.display = 'none'
        document.getElementById('searchCompanyForNews').value = companyName

        const fetchedSelectedCompanyNews = await getSelectedCompanyNews(companyName)
        if(fetchedSelectedCompanyNews.status ===true){
            allMediaNews = fetchedSelectedCompanyNews.Data
            populatedMediaNews(companyName, storeAllMediaNews)
        }
    }
    
    function news(){
        document.getElementById('page_heading').innerHTML=`News`
        document.getElementById('beforeMain').innerHTML = `
            <div class="mainNewsSection" id="mainNewsSection">
                <div class="N_button_search_section">
                    <div class="container">
                        <div class="N_searchRow">
                            <div id='searchBox' style="width: 90%; height:auto" class="N_searchBox">
                                <input id='searchCompanyForNews' type="text" class="form-control" placeholder="Search" aria-label="Search" aria-describedby="searchIcon">
                                <img class="N_searchIcon" style="width: 20px; height:auto" src="../images//icons/magnifying-glass.png" alt="search icon">
                            </div>
                            <div id='reloadBox' class="reload">
                                <img style="width: 30px; height:auto" src="../images/icons/reload.png" alt="Reload">
                            </div>
                        </div>
                        <div class= 'container'>
                            <ul style='display: none' class='allCompanyList' id='allCompanyList'></ul>
                        </div>
                    </div>
                </div>
                
                <div class="newsSection">
                    <div class="container newsContainer">
                        <div class="btnwrapper">
                            <div class="newsBtnGroup">
                                <button type="button" class="btn active" onclick="showNews('mediaNews')">
                                    MEDIA NEWS
                                </button>
                                <button type="button" class="btn" onclick="showNews('exchangeNews')">
                                    EXCHANGE NEWS
                                </button>
                                <button type="button" class="btn" onclick="showNews('miscNews')">
                                    MISC NEWS
                                </button>
                            </div>
    
                            <div class="newsBody">
                                <div class="mediaNews" id="mediaNews"></div>
                                <div style='display: none;' id='showMediaNewsDetails'></div> 
                                <div class="exchangeNews" id="exchangeNews"></div>
                                <div class="miscNews" id="miscNews"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
    
    function populatedExchangeNews() {
        let allExchangeNews = []
        if(fetchedNews.exchangeNews.status === true){
            allExchangeNews = fetchedNews.exchangeNews.TodaysNews
        }
        let exchangeNewsDiv = document.getElementById('exchangeNews');
    
        allExchangeNews.forEach(function (newsItem) {
            var newsElement = document.createElement('div');
            newsElement.classList.add('exchange-news-item');
    
            newsElement.innerHTML = `
                <div class="exchangeHeading">
                    <h4>${newsItem.Head}</h4>
                </div>
                <div class="exchangeContent">
                    <div class="exchangeContent"><p>${newsItem.News}</p></div>
                </div>
            `;
    
            exchangeNewsDiv.appendChild(newsElement);
    
        });
    }

    function populatedMiscNews() {
        let miscNews = []
        let miscNewsDiv = document.getElementById('miscNews');
    
        miscNews.forEach(function (newsItem) {
            var newsElement = document.createElement('div');
            newsElement.classList.add('news-item');
    
            newsElement.innerHTML = `
                <div class="newsImage">
                    <img src="${newsItem.image}" alt="News Image">
                </div>
                <div class="newsContent">
                    <div class="date-source">
                        <div class="date">${newsItem.date}</div>
                        <div class="source">${newsItem.source}</div>
                    </div>
                    <div class="headline"><h4>${newsItem.headline}</h4></div>
                    <button class="btn btn-primary btn-details">Details</button>
                </div>
            `;
            miscNewsDiv.appendChild(newsElement);
        });
    }

    function populatedMediaNews(companyName, storeAllMediaNews) {
        if(storeAllMediaNews.length !== 0 && !companyName){
            allMediaNews = storeAllMediaNews
        }
        let meadiaNewsDiv = document.getElementById('mediaNews');
        meadiaNewsDiv.innerHTML=''
        allMediaNews.forEach(function (newsItem) {
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
            document.getElementById('showMediaNewsDetails').style.display = 'block'
            document.getElementById('showMediaNewsDetails').innerHTML = `
                <div class='close'>
                    <div class='close_img_Box' onclick='closeNewsDetails()'>
                        <img style='width:30px; height: auto' src='../images/icons/icons8-cross.gif'>
                    </div>
                    <p style='display: inline-block; font-weight: 900; font-size: 25px'>|</p>
                </div>
                <div class='selectedNewsBody'>
                    <div class="heading">
                        <h1>News Details</h1>
                    </div>
                    <div class='container'>
                        <div style="margin-top: 10px;" class='imgBox'>
                            <img style='width: 100%; height: auto;' src=${newsItem.ImgLink} alt='news details picture'>
                        </div>
                        <div class='newsSourceDate'>
                            <p>Date: ${newsItem.news_date}</p>
                            <p>Source: ${newsItem.news_source}</p>
                        </div>
                        <div style="margin: 10px 0px;" class='selectedNewsHeading'>
                            <h3 style="text-align: center; margin: 10px 0px; font-weight: 600;"> ${newsItem.heading} </h3>
                        </div>
                        <div class='selectedNewsBodyDetails'>
                            <p>${newsItem.news_body}</p>
                        </div>
                    </div>
                </div>
            `
        }
    }
    function renderAllNews(){
        populatedExchangeNews(news.exchangeNews)
        populatedMediaNews(companyName, storeAllMediaNews);
        populatedMiscNews();
    }
    
    news()
    renderAllNews()
    
    document.getElementById('mediaNews').style.display = 'block';
    document.getElementById('exchangeNews').style.display = 'none';
    document.getElementById('miscNews').style.display = 'none';

    document.getElementById('searchCompanyForNews').addEventListener('input', async () => {
        const existList = document.querySelectorAll('.allCompanyListItem');
        if(existList){
            existList.forEach(item => {
                item.remove();
            });
        } 
        document.getElementById('allCompanyList').style.display = 'block'
        const setWidth = document.getElementById('searchBox').offsetWidth
        document.getElementById('allCompanyList').style.width = setWidth+'px'

        const inputValue = document.getElementById('searchCompanyForNews').value;
        companyList.forEach(item => {
            const companyName = item.Company.toLowerCase();
            if (companyName.includes(inputValue.toLowerCase())) {
                const listItem = document.createElement('li');
                listItem.innerHTML = item.Company
                listItem.id = item.Company
                listItem.classList.add('allCompanyListItem')
                listItem.addEventListener('click', handleListItemClick);
                document.getElementById('allCompanyList').appendChild(listItem)
            }
        });
    });

    document.getElementById('reloadBox').addEventListener('click', ()=>{
        companyName = undefined
        populatedMediaNews(companyName, storeAllMediaNews)
    })
}
function showNews(newsType) {
    document.getElementById('mediaNews').style.display = 'none';
    document.getElementById('exchangeNews').style.display = 'none';
    document.getElementById('miscNews').style.display = 'none';

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
function closeNewsDetails(){
    document.getElementById('showMediaNewsDetails').style.display = 'none'
}