<?php
/*
Very Simple Synchronous PHP API
*/
//Data Models Used
use Hermes\DataModel\CustomerSql;
use Hermes\DataModel\AddressSql;
use Hermes\DataModel\PackageSql;
use Hermes\DataModel\PaymentSql;
use Hermes\DataModel\ShipmentSql;

//SERVER DEBUG HOUSING KEEPING
$DEBUG = true;

if (!isset($HS_RETURN)) {
    $HS_RETURN = new stdClass();
}
$HS_RETURN->DEBUG = $DEBUG;
if ($DEBUG){
    foreach($_POST as $key => $value)
        {
            $HS_RETURN->$key = $value;
            trigger_error("POST Key: ". $key . " Value: ". $value);
        }

    foreach($_GET as $key => $value)
        {
            $HS_RETURN->$key = $value;
            trigger_error("GET Key: ". $key . " Value: ". $value);
        }
}

$HS_RESPONSE = json_decode($_POST["x"], false);
$HS_RETURN->HS_ACTION = $HS_RESPONSE->HS_ACTION;
$HS_RETURN->HS_CUST_SEARCH = $HS_RESPONSE->HS_CUST_SEARCH;
$HS_RETURN->HS_OBJECT = $HS_RESPONSE->HS_OBJECT;
$HS_RETURN->HS_PAGE = $HS_RESPONSE->HS_PAGE;
$HS_RETURN->HS_CURSOR = $HS_RESPONSE->HS_CURSOR;
$HS_RETURN->HS_CUST_SORT = $HS_RESPONSE->HS_CUST_SORT;
$HS_RETURN->HS_COMMIT=$HS_RESPONSE->HS_COMMIT;

$HS_RETURN->HS_ADR_SEARCH = $HS_RESPONSE->HS_ADR_SEARCH;
$HS_RETURN->HS_ADR_SORT = $HS_RESPONSE->HS_ADR_SORT;
$HS_RETURN->HS_APAGE = $HS_RESPONSE->HS_APAGE;
$HS_RETURN->HS_ACURSOR = $HS_RESPONSE->HS_ACURSOR;
$HS_RETURN->HS_AcustID = $HS_RESPONSE->HS_AcustID;

$HS_RETURN->HS_PAK_SEARCH = $HS_RESPONSE->HS_PAK_SEARCH;
$HS_RETURN->HS_PAK_SORT = $HS_RESPONSE->HS_PAK_SORT;
$HS_RETURN->HS_PPAGE = $HS_RESPONSE->HS_PPAGE;
$HS_RETURN->HS_PCURSOR = $HS_RESPONSE->HS_PCURSOR;
$HS_RETURN->HS_PcustID = $HS_RESPONSE->HS_PcustID;

$HS_RETURN->HS_PAY_SEARCH = $HS_RESPONSE->HS_PAY_SEARCH;
$HS_RETURN->HS_PAY_SORT = $HS_RESPONSE->HS_PAY_SORT;
$HS_RETURN->HS_PMPAGE = $HS_RESPONSE->HS_PMPAGE;
$HS_RETURN->HS_PMCURSOR = $HS_RESPONSE->HS_PMCURSOR;
$HS_RETURN->HS_PMcustID = $HS_RESPONSE->HS_PMcustID;

$HS_RETURN->HS_SHIP_SEARCH = $HS_RESPONSE->HS_SHIP_SEARCH;
$HS_RETURN->HS_SHIP_SORT = $HS_RESPONSE->HS_SHIP_SORT;
$HS_RETURN->HS_SPAGE = $HS_RESPONSE->HS_SPAGE;
$HS_RETURN->HS_SCURSOR = $HS_RESPONSE->HS_SCURSOR;
$HS_RETURN->HS_ScustID = $HS_RESPONSE->HS_ScustID;

$HS_COMMIT=$HS_RESPONSE->HS_COMMIT;

//SERVER RESPONSES
if ($HS_RESPONSE->HS_ACTION == "LOAD"){
    if($HS_RESPONSE->HS_OBJECT == "CUSTOMER"){
        $DAO = new CustomerSql(
            $GLOBALS['MYSQL_SERVER'],
            $GLOBALS['MYSQL_USER'],
            $GLOBALS['MYSQL_PASSWORD'],
            $GLOBALS['MYSQL_DATABASE'],
            $GLOBALS['MYSQL_SSL_KEY'],
            $GLOBALS['MYSQL_SSL_CERT'],
            $GLOBALS['MYSQL_SSL_CA'],
            $DEBUG,
            $HS_COMMIT
            
        );
        $HS_RETURN->HS_CUSTOMERLIST = $DAO->list(5, $HS_RESPONSE->HS_CURSOR, $HS_RESPONSE->HS_PAGE, $HS_RESPONSE->HS_CUST_SORT, $HS_RESPONSE->HS_CUST_SEARCH );
    } else if ($HS_RESPONSE->HS_OBJECT == "ADDRESS"){
        $DAO = new AddressSql(
            $GLOBALS['MYSQL_SERVER'],
            $GLOBALS['MYSQL_USER'],
            $GLOBALS['MYSQL_PASSWORD'],
            $GLOBALS['MYSQL_DATABASE'],
            $GLOBALS['MYSQL_SSL_KEY'],
            $GLOBALS['MYSQL_SSL_CERT'],
            $GLOBALS['MYSQL_SSL_CA'],
            $DEBUG,
            $HS_COMMIT
        );        
        $HS_RETURN->HS_ADDRESSLIST = $DAO->list(5, $HS_RESPONSE->HS_AcustID, $HS_RESPONSE->HS_ACURSOR, $HS_RESPONSE->HS_APAGE, $HS_RESPONSE->HS_ADR_SORT, $HS_RESPONSE->HS_ADR_SEARCH) ;
    } else if ($HS_RESPONSE->HS_OBJECT == "PACKAGE"){
        $DAO = new PackageSql(
            $GLOBALS['MYSQL_SERVER'],
            $GLOBALS['MYSQL_USER'],
            $GLOBALS['MYSQL_PASSWORD'],
            $GLOBALS['MYSQL_DATABASE'],
            $GLOBALS['MYSQL_SSL_KEY'],
            $GLOBALS['MYSQL_SSL_CERT'],
            $GLOBALS['MYSQL_SSL_CA'],
            $DEBUG,
            $HS_COMMIT
        );        
        $HS_RETURN->HS_PACKAGELIST = $DAO->list(5, $HS_RESPONSE->HS_PcustID, $HS_RESPONSE->HS_PCURSOR, $HS_RESPONSE->HS_PPAGE, $HS_RESPONSE->HS_PAK_SORT, $HS_RESPONSE->HS_PAK_SEARCH) ;
    } else if ($HS_RESPONSE->HS_OBJECT == "PAYMENT"){
        $DAO = new PaymentSql(
            $GLOBALS['MYSQL_SERVER'],
            $GLOBALS['MYSQL_USER'],
            $GLOBALS['MYSQL_PASSWORD'],
            $GLOBALS['MYSQL_DATABASE'],
            $GLOBALS['MYSQL_SSL_KEY'],
            $GLOBALS['MYSQL_SSL_CERT'],
            $GLOBALS['MYSQL_SSL_CA'],
            $DEBUG,
            $HS_COMMIT
        );        
        $HS_RETURN->HS_PAYMENTLIST = $DAO->list(5, $HS_RESPONSE->HS_PMcustID, $HS_RESPONSE->HS_PMCURSOR, $HS_RESPONSE->HS_PMPAGE, $HS_RESPONSE->HS_PAY_SORT, $HS_RESPONSE->HS_PAY_SEARCH) ;
    } else if ($HS_RESPONSE->HS_OBJECT == "SHIPMENT"){
        $DAO = new ShipmentSql(
            $GLOBALS['MYSQL_SERVER'],
            $GLOBALS['MYSQL_USER'],
            $GLOBALS['MYSQL_PASSWORD'],
            $GLOBALS['MYSQL_DATABASE'],
            $GLOBALS['MYSQL_SSL_KEY'],
            $GLOBALS['MYSQL_SSL_CERT'],
            $GLOBALS['MYSQL_SSL_CA'],
            $DEBUG,
            $HS_COMMIT
        );        
        $HS_RETURN->HS_SHIPMENTLIST = $DAO->list(5, $HS_RESPONSE->HS_ScustID, $HS_RESPONSE->HS_SCURSOR, $HS_RESPONSE->HS_SPAGE, $HS_RESPONSE->HS_SHIP_SORT, $HS_RESPONSE->HS_SHIP_SEARCH) ;
    }
    
} else if($HS_RESPONSE->HS_ACTION == "CREATE"){
    if($HS_RESPONSE->HS_OBJECT == "CUSTOMER"){
        $newCustomer = (Array) $HS_RESPONSE->HS_CUSTOMER;
        if ($DEBUG){
            trigger_error("Customer Array: ". json_encode($newCustomer));   
        }
        $DAO = new CustomerSql(
            $GLOBALS['MYSQL_SERVER'],
            $GLOBALS['MYSQL_USER'],
            $GLOBALS['MYSQL_PASSWORD'],
            $GLOBALS['MYSQL_DATABASE'],
            $GLOBALS['MYSQL_SSL_KEY'],
            $GLOBALS['MYSQL_SSL_CERT'],
            $GLOBALS['MYSQL_SSL_CA'],
            $DEBUG,
            $HS_COMMIT
        );
        $HS_RETURN->HS_NEWCUSTOMER = $DAO->create($newCustomer);
        $HS_RETURN->HS_CUSTOMERLIST = $DAO->list(5, $HS_RESPONSE->HS_CURSOR, $HS_RESPONSE->HS_PAGE, $HS_RESPONSE->HS_CUST_SORT, $HS_RESPONSE->HS_CUST_SEARCH );
    } else if($HS_RESPONSE->HS_OBJECT == "ADDRESS"){
        $new = (Array) $HS_RESPONSE->HS_ADDRESS;
        if ($DEBUG){
            trigger_error("Address Array: ". json_encode($new));   
        }
        $DAO = new AddressSql(
            $GLOBALS['MYSQL_SERVER'],
            $GLOBALS['MYSQL_USER'],
            $GLOBALS['MYSQL_PASSWORD'],
            $GLOBALS['MYSQL_DATABASE'],
            $GLOBALS['MYSQL_SSL_KEY'],
            $GLOBALS['MYSQL_SSL_CERT'],
            $GLOBALS['MYSQL_SSL_CA'],
            $DEBUG,
            $HS_COMMIT
        );
        $HS_RETURN->HS_NEWADDRESS = $DAO->create($new);
        $HS_RETURN->HS_ADDRESSLIST = $DAO->list(5, $HS_RESPONSE->HS_AcustID, $HS_RESPONSE->HS_ACURSOR, $HS_RESPONSE->HS_APAGE, $HS_RESPONSE->HS_ADR_SORT, $HS_RESPONSE->HS_ADR_SEARCH) ;
    } else if($HS_RESPONSE->HS_OBJECT == "PACKAGE"){
        $new = (Array) $HS_RESPONSE->HS_PACKAGE;
        if ($DEBUG){
            trigger_error("Package Array: ". json_encode($new));   
        }
        $DAO = new PackageSql(
            $GLOBALS['MYSQL_SERVER'],
            $GLOBALS['MYSQL_USER'],
            $GLOBALS['MYSQL_PASSWORD'],
            $GLOBALS['MYSQL_DATABASE'],
            $GLOBALS['MYSQL_SSL_KEY'],
            $GLOBALS['MYSQL_SSL_CERT'],
            $GLOBALS['MYSQL_SSL_CA'],
            $DEBUG,
            $HS_COMMIT
        );
        $HS_RETURN->HS_NEWPACKAGE = $DAO->create($new);
        $HS_RETURN->HS_PACKAGELIST = $DAO->list(5, $HS_RESPONSE->HS_PcustID, $HS_RESPONSE->HS_PCURSOR, $HS_RESPONSE->HS_PPAGE, $HS_RESPONSE->HS_PAK_SORT, $HS_RESPONSE->HS_PAK_SEARCH) ;
    } else if($HS_RESPONSE->HS_OBJECT == "PAYMENT"){
        $new = (Array) $HS_RESPONSE->HS_PAYMENT;
        if ($DEBUG){
            trigger_error("PAYMENT Array: ". json_encode($new));   
        }
        $DAO = new PaymentSql(
            $GLOBALS['MYSQL_SERVER'],
            $GLOBALS['MYSQL_USER'],
            $GLOBALS['MYSQL_PASSWORD'],
            $GLOBALS['MYSQL_DATABASE'],
            $GLOBALS['MYSQL_SSL_KEY'],
            $GLOBALS['MYSQL_SSL_CERT'],
            $GLOBALS['MYSQL_SSL_CA'],
            $DEBUG,
            $HS_COMMIT
        );
        $HS_RETURN->HS_NEWPAYMENT = $DAO->create($new);
        $HS_RETURN->HS_PAYMENTLIST = $DAO->list(5, $HS_RESPONSE->HS_PMcustID, $HS_RESPONSE->HS_PMCURSOR, $HS_RESPONSE->HS_PMPAGE, $HS_RESPONSE->HS_PAY_SORT, $HS_RESPONSE->HS_PAY_SEARCH) ;
    } else if($HS_RESPONSE->HS_OBJECT == "SHIPMENT"){
        $new = (Array) $HS_RESPONSE->HS_SHIPMENT;
        if ($DEBUG){
            trigger_error("SHIPMENT Array: ". json_encode($new));   
        }
        $DAO = new ShipmentSql(
            $GLOBALS['MYSQL_SERVER'],
            $GLOBALS['MYSQL_USER'],
            $GLOBALS['MYSQL_PASSWORD'],
            $GLOBALS['MYSQL_DATABASE'],
            $GLOBALS['MYSQL_SSL_KEY'],
            $GLOBALS['MYSQL_SSL_CERT'],
            $GLOBALS['MYSQL_SSL_CA'],
            $DEBUG,
            $HS_COMMIT
        );
        $HS_RETURN->HS_NEWSHIPMENT = $DAO->create($new);
        $HS_RETURN->HS_SHIPMENTLIST = $DAO->list(5, $HS_RESPONSE->HS_ScustID, $HS_RESPONSE->HS_SCURSOR, $HS_RESPONSE->HS_SPAGE, $HS_RESPONSE->HS_SHIP_SORT, $HS_RESPONSE->HS_SHIP_SEARCH) ;
    }
} else if($HS_RESPONSE->HS_ACTION == "UPDATE"){
    if($HS_RESPONSE->HS_OBJECT == "CUSTOMER"){
        $updateCustomer = (Array) $HS_RESPONSE->HS_CUSTOMER;
        if ($DEBUG){
            trigger_error("Customer Array: ". json_encode($updateCustomer));   
        }
        $DAO = new CustomerSql(
            $GLOBALS['MYSQL_SERVER'],
            $GLOBALS['MYSQL_USER'],
            $GLOBALS['MYSQL_PASSWORD'],
            $GLOBALS['MYSQL_DATABASE'],
            $GLOBALS['MYSQL_SSL_KEY'],
            $GLOBALS['MYSQL_SSL_CERT'],
            $GLOBALS['MYSQL_SSL_CA'],
            $DEBUG,
            $HS_COMMIT
        );
        $HS_RETURN->HS_ROWSAFFECTED = $DAO->update($updateCustomer);
        $HS_RETURN->HS_CUSTOMERLIST = $DAO->list(5, $HS_RESPONSE->HS_CURSOR, $HS_RESPONSE->HS_PAGE, $HS_RESPONSE->HS_CUST_SORT, $HS_RESPONSE->HS_CUST_SEARCH );
    } else if($HS_RESPONSE->HS_OBJECT == "ADDRESS"){
        $updateAddress = (Array) $HS_RESPONSE->HS_ADDRESS;
        if ($DEBUG){
            trigger_error("Customer Array: ". json_encode($updateAddress));   
        }
        $DAO = new AddressSql(
            $GLOBALS['MYSQL_SERVER'],
            $GLOBALS['MYSQL_USER'],
            $GLOBALS['MYSQL_PASSWORD'],
            $GLOBALS['MYSQL_DATABASE'],
            $GLOBALS['MYSQL_SSL_KEY'],
            $GLOBALS['MYSQL_SSL_CERT'],
            $GLOBALS['MYSQL_SSL_CA'],
            $DEBUG,
            $HS_COMMIT
        );
        $HS_RETURN->HS_ROWSAFFECTED = $DAO->update($updateAddress);
        $HS_RETURN->HS_ADDRESSLIST = $DAO->list(5, $HS_RESPONSE->HS_AcustID, $HS_RESPONSE->HS_ACURSOR, $HS_RESPONSE->HS_APAGE, $HS_RESPONSE->HS_ADR_SORT, $HS_RESPONSE->HS_ADR_SEARCH);
    } else if($HS_RESPONSE->HS_OBJECT == "PACKAGE"){
        $updatePackage = (Array) $HS_RESPONSE->HS_PACKAGE;
        if ($DEBUG){
            trigger_error("Package Array: ". json_encode($updatePackage));   
        }
        $DAO = new PackageSql(
            $GLOBALS['MYSQL_SERVER'],
            $GLOBALS['MYSQL_USER'],
            $GLOBALS['MYSQL_PASSWORD'],
            $GLOBALS['MYSQL_DATABASE'],
            $GLOBALS['MYSQL_SSL_KEY'],
            $GLOBALS['MYSQL_SSL_CERT'],
            $GLOBALS['MYSQL_SSL_CA'],
            $DEBUG,
            $HS_COMMIT
        );
        $HS_RETURN->HS_ROWSAFFECTED = $DAO->update($updatePackage);
        $HS_RETURN->HS_PACKAGELIST = $DAO->list(5, $HS_RESPONSE->HS_PcustID, $HS_RESPONSE->HS_PCURSOR, $HS_RESPONSE->HS_PPAGE, $HS_RESPONSE->HS_PAK_SORT, $HS_RESPONSE->HS_PAK_SEARCH) ;
    } else if($HS_RESPONSE->HS_OBJECT == "PAYMENT"){
        $updatePayment = (Array) $HS_RESPONSE->HS_PAYMENT;
        if ($DEBUG){
            trigger_error("Package Array: ". json_encode($updatePayment));   
        }
        $DAO = new PaymentSql(
            $GLOBALS['MYSQL_SERVER'],
            $GLOBALS['MYSQL_USER'],
            $GLOBALS['MYSQL_PASSWORD'],
            $GLOBALS['MYSQL_DATABASE'],
            $GLOBALS['MYSQL_SSL_KEY'],
            $GLOBALS['MYSQL_SSL_CERT'],
            $GLOBALS['MYSQL_SSL_CA'],
            $DEBUG,
            $HS_COMMIT
        );
        $HS_RETURN->HS_ROWSAFFECTED = $DAO->update($updatePayment);
        $HS_RETURN->HS_PAYMENTLIST = $DAO->list(5, $HS_RESPONSE->HS_PMcustID, $HS_RESPONSE->HS_PMCURSOR, $HS_RESPONSE->HS_PMPAGE, $HS_RESPONSE->HS_PAY_SORT, $HS_RESPONSE->HS_PAY_SEARCH) ;
    } else if($HS_RESPONSE->HS_OBJECT == "SHIPMENT"){
        $updateShipment = (Array) $HS_RESPONSE->HS_SHIPMENT;
        if ($DEBUG){
            trigger_error("Shipment Array: ". json_encode($updateShipment));   
        }
        $DAO = new ShipmentSql(
            $GLOBALS['MYSQL_SERVER'],
            $GLOBALS['MYSQL_USER'],
            $GLOBALS['MYSQL_PASSWORD'],
            $GLOBALS['MYSQL_DATABASE'],
            $GLOBALS['MYSQL_SSL_KEY'],
            $GLOBALS['MYSQL_SSL_CERT'],
            $GLOBALS['MYSQL_SSL_CA'],
            $DEBUG,
            $HS_COMMIT
        );
        $HS_RETURN->HS_ROWSAFFECTED = $DAO->update($updateShipment);
        $HS_RETURN->HS_SHIPMENTLIST = $DAO->list(5, $HS_RESPONSE->HS_ScustID, $HS_RESPONSE->HS_SCURSOR, $HS_RESPONSE->HS_SPAGE, $HS_RESPONSE->HS_SHIP_SORT, $HS_RESPONSE->HS_SHIP_SEARCH) ;
    }

} else if($HS_RESPONSE->HS_ACTION == "DELETE"){
    trigger_error("I'M STARTING TO DELETE: ");
    if($HS_RESPONSE->HS_OBJECT == "CUSTOMER"){
        trigger_error("I'M DELETING CUSTOMERS: ");
        $DAO = new CustomerSql(
            $GLOBALS['MYSQL_SERVER'],
            $GLOBALS['MYSQL_USER'],
            $GLOBALS['MYSQL_PASSWORD'],
            $GLOBALS['MYSQL_DATABASE'],
            $GLOBALS['MYSQL_SSL_KEY'],
            $GLOBALS['MYSQL_SSL_CERT'],
            $GLOBALS['MYSQL_SSL_CA'],
            $DEBUG,
            $HS_COMMIT
        );
        trigger_error("DELETE ID: ". $HS_RESPONSE->HS_DELID);
        $HS_RETURN->HS_ROWSAFFECTED = $DAO->delete($HS_RESPONSE->HS_DELID);
        $HS_RETURN->HS_CUSTOMERLIST = $DAO->list(5, $HS_RESPONSE->HS_CURSOR, $HS_RESPONSE->HS_PAGE, $HS_RESPONSE->HS_CUST_SORT, $HS_RESPONSE->HS_CUST_SEARCH );
    } else if($HS_RESPONSE->HS_OBJECT == "ADDRESS"){
        if ($DEBUG){
            trigger_error("Customer Array: ". json_encode($updateAddress));   
        }
        $DAO = new AddressSql(
            $GLOBALS['MYSQL_SERVER'],
            $GLOBALS['MYSQL_USER'],
            $GLOBALS['MYSQL_PASSWORD'],
            $GLOBALS['MYSQL_DATABASE'],
            $GLOBALS['MYSQL_SSL_KEY'],
            $GLOBALS['MYSQL_SSL_CERT'],
            $GLOBALS['MYSQL_SSL_CA'],
            $DEBUG,
            $HS_COMMIT
        );
        trigger_error("DELETE ID: ". $HS_RESPONSE->HS_ADELID);
        $HS_RETURN->HS_ROWSAFFECTED = $DAO->delete($HS_RESPONSE->HS_ADELID);
        $HS_RETURN->HS_ADDRESSLIST = $DAO->list(5, $HS_RESPONSE->HS_AcustID, $HS_RESPONSE->HS_ACURSOR, $HS_RESPONSE->HS_APAGE, $HS_RESPONSE->HS_ADR_SORT, $HS_RESPONSE->HS_ADR_SEARCH);
    } else if($HS_RESPONSE->HS_OBJECT == "PACKAGE"){
        $DAO = new PackageSql(
            $GLOBALS['MYSQL_SERVER'],
            $GLOBALS['MYSQL_USER'],
            $GLOBALS['MYSQL_PASSWORD'],
            $GLOBALS['MYSQL_DATABASE'],
            $GLOBALS['MYSQL_SSL_KEY'],
            $GLOBALS['MYSQL_SSL_CERT'],
            $GLOBALS['MYSQL_SSL_CA'],
            $DEBUG,
            $HS_COMMIT
        );
        trigger_error("DELETE ID: ". $HS_RESPONSE->HS_PDELID);
        $HS_RETURN->HS_ROWSAFFECTED = $DAO->delete($HS_RESPONSE->HS_PDELID);
        $HS_RETURN->HS_PACKAGELIST = $DAO->list(5, $HS_RESPONSE->HS_PcustID, $HS_RESPONSE->HS_PCURSOR, $HS_RESPONSE->HS_PPAGE, $HS_RESPONSE->HS_PAK_SORT, $HS_RESPONSE->HS_PAK_SEARCH) ;
    } else if($HS_RESPONSE->HS_OBJECT == "PAYMENT"){
        $DAO = new PaymentSql(
            $GLOBALS['MYSQL_SERVER'],
            $GLOBALS['MYSQL_USER'],
            $GLOBALS['MYSQL_PASSWORD'],
            $GLOBALS['MYSQL_DATABASE'],
            $GLOBALS['MYSQL_SSL_KEY'],
            $GLOBALS['MYSQL_SSL_CERT'],
            $GLOBALS['MYSQL_SSL_CA'],
            $DEBUG,
            $HS_COMMIT
        );
        trigger_error("DELETE ID: ". $HS_RESPONSE->HS_PMDELID);
        $HS_RETURN->HS_ROWSAFFECTED = $DAO->delete($HS_RESPONSE->HS_PMDELID);
        $HS_RETURN->HS_PAYMENTLIST = $DAO->list(5, $HS_RESPONSE->HS_PMcustID, $HS_RESPONSE->HS_PMCURSOR, $HS_RESPONSE->HS_PMPAGE, $HS_RESPONSE->HS_PAY_SORT, $HS_RESPONSE->HS_PAY_SEARCH) ;
    } else if($HS_RESPONSE->HS_OBJECT == "SHIPMENT"){
        $DAO = new ShipmentSql(
            $GLOBALS['MYSQL_SERVER'],
            $GLOBALS['MYSQL_USER'],
            $GLOBALS['MYSQL_PASSWORD'],
            $GLOBALS['MYSQL_DATABASE'],
            $GLOBALS['MYSQL_SSL_KEY'],
            $GLOBALS['MYSQL_SSL_CERT'],
            $GLOBALS['MYSQL_SSL_CA'],
            $DEBUG,
            $HS_COMMIT
        );
        trigger_error("DELETE ID: ". $HS_RESPONSE->HS_SDELID);
        $HS_RETURN->HS_ROWSAFFECTED = $DAO->delete($HS_RESPONSE->HS_SDELID);
        $HS_RETURN->HS_SHIPMENTLIST = $DAO->list(5, $HS_RESPONSE->HS_ScustID, $HS_RESPONSE->HS_SCURSOR, $HS_RESPONSE->HS_SPAGE, $HS_RESPONSE->HS_SHIP_SORT, $HS_RESPONSE->HS_SHIP_SEARCH) ;
    }
} else if ($HS_RESPONSE->HS_ACTION == "LOOKUP"){
    trigger_error("I'M STARTING TO LOOKUP: ");
    if($HS_RESPONSE->HS_OBJECT == "CUSTOMER"){
        trigger_error("I'M LOOKING UP CUSTOMERS: ");
        $DAO = new CustomerSql(
            $GLOBALS['MYSQL_SERVER'],
            $GLOBALS['MYSQL_USER'],
            $GLOBALS['MYSQL_PASSWORD'],
            $GLOBALS['MYSQL_DATABASE'],
            $GLOBALS['MYSQL_SSL_KEY'],
            $GLOBALS['MYSQL_SSL_CERT'],
            $GLOBALS['MYSQL_SSL_CA'],
            $DEBUG,
            $HS_COMMIT
        );
        trigger_error("LOOKUP ID: ". $HS_RESPONSE->HS_LOOKUPID);
        $HS_RETURN->HS_LOOKUP_CUST = $DAO->read($HS_RESPONSE->HS_LOOKUPID);
    }    
}

if ($DEBUG){
    trigger_error("JSON RETURN: ". json_encode($HS_RETURN));   
}

echo(json_encode($HS_RETURN));
?>