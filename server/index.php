<?php
/**
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Ensure the required environment variables are set to run the application
require('inc/hs_logger.php');

if (!getenv('MYSQL_DSN') || !getenv('MYSQL_USER') || false === getenv('MYSQL_PASSWORD')) {
    $logger->error('Set MYSQL_DSN, MYSQL_USER, and MYSQL_PASSWORD environment variables');
//    die('Set MYSQL_DSN, MYSQL_USER, and MYSQL_PASSWORD environment variables');
}

require('inc/hs_server.php');
