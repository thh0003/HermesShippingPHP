function hsCopyPayment(pay) {
    for (payData in hsDD.HS_PAYMENTLIST.hspayments[pay]){
        if (payData !='Paymentidentifier' && payData !='HS_Payment_Active'){
            if(payData == 'Useridentifier'){
                document.getElementById(payData+"_PAY").innerHTML = hsDD.HS_PAYMENTLIST.hspayments[pay][payData];
            } else {
                document.getElementById(payData+"_PAY").value = hsDD.HS_PAYMENTLIST.hspayments[pay][payData];
            }
        }
    }
}

function hsCreatePayment(page){
    var xmlhttp_1 = new XMLHttpRequest();
    var hspayment = {}

    page = null;

    var setUI = hsSetUI("CREATE", page, "PAYMENT");
    var obj_1 = { "HS_ACTION":"CREATE", "HS_OBJECT":"PAYMENT", "HS_COMMIT": document.getElementById("hsCommit").checked, "HS_PMPAGE":setUI["HS_PMPAGE"], "HS_PMCURSOR":setUI["HS_PMCURSOR"], "HS_PAY_SEARCH":setUI["HS_PAY_SEARCH"], "HS_PAY_SORT":setUI["HS_PAY_SORT"] };

    for(var payCol=0; payCol < hsDD.HS_PAYMENTLIST.hspaymentColumns.length;payCol++){
        if (payCol != 0 && payCol != hsDD.HS_PAYMENTLIST.hspaymentColumns.length-1){
            if (payCol == 1){
                console.log("field name: "+hsDD.HS_PAYMENTLIST.hspaymentColumns[payCol] + " input form value: " + document.getElementById(hsDD.HS_PAYMENTLIST.hspaymentColumns[payCol]+"_PAY").innerHTML);
                hspayment[hsDD.HS_PAYMENTLIST.hspaymentColumns[payCol]] = document.getElementById(hsDD.HS_PAYMENTLIST.hspaymentColumns[payCol]+"_PAY").innerHTML;
           } else {
                console.log("field name: "+hsDD.HS_PAYMENTLIST.hspaymentColumns[payCol] + " input form value: " + document.getElementById(hsDD.HS_PAYMENTLIST.hspaymentColumns[payCol]+"_PAY").value);
                hspayment[hsDD.HS_PAYMENTLIST.hspaymentColumns[payCol]] = document.getElementById(hsDD.HS_PAYMENTLIST.hspaymentColumns[payCol]+"_PAY").value;
            }
        }
    }
    obj_1["HS_PAYMENT"] = hspayment;
    var dbParam_1 = JSON.stringify(obj_1);
    console.log(dbParam_1);
    document.getElementById("HS_JSON_SENT1").innerHTML = "JSON SENT1: dbParam: "+ dbParam_1;
    
    xmlhttp_1.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            hsDD = JSON.parse(this.responseText);
            if (isHS_DEBUG(hsDD.DEBUG)){
                console.log("JSON RESPONSE: "+ hsDD);
            }
            document.getElementById("hsStatus").innerHTML = "Mutation Status: "+ hsDD.HS_NEWPAYMENT;
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

function hsUpdatePayment(index){
    var xmlhttp_1 = new XMLHttpRequest();
    var hspayment = {}
    page = null;

    var setUI = hsSetUI("UPDATE", page, "PAYMENT");
    var obj_1 = { "HS_ACTION":"UPDATE", "HS_OBJECT":"PAYMENT", "HS_COMMIT": document.getElementById("hsCommit").checked, "HS_PMPAGE":setUI["HS_PMPAGE"], "HS_PMCURSOR":setUI["HS_PMCURSOR"], "HS_PAY_SEARCH":setUI["HS_PAY_SEARCH"], "HS_PAY_SORT":setUI["HS_PAY_SORT"] };



    for(var payCol=0; payCol < hsDD.HS_PAYMENTLIST.hspaymentColumns.length;payCol++){
        if (payCol != hsDD.HS_PAYMENTLIST.hspaymentColumns.length-1){
            if (hsDD.HS_PAYMENTLIST.hspaymentColumns[payCol]=='Useridentifier' || hsDD.HS_PAYMENTLIST.hspaymentColumns[payCol]=='Paymentidentifier') {
                hspayment[hsDD.HS_PAYMENTLIST.hspaymentColumns[payCol]] = document.getElementById(hsDD.HS_PAYMENTLIST.hspaymentColumns[payCol]+"_"+index+"_PAY").innerHTML;
                if (isHS_DEBUG(hsDD.DEBUG)){
                    console.log("field name: "+hsDD.HS_PAYMENTLIST.hspaymentColumns[payCol] + " update form value: " + document.getElementById(hsDD.HS_PAYMENTLIST.hspaymentColumns[payCol]+"_"+index+"_PAY").innerHTML);
                }
            } else {
                hspayment[hsDD.HS_PAYMENTLIST.hspaymentColumns[payCol]] = document.getElementById(hsDD.HS_PAYMENTLIST.hspaymentColumns[payCol]+"_"+index+"_PAY").value;
                if (isHS_DEBUG(hsDD.DEBUG)){
                    console.log("field name: "+hsDD.HS_PAYMENTLIST.hspaymentColumns[payCol] + " update form value: " + document.getElementById(hsDD.HS_PAYMENTLIST.hspaymentColumns[payCol]+"_"+index+"_PAY").value);
                }
            }
        }
    }

    obj_1["HS_PAYMENT"] = hspayment;
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

function hsDeletePayment(index){
    var xmlhttp_1 = new XMLHttpRequest();
    page = null;

    var setUI = hsSetUI("DELETE", page, "PAYMENT");
    var obj_1 = { "HS_ACTION":"DELETE", "HS_OBJECT":"PAYMENT", "HS_COMMIT": document.getElementById("hsCommit").checked, "HS_PMDELID":document.getElementById("Paymentidentifier_"+index+"_PAY").innerHTML, "HS_PMPAGE":setUI["HS_PMPAGE"], "HS_PMCURSOR":setUI["HS_PMCURSOR"], "HS_PAY_SEARCH":setUI["HS_PAY_SEARCH"], "HS_PAY_SORT":setUI["HS_PAY_SORT"] };

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

function hsListPayment(custID, page, sort=null, search=""){
    var xmlhttp_1 = new XMLHttpRequest();
    var setUI = hsSetUI("LIST", page, "PAYMENT",sort, search);
    var obj_1 = { "HS_ACTION":"LOAD", "HS_OBJECT":"PAYMENT", "HS_COMMIT": document.getElementById("hsCommit").checked, "HS_PMcustID":custID, "HS_PMPAGE":setUI["HS_PMPAGE"], "HS_PMCURSOR":setUI["HS_PMCURSOR"], "HS_PAY_SEARCH":setUI["HS_PAY_SEARCH"], "HS_PAY_SORT":setUI["HS_PAY_SORT"] };
    var dbParam_1 = JSON.stringify(obj_1);
    var hspaymentActions = "";
    console.log(dbParam_1);
    document.getElementById("HS_JSON_SENT1").innerHTML = "JSON SENT1: dbParam: "+ dbParam_1;

    hspaymentActions = '<h3>Payment '+
                     '<button type="button" onclick="hsListPayment(\''+ custID +'\',\'INIT\')" class="btn btn-primary form-control-sm">List</button> '+
                     '<button type="button col" onclick="hsListPayment(\''+ custID +'\',\'<\')" class="btn btn-primary form-control-sm">Prev</button> '+
                     '<button type="button col" onclick="hsListPayment(\''+ custID +'\',\'>\')" class="btn btn-primary form-control-sm">Next</button> </h3>';
    document.getElementById("hspaymentActions").innerHTML = hspaymentActions;
    
    xmlhttp_1.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            hsDD = JSON.parse(this.responseText);
            if (isHS_DEBUG(hsDD.DEBUG)){
                console.log("JSON RESPONSE: "+ hsDD);
            }

            hspaymentList = "<table class='table table-striped table-hover'><thead><form><tr>";
            blankinput = "<tr class='table-info'>";
            

            for(var payCol=0; payCol < hsDD.HS_PAYMENTLIST.hspaymentColumns.length;payCol++){
                
                if (payCol == 0 || payCol == 1 || payCol == hsDD.HS_PAYMENTLIST.hspaymentColumns.length-1){
                    blankinput = blankinput + 	"<td scope='col' class='small d-none' id='"+hsDD.HS_PAYMENTLIST.hspaymentColumns[payCol]+"_PAY'></td>";
                    hspaymentList = hspaymentList + "<th scope='col' class='d-none' >"+ hsDD.HS_PAYMENTLIST.hspaymentColumns[payCol] +"</th>";
                } else {
                    blankinput = blankinput + 	"<td scope='col' class='small'><input type='text' class='form-control form-control-sm small' placeholder='"+hsDD.HS_PAYMENTLIST.hspaymentColumns[payCol]+"' id='"+ hsDD.HS_PAYMENTLIST.hspaymentColumns[payCol] +"_PAY'></td>";
                    hspaymentList = hspaymentList + "<th scope='col'>"+ hsDD.HS_PAYMENTLIST.hspaymentColumns[payCol] +"</th>";
                }
            }
            blankinput = blankinput + "<td scope='col' class='small'><button class='btn btn-outline-secondary form-control-sm small' type='button' id='Create' onclick='hsCreatePayment()'>Create</button></td></tr>";
            hspaymentList = hspaymentList +"<th scoope='col'>Actions</th></tr></thead><tbody>";
            hspaymentList = hspaymentList + blankinput;

            for(var pay=0; pay < hsDD.HS_PAYMENTLIST.hspayments.length;pay++){
                hspaymentList = hspaymentList + "<tr>"
                for (payData in hsDD.HS_PAYMENTLIST.hspayments[pay]){
                    if (payData=='Useridentifier' || payData == "HS_Payment_Active" || payData=='Paymentidentifier') {
                        hspaymentList = hspaymentList + "<td scope='col' class='small d-none' id='"+payData+"_"+pay+"_PAY'>"+hsDD.HS_PAYMENTLIST.hspayments[pay][payData]+"</td>";
                    }else{
                        hspaymentList = hspaymentList + "<td scope='col' class='small'><input type='text' class='form-control form-control-sm small' id='"+payData+"_"+pay+"_PAY' value='"+hsDD.HS_PAYMENTLIST.hspayments[pay][payData]+"'></td>";
                    }   
                }
                hspaymentList = hspaymentList + "<td scope='col' class='small'><button class='btn btn-outline-secondary dropdown-toggle form-control-sm small' id='action_"+pay+"' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Actions</button>"+
                                              "<div class='dropdown-menu small'>" +
                                              "<a class='dropdown-item small' href='javascript:hsUpdatePayment("+ pay +");'>Update</a>"+
                                              "<a class='dropdown-item small' href='javascript:hsDeletePayment("+ pay +");'>Delete</a>"+
                                              "<a class='dropdown-item small' href='javascript:hsCopyPayment("+ pay +");'>Copy</a></div></td></tr>";
            }


            hspaymentList = hspaymentList +"</form></tbody></table>";
            document.getElementById("hs-data-payment").innerHTML = hspaymentList;


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