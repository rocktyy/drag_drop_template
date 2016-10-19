GB.utils.countDown=function(starttime,endTime,obj,fn){
	 (function(starttime,endTime,obj,fn){	 
	 		countdown(starttime,endTime,obj,fn);      
	 }(starttime,endTime,obj,fn))
}
   var countdown=function(starttime,endTime,obj,fn){
        var text="";    
        var flag=true;     
        var DifferenceHour = -1;
        var DifferenceMinute = -1;
        var DifferenceSecond = -1;
        endTime=endTime.replace(/-/g,'/');
        var Tday = new Date(endTime);
        var daysms = 24 * 60 * 60 * 1000;
        var hoursms = 60 * 60 * 1000;
        var Secondms = 60 * 1000;
        var microsecond = 1000;
        var time=new Date(starttime);
        function clock(){
             var hour = time.getHours();
              var minute = time.getMinutes();
              var second = time.getSeconds();
              var timevalue = ""+((hour > 12) ? hour-12:hour)
              timevalue +=((minute < 10) ? ":0":":")+minute
              timevalue +=((second < 10) ? ":0":":")+second
              timevalue +=((hour >12 ) ? " PM":" AM")
              // document.formnow.now.value = timevalue
              var convertHour = DifferenceHour
              var convertMinute = DifferenceMinute
              var convertSecond = DifferenceSecond
              //var Diffms = Tday.millisecond() - time.millisecond();
               var Diffms= Tday.getTime()-time.getTime(); 
              if(Diffms>0){
                  DifferenceHour = Math.floor(Diffms / daysms)
              Diffms -= DifferenceHour * daysms
              DifferenceMinute = Math.floor(Diffms / hoursms)
              Diffms -= DifferenceMinute * hoursms
              DifferenceSecond = Math.floor(Diffms / Secondms)
              Diffms -= DifferenceSecond * Secondms
              var dSecs = Math.floor(Diffms / microsecond)
              // if(convertHour != DifferenceHour) document.formnow.dd.value=DifferenceHour
              // if(convertMinute != DifferenceMinute) document.formnow.hh.value=DifferenceMinute
              // if(convertSecond != DifferenceSecond) document.formnow.mm.value=DifferenceSecond
              if(DifferenceHour){
                 text=DifferenceHour+"天";
              } else{
                text="";
              }
              if(DifferenceMinute){
                text+=DifferenceMinute+":"
              }else{
                text+="";
              }
              if(DifferenceSecond){
                text+=DifferenceSecond+":"
              } else{
                text+="00:";
              }
              if(dSecs){
                text+=dSecs<10?("0"+dSecs):dSecs;
              } else{
                text+="00";
              }
              }else{
                text="";
                $(obj).html("00:00");               
                fn();
              }             
              $(obj).html(text);
              time.setTime(time.getTime()+1000);
              if(text){
                setTimeout(clock,1000);
              }               
              }
              clock();
          }
   
