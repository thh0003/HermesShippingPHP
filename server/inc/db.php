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

$dbconn = mysqli_init();
if (!$dbconn)
  {
    $logger->error('SQL INIT ERROR: '. $dbconn->connect_error);
  }

if (!$mysqli->options(MYSQLI_INIT_COMMAND, 'SET AUTOCOMMIT = 0')) 
    {
        $logger->error('Setting MYSQLI_INIT_COMMAND failed');
    }

//$dbconn->autocommit(false);

$dbconn->ssl_set($clientkey, $clientcert, $serverca,NULL,NULL);
if (!$dbconn->real_connect($servername,$username,$password,$dbName))
    {
        $logger->error('Connect Error (' . mysqli_connect_errno() . ') '. mysqli_connect_error());
    }

$logger->info('Success... ' . $dbconn->host_info );

?>