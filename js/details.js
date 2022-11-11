class Details {

    constructor(data) {

    }

	createDetails() {

		let detailsSvg = d3.select('.detailsFormat')
			.append('svg')
			.attr('width', 300)
			.attr('height', 200)
			.attr('class', '.detailsStyle');

		detailsSvg.append('rect')
			.attr('x', 0)
			.attr('y', 0)
			.attr('width', 300)
			.attr('height', 200)
			.attr('fill', 'blue')
			.attr('stroke', 'black')
			.attr('stroke-width', 5);

		detailsSvg.append('text')
			.text('Details Section')
			.attr('x', 50)
			.attr('y', 100)
			.attr('font-size', '30px');
	}

}