<?php

if (!$dbconn->close())
  {
    trigger_error('SQL INIT ERROR: '. $dbconn->connect_error);
  }

?>