var data = [{"index":1,"cluster":1,"x":100,"y":100}]
var height=300, width=1300;

function runif(prob){

    var cumsum=Array(prob.length).fill(0);
    cumsum[0]=prob[0]
    for(var i=1;i<prob.length;i++) cumsum[i]=cumsum[i-1]+prob[i]
    var u=math.random()
    var s=0;

    while(u>cumsum[s]){
        s+=1
    };

    return s
}

// A scale that gives a X target position for each group
var x = d3.scaleOrdinal()
  .domain(d3.range(1,10))
  .range(d3.range(1,10).map(d=>d*100))

// A color scale
var color = d3.scaleOrdinal()
  .domain(d3.range(1,10))
  .range(["#007FFF","#7FFF7F","#0000FF","#FF0000","#FF7F00","#00FFFF","#FFFF00","#00007F","#7F0000"])

var svg = d3.select("#svg1")

svg.on("mousedown",restart)

var simulation = d3.forceSimulation(data)
    .force("x", d3.forceX().strength(.1).x( function(d){ return x(d.cluster) } ))
    .force("y", d3.forceY().strength(.1).y( height/2 ))
    .force("collide", d3.forceCollide().strength(.1).radius(10).iterations(10)) // Force that avoids circle overlapping
    .on("tick", function(d){
              svg.selectAll("circle")
                 .data(data)
                 .join("circle")
                 .attr("cx", d=> d.x)
                 .attr("cy", d=> d.y)
                 .attr("r",10)
                 .style("stroke","black")
                 .style("fill",d=>color(d.cluster))
    })

var alpha=0.2
var node = svg.selectAll(".node")
var index=2;

function restart(){
    newdata = simulation.nodes().map(function(x){
        return {"index":x.index, 
            "cluster":x.cluster,
            "x":x.x, 
            "y":x.y,
            "vx":x.vx,"vy":x.vy}})

    index=index+1
    var maxcluster = d3.max(newdata.map(x=>x.cluster));
    var probs = d3.range(1,maxcluster+1).map( function(i){
                                                 return newdata.filter(d => d.cluster==i).length/(newdata.length + alpha)})
    probs.push(alpha/(newdata.length+alpha))

    var newcluster = runif(probs)
    newdata.push({"index":index,"cluster":newcluster,"x":x(newcluster),"y":0,"vx":0,"vy":0})
    //simulation.stop()
    simulation=d3.forceSimulation(newdata)
        .force("x", d3.forceX().strength(.05).x( function(d){ return x(d.cluster) } ))
        .force("y", d3.forceY().strength(.05).y( height/2 ))
        .force("collide", d3.forceCollide().strength(.1).radius(10).iterations(10)) // Force that avoids circle overlapping
        .on("tick", function(d){
                  svg.selectAll("circle")
                     .data(newdata)
                     .join("circle")
                     .attr("cx", d=> d.x)
                     .attr("cy", d=> d.y)
                     .style("stroke","black")
                     .attr("r",10)
                     .style("fill",d=>color(d.cluster))
        })
    //simulation.restart()

}
