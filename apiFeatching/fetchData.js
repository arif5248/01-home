function fetchData(api_name, callback){
    const allApi = [
        {
            api_name: "about01_api",
            url : 'http://119.18.148.10/01api/japi.ashx?comp_id=25&type=get_AboutUs'
        },
        {
            api_name: "todaysNews_api",
            url : 'http://119.18.148.10/01api/japi.ashx?comp_id=25&type=get_TodaysNews'
        },
    ]
    allApi.forEach(async function (api_item) {
        if(api_name === api_item.api_name){
            await fetch(api_item.url)
                .then(response => {
                    if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                 return response.json();
                })
                .then(data => {
                    // console.log(data)
                    callback(data);
                })
                .catch(error => {
                console.error('Error fetching data:', error);
                });
        }
    })
    
}
// =================Login==================//

async function investorLogin(investorId, investorPassword) {
    const url = `http://119.18.148.10/01api/kapi1.ashx?type=InvestorLoginV1&investorid=${investorId}&investorpassword=${investorPassword}`;
    await fetch(url, {
        method: 'GET'
    })
    try {
        const response = await fetch(url, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
// =================Get User DashBoard Data==================//

async function getDashBoardData(id){
    const url = `http://119.18.148.10/01api/kapi1.ashx?type=get_inv_bal&inv_id=${id}&comp_id=25`
    await fetch(url, {
        method: 'GET'
    })
    try {
        const response = await fetch(url, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }

}
