 $(document).on('pagebeforeshow', '#trackntrace',function(e,data){
	 $("#trackntrace_track_no").val("");
	 $("#tntLocation").html("");
	 $("#trackntrace-track-btn").removeClass("red").addClass("gray");
 });

$(document).ready(function(){
	
	 $("#trackntrace_track_no").val("");
	 $("#tntLocation").html("");
	 $("#trackntrace-track-btn").removeClass("red").addClass("gray");
	
	$("#trackntrace_track_no").keyup(function(){
		this.value = this.value.toUpperCase();
		var val=$("#trackntrace_track_no").val();
		if(val=="")
		{
			$("#trackntrace-track-btn").removeClass("gray").addClass("grey");
		}
		else
		{
			$("#trackntrace-track-btn").removeClass("red").addClass("red");
		}
	});
	
	$("#trackntrace-track-btn").click(function(){
		var ContNo_val=$("#trackntrace_track_no").val();
		if(ContNo_val=="")
		{
			navigator.notification.alert("Container NO. can not be empty.", null,
					"Alert", "OK");
		}
		if(!checkConnection()){
			return false;
		}
		showOverlay();
		$.ajax({
            url: api_url+'ContainerCurrentSatus/',
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
              //	$("#gateInDate").html("");
              	$("#tntLocation").html("");
              } else {
            	  //$("#gateInDate").html(result.Date1);
            	  if(result.Location == ""){
            		  //alert("container either gated out or not handeled by equipment, pls check after some time or contact ops team!");
            		  $("#tntLocation").html("container either gated out or not handeled by equipment, pls check after some time or contact ops team!");
            	  }else{
            		  $("#tntLocation").html(result.Location);
            	  }
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