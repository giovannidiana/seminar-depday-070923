//var color_vec = d3.range(6).map(d=>'#'+Math.floor(Math.random() * Math.pow(2,32) ^ 0xffffff).toString(16).substr(-6));

var npart=10
var color_vec = ["red","blue","magenta","yellow","green","purple","cyan","orange","pink","grey"]
var state=[];
var state2 = Array(npart)

for(var i=0;i<npart;i++){
    state.push({time:1,
                cy: 100+60*i,
                r:  math.random(2,30),
                color: color_vec[i]})
   
}

d3.select("#svg1").selectAll("circle.time_1")
    .data(state)
    .enter()
    .append("circle")
    .attr("stroke","black")
    .attr("fill",(d,i)=>color_vec[i])
    .attr("fill-opacity",1)
    .attr("class","time_1")
    .attr("cx",(d,i) => 200+120*(i%5) +math.random(30))
    .attr("cy",(d,i) => 200+200*math.floor(i/5)+math.random(100))
    .attr("r",d=>40)


function start(){
    d3.select("#svg1").selectAll("circle.time_1")
        .transition()
        .duration(500)
        .attr("cx",d=> 100)
        .attr("cy",d=> d.cy)
        .attr("r",d=>d.r)

    d3.select("#svg1").append("line")
        .style("stroke","black")
        .attr("x1",100)
        .attr("x2",500)
        .attr("y1",50)
        .attr("y2",50)

    d3.select("#svg1").append("text")
        .attr("x",100)
        .attr("y",40)
        .attr("text-anchor","middle")
        .text("t=1")

    d3.select("#svg1").append("text")
        .attr("x",400)
        .attr("y",40)
        .attr("text-anchor","middle")
        .text("t=2")

    d3.select("#ol1").append("li")
        .attr("font-size","26px")
        .text("Assign importance weights using data at t=1")


}


function resample(){
    // pick 6 at random

    var ancestor = d3.range(npart);
    var Z=state.reduce((s,x) => s+x.r,0);

    var weights = d3.range(npart).map(i => state[i].r/Z)

    for(var i=0;i<npart;i++){
        var r=runif(weights);
        ancestor[i] = r
    }

    for(var i=0;i<npart;i++){
        state2[i]=state[ancestor[i]]
        state2[i]={time:2,cy:100+60*i,r:20,color:state[ancestor[i]].color}
    }

    d3.select("#svg1").selectAll("circle.time_2")
        .data(state2)
        .enter()
        .append("circle")
        .attr("stroke","black")
        .attr("fill",d => d.color)
        .attr("fill-opacity",0)
        .attr("class","time_2")
        .attr("cx",100)
        .attr("cy",(d,i)=>state[ancestor[i]].cy)
        .attr("r",(d,i)=>state[ancestor[i]].r)
        .transition()
        .duration(1000)
        .attr("cx",200)
        .attr("cy",(d,i)=> state[i].cy)
        .attr("r",20)
        .attr("fill-opacity",0.5)

    d3.select("#svg1").selectAll("line.time_1")
        .data(d3.range(npart))
        .enter()
        .append("line")
        .attr("class","time_1")
        .attr("x1",i=>100)
        .attr("x2",i=>100)
        .attr("y1",i=>state[ancestor[i]].cy)
        .attr("y2",i=>state[ancestor[i]].cy)
        .attr("stroke","grey")
        .transition()
        .duration(1000)
        .attr("y2",i=>state2[i].cy)
        .attr("x2",200)

    d3.select("#ol1").append("li")
        .attr("font-size","26px")
        .text("Multinomial resampling")
    
}

function evolve(){
    d3.select("#svg1").selectAll("circle.time_3")
        .data(d3.range(npart))
        .enter()
        .append("circle")
        .attr("class","time_3")
        .attr("stroke","black")
        .attr("cy",i=>state2[i].cy)
        .attr("cx",200)
        .attr("r",i=>state2[i].r)
        .attr("fill",i=>state2[i].color)
        .attr("fill-opacity",0)
        .transition()
        .duration(1000)
        .attr("cx",400)
        .attr("fill-opacity",1)
        .attr("r",i=>math.random(2,30))

    d3.select("#svg1").selectAll("line.time_2")
        .data(d3.range(npart))
        .enter()
        .append("line")
        .attr("class","time_2")
        .attr("x1",i=>200)
        .attr("x2",i=>200)
        .attr("y1",i=>state2[i].cy)
        .attr("y2",i=>state2[i].cy)
        .attr("stroke","grey")
        .transition()
        .duration(1000)
        .attr("x2",400)

    d3.select("#ol1").append("li")
        .attr("font-size","26px")
        .text("Particle evolution using a proposal kernel and importance reweighting")

}

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
