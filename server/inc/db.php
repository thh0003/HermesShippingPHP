<?php
$servername = getenv('MYSQL_SERVER');
$username = getenv('MYSQL_USER');
$password = getenv('MYSQL_PASSWORD');
$dbname = getenv('MYSQL_DATABASE');
$clientkey = getenv('MYSQL_SSL_KEY');
$clientcert = getenv('MYSQL_SSL_CERT');
$serverca = getenv('MYSQL_SSL_CA');
$db_response = "";

use mysqli;

$dbconn=mysqli_init();
if (!$dbconn)
  {
    $logger->error('SQL INIT ERROR: '. $dbconn->connect_error);
  }

$dbconn->ssl_set($clientkey, $clientcert, $serverca,NULL,NULL);
$dbconn->real_connect($servername,$username,$password,$dbName);
$dbconn->autocommit(false);

if ($dbconn->connect_error){
    $logger->error('SQL CONNECTION ERROR: '. $dbconn->connect_error);
}

?>