class Table {

    constructor(data) {
        this.data = data;

        this.headers = ['Name', 'Building', 'Type', 'Rating', 'Avg. Price', 'Favorite'];

        this.isSortAscending = false;
    }

    createTable() {

        //let tableSection = d3.select('.tableFormat')
        let tableSection = d3.select('#usable_space')
            .append('table')
            .attr('id', 'restaurantsTable');

        console.log("table appended");

        let tableHeader = tableSection
            .append('thead');

        let headerRow = tableHeader
            .append('tr');

        let headerData = headerRow.selectAll('td')
            .data(this.headers)
            .enter()
            .append('td')
            .text((d) => d)
            .attr('id', d => d)
            .on('mouseover', function (d, i) {
                d3.select(this)
                    .style('text-decoration', 'underline');
            })
            .on('mouseout', function (d, i) {
                d3.select(this)
                    .style('text-decoration', 'none');
            });

        let tableBody = tableSection.append('tbody');

        let tableRows = tableBody.selectAll('tr')
            .data(this.data)
            .enter()
            .append('tr');

        // Create data array of data sets for table body
        let td = tableRows.selectAll('td').data(function (d) {
            console.log(d);
            let arr = [
                { vis: 'name', value: d.Name },
                { vis: 'building', value: d.Building },
                { vis: 'type', value: d.Type },
                { vis: 'rating', value: d.Rating },
                { vis: 'price', value: d.New_Menu },
                { vis: 'favorite', value: false }
            ];
            return arr;
        })
            .enter()
            .append('td');

        // Enter text data
        td.filter(d => d.vis == 'type').text(d => d.value);
        td.filter(d => d.vis == 'rating').text(d => d.value);
        td.filter(d => d.vis == 'building').text(d => d.value);
        td.filter(d => d.vis == 'name').text(d => d.value);
        td.filter(d => d.vis == 'price').text(function (d) {
            console.log(d.value[0]);
            return "$" + 21;
        })
    }
}