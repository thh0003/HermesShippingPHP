function hsSetUI(caller, page, tab="CUSTOMER", sort=null, search=""){
    var setUI = {};
    if (tab == "CUSTOMER"){
        setUI = {"HS_PAGE":page, "HS_CURSOR":0, "HS_CUST_SEARCH":search, "HS_CUST_SORT":sort };
    } else if (tab == "ADDRESS"){
        setUI = {"HS_APAGE":page, "HS_ACURSOR":0, "HS_ADR_SEARCH":search, "HS_ADR_SORT":sort };
    } else if (tab == "PACKAGE"){
        setUI = {"HS_PPAGE":page, "HS_PCURSOR":0, "HS_PAK_SEARCH":search, "HS_PAK_SORT":sort };
    } else if (tab == "PAYMENT"){
        setUI = {"HS_PMPAGE":page, "HS_PMCURSOR":0, "HS_PAY_SEARCH":search, "HS_PAY_SORT":sort };
    } else if (tab == "SHIPMENT"){
        setUI = {"HS_SPAGE":page, "HS_SCURSOR":0, "HS_SHIP_SEARCH":search, "HS_SHIP_SORT":sort };
    }


    

    if (document.getElementById("CustSearch").value != search){
        setUI["HS_CUST_SEARCH"] = document.getElementById("CustSearch").value;
    }

    if (typeof hsDD !== "undefined"){
        if (tab == "CUSTOMER"){
            if (page == "INIT"){
                setUI["HS_CURSOR"] = 0;
                setUI["HS_PAGE"] = null;
            } else if(page == "<"){
                setUI["HS_CURSOR"] = hsDD.HS_CUSTOMERLIST.cursor - 10;
            } else {
                setUI["HS_CURSOR"] = hsDD.HS_CUSTOMERLIST.cursor;
            }

            if (caller == "CREATE" || caller == "UPDATE" || caller == "DELETE"){
                setUI["HS_CURSOR"] = hsDD.HS_CURSOR - 5; 
            }

            if(hsDD.HS_CUST_SEARCH == "" && search != ""){
                setUI["HS_CURSOR"] = 0;
            }

            if(sort){
                if(hsDD.HS_CUST_SORT != sort){
                    setUI["HS_CURSOR"] = 0;
                }
            } else {
                setUI["HS_CUST_SORT"] = hsDD.HS_CUST_SORT;
            }
        } else if(tab == "ADDRESS" ){
            if (page == "INIT"){
                setUI["HS_ACURSOR"] = 0;
                setUI["HS_APAGE"] = null;
            } else if(page == "<"){
                setUI["HS_ACURSOR"] = hsDD.HS_ADDRESSLIST.cursor - 10;
            } else {
                setUI["HS_ACURSOR"] = hsDD.HS_ADDRESSLIST.cursor;
            }

            if (caller == "CREATE" || caller == "UPDATE" || caller == "DELETE"){
                setUI["HS_ACURSOR"] = hsDD.HS_ACURSOR - 5; 
            }

            if(hsDD.HS_ADR_SEARCH == "" && search != ""){
                setUI["HS_ACURSOR"] = 0;
            }

            if(sort){
                if(hsDD.HS_ADR_SORT != sort){
                    setUI["HS_ACURSOR"] = 0;
                }
            } else {
                setUI["HS_ADR_SORT"] = hsDD.HS_ADR_SORT;
            }            
        } else if(tab == "PACKAGE" ){
            if (page == "INIT"){
                setUI["HS_PCURSOR"] = 0;
                setUI["HS_PPAGE"] = null;
            } else if(page == "<"){
                setUI["HS_PCURSOR"] = hsDD.HS_PACKAGELIST.cursor - 10;
            } else {
                setUI["HS_PCURSOR"] = hsDD.HS_PACKAGELIST.cursor;
            }

            if (caller == "CREATE" || caller == "UPDATE" || caller == "DELETE"){
                setUI["HS_PCURSOR"] = hsDD.HS_PCURSOR - 5; 
            }

            if(hsDD.HS_PAK_SEARCH == "" && search != ""){
                setUI["HS_PCURSOR"] = 0;
            }

            if(sort){
                if(hsDD.HS_PAK_SORT != sort){
                    setUI["HS_PCURSOR"] = 0;
                }
            } else {
                setUI["HS_PAK_SORT"] = hsDD.HS_PAK_SORT;
            }            
        } else if(tab == "PAYMENT" ){
            if (page == "INIT"){
                setUI["HS_PMCURSOR"] = 0;
                setUI["HS_PMPAGE"] = null;
            } else if(page == "<"){
                setUI["HS_PMCURSOR"] = hsDD.HS_PAYMENTLIST.cursor - 10;
            } else {
                setUI["HS_PMCURSOR"] = hsDD.HS_PAYMENTLIST.cursor;
            }

            if (caller == "CREATE" || caller == "UPDATE" || caller == "DELETE"){
                setUI["HS_PMCURSOR"] = hsDD.HS_PMCURSOR - 5; 
            }

            if(hsDD.HS_PAY_SEARCH == "" && search != ""){
                setUI["HS_PMCURSOR"] = 0;
            }

            if(sort){
                if(hsDD.HS_PAY_SORT != sort){
                    setUI["HS_PMCURSOR"] = 0;
                }
            } else {
                setUI["HS_PAY_SORT"] = hsDD.HS_PAY_SORT;
            }            
        } else if(tab == "SHIPMENT" ){
            if (page == "INIT"){
                setUI["HS_SCURSOR"] = 0;
                setUI["HS_SPAGE"] = null;
            } else if(page == "<"){
                setUI["HS_SCURSOR"] = hsDD.HS_PAYMENTLIST.cursor - 10;
            } else {
                setUI["HS_SCURSOR"] = hsDD.HS_PAYMENTLIST.cursor;
            }

            if (caller == "CREATE" || caller == "UPDATE" || caller == "DELETE"){
                setUI["HS_SCURSOR"] = hsDD.HS_PMCURSOR - 5; 
            }

            if(hsDD.HS_PAY_SEARCH == "" && search != ""){
                setUI["HS_SCURSOR"] = 0;
            }

            if(sort){
                if(hsDD.HS_PAY_SORT != sort){
                    setUI["HS_SCURSOR"] = 0;
                }
            } else {
                setUI["HS_PAY_SORT"] = hsDD.HS_PAY_SORT;
            }            
        }
         if (isHS_DEBUG(hsDD.DEBUG)){
            console.log("SETUI: "+ JSON.stringify(setUI));	
        }
    
    }else{
        setUI["HS_CURSOR"] = 0;
        setUI["HS_PAGE"] = null;
    }

    return setUI;
}
