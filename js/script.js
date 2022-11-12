d3.json('data/data_v2.json').then(data => {

    console.log("script started");

    let mainBodyDiv = d3.select('body')
        .append('div');

    let upperSection = mainBodyDiv
        .append('div')
        .classed('upperSection', true);

    let tableDiv = upperSection
        .append('div')
        .classed('tableFormat', true);

    let table = new Table(data);

    table.createTable();

    //let criteriaDiv = upperSection
    //    .append('div')
    //    .classed('criteriaFormat', true);

    //let criteria = new Criteria(data);

    //criteria.createCriteria();

    let lowerSection = mainBodyDiv
        .append('div')
        .classed('lowerSection', true);

    let detailsDiv = lowerSection
        .append('div')
        .classed('detailsFormat', true);

    let details = new Details(data);

    details.createDetails();

    let scatterDiv = lowerSection
        .append('div')
        .classed('scatterFormat', true);

    let scatterPlot = new Scatter(data);

    scatterPlot.createScatter();

})