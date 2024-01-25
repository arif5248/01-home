let currentSection = null;

function route(js,css,case_name) {
    if (currentSection !== null) {
        clearMemory(currentSection);
    }
    
    const newScript = document.createElement('script');
    newScript.src = js;
    newScript.id = case_name;
    newScript.defer = true;
    newScript.setAttribute('data-loaded', 'dynamic-script');

    
    function scriptLoaded() {
        newScript.removeEventListener('load', scriptLoaded);
        newScript.removeEventListener('error', scriptError);

        isVerifiedCacse(case_name)
        
    }

    function scriptError() {
        console.error(`Error loading ${section}.js`);
    }

    newScript.addEventListener('load', scriptLoaded);
    newScript.addEventListener('error', scriptError);

    document.head.appendChild(newScript);

    currentSection = case_name;

    const newStyleSheet = document.createElement('link');
    newStyleSheet.rel = 'stylesheet';
    newStyleSheet.href = css;
    newStyleSheet.setAttribute('data-loaded', 'dynamic-style');
    document.head.appendChild(newStyleSheet);

    const script = document.head.getElementsByTagName('script');
    const scriptTagsArray = Array.from(script);
    scriptTagsArray.forEach(scriptTag => {
        if (scriptTag.id !== 'boots' && scriptTag.id !== case_name && scriptTag.id !== 'fetch') {
            scriptTag.parentNode.removeChild(scriptTag);
        }
    });

    const newUrl = window.location.origin + window.location.pathname + `#${case_name}`;
    history.pushState({ case_name }, null, newUrl);
}

function clearMemory(section) {
    const styleSheet = document.head.getElementsByTagName('link');
    const styleTagsArray = Array.from(styleSheet);
    styleTagsArray.forEach(style => {
        if (style.id !== 'boots' && style.id !== 'main-page') {
            style.parentNode.removeChild(style);
        }
    });

    const script = document.head.getElementsByTagName('script');
    const scriptTagsArray = Array.from(script);
    scriptTagsArray.forEach(scriptTag => {
        if (scriptTag.id !== 'boots' && scriptTag.id !== 'routes' && scriptTag.id !== 'fetch' && scriptTag.id !== 'main') {
            scriptTag.parentNode.removeChild(scriptTag);
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
  route('../component/homeComponent.js','../css/homeComponent.css','home');
  closeSupportTeam()
  closeSendMessage()
  closeVideoChat()
//   sendMessage()
//   videoChat()
    
});
document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('popstate', function (event) {
        if (event.state) {
            const case_name = event.state.case_name;
            route(`../component/${case_name}Component.js`, `../css/${case_name}Component.css`, case_name);
        }
    });
});

function isVerifiedCacse(case_name){
    switch (case_name) {
        case 'marketStatus':
            executeMarket();
            break;
        case 'news':
            executeNews();
            break;
        case 'home':
            executeHome();
            break;
        case 'openBoAccount':
            executeOpenBOAcc();
            break;
        case 'financialLedger':
            executeFinancialLedger();
            break;
        case 'profitLedger':
            executeProfitLedger();
            break;
        case 'stockLedger':
            executeStockLedger();
            break;
        case 'profitLoss':
            executeProfitLoss();
            break;
        case 'childID':
            executechildID();
            break;
        case 'childID_Details':
            executechildID_Details();
            break;
        case 'ipo':
            executeIpo();
            break;
        case 'dividendRecord':
            executeDividend_Record();
            break;
        case 'companyInfo':
            executeCompanyInfo();
            break;
        case 'moneyDeposit':
            executeMoneyDeposit();
            break;
        case 'bankDeposit-0':
            executeBankDeposit_0();
            break;
        case 'bankDeposit-1':
            executeBankDeposit_1();
            break;
        case 'bankDeposit-2':
            executeBankDeposit_2();
            break;
        case 'moneyWithdrawal':
            executeMoneyWithdrawal();
            break;
        case 'internalFundTrans':
            executeInternalFundTransfer();
            break;
        case 'rewardPoints':
            executeRewardPoints();
            break;
        case 'refer01':
            executeRefer01();
            break;
        case 'specalOffer':
            executeOffer();
            break;
        case 'souvenirStore':
            executeSouvenirStore();
            break;

    }
}