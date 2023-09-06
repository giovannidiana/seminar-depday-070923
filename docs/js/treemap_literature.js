

Promise.all([
    d3.json("https://gist.githubusercontent.com/giovannidiana/a8d50e2a1907dcaec470c07a69aca522/raw/methods.json"),
    d3.json("https://gist.githubusercontent.com/giovannidiana/a8d50e2a1907dcaec470c07a69aca522/raw/articles.json")])
        .then(function(files){

        var tree_data=[];
        for(var i=0;i<files[0].length;i++){
            tree_data.push({label:files[0][i].label,
                            parent:files[0][i].parent,
                            ht:""});
        }
        for(var i=0;i<files[1].length;i++){
            var label;
            if(files[1][i].acronym!=""){
                label=files[1][i].acronym
            } else {
                label=files[1][i].label
            }
            tree_data.push({label:label,
                parent:files[1][i].parent,
                ht:files[1][i].authors.join(", ")+"<br>"+files[1][i].title});
        }


        function unpack(rows, key) {
            return rows.map(function(row) { return row[key]});
        }


        var data = [{
            type: "treemap",
            ids:unpack(tree_data,'label'),
            labels: unpack(tree_data, 'label'),
            parents: unpack(tree_data, 'parent'),
            hovertext: unpack(tree_data,'ht')
        }];

        console.log(data);

        var layout = {
            margin: {
                l: 5,
                r: 5,
                b: 5,
                t: 5,
                pad: 4
            },
            font: {
                family: 'Courier New, monospace',
                size: 18,
                color: '#7f7f7f'
            }
            //paper_bgcolor: 'rgb(215,215,215)'
        };

        Plotly.newPlot('tm1', data,layout);
    })
