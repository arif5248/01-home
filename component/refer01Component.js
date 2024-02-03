function executeRefer01(){
    const referDetailsInfo={
        total_refered_person: 10,
        total_trade_tk: 47935,
        total_reward_points: 267,
        link: 'https://www.01.limited?reff_link=RjZMX%2BX6NiPSRFI2WDoZJA%3D%3D'
    }
    const referListData = [
        {
            name:"A H M SHAHAJAHAN",
            Id01:1292,
            trade_amount: 348809,
            trade_date: "12/Oct/2023"
        },
        {
            name:"SIRAT SERENA",
            Id01:172,
            trade_amount: 105465,
            trade_date: "26/Oct/2022"
        },
        {
            name:"MD GOLAM RABBANI",
            Id01:535,
            trade_amount: 99855,
            trade_date: "06/Apr/2023"
        },
        {
            name:"A H M SHAHAJAHAN",
            Id01:1292,
            trade_amount: 348809,
            trade_date: "12/Oct/2023"
        },
        {
            name:"A H M SHAHAJAHAN",
            Id01:1292,
            trade_amount: 348809,
            trade_date: "12/Oct/2023"
        },
    ]
        
    
    function refer01(){
        document.getElementById('mainContentSection').innerHTML = `
        <div class="pageHeading" id="financial-Heading">
            <div class="heading">
                <h1>Refer 01 to Friends and Family</h1>
            </div>
        </div>

        <div class="container">
            <div class="referDetails" id="referDetails"></div>
        </div>
        <div class="container">
            <div class="heading_refer">
                <h3>Reference Details</h3>
            </div>
            <div class="referredList" id="referredList"></div>
        </div>


        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        `
    }

    function renderReferDetails(){

        document.getElementById('referDetails').innerHTML = `
            <div class="box">
                <div class="box-data">
                    <p>Total No. of Persons Referred :</p>
                    <p>${referDetailsInfo.total_refered_person}</p>
                </div>
                <div class="box-data">
                    <p>Total Trade Amount by Referred Person (Tk) :</p>
                    <p>${referDetailsInfo.total_trade_tk}</p>
                </div>
                <div class="box-data">
                    <p>Total Reward Points Earned :</p>
                    <p>${referDetailsInfo.total_reward_points}</p>
                </div>
                <div class="link-box">
                    <p>Please Share Your Referral Link with Your Friends & Family Member</p>
                    <p>${referDetailsInfo.link}</p>
                </div>
            </div>
        `
    }
    function renderReferredList(){
        const today = new Date().toISOString().split('T')[0];

        const body = document.getElementById('referredList')
        document.getElementById('referredList').innerHTML = `
            <div class="box">
                <div class="btnRow">
                    <div class="searchContent">
                        <div class="input-box">
                            <input type="date" id="date-from" value= ${today} >
                            <span>To</span>
                            <input type="date" id="date-to" value= ${today}>
                            <div class="searchImg">
                                <img style="width: 20px;" src="../images/icons/magnifying-glass.png" alt="search">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="table-content">
                    <table>
                        <tbody>
                            <tr>
                                <th>Sl</th>
                                <th>Name</th>
                                <th>01 Id</th>
                                <th>Trade Amount</th>
                                <th>Last Trade</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div id="referredListFooter" class="referListFooter"></div>
            </div>
        `

        referListData.forEach((data,index) => {
            const newRow = document.createElement('tr');
    
            newRow.innerHTML = `
                <td>${index}</td>
                <td>${data.name}</td>
                <td>${data.Id01}</td>
                <td>${data.trade_amount}</td>
                <td>${data.trade_date}</td>
            `;
            body.querySelector('tbody').appendChild(newRow);
        });
        const tableFooter = document.getElementById('referredListFooter');
        const totalValue = referListData.reduce((total, data) => total + data.trade_amount, 0);
    
        tableFooter.innerHTML = `
            <p>Total Value:</p>
            <p>${totalValue}</p>
        `;
    }

    refer01()
    renderReferDetails()
    renderReferredList()
}