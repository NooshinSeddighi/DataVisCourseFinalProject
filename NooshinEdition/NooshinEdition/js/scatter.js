class Scatter {
    constructor(data) {
        this.data = data;

        this.margin = { top: 10, bottom: 10, left: 30, right: 30 };
        this.width = 400;
        this.height = 400;
    }

    createScatter() {
        let scatterSvg = d3.select('.scatterFormat')
            .append('svg')
            .attr('width', this.width + this.margin.right)
            .attr('height', this.height)
            .append('g')
            .attr('transform', 'translate(' + this.margin.left + "," + this.margin.top + ")");

        let xScale = d3.scaleLinear()
            .domain([0, 5])
            .range([0, this.width]);

        scatterSvg.append('g')
            .attr('transform', 'translate(0,' + 350 + ")")
            .call(d3.axisBottom(xScale));

        let yScale = d3.scaleLinear()
            .domain([0, 25])
            .range([this.height - this.margin.top * 5, 0]);

        scatterSvg.append('g')
            .call(d3.axisLeft(yScale));
    }
}