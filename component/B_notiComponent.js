function executeB_Notification(){
    const notificationData=[
        {
            date:"04/jan/2024 00:00:00 AM",
            headline: "শেয়ারবাজারে তারল্য বাড়াতে বিএসইসি চেয়ারম্যান ও গভর্নরের বৈঠক"
        },
        {
           
            date:"04/jan/2024 00:00:00 AM",
            headline: "সূচকের উত্থানেও লেনদেন কমেছে এসএমই মার্কেটে"
        },
        {
            date:"04/jan/2024 00:00:00 AM",
            headline: "ফ্লোর প্রাইস প্রত্যাহারের দাবি শীর্ষ ব্রোকারদের"
        },
        {
            date:"04/jan/2024 00:00:00 AM",
            headline: "বাজারে ওষুধ নেই এশিয়াটিকের, তারপরও প্রফিট মার্জিনে এগিয়ে"
        },
        {
            date:"04/jan/2024 00:00:00 AM",
            headline: "শেয়ারবাজারে তারল্য বাড়াতে বিএসইসি চেয়ারম্যান ও গভর্নরের বৈঠক"
        },
        {
            date:"04/jan/2024 00:00:00 AM",
            headline: "সূচকের উত্থানেও লেনদেন কমেছে এসএমই মার্কেটে"
        },
        {
            date:"04/jan/2024 00:00:00 AM",
            headline: "ফ্লোর প্রাইস প্রত্যাহারের দাবি শীর্ষ ব্রোকারদের"
        },
        {
            date:"04/jan/2024 00:00:00 AM",
            headline: "বাজারে ওষুধ নেই এশিয়াটিকের, তারপরও প্রফিট মার্জিনে এগিয়ে"
        }
    ];
    function B_Notification(){
        document.getElementById('page_heading').innerHTML=`Notifications`
        document.getElementById('beforeMain').innerHTML = `
        <div class="noti-section" id="noti-section">
            <div class="container">
                <div class="noti-content" id="noti-content"></div>
            </div>
        </div>
    `
    }
    function populateNoti() {
        const newDiv = document.getElementById('noti-content');
    
        notificationData.forEach(content=> {
            const newContent = document.createElement('div');
            newContent.classList.add('noti_item');
    
            newContent.innerHTML = `
            <div class="notification">
                <div class="date">${content.date}</div>
                <hr>
                <div class="headline"><h4>${content.headline}</h4></div>
                <button class="btn btn-primary btn-details">View</button>
            </div>
            `;
    
            newDiv.appendChild(newContent);
    
        });
    }


    B_Notification()
    populateNoti()
}
