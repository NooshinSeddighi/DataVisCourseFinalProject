class Criteria {

	constructor(data) {

	}

	createCriteria() {

		let criteriaSvg = d3.select('.criteriaFormat')
			.append('svg')
			.attr('width', 300)
			.attr('height', 200)
			.attr('class', '.detailsStyle');

		criteriaSvg.append('rect')
			.attr('x', 0)
			.attr('y', 0)
			.attr('width', 300)
			.attr('height', 200)
			.attr('fill', 'blue')
			.attr('stroke', 'black')
			.attr('stroke-width', 5);

		criteriaSvg.append('text')
			.text('Details Section')
			.attr('x', 50)
			.attr('y', 100)
			.attr('font-size', '30px');
	}

}