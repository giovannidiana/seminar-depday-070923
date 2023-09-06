var list_li = ["Low signal to noise ratio","Baseline modulation","bursting activity"]


list_li.forEach(function(d,i){
    d3.timeout(function(){
        d3.select('#ul1')
            .append('li').text(d);
            }, i*1000)
            });





