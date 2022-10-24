// state of city filter
// used to determine whether or not newly added users should be hidden or not
var cityFilter = ""

// alerts timeout
// used to clear timeouts when adding multiple users immediately one after another
var alertsTimeout = undefined

// user filtering by city
function usersFilterByCity(city) {
	// searching with empty filter is equivalent to clearing it
	if (city == "") {
		return usersFilterClear()
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
function usersFilterClear() {
	cityFilter = ""
	var table = document.getElementById("users");
	for (var i = 0, row; row = table.rows[i]; i++) {
		row.style.display = '';
	}
	document.getElementById("filter_clear").style.display = 'none';
};

// form to add user
function usersAddRow(name, email, city, phone_number, isVisible) {
	// I'm unhappy that this html structure is now in two different places
	// i.e. here and in index.php. I think I would rather generate all the rows
	// using JavaScript but that seems out of scope of this excercise.
	var row = ""
	if (isVisible) {
		row += "<tr>"
	} else {
		row += "<tr style='display: none'>"
	}
	row += "<td>" + name + "</td>"
	row += "<td>" + email + "</td>"
	row += "<td>" + city + "</td>"
	row += "<td>" + phone_number + "</td>"
	row += "</tr>"
	$("#users > tbody:last-child").append(row)
}

function hideAlerts() {
	document.getElementById("form-success").style.display = 'none';
	document.getElementById("form-fail").style.display = 'none';
}

$(document).ready(function () {
	$("#form_add_user").submit(function (event) {
		event.preventDefault();
		var formData = {
			name: $("#name").val(),
			email: $("#email").val(),
			city: $("#city").val(),
			phone_number: $("#phone_number").val(),
		};

		hideAlerts();
		if (alertsTimeout != undefined) {
			clearTimeout(alertsTimeout)
		};
		$.ajax({
			type: "POST",
			url: "create.php",
			data: formData,
			dataType: "json",
			encode: true,
		}).always(function (data) {
			if(data.status != 200) {
				document.getElementById("form-fail").style.display = '';
			} else {
				document.getElementById("form-success").style.display = '';
			}
		});
		alertsTimeout = setTimeout(hideAlerts, 3000);

		// only show the newly added user if
		// there is no active filter OR active filter matches the user's city
		var isVisible = (cityFilter == "" || cityFilter == formData.city);
		usersAddRow(formData.name, formData.email, formData.city, formData.phone_number, isVisible);

	});
});
