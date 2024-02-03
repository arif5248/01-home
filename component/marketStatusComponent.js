function market(){
    document.getElementById('mainContentSection').innerHTML = 
    `
        <div class="marketMainSection" id="marketMainSection">
        <div class="cseSection" id="cseSection">
            <div class="container">
                <div class="table-responsive">
                    <table class="table customTable table-bordered">
                        <tr>
                            <th rowspan="6" class="verticaclAlign">
                                <div class="cse_logo">
                                    <img src="../images/cse_logo.jpg" alt="Chittagong Stock Exchange">
                                </div>
                            </th>
                            <th colspan="2">Today-03/jan/2024</th>
                        </tr>
                        <tr>
                            <td ><div class="dataBox">
                                    <div class="data">18486</div>
                                    <div class="data">0 <br> <span>.00%</span></div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">BDT 65340716</td>
                        </tr>
                        <tr>
                            <th colspan="2">Yesterday-02/jan/2024</th>
                        </tr>
                        <tr>
                            <td ><div class="dataBox">
                                    <div class="data">18486</div>
                                    <div class="data">0 <br> <span>.00%</span></div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">BDT 65340716</td>
                        </tr>
                    </table>
                </div>
            </div>
            
            
        </div>

        <div class="dseSection">
            <div class="container">
                <div class="table-responsive">
                    <table class="table customTable table-bordered">
                        <tr>
                            <th rowspan="6" class="verticaclAlign">
                                <div class="cse_logo">
                                    <img src="../images/dse_logo.jpg" alt="Chittagong Stock Exchange">
                                </div>
                            </th>
                            <th colspan="2">Today-03/jan/2024</th>
                        </tr>
                        <tr>
                            <td >
                                <div class="dataBox">
                                    <div class="data">18486</div>
                                    <div class="data">0 <br> <span>.00%</span></div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">BDT 65340716</td>
                        </tr>
                        <tr>
                            <th colspan="2">Yesterday-02/jan/2024</th>
                        </tr>
                        <tr>
                            <td >
                                <div class="dataBox">
                                    <div class="data">18486</div>
                                    <div class="data">0 <br> <span>.00%</span></div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">BDT 65340716</td>
                        </tr>
                    </table>
                </div>
            </div>  
        </div>

        <div class="button_search_section">
            <div class="container">
                <div class="buttonRow">
                    <div class="allButton">
                        <button type="button" class="btn allBtn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Select type
                        </button>
                        <button type="button" class="btn allBtn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Select Sector
                        </button>
                        <button type="button" class="btn allBtn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Select Sort
                        </button>
                    </div>
                </div>
            </div>

            <div class="container">
                <div class="searchBox">
                    <!-- <span>
                            <img src="../images//icons/magnifying-glass.png" alt="search icon">
                        </span>
                    <input type="text"> -->
                        <div class="input-group">
                            <div class="input-group-append">
                                <span class="input-group-text" id="searchIcon">
                                    <img src="../images//icons/magnifying-glass.png" alt="search icon">
                                </span>
                            </div>
                            <input type="text" class="form-control" placeholder="Search" aria-label="Search" aria-describedby="searchIcon">
                            <div class="reload">
                                <img src="../images/icons/reload.png" alt="Reload">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="companyDataSection">
                <div class="container">
                    <div class="table-wrapper">
                        <table class="table comapnyTable table-bordered">
                            <thead class="tblHeader">
                                <tr>
                                    <th>Company</th>
                                    <th>LTP</th>
                                    <th>YCP</th>
                                    <th>+/-</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1JANATAMF</td><td>6.20</td><td>6.20</td><td>0.00</td>
                                </tr>
                                <tr>
                                    <td>1JANATAMF</td><td>6.20</td><td>6.20</td><td>0.00</td>
                                </tr>
                                <tr>
                                    <td>1JANATAMF</td><td>6.20</td><td>6.20</td><td>0.00</td>
                                </tr>
                                <tr>
                                    <td>1JANATAMF</td><td>6.20</td><td>6.20</td><td>0.00</td>
                                </tr>
                                <tr>
                                    <td>1JANATAMF</td><td>6.20</td><td>6.20</td><td>0.00</td>
                                </tr>
                                <tr>
                                    <td>1JANATAMF</td><td>6.20</td><td>6.20</td><td>0.00</td>
                                </tr>
                                <tr>
                                    <td>1JANATAMF</td><td>6.20</td><td>6.20</td><td>0.00</td>
                                </tr>
                                <tr>
                                    <td>1JANATAMF</td><td>6.20</td><td>6.20</td><td>0.00</td>
                                </tr>
                                <tr>
                                    <td>1JANATAMF</td><td>6.20</td><td>6.20</td><td>0.00</td>
                                </tr>
                                <tr>
                                    <td>1JANATAMF</td><td>6.20</td><td>6.20</td><td>0.00</td>
                                </tr>
                                <tr>
                                    <td>1JANATAMF</td><td>6.20</td><td>6.20</td><td>0.00</td>
                                </tr>
                                <tr>
                                    <td>1JANATAMF</td><td>6.20</td><td>6.20</td><td>0.00</td>
                                </tr>
                                <tr>
                                    <td>1JANATAMF</td><td>6.20</td><td>6.20</td><td>0.00</td>
                                </tr>
                                <tr>
                                    <td>1JANATAMF</td><td>6.20</td><td>6.20</td><td>0.00</td>
                                </tr>
                                <tr>
                                    <td>1JANATAMF</td><td>6.20</td><td>6.20</td><td>0.00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    
    `
}





function executeMarket(){
    market()
}