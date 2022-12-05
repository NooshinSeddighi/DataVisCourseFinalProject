class Scatter {
    constructor(data) {
        this.data = data;

        this.margin = { top: 10, bottom: 30, left: 60, right: 30 };
        this.width = 460 - this.margin.left - this.margin.right;
        this.height = 400 - this.margin.top - this.margin.bottom;

        this.createScatter();
    }

    createScatter() {

        d3.select("#scatter-plot svg").remove()

        let scatterSvg = d3.select('#scatter-plot')
            .append('svg')
            .attr('width', this.width + this.margin.left + this.margin.right)
            .attr('height', this.height + this.margin.top + this.margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + this.margin.left + "," + this.margin.top + ')');

        let xScale = d3.scaleLinear()
            .domain([0, 12])
            .range([0, this.width]);
        scatterSvg.append('g')
            .attr('transform', 'translate(0,' + this.height + ")")
            .call(d3.axisBottom(xScale)
                .tickFormat(function (d, i) {
                    return "$" + d.toString();
                }));

        let yScale = d3.scaleLinear()
            .domain([2, 5])
            .range([this.height, 0]);
        scatterSvg.append('g')
            .call(d3.axisLeft(yScale)
                .tickValues([2, 2.5, 3, 3.5, 4, 4.5, 5])
                .tickFormat(function (d, i) {
                return d.toString() + " stars";
            }));

        // Tooltip declaration
        let tooltipDiv = d3.select('#scatter-plot')
            .append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0);

        // Draw scatterplot
        scatterSvg.append('g')
            .selectAll('circle')
            .data(this.data)
            .join('circle')
            .attr('cx', function (d) {
                return xScale(d.avgPrice);
            })
            .attr('cy', function (d) { return yScale(d.rating); })
            .attr('r', 5)
            .style('fill', function (d) {
                if (d.name == globalSelectedRestaurant.name) {
                    return '#bc1313';
                }
                else {
                    return "red";
                }
            })
            .attr('stroke', function (d) {
                if (d.name == globalSelectedRestaurant.name) {
                    return 'black';
                }
                else {
                    return "red";
                }
                
            })
            .on("mouseover", function (d, data) {
                const [x, y] = d3.pointer(event);
                tooltipDiv.transition()
                    .duration(150)
                    .style("opacity", .9);
                tooltipDiv.html("<div style='font-weight: bold; font-size: 15px'>" + `${data.name}` + "</div>" +
                    "<div>" + `${data.building}` + "</div>" +
                    "<div>" + "Phone: " + `${data.phoneNumber}` + "</div>" +
                    "<div>" + "Rating: " + `${data.rating}` + "</div>" +
                    "<div>" + "Avg Price: $" + `${Math.round(data.avgPrice * 100)/100}` + "</div>")
                    .style("left", (d.pageX - 950) + "px")
                    .style("top", (d.pageY - 375) + "px");
                if (globalSelectedRestaurant.name != d.target.__data__.name) {
                    d3.select(this).attr('stroke', "grey");
                }
            })
            .on("mouseout", function (d) {
                tooltipDiv.transition()
                    .duration(500)
                    .style("opacity", 0);
                if (globalSelectedRestaurant.name != d.target.__data__.name) {
                    d3.select(this).attr('stroke', "red");
                }
            })
            .on("click", function (d) {
                d3.select("#scatter-plot").selectAll("circle").attr("stroke", "red").style("fill", "red");
                d3.select(this).attr('stroke', "black");
                d3.select(this).style('fill', '#bc1313');
                globalSelectedRestaurant = d.target.__data__;
                DoTheThing("scatter");
            });
    }
}