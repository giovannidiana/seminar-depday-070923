function gentrace(n){
    var burst_vec = Array(n).fill(0);
    var c_vec = Array(n).fill(0);
    var base_vec = Array(n).fill(0);
    var s_vec = Array(n).fill(0);
    var y_vec = Array(n).fill(0);
    var time  = Array(n).fill(0).map((_,i) => i*1/30);
    var W=[[1-0.01,0.01],[0.01,1-0.01]];
    var rate=[0.01,0.2]

    var omega = 0
    var gamma = 0.6
    var Amax  = 1//49.17945

    for(var i=1;i<n;i++){

        if(math.random()<W[burst_vec[i-1]][1]){
            burst_vec[i]=1;
        } else {
            burst_vec[i]=0
        }

        s_vec[i] = randPois(rate[burst_vec[i]])

        if(i>2){
            c_vec[i] = c_vec[i-1]*gamma + c_vec[i-2]*omega + 1/Amax*s_vec[i]
        } 

        base_vec[i]=base_vec[i-1]+randnScalar()*0.02;
        y_vec[i]=c_vec[i]+base_vec[i]

    }
    return({time:time,s:s_vec,c:c_vec,burst:burst_vec,baseline:base_vec,y:y_vec})
}

var tr = gentrace(1000);
var traces = [];
var spiketimes = tr.time.filter((_,i) => tr.s[i]>0)

function setup_trace(){

    traces.push(  {
        name:'burst',
        type:'scatter',
        x:tr.time,
        showlegend:false,
        y:Array(1000).fill(0),
        line:{simplify:false}
    } );

    for(var i=0;i<spiketimes.length;i++){
        traces.push( {
            type:'scatter',
            mode:'lines',
            showlegend:false,
            x:[spiketimes[i],spiketimes[i]],
            y:[0,0]
        });
    }

    traces.push(  {
        name:'baseline',
        type:'scatter',
        x:tr.time,
        showlegend:false,
        y:Array(1000).fill(0),
        line:{simplify:false}
    });



    var layout={
        xaxis:{
            title:{text:"time (s)"},
            range:[0,d3.max(tr.time)],

        },
        yaxis:{
            range:[d3.min(tr.y),d3.max(tr.y)]
        }
    }


    Plotly.newPlot("plot",traces,layout,{responsive:true})

}

function update_burst(){
    Plotly.animate("plot",{
        data: [{showlegent:true,x:tr.time,y:tr.burst}],
        traces: [0],
        layout:{}
    }, {
        transition: {
            duration:500,
            easing:'cubic-in-out'
        },
        frame:{
            duration:500
        }
    })

    d3.select("#ol1").append("li")
        .attr("font-size","26pt")
        .text("Bursting activity: 2-state Markov process")
}

function update_baseline(){
    Plotly.animate("plot",{
        data: [{x:tr.time,y:tr.baseline}],
        traces: [spiketimes.length+1],
        layout:{}
    }, {
        transition: {
            duration:500,
            easing:'cubic-in-out'
        },
        frame:{
            duration:500
        }
    })

    traces.push(  {
        name:'calcium',
        type:'scatter',
        x:tr.time,
        showlegend:false,
        y:tr.baseline,
        line:{simplify:false}
    });
    
    d3.select("#ol1").append("li")
        .attr("font-size","26pt")
        .text("Baseline modulation: Brownian motion")
}

function update_calcium(){
    Plotly.animate("plot",{
        data: [{x:tr.time,y:tr.y}],
        traces: [spiketimes.length+2],
        layout:{}
    }, {
        transition: {
            duration:500,
            easing:'cubic-in-out'
        },
        frame:{
            duration:500
        }
    })
    
    d3.select("#ol1").append("li")
        .attr("font-size","26pt")
        .text("Calcium dynamics: autoregressive process")

    d3.select("#calcium_eq").style("display","block")
}

function update_spikes(){

    var sparray=[]

    for(var i=0;i<spiketimes.length;i++){
        sparray.push({x:[spiketimes[i],spiketimes[i]],
                      y:[0,1],
                      line: {color:"rgb(100,100,0)"}})
    }

    Plotly.animate("plot",{
        data:sparray,
        traces: d3.range(1,spiketimes.length+1),
        layout:{}
    }, {
        transition: {
            duration:500,
            easing:'cubic-in-out'
        },
        frame:{
            duration:500
        }
    })
    
    d3.select("#ol1").append("li")
        .attr("font-size","26pt")
        .text("Spikes: Poisson process")
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


function randPois(lambda){
    var L=math.exp(-lambda);
    var k=0;
    var p=1;

    while(p>L){
        k+=1
        var u=math.random()
        p=p*u
    }

    return k-1;
}
