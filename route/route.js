const historyStack = [];
let marketIntervalId;
document.addEventListener('DOMContentLoaded', function () {
    route('../component/homeComponent.js', '../css/homeComponent.css', 'home');
    closeSupportTeam();
    closeSendMessage();
    closeVideoChat();
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('settings').style.display = 'none';

  
  });
  
  let currentSection = null;
  
  async function route(js, css, case_name) {
    if (currentSection !== null) {
        await clearMemory();
    }

    // Add a loading class to indicate that content is being loaded
    document.getElementById('mainContentSection').classList.add('loading');
    try {
        const styleResponse = await fetch(css);
        if (!styleResponse.ok) {
            throw new Error(`Error loading ${case_name}.css`);
        }

        const styleCode = await styleResponse.text();

        // Inject the new link tag for styles
        const styleElement = document.createElement('link');
        styleElement.id = `style-${case_name}`;
        styleElement.rel = 'stylesheet';
        styleElement.href = css;
        document.head.appendChild(styleElement);

        // Remove loading class once styles are injected
        document.getElementById('mainContentSection').classList.remove('loading');

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

        const prev_case = historyStack[historyStack.length - 1];
        if (!prev_case || prev_case.case_name !== case_name) {
            historyStack.push({ case_name });
        }

        currentSection = case_name;

        const newUrl = window.location.origin + window.location.pathname + `#${case_name}`;
        history.pushState({ case_name }, null, newUrl);

        isVerifiedCacse(case_name);

        if (case_name === 'trade') {
            if (prev_case.case_name !== case_name) {
                const executeTradeResult = executeTrade();
                let updateCountdown = executeTradeResult.updateCountdown;
                marketIntervalId = setInterval(updateCountdown, 1000);
            }
        } else {
            clearInterval(marketIntervalId);
        }
    } catch (error) {
        console.error(error);
        // Remove loading class in case of an error
        document.getElementById('mainContentSection').classList.remove('loading');
    }
}

  async function clearMemory() {
      return new Promise(resolve => {
        const script = document.head.getElementsByTagName('script');
        const scriptTagsArray = Array.from(script);
        scriptTagsArray.forEach(scriptTag => {
          if (scriptTag.id !== 'boots' && scriptTag.id !== 'routes' && scriptTag.id !== 'fetch' && scriptTag.id !== 'main') {
            scriptTag.parentNode.removeChild(scriptTag);
          }
        });
    
        const styleSheet = document.head.getElementsByTagName('link');
        const styleTagsArray = Array.from(styleSheet);
        styleTagsArray.forEach(style => {
          if (style.id !== 'boots' && style.id !== 'main-page') {
            style.parentNode.removeChild(style);
          }
        });
    
        resolve(); 
      });
    }

  function goBack() {
    if (historyStack.length > 1) {
        historyStack.pop(); 
        const prevState = historyStack.pop(); 
        const case_name = prevState.case_name;
        route(`../component/${case_name}Component.js`, `../css/${case_name}Component.css`, case_name);
        if(case_name && typeof case_name === 'string' && case_name.startsWith('TP_')){
            updateFooterBtnState('trade');
        }else{
            updateFooterBtnState(case_name);
        }
        
    }
}

document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('popstate', function (event) {
        if (event.state) {
            goBack();
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
        case 'trade':
            executeTrade();
            break;
        case 'TP_companyInfo':
            executeTP_CompanyInfo();
            break;
        case 'TP_news':
            executeTP_News();
            break;
        case 'TP_todayTrade':
            executeTP_todayTrade();
            break;
        case 'TP_lastTrade':
            executeTP_lastTrade();
            break;
        case 'TP_marketMover':
            executeTP_marketMover();
            break;
        case 'personalNote':
            executePersonalNote();
            break;
        case 'personalNotification':
            executePersonalNotification();
            break;
        case 'changePass':
            executeChangePass();
            break;


    }
}