const c_Id = 25;

async function getUserIP(){
    const response = await fetch('https://api.ipify.org?format=json');
    userIp = await response.json();
    return userIp
}

// =================Login API==================//
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
        return error
    }
}
// =================Get Data With URL and Form Data==================//
async function fetchDataByUrlAndFormData(url,formData){
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const text = await response.text();
        const sanitizedText = text.replace(/\r?\n/g, '');
        const data = JSON.parse(sanitizedText);
        return data;
        
    } catch (error) {
        console.error('Error fetching data:', error);
        return error
    }
}
// =================Get Data With URL==================//
async function fetchDataByUrl(url){
    try {
        const response = await fetch(url, {
            method: 'GET'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const text = await response.text();
        const sanitizedText = text.replace(/\r?\n/g, '');
        const data = JSON.parse(sanitizedText);
        return data;
        
    } catch (error) {
        console.error('Error fetching data:', error);
        return error
    }
}

//==================All Api===============//
async function getAbout01(){
    const url = `http://119.18.148.10/01api/japi.ashx?comp_id=${c_Id}&type=get_AboutUs`
    return await fetchDataByUrl(url)
}
async function getNews(){
    const exchangeNewsUrl = `http://119.18.148.10/01api/japi.ashx?comp_id=${c_Id}&type=get_TodaysNews`
    const mediaNewsUrl = `http://119.18.148.10/01api/japi.ashx?type=get_PaperNews&comp_id=${c_Id}`
    const exchangeNews = await fetchDataByUrl(exchangeNewsUrl)
    const mediaNews = await fetchDataByUrl(mediaNewsUrl)
    return{ exchangeNews, mediaNews}
}
async function getSelectedCompanyNews(selectedCompany){
    const mediaNewsUrl = `http://119.18.148.10/01api/japi.ashx?type=get_PaperNews&ins_id=${selectedCompany}&comp_id=${c_Id}`
    const mediaNews = await fetchDataByUrl(mediaNewsUrl)
    return mediaNews
}
async function getDashBoardData(inv_Id){
    const url = `http://119.18.148.10/01api/kapi1.ashx?type=get_inv_bal&inv_id=${inv_Id}&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function getUserDetailsData(inv_Id){
    const url = `http://119.18.148.10/01api/kapi1.ashx?type=get_inv_profile&inv_id=${inv_Id}&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function getAllExecuteTrades(dateFrom, dateTo, inv_Id){
    const url = `http://119.18.148.10/01api/kapi1.ashx?type=get_trade_report&inv_id=${inv_Id}&comp_id=${c_Id}&sd=${dateFrom}&ed=${dateTo}`
    return await fetchDataByUrl(url)
}
async function getAllNotes(inv_Id){
    const url = `http://119.18.148.10/01api/japi.ashx?type=get_Notes&inv_id=${inv_Id}&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function getAllMessage(inv_Id){
    const url = `http://119.18.148.10/01api/japi.ashx?type=get_MsgList&inv_id=${inv_Id}&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function createOrEditPersonalNote(inv_Id, noteDate, noteBody, atn){
    const sanitizedText = noteBody.replace(/\r?\n/g, ' ').replace(/\b(and)+\b/g, ' '); 
    
    if(atn && atn !== null){
        const url = `http://119.18.148.10/01api/japi.ashx?type=post_SaveNotes&inv_id=${inv_Id}&comp_id=${c_Id}&note_date=${noteDate}&notes=${sanitizedText}&atn=${atn}`
        return await fetchDataByUrl(url)
    }else{
        const url = `http://119.18.148.10/01api/japi.ashx?type=post_SaveNotes&inv_id=${inv_Id}&comp_id=${c_Id}&note_date=${noteDate}&notes=${sanitizedText}`
        return await fetchDataByUrl(url)
    }
    
}
async function deletePersonalNote(inv_Id, atn){
    const url = `http://119.18.148.10/01api/japi.ashx?type=post_DelNotes&inv_id=${inv_Id}&comp_id=${c_Id}&atn=${atn}`
    return await fetchDataByUrl(url)
}
async function sendMessage(formData){
    const url = `http://119.18.148.10/01api/japi.ashx?type=post_Msg&comp_id=${c_Id}`
    return await fetchDataByUrlAndFormData(url, formData)
}
async function getPersonalNotification(inv_Id){
    const url = `http://119.18.148.10/01api/japi.ashx?type=get_PersonalMsg&inv_id=${inv_Id}&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function setNotificationStatus(inv_Id, msgId){
    const url = `http://119.18.148.10/01api/japi.ashx?type=post_PersonalMsgStatus&inv_id=${inv_Id}&comp_id=${c_Id}&msg_id=${msgId}`
    return await fetchDataByUrl(url)
}
async function getFinacialLedger(inv_Id, dateFrom, dateTo){
    const url = `http://119.18.148.10/01api/japi.ashx?type=get_financialStatement&inv_id=${inv_Id}&comp_id=${c_Id}&fromDate=${dateFrom}&toDate=${dateTo}`
    return await fetchDataByUrl(url)
}
async function getProfitLedger(inv_Id, dateFrom, dateTo){
    const url = `http://119.18.148.10/01api/japi.ashx?type=get_ProfitStatement&inv_id=${inv_Id}&comp_id=${c_Id}&fromDate=${dateFrom}&toDate=${dateTo}`
    return await fetchDataByUrl(url)
}
async function getCompanyList(){
    const url = `http://119.18.148.10/01api/japi.ashx?type=get_CompanyList&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function getCompanyInfo(companyName){
    const url = `http://119.18.148.10/01api/japi.ashx?type=get_Company_info&ins_id=${companyName}&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function getGraphdata(companyName, duration){
    const url = `https://condomshopbd.com/xapi/japi.ashx?type=get_PriceGraph&comp_id=${c_Id}&ins_id=${companyName}&graph_days=${duration}`
    return await fetchDataByUrl(url)
}
async function getUpcomingDividend(){
    const url = `https://condomshopbd.com/xapi/japi.ashx?type=get_RDAGM&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function getPassedDividend(){
    const url = `https://condomshopbd.com/xapi/japi.ashx?type=get_RDAGM_Passed&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function getProfitLossStocksData(inv_Id){
    const url = `https://condomshopbd.com/xapi/japi.ashx?type=get_ProfitLoss&comp_id=${c_Id}&inv_id=${inv_Id}`
    return await fetchDataByUrl(url)
}
async function getAllBrokeragePlan(inv_Id){
    const url = `https://condomshopbd.com/xapi/japi.ashx?type=get_BrokeragePlan&comp_id=${c_Id}&inv_id=${inv_Id}`
    return await fetchDataByUrl(url)
}
async function postPayAndSavePlan(params){
    const url = `https://condomshopbd.com/xapi/japi.ashx?comp_id=${c_Id}&type=post_SaveBrokeragePlan&inv_id=${params.inv_Id}&mobile=${params.mobile}&country=${params.country}&plan_id=${params.plan_id}&package_name=${params.package_name}&auto_renew=${params.auto_renew}&amount=${params.amount}&inv_name=${params.inv_name}&ip_addr=${params.ip_addr}`
    return await fetchDataByUrl(url)
}
async function getExistPlan(inv_Id){
    const url = `http://119.18.148.10/01api/japi.ashx?type=get_Brokerage_ExistingPlan&comp_id=${c_Id}&inv_id=${inv_Id}`
    return await fetchDataByUrl(url)
}
async function getCseDseData(){
    // document.getElementById('loadingApi').style.display = 'block'
    const userIp = await getUserIP()

    async function getCseData(){
        const url = `http://119.18.148.10/01api/share_market_api.ashx?command=select&datatype=index&subtype=cse&sender=01app&ip=${userIp.ip}`
        return await fetchDataByUrl(url)
    }
    async function getDseData(){
        const url = `http://119.18.148.10/01api/share_market_api.ashx?command=select&datatype=index&subtype=dse&sender=01app&ip=${userIp.ip}`
        return await fetchDataByUrl(url)
    }
    const fetchedCseData = await getCseData()
    const fetchedDseData = await getDseData()

    return {fetchedCseData, fetchedDseData}
}
async function getSectorList(){
    const url = `http://119.18.148.10/01api/Kapi1.ashx?type=get_sectorlist&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function getSharePrice(sortedBy){
    const url = `http://119.18.148.10/01api/japi.ashx?type=get_CurrentSharePrice&comp_id=${c_Id}&order_by=${sortedBy}`
    return await fetchDataByUrl(url)
}
async function getIpo(){
    const userIp = await getUserIP()
    async function getUpcomigIpo(){
        const url = `http://119.18.148.10/01api/share_market_api.ashx?command=select&datatype=ipo&subtype=upcoming&sender=01app&ip=${userIp.ip}`
        return await fetchDataByUrl(url)
    }
    async function getRunningIpo(){
        const url = `http://119.18.148.10/01api/share_market_api.ashx?command=select&datatype=ipo&subtype=ongoing&sender=01app&ip=${userIp.ip}`
        return await fetchDataByUrl(url)
    }
    async function getHistoryIpo(){
        const url = `http://119.18.148.10/01api/share_market_api.ashx?command=select&datatype=ipo&subtype=history&sender=01app&ip=${userIp.ip}`
        return await fetchDataByUrl(url)
    }
    const fetchedUpcomingIpo = await getUpcomigIpo()
    const fetchedRunningIpo = await getRunningIpo()
    const fetchedHistoryIpo = await getHistoryIpo()

    return { fetchedUpcomingIpo, fetchedRunningIpo, fetchedHistoryIpo }
    
}
async function getIpoName(inv_Id){
    const url = `http://119.18.148.10/01api/japi.ashx?type=get_ipoName&comp_id=${c_Id}&inv_id=${inv_Id}`
    return await fetchDataByUrl(url)
}
async function ipoApply(formData){
    const userIp = await getUserIP()
    formData.append('ip_addr', userIp.ip);
    
    const url = `http://119.18.148.10/01api/japi.ashx?type=post_IPOApplication&comp_id=${c_Id}`
    return await fetchDataByUrlAndFormData(url, formData)
}
async function getIpoResult(inv_Id){
    const url = `http://119.18.148.10/01api/japi.ashx?type=get_IPOResult&comp_id=${c_Id}&inv_id=${inv_Id}&restype=&ipo_name=`
    return await fetchDataByUrl(url)
}
async function getChildPortfolio(inv_Id){
    const url = `http://119.18.148.10/01api/japi.ashx?type=get_ChildPortfolio&inv_id=${inv_Id}&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function getChildIdStocks(inv_ChildId){
    const url = `http://119.18.148.10/01api/japi.ashx?type=get_ChildStock&inv_id=${inv_ChildId}&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function getMoneyReqInfo(inv_Id){
    const url = `http://119.18.148.10/01api/Kapi1.ashx?type=get_money_req_info&comp_id=${c_Id}&inv_id=${inv_Id}`
    return await fetchDataByUrl(url)
}
async function getOTP(inv_Id, otpType){
    const url = `https://condomshopbd.com/xapi/emp_com.ashx?cmd=brinvphnotp01&comp_id=${c_Id}&invid=${inv_Id}&otptyp=${otpType}`
    return await fetchDataByUrl(url)
}
async function postMoneyReq(data){
    const url = `http://119.18.148.10/01api/Kapi1.ashx?type=post_mon_req&comp_id=${c_Id}&id=${data.id}&phn=${data.phn}&email=${data.email}&amo=${data.amo}&purpose=${data.purpose}&mode=${data.mode}&note=${data.note}&bkash_no=${data.bkash_no}`
    return await fetchDataByUrl(url)
}
async function getMoneyReqStatus (inv_Id){
    const url = `http://119.18.148.10/01api/kapi1.ashx?type=get_mon_req_st&inv_id=${inv_Id}&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function deleteMoneyReq (atn){
    const url = `http://119.18.148.10/01api/japi.ashx?type=post_ReqDelete&comp_id=${c_Id}&atn=${atn}`
    return await fetchDataByUrl(url)
}
async function getAllChildIdList (inv_Id){
    const url = `http://119.18.148.10/01api/japi.ashx?type=get_cIDFund_Main&comp_id=${c_Id}&inv_id=${inv_Id}`
    return await fetchDataByUrl(url)
}
async function postFundTransToMothereIDMain(formData, inv_Id){
    const userIp = await getUserIP()
    formData.append('ip_addr', userIp.ip);
    
    const url = `http://119.18.148.10/01api/japi.ashx?type=post_FundTrToMID_Main&comp_id=${c_Id}&inv_id=${inv_Id}`
    return await fetchDataByUrlAndFormData(url, formData)
}
async function getInvInfo (inv_Id){
    const url = `http://119.18.148.10/01api/kapi1.ashx?type=get_inv_info&comp_id=${c_Id}&inv_id=${inv_Id}`
    return await fetchDataByUrl(url)
}
async function postBoInfoChangeRequest(formData){
    const url = `http://119.18.148.10/01api/kapi1.ashx?type=bo_info_change_request&comp_id=${c_Id}`
    return await fetchDataByUrlAndFormData(url, formData)
}
async function getBoInfoChangeHistory (inv_Id){
    const url = `http://119.18.148.10/01api/japi.ashx?type=get_InfoChangeHistory&comp_id=${c_Id}&inv_id=${inv_Id}`
    return await fetchDataByUrl(url)
}
async function getBalance (inv_Id){
    const url = `http://119.18.148.10/01api/kapi1.ashx?type=get_led_bal&inv_id=${inv_Id}&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function poatTrsnsLedgerBalance (inv_Id, data){
    const url = `http://119.18.148.10/01api/japi.ashx?type=trans_led_bal&comp_id=${c_Id}&fmL=${data.fmL}&toL=${data.toL}&tbal=${data.tbal}&avbal=${data.avbal}&inv_id=${inv_Id}`
    return await fetchDataByUrl(url)
}
async function getInternalFundTransData (inv_Id){
    const url = `http://119.18.148.10/01api/japi.ashx?type=get_InternalFundTrData&comp_id=${c_Id}&inv_id=${inv_Id}`
    return await fetchDataByUrl(url)
}
async function getStockDetails (inv_Id, date_from, date_to, script){
    const url = `http://119.18.148.10/01api/kapi1.ashx?type=get_stk_inv_det&comp_id=${c_Id}&inv_id=${inv_Id}&scrip=${script}&sd=${date_from}&ed=${date_to}`
    return await fetchDataByUrl(url)
}
async function getClosePriceHistory (script){
    const url = `http://119.18.148.10/01api/kapi1.ashx?type=get_sc_clospr&comp_id=${c_Id}&ins_id=${script}`
    return await fetchDataByUrl(url)
}
async function getRefer01Data (inv_Id){
    const url = `http://119.18.148.10/01api/japi.ashx?type=get_Refer01Data&comp_id=${c_Id}&inv_id=${inv_Id}`
    return await fetchDataByUrl(url)
}
async function getRefer01Details (inv_Id, date_from, date_to){
    const url = `http://119.18.148.10/01api/japi.ashx?type=get_Refer01Details&comp_id=${c_Id}&inv_id=${inv_Id}&dtFrom=${date_from}&dtTo=${date_to}`
    return await fetchDataByUrl(url)
}
async function getScheduleOfCharges (){
    const url = `http://119.18.148.10/01api/kapi1.ashx?type=get_schedule_of_charge&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function getMoneyDepositData (){
    const url = `http://119.18.148.10/01api/kapi1.ashx?type=list01V1&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function getCountryCode (){
    const url = `http://119.18.148.10/01api/japi.ashx?type=get_CCode&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function postShareBankDetails(queryData){
    const userIp = await getUserIP()
    const url = `http://119.18.148.10/01api/japi.ashx?type=post_ShareBankDetails&inv_id=${queryData.inv_id}&comp_id=${c_Id}&share_to=${queryData.share_to}&bank=${queryData.bank}&ipAddr=${userIp.ip}&MobileNo=${queryData.MobileNo}&CCode=${queryData.CCode}&Email=${queryData.Email}`
    return await fetchDataByUrl(url)
}
async function getDepositHistory(inv_Id){
    const url = `http://119.18.148.10/01api/kapi1.ashx?type=mr_deposit_history&comp_id=${c_Id}&inv_id=${inv_Id}`
    return await fetchDataByUrl(url)
}
async function deleteMoneyDeposit(inv_Id,atn){
    const url = `http://119.18.148.10/01api/kapi1.ashx?type=mr_deposit_delete&inv_id=${inv_Id}&atn=${atn}&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}


