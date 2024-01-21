let currentSection = null;

function route(js,css,case_name) {
    if (currentSection !== null) {
        clearMemory(currentSection);
    }
    
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

    const newScript = document.createElement('script');
    newScript.src = js;
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

function isVerifiedCacse(case_name){
    switch (case_name) {
        case 'market':
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

    }
}