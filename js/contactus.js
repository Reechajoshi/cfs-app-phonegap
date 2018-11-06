

function display_loc(){
	
	$.mobile.changePage("#contactus");
	
}
function navigate_contact_us() {
	
	$.ajax({
    url: api_url+'CFS_Location/',
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
    	//console.log(result.Data[0]);
    	/// $("#slider1").remove();
    	$.each( result.Data, function( key, val ) {
    		locStr=locStr+'<div class="slide">'+
			'<div id="contact_us_row1" style="font-size:22px;">'+val.LocationName+'</div>'+
			'<div id="contact_us_row2" style="font-size:13px;">'+
				'<div style="margin:10px 0;">'+
					'<div style="display:inline-block;vertical-align:middle;width:9%;" id="contact_us_det_img"><img src="img/location.png"></div>'+
					'<div style="display:inline-block;vertical-align:middle;width:85%;" id="contact_us_det_cont">'+val.Address+'</div>'+
				'</div>'+
				'<div style="margin:10px 0;">'+
					'<div style="display:inline-block;vertical-align:middle;width:9%;" id="contact_us_det_img"><img src="img/phone.png"></div>'+
					'<div style="display:inline-block;vertical-align:middle;width:85%;" id="contact_us_det_cont">'+val.CFSContactNo+'</div>'+
				'</div>'+
				'<div style="margin:10px 0;">'+
					'<div style="display:inline-block;vertical-align:middle;width:9%;" id="contact_us_det_img"><img src="img/email_small.png"></div>'+
					'<div style="display:inline-block;vertical-align:middle;width:85%;" id="contact_us_det_cont">'+val.CFSEmail+'</div>'+
				'</div>'+
			'</div>'+
			'<div id="contact_us_row3">'+
				'<div class="contact_us_row_ttl">Find us on Google Map</div>'+
				'<div id="img_map"><img style="width:100%;height:85px;" src="img/location/'+(val.LocationName).toUpperCase()+'.jpg"></div>'+
			'</div>'+
			'<div id="contact_us_row4">'+
				'<div class="contact_us_row_ttl">Sales Person Details</div>'+
				'<div style="font-size:13px;">Name : '+val.SaleContactPerson+'<br>Contact : '+val.SaleContactNo+'<br>Email : '+val.SaleEmail+'</div>'+
			'</div>'+
			'</div>';
    		
    	});
    	
    	 
    	// $('.slider1').bxSlider();
    }
});
}