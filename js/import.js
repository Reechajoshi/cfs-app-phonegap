 $(document).on('pagebeforeshow', '#import',function(e,data){
	 $("#import_track_no").val("");
	 $("#gateInDate").html("");
	 $("#gateInLoc").html("");
	 $("#import-track-btn").removeClass("red").addClass("gray");
 });

$(document).ready(function(){
	
	 $("#import_track_no").val("");
	 $("#gateInDate").html("");
	 $("#gateInLoc").html("");
	 $("#import-track-btn").removeClass("red").addClass("gray");
	 
	
	$("#import_track_no").keyup(function(){
		this.value = this.value.toUpperCase();
		var val=$("#import_track_no").val();
		if(val=="")
		{
			$("#import-track-btn").removeClass("gray").addClass("grey");
		}
		else
		{
			$("#import-track-btn").removeClass("red").addClass("red");
		}
	});
	
	$("#import-track-btn").click(function(){
		var ContNo_val=$("#import_track_no").val();
		if(ContNo_val=="")
		{
			navigator.notification.alert("Container NO. can not be empty.");
		}
		if(!checkConnection()){
			return false;
		}
		showOverlay();
		$.ajax({
            url: api_url+'ImportContainerStatus/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
            	ContNo:ContNo_val,
            	LocationID:userdetails.LocationId,
            	EmailID:userdetails.EmailID
            }),
            success: function (result) {
            	hideOverlay();
              if(result.Status == "FAILURE"){
           	   	navigator.notification.alert("Error :"+result.ErrMsg);
              	$("#gateInDate").html("");
              	$("#gateInLoc").html("");
              } else {
            	  $("#gateInDate").html(result.Date1);
           	   	  $("#gateInLoc").html(result.CFSLocation);
           	   //console.log(userdetails);
           	   //$.mobile.changePage("#home");
              }
           	   
            },
			error: function(xhr){
				hideOverlay();
				navigator.notification.alert("Unable to proceed the request."+xhr);
			}
        });  
	});
});