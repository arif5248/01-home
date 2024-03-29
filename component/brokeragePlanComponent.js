async function executeBrokeragePlan(){
    const existPlan =  await getExistPlan(user.LoggedInInvestorId)
    let selectedPlanId, selectedPackName,selectedPackAmount, availableBalance
    let autoRenew = 0
    const fetcheAllBrokeragePlandData = await getAllBrokeragePlan(user.LoggedInInvestorId)
    function selectedPackage(package, planId){
        return function(event) {
            document.getElementById(`${planId}${package.pack_id}`).checked = true
            document.getElementById('selectedPackageName').innerHTML = package.pack_title
            document.getElementById('selectedPackageBill').innerHTML = package.pack_amount
            document.getElementById('selectedPackageReward').innerHTML = package.pack_reward ? package.pack_reward : 0 
            document.getElementById('selectedPackageValidity').innerHTML = package.pack_expire_date

            selectedPackName = package.pack_title
            selectedPackAmount = package.pack_amount
            selectedPlanId = planId

            const elements = document.getElementsByClassName('planPackage');
            const elementsArray = Array.from(elements);

            elementsArray.forEach(element => {
                element.style.boxShadow = 'none'
            });
            document.getElementById(`${planId}_${package.pack_id}`).style.boxShadow = '0px 0px 6px 2px #000'
        };
    }
    function selectAccount(event){
        if(event.target.value === 'Account'){
            document.getElementById('selectedAccount').innerHTML = ``
            document.getElementById('selectedAccount').innerHTML = fetcheAllBrokeragePlandData.status === true ? fetcheAllBrokeragePlandData.MainBalance : ''
            availableBalance = document.getElementById('selectedAccount').innerHTML
        }else{
            document.getElementById('selectedAccount').innerHTML = ``
            document.getElementById('selectedAccount').innerHTML = fetcheAllBrokeragePlandData.status === true ? fetcheAllBrokeragePlandData.RewardPointBalance : ''
            availableBalance = document.getElementById('selectedAccount').innerHTML
        }
    }
   async function payAndSavePlan(){
        if (document.getElementById('autoRenew').checked === true){
            autoRenew = 1
        }
        const isAcceptedTermsAndConditions = document.getElementById('terms_conditions').checked
        if(isAcceptedTermsAndConditions === false){
            document.getElementById('errorMessageForTC').innerHTML=``
            document.getElementById('errorMessageForTC').innerHTML=`
                Please agree to the terms and conditions 
            `
            setTimeout(() => {
                document.getElementById('errorMessageForTC').innerHTML=``
            }, 3000);
        }
        if(selectedPlanId !== undefined && selectedPackAmount !== undefined && selectedPackName !== undefined && availableBalance !== undefined){
            availableBalance = typeof(availableBalance) === "string" ? Number(availableBalance.replace(/,/g, '')) : availableBalance
            if(availableBalance < Number(selectedPackAmount.replace(/,/g, ''))){
                document.getElementById('errorMessageForPackage').innerHTML=``
                document.getElementById('errorMessageForPackage').innerHTML=`
                    Insufficient Available Balance
                `
                setTimeout(() => {
                    document.getElementById('errorMessageForPackage').innerHTML=``
                }, 3000);
            }else{
                const params = {
                    inv_id: user.LoggedInInvestorId,
                    mobile: user.phone,
                    country: user.country,
                    plan_id: selectedPlanId,
                    package_name: selectedPackName,
                    auto_renew: autoRenew,
                    amount: selectedPackAmount,
                    inv_name: user.LoggedInInvestorName,
                    ip_addr: userIp.ip
                }
                const result = await postPayAndSavePlan(params)
                console.log(result)
            }
            
        }else{
            document.getElementById('errorMessageForPackage').innerHTML=``
            document.getElementById('errorMessageForPackage').innerHTML=`
                Please select a package and  your account
            `
            setTimeout(() => {
                document.getElementById('errorMessageForPackage').innerHTML=``
            }, 3000);
        }
        
    }
    
    function brokeragePlan(){
        document.getElementById('mainContentSection').innerHTML = `
        <div class="pageHeading" id="financial-Heading">
            <div class="heading">
                <h1>Brokerage Plan</h1>
            </div>
        </div>
        <div class="activePlanSection">
            <div class="container">
                <div class='activePlan' id='activePlan'></div>
            </div>
        </div>
        <div class="plan1Section">
            <div class="container">
                <div class='allPlan' id='allPlan'></div>
            </div>
        </div>
        <div class="paymentSection">
            <div class="container">
                <div class='paymentOption' id='paymentOption'></div>
            </div>
        </div>
        <div class='termsConditionSection'>
            <div class="container">
                <div class='termsCondition' id='termsCondition'></div>
            </div>
        </div>
        <br>
        <br>
        <br>
        <br>
        `
    }

    function renderActivePlan(fetchedData){
        document.getElementById('activePlan').innerHTML = `
            <h4 class='planHeading'>Your Active Plan</h4>
            <div class='planBody'>
                <p class='plan_title'>${fetchedData.plan}</p>
                <h5 class='activePlanStatus'>${fetchedData.status}</h5>
                <p class='planFeatures'>${fetchedData.expire}</p>
            </div>
        `
    }
    function renderAllPlan(){
        if(fetcheAllBrokeragePlandData.status === true){
            const allPlanBody = document.getElementById('allPlan')
            fetcheAllBrokeragePlandData.Data.forEach((data, index) => {
               const newDiv = document.createElement('div')
               newDiv.classList.add('planBox')
               newDiv.innerHTML = `
                <h4 class='planHeading'>${data.plan_name}</h4>
                <div class='planBody'>
                    <p class='plan_title'>${data.plan_title}</p>
                    <h5 class='planDetails'>${data.plan_details}</h5>
                    <p class='planFeatures'>${data.plan_features}</p>
                </div>
                <div class='planPackagesBody' id='planPackage${index}'></div>
               `
               allPlanBody.appendChild(newDiv)
               const planpackageBody = document.getElementById(`planPackage${index}`)
               data.Packages.forEach(package =>{
                    const planPackageDiv = document.createElement('div')
                    planPackageDiv.classList.add('planPackage')
                    planPackageDiv.setAttribute('id', `${data.pid}_${package.pack_id}`);
                    if(package.pack_id !== ''){
                        planPackageDiv.innerHTML=`
                        <div class='packageHeading'>
                            <input id='${data.pid}${package.pack_id}' type='radio' name='${data.pid}packages' >
                            <h4>${package.pack_title}${package.pack_details}</h4>
                        </div>
                        <p>Includes :</p>
                        <div class='packageFeatures'>${package.pack_features}</div>
                    `
                    planpackageBody.appendChild(planPackageDiv)

                    document.getElementById(`${data.pid}_${package.pack_id}`).addEventListener('click', selectedPackage(package, data.pid));
                    }
               })
            });
            
        }
        
    }
    function renderPaymentOption(){
        const paymentOptionBody = document.getElementById('paymentOption')
        paymentOptionBody.innerHTML=`
            <h4 class='paymentOptionHeading'>Payment Option</h4>
            <div id='errorMessageForPackage'></div>
            <div class='bill_reward'>
                <p>Selected package</p>
                <p style='text-align:right;' id='selectedPackageName'></p>
            </div>
            <div class='bill_reward'>
                <p>Bill Amount</p>
                <p style='text-align:right;' id='selectedPackageBill'></p>
            </div>
            <div class='bill_reward'>
                <p>Equivalent Reward Point</p>
                <p style='text-align:right;' id='selectedPackageReward'></p>
            </div>
            <div class='paymentBy'>
                <p>I would like to pay By:</p>
                <div class='paymentOptionBox'>
                    <div class='fromAcc'>
                        <input id='fromAccClicked' type='radio' name='paymentBy' value='Account'>
                        <label>Account Debit</label>
                    </div>
                    <div class='fromReward' style='pointer-events: none; opacity: 0.5;'>
                        <input id='fromRewardClicked' value='Reward' type='radio' name='paymentBy' disabled>
                        <label>Reward Point</label>
                    </div>
                </div> 
                <div class='bill_reward'>
                <p>Bill Available Balance</p>
                <p style='text-align:right;' id='selectedAccount'></p>
            </div>
            </div>
            <div class='autoRenew'>
                <input type="checkbox" id="autoRenew" name="autoRenew" >
                <label for="autoRenew">Auto Renew</label>
            </div>
            <p id='selectedPackageValidity' class='validity' style='font-weight: bold;'></p>
            <div class='terms_conditions'>
                <input type="checkbox" id="terms_conditions" name="terms_conditions" value=true>
                <label id='showTermsCondition' style='color:#0d6efd;'>I Agree to Terms & Conditions</label>
            </div>
            <div id='errorMessageForTC'></div>
            <div id='submitForPlan' class='submit_plan'>PAY & SAVE MY PLAN</div>
        `
        document.getElementById('fromRewardClicked').addEventListener('click', selectAccount)
        document.getElementById('fromAccClicked').addEventListener('click', selectAccount)
        document.getElementById('showTermsCondition').addEventListener('click', renderTermsAndCondition)
        
    }
    function renderTermsAndCondition(){
        document.getElementById('termsCondition').innerHTML= `
        <p>${fetcheAllBrokeragePlandData.status === true ? fetcheAllBrokeragePlandData.Terms[0].terms : ''}</p>
        `
        document.getElementById('overlay').style.display = 'block'
        document.getElementById('overlay').style.height = '160%'
        document.getElementById('termsCondition').style.display = 'block'
        document.body.style.overflow = 'hidden'
    }
    function closeTermsConditions(){
        document.getElementById('overlay').style.display = 'none'
        document.getElementById('termsCondition').style.display = 'none'
        document.body.style.overflow = 'auto'
    }

    brokeragePlan()
    if(existPlan.status === true){
        renderActivePlan(existPlan.Data)
    }
    renderAllPlan()
    renderPaymentOption()
    document.getElementById('termsCondition').style.display = 'none'
    document.getElementById('overlay').addEventListener('click', closeTermsConditions)
    document.getElementById('submitForPlan').addEventListener('click', payAndSavePlan)
    
    
}