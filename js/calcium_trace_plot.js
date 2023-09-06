
function gentrace(n){
    var vector = [];
    var time   = [];
    var c=0
    var b=0
    var x=0
    var i=0
    while(i<n){
        i+=1
        var s = false
        b+=randnScalar()*0.001;
        var c1 = c*math.exp(-0.1/2)
        if(math.random()<0.1) s=true
        if(s) c1+=math.abs(randnScalar())
        c1+=b+randnScalar()*0.06
        vector.push(c1);
        time.push(i*0.1)
        c=c1
    }
    return({x:time,y:vector})
}

function display_trace(){
    var tr = gentrace(1000)

    var traces = [];

    traces.push(  {
        name:'data',
        type:'scatter',
        x:tr.x,
        y:Array(1000).fill(0),
        line:{simplify:false}
    } );

    var layout={
        xaxis:{
            title:{text:"time (s)"},
            range:[0,1000*0.1],

        },
        yaxis:{
            range:[d3.min(tr.y),d3.max(tr.y)]
        }
    }

    Plotly.newPlot("div1",traces,layout,{responsive:true})
    Plotly.animate("div1",{
        data: [{x:tr.x,y:tr.y}],
        traces: [0],
        layout:layout
    }, {
        transition: {
            duration:500,
            easing:'cubic-in-out'
        },
        frame:{
            duration:500
        }
    })
}


display_trace()

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

