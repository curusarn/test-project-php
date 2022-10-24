<?php

$app = require "./core/app.php";

// Create new instance of user
$user = new User($app->db);
// Insert it to database with POST data
$user->insert(array(
	'name' => $_POST['name'],
	'email' => $_POST['email'],
	'city' => $_POST['city'],
	'phone_number' => $_POST['phone_number']
));

exit('Success');