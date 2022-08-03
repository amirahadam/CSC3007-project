// TOP 10 COMMODITIES FOR IMPORT BARGRAPH
function commBar() {
    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 30, bottom: 40, left: 150 },
        width = 800 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#commChart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("export.csv", function (data) {

        //console.log(data)

        /*var metrics = d3.nest()
            .key(function (d) { return d.Commodity; })
            .rollup(function (v) {
                return {
                    count: v.length,
                    total: d3.sum(v, function (d) { return d.value; })
                };
            })
            .entries(data);*/
        //console.log(metrics);

        var year = d3.nest()
            .key(function (d) { return d.year; })
            .key(function (d) { return d.Commodity; })
            .rollup(function (v) {
                return {
                    count: v.length,
                    total: d3.sum(v, function (d) { return d.value; })
                };
            })
            .entries(data);
            dataYear = year[0]

        function topTen(data) {  //sorting to top 10 function
            data.sort(function (a, b) {
                return b.value.total - a.value.total;
            });
            return data.slice(0, 10);
        }

        //console.log(topTen(metrics))
            
        // Define the div for the tooltip
        var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);


        // Add X axis
        var x_export = d3.scaleLinear()
            .domain([0, 100000])
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
            .domain(topTen(dataYear.values).map(function (d) { return d.key; }))
            .padding(.1);
        svg.append("g")
            .call(d3.axisLeft(y_export))
            
            svg.selectAll("commBar")
            .data(topTen(dataYear.values))
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

        var sliderYear = 2010;

        var valuesSlider = document.getElementById('slider');
        var valuesForSlider = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018];

        var format = {
            to: function (value) {
                return valuesForSlider[Math.round(value)];
            },
            from: function (value) {
                return valuesForSlider.indexOf(Number(value));
            }
        };

        noUiSlider.create(valuesSlider, {
            start: [2010],
            range: { min: 0, max: valuesForSlider.length - 1 },
            step: 1,
            tooltips: true,
            format: format,
            pips: { mode: 'steps', format: format },
        }).on('slide', function (e) {
            sliderYear = e[0]
            
            if (sliderYear == 2018){
                dataYear = year[0]
                console.log(dataYear)
            } else if (sliderYear == 2017){
                dataYear = year[1]
                console.log(dataYear)
            }else if (sliderYear == 2016){
                dataYear = year[2]
                console.log(dataYear)
            }else if (sliderYear == 2015){
                dataYear = year[3]
                console.log(dataYear)
            }else if (sliderYear == 2014){
                dataYear = year[4]
                console.log(dataYear)
            }else if (sliderYear == 2013){
                dataYear = year[5]
                console.log(dataYear)
            }else if (sliderYear == 2012){
                dataYear = year[6]
                console.log(dataYear)
            }else if (sliderYear == 2011){
                dataYear = year[7]
                console.log(dataYear)
            }else if (sliderYear == 2010){
                dataYear = year[8]
                console.log(dataYear)
            }

            //console.log(topTen(dataYear.values))

            svg.selectAll("commBar")
            .data(topTen(dataYear.values))
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

        valuesSlider.noUiSlider.set(['2010', '2018']);
    })

}

commBar();

// TOP 10 COUNTRIES FOR EXPORT BARGRAPH
function countryBar() {
    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 30, bottom: 40, left: 70 },
        width = 800 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#countryChart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("export.csv", function (data) {

        //console.log(data)

        var metrics = d3.nest()
            .key(function (d) { return d.country; })
            .rollup(function (v) {
                return {
                    count: v.length,
                    total: d3.sum(v, function (d) { return d.value; })
                };
            })
            .entries(data);
        //console.log(metrics);

        function topTen(data) {  //sorting to top 10 function
            data.sort(function (a, b) {
                return b.value.total - a.value.total;
            });
            return data.slice(0, 10);
        }

        //console.log(topTen(metrics))

        // Define the div for the tooltip
        var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);


        // Add X axis
        var x = d3.scaleBand()
            .range([0, width])
            .domain(topTen(metrics).map(function (d) { return d.key; }))
            .padding(0.2);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end")
            .style("Arial", "9px times");

        // Y axis
        var y = d3.scaleLinear()
            .domain([0, 500000])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));

        //Bars
        svg.selectAll("countryBar")
            .data(topTen(metrics))
            .enter()
            .append("rect")
            .attr("x", function (d) { return x(d.key); })
            .attr("y", function (d) { return y(d.value.total); })
            .attr("width", x.bandwidth())
            .attr("height", function (d) { return height - y(d.value.total); })
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

countryBar();

// Yearly Volume - Line Graph
function lineGraph() {
    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 800 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#lineGraph")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered.csv", function (data) {

        // group the data: I want to draw one line per group
        var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
            .key(function (d) { return d.name; })
            .entries(data);

        // Add X axis --> it is a date format
        var x_line = d3.scaleLinear()
            .domain(d3.extent(data, function (d) { return d.year; }))
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x_line).ticks(5));

        // Add Y axis
        var y_line = d3.scaleLinear()
            .domain([0, d3.max(data, function (d) { return +d.n; })])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y_line));

        // color palette
        var res = sumstat.map(function (d) { return d.key }) // list of group names
        var color = d3.scaleOrdinal()
            .domain(res)
            .range(['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'])

        // Draw the line
        svg.selectAll(".line")
            .data(sumstat)
            .enter()
            .append("path")
            .attr("fill", "none")
            .attr("stroke", function (d) { return color(d.key) })
            .attr("stroke-width", 1.5)
            .attr("d", function (d) {
                return d3.line()
                    .x(function (d) { return x_line(d.year); })
                    .y(function (d) { return y_line(+d.n); })
                    (d.values)
            })

    })
}

lineGraph();
