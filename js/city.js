 
/*by suming 2015*/
;var CityControl = (function($){
	
	// tab-box SUMING
	var tabBox = function(container, opts) {
		container = $(container);
		opts = {
			trigger: opts && container.find(opts.trigger),
			panel: opts && container.find(opts.panel),
			curCls: opts && opts.curCls || ''
		};

		opts.trigger.on({
			click: function() {
				var _this = $(this),
					_index = $(this).index();
				_this.addClass(opts.curCls).siblings().removeClass(opts.curCls);
				opts.panel.eq(_index).show().siblings().hide();
			}
		});
	}
	
	tabBox(".city-dialog",{trigger:".hasTab li",panel:".hasTabCon >.item-con",curCls:"cur"});
	
	var _Config = window.Config || {
		
        geo: {
            provinces: [],
            cities: [],
            districts: []
        }
    };
	
	var cityPicker = {};
	
	var city_popBox = $(".city-popBox");
	
	var province_tpl = "";
	
	var ct_lis = $(".ct-lis");
	
	var city_sec = $(".city-sec");
	
	var muti_sec = $(".sec-multi");
	
	var confirm_button = $(".confirm-button");
	
	var city_lis = $(".city-lis");
	
	var in_city = city_lis.find(".inner");
	
	var closeWin =  city_popBox.find(".close");
	
	var multiSelect = $(".multiSelect");
	
	var singleSelect = $(".singleSelect");
	
	var nation = multiSelect.find(".nation");
	
	var nationSin = singleSelect.find(".nation");
	
	var J_proLis = multiSelect.find(".J-proLis");
	
	//var J_proLis2 = J_proLis.eq(1);
	
	var J_proLis2 = singleSelect.find(".J-proLis");
	
	var trigLis_pro = J_proLis2.eq(0);
	
	var trigLis_city = J_proLis2.eq(1);
	
	cityPicker.geo = {
        provinces: _Config.geo.provinces,
        cities: _Config.geo.cities,
        districts: _Config.geo.districts,
        
    };
	
	for(var i in cityPicker.geo.provinces){
		
		if(cityPicker.geo.provinces.hasOwnProperty(i)){
			
			var cityName = cityPicker.geo.provinces[i]["name"];
			
			var provinceId = cityPicker.geo.provinces[i]["id"];
			
			province_tpl += "<li pid="+provinceId+"><a href=\"javascript:;\">"+cityName+"</a></li>"
			
		}
	}
	J_proLis.html(province_tpl);
	
	J_proLis2.html(province_tpl);
	
	J_proLis.on("click","li",function(e){
		
		nation.removeClass("nat");
		
		J_proLis2.find("li").removeClass("cur");
		
		//if(nation.hasClass("nat")) return;
		
	    var _this = $(this);
		
		_this.toggleClass("cur");
		
		
	})
	
	nationSin.on("click",function(){
	
		$(this).addClass("nat");
		
		J_proLis2.find("li").removeClass("cur");
		
		singleVal($(this));
		
		closeDialog(city_popBox);
	})
	
	trigLis_pro.on("click","li",function(){
		
		nationSin.removeClass("nat");
		
		trigLis_city.find("li").removeClass("cur");
		
		//if(nation.hasClass("nat")) return;
		
	    var _this = $(this);
		
		_this.toggleClass("cur").siblings().removeClass("cur");
		
		singleVal($(this));
			
		closeDialog(city_popBox);
		
	})
	
	trigLis_city.on("click","li",function(e){
		
		city_lis.show();
		
		nationSin.removeClass("nat");
		
		trigLis_pro.find("li").removeClass("cur");
		
		if(nation.hasClass("nat")) return;
		
		var city_tpl ="";
		
		var _this = $(this);
		
		var _pid = _this.attr("pid");
		
		_this.toggleClass("cur").siblings().removeClass("cur");
		
		
		
		for(var i in cityPicker.geo.cities){
		
			if(cityPicker.geo.cities.hasOwnProperty(i)){

				var cityName = cityPicker.geo.cities[i]["name"];
				
				var cityId = cityPicker.geo.cities[i]["provinceId"];

				if(_pid == cityId){
				
					city_tpl += "<li><a href=\"javascript:;\">"+cityName+"</a></li>";
					
				}

			}
		}
		
		if(_this.hasClass("cur")){
			
			in_city.addClass("bg");
		
			ct_lis.html(city_tpl);
		}
		
		else{
			
			in_city.removeClass("bg");
			
			ct_lis.html("");
		
		}
		
		ct_lis.on("click","li",function(){
			
			getCur($(this));
			
			singleVal($(this));
			
			closeDialog(city_popBox);
		})
	})
	
	function getCur(obj){
	
		obj.addClass("cur").siblings().removeClass("cur");
		
	}
	
	function removeCur(){
		
		ct_lis.find("li").removeClass("cur");
	
		J_proLis.find("li").removeClass("cur");
		
		ct_lis.html("");
	}
	
	function getItemArr(){
		
		var  item_arr = [];
		
		var _secItem = J_proLis.eq(0).find(".cur").children();
		
		if(!_secItem) return;
		
		_secItem.each(function(){
		
			var _secItemVal = $(this).text();
			
			item_arr.push(_secItemVal);
		})
		
		
		return item_arr
	}
	
	
	
	
	function getCityItemArr(){
		
		var  item_arr = [];
		
		var _secItem = ct_lis.find(".cur").children();
		
		if(!_secItem) return;
		
		_secItem.each(function(){
		
			var _secItemVal = $(this).text();
			
			item_arr.push(_secItemVal);
		})
		
		
		return item_arr
	}
	
	nation.click(function(){
		
		removeCur();
		
		$(this).toggleClass("nat");
	})
	
	function singleVal(obj){
	
		var placeHolder = $(".hasClickSec").find(".sec-val");
		
		if(nationSin.hasClass("nat")) {
			
			placeHolder.html(obj.text()) || sec_val.html("未选择地区");
			
			placeHolder.attr("title",obj.text())
			
		}
		
		else{
			
			placeHolder.html(obj.children().text());
		
		}
	
	}
	

	confirm_button.on("click",function(){
		
		closeDialog(city_popBox);
		
		pushVal();
		
	})
	
	function pushVal(){
	
	
		var data = getItemArr().join(",");
		
		var natVal = multiSelect.find(".nation").text();
		
		var placeHolder = $(".hasClickSec").find(".sec-val");
		
		if(nation.hasClass("nat")) {
			
			placeHolder.html(natVal) || placeHolder.html("未选择地区");
			
			placeHolder.attr("title",natVal)
			
		}
		
		else{
			
			if(data){
				
				placeHolder.html(data) 
				
			}
			
			else{
				
				placeHolder.html("未选择地区")
			}
		
			placeHolder.attr("title",data)
		
		}
	
	}
	
	closeWin.on("click",function(){
		
		closeDialog(city_popBox);
		
		//removeCur();
		
		//nation.removeClass("cur");
	})
	
	function closeDialog(obj){
	
		obj.hide();
		
	}
	
	function DialogStyle(obj,targetObj){
	
		var pos = obj.offset();
		
		var objH = obj.height();
		
		var lf = pos.left;
		
		var tp = pos.top;
		
		targetObj.css({left:lf,top:tp+objH+2});
		
		targetObj.toggle();
	
	}
	
	function clearCur(){
		
		nation.removeClass("nat");
		
		nationSin.removeClass("nat");
		
		J_proLis.find("li").removeClass("cur");
		
		J_proLis2.find("li").removeClass("cur");
		
		ct_lis.find("li").removeClass("cur");
		
		city_lis.hide();
	
	}
	city_sec.on("click",function(e){
		
		e.stopPropagation();
		
		clearCur();
		
		city_sec.removeClass("hasClickSec");
		
		$(this).addClass("hasClickSec");
		
		if($(this).hasClass("sec-multi")){
			
			DialogStyle($(this),multiSelect);
			
			closeDialog(singleSelect)
		}
		
		else{
		
			DialogStyle($(this),singleSelect);
			
			closeDialog(multiSelect)
		}
		
	})
	
	
	//初始值设置
	
	var setIntVal = function(obj,text){
		
		obj.find(".sec-val").html(text);
		
	}
	
	
	$(document).click(function(e){
		
		var target  = $(e.target);
		
		  if(target.closest(".city-popBox").length == 0){
			  
		   city_popBox.hide();
			  
		}
	})
	//console.log(setIntVal);
	return setIntVal
	
})(jQuery)