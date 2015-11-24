;
/*by suming 2015*/
var sumingDateSec2 = (function($){
	
	var date_dialog = $(".date-popBox");
	
	var datePic = $(".datePic2");
	
	var closeWin =  date_dialog.find(".close");
	
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
	
	tabBox(".date-dialog",{trigger:".hasTab li",panel:".hasTabCon >.item-con",curCls:"cur"});
	
	
	
	function DialogStyle(obj,targetObj){
		
		var pos = obj.offset();
		
		var objH = obj.height();
		
		var lf = pos.left;
		
		var tp = pos.top;
		
		targetObj.css({left:lf,top:tp+objH+10});
		
		targetObj.show();
	
	}
	
	datePic.on("click",function(e){
			
			e.stopPropagation();
			
			datePic.removeClass("hasClick");
			
			DialogStyle($(this),date_dialog);
			
			$(this).addClass("hasClick");
		})
	
	$('#yearBox').datepicker({
		 format:"yyyy",
		 startView: 1,
    	 minViewMode: 2,
		 forceParse: false,
		 todayHighlight: true
		
		}).on("changeDate",function(ev){
			$("input.hasClick").val(
				$("#yearBox").datepicker('getFormattedDate')
			);
			
			date_dialog.hide();
		});

		$('#monthBox').datepicker({
			 format: "yyyy-mm",
			 minViewMode: 1,
			 language: "zh-CN",
			 forceParse: false,
			 todayHighlight: true
		}).on("changeDate",function(ev,format){
			
			$("input.hasClick").val(
				$("#monthBox").datepicker('getFormattedDate')
			);
			date_dialog.hide();
		});
	
	   $('#dayBox').datepicker({
			  format: "yyyy-mm-dd",
			  language: "zh-CN",
			  //calendarWeeks: true,
			  todayHighlight: true
		}).on("changeDate",function(ev,format){
			
			
			$("input.hasClick").val(
				$("#dayBox").datepicker('getFormattedDate')
			);
		   
		   date_dialog.hide();

		});

		$('#weekBox').datepicker({
			  format: "yyyy-mm",
			  language: "zh-CN",
			  calendarWeeks: true,
			  todayHighlight: true
		}).on("changeDate",function(ev,format){
			
			var ss = $(this).find(".datepicker-days").find(".active");
			
			var fmDate = $(this).datepicker('getFormattedDate');
			
			/*选择周一的bug*/
			
			if(ss.prev().hasClass("cw")){
				
				var lastDay = ss.text();
				
				var upCross = ss.parent().prev();
				
				var weekObj = upCross.find(".cw");
				
				var weekNum = parseInt(weekObj.text());
				
				var yyWeek = fmDate.substring(0,4) +"年"+"第"+weekNum+"周";
				
				var firstDay = weekObj.next().next().text();
			
				upCross.find(".day").addClass("range");
				
				weekObj.next().removeClass("range");
				
				/*copy*/
				
				firstDay = firstDay.length == 1 ? "0"+firstDay : firstDay;

				lastDay = lastDay.length == 1 ? "0"+lastDay : lastDay;
				
				var ymdRangeStr;

				var nmm  = parseInt(fmDate.substr(5));

				var add1 = (nmm+1).toString().length == 1 ? "0" + (nmm+1) : nmm+1;

				var minus1 = (nmm-1).toString().length == 1 ? "0" + (nmm-1) : nmm-1;

				if(parseInt(lastDay)<parseInt(firstDay)){

					if(ss.text().length<2) {

						ymdRangeStr =  "("+fmDate.substring(0,4)+"-"+minus1+"-"+firstDay+"至"+fmDate+"-"+lastDay+")";
					}

					else{

						ymdRangeStr =  "("+fmDate+"-"+firstDay+"至"+fmDate.substring(0,4)+"-"+add1+"-"+lastDay+")";

					}
				}
				else{

					ymdRangeStr =  "("+fmDate+"-"+firstDay+"至"+fmDate+"-"+lastDay+")";
				}
				
				/*copy end*/
			}
			
			/*end*/
			
			else{
			
				ss.addClass("range").siblings().addClass("range"); 

				var nextWeek = $(".range").last().parent().next().find(".cw");

				var weekObj = ss.siblings(".cw");

				var weekNum = parseInt(weekObj.text());

				var fmDate = $(this).datepicker('getFormattedDate');

				var yyWeek = fmDate.substring(0,4) +"年"+"第"+weekNum+"周";

				var firstDay = weekObj.next().next().text();

				var lastDay = nextWeek.next().text();


				if(!nextWeek.next().length) {

					lastDay ="0"+(parseInt( $(".range").last().text() )+1);
				}

				nextWeek.next().addClass("range");

				weekObj.next().removeClass("range");

				weekObj.removeClass("range");

				firstDay = firstDay.length == 1 ? "0"+firstDay : firstDay;

				lastDay = lastDay.length == 1 ? "0"+lastDay : lastDay;

				var ymdRangeStr;

				var nmm  = parseInt(fmDate.substr(5));

				var add1 = (nmm+1).toString().length == 1 ? "0" + (nmm+1) : nmm+1;

				var minus1 = (nmm-1).toString().length == 1 ? "0" + (nmm-1) : nmm-1;

				if(parseInt(lastDay)<parseInt(firstDay)){

					if(ss.text().length<2) {

						ymdRangeStr =  "("+fmDate.substring(0,4)+"-"+minus1+"-"+firstDay+"至"+fmDate+"-"+lastDay+")";
					}

					else{

						ymdRangeStr =  "("+fmDate+"-"+firstDay+"至"+fmDate.substring(0,4)+"-"+add1+"-"+lastDay+")";

					}
				}
				else{

					ymdRangeStr =  "("+fmDate+"-"+firstDay+"至"+fmDate+"-"+lastDay+")";
				}
			}
			var point = yyWeek+ ymdRangeStr;
			
			$("input.hasClick").val(
				point
			);
			date_dialog.hide();

		});
	   $("#timeBox").datetimepicker({
			format: "yyyy-mm-dd hh:ii",
			language: "zh-CN",
			startView: 1,
			minView: 0,
			maxView: 1,

	   })
	   .on("changeDate",function(ev,format){
			$("input.hasClick").val(
				$("#timeBox").datetimepicker('getFormattedDate')
			);
		   	date_dialog.hide();
		});
		
		$('.confirm-button').on("click",function(){
   			
			date_dialog.hide();
   		})
		
		
		closeWin.on("click",function(e){
			
			e.stopPropagation();
			
			date_dialog.hide();
		})
		$(document).click(function(e){
		
			var target  = $(e.target);

			  if(target.closest(".date-popBox").length == 0){

			  date_dialog.hide();

			}
		})
 
   
})(jQuery)