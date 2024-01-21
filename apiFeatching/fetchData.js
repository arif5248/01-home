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