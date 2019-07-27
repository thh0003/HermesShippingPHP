function hsCopyAddress(adr) {
    for (adrData in hsDD.HS_ADDRESSLIST.addresses[adr]){
        if (adrData !='addressidentifier' && adrData !='Active'){
            if(adrData == 'Useridentifier'){
                document.getElementById(adrData+"_ADR").innerHTML = hsDD.HS_ADDRESSLIST.addresses[adr][adrData];
            } else {
                document.getElementById(adrData+"_ADR").value = hsDD.HS_ADDRESSLIST.addresses[adr][adrData];
            }
        }
    }
}

function hsCreateAddress(page){
    var xmlhttp_1 = new XMLHttpRequest();
    var address = {}

    page = null;

    var setUI = hsSetUI("CREATE", page, "ADDRESS");
    var obj_1 = { "HS_ACTION":"CREATE", "HS_OBJECT":"ADDRESS", "HS_COMMIT": document.getElementById("hsCommit").checked, "HS_APAGE":setUI["HS_APAGE"], "HS_ACURSOR":setUI["HS_ACURSOR"], "HS_ADR_SEARCH":setUI["HS_ADR_SEARCH"], "HS_ADR_SORT":setUI["HS_ADR_SORT"] };

    for(var adrCol=0; adrCol < hsDD.HS_ADDRESSLIST.addressColumns.length;adrCol++){
        if (adrCol != 0 && adrCol != hsDD.HS_ADDRESSLIST.addressColumns.length-1){
            if (adrCol == 1){
                console.log("field name: "+hsDD.HS_ADDRESSLIST.addressColumns[adrCol] + " input form value: " + document.getElementById(hsDD.HS_ADDRESSLIST.addressColumns[adrCol]+"_ADR").innerHTML);
                address[hsDD.HS_ADDRESSLIST.addressColumns[adrCol]] = document.getElementById(hsDD.HS_ADDRESSLIST.addressColumns[adrCol]+"_ADR").innerHTML;
            } else {
                console.log("field name: "+hsDD.HS_ADDRESSLIST.addressColumns[adrCol] + " input form value: " + document.getElementById(hsDD.HS_ADDRESSLIST.addressColumns[adrCol]+"_ADR").value);
                address[hsDD.HS_ADDRESSLIST.addressColumns[adrCol]] = document.getElementById(hsDD.HS_ADDRESSLIST.addressColumns[adrCol]+"_ADR").value;
            }
        }
    }
    obj_1["HS_ADDRESS"] = address;
    var dbParam_1 = JSON.stringify(obj_1);
    console.log(dbParam_1);
    document.getElementById("HS_JSON_SENT1").innerHTML = "JSON SENT1: dbParam: "+ dbParam_1;
    
    xmlhttp_1.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            hsDD = JSON.parse(this.responseText);
            if (isHS_DEBUG(hsDD.DEBUG)){
                console.log("JSON RESPONSE: "+ hsDD);
            }
            document.getElementById("hsStatus").innerHTML = "Mutation Status: "+ hsDD.HS_NEWADDRESS;
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

function hsUpdateAddress(index){
    var xmlhttp_1 = new XMLHttpRequest();
    var address = {}
    page = null;

    var setUI = hsSetUI("UPDATE", page, "ADDRESS");
    var obj_1 = { "HS_ACTION":"UPDATE", "HS_OBJECT":"ADDRESS", "HS_COMMIT": document.getElementById("hsCommit").checked, "HS_APAGE":setUI["HS_APAGE"], "HS_ACURSOR":setUI["HS_ACURSOR"], "HS_ADR_SEARCH":setUI["HS_ADR_SEARCH"], "HS_ADR_SORT":setUI["HS_ADR_SORT"] };



    for(var adrCol=0; adrCol < hsDD.HS_ADDRESSLIST.addressColumns.length;adrCol++){
        if (adrCol != hsDD.HS_ADDRESSLIST.addressColumns.length-1){
            if (hsDD.HS_ADDRESSLIST.addressColumns[adrCol]=='Useridentifier' || hsDD.HS_ADDRESSLIST.addressColumns[adrCol]=='addressidentifier') {
                address[hsDD.HS_ADDRESSLIST.addressColumns[adrCol]] = document.getElementById(hsDD.HS_ADDRESSLIST.addressColumns[adrCol]+"_"+index+"_ADR").innerHTML;
                if (isHS_DEBUG(hsDD.DEBUG)){
                    console.log("field name: "+hsDD.HS_ADDRESSLIST.addressColumns[adrCol] + " update form value: " + document.getElementById(hsDD.HS_ADDRESSLIST.addressColumns[adrCol]+"_"+index+"_ADR").innerHTML);
                }
            } else {
                address[hsDD.HS_ADDRESSLIST.addressColumns[adrCol]] = document.getElementById(hsDD.HS_ADDRESSLIST.addressColumns[adrCol]+"_"+index+"_ADR").value;
                if (isHS_DEBUG(hsDD.DEBUG)){
                    console.log("field name: "+hsDD.HS_ADDRESSLIST.addressColumns[adrCol] + " update form value: " + document.getElementById(hsDD.HS_ADDRESSLIST.addressColumns[adrCol]+"_"+index+"_ADR").value);
                }
            }
        }
    }

    obj_1["HS_ADDRESS"] = address;
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

function hsDeleteAddress(index){
    var xmlhttp_1 = new XMLHttpRequest();
    page = null;

    var setUI = hsSetUI("DELETE", page, "ADDRESS");
    var obj_1 = { "HS_ACTION":"DELETE", "HS_OBJECT":"ADDRESS", "HS_COMMIT": document.getElementById("hsCommit").checked, "HS_ADELID":document.getElementById("addressidentifier_"+index+"_ADR").innerHTML, "HS_APAGE":setUI["HS_APAGE"], "HS_ACURSOR":setUI["HS_ACURSOR"], "HS_ADR_SEARCH":setUI["HS_ADR_SEARCH"], "HS_ADR_SORT":setUI["HS_ADR_SORT"] };

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

function hsListAddress(custID, page, sort=null, search=""){
    var xmlhttp_1 = new XMLHttpRequest();
    var setUI = hsSetUI("LIST", page, "ADDRESS",sort, search);
    var obj_1 = { "HS_ACTION":"LOAD", "HS_OBJECT":"ADDRESS", "HS_COMMIT": document.getElementById("hsCommit").checked, "HS_AcustID":custID, "HS_APAGE":setUI["HS_APAGE"], "HS_ACURSOR":setUI["HS_ACURSOR"], "HS_ADR_SEARCH":setUI["HS_ADR_SEARCH"], "HS_ADR_SORT":setUI["HS_ADR_SORT"] };
    var dbParam_1 = JSON.stringify(obj_1);
    var addressActions = "";
    console.log(dbParam_1);
    document.getElementById("HS_JSON_SENT1").innerHTML = "JSON SENT1: dbParam: "+ dbParam_1;

    addressActions = '<h3>Address '+
                     '<button type="button" onclick="hsListAddress(\''+ custID +'\',\'INIT\')" class="btn btn-primary form-control-sm">List</button> '+
                     '<button type="button col" onclick="hsListAddress(\''+ custID +'\',\'<\')" class="btn btn-primary form-control-sm">Prev</button> '+
                     '<button type="button col" onclick="hsListAddress(\''+ custID +'\',\'>\')" class="btn btn-primary form-control-sm">Next</button> </h3>';
    document.getElementById("addressActions").innerHTML = addressActions;
    
    xmlhttp_1.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            hsDD = JSON.parse(this.responseText);
            if (isHS_DEBUG(hsDD.DEBUG)){
                console.log("JSON RESPONSE: "+ hsDD);
            }

            addressList = "<table class='table table-striped table-hover'><thead><form><tr>";
            blankinput = "<tr class='table-info'>";
            

            for(var adrCol=0; adrCol < hsDD.HS_ADDRESSLIST.addressColumns.length;adrCol++){
                
                if (adrCol == 0 || adrCol == 1 || adrCol == hsDD.HS_ADDRESSLIST.addressColumns.length-1){
                    blankinput = blankinput + 	"<td scope='col' class='small d-none' id='"+hsDD.HS_ADDRESSLIST.addressColumns[adrCol]+"_ADR'></td>";
                    addressList = addressList + "<th scope='col' class='d-none' >"+ hsDD.HS_ADDRESSLIST.addressColumns[adrCol] +"</th>";
                } else {
                    blankinput = blankinput + 	"<td scope='col' class='small'><input type='text' class='form-control form-control-sm small' placeholder='"+hsDD.HS_ADDRESSLIST.addressColumns[adrCol]+"' id='"+ hsDD.HS_ADDRESSLIST.addressColumns[adrCol] +"_ADR'></td>";
                    addressList = addressList + "<th scope='col'>"+ hsDD.HS_ADDRESSLIST.addressColumns[adrCol] +"</th>";
                }
            }
            blankinput = blankinput + "<td scope='col' class='small'><button class='btn btn-outline-secondary form-control-sm small' type='button' id='Create' onclick='hsCreateAddress()'>Create</button></td></tr>";
            addressList = addressList +"<th scoope='col'>Actions</th></tr></thead><tbody>";
            addressList = addressList + blankinput;

            for(var adr=0; adr < hsDD.HS_ADDRESSLIST.addresses.length;adr++){
                addressList = addressList + "<tr>"
                for (adrData in hsDD.HS_ADDRESSLIST.addresses[adr]){
                    if (adrData=='Useridentifier' || adrData == "Active" || adrData=='addressidentifier') {
                        addressList = addressList + "<td scope='col' class='small d-none' id='"+adrData+"_"+adr+"_ADR'>"+hsDD.HS_ADDRESSLIST.addresses[adr][adrData]+"</td>";
                    }else{
                        addressList = addressList + "<td scope='col' class='small'><input type='text' class='form-control form-control-sm small' id='"+adrData+"_"+adr+"_ADR' value='"+hsDD.HS_ADDRESSLIST.addresses[adr][adrData]+"'></td>";
                    }   
                }
                addressList = addressList + "<td scope='col' class='small'><button class='btn btn-outline-secondary dropdown-toggle form-control-sm small' id='action_"+adr+"' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Actions</button>"+
                                              "<div class='dropdown-menu small'>" +
                                              "<a class='dropdown-item small' href='javascript:hsUpdateAddress("+ adr +");'>Update</a>"+
                                              "<a class='dropdown-item small' href='javascript:hsDeleteAddress("+ adr +");'>Delete</a>"+
                                              "<a class='dropdown-item small' href='javascript:hsCopyAddress("+ adr +");'>Copy</a></div></td></tr>";
            }


            addressList = addressList +"</form></tbody></table>";
            document.getElementById("hs-data-address").innerHTML = addressList;


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