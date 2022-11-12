class Details {

    constructor(data) {
		this.data = data
    }

	createDetails() {

		let detailsSvg = d3.select('.detailsFormat')
			.append('svg')
			.attr('width', 500)
			.attr('height', 300)
			.attr('class', '.detailsStyle');

		detailsSvg.append('rect')
			.attr('x', 0)
			.attr('y', 0)
			.attr('width', 500)
			.attr('height', 300)
			.attr('fill', 'none')
			.attr('stroke', 'black')
			.attr('stroke-width', 5);

		detailsSvg.append('text')
			.text('Details: ')
			.attr('x', 10)
			.attr('y', 35)
			.attr('font-size', '30px');

		let user_chosen_restaurant = "Jamba Juice";

		let selected_restaurant_data = this.data.filter((d) => d.Name == user_chosen_restaurant);
		console.log(selected_restaurant_data[0]);

		detailsSvg.append('text')
			.text(selected_restaurant_data[0].Name)
			.attr('x', 110)
			.attr('y', 35)
			.attr('font-size', '30px');

		let hoursList = detailsSvg.append('g')
			.selectAll('text')
			.data(selected_restaurant_data[0].Hours)
			.join('text')
			.text(d => d)
			.attr('x', 10)
			.attr('y', function (d, i) {
				console.log(d, i);
				return 55 + i * 21;
			})
			.attr('font-size', '18px');
	}
}