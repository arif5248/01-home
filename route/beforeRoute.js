let beforeCurrentSection = null;

const urlParams = new URLSearchParams(window.location.search);
const case_name = urlParams.get('case');
const data = urlParams.get('data')

isVerifiedCacse(case_name, data)
  
  

async function beforeRoute(js, case_name) {

    if (beforeCurrentSection !== null) {
        await clearMemory();
    }

    try{

        const response = await fetch(js);
        if (!response.ok) {
            throw new Error(`Error loading ${case_name}.js`);
        }

        const scriptCode = await response.text();

        // Inject the new script
        const scriptElement = document.createElement('script');
        scriptElement.id = case_name;
        scriptElement.textContent = scriptCode;
        document.head.appendChild(scriptElement);

        beforeCurrentSection = case_name;
    }catch (error) {
        console.error(error);
    }
}

async function clearMemory() {
    return new Promise(resolve => {
    const script = document.head.getElementsByTagName('script');
    const scriptTagsArray = Array.from(script);
    scriptTagsArray.forEach(scriptTag => {
        if (scriptTag.id !== 'boots' && scriptTag.id !== 'beforeRoute' && scriptTag.id !== 'fetch' && scriptTag.id !== 'index') {
        scriptTag.parentNode.removeChild(scriptTag);
        }
    });
    resolve(); 
    });
}

async function isVerifiedCacse(case_name, data){
    switch (case_name) {
        case 'B_marketStatus':
            await beforeRoute(`../component/${case_name}Component.js`)
            executeB_MarketStatus();
            break;
        case 'B_sharePrice':
            await beforeRoute(`../component/${case_name}Component.js`)
            executeB_SharePrice();
            break;
        case 'B_news':
            await beforeRoute(`../component/${case_name}Component.js`)
            executeB_News();
            break;
        case 'B_ipo':
            await beforeRoute(`../component/${case_name}Component.js`)
            executeB_Ipo();
            break;
        case 'B_why01':
            await beforeRoute(`../component/${case_name}Component.js`)
            executeB_Why01();
            break;
        case 'B_ourService':
            await beforeRoute(`../component/${case_name}Component.js`)
            executeB_OurService();
            break;
        case 'B_get01':
            await beforeRoute(`../component/${case_name}Component.js`)
            executeB_Get01Technology();
            break;
        case 'B_noti':
            await beforeRoute(`../component/${case_name}Component.js`)
            executeB_Notification();
            break;
        case 'B_payUs':
            await beforeRoute(`../component/${case_name}Component.js`)
            executeB_HowToPayUs();
            break;
        case 'B_priceHistory':
            await beforeRoute(`../component/${case_name}Component.js`)
            executeB_PriceHistory(data);
            break;
        case 'B_promotions':
            await beforeRoute(`../component/${case_name}Component.js`)
            executeB_Promotions();
            break;
        case 'B_careerWith01':
            await beforeRoute(`../component/${case_name}Component.js`)
            executeB_careerWith01();
            break;
        case 'B_jobApply':
            await beforeRoute(`../component/${case_name}Component.js`)
            executeB_jobApply(data);
            break;
    }
}




