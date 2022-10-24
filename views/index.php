<h1>PHP Test Application</h1>

<div class="panel panel-primary">
	<div class="panel-heading">Users</div>
	<div class="panel-body">
		<table id="users" class="table table-striped">
			<thead>
				<tr>
					<th>Name</th>
					<th>E-mail</th>
					<th>City</th>
					<th>Phone number</th>
				</tr>
			</thead>
			<tbody>
				<?php foreach($users as $user){?>
				<tr>
					<td><?=$user->getName()?></td>
					<td><?=$user->getEmail()?></td>
					<td><?=$user->getCity()?></td>
					<td><?=$user->getPhoneNumber()?></td>
				</tr>
				<?php }?>
			</tbody>
		</table>
	</div>
</div>

<div class="panel panel-default">
	<div class="panel-heading">Filter users by City</div>
	<div class="panel-body">
		<div class="row">
			<label for="city_filter" class="col-sm-2">City</label>
			<div class="col-sm-6">
				<input name="city_filter" input="text" id="users_filter_by_city" class="form-control"/>
			</div>
			<div class="col-sm-4">
				<button onclick="usersFilterByCity(document.getElementById('users_filter_by_city').value)" class="btn btn-primary">Filter users</button>
				<button id="filter_clear" onclick="usersFilterClear()" class="btn btn-primary" style="display: none">Show all users</button>
			</div>
		</div>
	</div>
</div>

<div class="panel panel-default">
	<div class="panel-heading">Add a new user</div>
	<div class="panel-body">
		<form id="form_add_user" class="form form-horizontal">
			<div class="form-group row">
				<label for="name" class="col-sm-2 col-form-label">Name</label>
				<div class="col-sm-10">
					<input name="name" type="text" input="text" id="name" class="form-control" required/>
				</div>
			</div>
			
			<div class="form-group row">
				<label for="email" class="col-sm-2 col-form-label">E-mail</label>
				<div class="col-sm-10">
					<input name="email" type="email" input="text" id="email" class="form-control" required/>
				</div>
			</div>
			
			<div class="form-group row">
				<label for="city" class="col-sm-2 col-form-label">City</label>
				<div class="col-sm-10">
					<input name="city" type="text" input="text" id="city" class="form-control" required/>
				</div>
			</div>

			<div class="form-group row">
				<label for="phone_number" class="col-sm-2 col-form-label">Phone number</label>
				<div class="col-sm-10">
					<input name="phone_number" type="text" input="text" id="phone_number" class="form-control" required/>
				</div>
			</div>
			
			<button class="btn btn-success">Add a new user</button>
		</form>
	</div>
</div>

<div id="form-success" class="alert alert-success" role="alert" style="display: none;">User added successfully</div>
<div id="form-fail" class="alert alert-danger" role="alert" style="display: none;">Failed to add user</div>
