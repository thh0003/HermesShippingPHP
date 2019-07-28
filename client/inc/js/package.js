function hsCopyPackage(pak) {
    for (pakData in hsDD.HS_PACKAGELIST.hspackages[pak]){
        if (pakData !='Package_ID' && pakData !='Active'){
            if(pakData == 'Useridentifier'){
                document.getElementById(pakData+"_PAK").innerHTML = hsDD.HS_PACKAGELIST.hspackages[pak][pakData];
            } else {
                document.getElementById(pakData+"_PAK").value = hsDD.HS_PACKAGELIST.hspackages[pak][pakData];
            }
        }
    }
}

function hsCreatePackage(page){
    var xmlhttp_1 = new XMLHttpRequest();
    var hspackage = {}

    page = null;

    var setUI = hsSetUI("CREATE", page, "PACKAGE");
    var obj_1 = { "HS_ACTION":"CREATE", "HS_OBJECT":"PACKAGE", "HS_COMMIT": document.getElementById("hsCommit").checked, "HS_PPAGE":setUI["HS_PPAGE"], "HS_PCURSOR":setUI["HS_PCURSOR"], "HS_PAK_SEARCH":setUI["HS_PAK_SEARCH"], "HS_PAK_SORT":setUI["HS_PAK_SORT"] };

    for(var pakCol=0; pakCol < hsDD.HS_PACKAGELIST.hspackageColumns.length;pakCol++){
        if (pakCol != 0 && pakCol != hsDD.HS_PACKAGELIST.hspackageColumns.length-1){
            if (pakCol == 2){
                console.log("field name: "+hsDD.HS_PACKAGELIST.hspackageColumns[pakCol] + " input form value: " + document.getElementById(hsDD.HS_PACKAGELIST.hspackageColumns[pakCol]+"_PAK").innerHTML);
                hspackage[hsDD.HS_PACKAGELIST.hspackageColumns[pakCol]] = document.getElementById(hsDD.HS_PACKAGELIST.hspackageColumns[pakCol]+"_PAK").innerHTML;
            } else {
                console.log("field name: "+hsDD.HS_PACKAGELIST.hspackageColumns[pakCol] + " input form value: " + document.getElementById(hsDD.HS_PACKAGELIST.hspackageColumns[pakCol]+"_PAK").value);
                hspackage[hsDD.HS_PACKAGELIST.hspackageColumns[pakCol]] = document.getElementById(hsDD.HS_PACKAGELIST.hspackageColumns[pakCol]+"_PAK").value;
            }
        }
    }
    obj_1["HS_PACKAGE"] = hspackage;
    var dbParam_1 = JSON.stringify(obj_1);
    console.log(dbParam_1);
    document.getElementById("HS_JSON_SENT1").innerHTML = "JSON SENT1: dbParam: "+ dbParam_1;
    
    xmlhttp_1.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            hsDD = JSON.parse(this.responseText);
            if (isHS_DEBUG(hsDD.DEBUG)){
                console.log("JSON RESPONSE: "+ hsDD);
            }
            document.getElementById("hsStatus").innerHTML = "Mutation Status: "+ hsDD.HS_NEWPACKAGE;
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

function hsUpdatePackage(index){
    var xmlhttp_1 = new XMLHttpRequest();
    var hspackage = {}
    page = null;

    var setUI = hsSetUI("UPDATE", page, "PACKAGE");
    var obj_1 = { "HS_ACTION":"UPDATE", "HS_OBJECT":"PACKAGE", "HS_COMMIT": document.getElementById("hsCommit").checked, "HS_PPAGE":setUI["HS_PPAGE"], "HS_PCURSOR":setUI["HS_PCURSOR"], "HS_PAK_SEARCH":setUI["HS_PAK_SEARCH"], "HS_PAK_SORT":setUI["HS_PAK_SORT"] };



    for(var pakCol=0; pakCol < hsDD.HS_PACKAGELIST.hspackageColumns.length;pakCol++){
        if (pakCol != hsDD.HS_PACKAGELIST.hspackageColumns.length-1){
            if (hsDD.HS_PACKAGELIST.hspackageColumns[pakCol]=='Useridentifier' || hsDD.HS_PACKAGELIST.hspackageColumns[pakCol]=='Package_ID') {
                hspackage[hsDD.HS_PACKAGELIST.hspackageColumns[pakCol]] = document.getElementById(hsDD.HS_PACKAGELIST.hspackageColumns[pakCol]+"_"+index+"_PAK").innerHTML;
                if (isHS_DEBUG(hsDD.DEBUG)){
                    console.log("field name: "+hsDD.HS_PACKAGELIST.hspackageColumns[pakCol] + " update form value: " + document.getElementById(hsDD.HS_PACKAGELIST.hspackageColumns[pakCol]+"_"+index+"_PAK").innerHTML);
                }
            } else {
                hspackage[hsDD.HS_PACKAGELIST.hspackageColumns[pakCol]] = document.getElementById(hsDD.HS_PACKAGELIST.hspackageColumns[pakCol]+"_"+index+"_PAK").value;
                if (isHS_DEBUG(hsDD.DEBUG)){
                    console.log("field name: "+hsDD.HS_PACKAGELIST.hspackageColumns[pakCol] + " update form value: " + document.getElementById(hsDD.HS_PACKAGELIST.hspackageColumns[pakCol]+"_"+index+"_PAK").value);
                }
            }
        }
    }

    obj_1["HS_PACKAGE"] = hspackage;
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

function hsDeletePackage(index){
    var xmlhttp_1 = new XMLHttpRequest();
    page = null;

    var setUI = hsSetUI("DELETE", page, "PACKAGE");
    var obj_1 = { "HS_ACTION":"DELETE", "HS_OBJECT":"PACKAGE", "HS_COMMIT": document.getElementById("hsCommit").checked, "HS_PDELID":document.getElementById("Package_ID_"+index+"_PAK").innerHTML, "HS_PPAGE":setUI["HS_PPAGE"], "HS_PCURSOR":setUI["HS_PCURSOR"], "HS_PAK_SEARCH":setUI["HS_PAK_SEARCH"], "HS_PAK_SORT":setUI["HS_PAK_SORT"] };

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

function hsListPackage(custID, page, sort=null, search=""){
    var xmlhttp_1 = new XMLHttpRequest();
    var setUI = hsSetUI("LIST", page, "PACKAGE",sort, search);
    var obj_1 = { "HS_ACTION":"LOAD", "HS_OBJECT":"PACKAGE", "HS_COMMIT": document.getElementById("hsCommit").checked, "HS_PcustID":custID, "HS_PPAGE":setUI["HS_PPAGE"], "HS_PCURSOR":setUI["HS_PCURSOR"], "HS_PAK_SEARCH":setUI["HS_PAK_SEARCH"], "HS_PAK_SORT":setUI["HS_PAK_SORT"] };
    var dbParam_1 = JSON.stringify(obj_1);
    var hspackageActions = "";
    console.log(dbParam_1);
    document.getElementById("HS_JSON_SENT1").innerHTML = "JSON SENT1: dbParam: "+ dbParam_1;

    hspackageActions = '<h3>Package '+
                     '<button type="button" onclick="hsListPackage(\''+ custID +'\',\'INIT\')" class="btn btn-primary form-control-sm">List</button> '+
                     '<button type="button col" onclick="hsListPackage(\''+ custID +'\',\'<\')" class="btn btn-primary form-control-sm">Prev</button> '+
                     '<button type="button col" onclick="hsListPackage(\''+ custID +'\',\'>\')" class="btn btn-primary form-control-sm">Next</button> </h3>';
    document.getElementById("hspackageActions").innerHTML = hspackageActions;
    
    xmlhttp_1.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            hsDD = JSON.parse(this.responseText);
            if (isHS_DEBUG(hsDD.DEBUG)){
                console.log("JSON RESPONSE: "+ hsDD);
            }

            hspackageList = "<table class='table table-striped table-hover'><thead><form><tr>";
            blankinput = "<tr class='table-info'>";
            

            for(var pakCol=0; pakCol < hsDD.HS_PACKAGELIST.hspackageColumns.length;pakCol++){
                
                if (pakCol == 0 || pakCol == 2 || pakCol == hsDD.HS_PACKAGELIST.hspackageColumns.length-1){
                    blankinput = blankinput + 	"<td scope='col' class='small d-none' id='"+hsDD.HS_PACKAGELIST.hspackageColumns[pakCol]+"_PAK'></td>";
                    hspackageList = hspackageList + "<th scope='col' class='d-none' >"+ hsDD.HS_PACKAGELIST.hspackageColumns[pakCol] +"</th>";
                } else {
                    blankinput = blankinput + 	"<td scope='col' class='small'><input type='text' class='form-control form-control-sm small' placeholder='"+hsDD.HS_PACKAGELIST.hspackageColumns[pakCol]+"' id='"+ hsDD.HS_PACKAGELIST.hspackageColumns[pakCol] +"_PAK'></td>";
                    hspackageList = hspackageList + "<th scope='col'>"+ hsDD.HS_PACKAGELIST.hspackageColumns[pakCol] +"</th>";
                }
            }
            blankinput = blankinput + "<td scope='col' class='small'><button class='btn btn-outline-secondary form-control-sm small' type='button' id='Create' onclick='hsCreatePackage()'>Create</button></td></tr>";
            hspackageList = hspackageList +"<th scoope='col'>Actions</th></tr></thead><tbody>";
            hspackageList = hspackageList + blankinput;

            for(var pak=0; pak < hsDD.HS_PACKAGELIST.hspackages.length;pak++){
                hspackageList = hspackageList + "<tr>"
                for (pakData in hsDD.HS_PACKAGELIST.hspackages[pak]){
                    if (pakData=='Useridentifier' || pakData == "Active" || pakData=='Package_ID') {
                        hspackageList = hspackageList + "<td scope='col' class='small d-none' id='"+pakData+"_"+pak+"_PAK'>"+hsDD.HS_PACKAGELIST.hspackages[pak][pakData]+"</td>";
                    }else{
                        hspackageList = hspackageList + "<td scope='col' class='small'><input type='text' class='form-control form-control-sm small' id='"+pakData+"_"+pak+"_PAK' value='"+hsDD.HS_PACKAGELIST.hspackages[pak][pakData]+"'></td>";
                    }   
                }
                hspackageList = hspackageList + "<td scope='col' class='small'><button class='btn btn-outline-secondary dropdown-toggle form-control-sm small' id='action_"+pak+"' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Actions</button>"+
                                              "<div class='dropdown-menu small'>" +
                                              "<a class='dropdown-item small' href='javascript:hsUpdatePackage("+ pak +");'>Update</a>"+
                                              "<a class='dropdown-item small' href='javascript:hsDeletePackage("+ pak +");'>Delete</a>"+
                                              "<a class='dropdown-item small' href='javascript:hsCopyPackage("+ pak +");'>Copy</a></div></td></tr>";
            }


            hspackageList = hspackageList +"</form></tbody></table>";
            document.getElementById("hs-data-package").innerHTML = hspackageList;


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