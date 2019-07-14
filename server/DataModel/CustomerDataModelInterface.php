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

/**
 * The common model implemented by Google Datastore, mysql, etc.
 */
interface CustomerDataModelInterface
{
    /**
     * Lists all the customers in the data model.
     * Cannot simply be called 'list' due to PHP keyword collision.
     *
     * @param int  $limit  How many customers will we fetch at most?
     * @param null $cursor Returned by an earlier call to listCustomers().
     *
     * @return array ['customers' => array of associative arrays mapping column
     *               name to column value,
     *               'cursor' => pass to next call to listCustomers() to fetch
     *               more customers]
     */
    public function listCustomers($limit = 10, $cursor = null);

    /**
     * Creates a new customer in the data model.
     *
     * @param $customer array  An associative array.
     * @param null $id integer  The id, if known.
     *
     * @return mixed The id of the new customer.
     */
    public function create($customer, $id = null);

    /**
     * Reads a customer from the data model.
     *
     * @param $id  The id of the customer to read.
     *
     * @return mixed An associative array representing the customer if found.
     *               Otherwise, a false value.
     */
    public function read($id);

    /**
     * Updates a customer in the data model.
     *
     * @param $customer array  An associative array representing the customer.
     * @param null $id The old id of the customer.
     *
     * @return int The number of customers updated.
     */
    public function update($customer);

    /**
     * Deletes a customer from the data model.
     *
     * @param $id  The customer id.
     *
     * @return int The number of customers deleted.
     */
    public function delete($id);
}
