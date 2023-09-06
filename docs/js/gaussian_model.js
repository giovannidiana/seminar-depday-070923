const cholesky = function (array) {
	const zeros = [...Array(array.length)].map( _ => Array(array.length).fill(0));
	const L = zeros.map((row, r, xL) => row.map((v, c) => {
		const sum = row.reduce((s, _, i) => i < c ? s + xL[r][i] * xL[c][i] : s, 0);
		return xL[r][c] = c < r + 1 ? r === c ? Math.sqrt(array[r][r] - sum) : (array[r][c] - sum) / xL[c][c] : v;
	}));
	return L;
}

var N=200;
var X=math.zeros(N);
var covar=math.zeros(N,N);

var L;
var gp=math.zeros(N);
var theta=1;
var rad=10;

// =====================
var margin = {top: 10, right: 30, bottom: 80, left: 80},
        width = 600 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;


var gaussian_process_svg = d3.select("#gaussian_process")
	.append("svg")
	.attr("id","svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform",
		"translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleLinear()
	.domain([0, N])
	.range([ 0, width ]);

var xAxis=gaussian_process_svg.append("g")
	.attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

gaussian_process_svg.append("text")
	.attr("text-anchor", "middle")
	.attr("x", width/2)
	.attr("y", height + 40)
	.text("time");

// Add Y axis
var y = d3.scaleLinear()
	.domain([-3, 3])
	.range([ height, 0]);

var yAxis=gaussian_process_svg.append("g")
	.call(d3.axisLeft(y));

gaussian_process_svg.append("g")
	.attr("transform","translate ("+"-40"+","+height/2+")")
	.append("text")
	.attr("text-anchor", "middle")
	.attr("transform","rotate (-90)")
	.text("modulation");

var scatter = gaussian_process_svg.append('g')
    .attr("clip-path","url(#clip)");

var X = d3.range(N);

for(let i=0;i<N;i++){
    for(let k=0;k<N;k++){

        var dr=X[i]-X[k];
        if(i!=k){
            covar.subset(math.index(i,k),theta*math.exp(-1.0/4.0*math.pow(dr/rad,2)));
        } else {
            covar.subset(math.index(i,k),1e-6+theta*math.exp(-1.0/4.0*math.pow(dr/rad,2)));
        }


           
    }
}

var L = math.matrix(cholesky(covar._data));
console.log(L);
var current_id=0;

function gen(){
    gaussian_process_svg.selectAll("path.gp").each(function(){
        var t=d3.select(this);
        var op=t.style("opacity");
        t.style("opacity",op*0.7)
    })

    current_id++;
    var gp=math.multiply(L,randn(N));
    
    scatter.append("path")
        .datum(gp._data)
        .attr("class","gp")
        .attr("fill","none")
        .attr("stroke","black")
        .attr("id",current_id)
        .style("opacity",1)
        .attr("d",d3.line()
            .x((d,i)=>x(i))
            .y((d)=>y(d)))

}

// Gaussian random number (mean = 0, variance = 1;
//	Gaussian noise with the polar form of the Box-Muller transformation
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

function randn(n){
  var res=[];
  for(let i=0;i<n;i++){
    res.push(randnScalar());
  }
  return res;
}

function rand_unif(n,a,b){
    var res=[];
    for(let i =0;i<n;i++){
        res.push(a+(b-a)*math.random())
    }
    return res;
}


