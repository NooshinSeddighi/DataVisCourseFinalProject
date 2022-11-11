class Table {

    constructor(data) {
        this.data = data;

        this.headers = ['Score', 'Name', 'Rating', 'Location', 'Building', 'Favorite'];

        this.isSortAscending = false;
        //// Set table headers
        //this.headers = ['Phrase', 'Frequency', 'Percentages', 'Total'];

        //// Set scales for frequency and percentages
        //this.freq_scale = d3.scaleLinear()
        //    .domain([0, 1])
        //    .range([0, 100]);

        //this.percent_scale = d3.scaleLinear()
        //    .domain([-100, 100])
        //    .range([0, 400]);

        //// Set categories and colors
        //this.allCategories = ['economy/fiscal issues',
        //    'energy/environment',
        //    'crime/justice',
        //    'education',
        //    'health care',
        //    'mental health/substance abuse'];

        //let colors = ['#5BB999', '#F68256', '#8294C3', '#E47FBA', '#9BD249', '#F5D52F'];
        //this.colorScale = d3.scaleOrdinal()
        //    .domain(this.allCategories)
        //    .range(colors);

        //// Default sorting direction
        //this.isSortAscending = false;
        //this.party = 'neutral';
    }

    createTable() {

        let tableSection = d3.select('.tableFormat')
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
            .attr('id', d => d);

        let tableBody = tableSection.append('tbody');

        let tableRows = tableBody.selectAll('tr')
            .data(this.data)
            .enter()
            .append('tr');
            //.append(d => {
            //    console.log(d);
            //    return 'tr';
            //});

        var cells = tableRows.selectAll('td')
            .data(this.data)
            .enter()
            .append('td')
            .text(d => d.Name);
            //.text(function (d) { return d.value })

        // Create table body
        //let tableBody = tableSection.append('tbody');

        //let tableData = selectAll('tr')

        //// Establish table and header row
        //let tableSection = d3.select('.tableFormat')
        //    .append('table');

        //let tableHeader = tableSection
        //    .append('thead');

        //let headerRow = tableHeader
        //    .append('tr');

        //// Write headers and enable sorting by clicking header text
        //let headerData = headerRow.selectAll('td')
        //    .data(this.headers)
        //    .enter()
        //    .append('td')
        //    .text((d) => d)
        //    .attr('id', d => d)
        //    // Sorting on click -- In future, could be consolidated to single helper function
        //    .on('click', d => {
        //        if (this.isSortAscending != true) { // Sort Ascending
        //            if (d.target.id == 'Phrase') { tableRows.sort(function (a, b) { return d3.ascending(a.phrase, b.phrase); }); }
        //            if (d.target.id == 'Frequency') { tableRows.sort(function (a, b) { return d3.ascending(parseInt(a.total), parseInt(b.total)); }); }
        //            if (d.target.id == 'Percentages') {
        //                if (this.party == 'reps') { // swap party to order by
        //                    this.party = 'dems';
        //                    tableRows.sort(function (a, b) { return d3.ascending(parseInt(a.percent_of_d_speeches), parseInt(b.percent_of_d_speeches)) });
        //                }
        //                else {
        //                    this.party = 'reps';
        //                    tableRows.sort(function (a, b) { return d3.ascending(parseInt(a.percent_of_r_speeches), parseInt(b.percent_of_r_speeches)) });
        //                }
        //            }
        //            if (d.target.id == 'Total') { tableRows.sort(function (a, b) { return d3.ascending(parseInt(a.total), parseInt(b.total)); }); }

        //            this.isSortAscending = true;
        //        }

        //        else if (this.isSortAscending != false) { // Sort Descending
        //            if (d.target.id == 'Phrase') { tableRows.sort(function (a, b) { return d3.descending(a.phrase, b.phrase); }); }
        //            if (d.target.id == 'Frequency') { tableRows.sort(function (a, b) { return d3.descending(parseInt(a.total), parseInt(b.total)); }); }
        //            if (d.target.id == 'Percentages') {
        //                if (this.party == 'dems') { // same party to order by
        //                    tableRows.sort(function (a, b) { return d3.descending(parseInt(a.percent_of_d_speeches), parseInt(b.percent_of_d_speeches)) });
        //                }
        //                else {
        //                    tableRows.sort(function (a, b) { return d3.descending(parseInt(a.percent_of_r_speeches), parseInt(b.percent_of_r_speeches)) });
        //                }
        //            }
        //            if (d.target.id == 'Total') { tableRows.sort(function (a, b) { return d3.descending(parseInt(a.total), parseInt(b.total)); }); }

        //            this.isSortAscending = false;
        //        }
        //    });

        //// Create table body
        //let tableBody = tableSection.append('tbody');

        //let tableRows = tableBody.selectAll('tr')
        //    .data(this.data)
        //    .enter()
        //    .append('tr');

        //// Create data array of data sets for table body
        //let td = tableRows.selectAll('td').data(function (d) {
        //    let arr = [
        //        { vis: 'text', value: d.phrase },
        //        { vis: 'freq', value: Math.round(d.total / 50 * 100) / 100, category: d.category },
        //        { vis: 'percent', value: [d.percent_of_d_speeches, d.percent_of_r_speeches] },
        //        { vis: 'text', value: d.total }
        //    ];
        //    return arr;
        //})
        //    .enter()
        //    .append('td');

        //// Enter frequency data
        //let freqs = td.filter(d => d.vis == 'freq');
        //let _freq_scale = this.freq_scale;
        //let colorScale = this.colorScale;

        //freqs.append('svg')
        //    .attr('width', 200)
        //    .attr('height', 20)
        //    .append('rect')
        //    .attr('x', 0)
        //    .attr('y', 0)
        //    .attr('height', 20)
        //    .attr('width', d => _freq_scale(d.value))
        //    .attr('fill', d => colorScale(d.category));

        //// Enter percentage bars (dems)
        //let percents = td.filter(d => d.vis == 'percent');
        //percents.append('svg')
        //    .attr('id', 'percentsSvg')
        //    .attr('width', 100)
        //    .attr('height', 20)
        //    .append('rect')
        //    .attr('x', d => 50 - (d.value[0] / 2))
        //    .attr('y', 0)
        //    .attr('height', 20)
        //    .attr('width', d => {
        //        return d.value[0] / 2
        //    })
        //    .attr('fill', '#1F77B4');

        //// Enter percentage bars (reps)
        //percents.select('#percentsSvg')
        //    .append('rect')
        //    .attr('x', 50)
        //    .attr('y', 0)
        //    .attr('height', 20)
        //    .attr('width', d => d.value[1] / 2)
        //    .attr('fill', '#EB3F2F');

        //// Enter text data
        //td.filter(d => d.vis == 'text').text(d => d.value);

        //function resetChart() {
        //    let chart = d3.select()
        //}
    }
}