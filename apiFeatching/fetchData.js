
const c_Id = 25;
// const baseUrl = 'http://119.18.148.10/01api/'
const baseUrl = 'https://www.condomshopbd.com/01apitestios/'

let isAndriod;
const device = sessionStorage.getItem("osType");
isAndriod = device === 'android' ? true : false

 
// =================Get User Ip==================//
async function getUserIP(){
    const response = await fetch('https://api.ipify.org?format=json');
    userIp = await response.json();
    return userIp
}
// ===================Encription ====================//
async function encrypt(clearText) {
    const encryptionKey = 'MAKV2SPBNI99212';
    const salt = new Uint8Array([0x49, 0x76, 0x61, 0x6E, 0x20, 0x4D, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76]);

    // Derive key
    const keyMaterial = await window.crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(encryptionKey),
        { name: 'PBKDF2' },
        false,
        ['deriveKey', 'deriveBits']
    );

    const key = await window.crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: salt,
            iterations: 1000,
            hash: 'SHA-1'
        },
        keyMaterial,
        { name: 'AES-CBC', length: 256 },
        false,
        ['encrypt', 'decrypt']
    );

    // Derive IV (Initialization Vector)
    const iv = new Uint8Array(await window.crypto.subtle.deriveBits(
        {
            name: 'PBKDF2',
            salt: salt,
            iterations: 1000,
            hash: 'SHA-1'
        },
        keyMaterial,
        128
    ));

    // Encrypt
    const encryptedContent = await window.crypto.subtle.encrypt(
        { name: 'AES-CBC', iv: iv },
        key,
        new TextEncoder().encode(clearText)
    );

    return btoa(String.fromCharCode(...new Uint8Array(encryptedContent)));
}
// =================Date Converter==================//
function customDateConverter(data, direction){
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dateString = data;
    if(direction === 'defaultToCustom'){
        const datePart = dateString.split(' ')[0];
        const dateObj = new Date(datePart);
        let day = dateObj.getDate();
        day = day < 10 ? '0'+day : day
        
        const monthIndex = dateObj.getMonth();
        const year = dateObj.getFullYear();

        const formattedDate = day + '/' + monthNames[monthIndex] + '/' + year;
        return formattedDate
    }
    
}


// =================Login API==================//
async function investorLogin(investorId, investorPassword) {
    const url = `${baseUrl}kapi1.ashx?type=InvestorLoginV1&investorid=${investorId}&investorpassword=${investorPassword}`;
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
// =================Get Data With Mwthod, URL, Body and Header==================//
async function fetchDataByMethodUrlBodyDataAndHeader(url, method, headers, bodyData){
    try {
        const response = await fetch(url, {
            method: method,
            headers: headers,
            body: bodyData,
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
        const sanitizedText = text.replace(/\r?\n/g, '').replace(/[\u000A\u000D]/g, '');
        const data = JSON.parse(sanitizedText);
        return data;
        
    } catch (error) {
        console.error('Error fetching data:', error);
        return error
    }
}
// =================Save Log==================//
async function saveLog(inv_Id, pageName){
    const userIp = await getUserIP()
    const deviceType = isAndriod === true ? 1 : 0
    const url = `${baseUrl}japi.ashx?type=post_SaveLog&comp_id=${c_Id}&isMobile=True&isAndroid=${deviceType}&pageName=${pageName}&desc=New App: ${userIp.ip}&inv_id=${inv_Id}`
    return await fetchDataByUrl(url)
}
// =================Get Before Company Data==================//
async function getCmsHome (){
    const url = `${baseUrl}Kapi1.ashx?type=get_cms_home&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
//==================All Api===============//
async function getRecoverPass(id, phone){
    const userIp = await getUserIP()
    const url = `${baseUrl}japi.ashx?type=post_PassRecovery&comp_id=${c_Id}&inv_id=${id}&inv_phn=${phone}&ip_addr=${userIp.ip}`
    return await fetchDataByUrl(url)
}
async function getAbout01(){
    const url = `${baseUrl}Kapi1.ashx?type=officelist&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function getNews(){
    const exchangeNewsUrl = `${baseUrl}japi.ashx?comp_id=${c_Id}&type=get_TodaysNews`
    const mediaNewsUrl = `${baseUrl}japi.ashx?type=get_PaperNews&comp_id=${c_Id}`
    const exchangeNews = await fetchDataByUrl(exchangeNewsUrl)
    const mediaNews = await fetchDataByUrl(mediaNewsUrl)
    return{ exchangeNews, mediaNews}
}
async function getSelectedCompanyNews(selectedCompany){
    const mediaNewsUrl = `${baseUrl}japi.ashx?type=get_PaperNews&ins_id=${selectedCompany}&comp_id=${c_Id}`
    const mediaNews = await fetchDataByUrl(mediaNewsUrl)
    return mediaNews
}
async function getDashBoardData(inv_Id){
    const url = `${baseUrl}kapi1.ashx?type=get_inv_bal&inv_id=${inv_Id}&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function getUserDetailsData(inv_Id){
    const url = `${baseUrl}kapi1.ashx?type=get_inv_profile&inv_id=${inv_Id}&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function getAllExecuteTrades(dateFrom, dateTo, inv_Id){
    const url = `${baseUrl}kapi1.ashx?type=get_trade_report&inv_id=${inv_Id}&comp_id=${c_Id}&sd=${dateFrom}&ed=${dateTo}`
    return await fetchDataByUrl(url)
}
async function getAllNotes(inv_Id){
    const url = `${baseUrl}japi.ashx?type=get_Notes&inv_id=${inv_Id}&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function getAllMessage(inv_Id){
    const url = `${baseUrl}japi.ashx?type=get_MsgList&inv_id=${inv_Id}&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function createOrEditPersonalNote(inv_Id, noteDate, noteBody, atn){
    const sanitizedText = noteBody.replace(/\r?\n/g, ' ').replace(/\b(and)+\b/g, ' '); 
    
    if(atn && atn !== null){
        const url = `${baseUrl}japi.ashx?type=post_SaveNotes&inv_id=${inv_Id}&comp_id=${c_Id}&note_date=${noteDate}&notes=${sanitizedText}&atn=${atn}`
        return await fetchDataByUrl(url)
    }else{
        const url = `${baseUrl}japi.ashx?type=post_SaveNotes&inv_id=${inv_Id}&comp_id=${c_Id}&note_date=${noteDate}&notes=${sanitizedText}`
        return await fetchDataByUrl(url)
    }
    
}
async function deletePersonalNote(inv_Id, atn){
    const url = `${baseUrl}japi.ashx?type=post_DelNotes&inv_id=${inv_Id}&comp_id=${c_Id}&atn=${atn}`
    return await fetchDataByUrl(url)
}
async function sendMessage(formData){
    const url = `${baseUrl}japi.ashx?type=post_Msg&comp_id=${c_Id}`
    return await fetchDataByUrlAndFormData(url, formData)
}
async function get_vChatTime(chat_date){
    const url = `${baseUrl}japi.ashx?type=get_vChatTime&comp_id=${c_Id}&chat_date=${chat_date}`
    return await fetchDataByUrl(url)
}
async function post_vChatRequest(formData){
    const userIp = await getUserIP()
    formData.append('ipAddr', userIp.ip);
    const url = `${baseUrl}japi.ashx?type=post_vChatRequest&comp_id=${c_Id}`
    return await fetchDataByUrlAndFormData(url, formData)
}
async function post_SendEmail(data, purpose){
    const url = `${baseUrl}japi.ashx?type=post_SendEmail&comp_id=${c_Id}&email_id=support@01.limited&email_subject=${purpose}`
    const method = 'POST'
    const headers = new Headers();
    // headers.append("Content-Type", "application/json");
    // const bodyData = JSON.stringify(data);
    return await fetchDataByMethodUrlBodyDataAndHeader(url, method, headers, data)
}
async function getPersonalNotification(inv_Id){
    const url = `${baseUrl}japi.ashx?type=get_PersonalMsg&inv_id=${inv_Id}&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function setNotificationStatus(inv_Id, msgId){
    const url = `${baseUrl}japi.ashx?type=post_PersonalMsgStatus&inv_id=${inv_Id}&comp_id=${c_Id}&msg_id=${msgId}`
    return await fetchDataByUrl(url)
}
async function getFinacialLedger(inv_Id, dateFrom, dateTo){
    const url = `${baseUrl}japi.ashx?type=get_financialStatement&inv_id=${inv_Id}&comp_id=${c_Id}&fromDate=${dateFrom}&toDate=${dateTo}`
    return await fetchDataByUrl(url)
}
async function getProfitLedger(inv_Id, dateFrom, dateTo){
    const url = `${baseUrl}japi.ashx?type=get_ProfitStatement&inv_id=${inv_Id}&comp_id=${c_Id}&fromDate=${dateFrom}&toDate=${dateTo}`
    return await fetchDataByUrl(url)
}
async function getCompanyList(){
    const url = `${baseUrl}japi.ashx?type=get_CompanyList&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function getCompanyInfo(companyName){
    const url = `${baseUrl}japi.ashx?type=get_Company_info&ins_id=${companyName}&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function getGraphdata(companyName, duration){
    console.log(companyName, duration )
    const url = `${baseUrl}japi.ashx?type=get_PriceGraph&comp_id=${c_Id}&ins_id=${companyName}&graph_days=${duration}`
    return await fetchDataByUrl(url)
}
async function getUpcomingDividend(){
    const url = `${baseUrl}japi.ashx?type=get_RDAGM&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function getPassedDividend(){
    const url = `${baseUrl}japi.ashx?type=get_RDAGM_Passed&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function getProfitLossStocksData(inv_Id){
    const url = `${baseUrl}japi.ashx?type=get_ProfitLoss&comp_id=${c_Id}&inv_id=${inv_Id}`
    return await fetchDataByUrl(url)
}
async function getAllBrokeragePlan(inv_Id){
    const url = `${baseUrl}japi.ashx?type=get_BrokeragePlan&comp_id=${c_Id}&inv_id=${inv_Id}`
    return await fetchDataByUrl(url)
}
async function postPayAndSavePlan(params){
    const url = `${baseUrl}japi.ashx?comp_id=${c_Id}&type=post_SaveBrokeragePlan&inv_id=${params.inv_Id}&mobile=${params.mobile}&country=${params.country}&plan_id=${params.plan_id}&package_name=${params.package_name}&auto_renew=${params.auto_renew}&amount=${params.amount}&inv_name=${params.inv_name}&ip_addr=${params.ip_addr}`
    return await fetchDataByUrl(url)
}
async function getExistPlan(inv_Id){
    const url = `${baseUrl}japi.ashx?type=get_Brokerage_ExistingPlan&comp_id=${c_Id}&inv_id=${inv_Id}`
    return await fetchDataByUrl(url)
}
async function getCseDseData(){
    // document.getElementById('loadingApi').style.display = 'block'
    const userIp = await getUserIP()

    async function getCseData(){
        const url = `${baseUrl}share_market_api.ashx?command=select&datatype=index&subtype=cse&sender=01app&ip=${userIp.ip}`
        return await fetchDataByUrl(url)
    }
    async function getDseData(){
        const url = `${baseUrl}share_market_api.ashx?command=select&datatype=index&subtype=dse&sender=01app&ip=${userIp.ip}`
        return await fetchDataByUrl(url)
    }
    const fetchedCseData = await getCseData()
    const fetchedDseData = await getDseData()

    return {fetchedCseData, fetchedDseData}
}
async function getSectorList(){
    const url = `${baseUrl}Kapi1.ashx?type=get_sectorlist&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function getSharePrice(sortedBy){
    const url = `${baseUrl}japi.ashx?type=get_CurrentSharePrice&comp_id=${c_Id}&order_by=${sortedBy}`
    return await fetchDataByUrl(url)
}
async function getIpo(){
    const userIp = await getUserIP()
    async function getUpcomigIpo(){
        const url = `${baseUrl}share_market_api.ashx?command=select&datatype=ipo&subtype=upcoming&sender=01app&ip=${userIp.ip}`
        return await fetchDataByUrl(url)
    }
    async function getRunningIpo(){
        const url = `${baseUrl}share_market_api.ashx?command=select&datatype=ipo&subtype=ongoing&sender=01app&ip=${userIp.ip}`
        return await fetchDataByUrl(url)
    }
    async function getHistoryIpo(){
        const url = `${baseUrl}share_market_api.ashx?command=select&datatype=ipo&subtype=history&sender=01app&ip=${userIp.ip}`
        return await fetchDataByUrl(url)
    }
    const fetchedUpcomingIpo = await getUpcomigIpo()
    const fetchedRunningIpo = await getRunningIpo()
    const fetchedHistoryIpo = await getHistoryIpo()

    return { fetchedUpcomingIpo, fetchedRunningIpo, fetchedHistoryIpo }
    
}
async function getIpoName(inv_Id){
    const url = `${baseUrl}japi.ashx?type=get_ipoName&comp_id=${c_Id}&inv_id=${inv_Id}`
    return await fetchDataByUrl(url)
}
async function ipoApply(formData){
    const userIp = await getUserIP()
    formData.append('ip_addr', userIp.ip);
    
    const url = `${baseUrl}japi.ashx?type=post_IPOApplication&comp_id=${c_Id}`
    return await fetchDataByUrlAndFormData(url, formData)
}
async function getIpoResult(inv_Id){
    const url = `${baseUrl}japi.ashx?type=get_IPOResult&comp_id=${c_Id}&inv_id=${inv_Id}&restype=&ipo_name=`
    return await fetchDataByUrl(url)
}
async function getChildPortfolio(inv_Id){
    const url = `${baseUrl}japi.ashx?type=get_ChildPortfolio&inv_id=${inv_Id}&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function getChildIdStocks(inv_ChildId){
    const url = `${baseUrl}japi.ashx?type=get_ChildStock&inv_id=${inv_ChildId}&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function getMoneyReqInfo(inv_Id){
    const url = `${baseUrl}Kapi1.ashx?type=get_money_req_info&comp_id=${c_Id}&inv_id=${inv_Id}`
    return await fetchDataByUrl(url)
}
async function getOTP(inv_Id, otpType){
    const url = `${baseUrl}emp_com.ashx?cmd=brinvphnotp01&comp_id=${c_Id}&invid=${inv_Id}&otptyp=${otpType}`
    return await fetchDataByUrl(url)
}
async function postMoneyReq(data){
    const url = `${baseUrl}Kapi1.ashx?type=post_mon_req&comp_id=${c_Id}&id=${data.id}&phn=${data.phn}&email=${data.email}&amo=${data.amo}&purpose=${data.purpose}&mode=${data.mode}&note=${data.note}&bkash_no=${data.bkash_no}`
    return await fetchDataByUrl(url)
}
async function getMoneyReqStatus (inv_Id){
    const url = `${baseUrl}kapi1.ashx?type=get_mon_req_st&inv_id=${inv_Id}&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function deleteMoneyReq (atn){
    const url = `${baseUrl}japi.ashx?type=post_ReqDelete&comp_id=${c_Id}&atn=${atn}`
    return await fetchDataByUrl(url)
}
async function getMrPrintFile (mr){
    const url = `${baseUrl}kapi1.ashx?type=mr_print_file&mr=${mr}`
    return await fetchDataByUrl(url)
}
async function getAllChildIdList (inv_Id){
    const url = `${baseUrl}japi.ashx?type=get_cIDFund_Main&comp_id=${c_Id}&inv_id=${inv_Id}`
    return await fetchDataByUrl(url)
}
async function postFundTransToMothereIDMain(formData, inv_Id){
    const userIp = await getUserIP()
    formData.append('ip_addr', userIp.ip);
    
    const url = `${baseUrl}japi.ashx?type=post_FundTrToMID_Main&comp_id=${c_Id}&inv_id=${inv_Id}`
    return await fetchDataByUrlAndFormData(url, formData)
}
async function getInvInfo (inv_Id){
    const url = `${baseUrl}kapi1.ashx?type=get_inv_info&comp_id=${c_Id}&inv_id=${inv_Id}`
    return await fetchDataByUrl(url)
}
async function postBoInfoChangeRequest(formData){
    const url = `${baseUrl}kapi1.ashx?type=bo_info_change_request&comp_id=${c_Id}`
    return await fetchDataByUrlAndFormData(url, formData)
}
async function getBoInfoChangeHistory (inv_Id){
    const url = `${baseUrl}japi.ashx?type=get_InfoChangeHistory&comp_id=${c_Id}&inv_id=${inv_Id}`
    return await fetchDataByUrl(url)
}
async function getBalance (inv_Id){
    const url = `${baseUrl}kapi1.ashx?type=get_led_bal&inv_id=${inv_Id}&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function poatTrsnsLedgerBalance (inv_Id, data){
    const url = `${baseUrl}japi.ashx?type=trans_led_bal&comp_id=${c_Id}&fmL=${data.fmL}&toL=${data.toL}&tbal=${data.tbal}&avbal=${data.avbal}&inv_id=${inv_Id}`
    return await fetchDataByUrl(url)
}
async function getInternalFundTransData (inv_Id){
    const url = `${baseUrl}japi.ashx?type=get_InternalFundTrData&comp_id=${c_Id}&inv_id=${inv_Id}`
    return await fetchDataByUrl(url)
}
async function getStockDetails (inv_Id, date_from, date_to, script){
    const url = `${baseUrl}kapi1.ashx?type=get_stk_inv_det&comp_id=${c_Id}&inv_id=${inv_Id}&scrip=${script}&sd=${date_from}&ed=${date_to}`
    return await fetchDataByUrl(url)
}
async function getClosePriceHistory (script){
    const url = `${baseUrl}kapi1.ashx?type=get_sc_clospr&comp_id=${c_Id}&ins_id=${script}`
    return await fetchDataByUrl(url)
}
async function getRefer01Data (inv_Id){
    const url = `${baseUrl}japi.ashx?type=get_Refer01Data&comp_id=${c_Id}&inv_id=${inv_Id}`
    return await fetchDataByUrl(url)
}
async function getRefer01Details (inv_Id, date_from, date_to){
    const url = `${baseUrl}japi.ashx?type=get_Refer01Details&comp_id=${c_Id}&inv_id=${inv_Id}&dtFrom=${date_from}&dtTo=${date_to}`
    return await fetchDataByUrl(url)
}
async function getScheduleOfCharges (){
    const url = `${baseUrl}kapi1.ashx?type=get_schedule_of_charge&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function getMoneyDepositData (){
    const url = `${baseUrl}kapi1.ashx?type=list01V1&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function getCountryCode (){
    const url = `${baseUrl}japi.ashx?type=get_CCode&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function postShareBankDetails(queryData){
    const userIp = await getUserIP()
    const url = `${baseUrl}japi.ashx?type=post_ShareBankDetails&inv_id=${queryData.inv_id}&comp_id=${c_Id}&share_to=${queryData.share_to}&bank=${queryData.bank}&ipAddr=${userIp.ip}&MobileNo=${queryData.MobileNo}&CCode=${queryData.CCode}&Email=${queryData.Email}`
    return await fetchDataByUrl(url)
}
async function getDepositHistory(inv_Id){
    const url = `${baseUrl}kapi1.ashx?type=mr_deposit_history&comp_id=${c_Id}&inv_id=${inv_Id}`
    return await fetchDataByUrl(url)
}
async function deleteMoneyDeposit(inv_Id,atn){
    const url = `${baseUrl}kapi1.ashx?type=mr_deposit_delete&inv_id=${inv_Id}&atn=${atn}&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function postBankDeposit(formData){
    formData.append('comp_id', c_Id);
    const url = `${baseUrl}kapi1.ashx?type=mr_depositV102`
    return await fetchDataByUrlAndFormData(url, formData)
}
async function getDigitalBranchFundStatus(inv_Id,date){
    const url = `${baseUrl}japi.ashx?type=get_DigitalBr_FundStatus&comp_id=${c_Id}&inv_id=${inv_Id}&start_date=${date}`
    return await fetchDataByUrl(url)
}
async function getDigitalBranchTrades(inv_Id, date_from, date_to){
    const url = `${baseUrl}japi.ashx?type=get_DigitalBr_TotTrade&comp_id=${c_Id}&inv_id=${inv_Id}&start_date=${date_from}&end_date=${date_to}`
    return await fetchDataByUrl(url)
}
async function getDigitalBranchFundInOut(inv_Id, date_from, date_to){
    const url = `${baseUrl}japi.ashx?type=get_DigitalBr_Fund&comp_id=${c_Id}&inv_id=${inv_Id}&start_date=${date_from}&end_date=${date_to}`
    return await fetchDataByUrl(url)
}
async function getDigitalBranchTotClients(inv_Id, date_from, date_to){
    const url = `${baseUrl}japi.ashx?type=get_DigitalBr_TotClient&comp_id=${c_Id}&inv_id=${inv_Id}&start_date=${date_from}&end_date=${date_to}`
    return await fetchDataByUrl(url)
}
async function getDigitalBranchTradedClients(inv_Id, date_from, date_to){
    const url = `${baseUrl}japi.ashx?type=get_DigitalBr_TradedClient&comp_id=${c_Id}&inv_id=${inv_Id}&start_date=${date_from}&end_date=${date_to}`
    return await fetchDataByUrl(url)
}
async function getDigitalBranchLoggedInClients(inv_Id, date_from, date_to){
    const url = `${baseUrl}japi.ashx?type=get_DigitalBr_LoggedIn&comp_id=${c_Id}&inv_id=${inv_Id}&start_date=${date_from}&end_date=${date_to}`
    return await fetchDataByUrl(url)
} 
async function getDigitalBranchWithBO(inv_Id, date_from, date_to){
    const url = `${baseUrl}japi.ashx?type=get_DigitalBr_DetailsBO&comp_id=${c_Id}&inv_id=${inv_Id}&start_date=${date_from}&end_date=${date_to}`
    return await fetchDataByUrl(url)
}
async function getDigitalBranchWithoutBO(inv_Id, date_from, date_to){
    const url = `${baseUrl}japi.ashx?type=get_DigitalBr_DetailsWithoutBO&comp_id=${c_Id}&inv_id=${inv_Id}&start_date=${date_from}&end_date=${date_to}`
    return await fetchDataByUrl(url)
}
async function getPayUsList(){
    const url = `${baseUrl}Kapi1.ashx?type=get_pay_us_list&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function getPromotions(){
    const url = `${baseUrl}Kapi1.ashx?type=get_promotion&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function getBoStatus(inv_Id){
    const url = `${baseUrl}kapi1.ashx?type=get_bo_status&comp_id=${c_Id}&inv_id=${inv_Id}`
    return await fetchDataByUrl(url)
}
async function getGeneralNotification(){
    const url = `${baseUrl}japi.ashx?type=get_gen_noti&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function getCareer(){
    const url = `${baseUrl}japi.ashx?type=get_career&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function postCareer(formData){
    const url = `${baseUrl}japi.ashx?type=post_career&comp_id=${c_Id}`
    return await fetchDataByUrlAndFormData(url, formData)
}
async function getCreateNewIDData(){
    const url = `${baseUrl}japi.ashx?type=get_CreateNewIDData&comp_id=${c_Id}`
    return await fetchDataByUrl(url)
}
async function getStateCity(countryName){
    const url = `${baseUrl}kapi1.ashx?type=get_state_city&comp_id=${c_Id}&country=${countryName}`
    return await fetchDataByUrl(url)
}
async function createNew01ID(data){
    const userIp = await getUserIP()
    const url = `${baseUrl}japi.ashx?type=post_CreateNewID&comp_id=${c_Id}&inv_Name=${data.inv_Name}&inv_Phone=${data.inv_Phone}&inv_Email=${data.inv_Email}&inv_Country=${data.inv_Country}&inv_City=${data.inv_City}&inv_CCode=${data.inv_CCode}&howto_findus=${data.howto_findus}&inv_occupation=${data.inv_occupation}&reff_id=${data.reff_id}&inv_IP=${userIp.ip}`
   
    return await fetchDataByUrl(url)
}
async function postOnlinePay01(data){
    const url = `${baseUrl}kapi1.ashx?type=onlinePay01&comp_id=${c_Id}&cid=115&name=${data.name}&mobile=${data.mobile}&email=${data.email}&amount=${data.amount}&mrType=${data.mrType}&payType=${data.payType}&ret=${data.ret}`
    return await fetchDataByUrl(url)
}
async function postOtherPay01(data){
    const url = `${baseUrl}kapi1.ashx?type=otherPay01V1&comp_id=${c_Id}&cid=115&name=${data.name}&mobile=${data.mobile}&email=${data.email}&amount=${data.amount}&mrType=${data.mrType}&payType=${data.payType}&ret=${data.ret}`
    return await fetchDataByUrl(url)
}
async function postStatus01(cid, inv_Id, trnid){
    const url = `${baseUrl}kapi1.ashx?type=status01&comp_id=${c_Id}&cid=${cid}&InvId=${inv_Id}&trnid=${trnid}`
    console.log(url)
    return await fetchDataByUrl(url)
}
async function postPassChange(data){
    const url = `${baseUrl}japi.ashx?type=post_PassChange&comp_id=${c_Id}&inv_id=${data.inv_id}&oldPass=${data.oldPass}&newPass=${data.newPass}`
    return await fetchDataByUrl(url)
}
async function Post_LOGIN_(data){
    const url = `https://berichbd.com/matrix/matrix.aspx?`
    const method = 'POST'
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const bodyData = JSON.stringify(data);
    return await fetchDataByMethodUrlBodyDataAndHeader(url, method, headers, bodyData)
}
async function get_TICKPRICE_(data){
    const url = `https://berichbd.com/matrix/matrix.aspx?CMND=_TICKPRICE_`
    const method = 'GET'
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("authid", JSON.parse(sessionStorage.getItem('userData')).authid);
    const bodyData = JSON.stringify(data);
    return await fetchDataByMethodUrlBodyDataAndHeader(url, method, headers, bodyData)
}
async function get_THOUR_(data){
    const url = `https://berichbd.com/matrix/matrix.aspx?CMND=_THOUR_`
    const method = 'GET'
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const bodyData = JSON.stringify(data);
    return await fetchDataByMethodUrlBodyDataAndHeader(url, method, headers, bodyData)
}
async function get_SCRIPNEWS_(data){
    const url = `https://berichbd.com/matrix/matrix.aspx?CMND=_SCRIPNEWS_&scrip=${data}`
    return await fetchDataByUrl(url)
}
async function get_HALTED_(data){
    const url = `https://berichbd.com/matrix/matrix.aspx?CMND=_HALTED_`
    const method = 'GET'
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("authid", JSON.parse(sessionStorage.getItem('userData')).authid);
    const bodyData = JSON.stringify(data);
    return await fetchDataByMethodUrlBodyDataAndHeader(url, method, headers, bodyData)
}
async function get_SCRIPDIV_(script,data){
    const url = `https://berichbd.com/matrix/matrix.aspx?scrip=${script}&CMND=_SCRIPDIV_`
    const method = 'GET'
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("authid", JSON.parse(sessionStorage.getItem('userData')).authid);
    const bodyData = JSON.stringify(data);
    return await fetchDataByMethodUrlBodyDataAndHeader(url, method, headers, bodyData)
}
async function get_OFFER_(script,data){
    const url = `https://berichbd.com/matrix/matrix.aspx?CMND=_OFFER_&scrip=${script}`
    const method = 'GET'
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("authid", JSON.parse(sessionStorage.getItem('userData')).authid);
    const bodyData = JSON.stringify(data);
    return await fetchDataByMethodUrlBodyDataAndHeader(url, method, headers, bodyData)
}
async function get_OFFERD_(script,data){
    const url = `https://berichbd.com/matrix/matrix.aspx?CMND=_OFFERD_&scrip=${script}`
    const method = 'GET'
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("authid", JSON.parse(sessionStorage.getItem('userData')).authid);
    const bodyData = JSON.stringify(data);
    return await fetchDataByMethodUrlBodyDataAndHeader(url, method, headers, bodyData)
}
async function get_SCRIPINFO_(script,data){
    const url = `https://berichbd.com/matrix/matrix.aspx?CMND=_SCRIPINFO_&scrip=${script}`
    const method = 'GET'
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("authid", JSON.parse(sessionStorage.getItem('userData')).authid);
    const bodyData = JSON.stringify(data);
    return await fetchDataByMethodUrlBodyDataAndHeader(url, method, headers, bodyData)
}
async function get_CLIENTDET_(data){
    const url = `https://berichbd.com/matrix/matrix.aspx?CMND=_CLIENTDET_`
    const method = 'GET'
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("authid", JSON.parse(sessionStorage.getItem('userData')).authid);
    const bodyData = JSON.stringify(data);
    return await fetchDataByMethodUrlBodyDataAndHeader(url, method, headers, bodyData)
}
async function get_TOPLIST_(data){
    const url = `https://www.berichbd.com/matrix/matrix.aspx?CMND=_TOPLIST_&exch=CSE/DSE`
    const method = 'GET'
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("authid", JSON.parse(sessionStorage.getItem('userData')).authid);
    const bodyData = JSON.stringify(data);
    return await fetchDataByMethodUrlBodyDataAndHeader(url, method, headers, bodyData)
}
async function get_TICKER_CSE(data){
    const url = `https://www.berichbd.com/matrix/matrix.aspx?CMND=_TICKER_&exch=CSE`
    const method = 'GET'
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("authid", JSON.parse(sessionStorage.getItem('userData')).authid);
    const bodyData = JSON.stringify(data);
    return await fetchDataByMethodUrlBodyDataAndHeader(url, method, headers, bodyData)
}
async function get_TICKER_DSE(data){
    const url = `https://www.berichbd.com/matrix/matrix.aspx?CMND=_TICKER_&exch=CSE`
    const method = 'GET'
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("authid", JSON.parse(sessionStorage.getItem('userData')).authid);
    const bodyData = JSON.stringify(data);
    return await fetchDataByMethodUrlBodyDataAndHeader(url, method, headers, bodyData)
}
async function Post_BUYSELL_(data){
    const url = `https://berichbd.com/matrix/matrix.aspx`
    const method = 'POST'
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("authid", JSON.parse(sessionStorage.getItem('userData')).authid);
    const bodyData = JSON.stringify(data);
    return await fetchDataByMethodUrlBodyDataAndHeader(url, method, headers, bodyData)
}
async function postOrder_CANCEL_(data){
    const url = `https://berichbd.com/matrix/matrix.aspx`
    const method = 'POST'
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("authid", JSON.parse(sessionStorage.getItem('userData')).authid);
    const bodyData = JSON.stringify(data);
    return await fetchDataByMethodUrlBodyDataAndHeader(url, method, headers, bodyData)
}
async function Post_MODIFY_(data){
    const url = `https://berichbd.com/matrix/matrix.aspx`
    const method = 'POST'
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("authid", JSON.parse(sessionStorage.getItem('userData')).authid);
    const bodyData = JSON.stringify(data);
    return await fetchDataByMethodUrlBodyDataAndHeader(url, method, headers, bodyData)
}