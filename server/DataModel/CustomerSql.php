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
class CustomerSql implements CustomerDataModelInterface
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

        if (!$dbconn->options(MYSQLI_INIT_COMMAND, 'SET AUTOCOMMIT = 0')) 
            {
                trigger_error('Setting MYSQLI_INIT_COMMAND failed');
            }
        
        $dbconn->ssl_set($this->clientkey, $this->clientcert, $this->serverca,NULL,NULL);
        if (!$dbconn->real_connect($this->servername,$this->username,$this->password,$this->dbname,3306,NULL,MYSQLI_CLIENT_SSL_DONT_VERIFY_SERVER_CERT)){
            trigger_error('Connect Error (' . mysqli_connect_errno() . ') '. mysqli_connect_error());
            die('Connect Error (' . mysqli_connect_errno() . ') '. mysqli_connect_error());
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
    private function verifyCustomer($customer)
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
    public function listCustomers($limit = 10, $cursor = null, $page = null)
    {
        $dbconn = $this->newConnection();
        if($this->DEBUG){
            trigger_error("mySQLI Status: ".$dbconn->server_info." Database: ".$dbconn->host_info." Limit, Cursor: ". $limit . $cursor);
        }
        if ($cursor) {
            if ($page == '<'){
                $query = 'SELECT * FROM CustomerHex WHERE Useridentifier '. $page .' ?';
                if($statement = $dbconn->prepare($query)){
                    /* bind parameters for markers */
                    $statement->bind_param("i",$cursor);
                }else{
                    trigger_error("mySQLI Error: ".$dbconn->error." Error Number: ".$dbconn->errno);
                    die("mySQLI Error: ".$dbconn->error." Error Number: ".$dbconn->errno);
                }
            }else{
                $query = 'SELECT * FROM CustomerHex WHERE Useridentifier '. $page .' ?' . ' LIMIT ?';
                if($statement = $dbconn->prepare($query)){
                    /* bind parameters for markers */
                    $limitT = $limit+1;
                    $statement->bind_param("ii",$cursor,$limitT);
                }else{
                    trigger_error("mySQLI Error: ".$dbconn->error." Error Number: ".$dbconn->errno);
                    die("mySQLI Error: ".$dbconn->error." Error Number: ".$dbconn->errno);
                }
            }

            if($this->DEBUG){
                trigger_error("Query: ".$query);
            }


        } else {
            $query = 'SELECT * FROM CustomerHex ORDER BY Useridentifier LIMIT ?';
            if($statement = $dbconn->prepare($query)){
                $limitT = $limit+1;
                $statement->bind_param("i",$limitT);
            }else{
                trigger_error("mySQLI Error: ".$dbconn->error." Error Number: ".$dbconn->errno);
                die("mySQLI Error: ".$dbconn->error." Error Number: ".$dbconn->errno);
            }
        }

        $statement->execute();
        $rows = array();
        $rowHeaders = array();
        $last_row = null;
        $new_cursor = $cursor;

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
        $rowStart = $resultSet->num_rows - $limit;
        if ($page == "<"){
            $resultSet->data_seek($rowStart);
        }
        $x = 0;
        $row = $resultSet->fetch_array(MYSQLI_ASSOC);
        while ($row && ($x <= $limit)) {
            
            if (count($rows) == $limit) {
                $new_cursor = $last_row['Useridentifier'];
            }else{
                trigger_error("First Name: ".$row['First Name']);
                $rows[]= $row;
                $last_row = $row;
                $new_cursor = $last_row['Useridentifier'];
            }
            $row = $resultSet->fetch_array(MYSQLI_ASSOC);
            $x++;

        }

        $dbconn->close();

        if($this->DEBUG){
            trigger_error("Last Name: ". $rows[0]['Last Name']);
        }

        $retArray = array(
            'customerColumns' => $rowHeaders,
            'customers' => $rows,
            'cursor' => $new_cursor,
        );

        return $retArray;


    }

    public function create($customer, $id = null)
    {
        $this->verifyCustomer($customer);
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
                            $insertID = $statement->insert_id;
                        } else{
                            $insertID = "ERROR: ".$dbconn->error;
                            $dbconn->close();
                            return $insertID;
                        }
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
        $statement = $dbconn->prepare('SELECT * FROM Customer WHERE Useridentifier = ?');
        $statement->bind_param('s', $id);
        $statement->execute();
        $readCustomer = $statement->fetch();
        $dbconn->close();
        return $readCustomer;
    }

    public function update($customer)
    {
        $this->verifyCustomer($customer);
        $dbconn = $this->newConnection();
        $assignments = array_map(
            function ($column) {
                return "$column=:$column";
            },
            $this->columnNames
        );
        $assignmentString = implode(',', $assignments);
        $sql = "UPDATE Customer SET $assignmentString WHERE Useridentifier = :id";
        $statement = $dbconn->prepare($sql);
        $values = array_merge(
            array_fill_keys($this->columnNames, null),
            $customer
        );
        $result = $statement->execute($values);
        $dbconn->close();
        return $result;
    }

    public function delete($id)
    {
        $dbconn = $this->newConnection();
        $statement = $dbconn->prepare('DELETE FROM Customer WHERE Useridentifier = :id');
        $statement->bind_param('s', $id);
        $statement->execute();

        return $statement->rowCount();
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
