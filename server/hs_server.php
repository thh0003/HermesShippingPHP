<?php
/*
Very Simple Synchronous PHP API
*/
//Data Models Used
use Hermes\DataModel\CustomerSql;
use Hermes\DataModel\AddressSql;

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