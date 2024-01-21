function executeCompanyInfo(){
    function companyInfo(){
        document.getElementById('mainContentSection').innerHTML =`
            <div class="pageHeading" id="financial-Heading">
                <div class="heading">
                    <h1>Company Info</h1>
                </div>
            </div>

            <div class="search-reload" id="search-reload">
                <input type="text" class="form-control" placeholder="Select Script" aria-label="Search" aria-describedby="searchIcon">                
                <div class="reload">
                    <img src="../images/icons/reload.png" alt="Reload">
                </div>
            </div>

            <div class="container">
                <div class='box basic_info' id='basic_info'>
                    <div class="heading_box">
                        <h5>Basic Information</h5>
                        <div class="drop-box">
                            <img onclick="show_details('basic-more','basic-up','basic-down')" id="basic-down" src="../images/icons/down-arrow.png" alt="Down Arrow">
                            <img onclick="hide_details('basic-up','basic-down')" id="basic-up" src="../images/icons/down-arrow.png" alt="Down UP">
                        </div>
                    </div>
                    <div class="box-more" id="basic-more"></div>
                </div>
            </div>

            <div class="container">
                <div class='box financial' id='financial'>
                    <div class="heading_box">
                        <h5>Financial Pereformance</h5>
                        <div class="drop-box">
                            <img onclick="show_details('finance-more','finance-up','finance-down')" id="finance-down" src="../images/icons/down-arrow.png" alt="Down Arrow">
                            <img onclick="hide_details('finance-up','finance-down')" id="finance-up" src="../images/icons/down-arrow.png" alt="Down UP">
                        </div>
                    </div>
                    <div class="box-more" id="finance-more"></div>
                </div>
            </div>

            <div class="container">
                <div class='box dividend' id='dividend'>
                    <div class="heading_box">
                        <h5>Dividend Record Date & AGM</h5>
                        <div class="drop-box">
                            <img onclick="show_details('dividend-more','dividend-up','dividend-down')" id="dividend-down" src="../images/icons/down-arrow.png" alt="Down Arrow">
                            <img onclick="hide_details('dividend-up','dividend-down')" id="dividend-up" src="../images/icons/down-arrow.png" alt="Down UP">
                        </div>
                    </div>
                    <div class="box-more" id="dividend-more"></div>
                </div>
            </div>

            <div class="container">
                <div class='box price_his' id='price_his'>
                    <div class="heading_box">
                        <h5>Closing Price History</h5>
                        <div class="drop-box">
                            <img onclick="show_details('priceHistory-more','price_his-up','price_his-down')" id="price_his-down" src="../images/icons/down-arrow.png" alt="Down Arrow">
                            <img onclick="hide_details('price_his-up','price_his-down')" id="price_his-up" src="../images/icons/down-arrow.png" alt="Down UP">
                        </div>
                    </div>
                    <div class="box-more" id="priceHistory-more"></div>
                </div>
            </div>

            <div class="container">
                <div class='box price_graph' id='price_grraph'>
                    <div class="heading_box">
                        <h5>Closing Price Graph</h5>
                        <div class="drop-box">
                            <img onclick="show_details('priceGraph-more','price_graph-up','price_graph-down')" id="price_graph-down" src="../images/icons/down-arrow.png" alt="Down Arrow">
                            <img onclick="hide_details('price_graph-up','price_graph-down')" id="price_graph-up" src="../images/icons/down-arrow.png" alt="Down UP">
                        </div>
                    </div>
                    <div class="box-more" id="priceGraph-more"></div>
                </div>
            </div>
            <br>  
            <br>  
            <br>  
            <br>  
            <br>  
            <br>  
            <br>  
        `
    }

    function basicInfo(){
        document.getElementById('basic-more').innerHTML = `
            <table class="table table-bordered">
                <tbody>
                    <tr>
                        <td>Paid-up Capital</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>No. of Issued Shares</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Category</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Sector</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Face Value</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Year End</td>
                        <td></td>
                    </tr>

                </tbody>
            </table>
        `
    }



    function dropDown(){
        document.getElementById('basic-down').style.display = 'none'
        document.getElementById('finance-down').style.display = 'none'
        document.getElementById('dividend-down').style.display = 'none'
        document.getElementById('price_his-down').style.display = 'none'
        document.getElementById('price_graph-down').style.display = 'none'
    }
    function hide_All_details(){
        document.getElementById('basic-more').style.display = 'none'
        document.getElementById('finance-more').style.display = 'none'
        document.getElementById('dividend-more').style.display = 'none'
        document.getElementById('priceHistory-more').style.display = 'none'
        document.getElementById('priceGraph-more').style.display = 'none'
    }
    


    companyInfo()
    dropDown()
    basicInfo()


    hide_All_details()
}

function show_details(id,up,down){
    document.getElementById('basic-more').style.display = 'none'
    document.getElementById('finance-more').style.display = 'none'
    document.getElementById('dividend-more').style.display = 'none'
    document.getElementById('priceHistory-more').style.display = 'none'
    document.getElementById('priceGraph-more').style.display = 'none'

    document.getElementById(id).style.display = 'block'

    document.getElementById('basic-up').style.display = 'none'
    document.getElementById('finance-up').style.display = 'none'
    document.getElementById('dividend-up').style.display = 'none'
    document.getElementById('price_his-up').style.display = 'none'
    document.getElementById('price_graph-up').style.display = 'none'

    document.getElementById('basic-down').style.display = 'block'
    document.getElementById('finance-down').style.display = 'block'
    document.getElementById('dividend-down').style.display = 'block'
    document.getElementById('price_his-down').style.display = 'block'
    document.getElementById('price_graph-down').style.display = 'block'

    
    document.getElementById(up).style.display = 'none'

    document.getElementById(down).style.display = 'block'
}
function hide_details(up,down){
    document.getElementById('basic-more').style.display = 'none'
    document.getElementById('finance-more').style.display = 'none'
    document.getElementById('dividend-more').style.display = 'none'
    document.getElementById('priceHistory-more').style.display = 'none'
    document.getElementById('priceGraph-more').style.display = 'none'

    document.getElementById(up).style.display = 'block'
    document.getElementById(down).style.display = 'none'
}