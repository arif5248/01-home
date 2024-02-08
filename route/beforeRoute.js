const beforeHistoryStack = [];
// component=&
  let beforeCurrentSection = null;

  const urlParams = new URLSearchParams(window.location.search);
  const case_name = urlParams.get('case');

  isVerifiedCacse(case_name)
  
  

  async function beforeRoute(js, case_name) {
    if (beforeCurrentSection !== null) {
        await clearMemory();
    }

  
    try {

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

        const prev_case = beforeHistoryStack[beforeHistoryStack.length - 1];
        if (!prev_case || prev_case.case_name !== case_name) {
            beforeHistoryStack.push({ case_name });
        }

        beforeCurrentSection = case_name;

        // const newUrl = window.location.origin + window.location.pathname + `#${case_name}`;
        // history.pushState({ case_name }, null, newUrl);

        // isVerifiedCacse(case_name);

    } catch (error) {
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

  function goBack() {
    if (beforeHistoryStack.length > 1) {
        beforeHistoryStack.pop(); 
        const prevState = beforeHistoryStack.pop(); 
        const case_name = prevState.case_name;
        route(`../component/${case_name}Component.js`, `../css/${case_name}Component.css`, case_name);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('popstate', function (event) {
        if (event.state) {
            goBack();
        }
    });
});

async function isVerifiedCacse(case_name){
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
        


    }
}




