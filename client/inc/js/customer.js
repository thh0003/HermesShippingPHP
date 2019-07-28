function hsCopyCustomer(cust) {
    for (custData in hsDD.HS_CUSTOMERLIST.customers[cust]){
        if (custData !='Useridentifier' && custData !='Active'){
            document.getElementById(custData+"_new").value = hsDD.HS_CUSTOMERLIST.customers[cust][custData];
        }
    }
}

function hsShipmentsCustomer(cust){
    var custID = document.getElementById("Useridentifier_"+cust).innerHTML
    var page = "INIT";
    $('.nav-tabs a[href="#shipment"]').tab('show')
    hsLookupCustomer(custID).then( function(data){
        hsPAYCUSTHTML = "<table class='table table-striped table-hover'><thead><form><tr>";
        hsPAYCUSTHTML = hsPAYCUSTHTML + "<td scope='col' class='d-none' id='PAY_Useridentifier_"+cust+"'>"+data.HS_LOOKUP_CUST["Useridentifier"]+"</td>"+
                                        "<td scope='col' class='border border-primary' id='PAY_First Name_"+cust+"'><h4 class='danger'>Customer: "+data.HS_LOOKUP_CUST["First Name"]+" "+data.HS_LOOKUP_CUST["Last Name"]+"</h4></td>"+
                                        "</form></tbody></table>";


        document.getElementById("hs-data-custship").innerHTML = hsPAYCUSTHTML;
    });

    hsListShipment(custID, page, null, "");
}

function hsPaymentCustomer(cust){
    var custID = document.getElementById("Useridentifier_"+cust).innerHTML
    var page = "INIT";
    $('.nav-tabs a[href="#payment"]').tab('show')
    hsLookupCustomer(custID).then( function(data){
        hsPAYCUSTHTML = "<table class='table table-striped table-hover'><thead><form><tr>";
        hsPAYCUSTHTML = hsPAYCUSTHTML + "<td scope='col' class='d-none' id='PAY_Useridentifier_"+cust+"'>"+data.HS_LOOKUP_CUST["Useridentifier"]+"</td>"+
                                        "<td scope='col' class='border border-primary' id='PAY_First Name_"+cust+"'><h4 class='danger'>Customer: "+data.HS_LOOKUP_CUST["First Name"]+" "+data.HS_LOOKUP_CUST["Last Name"]+"</h4></td>"+
                                        "</form></tbody></table>";


        document.getElementById("hs-data-custpay").innerHTML = hsPAYCUSTHTML;
    });

    hsListPayment(custID, page, null, "");
}

function hsPackagesCustomer(cust){
    var custID = document.getElementById("Useridentifier_"+cust).innerHTML
    var page = "INIT";
    $('.nav-tabs a[href="#package"]').tab('show')
    hsLookupCustomer(custID).then( function(data){
        hsPAKCUSTHTML = "<table class='table table-striped table-hover'><thead><form><tr>";
        hsPAKCUSTHTML = hsPAKCUSTHTML + "<td scope='col' class='d-none' id='PAK_Useridentifier_"+cust+"'>"+data.HS_LOOKUP_CUST["Useridentifier"]+"</td>"+
                                        "<td scope='col' class='border border-primary' id='PAK_First Name_"+cust+"'><h4 class='danger'>Customer: "+data.HS_LOOKUP_CUST["First Name"]+" "+data.HS_LOOKUP_CUST["Last Name"]+"</h4></td>"+
                                        "</form></tbody></table>";


        document.getElementById("hs-data-custpak").innerHTML = hsPAKCUSTHTML;
    });

    hsListPackage(custID, page, null, "");
}



function hsAddressesCustomer(cust){
    var xmlhttp_1 = new XMLHttpRequest();
    var hsADRCUST = {};
    var custID = document.getElementById("Useridentifier_"+cust).innerHTML
    var page = "INIT";
//    var setUI = hsSetUI("LOAD", page, "ADDRESS");
 //   var obj_1 = { "HS_ACTION":"LOAD", "HS_OBJECT":"ADDRESS", "HS_COMMIT": document.getElementById("hsCommit").checked, "HS_APAGE":setUI["HS_APAGE"], "HS_ACURSOR":setUI["HS_ACURSOR"], "HS_ADR_SEARCH":setUI["HS_ADR_SEARCH"], "HS_ADR_SORT":setUI["HS_ADR_SORT"] };    
    $('.nav-tabs a[href="#address"]').tab('show')
    hsLookupCustomer(custID).then( function(data){
        hsADRCUSTHTML = "<table class='table table-striped table-hover'><thead><form><tr>";
        hsADRCUSTHTML = hsADRCUSTHTML + "<td scope='col' class='d-none' id='ADR_Useridentifier_"+cust+"'>"+data.HS_LOOKUP_CUST["Useridentifier"]+"</td>"+
                                        "<td scope='col' class='border border-primary' id='ADR_First Name_"+cust+"'><h4 class='danger'>Customer: "+data.HS_LOOKUP_CUST["First Name"]+" "+data.HS_LOOKUP_CUST["Last Name"]+"</h4></td>"+
                                        "</form></tbody></table>";


        document.getElementById("hs-data-custaddress").innerHTML = hsADRCUSTHTML;
    });

    hsListAddress(custID, page, null, "");
}

function hsLookupCustomer(id){
    return new Promise(function(resolve, reject) {
        // Do the usual XHR stuff
        var xmlhttp_1 = new XMLHttpRequest();
        var obj_1 = { "HS_ACTION":"LOOKUP", "HS_OBJECT":"CUSTOMER", "HS_LOOKUPID":id };    
        var dbParam_1 = JSON.stringify(obj_1);

        xmlhttp_1.open('POST', "https://www.pgesoftware.com/hermes/server/index.php", true);
        xmlhttp_1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
        xmlhttp_1.onload = function() {
            
          // This is called even on 404 etc
          // so check the status
          if (xmlhttp_1.status == 200) {
            // Resolve the promise with the response text
            
            if (isHS_DEBUG(hsDD.DEBUG)){
                console.log("JSON RESPONSE: "+ JSON.parse(this.responseText));
            }

            resolve(JSON.parse(this.responseText));
          }
          else {
            // Otherwise reject with the status text
            // which will hopefully be a meaningful error
            reject(Error(xmlhttp_1.statusText));
          }
        };
    
        // Handle network errors
        xmlhttp_1.onerror = function() {
          reject(Error("Network Error"));
        };
    
        // Make the request
        xmlhttp_1.send("x=" + dbParam_1);

        // close the connection
//        xmlhttp_1.close;
      });
    
}

function hsCreateCustomer(page){
    var xmlhttp_1 = new XMLHttpRequest();
    var customer = {};
    var setUI = hsSetUI("CREATE", page, "CUSTOMER");
    var obj_1 = { "HS_ACTION":"CREATE", "HS_OBJECT":"CUSTOMER", "HS_COMMIT": document.getElementById("hsCommit").checked, "HS_PAGE":setUI["HS_PAGE"], "HS_CURSOR":setUI["HS_CURSOR"], "HS_CUST_SEARCH":setUI["HS_CUST_SEARCH"], "HS_CUST_SORT":setUI["HS_CUST_SORT"] };

    for(var custCol=0; custCol < hsDD.HS_CUSTOMERLIST.customerColumns.length;custCol++){
        if (custCol != 0 && custCol != hsDD.HS_CUSTOMERLIST.customerColumns.length-1){
            console.log("field name: "+hsDD.HS_CUSTOMERLIST.customerColumns[custCol] + " input form value: " + document.getElementById(hsDD.HS_CUSTOMERLIST.customerColumns[custCol]).value);
            customer[hsDD.HS_CUSTOMERLIST.customerColumns[custCol]] = document.getElementById(hsDD.HS_CUSTOMERLIST.customerColumns[custCol]+"_new").value;
        }
    }
    obj_1["HS_CUSTOMER"] = customer;
    var dbParam_1 = JSON.stringify(obj_1);
    console.log(dbParam_1);
    document.getElementById("HS_JSON_SENT1").innerHTML = "JSON SENT1: dbParam: "+ dbParam_1;
    
    xmlhttp_1.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            hsDD = JSON.parse(this.responseText);
            if (isHS_DEBUG(hsDD.DEBUG)){
                console.log("JSON RESPONSE: "+ hsDD);
            }
            document.getElementById("hsStatus").innerHTML = "Mutation Status: "+ hsDD.HS_NEWCUSTOMER;
        }
        if (isHS_DEBUG(hsDD.DEBUG)){
                document.getElementById("HS_ERR1").innerHTML = "HS_ERR1: E1: "+hsDD.HS_ERR1;	
                document.getElementById("HS_JSON_RECEIVED1").innerHTML = "JSON RECEIVED1: "+ this.responseText;	
        }
    };
        
        
    xmlhttp_1.open("POST", "https://www.pgesoftware.com/hermes/server/index.php", true);
    xmlhttp_1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp_1.send("x=" + dbParam_1);
    xmlhttp_1.close;


}

function hsUpdateCustomer(index){
    var xmlhttp_1 = new XMLHttpRequest();
    var customer = {}
    page = null;
    var setUI = hsSetUI("UPDATE", page, "CUSTOMER");
    var obj_1 = { "HS_ACTION":"UPDATE", "HS_OBJECT":"CUSTOMER", "HS_COMMIT": document.getElementById("hsCommit").checked, "HS_PAGE":setUI["HS_PAGE"], "HS_CURSOR":setUI["HS_CURSOR"], "HS_CUST_SEARCH":setUI["HS_CUST_SEARCH"], "HS_CUST_SORT":setUI["HS_CUST_SORT"] };

    for(var custCol=0; custCol < hsDD.HS_CUSTOMERLIST.customerColumns.length;custCol++){
        if (custCol != hsDD.HS_CUSTOMERLIST.customerColumns.length-1){
            if (hsDD.HS_CUSTOMERLIST.customerColumns[custCol]=='Useridentifier') {
                customer[hsDD.HS_CUSTOMERLIST.customerColumns[custCol]] = document.getElementById(hsDD.HS_CUSTOMERLIST.customerColumns[custCol]+"_"+index).innerHTML;
                if (isHS_DEBUG(hsDD.DEBUG)){
                    console.log("field name: "+hsDD.HS_CUSTOMERLIST.customerColumns[custCol] + " update form value: " + document.getElementById(hsDD.HS_CUSTOMERLIST.customerColumns[custCol]+"_"+index).innerHTML);
                }
            } else {
                customer[hsDD.HS_CUSTOMERLIST.customerColumns[custCol]] = document.getElementById(hsDD.HS_CUSTOMERLIST.customerColumns[custCol]+"_"+index).value;
                if (isHS_DEBUG(hsDD.DEBUG)){
                    console.log("field name: "+hsDD.HS_CUSTOMERLIST.customerColumns[custCol] + " update form value: " + document.getElementById(hsDD.HS_CUSTOMERLIST.customerColumns[custCol]+"_"+index).value);
                }
            }
        }
    }

    obj_1["HS_CUSTOMER"] = customer;
    var dbParam_1 = JSON.stringify(obj_1);
    console.log(dbParam_1);
    document.getElementById("HS_JSON_SENT1").innerHTML = "JSON SENT1: dbParam: "+ dbParam_1;
    
    xmlhttp_1.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            hsDD = JSON.parse(this.responseText);
            if (isHS_DEBUG(hsDD.DEBUG)){
                console.log("JSON RESPONSE: "+ hsDD);
            }
            document.getElementById("hsStatus").innerHTML = "Mutation Status: ROWS AFFECTED"+ hsDD.HS_ROWSAFFECTED;
        }
        if (isHS_DEBUG(hsDD.DEBUG)){
                document.getElementById("HS_ERR1").innerHTML = "HS_ERR1: E1: "+hsDD.HS_ERR1;	
                document.getElementById("HS_JSON_RECEIVED1").innerHTML = "JSON RECEIVED1: "+ this.responseText;	
        }
    };
        
        
    xmlhttp_1.open("POST", "https://www.pgesoftware.com/hermes/server/index.php", true);
    xmlhttp_1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp_1.send("x=" + dbParam_1);
    xmlhttp_1.close;


}

function hsDeleteCustomer(index){
    var xmlhttp_1 = new XMLHttpRequest();
    page = null;
    var setUI = hsSetUI("DELETE", page, "CUSTOMER");
    var obj_1 = { "HS_ACTION":"DELETE", "HS_OBJECT":"CUSTOMER", "HS_COMMIT": document.getElementById("hsCommit").checked, "HS_PAGE":setUI["HS_PAGE"], "HS_CURSOR":setUI["HS_CURSOR"], "HS_CUST_SEARCH":setUI["HS_CUST_SEARCH"], "HS_CUST_SORT":setUI["HS_CUST_SORT"], "HS_DELID":document.getElementById("Useridentifier_"+index).innerHTML };    

    var dbParam_1 = JSON.stringify(obj_1);
    console.log(dbParam_1);
    document.getElementById("HS_JSON_SENT1").innerHTML = "JSON SENT1: dbParam: "+ dbParam_1;
    
    xmlhttp_1.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            hsDD = JSON.parse(this.responseText);
            if (isHS_DEBUG(hsDD.DEBUG)){
                console.log("JSON RESPONSE: "+ hsDD);
            }
            document.getElementById("hsStatus").innerHTML = "Mutation Status: ROWS AFFECTED"+ hsDD.HS_ROWSAFFECTED;
        }
        if (isHS_DEBUG(hsDD.DEBUG)){
                document.getElementById("HS_ERR1").innerHTML = "HS_ERR1: E1: "+hsDD.HS_ERR1;	
                document.getElementById("HS_JSON_RECEIVED1").innerHTML = "JSON RECEIVED1: "+ this.responseText;	
        }
    };
        
        
    xmlhttp_1.open("POST", "https://www.pgesoftware.com/hermes/server/index.php", true);
    xmlhttp_1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp_1.send("x=" + dbParam_1);
    xmlhttp_1.close;


}

function hsListCustomers(page, sort=null, search=""){
    var xmlhttp_1 = new XMLHttpRequest();

    var setUI = hsSetUI("LIST", page, "CUSTOMER",sort, search);
    var obj_1 = { "HS_ACTION":"LOAD", "HS_OBJECT":"CUSTOMER", "HS_COMMIT": document.getElementById("hsCommit").checked, "HS_PAGE":setUI["HS_PAGE"], "HS_CURSOR":setUI["HS_CURSOR"], "HS_CUST_SEARCH":setUI["HS_CUST_SEARCH"], "HS_CUST_SORT":setUI["HS_CUST_SORT"] };

    var dbParam_1 = JSON.stringify(obj_1);
    console.log(dbParam_1);
    document.getElementById("HS_JSON_SENT1").innerHTML = "JSON SENT1: dbParam: "+ dbParam_1;
    
    xmlhttp_1.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            hsDD = JSON.parse(this.responseText);
            if (isHS_DEBUG(hsDD.DEBUG)){
                console.log("JSON RESPONSE: "+ hsDD);
            }

            customerList = "<table class='table table-striped table-hover'><thead><form><tr>";
            blankinput = "<tr class='table-info'><div class='btn-group btn-group-toggle' data-toggle='buttons'>";
            

            for(var custCol=0; custCol < hsDD.HS_CUSTOMERLIST.customerColumns.length;custCol++){
                
                if (custCol == 0 || custCol == hsDD.HS_CUSTOMERLIST.customerColumns.length-1){
                    customerList = customerList + "<th scope='col' class='d-none'>"+ hsDD.HS_CUSTOMERLIST.customerColumns[custCol] +"</th>";
                    blankinput = blankinput + 	"<td scope='col' class='d-none'></td>";

                } else if (custCol == sort){
                    customerList = customerList + '<th scope=\"col\" ><button onclick=\"hsListCustomers(\'SORT\', \''+ hsDD.HS_CUSTOMERLIST.customerColumns[custCol] +'\')\" class=\"btn btn-success form-control-sm\" type=\"button\" id=\"'+ hsDD.HS_CUSTOMERLIST.customerColumns[custCol] +'\" active>'+ hsDD.HS_CUSTOMERLIST.customerColumns[custCol] +'</button>';
                    blankinput = blankinput + 	"<td scope='col'><input type='text' class='form-control form-control-sm' placeholder='"+hsDD.HS_CUSTOMERLIST.customerColumns[custCol]+"' id='"+ hsDD.HS_CUSTOMERLIST.customerColumns[custCol] +"_new'></td>";
                } else {
                    customerList = customerList + '<th scope=\"col\" ><button onclick=\"hsListCustomers(\'SORT\', \''+ hsDD.HS_CUSTOMERLIST.customerColumns[custCol] +'\')\" class=\"btn btn-success form-control-sm\" type=\"button\" id=\"'+ hsDD.HS_CUSTOMERLIST.customerColumns[custCol] +'\">'+ hsDD.HS_CUSTOMERLIST.customerColumns[custCol] +'</button>';
                    blankinput = blankinput + 	"<td scope='col'><input type='text' class='form-control form-control-sm' placeholder='"+hsDD.HS_CUSTOMERLIST.customerColumns[custCol]+"' id='"+ hsDD.HS_CUSTOMERLIST.customerColumns[custCol] +"_new'></td>";
                }
            }
            blankinput = blankinput + "<td scope='col'><button class='btn btn-outline-secondary form-control-sm' type='button' id='Create' onclick='hsCreateCustomer()'>Create</button></td></tr>";
            customerList = customerList +"<th scoope='col'>Actions</th></tr></thead><tbody>";
            customerList = customerList + blankinput;

            for(var cust=0; cust < hsDD.HS_CUSTOMERLIST.customers.length;cust++){
                customerList = customerList + "<tr>"
                for (custData in hsDD.HS_CUSTOMERLIST.customers[cust]){
                    if (custData=='Useridentifier' || custData == "Active") {
                        customerList = customerList + "<td scope='col' class='d-none' id='"+custData+"_"+cust+"'>"+hsDD.HS_CUSTOMERLIST.customers[cust][custData]+"</td>";
                    }else{
                        customerList = customerList + "<td scope='col'><input type='text' class='form-control form-control-sm' id='"+custData+"_"+cust+"' value='"+hsDD.HS_CUSTOMERLIST.customers[cust][custData]+"'></td>";
                    }
                }
                customerList = customerList + "<td scope='col'><button class='btn btn-outline-secondary dropdown-toggle form-control-sm' id='action_"+cust+"' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Actions</button>"+
                                              "<div class='dropdown-menu'>" +
                                              "<a class='dropdown-item' href='javascript:hsUpdateCustomer("+ cust +");'>Update</a>"+
                                              "<a class='dropdown-item' href='javascript:hsDeleteCustomer("+ cust +");'>Delete</a>"+
                                              "<a class='dropdown-item' href='javascript:hsAddressesCustomer("+ cust +");'>Addresses</a>"+
                                              "<a class='dropdown-item' href='javascript:hsPackagesCustomer("+ cust +");'>Packages</a>"+
                                              "<a class='dropdown-item' href='javascript:hsPaymentCustomer("+ cust +");'>Payment Methods</a>"+
                                              "<a class='dropdown-item' href='javascript:hsShipmentsCustomer("+ cust +");'>Shipments</a>"+
                                              "<a class='dropdown-item' href='javascript:hsCopyCustomer("+ cust +");'>Copy</a></div></td></tr>";
            }


            customerList = customerList +"</form></tbody></table>";
            document.getElementById("hs-data-view").innerHTML = customerList;


            if (isHS_DEBUG(hsDD.DEBUG)){
                document.getElementById("HS_ERR1").innerHTML = "HS_ERR1: E1: "+hsDD.HS_ERR1;	
                document.getElementById("HS_JSON_RECEIVED1").innerHTML = "JSON RECEIVED1: "+ this.responseText;	
            }
        }
    };
        
        
    xmlhttp_1.open("POST", "https://www.pgesoftware.com/hermes/server/index.php", true);
    xmlhttp_1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp_1.send("x=" + dbParam_1);
    xmlhttp_1.close;

}