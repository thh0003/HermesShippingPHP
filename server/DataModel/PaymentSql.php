<?php
/*
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
namespace Hermes\DataModel;

/**
 * Class Sql implements the DataModelInterface with a mysql or postgres database.
 *
 */
class PaymentSql implements PAYModelInterface
{

    private $servername;
    private $username;
    private $password;
    private $dbname;
    private $clientkey;
    private $clientcert;
    private $serverca;
    private $commit;

    public function __construct($server,$user,$pwd,$db,$key,$cert,$ca,$debug=false,$commit=false)
    {
        $this->servername = $server;
        $this->username = $user;
        $this->password = $pwd;
        $this->dbname = $db;
        $this->clientkey = $key;
        $this->clientcert = $cert;
        $this->serverca = $ca;
        $this->DEBUG = $debug;
        $this->bindlist = "sssssisss";
        $this->commit = $commit;

        $this->columnNames = array(
            'Paymentidentifier', //Binary UUID
            'Useridentifier', //Binary UUID
            'Bill To Addressidentifier', //Binary UUID
            'Account Number', //Varchar
            'Account Name', //Varchar
            'Payment Type', //int
            'Exp Date', //Varchar
            'CSV Code', //Varchar
            'Account Routing'   //Varchar         
        );

    }

    public function setCommit($commit){
        return $this->commit = $commit;
    }

    public function getCommit(){
        return $this->commit;
    }

    /**
     * Creates a new mySQLi instance and sets error mode to exception.
     *
     * @return mySQLi
     */
    private function newConnection()
    {
        $dbconn = mysqli_init();
        if (!$dbconn)
            {
                trigger_error('SQL INIT ERROR: '. $dbconn->connect_error);
            }

        $dbconn->ssl_set($this->clientkey, $this->clientcert, $this->serverca,NULL,NULL);
        if (!$dbconn->real_connect($this->servername,$this->username,$this->password,$this->dbname,3306,NULL,MYSQLI_CLIENT_SSL_DONT_VERIFY_SERVER_CERT)){
            trigger_error('Connect Error (' . mysqli_connect_errno() . ') '. mysqli_connect_error());
            die('Connect Error (' . mysqli_connect_errno() . ') '. mysqli_connect_error());
        }

        if (!$dbconn->autocommit(false)) 
        {
            trigger_error('Setting Autocommit to False failed');
        }


        if($this->DEBUG){
            trigger_error("mySQLI Status: ".$dbconn->server_info." Database: ".$dbconn->host_info);
        }


        return $dbconn;
    }

    /**
     * Throws an exception if $address contains an invalid key.
     *
     * @param $address array
     *
     * @throws \Exception
     */
    private function verify($list)
    {
        if ($invalid = array_diff_key($list, array_flip($this->columnNames))) {
            throw new \Exception(sprintf(
                'unsupported USER PAYMENT properties: "%s"',
                implode(', ', $invalid)
            ));
        }
    }

    /*
        list = list addresses to a limit.  Uses the AddressHex view vs Address Relation.  AddressHex simply converts the 'Useridentifier' and addressidentifier column to Hex format
    */
    public function list($limit = 10, $ID, $cursor = 0, $page = null, $sort='Account Name', $search=null)
    {
        $dbconn = $this->newConnection();
        $query = "SELECT * FROM `PaymentHex` WHERE `Useridentifier` = ? ";
        $PBlist = "s";
        $PBargs = Array();
        $PBargs[] = $ID;

        if (!$sort){
            $sort='Account Name';
        }
        
        if($this->DEBUG){
            trigger_error("mySQLI Status: ".$dbconn->server_info." Database: ".$dbconn->host_info." Limit, Cursor: ". $limit . $cursor);
        }

        if($search){
            // Add Search
            $PBlist = $PBlist."s";
            $search = "%$search%";
            $PBargs[] = $search;

            if($this->DEBUG){
                trigger_error("Search With wildcard: $search");
            }
            $query = $query."AND `Account Name` LIKE ? ";
        }

        $query = $query."ORDER BY `$sort` ASC";
        
        if($statement = $dbconn->prepare($query)){
            if($this->DEBUG){
                trigger_error("Query: ".$query." Bind List Count: ".count($PBargs));
            }
            $statement->bind_param($PBlist,...$PBargs);
        }else{
            trigger_error("mySQLI Error: ".$dbconn->error." Error Number: ".$dbconn->errno);
            die("mySQLI Error: ".$dbconn->error." Error Number: ".$dbconn->errno);
        }

        if($this->DEBUG){
            trigger_error("Query: ".$query);
        }

        $statement->execute();
        $rows = array();
        $rowHeaders = array();

        if($this->DEBUG){
            trigger_error("mySQLI Status: ".$dbconn->server_info." Database: ".$dbconn->host_info." Limit, Cursor: $limit, $cursor");
        }

        //Get the Domains
        $meta = $statement->result_metadata(); 
        while ($rowHeader = $meta->fetch_field()) 
        { 
            array_push($rowHeaders, $rowHeader->name); 
        } 

        //Get the Tuples
        $statement->execute();
        $resultSet = $statement->get_result();
        $startrow = $cursor;
        $rowCount = $resultSet->num_rows;
        if($this->DEBUG){
            trigger_error("Startrow: $startrow Cursor: $cursor Rows: $rowCount");
        }
        if ($cursor<0){
                $startrow = 0;
                $cursor = 0;
        }
        $resultSet->data_seek($startrow);
        $x = 0;
        $row = $resultSet->fetch_array(MYSQLI_ASSOC);
        while ($row && ($x < $limit)) {
            
            trigger_error("Account Number: ".$row['Account Number']);
            $rows[]= $row;
            $row = $resultSet->fetch_array(MYSQLI_ASSOC);
            $x++;
            $cursor++;
        }

        $dbconn->close();

        if($this->DEBUG){
            trigger_error("Account Number: ". $rows[0]['Account Number']);
        }

        $retArray = array(
            'hspaymentColumns' => $rowHeaders,
            'hspayments' => $rows,
            'cursor' => $cursor,
        );

        return $retArray;
    }

    public function create($payment, $id = null)
    {
        $this->verify($payment);
        if ($id) {
            $payment['Paymentidentifier'] = $id;
        }
        $dbconn = $this->newConnection();
        $names = array_keys($payment);
//        $paymentID = "UNHEX('".array_shift($payment)."')";
        $userID = "UNHEX('".array_shift($payment)."')";
        $billAdr = "UNHEX('".array_shift($payment)."')";
        $paymentValues = array_values($payment);
        $sql = sprintf(
            "INSERT INTO `Payment Method` (`%s`)",
            implode('`, `', $names));
      
        $sql = $sql." VALUES ($userID, $billAdr,?,?,?,?,?,?)" ;

        if($this->DEBUG){
            trigger_error("SQL: ". $sql);
            trigger_error("Insert Values: ". implode(', ', $paymentValues));
        }

        if($statement = $dbconn->prepare($sql) ){
            if($statement->bind_param("ssisss", ...$paymentValues)){
                if($insertID=$statement->execute()){
                    trigger_error("Committing set to: ". $this->commit);
                    if($this->commit){
                        if($dbconn->commit()){
                            trigger_error("I'm Committing: ". $this->commit);
                            return $insertID;
                        } else{
                            $insertID = "ERROR: ".$dbconn->error;
                            $dbconn->close();
                            return $insertID;
                        }
                        $insertID = $statement->insert_id;
                        $dbconn->close();
                        return $insertID; 
                    }
                } else{
                    $insertID = "ERROR: ".$statement->error;
                    $dbconn->close();
                    return $insertID;                    
                }
            } else{
                $insertID = "ERROR: ".$statement->error;
                $dbconn->close();
                return $insertID;
            }
        } else{
            $insertID = "ERROR: ".$dbconn->error;
            $dbconn->close();
            return $insertID;
        }
        $dbconn->close();
        return $insertID;

    }

    public function read($id)
    {
        $dbconn = $this->newConnection();
        $statement = $dbconn->prepare('SELECT * FROM `PaymentHex` WHERE Useridentifier = ?');
        $statement->bind_param('s', $id);
        $statement->execute();
        $readaddress = $statement->fetch();
        $dbconn->close();
        return $readaddress;
    }

    public function update($payment)
    {

        $this->verify($payment);
        $dbconn = $this->newConnection();
        $paymentID = "UNHEX('".array_shift($payment)."')";
        $userID = "UNHEX('".array_shift($payment)."')";
        $billAdr = "UNHEX('".array_shift($payment)."')";
        $names = array_keys($payment);
        $paymentValues = array_values($payment);
        $sql = sprintf(
            "UPDATE `Payment Method` SET `Useridentifier`=$userID, `Bill To Addressidentifier`=$billAdr, `%s`",
            implode('`=?, `', $names)
        );

        $sql = $sql. "=? WHERE `Paymentidentifier` = $paymentID";
        
        $updateID = "";
        if($this->DEBUG){
            trigger_error("SQL: ". $sql);
        }

        if($statement = $dbconn->prepare($sql) ){
//            if($statement->bind_param($this->bindlist, $address['Useridentifier'],$address['Address Number'],$address['Address Name'], $address['Address Unit'], $address['State'], $address['Zip'], $address['Address Type'],$address['FedEx Verified'], $address['City'])){ 
            if($statement->bind_param("ssisss", ...$paymentValues)){ 
                if($statement->execute()){
                    trigger_error("Committing set to: ". $this->commit);
                    if($this->commit){
                        if($dbconn->commit()){
                            trigger_error("I'm Committing: ". $this->commit);
                            $updateID = $statement->affected_rows;
                        } else{
                            $updateID = "ERROR: ".$dbconn->error;
                            $dbconn->close();
                            return $updateID;
                        }
                    }
                    $updateID = $statement->affected_rows;
                    $dbconn->close();
                    return $updateID;

                } else{
                    $updateID = "ERROR: ".$statement->error;
                    $dbconn->close();
                    die("mySQLI Error: ".$dbconn->error." Error Number: ".$dbconn->errno);
                    //return $updateID;                    
                }
            } else{
                $updateID = "ERROR: ".$statement->error;
                $dbconn->close();
                return $updateID;
            }
        } else{
            $updateID = "ERROR: ".$dbconn->error;
            $dbconn->close();
            return $updateID;
        }

        $dbconn->close();
        return $updateID;
    }

    public function delete($id)
    {
        $dbconn = $this->newConnection();
        $sql = "DELETE FROM `Payment Method` WHERE `Paymentidentifier` = UNHEX('$id')";
        trigger_error("SQL: ". $sql);
        if($statement = $dbconn->prepare($sql)){
            if($statement->execute()){
                trigger_error("Committing set to: ". $this->commit);
                if($this->commit){
                    if($dbconn->commit()){
                        trigger_error("I'm Committing: ". $this->commit);
                        $returnINFO = $statement->affected_rows;
                    } else{
                        $returnINFO = "ERROR: ".$dbconn->error;
                        $dbconn->close();
                        return $returnINFO;
                    }
                }
                $returnINFO = $statement->affected_rows;
                $dbconn->close();
                return $returnINFO;

            } else{
                $returnINFO = "ERROR: ".$statement->error;
                $dbconn->close();
                //die("mySQLI Error: ".$dbconn->error." Error Number: ".$dbconn->errno);
                return $returnINFO;                    
            }
        } else{
            $returnINFO = "ERROR: ".$dbconn->error;
            $dbconn->close();
            return $returnINFO;
        }

        $dbconn->close();
        return $returnINFO;
    }

    public static function getMysqlDsn($dbName, $port, $connectionName = null)
    {
        if ($connectionName) {
            return sprintf('mysql:unix_socket=/cloudsql/%s;dbname=%s',
                $connectionName,
                $dbName);
        }

        return sprintf('mysql:host=127.0.0.1;port=%s;dbname=%s', $port, $dbName);
    }

    public static function getPostgresDsn($dbName, $port, $connectionName = null)
    {
        if ($connectionName) {
            return sprintf('pgsql:host=/cloudsql/%s;dbname=%s',
                $connectionName,
                $dbName);
        }

        return sprintf('pgsql:host=127.0.0.1;port=%s;dbname=%s', $port, $dbName);
    }
}
