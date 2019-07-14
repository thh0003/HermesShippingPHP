<?php
require('inc/db.php');


$DEBUG = false;

if (!isset($HS_RETURN)) {
    $HS_RETURN = new stdClass();
}
    
$HS_RETURN->DEBUG = $DEBUG;


?>