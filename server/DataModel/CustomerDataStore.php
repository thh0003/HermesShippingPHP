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

namespace server\DataModel;

use Google\Cloud\Datastore\DatastoreClient;
use Google\Cloud\Datastore\Entity;

/**
 * Class Datastore implements the DataModel with a Google Data Store.
 */
class CustomerDatastore implements CustomerDataModelInterface
{
    private $datasetId;
    private $datastore;
    protected $columns = [
        'Useridentifier' => 'string',
        'Firebase ID'         => 'string',
        'First Name'        => 'string',
        'Middle Name' => 'string',
        'Last Name'     => 'string',
        'Email'   => 'string',
        'Phone'    => 'string',
        'Active' => 'bit',
    ];

    public function __construct($projectId)
    {
        $this->datasetId = $projectId;
        $this->datastore = new DatastoreClient([
            'projectId' => $projectId,
        ]);
    }

    public function listCustomers($limit = 10, $cursor = null)
    {
        $query = $this->datastore->query()
            ->kind('Customer')
            ->order('Last Name')
            ->limit($limit)
            ->start($cursor);

        $results = $this->datastore->runQuery($query);

        $customers = [];
        $nextPageCursor = null;
        foreach ($results as $entity) {
            $customer = $entity->get();
            $customer['id'] = $entity->key()->pathEndIdentifier();
            $customers[] = $customer;
            $nextPageCursor = $entity->cursor();
        }

        return [
            'customers' => $customers,
            'cursor' => $nextPageCursor,
        ];
    }

    public function create($customer, $key = null)
    {
        $this->verifycustomer($customer);

        $key = $this->datastore->key('Customer');
        $entity = $this->datastore->entity($key, $customer);

        $this->datastore->insert($entity);

        // return the ID of the created datastore entity
        return $entity->key()->pathEndIdentifier();
    }

    public function read($id)
    {
        $key = $this->datastore->key('Customer', $id);
        $entity = $this->datastore->lookup($key);

        if ($entity) {
            $customer = $entity->get();
            $customer['id'] = $id;
            return $customer;
        }

        return false;
    }

    public function update($customer)
    {
        $this->verifyCustomer($customer);

        if (!isset($customer['id'])) {
            throw new \InvalidArgumentException('Customer must have an "id" attribute');
        }

        $transaction = $this->datastore->transaction();
        $key = $this->datastore->key('Customer', $customer['id']);
        $task = $transaction->lookup($key);
        unset($customer['id']);
        $entity = $this->datastore->entity($key, $customer);
        $transaction->upsert($entity);
        $transaction->commit();

        // return the number of updated rows
        return 1;
    }

    public function delete($id)
    {
        $key = $this->datastore->key('Customer', $id);
        return $this->datastore->delete($key);
    }

    private function verifyCustomer($customer)
    {
        if ($invalid = array_diff_key($customer, $this->columns)) {
            throw new \InvalidArgumentException(sprintf(
                'unsupported customer properties: "%s"',
                implode(', ', $invalid)
            ));
        }
    }
}
