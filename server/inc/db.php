<?php
$servername = $GLOBALS['MYSQL_SERVER'];
$username = $GLOBALS['MYSQL_USER'];
$password = $GLOBALS['MYSQL_PASSWORD'];
$dbname = $GLOBALS['MYSQL_DATABASE'];
$clientkey = $GLOBALS['MYSQL_SSL_KEY'];
$clientcert = $GLOBALS['MYSQL_SSL_CERT'];
$serverca = $GLOBALS['MYSQL_SSL_CA'];
$db_response = "";

$dbconn = mysqli_init();

if (!$dbconn)
  {
    trigger_error('SQL INIT ERROR: '. $dbconn->connect_error);
  }

if (!$dbconn->options(MYSQLI_INIT_COMMAND, 'SET AUTOCOMMIT = 0')) 
    {
      trigger_error('Setting MYSQLI_INIT_COMMAND failed');
    }

//$dbconn->autocommit(false);

$dbconn->ssl_set($clientkey, $clientcert, $serverca,NULL,NULL);
//MYSQLI_CLIENT_SSL_DONT_VERIFY_SERVER_CERT MYSQLI_CLIENT_SSL
if (!$dbconn->real_connect($servername,$username,$password,$dbName,3306,NULL,MYSQLI_CLIENT_SSL_DONT_VERIFY_SERVER_CERT))
    {
      trigger_error('Connect Error (' . mysqli_connect_errno() . ') '. mysqli_connect_error());
      die('Connect Error (' . mysqli_connect_errno() . ') '. mysqli_connect_error());
    }

  trigger_error('Success... ' . $dbconn->host_info);


?>