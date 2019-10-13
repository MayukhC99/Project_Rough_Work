
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
    
    let a = [];
	
    
    function binary(a,l,r,x){

        let ar=[];
        for(let index in a){
            ar[index]= a[index].html();//collecting the innerHTML of html elements through jquery objects
        }

        let temp=$('#temp');
        let mid;

        let flag=false;
        
        while(l<=r){
            mid=l+parseInt((r-l)/2);
            
            let value=a[mid].css("left");
            let v = parseInt(value) -10;
            value = v+"px";
       
            temp.animate({left:value},50,function(){    //this function will be queued under #temp object
                if(!flag){
                    temp.css("visibility","visible");
                    flag=true;
                }
            }).delay(1000);
            

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
		for(i = 1; i <= 11; i++)
		{
            s = "#d"+i
            a[i]=$(s);   	
		}
        var op=binary(a,1,11,val);
        if (op===-1){
            $('#temp').queue(function(){    /*queue is called for temp #element cause all other animations are queued under
                                                #temp element. So alert will be printed at last. */
                alert('element not found');
                $(this).dequeue();
            });
        }
        else
            $('#temp').queue(function(){    /*queue is called for temp #element cause all other animations are queued under
                                                #temp element. So alert will be printed at last. */
                alert('element found at position number '+op);
                $(this).dequeue();
            });

    }
    
    let start_btn= $('#b1')
    start_btn.click(function(){
        let val=parseInt($("#text").val());
        fun(val);
    })

})