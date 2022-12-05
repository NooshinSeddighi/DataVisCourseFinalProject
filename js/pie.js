const width = 450,
    height = 450,
    margin = 40;
const radius = Math.min(width, height) / 2 - margin;
const labelRadius = Math.min(width, height) / 2 - 25;

class Pie {
    constructor(restaurants, department, showAll = true) {
        this.restaurants = restaurants
        this.department = department
        this.showAll = showAll

        this.createPieChart()
        this.prepareData()
        this.createColorScale()
        this.draw()
    }

    createPieChart() {
        d3.select("#pie-chart svg").remove()
        this.svg = d3.select("#pie-chart")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);
    }

    reDraw(showAll = true) {
        this.showAll = showAll
        this.prepareData()
        this.draw()
    }

    draw() {
        const pie = d3.pie()
            .value(function (d) { return d[1]; })
            .sort(function (a, b) { return d3.ascending(a.key, b.key); }) // This make sure that group order remains the same in the pie chart

        const data_ready = pie(Object.entries(this.typesData))

        const u = this.svg.selectAll("mySlices")
            .data(data_ready)

        const arcGenerator = d3.arc()
            .innerRadius(0)
            .outerRadius(radius)

        // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        u
            .join('path')
            .transition()
            .duration(1000)
            .attr('d', arcGenerator)
            .attr('fill', (d) => this.colors(d.data[0]))
            .attr("stroke", "white")
            .style("stroke-width", "2px")
            .style("opacity", 1)

        this.svg
            .selectAll('mySlices')
            .data(data_ready)
            .join('text')
            .transition()
            .duration(1000)
            .text(function (d) { return d.data[0] })
            .attr("transform", function (d) {
                const c = arcGenerator.centroid(d),
                    x = c[0],
                    y = c[1],
                    // pythagorean theorem for hypotenuse
                    h = Math.sqrt(x * x + y * y);
                return "translate(" + (x / h * labelRadius) + ',' +
                    (y / h * labelRadius) + ")"; 
            })
            .style("text-anchor", "middle")
            .style("font-size", '12')
    }

    prepareData() {
        let restaurants = this.restaurants
        if (!this.showAll) {
            restaurants = this.restaurants.filter(item => item.building.toLowerCase() === this.department.department.toLowerCase())
        }

        const types = restaurants.map(item => item.type.toLowerCase())

        // console.log(types);
        this.typesData = {}
        types.forEach(type => {
            if (type in this.typesData) {
                this.typesData[type] = this.typesData[type] + 1
            } else {
                this.typesData[type] = 1
            }
        });

        const buildings = restaurants.map(item => item.building.toLowerCase())
        this.buildingData = {}
        buildings.forEach(building => {
            if (building in this.buildingData) {
                this.buildingData[building] = this.buildingData[building] + 1
            } else {
                this.buildingData[building] = 1
            }
        });

    }

    changeDepartment(dep) {
        this.department = dep;
        this.reDraw()
    }

    createColorScale() {
        this.colors = d3.scaleOrdinal()
            .domain([...Object.keys(this.typesData), ...Object.keys(this.buildingData)])
            .range(d3.schemeDark2);
    }
}