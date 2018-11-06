 $(document).on('pagebeforeshow', '#export',function(e,data){
	 $("#export_track_no").val("");
	 $("#gateOutDate").html("");
	 $("#gateOutLoc").html("");
	 $("#export-track-btn").removeClass("red").addClass("gray");
 });
 
 

$(document).ready(function(){
	
	 $("#export_track_no").val("");
	 $("#gateOutDate").html("");
	 $("#gateOutLoc").html("");
	 $("#export-track-btn").removeClass("red").addClass("gray");
	 
	 
	$("#export_track_no").keyup(function(){
		this.value = this.value.toUpperCase();
		var val=$("#export_track_no").val();
		if(val=="")
		{
			$("#export-track-btn").removeClass("gray").addClass("grey");
		}
		else
		{
			$("#export-track-btn").removeClass("red").addClass("red");
		}
		
		   
		
	});
	
	
	$("#export-track-btn").click(function(){
		
		if(true){
		var ContNo_val=$("#export_track_no").val();
		if(ContNo_val=="")
		{
			navigator.notification.alert("Container NO. can not be empty.");
		}
		if(!checkConnection()){
			return false;
		}
		showOverlay();
		$.ajax({
            url: api_url+'ExportContainerStatus/',
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
              	$("#gateOutDate").html("");
              	$("#gateOutLoc").html("");
              } else {
            	  $("#gateOutDate").html(result.Date1);
           	   	  $("#gateOutLoc").html(result.CFSLocation);
           	   //console.log(userdetails);
           	   //$.mobile.changePage("#home");
              }
           	   
            },
			error: function(xhr){
				hideOverlay();
				navigator.notification.alert("Unable to proceed the request."+xhr);
			}
        }); 
		}
	});
	
});