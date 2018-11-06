/**
 * 
 */
$(document).ready(function() {
	
	$.ajax({
		url: "http://124.153.94.106:8084/api/News",
		method: "POST",
		headers: {"Content-Type": "application/json","Access-Control-Allow-Origin": "*"},
		data: JSON.stringify({}),
		success: function(res) {
			navigator.notification.alert(res.Status);
		},
		error: function(xhr) {
			console.log(xhr);
		}
	});
});