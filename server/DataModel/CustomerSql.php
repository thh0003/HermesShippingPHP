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
class CustomerSql implements DataModelInterface
{

    private $servername;
    private $username;
    private $password;
    private $dbname;
    private $clientkey;
    private $clientcert;
    private $serverca;
    private $commit;


    /*
     * Creates the SQL books table if it doesn't already exist.
     *         'Useridentifier' => 'string',
        'Firebase ID' => 'string',
        'First Name' => 'string',
        'Middle Name' => 'string',
        'Last Name' => 'string',
        'Email' => 'string',
        'Phone' => 'string',
        'Active'=> 'bit',
     */
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
        $this->bindlist = "ssssss";
        $this->commit = $commit;

        $this->columnNames = array(
            'Useridentifier',
            'Firebase ID',
            'First Name',
            'Middle Name',
            'Last Name',
            'Email',
            'Phone',
            'Active',
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
     * Throws an exception if $customer contains an invalid key.
     *
     * @param $customer array
     *
     * @throws \Exception
     */
    private function verify($customer)
    {
        if ($invalid = array_diff_key($customer, array_flip($this->columnNames))) {
            throw new \Exception(sprintf(
                'unsupported book properties: "%s"',
                implode(', ', $invalid)
            ));
        }
    }

    /*
        listCustomers = list customers to a limit.  Uses the CustomerHex view vs Customer Relation.  CustomerHex simply converts the 'Useridentifier' column to Hex format
    */
    public function list($limit = 10, $cursor = 0, $page = '<', $sort='Last Name', $search=null)
    {
        $dbconn = $this->newConnection();
        $query = "SELECT * FROM CustomerHex ";
        $PBlist = "";
        $PBargs = Array();

        if (!$sort){
            $sort='Last Name';
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
            $query = $query."WHERE `Last Name` LIKE ? ";
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
            trigger_error("mySQLI Status: ".$dbconn->server_info." Database: ".$dbconn->host_info." Limit, Cursor: ". $limit . $cursor);
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
            
            trigger_error("First Name: ".$row['First Name']);
            $rows[]= $row;
            $row = $resultSet->fetch_array(MYSQLI_ASSOC);
            $x++;
            $cursor++;
        }

        $dbconn->close();

        if($this->DEBUG){
            trigger_error("Last Name: ". $rows[0]['Last Name']);
        }

        $retArray = array(
            'customerColumns' => $rowHeaders,
            'customers' => $rows,
            'cursor' => $cursor,
        );

        return $retArray;

    }

    public function create($customer, $id = null)
    {
        $this->verify($customer);
        if ($id) {
            $customer['Useridentifier'] = $id;
        }
        $dbconn = $this->newConnection();
        $names = array_keys($customer);
        $placeHolders = array_map(function () {
            return "?";
        }, $names);
        $sql = sprintf(
            'INSERT INTO Customer (`%s`) VALUES (%s)',
            implode('`, `', $names),
            implode(', ', $placeHolders)
        );

        trigger_error("SQL: ". $sql);
        if($statement = $dbconn->prepare($sql) ){
                    //Firebase ID, First Name, Middle Name, Last Name, Email, Phone
            if($statement->bind_param($this->bindlist, $customer['Firebase ID'],$customer['First Name'],$customer['Middle Name'], $customer['Last Name'], $customer['Email'], $customer['Phone'])){

                if($statement->execute()){
                    if($this->commit){
                        if($dbconn->commit()){
                            trigger_error("I'm Committing: ". $this->commit);
                            $insertID = "Customer Record Created and Commited: ".$customer['First Name']." ".$customer['Last Name']." , ".$customer['Firebase ID'];
                            $dbconn->close();
                            return $insertID;
                        } else{
                            $insertID = "ERROR: ".$dbconn->error;
                            $dbconn->close();
                            return $insertID;
                        }
                    } else {
                        trigger_error("I'm not Committing: ". $this->commit);
                        $insertID = "Customer Record Data Valid/Not Committing: ".$customer['First Name']." ".$customer['Last Name']." , ".$customer['Firebase ID'];
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
//        $dbconn->close();
//        return $insertID;

    }

    public function read($id)
    {
        $dbconn = $this->newConnection();
        $statement = $dbconn->prepare('SELECT * FROM CustomerHex WHERE Useridentifier = ?');
        $statement->bind_param('s', $id);
        $statement->execute();
        $resultSet = $statement->get_result();
        $readCustomer = $resultSet->fetch_array(MYSQLI_ASSOC);
        $dbconn->close();
        return $readCustomer;
    }

    public function update($customer)
    {
        $this->verify($customer);
        $dbconn = $this->newConnection();
        $userID = array_shift($customer);
        $names = array_keys($customer);
        $sql = sprintf(
            'UPDATE `Customer` SET `%s`',
            implode('`=?, `', $names)
        );

        $sql = $sql. "=? WHERE `Useridentifier` = UNHEX('$userID')";
        
        $updateID = "";
        if($this->DEBUG){
            trigger_error("SQL: ". $sql);
        }

        if($statement = $dbconn->prepare($sql) ){
            //Firebase ID, First Name, Middle Name, Last Name, Email, Phone
            if($statement->bind_param($this->bindlist, $customer['Firebase ID'],$customer['First Name'],$customer['Middle Name'], $customer['Last Name'], $customer['Email'], $customer['Phone'])){ 
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
        $sql = "DELETE FROM `Customer` WHERE `Useridentifier` = UNHEX('$id')";
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
