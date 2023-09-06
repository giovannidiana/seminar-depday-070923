var page;
var page_next;
var page_prev;
var nodelist=d3.selectAll("meta")._groups[0];

for(var i=0;i<nodelist.length;i++){
    if(nodelist[i].getAttribute("data-pagenext")!=null){
        page_next=nodelist[i].getAttribute("data-pagenext");
        page_prev=nodelist[i].getAttribute("data-pageprev");
    }
}

var visibility_index=0;

d3.select("body")
    .on("keypress", function(event) {
        if(event.keyCode==102){
            window.location.href=page_next+".html";
        } else if (event.keyCode==98 && page_prev!=undefined){
            window.location.href=page_prev+".html";
        } 
       
        // move forward
        console.log(event.keyCode)
    })

d3.select("body")
    .on("click",function(){
        visibility_index+=1;
        var S=d3.selectAll("[data-vi='"+visibility_index+"']").style("display","block");
    });


