
// set the dimensions and margins of the graph

var margin = {top: 10, right: 30, bottom: 80, left: 80},
	width = 600 - margin.left - margin.right,
	height = 600 - margin.top - margin.bottom;

var region=[],

    scaleX = d3.scaleLinear()
    .domain([0,2])
    .range([0,600]),

    scaleY = d3.scaleLinear()
    .domain([0,1])
    .range([600,0]),

    param_plot_svg = d3.select('#param_plot1').append('svg')
	.attr("width", width)
	.attr("height", height)
    .on('click', update_plot);

// Build the parametric region

for(let i=0;i<100;i++){
    region.push({
        x: i*width/(99.0),
        y: height*Math.pow(i*2.0/99.0,2)/4.0
    })
}

region.push({x: width, y:height});
region.push({x: width/2.0, y:0});
region.push({x: 0, y:0});

param_plot_svg.append("path")
	.datum(region)
    .attr("d",d3.line()
                .x(d=>d.x)
                .y(d=>d.y))
    .attr("stroke","black")
    .attr("fill","green")
    .attr("stroke-width",2);

param_plot_svg.append("rect")
    .attr("x",0)
    .attr("y",0)
    .attr("width",width)
    .attr("height",height)
    .attr("stroke","black")
    .attr("fill","none")

param_plot_svg.append("text")
    .attr('x',30)
    .attr('y',height/2)
    .text("omega")
    .attr("transform","rotate(-90 30 "+height/2+")")

param_plot_svg.append("text")
    .attr('x',width/2)
    .attr('y',height-30)
    .text("gamma")

// Add plot

// append the svg object to the body of the page

var param_plot_svg2 = d3.select("#param_plot2")
	.append("svg")
	.attr("id","svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform",
		"translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleLinear()
	.domain([0, 100])
	.range([ 0, width ]);

var xAxis=param_plot_svg2.append("g")
	.attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

param_plot_svg2.append("text")
	.attr("text-anchor", "middle")
	.attr("x", width/2)
	.attr("y", height + 40)
	.text("time steps");

// Add Y axis
var y = d3.scaleLinear()
	.domain([0, 2])
	.range([ height, 0]);

var yAxis=param_plot_svg2.append("g")
	.call(d3.axisLeft(y));

param_plot_svg2.append("g")
	.attr("transform","translate ("+"-40"+","+height/2+")")
	.append("text")
	.attr("text-anchor", "middle")
	.attr("transform","rotate (-90)")
	.text("response kernel");

var scatter = param_plot_svg2.append('g')
    .attr("clip-path","url(#clip)");

function update_plot(event){
    var N=100;
    var coords = d3.pointer(event,param_plot_svg.node());
    var gamma=coords[0]/width*2.0;
    var omega=-coords[1]/height;
    console.log(gamma,omega,omega>-Math.pow(gamma,2)/4.0,omega<Math.min(0,1-gamma));


    var response = [{x:0,y:1},{x:0,y:gamma}];
    for(var i=2;i<N;i++){
        response.push({
            x:i,
            y:response[i-1].y*gamma+response[i-2].y*omega});
    }
    console.log(response);


    var random_color=d3.rgb(Math.random()*255,
                            Math.random()*255,
                            Math.random()*255);

    param_plot_svg.append("circle")
        .attr("cx",coords[0])
        .attr("cy",coords[1])
        .attr("r",3)
        .attr("fill",random_color)

    scatter.append("path")
        .datum(response)
        .attr("fill","none")
        .attr("stroke",random_color)
        .attr("d",d3.line()
            .x(d=>x(d.x))
            .y(d=>y(d.y)))


}

