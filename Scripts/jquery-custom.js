// Initialize jQuery UI Elements and Other UI Features
	// The "Collapse Outline" Element
    $(document).ready(function() {
        $('.menu-link').bigSlide();
    });
	
	// The "View More" Element
	$(document).ready(function(){
		$('.viewmore').showHide();
	});

	// The "Accordion" Element
	$(function(){
		jQuery('.accordion').accordion({ collapsible:true, heightStyle:"content", active:false, autoHeight:true, disabled:true});
		jQuery('.accordion h3.ui-accordion-header').click(function(){
			jQuery(this).next().slideToggle();
		});
		jQuery('.accordion-expand-all').click(function(){
			jQuery('.accordion h3.ui-accordion-header').next().slideDown();
		});
	});

	// The "Tabs" Element
	$(function() {
		$( "#content-tabs" ).tabs();
	});
	
	// The "Dialog" Element
	$(function($) {
			$('.whyButton').each(function() {  
				$.data(this, 'dialog', 
				  $(this).next('.whyDialog').dialog({
					autoOpen: false,  
					modal: true,
					closeText: "Close",		
					title: 'Why would you want to run this button?',  
					width: 600,  
				  })
				);  
			}).click(function() {  
			  $.data(this, 'dialog').dialog('open');  
			  return false;  
		  });  
		});  

	// The "More/Less" Element with Continuity
	$(function(){
		$(document).ready(function() {
			var showChar = 250;
			var ellipsestext = "...";
			var moretext = "more";
			var lesstext = "less";
			$('.more').each(function() {
				var content = $(this).html();

				if(content.length > showChar) {

					var c = content.substr(0, showChar);
					var h = content.substr(showChar-0, content.length - showChar);

					var html = c + '<span class="moreelipses">'+ellipsestext+'</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">'+moretext+'</a></span>';

					$(this).html(html);
				}

			});

			$(".morelink").click(function(){
				if($(this).hasClass("less")) {
					$(this).removeClass("less");
					$(this).html(moretext);
				} else {
					$(this).addClass("less");
					$(this).html(lesstext);
				}
				$(this).parent().prev().toggle();
				$(this).prev().toggle();
				return false;
			});
		});
	});