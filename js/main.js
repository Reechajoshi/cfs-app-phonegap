/**
 * 
 */

var api_url = "http://220.226.190.156:8081/api/";
var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC" ];
var locStr="";
var userdetails = {
		DOA: "",
		DOB: "",
		EmailID: "",
		IMEINo: "",
		LocationId: "",
		MobileNo: "",
		Password: "",
		UserName: "",
		loginDate: "",
};

var app = {
		// Application Constructor
		initialize : function() {
			this.bindEvents();
		},
		// Bind Event Listeners

		// Bind any events that are required on startup. Common events are:
		// 'load', 'deviceready', 'offline', and 'online'.
		bindEvents : function() {
			//$.mobile.defaultPageTransition = 'slide';
			$(window).on('hashchange', $.proxy(this.route, this));
			//document.addEventListener("backbutton", backEvent, false);
			//document.addEventListener('deviceready', this.onDeviceReady, false);
		},

		route : function() {
			//document.removeEventListener("backbutton", backEvent, false);
			var hash = window.location.hash;
			console.log("Route: fired for " + hash);
			if(hash=="#login"){
				navigator.notification.alert("in Login", null,
						"Notify", "OK");
				document.addEventListener("backbutton", backEvent, false);
			}
			
		}
};

app.initialize();


function backEvent() {
	navigator.notification.confirm('Are you sure you want to Log Off?',
			onConfirm, 'Log Off', [ 'Cancel', 'Logoff' ]);
}

function onConfirm(buttonIndex) {
	if (buttonIndex == 2) {
		navigator.app.exitApp();
	}
}

function showTNC(){
	$.ajax({
	    url: api_url+'AboutUs/',
	    type: 'POST',
	    contentType: 'application/json',
	    data: JSON.stringify({}),
	    beforeSend: function(){
	    	//$.mobile.changePage("#contactus");
	    	showOverlay();
		 },
		 complete: function(){
			hideOverlay();
		 },
	    success: function (result) {
	    	$.each( result.Data, function( key, val ) {
	    		navigator.notification.alert(val.AboutUs_TNC, null,
						"Terms & Condition", "OK");
	    	});
	    	
	    }
		});
}




function showfacility() {
	
	var locStr="";
	$.ajax({
    url: api_url+'CFS_Location/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}),
    beforeSend: function(){
    	//$.mobile.changePage("#contactus");
    	$("#facility_list").html('');
    	showOverlay();
	 },
	 complete: function(){
		hideOverlay();
	 },
    success: function (result) {
    	//console.log(result.Data[0]);
   // if(result.ErrMsg=""){
    	
    	$.each( result.Data, function( key, val ) {
    		// var holidayRowHTML = '<div class="ui-grid-a"><div class="ui-block-a holidayName" style="padding: 10px;border: 1px solid #e0e0e0;">'+val.HOLIDAY_NAME+'</div><div class="ui-block-b holidayDate" style="padding: 10px;border: 1px solid #e0e0e0;">'+val.Holiday_DATE+'</div></div>';
    		if($("#facilitylocation").val()==val.LocationID){
    				$("#facility_list").append(val.Facility);
    		}
    	});
  
    },
    error : function(xhv){
    	$("#facility_list").html("");
    }
	});
  
   
}


function showHolidayList() {
	
	var locStr="";
	$.ajax({
    url: api_url+'HOLIDAY/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({LocationID:$("#holidaylocation").val()}),
    beforeSend: function(){
    	//$.mobile.changePage("#contactus");
    	$("#holidayListTable").html('<div class="ui-grid-a">     <div class="ui-block-a" style="font-size:20px;padding: 10px;border: 1px solid #e0e0e0;">      Name        </div>        <div class="ui-block-b" style="font-size:20px;padding: 10px;border: 1px solid #e0e0e0;">                Date      </div></div>');
    	showOverlay();
	 },
	 complete: function(){
		hideOverlay();
	 },
    success: function (result) {
    	//console.log(result.Data[0]);
   // if(result.ErrMsg=""){
    	
    	$.each( result.Data, function( key, val ) {
    		 var holidayRowHTML = '<div class="ui-grid-a"><div class="ui-block-a holidayName" style="padding: 10px;border: 1px solid #e0e0e0;">'+val.HOLIDAY_NAME+'</div><div class="ui-block-b holidayDate" style="padding: 10px;border: 1px solid #e0e0e0;">'+val.Holiday_DATE+'</div></div>';
    		 $("#holidayListTable").append(holidayRowHTML);
    	});
  
    }
	});
  
   
}

function showAboutUs() {
	
	var locStr="";
	$.ajax({
    url: api_url+'AboutUs/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}),
    beforeSend: function(){
    	//$.mobile.changePage("#contactus");
    	showOverlay();
	 },
	 complete: function(){
		hideOverlay();
	 },
    success: function (result) {
    
    	$.each( result.Data, function( key, val ) {
    		$("#aboutus_desc").html(val.AboutUs_DESCRIPTION);
    	});
   
    }
	});

   
}

function checkConnection(){
	
	if(navigator 
			   && navigator.network 
			   && navigator.network.connection 
			   && navigator.network.connection.type == Connection.NONE) {
						navigator.notification.alert("No Internet Connection", null,
				"Error", "OK");
						return false;
			}
	return true;

}


function callPage(page_name){
	$.mobile.changePage("#"+page_name);
}

function showOverlay() {
	$("#overlay").show();
}

function hideOverlay() {
	$("#overlay").fadeOut();
}

function loadLocations() {
	
	$.ajax({
        url: api_url+'CFS_Location/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({}),
        beforeSend: function(){
        	showOverlay();
		},
		complete: function(){
			hideOverlay();
		},
        success: function (result) {
       	 if(result.Status=="SUCCESS"){
       		 var options = [];
       		 $.each( result.Data, function( key, val ) {
       			 options.push('<option value="' + val.LocationID + '">' + val.LocationName + '</option>');
       		  });
       		// $('#loginlocation').append(options.join(''));
       		 $('#feedbackLocation').append(options.join(''));
       		 $('#registerlocation').append(options.join(''));
       		$('#holidaylocation').append(options.join(''));
       		$('#facilitylocation').append(options.join(''));
       	 }else{
       		 navigator.notification.alert(result.ErrMsg);
       	 }
        }
    }); 
}

function performLogout(){
	var date = new Date();
	var logoutCredentials = {
			EmailID: userdetails.EmailID,
			LogInDate: userdetails.loginDate,
			LogOutDate: ( date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear(),
	}
	if(!checkConnection()){
		return false;
	}
	$.ajax({
        url: api_url+'LogOutUser/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(logoutCredentials),
        beforeSend: function(){
        	showOverlay();
		},
		complete: function(){
			hideOverlay();
		},
        success: function (result) {
        	if(result.Status == "SUCCESS"){
        		localStorage.setItem('userdetails', JSON.stringify({}));
        		callPage("login");
        	}
        	else {
        		navigator.notification.alert("Error Logging Out" );
        	}
        }
    }); 
}

$(document).ready(function(){
	loadLocations(); // this method populates all select boxes with db Locations
	navigate_contact_us();
	showAboutUs();
	
	$("#btnForgotPassword").click(function(){
		callPage("forgotPassword");
	});
	
	$("#frmForgotPassword").validate({
		rules: {
			txtForgotPassEmail: {
				required: true,
				email: true,
			}
		},
		submitHandler: function(form){
			if(!checkConnection()){
				navigator.notification.alert("No Connection", null,
						"Error", "OK");
				return false;
			}
			var forgotPasswordCred = {
					EmailID: $("#txtForgotPassEmail").val(), 
			}
			$.ajax({
    	        url: api_url+'ForgotPassword/',
    	        type: 'POST',
    	        contentType: 'application/json',
    	        data: JSON.stringify(forgotPasswordCred),
    	        beforeSend: function(){
    	        	showOverlay();
    			},
    			complete: function(){
    				hideOverlay();
    			},
    	        success: function (result) {
    	        	console.log(result);
    	        	if(result.Status == "SUCCESS")
    	        		navigator.notification.alert("Mail Sent to registered Email ID");
    	        	else
    	        		navigator.notification.alert("Error sending mail to registered Email ID" );
    	        	callPage("login");
    	        }
    	    }); 
		}
		
	});
	
	// register form submit
	$( "#frmRegister" ).validate({
		rules:{
			txtRegisterName: {
				required: true,
			},
			txtRegisterEmail: {
				required: true,
				email: true,
			},
			txtRegisterMobile: {
				required: true,
				number: true,
				maxlength: 10,
				minlength: 10,
			},
			txtRegisterPass: {
				required: true,
			},
			txtRegisterConfPass:{
				required: true,
				equalTo: "#txtRegisterPass"
			},
		}, 
	    submitHandler: function( form ) {
	    	if($("#registerlocation").val() == "null" ) {
	    		navigator.notification.alert("Please select the Location");
	    	}
	    	else if($('#tnc_block').hasClass('ui-checkbox-off')) {
	    		navigator.notification.alert("Please accept Terms & Condition");
	    	}
	    	else{
	    		var dtDOB = new Date( document.getElementById( "txtRegisterDOB" ).value );
	    		var dtDOA = new Date( document.getElementById( "txtRegisterAnniv" ).value );
	    		
	    		var registerCredentials = {
	    				UserName: $("#txtRegisterName").val(),
	    				EmailID: $("#txtRegisterEmail").val(),
	    				Password: $("#txtRegisterPass").val(),
	    				MobileNo: $("#txtRegisterMobile").val(),
	    				IMEINo: "123",
	    				DOB: ((document.getElementById( "txtRegisterDOB" ).value).length == 0 ) ? ( "" ) : (dtDOB.getDate() + "/" + months[dtDOB.getMonth()] + "/" + dtDOB.getFullYear()),
	    				DOA: ((document.getElementById( "txtRegisterAnniv" ).value).length == 0) ? ( "" ) : (dtDOA.getDate() + "/" + months[dtDOA.getMonth()] + "/" + dtDOA.getFullYear()),
	    				LocationId: $("#registerlocation").val(),
	    		}
	    		if(!checkConnection()){
	    			return false;
	    		}
	    		$.ajax({
	    	        url: api_url+'Registration/',
	    	        type: 'POST',
	    	        contentType: 'application/json',
	    	        data: JSON.stringify(registerCredentials),
	    	        beforeSend: function(){
	    	        	showOverlay();
	    			},
	    			complete: function(){
	    				hideOverlay();
	    			},
	    	        success: function (result) {
	    	        	console.log(result);
	    	        	if(result.Status == "SUCCESS")
	    	        		navigator.notification.alert("User created successfully");
	    	        	else
	    	        		navigator.notification.alert("Error Creating User" );
	    	        	callPage("login");
	    	        }
	    	    }); 
	    	} 
	    }
	});
	
	// change password form submit
	$( "#frmChangePass" ).validate({
		rules:{
			txtCurrPassword: {
				required: true,
			},
			txtNewPassword: {
				required: true,
			},
			txtConfPassword: {
				required: true,
				equalTo: "#txtCurrentPassword"
			},
			
		}, 
	    submitHandler: function( form ) {
	    	var currentPassword =  $("#txtCurrentPassword").val();
	    	var previousPassword = $("#txtPreviousPassword").val();
	    	
	    	console.log(currentPassword + " = " + userdetails.Password);
	    	if(previousPassword != userdetails.Password) {
	    		navigator.notification.alert("Invalid Current Password");
	    	} else {
	    		var changePassCredentials = {
		    			EmailID: userdetails.EmailID,
		    			CurrentPassword: currentPassword,
		    			PreviousPassword: previousPassword,
		    	}
	    		console.log(JSON.stringify(changePassCredentials));
	    		if(!checkConnection()){
	    			return false;
	    		}
		    	$.ajax({
	    	        url: api_url+'ResetPassword/',
	    	        type: 'POST',
	    	        contentType: 'application/json',
	    	        data: JSON.stringify(changePassCredentials),
	    	        beforeSend: function(){
	    	        	showOverlay();
	    			},
	    			complete: function(){
	    				hideOverlay();
	    			},
	    	        success: function (result) {
	    	        	console.log(result);
	    	        	if(result.Status == "SUCCESS")
	    	        		navigator.notification.alert("Password Changed Successfully.");
	    	        	else
	    	        		navigator.notification.alert("Error Changing Password");
	    	        	callPage("login");
	    	        }
	    	    });
	    	}
	    }
	});
	
	// submit form submit
	$( "#frmLogin" ).validate({
		rules:{
			txtUserName: {
				required: true,
			},
			txtPassword: {
				required: true,
			}
		}, 
	    submitHandler: function( form ) {
	    	//if($("#loginlocation").val() != "null" ) {
		    	var loginCredential = {
						EmailID :$("#txtUserName").val(),
						Password :$("#txtPassword").val(),
				};
		    	if(!checkConnection()){
		    		return false;
		    	}
		    	var date = new Date();
				/* $.ajax({
		             url: api_url+'LoginUser/',
		             type: 'POST',
		             contentType: 'application/json',
		             data: JSON.stringify(loginCredential),
		             beforeSend: function(){
		             	showOverlay();
		     		 },
		     		 complete: function(){
		     			hideOverlay();
		     		 },
		             success: function (result) {
		            	console.log(result);
						if(result.Status == "FAILURE")
							alert("Invalid Credentials. Please try again.");
						else {
							userdetails = {
								DOA: result.DOA,
								DOB: result.DOB,
								EmailID: result.EmailID,
								IMEINo: result.IMEINo,
								LocationId: result.LocationId,
								MobileNo: result.MobileNo,
								Password: result.Password,
								UserName: result.UserName,
								loginDate: ( date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear(),
							};
							localStorage.setItem('userdetails', JSON.stringify(userdetails));
							callPage("home");
						}
		            }
		         });  
	    	//} else {
	    	//	alert("Please Select the Location");
	    	//} */
		    callPage("home");
	    }
	});
	
	
	// feedback form ajax 
	$( "#frmFeedback" ).validate({
		rules:{
			txtFeedbackComment: {
				required: true,
			},
		}, 
	    submitHandler: function( form ) {
	        if($("#feedbackLocation").val() == "null"){
	        	navigator.notification.alert("Please select a Location");
	        }else{
	        	var feedbackCredential = {
	        			EmailID :userdetails.EmailID,
	        			LocationId :$("#feedbackLocation").val(),
	        			Feedback: $("#txtFeedbackComment").val(),
				};
	        	if(!checkConnection()){
	        		return false;
	        	}
	        	$.ajax({
		             url: api_url+'Feedback/',
		             type: 'POST',
		             contentType: 'application/json',
		             data: JSON.stringify(feedbackCredential),
		             beforeSend: function(){
		             	showOverlay();
		     		 },
		     		 complete: function(){
		     			hideOverlay();
		     		 },
		             success: function (result) {
		            	if(result.Status == "SUCCESS"){
		            		navigator.notification.alert("Allcargo appreciates your feedback. We will shortly get back on your registered contact details");
		            	}else{
		            		navigator.notification.alert("Error Sending Feedback");
		            	}
		            	callPage("myaccount");
		            }
		         });
	        }
	    }
	});
});

/*$(document).on('pageinit', '[data-role="page"]', function () {
	var title=$(this).data('title');
	var headerHTML = '<div data-role="header" class="background" style="border:none;height:8%;"><div style="padding:10px 0;"><div style="float:left;"><a href="#home"><div id="logo" style="display:inline-block;vertical-align:top;padding-left:10px;"><img style="height:25px;" src="img/logo_white.png"></div><div id="app_name" style="display:inline-block;vertical-align:top;text-shadow:none;margin-left:5px;"><img style="height:20px;" src="img/appname30.png"></div></a></div><div style="float:right;padding-right:10px;"><div style="text-shadow:none;display:inline-block;vertical-align:top;" id="notification"><a onclick="callPage(\'holidaylist\'); return false;" style="margin:0px;" href="#" class="ui-btn ui-corner-all ui-icon-calendar ui-btn-icon-notext">holiday list</a></div><div style="text-shadow:none;display:inline-block;vertical-align:top;margin-left:5px;" id="logout"><a style="margin:0px;" onclick="performLogout(); return false;" id="btnLogout" href="#" class="ui-btn ui-corner-all ui-icon-action ui-btn-icon-notext">logout</a></div></div><div style="clear:both;"></div></div></div>';
	
	var footerHTML = '<div data-role="footer" data-position="fixed" style="height:12%;"><div class="footer_container"><div class="footer_cell" onclick="callPage(\'home\')"><img src="img/home-icon.png"/><div>Home<br>&nbsp;</div></div><div class="footer_cell" onclick="callPage(\'trackntrace\');"><img src="img/track-n-trace.png"/><div>Track-n-<br>Trace</div></div><div class="footer_cell" onclick="callPage(\'myaccount\');"><img src="img/my-account.png"/><div>My<br> account</div></div><div class="footer_cell" onclick="callPage(\'aboutus\');"><img style="height:15px;" src="img/allcargo.png"/><div>About<br> Us</div></div></div></div>';
	
	if(!(title== "login" ) && !(title == "register") && !(title == 'forgotPassword')){
		$(this).children().eq(0).before(headerHTML);
		$(this).append(footerHTML).enhanceWithin();
	}
});*/


// populate personal details fields with db data
$(document).on("pageshow","#personaldetails",function(){
	$("#lblPDEmail").html(userdetails.EmailID);
	$("#lblPDMobile").html(userdetails.MobileNo);
	$("#lblPDDOB").html(userdetails.DOB);
	$("#lblPDAnniversary").html(userdetails.DOA);
	$("#lblPDUserName").html(userdetails.UserName);
});

// Show username in my account page
$(document).on("pageshow","#myaccount",function(){
	$("#lblMyAccountUsername").html(userdetails.UserName);
});

$(document).on("pageinit", "#login",function(event){
	if(window.localStorage["userdetails"] != undefined){
		if((localStorage.getItem('userdetails').length > 3)){
				userdetails = JSON.parse(localStorage.getItem('userdetails'));
				if(!(userdetails.UserName==="")){
					callPage("home");
					//callPage("login");
			}
		}
	}
});

/*// swipe event of contact us page: 
$(document).on( "swiperight" , 
		function(){
			alert("Swiped Right");
}).on("swipeleft", 
		function() {
	alert("Swiped Left");
});*/

// Every time when pages are shown, reset all the forms!
$(document).on('pagebeforeshow', '#register',function(e,data){
	$("#frmRegister").find("input[type=text], input[type=password]").each(function(){
		$(this).val("");
	});
	$("#tnc_block").removeClass('ui-checkbox-on').addClass('ui-checkbox-off');
	$("#registerlocation").val("null").selectmenu("refresh");
	$("#frmRegister").validate().resetForm();
});

$(document).on('pagebeforeshow', '#login',function(e,data){
	$("#frmLogin").find("input[type=text], input[type=password]").each(function(){
		$(this).val("");
	});
	//$("#loginlocation").val("null").selectmenu("refresh");
	$("#frmLogin").validate().resetForm();
});

$(document).on('pagebeforeshow', '#forgotPassword',function(e,data){
	$("#frmForgotPassword").find("input[type=text], input[type=password]").each(function(){
		$(this).val("");
	});
	$("#frmForgotPassword").validate().resetForm();
});

$(document).on('pagebeforeshow', '#feedback',function(e,data){
	$("#feedbackLocation").val("null").selectmenu("refresh");
	$("#txtFeedbackComment").val("");
	$("#frmFeedback").validate().resetForm();
});

$(document).on('pagebeforeshow', '#changepassword',function(e,data){
	$("#frmChangePass").find("input[type=text], input[type=password]").each(function(){
		$(this).val("");
	});
	$("#frmChangePass").validate().resetForm();
});

$(document).on('pagebeforeshow', '#facility', function () {
	
	$("#facility_list").html("");
});

$(document).on('pageshow', '#contactus', function () {
	//$("#contact_us_list").show();
	//alert(locStr);
	$("#contact_us_list").html('<div id="slider1" class="slider1">'+locStr+'</div>');
	$('.slider1').bxSlider(); 
	$("#contact_us_list").show();
});

