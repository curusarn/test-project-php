
// state of active city filter
// used to determine whether or not new added users should be hidden or not
var cityFilter = ""

// user filtering
function users_filter_by_city(city) {
	if (city == "") {
		return users_filter_clear()
	}
	cityFilter = city
	var table = document.getElementById("users");
	for (var i = 1, row; row = table.rows[i]; i++) {
		if (row.cells[2].textContent == city) {
			row.style.display = '';
		} else {
			row.style.display = 'none';
		}
	}
	document.getElementById("filter_clear").style.display = '';
};
function users_filter_clear() {
	cityFilter = ""
	var table = document.getElementById("users");
	for (var i = 0, row; row = table.rows[i]; i++) {
		row.style.display = '';
	}
	document.getElementById("filter_clear").style.display = 'none';
};

// form to add user
function add_user_row(name, email, city, phone_number, isHidden) {
	// I don't like that this html structure is now in two different places
	// but I don't know how to fix it
	var row = ""
	if (isHidden) {
		row += "<tr style='display: none'>"
	} else {
		row += "<tr>"
	}
	row += "<td>" + name + "</td>"
	row += "<td>" + email + "</td>"
	row += "<td>" + city + "</td>"
	row += "<td>" + phone_number + "</td>"
	row += "</tr>"
	$("#users > tbody:last-child").append(row)
}

$(document).ready(function () {
	$("#form_add_user").submit(function (event) {
		var formData = {
			name: $("#name").val(),
			email: $("#email").val(),
			city: $("#city").val(),
			phone_number: $("#phone_number").val(),
		};

		$.ajax({
			type: "POST",
			url: "create.php",
			data: formData,
			dataType: "json",
			encode: true,
		}).done(function (data) {
			// TODO: Show sucess message
			console.log(data);
		}).fail(function (data) {
			// TODO: Show fail message
			console.log(data);
		});

		// hide user if there is active filter and it doesn't match the user's city
		var isHidden = (cityFilter != "" && cityFilter != formData.city)
		add_user_row(formData.name, formData.email, formData.city, formData.phone_number, isHidden)

		event.preventDefault();
	});
});
