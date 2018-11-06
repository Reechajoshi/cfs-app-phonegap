//$(document).ready(function() {
//        var currentIndex = 0;
//        var items = $("#news_container_slider div");
//        var itemAmt = items.length;
//
//        var autoSlide = setInterval(function() {
//                if(currentIndex == (itemAmt - 1) )
//                        currentIndex = 0;
//                else
//                        currentIndex = currentIndex + 1;
//                scrollNews();
//        }, 6000);
//
//        function scrollNews() {
//                var currentNewsDiv = $("#news_container_slider div").eq(currentIndex);
//                $("#news_container_slider div").each(function(){
//                        $(this).hide();
//                });
//                $(currentNewsDiv).show( "slide", {direction: "right" }, 4000);
//        }
//
//        $(".news_container_next").click(function() {
//                if(currentIndex == (itemAmt - 1) )
//                        currentIndex = 0;
//                else
//                        currentIndex = currentIndex + 1;
//                scrollNews();
//        });
//});

$("#btnNewsNext").click(function(){
		$ticker.next();
	});

$(document).on('pageinit', '#home',function(e,data){
	$.ajax({
        url: api_url+'News/',
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
        	console.log(result);
        	var newsContainer = $(".jq-news-ticker");
    		$(newsContainer).append('<ul class="jq-news-ticker-items">');
        	for(idx in result.Data){
        		var newsText = result.Data[idx].NEWS_TEXT;
        		var newsDescription = result.Data[idx].NEWS_DESCRIPTION;
        		$(".jq-news-ticker-items").append('<li class="jq-news-ticker-item"><span style="font-weight:bold;display:inline-block;margin-right:10px;">'+newsText+'</span><span>'+newsDescription+'</span></li>');
        	}
        	$ticker = $('#news-ticker').newsTicker({
        	    animationType: 'scroll'
        	});
        }
    });
});