function executeB_Why01(){
    const contents = [
        {
            heading: "Free 01 ID",
            url:"#",
        },
        {
            heading: "24 Hours Support Team",
            url:"#",
        },
        {
            heading: "Shariah Compliant (Interest Fee) Company",
            url:"#",
        },
        {
            heading: "Operated by Experienced Professional Team",
            url:"#",
        },
        {
            heading: "Real Time  Share Trading through Web/Api",
            url:"#",
        },
        {
            heading: "Online Money Deposit & amp; Withdrawal Facility",
            url:"#",
        },
        {
            heading: "Paper Less Company",
            url:"#",
        },
        {
            heading: "Account Manager Facility",
            url:"#",
        },
        {
            heading: "Robot Trade Facility",
            url:"#",
        },
        {
            heading: "Instant IPO Application through Web/App",
            url:"#",
        },
        {
            heading: "Trustworthy&amp; Reliable",
            url:"#",
        }
    ]
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
            <a href=${content.url} class="why01_item_heading">
                <h4>${content.heading}</h4>
            </a>
            `;
    
            why01Div.appendChild(newContent);
    
        });
    }


    B_Why01()
    populateWhy01()
}
