function executeTP_News(){
    const paperNews=[
        {
            image:"../images/dse.jpg",
            date:"04/jan/2024 00:00:00 AM",
            source:"sharenews24.com",
            headline: "শেয়ারবাজারে তারল্য বাড়াতে বিএসইসি চেয়ারম্যান ও গভর্নরের বৈঠক"
        },
        {
            image:"../images/graph.png",
            date:"04/jan/2024 00:00:00 AM",
            source:"sharenews24.com",
            headline: "সূচকের উত্থানেও লেনদেন কমেছে এসএমই মার্কেটে"
        },
        {
            image:"../images/floorPrice.jpg",
            date:"04/jan/2024 00:00:00 AM",
            source:"sharenews24.com",
            headline: "ফ্লোর প্রাইস প্রত্যাহারের দাবি শীর্ষ ব্রোকারদের"
        },
        {
            image:"../images/dse-cse.jpg",
            date:"04/jan/2024 00:00:00 AM",
            source:"sharenews24.com",
            headline: "বাজারে ওষুধ নেই এশিয়াটিকের, তারপরও প্রফিট মার্জিনে এগিয়ে"
        },
        {
            image:"../images/dse.jpg",
            date:"04/jan/2024 00:00:00 AM",
            source:"sharenews24.com",
            headline: "শেয়ারবাজারে তারল্য বাড়াতে বিএসইসি চেয়ারম্যান ও গভর্নরের বৈঠক"
        },
        {
            image:"../images/graph.png",
            date:"04/jan/2024 00:00:00 AM",
            source:"sharenews24.com",
            headline: "সূচকের উত্থানেও লেনদেন কমেছে এসএমই মার্কেটে"
        },
        {
            image:"../images/floorPrice.jpg",
            date:"04/jan/2024 00:00:00 AM",
            source:"sharenews24.com",
            headline: "ফ্লোর প্রাইস প্রত্যাহারের দাবি শীর্ষ ব্রোকারদের"
        },
        {
            image:"../images/dse-cse.jpg",
            date:"04/jan/2024 00:00:00 AM",
            source:"sharenews24.com",
            headline: "বাজারে ওষুধ নেই এশিয়াটিকের, তারপরও প্রফিট মার্জিনে এগিয়ে"
        }
    ];
    
    function news(){
        document.getElementById('mainContentSection').innerHTML =
         `
            <div class="pageHeading" id="financial-Heading">
                <div class="heading">
                    <h1>News</h1>
                </div>
            </div>
            <div class="mainNewsSection" id="mainNewsSection">
                <div class="newsSection">
                    <div class="container newsContainer">
                        <div class="btnwrapper">
                            <div class="newsBtnGroup">
                                <button type="button" class="btn active" onclick="showNews('paperNews')">
                                    PAPER NEWS
                                </button>
                                <button type="button" class="btn" onclick="showNews('exchangeNews')">
                                    EXCHANGE NEWS
                                </button>
                            </div>
    
                            <div class="newsBody">
                                <div class="mediaNews" id="paperNews"></div>
                                <div class="exchangeNews" id="exchangeNews"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
    
    function populatedExchangeNews(data) {
        let exchangeNewsDiv = document.getElementById('exchangeNews');
    
        data.TodaysNews.forEach(function (newsItem) {
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

    

    function populatedPaperNews() {
        let paperNewsDiv = document.getElementById('paperNews');
    
        paperNews.forEach(function (newsItem) {
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
            paperNewsDiv.appendChild(newsElement);
        }); 
    }
    async function getAllNews(){
        const news =await getNews()
        populatedExchangeNews(news.exchangeNews)  
        populatedPaperNews();

    }
    
    news()
    getAllNews()

    document.getElementById('paperNews').style.display = 'block';
    document.getElementById('exchangeNews').style.display = 'none';
}
function showNews(newsType) {
    document.getElementById('paperNews').style.display = 'none';
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