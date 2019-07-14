<?php
require __DIR__ . '/vendor/autoload.php';

use Google\Cloud\Logging\LoggingClient;

// Create a PSR-3-Compatible logger
$logger = LoggingClient::psrBatchLogger('app');

/* Log messages with varying log levels.
$logger->info('This will show up as log level INFO');
$logger->warning('This will show up as log level WARNING');
$logger->error('This will show up as log level ERROR');
*/
?>