<?php

function printItem ($array){
    foreach ($array as $key => $value) {
        echo "Key: $key; Value: $value\n";
    }
}

echo "GLOBALS: \n";
printItem($GLOBALS);
echo "SERVER: \n";
printItem($_SERVER);
echo "REQUEST: \n";
printItem($_REQUEST);
echo "POST: \n";
printItem( $_POST);
echo "GET: \n";
printItem( $_GET);
echo "FILES: \n";
printItem($_FILES);
echo "ENV: \n";
printItem( $_ENV);
echo "COOKIE: \n";
printItem( $_COOKIE);
echo "SESSION: \n";
printItem($_SESSION);
echo "hello world!";

?>