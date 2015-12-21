$(function(){
	$('.kc_show').click(function(){		
		$('.kc_hid').stop().animate({'height':'0'},500);
		$('.kc_hid').eq($(this).index()).stop().animate({'height':'184px'},500);
		$('.kc_hid').hide();								 
		$('.kc_hid').eq($(this).index()).show();	
	})		   
})
