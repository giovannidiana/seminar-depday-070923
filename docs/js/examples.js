var layout = {
    xaxis:{
        title:{
            text:"time (s)"
        }
    }
}


d3.csv("https://gist.githubusercontent.com/giovannidiana/a8d50e2a1907dcaec470c07a69aca522/raw/linescan_trace.csv").then(function(data){
    var trace = {
        mode:"lines",
        x:data.map(d=>+d['t']),
        y:data.map(d=>+d['y'])
    }

	Plotly.newPlot("invitro_example", [trace],layout);


})

d3.csv("https://gist.githubusercontent.com/giovannidiana/a8d50e2a1907dcaec470c07a69aca522/raw/invivo_trace.csv").then(function(data){
    var trace = {
        mode:"lines",
        x:data.map(d=>+d['t']),
        y:data.map(d=>+d['y'])
    }

	Plotly.newPlot("invivo_example", [trace],layout);


})

