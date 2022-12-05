class Leaflet {
    constructor(data, departments) {
        this.restaurants = [...data]
        this.data = [...data]

        this.margin = { top: 10, bottom: 10, left: 30, right: 30 };
        this.width = 400;
        this.height = 400;

        this.createLeaflet();
    }

    //Script referenced from d3 - graph - gallery.com / graph / bubblemap_leaflet_basic.html
    createLeaflet() {
        // mapid is the id of the div where the map will appear
        document.getElementById('mapid').remove();
        d3.select("#map-container").append("span").attr("id", "mapid");

        var map = L
            .map('mapid')
            .setView([40.765, -111.842], 15);   // center position + zoom

        // Add a tile to the map = a background. Comes from OpenStreetmap
        L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
            maxZoom: 19,
        }).addTo(map);

        // Add svg layer to the map
        L.svg().addTo(map);

        // Declare tooltip
        let tooltipDiv = d3.select('#scatter-plot')
            .append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0);

        // Draw map
        d3.select("#mapid")
            .select("svg")
            .selectAll("circle")
            .data(this.data)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return map.latLngToLayerPoint([d.latitude, d.longitude]).x })
            .attr("cy", function (d) { return map.latLngToLayerPoint([d.latitude, d.longitude]).y })
            .attr("r", 10)
            .style("fill", function (d) {
                if (globalSelectedRestaurant.name == d.name) {
                    return '#bc1313';
                }
                return 'blue';
            })
            .attr("stroke", function (d) {
                if (globalSelectedRestaurant.name == d.name) {
                    return 'black';
                }
                return 'blue';
            })
            .attr("stroke-width", 2)
            .attr("fill-opacity", .7)
            .attr("pointer-events", "visible")
            .on("mouseover", function (d, data) {
                const [x, y] = d3.pointer(event);
                tooltipDiv.transition()
                    .duration(150)
                    .style("opacity", .9);
                tooltipDiv.html("<div style='font-weight: bold; font-size: 15px'>" + `${data.name}` + "</div>" +
                    "<div>" + `${data.building}` + "</div>" +
                    "<div>" + "Phone: " + `${data.phoneNumber}` + "</div>" +
                    "<div>" + "Rating: " + `${data.rating}` + "</div>" +
                    "<div>" + "Avg Price: $" + `${Math.round(data.avgPrice * 100) / 100}` + "</div>")
                    .style("left", (d.pageX - 950) + "px")
                    .style("top", (d.pageY - 375) + "px");
                if (globalSelectedRestaurant.name != d.target.__data__.name) {
                    d3.select(this).attr('stroke', "white");
                }
            })
            .on("mouseout", function (d) {
                tooltipDiv.transition()
                    .duration(500)
                    .style("opacity", 0);
                if (globalSelectedRestaurant.name != d.target.__data__.name) {
                    d3.select(this).attr('stroke', "blue");
                }
            })
            .on("click", function (d) {
                d3.select("#mapid").selectAll("circle").attr("stroke", "blue").style("fill", "blue");
                d3.select(this).attr('stroke', "black");
                d3.select(this).style('fill', '#bc1313');
                globalSelectedRestaurant = d.target.__data__;
                DoTheThing("leaflet");
            });

        // If the user change the map (zoom or drag), I update circle position:
        map.on("moveend", update)

        function update() {
            d3.select('#mapid').selectAll("circle")
                .attr("cx", function (d) { return map.latLngToLayerPoint([d.latitude, d.longitude]).x })
                .attr("cy", function (d) { return map.latLngToLayerPoint([d.latitude, d.longitude]).y })
        }

    }
}