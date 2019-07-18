<?php
/*
Very Simple Synchronous PHP API
*/
//Data Models Used
use Hermes\DataModel\CustomerSql;

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
$HS_COMMIT=false;
if($HS_RESPONSE->HS_COMMIT = "COMMIT"){
    $HS_COMMIT = true;
}


//SERVER RESPONSES
if ($HS_RESPONSE->HS_ACTION == "LOAD"){
    if($HS_RESPONSE->HS_OBJECT == "CUSTOMER"){
        $customerDAO = new CustomerSql(
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
        $HS_RETURN->HS_CUSTOMERLIST = $customerDAO->listCustomers(5, $HS_RESPONSE->HS_CURSOR, $HS_RESPONSE->HS_PAGE);
    }

} else if($HS_RESPONSE->HS_ACTION == "CREATE"){
    if($HS_RESPONSE->HS_OBJECT == "CUSTOMER"){
        $newCustomer = (Array) $HS_RESPONSE->HS_CUSTOMER;
        if ($DEBUG){
            trigger_error("Customer Array: ". json_encode($newCustomer));   
        }
        $customerDAO = new CustomerSql(
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
        $HS_RETURN->HS_NEWCUSTOMER = $customerDAO->create($newCustomer);
        $HS_RETURN->HS_CUSTOMERLIST = $customerDAO->listCustomers(5, $HS_RESPONSE->HS_CURSOR, $HS_RESPONSE->HS_PAGE);
    }
}

if ($DEBUG){
    trigger_error("JSON RETURN: ". json_encode($HS_RETURN));   
}

echo(json_encode($HS_RETURN));
?>