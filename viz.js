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

        console.log(data)

        var metrics = d3.nest()
            .key(function (d) { return d.Commodity; })
            .rollup(function (v) {
                return {
                    count: v.length,
                    total: d3.sum(v, function (d) { return d.value; })
                };
            })
            .entries(data);
        console.log(metrics);

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

        //Bars
        svg.selectAll("commBar")
            .data(topTen(metrics))
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

        console.log(data)

        var metrics = d3.nest()
            .key(function (d) { return d.country; })
            .rollup(function (v) {
                return {
                    count: v.length,
                    total: d3.sum(v, function (d) { return d.value; })
                };
            })
            .entries(data);
        console.log(metrics);

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
            .attr("x", function (d) { return x(d.key);})
            .attr("y", function (d) { return y(d.value.total);})
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