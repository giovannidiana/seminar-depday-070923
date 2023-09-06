var svg = d3.select("#testdiv")
  .append("svg")
  .attr("width", 500)
  .attr("height", 200);
  
var rect = svg.append("rect")
 .attr("width",500)
 .attr("height",200)
 .attr("fill", "#eee")
 
var g = svg.append("g");
  
var zoomed = function(event) {
      g.attr("transform", event.transform);
}

rect.call(d3.zoom().on("zoom",zoomed))
 .on("click", function(event) {
         var xy = d3.pointer(event,g.node());
         console.log(xy[0],xy[1])
         
         g.append("circle")
           .attr("r", 5)
           .attr("cx", xy[0])
           .attr("cy", xy[1])
           .attr("fill","crimson");
      })
