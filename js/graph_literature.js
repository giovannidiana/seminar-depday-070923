

Promise.all([
    d3.csv("https://gist.githubusercontent.com/giovannidiana/a8d50e2a1907dcaec470c07a69aca522/raw/layout.XY.csv"),
    d3.json("https://gist.githubusercontent.com/giovannidiana/a8d50e2a1907dcaec470c07a69aca522/raw/articles.json")])
    .then(function(files){
        var article_data=[];
        for(var i=0;i<files[0].length;i++){
            article_data.push({
                label:files[1][i].label,
                method:files[1][i].parent,
                citations:files[1][i].citations,
                year:files[1][i].year,
                xpos:files[0][i].x,
                ypos:files[0][i].y
            });
        }

        function unpack(rows, key) {
            return rows.map(function(row) { return row[key]});
        }

        var graph_traces=[];
        var methods = unpack(article_data,'method').filter((x,i,a) => a.indexOf(x)==i);

        for(var i=0; i<methods.length;i++){
            var ad=article_data.filter((_,k)=>article_data[k].method==methods[i]);

            graph_traces.push({
                name: methods[i],
                type: "scatter",
                mode: "markers+text",
                x:unpack(ad,"xpos"),
                y:unpack(ad,"ypos"),
                text:unpack(ad,"label"),
                textposition:"bottom center",
                hovermode:"closest",
                marker:{
                    size:unpack(ad,"citations").map(d=>3*Math.log(d+1))
                }
            });
        }

        var layout = {
            margin: {
                l: 5,
                r: 5,
                b: 5,
                t: 5,
                pad: 4
            },
            legend:{
                itemsizing:'constant'
            },
            //paper_bgcolor: 'rgb(215,215,215)'
        };

        Plotly.newPlot('tm2', graph_traces,layout);
    })
