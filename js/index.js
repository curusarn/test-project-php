
// user filtering
function users_filter_by_city(city) {
	if (city == "") {
		return users_filter_clear()
	}
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
	var table = document.getElementById("users");
	for (var i = 0, row; row = table.rows[i]; i++) {
		row.style.display = '';
	}
	document.getElementById("filter_clear").style.display = 'none';
};

// form to add user
function add_user_row(name, email, city, isHidden) {
	var row = ""
	if (isHidden) {
		row += "<tr style='display: none'>"
	} else {
		row += "<tr>"
	}
	row += "<td>" + name + "</td>"
	row += "<td>" + email + "</td>"
	row += "<td>" + city + "</td>"
	row += "</tr>"
	$("#users > tbody:last-child").append(row)
}

$(document).ready(function () {
	$("#form_add_user").submit(function (event) {
		var formData = {
			name: $("#name").val(),
			email: $("#email").val(),
			city: $("#city").val(),
		};

		$.ajax({
			type: "POST",
			url: "create.php",
			data: formData,
			dataType: "json",
			encode: true,
		}).done(function (data) {
			// TODO: Sucess message
			console.log(data);
		}).fail(function (data) {
			// TODO: Fail message
			console.log(data);
		});
		
		var isHidden = ($("#city_filter").val != formData.city)
		add_user_row(formData.name, formData.email, formData.city, isHidden)

		event.preventDefault();
	});
});
