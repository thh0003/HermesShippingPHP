<?php
$servername = "130.211.118.121";
$username = "hsAdmin";
$password = "skfjlkdWEicOI2009@dsa!klsi";
$dbname = "Hermes_Shipping_DB";
$db_response = "";

$dbconn=mysqli_init();
if (!$dbconn)
  {
    $logger->error('SQL INIT ERROR: '. $dbconn->connect_error);
//  die("mysqli_init failed");
  }

$dbconn->ssl_set('db-client-key.pem', 'db-client-cert.pem', 'db-server-ca.pem',NULL,NULL);
$dbconn->real_connect($servername,$username,$password,$dbName);
$dbconn->autocommit(false);

if ($dbconn->connect_error){
    $logger->error('SQL CONNECTION ERROR: '. $dbconn->connect_error);
//    die($dbconn->connect_error);
}

?>