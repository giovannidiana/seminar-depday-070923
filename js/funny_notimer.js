var maxheigth=10

function gentrace(n){
    var vector = [];
    var c=0
    var x=0
    var i=0
    while(i<n){
        i+=1
        var s = false
        var c1 = c*math.exp(-0.5)
        if(math.random()<0.2 && i>n/2) s=true
        if(s) c1+=2*math.abs(randnScalar())
        vector.push({x1:i-1,x2:i,y1:c,y2:c1})
        c=c1
    }
    return(vector)
}

function display_trace(){
    //console.log("display trace")
    var N=math.round(d3.select("body").node().getBoundingClientRect().width);
    d3.select("#svg1").attr("viewBox",[0,0,N,10].join(" "))
    tr = gentrace(N)

    d3.select("#svg1").selectAll("line").remove()

    d3.select("#svg1").selectAll("line")
        .data(tr)
        .enter()
        .append("line")
        .attr("x1",function(d){ return d.x1})
        .attr("x2",function(d){ return d.x2})
        .attr("y1",function(d){return maxheigth-d.y1})
        .attr("y2",function(d){ return maxheigth-d.y2})
        .attr("stroke-width",0.5)
        .attr("stroke","black")
        .style("opacity", 0)
        .transition()
        .duration(0)
        .delay(function(_, i) {
            return i/4})
        .style("opacity",1)
}

// Gaussian random number (mean = 0, variance = 1;
//  Gaussian noise with the polar form of the Box-Muller transformation
function randnScalar() {

    var x1;
    var x2;
    var w;
    var y1;
    var y2;

    do {
        x1 = 2.0 * math.random() - 1.0;
        x2 = 2.0 * math.random() - 1.0;
        w = x1 * x1 + x2 * x2;
    } while ( w >= 1.0 );

    w = math.sqrt( (-2.0 * math.log( w ) ) / w );
    y1 = x1 * w;
    y2 = x2 * w;

    return y1;
}

