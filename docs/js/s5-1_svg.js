var svg1 = d3.select("#svg1")
var pos_x_1=550, 
    pos_x_2=850;

var c1 = svg1
            .append("circle")
                .attr("fill","cyan")
                .attr("fill-opacity","0.1")
                .attr("stroke","black")
                .attr("stroke-width",3)
                .attr("r",150)
                .attr("cx",0)
                .attr("cy",200)
                .style("opacity",0)
                .transition()
                    .duration(1000)
                    .attr("cx",pos_x_1)
                    .style("opacity",1)

var text1 = svg1.append("text")
                .attr("x",0)
                .attr("y",30)
                .attr("font-size","26px")
                .attr("text-anchor","middle")
                .text("Model-based")
                .style("opacity",0)
                .transition()
                    .duration(1000)
                    .attr("x",pos_x_1)
                    .style("opacity",1)


var c2 = svg1
            .append("circle")
                .attr("fill","magenta")
                .attr("fill-opacity","0.1")
                .attr("stroke","black")
                .attr("stroke-width",3)
                .attr("cx",1600)
                .attr("cy",200)
                .attr("r",150)
                .style("opacity",0)
                .transition()
                    .duration(1000)
                    .attr("cx",pos_x_2)
                    .style("opacity",1)

var text1 = svg1.append("text")
                .attr("x",1500)
                .attr("y",30)
                .attr("font-size","26px")
                .attr("text-anchor","middle")
                .text("Machine learning")
                .transition()
                    .duration(1000)
                    .attr("x",pos_x_2)
                    .style("opacity",1)

var MB_approaches=[{title:"optimization",pos:[pos_x_1,180]},
                   {title:"statistical inference", pos:[pos_x_1,220]}];

var ML_approaches=[{title:"deep learning",pos:[pos_x_2,160]},
                   {title:"SVM", pos:[pos_x_2,200]},
                   {title:"pattern matching",pos:[pos_x_2,240]}];

svg1.selectAll("text.MB").data(MB_approaches)
                .enter()
                .append("text")
                .attr("font-size","22px")
                .attr("text-anchor","middle")
                .attr("x",0)
                .attr("y",d=>d.pos[1])
                .text(d=>d.title)
                .transition()
                    .duration(1000)
                    .attr("x",d=>d.pos[0])
                    .style("opacity",1)

svg1.selectAll("text.ML").data(ML_approaches)
                .enter()
                .append("text")
                .attr("font-size","22px")
                .attr("text-anchor","middle")
                .attr("x",d=>1500)
                .attr("y",d=>d.pos[1])
                .text(d=>d.title)
                .transition()
                    .duration(1000)
                    .attr("x",d=>d.pos[0])
                    .style("opacity",1)

