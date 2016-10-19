Handlebars.registerHelper("compare",function(v1,v2,options){
      if(v1>v2){
        //满足添加继续执行
       return options.fn(this);
      }else{
        //不满足条件执行{{else}}部分
        return options.inverse(this);
      }
    });
    //注册一个比较大小的Helper,判断v1等于v2
    Handlebars.registerHelper("equal",function(v1,v2,options){
      if(v1==v2){
        //满足添加继续执行
       return options.fn(this);
      }else{
        //不满足条件执行{{else}}部分
        return options.inverse(this);
      }
    });
//逻辑扩展
    Handlebars.registerHelper('compareall', function(left, operator, right, options) {
         if (arguments.length < 3) {
           throw new Error('Handlerbars Helper "compare" needs 2 parameters');
         }
         var operators = {
           '==':     function(l, r) {return l == r; },
           '===':    function(l, r) {return l === r; },
           '!=':     function(l, r) {return l != r; },
           '!==':    function(l, r) {return l !== r; },
           '<':      function(l, r) {return l < r; },
           '>':      function(l, r) {return l > r; },
           '<=':     function(l, r) {return l <= r; },
           '>=':     function(l, r) {return l >= r; },
           'typeof': function(l, r) {return typeof l == r; }
         };

         if (!operators[operator]) {
           throw new Error('Handlerbars Helper "compare" doesn\'t know the operator ' + operator);
         }

         var result = operators[operator](left, right);

         if (result) {
           return options.fn(this);
         } else {
           return options.inverse(this);
         }
     });

Handlebars.registerHelper('equalall3', function(v1,v2,v3,v4,options) {
         if (arguments.length < 5) {
           throw new Error('Handlerbars Helper "compare" needs 2 parameters');
         }
         var length=arguments.length-1;
         var args=Array.prototype.slice.call(arguments,1,length);
         var result= args.some(function(item){
           return item==v1;
         })
         if (result) {
           return options.fn(this);
         } else {
           return options.inverse(this);
         }
     });

Handlebars.registerHelper('equalall4', function(v1,v2,v3,v4,v5,options) {
         if (arguments.length < 6) {
           throw new Error('Handlerbars Helper "compare" needs 2 parameters');
         }
         var length=arguments.length-1;
         var args=Array.prototype.slice.call(arguments,1,length);
         var result= args.some(function(item){
           return item==v1;
         })
         if (result) {
           return options.fn(this);
         } else {
           return options.inverse(this);
         }
     });
Handlebars.registerHelper('equalall2', function(v1,v2,v3,options) {
         if (arguments.length < 4) {
           throw new Error('Handlerbars Helper "compare" needs 2 parameters');
         }
         var length=arguments.length-1;
         var args=Array.prototype.slice.call(arguments,1,length);
         var result= args.some(function(item){
           return item==v1;
         })
         if (result) {
           return options.fn(this);
         } else {
           return options.inverse(this);
         }
     });
     Handlebars.registerHelper('',function(){

     });

     Handlebars.registerHelper('formatprice', function(price, options){
          var price=parseFloat(price);
         return ((price/100).toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
     });
    Handlebars.registerHelper('formatpriceMillion', function(price, options){
         var price=parseFloat(price);
        return (price/1000000 + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
    });
     Handlebars.registerHelper('formatweight', function(weight, options){
          var weight=parseFloat(weight);
          return ((weight/1000).toFixed(3) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
     });
     Handlebars.registerHelper('formatDate', function(date, options){
          var date=date.substring(0,10);
          return date;
     });
     Handlebars.registerHelper('formatDate2', function(date, options){
          var date=date.substring(0,16);
          return date;
     });
     Handlebars.registerHelper("addOne",function(index){
         //返回+1之后的结果
         return index+1;
    });
