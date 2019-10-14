
$(function(){


    $.fn.animateHighlight = function (highlightColor, duration) {
        var highlightBg = highlightColor || "#FFFF9C";
        var animateMs = duration || "fast"; // edit is here
        var originalBg = this.css("background-color");

        if (!originalBg || originalBg == highlightBg)
            originalBg = "#FF0000"; // default to red

        jQuery(this)
            .css("backgroundColor", highlightBg)
            .animate({ backgroundColor: originalBg }, animateMs, null, function () {
                jQuery(this).css("backgroundColor", originalBg); 
            });
    };

    function queue(start) {
        var rest = [].splice.call(arguments, 1),
            promise = $.Deferred();
    
        if (start) {
            $.when(start()).then(function () {
                queue.apply(window, rest);
            });
        } else {
            promise.resolve();
        }
        return promise;
    }
    
    let a = [];
	
    
    function binary(a,l,r,x){

        let ar=[];
        for(let index in a){
            ar[index]= a[index].html();//collecting the innerHTML of html elements through jquery objects
        }

        let temp=$('#temp');
        let tempLeft=$('#tempLeft');
        let tempRight=$('#tempRight');
        let mid;

        let flag=false;
        let flagl=false;
        let flagr=false;
        
        while(l<=r){
            mid=l+parseInt((r-l)/2);
            
            /***********************Calculations for adjustment***********************/
            let value=a[mid].css("left");
            let v = parseInt(value) -10;
            value = v+"px";
            
            let valuel=a[l].css("left");
            v=parseInt(valuel)-10;
            valuel=v+"px";

            let valuer=a[r].css("left");
            v=parseInt(valuer)-10;
            valuer=v+"px";
            /************************************************************************/


            /*********************************Animations****************************/
            
            queue(function(){   /*all the functions will be queued and work simultaneously in each queue pop. 
                                    If return tempLeft.animate... 
                                    is mentioned then all the functions inside queue will occur one after another*/
                tempLeft.animate({left:valuel},50,function(){
                    if(!flagl){
                        tempLeft.css("visibility","visible");
                        flagl=true;
                    }  
                }).delay(3000);    
            },function(){
                tempRight.animate({left:valuer},50,function(){
                    if(!flagr){
                        tempRight.css("visibility","visible");
                        flagr=true;
                    }
                }).delay(3000);
            },function(){
                temp.animate({left:value},50,function(){    
                    if(!flag){
                        temp.css("visibility","visible");
                        flag=true;
                    }
                }).delay(3000);
            })

            /*temp.animate({left:value},50,function(){    //this function will be queued under #temp object
                if(!flag){
                    temp.css("visibility","visible");
                    flag=true;
                }
            }).delay(1000);*/
            /***********************************************************************/

            if(ar[mid]==x){
                return mid;
            }
            if(x<ar[mid])
                r=mid-1;
            else
                l=mid+1;
                
            
        }
        return -1;
}
	
	function fun(val)
	{
		
		let s="";
		for(i = 1; i <= 14; i++)
		{
            s = "#d"+i
            a[i]=$(s);   	
		}
        var op=binary(a,1,14,val);
        if (op===-1){
                                                /*queue is called for temp #element cause all other animations are queued under
                                                #temp element. So alert will be printed at last. */
                alert('element not found');
                //$(this).dequeue();
        }
        else{
                                                /*queue is called for temp #element cause all other animations are queued under
                                                #temp element. So alert will be printed at last. */
                //$(this).delay(3000)
                alert('element found at position number '+op);
                //$(this).dequeue();
        }

    }
    
    let start_btn= $('#b1')
    start_btn.click(function(){
        let val=parseInt($("#text").val());
        fun(val);
    })

})