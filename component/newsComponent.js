function executeNews(){
    const mediaNews=[
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
    const miscNews=[
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
            <div class="mainNewsSection" id="mainNewsSection">
                <div class="button_search_section  ">
                    <div class="container">
                        <div class="searchBox">
                            <div class="input-group">
                                <div class="input-group-append">
                                    <span class="input-group-text" id="searchIcon">
                                        <img src="../images//icons/magnifying-glass.png" alt="search icon" loading="lazy">
                                    </span>
                                </div>
    
                                <input type="text" class="form-control" placeholder="Search" aria-label="Search" aria-describedby="searchIcon">
                                
                                <div class="reload">
                                    <img src="../images/icons/magnifying-glass.png" alt="Reload">
                                </div>
                            </div>
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
                                <div class="exchangeNews" id="exchangeNews"></div>
                                <div class="miscNews" id="miscNews"></div>
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

    function populatedMiscNews() {
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

    function populatedMediaNews() {
        let meadiaNewsDiv = document.getElementById('mediaNews');
    
        mediaNews.forEach(function (newsItem) {
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
            meadiaNewsDiv.appendChild(newsElement);
        }); 
    }
    
    news()
    
    fetchData("todaysNews_api",populatedExchangeNews)
    populatedMediaNews();
    populatedMiscNews();

    document.getElementById('mediaNews').style.display = 'block';
    document.getElementById('exchangeNews').style.display = 'none';
    document.getElementById('miscNews').style.display = 'none';
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