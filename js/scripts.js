include("js/sImg.js");
include("js/jquery.easing.js");
include("js/jquery.fancybox-1.3.4.pack.js");
include("js/superfish.js");
include("js/switcher.js");
include("js/forms.js");
include("js/MathUtils.js");
function include(url) {   document.write('<script src="' + url + '"></script>');}
function addAllListeners() {
    var val1 = $('.readMore').css('#34f35');
    $('.list4>li>figure>a, .imgZoom .zoom, .imgZoom .menCat, .imgZoom .zoomCat').find('strong').css('top','200px').end()    	 	
    $('.prev').hover(
        function(){
            $(this).css({'backgroundPosition':'center bottom'})
                .children('span').stop().animate({'backgroundPosition':'right center'},300,'easeOutExpo');
        },
        function(){
            $(this).css({'backgroundPosition':'center top'})
                .children('span').stop().animate({'backgroundPosition':'left center'},400,'easeOutCubic');
        }
    );
    $('.next').hover(
        function(){
            $(this).css({'backgroundPosition':'center bottom'})
                .children('span').stop().animate({'backgroundPosition':'left center'},300,'easeOutExpo');
        },
        function(){
            $(this).css({'backgroundPosition':'center top'})
                .children('span').stop().animate({'backgroundPosition':'right center'},400,'easeOutCubic');
        }
    );
    $('.pause').hover(
        function(){
            $(this).css({'backgroundPosition':'center bottom'})
                .children('span').stop().animate({'backgroundPosition':'1px top'},300,'easeOutExpo');
        },
        function(){
            $(this).css({'backgroundPosition':'center top'})
                .children('span').stop().animate({'backgroundPosition':'1px bottom'},400,'easeOutCubic');
        }
    );   
}

var MSIE = true, OPR = true, content, defColor, defMh, h;
function showSplash(){
    content.stop(true).animate({'width':'0'},50,'easeInBack')
}
function hideSplash(){
   content.stop(true).animate({'width':'0'},0,'easeInBack')
        .delay(0)
        .animate({'width':'70%'},0,'easeInExpo');
}
function hideSplash2(){
    content.stop(true).animate({'width':'70%'},0,'easeInBack');
}
function hideSplashQ(){
    content.css({'width':'70%'});

}

$(document).ready(ON_READY);
$(window).load(ON_LOAD);
function ON_READY() {
    /*SUPERFISH MENU*/   
    $('.menu #menu').superfish({
	   delay: 100,
	   animation: {
	       height: 'show'
	   },
       speed: 'fast',
       autoArrows: false,
       dropShadows: false
    });
}

function ON_LOAD(){
    MSIE = ($.browser.msie) && ($.browser.version <= 8);
    OPR = ($.browser.opera);    
	$('.spinner').fadeOut();
	$('.list4>li>figure>a').attr('rel','appendix').prepend('<span class="sitem_over"><strong></strong></span>');
	$('.imgZoom .zoom').attr('rel','models').prepend('<span class="sitem_over"><strong></strong></span>');
	$('.imgZoom .zoomCat').attr('rel','Categ').prepend('<span class="sitem_over"><strong></strong></span>');
	$('.imgZoom .menCat').attr('rel','menCat').prepend('<span class="sitem_over"><strong></strong></span>');
	$('.imgZoom .Media').attr('rel','menCat').prepend('<span class="sitem_over"><strong></strong></span>');
    $('.list4>li>figure>a, .imgZoom .zoom, .imgZoom .menCat, .Media, .imgZoom .zoomCat').fancybox({
        'transitionIn': 'elastic',
    	'speedIn': 500,
    	'speedOut': 300,
        'centerOnScroll': true,
        'overlayColor': '#000'
    }); 	

 $(".vimeo").fancybox({ type: 'iframe', fitToView : false});
	
    //content switch
    content = $('#content');
    content.tabs({
        show:0,
        preFu:function(_){
            _.li.css({'visibility':'hidden'});	
            hideSplashQ();	
        },
        actFu:function(_){
            if (_.n == 0){
                showSplash()
            } else {
                if (_.curr) {
                    h = parseInt(_.curr.css('height'));
                    if (_.pren == 0) {
                        $(window).trigger('resize');
                        hideSplash2();
                    } else {
                        hideSplash();
                    }
                }
            }
            
            if (_.curr) h = parseInt( _.curr.outerHeight(true));
            $(window).trigger('resize');
            
            if(_.curr){
                _.curr
                    .css({'right':'-50%','visibility':'visible'}).stop(true).delay(20).show().animate({'right':'0px'},{duration:1000,easing:'easeOutBack'});
					
        }   
            if(_.prev){
	            _.prev
                    .show().stop(true).animate({'right':'-70%'},{duration:400,easing:'easeInBack',complete:function(){
                        if (_.prev){						
                            _.prev.css({'visibility':'hidden'});
                        }
                    }
	              });
            }   
  		}
    });
   // var defColor = $('#menu>li>a').not('active').css('color'); 
    var nav = $('.menu');
    nav.navs({
		useHash:true,
        defHash: '#'        
    }).navs(function(n,_){	
   	    $('#content').tabs(n);
        if (_.prevHash == '#!/page_mail') { 
            $('#form1 a').each(function (ind, el){
                if ($(this).attr('data-type') == 'reset') { $(this).trigger('click') }   
            })
        }
   	});
    addAllListeners();
    $(window).trigger('resize');
}

$(window).resize(function (){
	JShandler();
    var newMh = h;
    if (defMh > newMh) {newMh = defMh; }
    //$('body').stop().animate({'minHeight':newMh})
});