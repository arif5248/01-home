const historyStack = [];
let otpCountDownInterval
let marketIntervalId;
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('settings').style.display = 'none';
    closeSupportTeam();
    closeSendMessage();
    closeVideoChat();
    route('../component/homeComponent.js', '../css/homeComponent.css', 'home');
    
    
  });
  
  let currentSection = null;
  
  async function route(js, css, case_name, data) {
    async function executeRoute(data){
        if (currentSection !== null) {
            await clearMemory();
        }
        try {
            // Inject the new link tag for styles
            const styleElement = document.createElement('link');
            styleElement.id = `style-${case_name}`;
            styleElement.rel = 'stylesheet';
            styleElement.href = css;
            document.head.appendChild(styleElement);
            
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
    
            // const styleResponse = await fetch(css);
            // if (!styleResponse.ok) {
            //     throw new Error(`Error loading ${case_name}.css`);
            // }
    
            // const styleCode = await styleResponse.text();
    
            
    
            const prev_case = historyStack[historyStack.length - 1];
            if (!prev_case || prev_case.case_name !== case_name) {
                historyStack.push({ case_name });
            }
    
            currentSection = case_name;
    
            const newUrl = window.location.origin + window.location.pathname + `#${case_name}`;
            history.pushState({ case_name : case_name }, null, newUrl);
            
            isVerifiedCacse(case_name, data);
            if(case_name !== 'moneyWithdrawal'){
                clearInterval(otpCountDownInterval)
            }
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
        }
    }
    async function displayNone(){
        document.getElementById('loadingApi').style.display = 'block'
        document.getElementById('mainContentSection').style.display = 'none'
    }
    async function displayBlock(){
        document.getElementById('mainContentSection').style.display = 'flex'
        document.getElementById('mainContentSection').style.flexDirection = 'column'

    }

    await displayNone()
    await executeRoute(data)
    await displayBlock()
    

}

  async function clearMemory() {
    async function clearScript(){
        const script = document.head.getElementsByTagName('script');
        const scriptTagsArray = Array.from(script);
        scriptTagsArray.forEach( (scriptTag) => {
            if (scriptTag.id !== 'boots' && scriptTag.id !== 'routes' && scriptTag.id !== 'fetch' && scriptTag.id !== 'main' && scriptTag.id !== 'tradeGraph') {
                scriptTag.parentNode.removeChild(scriptTag);
            }
        });
    }
    async function clearStyle(){
        const styleSheet = document.head.getElementsByTagName('link');
        const styleTagsArray = Array.from(styleSheet);
        styleTagsArray.forEach(style => {
          if (style.id !== 'boots' && style.id !== 'main-page') {
            style.parentNode.removeChild(style);
          }
        });
    }  
    await clearScript()
    await clearStyle()  
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
async function isVerifiedCacse(case_name, data){
    switch (case_name) {
        case 'marketStatus':
            await executeMarketStatus();
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'news':
            await executeNews();
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'home':
            await executeHome();
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'openBoAccount':
            await executeOpenBOAcc();
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'financialLedger':
            await executeFinancialLedger();
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'profitLedger':
            await executeProfitLedger();
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'stockLedger':
            await executeStockLedger();
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'profitLoss':
            await executeProfitLoss();
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'childID':
            await executechildID();
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'childID_Details':
            await executechildID_Details(data);
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'ipo':
            await executeIpo();
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'dividendRecord':
            await executeDividend_Record();
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'companyInfo':
            await executeCompanyInfo();
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'moneyDeposit':
            await executeMoneyDeposit();
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'bankDeposit':
            await executeBankDeposit(data);
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'moneyWithdrawal':
            await executeMoneyWithdrawal();
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'internalFundTrans':
            await executeInternalFundTransfer();
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'rewardPoints':
            await executeRewardPoints();
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'refer01':
            await executeRefer01();
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'specalOffer':
            await executeOffer();
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'souvenirStore':
            await executeSouvenirStore();
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'trade':
            await executeTrade();
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'TP_companyInfo':
            await executeTP_CompanyInfo();
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'TP_news':
            await executeTP_News();
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'TP_todayTrade':
            await executeTP_todayTrade();
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'TP_lastTrade':
            await executeTP_lastTrade();
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'TP_marketMover':
            await executeTP_marketMover();
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'personalNote':
            await executePersonalNote();
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'personalNotification':
            await executePersonalNotification();
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'changePass':
            await executeChangePass();
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'TP_stockStatus':
            await executeTP_StockStatus();
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'TP_rateHistory':
            await executeTP_rateHistory();
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'TP_halted':
            await executeTP_halted();
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'brokeragePlan':
            await executeBrokeragePlan();
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'mainToProfitLedger':
            await executeMainToProfitLedger();
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'childIdToMotherIdTrans':
            await executeChildIdToMotherIdTrans();
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'boInfoChanges':
            await executeBoInfoChanges();
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'stockDetails':
            await executeStockDetails(data);
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'priceHistory':
            await executePriceHistory(data);
            document.getElementById('loadingApi').style.display = 'none'
            break;
        case 'scheduleCharges':
            await executeScheduleCharges();
            document.getElementById('loadingApi').style.display = 'none'
            break;
    }
}