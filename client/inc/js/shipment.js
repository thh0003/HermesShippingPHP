function hsCopyShipment(ship) {
    for (shipData in hsDD.HS_SHIPMENTLIST.hsshipments[ship]){
        if (shipData !='FedEx Shipping ID' && shipData !='HS_Shipment_Active'){
            if(shipData == 'Useridentifier'){
                document.getElementById(shipData+"_SHIP").innerHTML = hsDD.HS_SHIPMENTLIST.hsshipments[ship][shipData];
            } else {
                document.getElementById(shipData+"_SHIP").value = hsDD.HS_SHIPMENTLIST.hsshipments[ship][shipData];
            }
        }
    }
}

function hsCreateShipment(page){
    var xmlhttp_1 = new XMLHttpRequest();
    var hsshipment = {}

    page = null;

    var setUI = hsSetUI("CREATE", page, "SHIPMENT");
    var obj_1 = { "HS_ACTION":"CREATE", "HS_OBJECT":"SHIPMENT", "HS_COMMIT": document.getElementById("hsCommit").checked, "HS_SPAGE":setUI["HS_SPAGE"], "HS_SCURSOR":setUI["HS_SCURSOR"], "HS_SHIP_SEARCH":setUI["HS_SHIP_SEARCH"], "HS_SHIP_SORT":setUI["HS_SHIP_SORT"] };

    for(var shipCol=0; shipCol < hsDD.HS_SHIPMENTLIST.hsshipmentColumns.length;shipCol++){
        if (shipCol != 0 && shipCol != hsDD.HS_SHIPMENTLIST.hsshipmentColumns.length-1){
            if (shipCol == 1){
                console.log("field name: "+hsDD.HS_SHIPMENTLIST.hsshipmentColumns[shipCol] + " input form value: " + document.getElementById(hsDD.HS_SHIPMENTLIST.hsshipmentColumns[shipCol]+"_SHIP").innerHTML);
                hsshipment[hsDD.HS_SHIPMENTLIST.hsshipmentColumns[shipCol]] = document.getElementById(hsDD.HS_SHIPMENTLIST.hsshipmentColumns[shipCol]+"_SHIP").innerHTML;
           } else {
                console.log("field name: "+hsDD.HS_SHIPMENTLIST.hsshipmentColumns[shipCol] + " input form value: " + document.getElementById(hsDD.HS_SHIPMENTLIST.hsshipmentColumns[shipCol]+"_SHIP").value);
                hsshipment[hsDD.HS_SHIPMENTLIST.hsshipmentColumns[shipCol]] = document.getElementById(hsDD.HS_SHIPMENTLIST.hsshipmentColumns[shipCol]+"_SHIP").value;
            }
        }
    }
    obj_1["HS_SHIPMENT"] = hsshipment;
    var dbParam_1 = JSON.stringify(obj_1);
    console.log(dbParam_1);
    document.getElementById("HS_JSON_SENT1").innerHTML = "JSON SENT1: dbParam: "+ dbParam_1;
    
    xmlhttp_1.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            hsDD = JSON.parse(this.responseText);
            if (isHS_DEBUG(hsDD.DEBUG)){
                console.log("JSON RESPONSE: "+ hsDD);
            }
            document.getElementById("hsStatus").innerHTML = "Mutation Status: "+ hsDD.HS_NEWSHIPMENT;
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

function hsUpdateShipment(index){
    var xmlhttp_1 = new XMLHttpRequest();
    var hsshipment = {}
    page = null;

    var setUI = hsSetUI("UPDATE", page, "SHIPMENT");
    var obj_1 = { "HS_ACTION":"UPDATE", "HS_OBJECT":"SHIPMENT", "HS_COMMIT": document.getElementById("hsCommit").checked, "HS_SPAGE":setUI["HS_SPAGE"], "HS_SCURSOR":setUI["HS_SCURSOR"], "HS_SHIP_SEARCH":setUI["HS_SHIP_SEARCH"], "HS_SHIP_SORT":setUI["HS_SHIP_SORT"] };



    for(var shipCol=0; shipCol < hsDD.HS_SHIPMENTLIST.hsshipmentColumns.length;shipCol++){
        if (shipCol != hsDD.HS_SHIPMENTLIST.hsshipmentColumns.length-1){
            if (hsDD.HS_SHIPMENTLIST.hsshipmentColumns[shipCol]=='Useridentifier' || hsDD.HS_SHIPMENTLIST.hsshipmentColumns[shipCol]=='FedEx Shipping ID') {
                hsshipment[hsDD.HS_SHIPMENTLIST.hsshipmentColumns[shipCol]] = document.getElementById(hsDD.HS_SHIPMENTLIST.hsshipmentColumns[shipCol]+"_"+index+"_SHIP").innerHTML;
                if (isHS_DEBUG(hsDD.DEBUG)){
                    console.log("field name: "+hsDD.HS_SHIPMENTLIST.hsshipmentColumns[shipCol] + " update form value: " + document.getElementById(hsDD.HS_SHIPMENTLIST.hsshipmentColumns[shipCol]+"_"+index+"_SHIP").innerHTML);
                }
            } else {
                hsshipment[hsDD.HS_SHIPMENTLIST.hsshipmentColumns[shipCol]] = document.getElementById(hsDD.HS_SHIPMENTLIST.hsshipmentColumns[shipCol]+"_"+index+"_SHIP").value;
                if (isHS_DEBUG(hsDD.DEBUG)){
                    console.log("field name: "+hsDD.HS_SHIPMENTLIST.hsshipmentColumns[shipCol] + " update form value: " + document.getElementById(hsDD.HS_SHIPMENTLIST.hsshipmentColumns[shipCol]+"_"+index+"_SHIP").value);
                }
            }
        }
    }

    obj_1["HS_SHIPMENT"] = hsshipment;
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

function hsDeleteShipment(index){
    var xmlhttp_1 = new XMLHttpRequest();
    page = null;

    var setUI = hsSetUI("DELETE", page, "SHIPMENT");
    var obj_1 = { "HS_ACTION":"DELETE", "HS_OBJECT":"SHIPMENT", "HS_COMMIT": document.getElementById("hsCommit").checked, "HS_SDELID":document.getElementById("FedEx Shipping ID_"+index+"_SHIP").innerHTML, "HS_SPAGE":setUI["HS_PPAGE"], "HS_SCURSOR":setUI["HS_SCURSOR"], "HS_SHIP_SEARCH":setUI["HS_SHIP_SEARCH"], "HS_SHIP_SORT":setUI["HS_SHIP_SORT"] };

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

function hsListShipment(custID, page, sort=null, search=""){
    var xmlhttp_1 = new XMLHttpRequest();
    var setUI = hsSetUI("LIST", page, "SHIPMENT",sort, search);
    var obj_1 = { "HS_ACTION":"LOAD", "HS_OBJECT":"SHIPMENT", "HS_COMMIT": document.getElementById("hsCommit").checked, "HS_ScustID":custID, "HS_SPAGE":setUI["HS_SPAGE"], "HS_SCURSOR":setUI["HS_SCURSOR"], "HS_SHIP_SEARCH":setUI["HS_SHIP_SEARCH"], "HS_SHIP_SORT":setUI["HS_SHIP_SORT"] };
    var dbParam_1 = JSON.stringify(obj_1);
    var hsshipmentActions = "";
    console.log(dbParam_1);
    document.getElementById("HS_JSON_SENT1").innerHTML = "JSON SENT1: dbParam: "+ dbParam_1;

    hsshipmentActions = '<h3>Shipment '+
                     '<button type="button" onclick="hsListShipment(\''+ custID +'\',\'INIT\')" class="btn btn-primary form-control-sm">List</button> '+
                     '<button type="button col" onclick="hsListShipment(\''+ custID +'\',\'<\')" class="btn btn-primary form-control-sm">Prev</button> '+
                     '<button type="button col" onclick="hsListShipment(\''+ custID +'\',\'>\')" class="btn btn-primary form-control-sm">Next</button> </h3>';
    document.getElementById("hsshipmentActions").innerHTML = hsshipmentActions;
    
    xmlhttp_1.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            hsDD = JSON.parse(this.responseText);
            if (isHS_DEBUG(hsDD.DEBUG)){
                console.log("JSON RESPONSE: "+ hsDD);
            }

            hsshipmentList = "<table class='table table-striped table-hover'><thead><form><tr>";
            blankinput = "<tr class='table-info'>";
            

            for(var shipCol=0; shipCol < hsDD.HS_SHIPMENTLIST.hsshipmentColumns.length;shipCol++){
                
                if (shipCol == 0 || shipCol == 1 || shipCol == hsDD.HS_SHIPMENTLIST.hsshipmentColumns.length-1){
                    blankinput = blankinput + 	"<td scope='col' class='small d-none' id='"+hsDD.HS_SHIPMENTLIST.hsshipmentColumns[shipCol]+"_SHIP'></td>";
                    hsshipmentList = hsshipmentList + "<th scope='col' class='d-none' >"+ hsDD.HS_SHIPMENTLIST.hsshipmentColumns[shipCol] +"</th>";
                } else if (shipCol >= 2 && shipCol <= 9){
                    blankinput = blankinput + 	"<td scope='col' class='small'><input type='text' class='form-control form-control-sm small' placeholder='"+hsDD.HS_SHIPMENTLIST.hsshipmentColumns[shipCol]+"' id='"+ hsDD.HS_SHIPMENTLIST.hsshipmentColumns[shipCol] +"_SHIP'></td>";
                    hsshipmentList = hsshipmentList + "<th scope='col'>To Address</th>";
                    shipCol = 9;
                } else if (shipCol >= 10 && shipCol <= 17){
                    blankinput = blankinput + 	"<td scope='col' class='small'><input type='text' class='form-control form-control-sm small' placeholder='"+hsDD.HS_SHIPMENTLIST.hsshipmentColumns[shipCol]+"' id='"+ hsDD.HS_SHIPMENTLIST.hsshipmentColumns[shipCol] +"_SHIP'></td>";
                    hsshipmentList = hsshipmentList + "<th scope='col'>From Address</th>";
                    shipCol = 17;
                } else if (shipCol >= 18 && shipCol <= 21){
                    blankinput = blankinput + 	"<td scope='col' class='small'><input type='text' class='form-control form-control-sm small' placeholder='"+hsDD.HS_SHIPMENTLIST.hsshipmentColumns[shipCol]+"' id='"+ hsDD.HS_SHIPMENTLIST.hsshipmentColumns[shipCol] +"_SHIP'></td>";
                    hsshipmentList = hsshipmentList + "<th scope='col'>Payment Method</th>";
                    shipCol = 21;
                } else {
                    blankinput = blankinput + 	"<td scope='col' class='small'><input type='text' class='form-control form-control-sm small' placeholder='"+hsDD.HS_SHIPMENTLIST.hsshipmentColumns[shipCol]+"' id='"+ hsDD.HS_SHIPMENTLIST.hsshipmentColumns[shipCol] +"_SHIP'></td>";
                    hsshipmentList = hsshipmentList + "<th scope='col'>"+ hsDD.HS_SHIPMENTLIST.hsshipmentColumns[shipCol] +"</th>";
                }
            }
            blankinput = blankinput + "<td scope='col' class='small'><button class='btn btn-outline-secondary form-control-sm small' type='button' id='Create' onclick='hsCreateShipment()'>Create</button></td></tr>";
            hsshipmentList = hsshipmentList +"<th scoope='col'>Actions</th></tr></thead><tbody>";
            hsshipmentList = hsshipmentList + blankinput;

            for(var ship=0; ship < hsDD.HS_SHIPMENTLIST.hsshipments.length;ship++){
                hsshipmentList = hsshipmentList + "<tr>"
                for (shipData in hsDD.HS_SHIPMENTLIST.hsshipments[ship]){
                    if (shipData=='Useridentifier' || shipData == "Active" || shipData=='FedEx Shipping ID' || shipData=='From_Addressidentifier' || shipData == "To_Addressidentifier" || shipData=='Paymentidentifier') {
                        hsshipmentList = hsshipmentList + "<td scope='col' class='small d-none' id='"+shipData+"_"+ship+"_SHIP'>"+hsDD.HS_SHIPMENTLIST.hsshipments[ship][shipData]+"</td>";
                    } else if (shipData=='To Address Number') {    
                        hsshipmentList = hsshipmentList + "<td scope='col' class='small'>"+
                                                          "<p class='small'>"+hsDD.HS_SHIPMENTLIST.hsshipments[ship]['To Address Number']+" "+hsDD.HS_SHIPMENTLIST.hsshipments[ship]['To Address Name']+"<br>"+
                                                          " "+hsDD.HS_SHIPMENTLIST.hsshipments[ship]['To Address Unit']+"<br>"+
                                                          " "+ hsDD.HS_SHIPMENTLIST.hsshipments[ship]['To City'] +", "+ hsDD.HS_SHIPMENTLIST.hsshipments[ship]['To State'] +" "+ hsDD.HS_SHIPMENTLIST.hsshipments[ship]['To Zip'] +"</p>"+
                                                          "</td>";
                    } else if (shipData=='From Address Number') {    
                        hsshipmentList = hsshipmentList + "<td scope='col' class='small'>"+
                                                            "<p class='small'>"+hsDD.HS_SHIPMENTLIST.hsshipments[ship]['From Address Number']+" "+hsDD.HS_SHIPMENTLIST.hsshipments[ship]['From Address Name']+"<br>"+
                                                            " "+hsDD.HS_SHIPMENTLIST.hsshipments[ship]['From Address Unit']+"<br>"+
                                                            " "+ hsDD.HS_SHIPMENTLIST.hsshipments[ship]['From City'] +", "+ hsDD.HS_SHIPMENTLIST.hsshipments[ship]['From State'] +" "+ hsDD.HS_SHIPMENTLIST.hsshipments[ship]['From Zip'] +"</p>"+
                                                            "</td>";
                    } else if (shipData=='Account Number') {    
                        hsshipmentList = hsshipmentList + "<td scope='col' class='small'>"+
                                                            "<p class='small'>"+hsDD.HS_SHIPMENTLIST.hsshipments[ship]['Account Number']+" "+hsDD.HS_SHIPMENTLIST.hsshipments[ship]['Account Name']+" "+hsDD.HS_SHIPMENTLIST.hsshipments[ship]['Payment Type']+"</p>";
                    }else if (shipData=='Master Tracking ID' || shipData=='Shipping Status' || shipData=='Actual Shipping Cost' || shipData=='Estimated Shipping Rate' || shipData=='FedEx Shipping Type' || shipData=='Creation Date' || shipData=='Shipped Date' || shipData=='Delivered Date' || shipData=='Estimated Delivery Date' || shipData=='FedEx Location ID'){
                        hsshipmentList = hsshipmentList + "<td scope='col' class='small'><input type='text' class='form-control form-control-sm small' id='"+shipData+"_"+ship+"_SHIP' value='"+hsDD.HS_SHIPMENTLIST.hsshipments[ship][shipData]+"'></td>";
                    }   
                }
                hsshipmentList = hsshipmentList + "<td scope='col' class='small'><button class='btn btn-outline-secondary dropdown-toggle form-control-sm small' id='action_"+ship+"' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Actions</button>"+
                                              "<div class='dropdown-menu small'>" +
                                              "<a class='dropdown-item small' href='javascript:hsUpdateShipment("+ ship +");'>Update</a>"+
                                              "<a class='dropdown-item small' href='javascript:hsDeleteShipment("+ ship +");'>Delete</a>"+
                                              "<a class='dropdown-item small' href='javascript:hsCopyShipment("+ ship +");'>Copy</a></div></td></tr>";
            }


            hsshipmentList = hsshipmentList +"</form></tbody></table>";
            document.getElementById("hs-data-shipment").innerHTML = hsshipmentList;


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