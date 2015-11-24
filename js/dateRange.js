;
/*by suming 2015*/
var sumingDateSec = (function($){
	
	var date_dialog = $(".date-popBox");
	
	var datePic = $(".datePic");
	
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
	
	
		$('#monthBox').datepicker({
			
			format: "yyyy-mm",
			minViewMode: 1,
			language: "zh-CN",
			forceParse: false,
			todayHighlight: true,
			multidate: 2,
			multidateSeparator: "至"
		}).on("changeDate",function(e){
			
			$("input.hasClick").val(
				$("#monthBox").datepicker('getFormattedDate')
			);
			
		})
	
	 $('#dayBox').datepicker({
			  format: "yyyy-mm-dd",
			  language: "zh-CN",
			  todayHighlight: true,
		      multidate: 2,
			  multidateSeparator: "至"
		}).on("changeDate",function(e){
		 
		   var _this = $(this);
		 
			var ss = _this.find(".datepicker-days").find(".active");
		 
		    var ss2 = _this.find(".datepicker-days").find(".day");
		 
		    ss.parent().addClass("hasSec");
		 
			ss.eq(1).parent().addClass("sec2 sb").removeClass("hasSec");
		 
		    _this.find("tbody").find("tr").slice(_this.find(".hasSec").index(),_this.find(".sec2").index()+1).addClass("sb");
		 
		    _this.find(".sb").find("td").addClass("range");
		 
		    ss.eq(0).prevAll().removeClass("range");
		 
		    ss.eq(1).nextAll().removeClass("range");
		 
			$("input.hasClick").val(
				
				$("#dayBox").datepicker('getFormattedDate')
				
			);
		   
		});

		
	   function dateInt(){
		   
	   		var str = $("input.hasClick").val();
		   
		    if(str.length){
			
					var arr = str.split("至");
						
					var dateStart = parseInt(arr[0].split("-").join(""));
						
					if(arr.length == 2) {

						var dateEnd = parseInt(arr[1].split("-").join(""));

						if(dateStart>dateEnd){

						$("input.hasClick").val(arr[1] +"至" + arr[0]);
						}
					}
			}
			
		}
		
		$('.confirm-button').on("click",function(){
   			
			date_dialog.hide();
			
			dateInt();
			
		})
		
		
		closeWin.on("click",function(e){
			
			e.stopPropagation();
			
			date_dialog.hide();
			
			dateInt();
		})
		$(document).click(function(e){
		
			var target  = $(e.target);

			  if(target.closest(".date-popBox").length == 0){

			  date_dialog.hide();
				  
			  dateInt();

			}
		})
 
   
})(jQuery)




