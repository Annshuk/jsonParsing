// JavaScript Document
$(document).ready(function(){
var Swidth = $(window).width();
var Sheight = $(window).height();
$('.ProductDynmaic, .heightCatch').jScrollPane({showArrows: false, autoReinitialise: true});
$('#Media').click(function() {
$("#playerVemio").css({'visibility':'visible'});
});

$('#menu > li.HomeTheme').click(function() {
$("#asideBlue").css({'background-image':'url(images/BlueBgRight.jpg)','background-repeat':'no-repeat', 'background-position':'top right','background-color':'#0044ff'});
$('#menu > li.HomeTheme a').addClass('active');
$('#menu > li.BrandTheme a, #menu > li.ContacTheme a, #menu > li.StoreTheme a, #menu > li.MediaTheme a, #menu > li.ProductTheme a, #menu > li.CareerTheme a').removeClass('active');
});
$('#menu > li.BrandTheme').click(function() {
$("#asideBlue").css({'background-image':'url(images/YellowBgRight.jpg)','background-repeat':'no-repeat', 'background-position':'top right','background-color':'#7a6001'});
$('#menu > li.BrandTheme a').addClass('active');
$('#menu > li.HomeTheme a, #menu > li.ContacTheme a, #menu > li.StoreTheme a, #menu > li.MediaTheme a, #menu > li.ProductTheme a, #menu > li.CareerTheme a').removeClass('active');

});
$('#menu > li.ProductTheme').click(function() {
$("#asideBlue").css({'background-image':'url(images/VioletBG.jpg)','background-repeat':'no-repeat', 'background-position':'top right','background-color':'#0d14a3'});
$('#menu > li.ProductTheme a').addClass('active');
$('#menu > li.HomeTheme a, #menu > li.ContacTheme a, #menu > li.StoreTheme a, #menu > li.MediaTheme a, #menu > li.CareerTheme a, #menu > li.BrandTheme a').removeClass('active');
});
$('#menu > li.MediaTheme').click(function() {
$("#asideBlue").css({'background-image':'url(images/GreenBgRight.jpg)','background-repeat':'no-repeat', 'background-position':'top right','background-color':'#367c36'});
$('#menu > li.MediaTheme a').addClass('active');
$('#menu > li.HomeTheme a, #menu > li.ContacTheme a, #menu > li.StoreTheme a, #menu > li.CareerTheme a, #menu > li.ProductTheme a, #menu > li.BrandTheme a').removeClass('active');
});
$('#menu > li.StoreTheme').click(function() {
$("#asideBlue").css({'background-image':'url(images/StoreOrangeBg.jpg)','background-repeat':'no-repeat', 'background-position':'top right','background-color':'#623806'});
$('#menu > li.StoreTheme a').addClass('active');
$('#menu > li.HomeTheme a, #menu > li.ContacTheme a, #menu > li.CareerTheme a, #menu > li.MediaTheme a, #menu > li.ProductTheme a, #menu > li.BrandTheme a').removeClass('active');
});
$('#menu > li.ContacTheme').click(function() {
$("#asideBlue").css({'background-image':'url(images/PinkBgRight.jpg)','background-repeat':'no-repeat', 'background-position':'top right','background-color':'#942a40'});
$('#menu > li.ContacTheme a').addClass('active');
$('#menu > li.HomeTheme a, #menu > li.CareerTheme a, #menu > li.StoreTheme a, #menu > li.MediaTheme a, #menu > li.ProductTheme a, #menu > li.BrandTheme a').removeClass('active');
});
$('#menu > li.CareerTheme').click(function() {
$("#asideBlue").css({'background-image':'url(images/careerGreenBg.jpg)','background-repeat':'no-repeat', 'background-position':'top right','background-color':'#034746'});
$('#menu > li.CareerTheme a').addClass('active');
$('#menu > li.HomeTheme a, #menu > li.ContacTheme a, #menu > li.StoreTheme a, #menu > li.MediaTheme a, #menu > li.ProductTheme a, #menu > li.BrandTheme a').removeClass('active');
});
var cityArray = new Array();
var StoreArray= new Array();
var AddressArray = new Array();
var cityIndex='';
var StoreIndex= '';
var city='';
var storename ='';         
$('select#cityname').append('<option value="-1">-Select City-</option>'); 
$('select#storename').append('<option value="-1">-Select Store-</option>');
$.ajax({type: "GET", url: "store.xml", dataType: "xml",  success: 
		function(xml) {
						$(xml).find('store').each(function(){
						var $store = $(this);
						var city = $store.attr('city');							
						if( $.inArray(city, cityArray) === -1 ){			 
						$('<option></option>').html(city).appendTo('select#cityname');
						cityArray.push(city);
						cityArray = cityArray.sort();
						 
						}                                                              
					});//city  
					
                    $('select#cityname').change(function () {
					cityIndex = $('#cityname option:selected').text();           
					$('select#storename').empty(); 					
					$('#adressBox').css('display','none');              
					StoreArray = [];
					$('select#storename').append('<option value="-1">-Select Store-</option>');                 
					$('select#storename').append('<option value="0">All Store</option>');                   
					$(xml).find('store').each(function(){
					var $store = $(this);                
					var cityTag = $store.attr('city');
					storename = $store.attr('name');
					if(cityIndex==cityTag){                                                                                                                 
					if( $.inArray(storename, StoreArray) == -1 ){                                                                      
					$('<option></option>').html(storename).appendTo('select#storename');          
					StoreArray.push(storename);
					 }             
                   }            
				});
             });   //Find all Store Address
			
			$('#reset').click(function () {
			$('#adressBox').css('display','none').fadeOut();  	
			});
			
            $('select#storename').change(function () {
			StoreIndex = $('#storename option:selected').text();
			$('#adressBox').css('display','none').fadeIn();
			AddressArray =[];
			AllAddressArray =[];
			$(xml).find('store').each(function(){
			var $store = $(this);
			var cityTag = $store.attr('city');
			address = $store.attr('address');
			var currentStore = $store.attr('name');
			if(cityIndex==cityTag){
				$('#adressBox').css('display','block');  
					 if(StoreIndex == 'All Store'){
						   AllAddressArray.push("<p>" + address + "</p>");
						  }
							if(StoreIndex ==currentStore){								
								AddressArray.push("<p>" + address + "</p>");
							}                                                                             
					 }
				});
				if(StoreIndex == 'All Store')
				$('.overflow').html(AllAddressArray).appendTo('#adressBox');
				else
				$('.overflow').html(AddressArray).appendTo('#adressBox');
				}); // Find all Address Depands on store
			} //success function
		},'xml'); //end store xml  
		
function GetHtml(element)
{
var imageurl = element.attr('src');
var width = element.attr('width');
var height = element.attr('height');
var text = element.attr('alt');
var zoomImg = element.attr('zoom');																		
var html = '<dd><div class="imgSize">';
html +='<img src="'+ imageurl +'" alt="'+ text +'" title="'+ text +'" width="150"  /></div>';
html += '<div class="stickFoot"><span class="price"> Product ID:' + text + '<br/></span>';
html += '<span class="imgZoom"><a href="#!/ProductInfo" class="prod_id" title="'+text+'">Details</a>';
html +='<a href="'+zoomImg+'" class="zoom">Zoom</a>';
html += '</span></div></dd>';
return html;
}		


function RelProd(url, text, rel, color){	 
infoHtml='<div class="scrollPane margin45">';
infoHtml +='<div class="productImg"><img src="'+ url +'" alt="'+ text +'"/></div>';
infoHtml +='<div class="productDetails">';
infoHtml +='<h4 class="yellowBold"> ' + text + '</h4>';
infoHtml +='<h4 class="yellowBold">description</h4>';
infoHtml +='<p class="blueTxt">';
infoHtml +='<strong>SKUS Code:</strong> '+ rel +'<br/>';
infoHtml +='<strong>collection:</strong> 0001<br/>';
infoHtml +='<strong>material:</strong> 0001<br/>';
infoHtml +='<strong>color:</strong> ' + color + '<br/>';
infoHtml +='<strong>price:</strong> <span class="price">999</span><br/>';
infoHtml +='</p><div class="clear"></div></div><div class="clear"></div></div><div class="clear"></div>';
infoHtml +='<div class="descBox margin45">';
infoHtml +='<h4 class="yellowBold">description</h4>';
infoHtml +='<p>jsklafj askldfj askldfj klasdfj klfajs </p>';

}

function relatedProduct(group, id, prod)
{
var relProductHtml='';
var pId =prod.attr('id');
var groupId = prod.attr('ref');
if(groupId==group && pId!=id)
{
var zoom = prod.attr('zoom');
var rUrl = prod.attr('src');
var rtext = prod.attr('alt');
relProductHtml = '<div class="relatedImg">';
relProductHtml +='<img src="'+ rUrl +'" alt="'+ rtext +'" title="'+ rtext +'"  /></div>';
relProductHtml += '</div>';
}
return relProductHtml;
}
					
$.ajax({type: "GET", url: "kidProducts.xml", dataType: "xml",  success: 
		function(xml) {
						$(xml).find('product').each(function(){
						var $kids = $(this).find('img');
						var imageurl = $kids.attr('src');
						var width = $kids.attr('width');
						var height = $kids.attr('height');
						var text = $kids.attr('alt');
						var zoomImg = $kids.attr('zoom');																		
						var html = '<dd><div class="imgSize">';
						html +='<img src="'+ imageurl +'" alt="'+ text +'" title="'+ text +'"  /></div>';
						html += '<div class="stickFoot"><span class="price"> Product ID:' + text + '<br/></span>';
						html += '<span class="imgZoom"><a href="#!/KidProductInfo" class="prod_id" title="'+text+'">Details</a>';
						html +='<a href="'+zoomImg+'" class="zoom"> Zoom </a>';
						html += '</span></div></dd>';					
            			$('#Kidsgallery dl.ScrollContent').append($(html));           
					});
					var kidHtml='';
						$('#Kidsgallery a.prod_id').bind('click', function () {	
						var kidIndex=$('#Kidsgallery a.prod_id').index(this);
						$('#KidRealtedProduct dl.ScrollContent').html('')
						$('#kidproductInfoDetails>div').html('');
						var ref='';		
						$(xml).find('product img').each(function(){
						var $mens = $(this);
						var url = $mens.attr('src');
						var id = $mens.attr('id');
						var text = $mens.attr('alt');
						var rel= $mens.attr('ref');
						var color= $mens.attr('color');
						var group = $mens.parent(this).attr('group');						
						if(kidIndex==id){	
						$('#kidproductInfoDetails>div').show();							
						RelProd(url, text, rel, color);
						$(xml).find('product img').each(function(){
						var $prod = $(this);
						kidHtml += relatedProduct(group, id, $prod);	
						});	
						return false;						
						}
						}) //  which image is clicked details index	
						
						$('#kidproductInfoDetails').html(infoHtml);
						$('#KidRealtedProduct dl.ScrollContent').html(kidHtml);
						kidHtml ='';
						});  
		}
},'xml');//end Kids image gallery    
/*-----------------------------------------Product DATABASE-----------------------------*/
var imageurl='';
var infoHtml='';
var prodIndex='';
var relHtml='';
$.ajax({type: "GET", url: "MenProduct.xml", dataType: "xml",  success: 
		function(xml) {
					
						$(xml).find('product').each(function(){
						var $mens = $(this).find('img');
						var html = GetHtml($mens);
            			$('#MensGallery dl.ScrollContent').append($(html));         
            			
		});//city xml
	
			 
					$('#MensGallery a.prod_id').bind('click', function () {	
					prodIndex=$('#MensGallery a.prod_id').index(this);
					$('#ManRealtedProduct dl.ScrollContent').html('')
					$('#productInfoDetails>div').html('');
					var ref='';		
					$(xml).find('product img').each(function(){
					var $mens = $(this);
					var url = $mens.attr('src');
					var id = $mens.attr('id');
					var text = $mens.attr('alt');
					var rel= $mens.attr('ref');
					var color= $mens.attr('color');
					var group = $mens.parent(this).attr('group');						
					if(prodIndex==id){	
					//ref = $mens.attr('ref');			
					$('#productInfoDetails>div').show();							
					RelProd(url, text, rel, color);
					$(xml).find('product img').each(function(){
					var $prod = $(this);
					relHtml += relatedProduct(group, id, $prod);	
					});	
					return false;						
					}
					}) //  which image is clicked details index	
								
					$('#productInfoDetails').html(infoHtml);
					$('#ManRealtedProduct dl.ScrollContent').html(relHtml);
					relHtml ='';
					});
							}
					},'xml');//end Men image gallery   
JShandler(); 
//images gallery through xml                        
});

function SearchAll(){
	
			
			}			
					
				
