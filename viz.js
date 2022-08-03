function exportBar() {
    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 30, bottom: 40, left: 150 },
        width = 800 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#exportChart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    
    // Parse the Data
    d3.csv("export.csv", function (data) {

        // console.log(data)

        //Data preparation - able to get date
        let exportData = data.map((x) => ({Commodity: x.Commodity, value: x.value, country: x.country, year: x.year}));
        let listOfExport = [];
        
        // slider
        var valuesSlider = document.getElementById('slider');
        // shown on slider
        var valuesForSlider = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018];  
        
        // to get the year value
        var format = {
            to: function(value) {
                return valuesForSlider[Math.round(value)];
            },
            from: function (value) {
                return valuesForSlider.indexOf(Number(value));
            }
        };

        // create slider
        noUiSlider.create(valuesSlider, {
            start: [2010],
            range: { min: 0, max: valuesForSlider.length - 1 },
            step: 1,
            tooltips: true,
            format: format,
            pips: { mode: 'steps', format: format },
        }).on('slide', function(e) { //when slide will change
            console.log(e)

            if(e == 2010){ // if slider = year
                for(var i = 0; i < exportData.length; i++){
                    if(e==exportData[i].year)
                    {
                        listOfExport.push(exportData[i])
                    }
                }
            }
            else if(e == 2011){ // if slider = year
                for(var i = 0; i < exportData.length; i++){
                    if(e==exportData[i].year)
                    {
                        listOfExport.push(exportData[i])
                    }
                }
            }
            else if(e == 2012){ // if slider = year
                for(var i = 0; i < exportData.length; i++){
                    if(e==exportData[i].year)
                    {
                        listOfExport.push(exportData[i])
                    }
                }
            }
            else if(e == 2013){ // if slider = year
                for(var i = 0; i < exportData.length; i++){
                    if(e==exportData[i].year)
                    {
                        listOfExport.push(exportData[i])
                    }
                }
            }
            else if(e == 2014){ // if slider = year
                for(var i = 0; i < exportData.length; i++){
                    if(e==exportData[i].year)
                    {
                        listOfExport.push(exportData[i])
                    }
                }
            }
            else if(e == 2015){ // if slider = year
                for(var i = 0; i < exportData.length; i++){
                    if(e==exportData[i].year)
                    {
                        listOfExport.push(exportData[i])
                    }
                }
            }
            else if(e == 2016){ // if slider = year
                for(var i = 0; i < exportData.length; i++){
                    if(e==exportData[i].year)
                    {
                        listOfExport.push(exportData[i])
                    }
                }
            }
            else if(e == 2017){ // if slider = year
                for(var i = 0; i < exportData.length; i++){
                    if(e==exportData[i].year)
                    {
                        listOfExport.push(exportData[i])
                    }
                }
            }
            else if(e == 2018){ // if slider = year
                for(var i = 0; i < exportData.length; i++){
                    if(e==exportData[i].year)
                    {
                        listOfExport.push(exportData[i])
                    }
                }
            }

            //Bars
            svg.selectAll("exportBar")
            .data(topTen(metrics)) // need change here
            .enter()
            .append("rect")
            .attr("x", x_export(0))
            .attr("y", function (d) { return y_export(d.key); })
            .attr("width", function (d) { return x_export(d.value.total); }) 
            .attr("height", y_export.bandwidth())
            .attr("fill", "#69b3a2")

            .on("mouseover", function (d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html(d.key + "<br/> <br/> Total value : <b>" + d.value.total + "</b>")
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
        
        });
        
        // the year range
        valuesSlider.noUiSlider.set(['2010', '2018']);


        // somehow need pass year here
        // calcuate
        var metrics = d3.nest()
            .key(function (d) { return d.Commodity; })
            .rollup(function (v) {
                return {
                    count: v.length,
                    total: d3.sum(v, function (d) { return d.value; })
                };
            })
            .entries(exportData);
        
        console.log(listOfExport);
        console.log(exportData);
        // console.log(metrics);

        // get the top 10
        function topTen(data) {  //sorting to top 10 function
            data.sort(function (a, b) {
                return b.value.total - a.value.total;
            });
            return data.slice(0, 10);
        }

        console.log(topTen(metrics))

        // Define the div for the tooltip
        var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);


        // Add X axis
        var x_export = d3.scaleLinear()
            .domain([0, 500000])
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x_export))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        // Y axis
        var y_export = d3.scaleBand()
            .range([0, height])
            .domain(topTen(metrics).map(function (d) { return d.key; }))
            .padding(.1);
        svg.append("g")
            .call(d3.axisLeft(y_export)) 
    })

}

exportBar();

// TOP 10 COMMODITIES FOR IMPORT BARGRAPH
function importBar() {
    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 30, bottom: 40, left: 150 },
        width = 800 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#importChart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("import.csv", function (data) {

        // console.log(data)

        var metrics = d3.nest()
            .key(function (d) { return d.Commodity; })
            .rollup(function (v) {
                return {
                    count: v.length,
                    total: d3.sum(v, function (d) { return d.value; })
                };
            })
            .entries(data);
        // console.log(metrics);

        function topTen(data) {  //sorting to top 10 function
            data.sort(function (a, b) {
                return b.value.total - a.value.total;
            });
            return data.slice(0, 10);
        }

        // console.log(topTen(metrics))

        // Define the div for the tooltip
        var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);


        // Add X axis
        var x_import = d3.scaleLinear()
            .domain([0, 1400000])
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x_import))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        // Y axis
        var y_import = d3.scaleBand()
            .range([0, height])
            .domain(topTen(metrics).map(function (d) { return d.key; }))
            .padding(.1);
        svg.append("g")
            .call(d3.axisLeft(y_import))

        //Bars
        svg.selectAll("importBar")
            .data(topTen(metrics))
            .enter()
            .append("rect")
            .attr("x", x_import(0))
            .attr("y", function (d) { return y_import(d.key); })
            .attr("width", function (d) { return x_import(d.value.total); })
            .attr("height", y_import.bandwidth())
            .attr("fill", "lightblue")

            .on("mouseover", function (d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html(d.key + "<br/> <br/> Total value : <b>" + d.value.total + "</b>")
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
    })

}

importBar();