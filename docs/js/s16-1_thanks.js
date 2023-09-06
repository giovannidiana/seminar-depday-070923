var npart=50
var pos = []

for(var i=0; i<npart; i++){
    pos[i] = {cx:600+500*math.sin(2*math.pi*i/npart),
        cy:400+300*math.cos(i*2*math.pi/npart)}
}

d3.select("#svg1").selectAll("circle")
    .data(pos)
    .enter()
    .append("circle")
    .attr("stroke","grey")
    .attr("fill","orange")
    .attr("cx",d=>d.cx)
    .attr("cy",d=>d.cy)
    .attr("r",d=>math.random(10,30))
    .attr("fill-opacity",0.3)


d3.select("#svg1").append("text")
    .attr("x",600)
    .attr("y",400)
    .attr("font-size","24pt")
    .text("Thank You!")

function animate(){
    for(var i=0;i<npart;i++){
        pos[i] = {cx:pos[i].cx+10*math.random(-1,1),
            cy:pos[i].cy+10*math.random(-1,1)}
    }

    d3.select("#svg1").selectAll("circle")
        .transition()
        .duration(200)
        .attr("cx",(d,i)=>pos[i].cx)
        .attr("cy",(d,i)=>pos[i].cy)
}

d3.timer(animate,100)
