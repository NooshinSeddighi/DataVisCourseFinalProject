class Table {
    constructor(data, headers, building) {
        this.data = data
        // this.categories = Array.from(new Set(this.data.map(d => d.category)))

        this.sortData = {
            key: '',
            ascending: false,
            dataKey: '',
            sortCount: 0
        }

        this.headers = [
            {
                key: 'name',
                text: 'Name',
                sorted: false,
                sort: (a, b) => {
                    const aVal = a.phrase
                    const bVal = b.phrase

                    if (!this.sortData.ascending) {
                        if (aVal < bVal) {
                            return -1;
                        }
                        if (aVal > bVal) {
                            return 1;
                        }
                        return 0;
                    } else {
                        if (aVal > bVal) {
                            return -1;
                        }
                        if (aVal < bVal) {
                            return 1;
                        }
                        return 0;
                    }
                },
            },
            {
                key: 'building',
                text: 'Building',
                sorted: false,
                sort: (a, b) => {
                    const aVal = parseInt(a.total)
                    const bVal = parseInt(b.total)

                    if (!this.sortData.ascending) {
                        if (aVal < bVal) {
                            return -1;
                        }
                        if (aVal > bVal) {
                            return 1;
                        }
                        return 0;
                    } else {
                        if (aVal > bVal) {
                            return -1;
                        }
                        if (aVal < bVal) {
                            return 1;
                        }
                        return 0;
                    }
                },
            },
            {
                key: 'distance',
                text: 'Distance',
                sorted: false,
                hasAxis: true,
                sort: (a, b) => {
                    const aVal = parseInt(a[this.sortData.dataKey])
                    const bVal = parseInt(b[this.sortData.dataKey])



                    if (!this.sortData.ascending) {
                        if (aVal < bVal) {
                            return -1;
                        }
                        if (aVal > bVal) {
                            return 1;
                        }
                        return 0;
                    } else {
                        if (aVal > bVal) {
                            return -1;
                        }
                        if (aVal < bVal) {
                            return 1;
                        }
                        return 0;
                    }
                },
            },
            {
                key: 'rating',
                text: 'Rating',
                sorted: false,
                sort: (a, b) => {
                    const aVal = parseInt(a.total)
                    const bVal = parseInt(b.total)

                    if (!this.sortData.ascending) {
                        if (aVal < bVal) {
                            return -1;
                        }
                        if (aVal > bVal) {
                            return 1;
                        }
                        return 0;
                    } else {
                        if (aVal > bVal) {
                            return -1;
                        }
                        if (aVal < bVal) {
                            return 1;
                        }
                        return 0;
                    }
                },
            },
        ]

        this.building = building

        this.vizWidth = 200;
        this.vizHeight = 20;
        this.smallVizHeight = 20;

        this.drawHeaders()
        this.drawTable()
    }

    drawHeaders() {
        const table = this
        d3.select('#columnHeaders')
            .selectAll('th')
            .data(this.headers)
            .join('th')
            .attr("id", d => d.key)
            .attr("data-key", d => d.key)
            .text(d => d.text)
            .classed("table-head", true).on("click", function () {
                // Sort based on header
                const headerKey = d3.select(this).attr("data-key")
                table.sortTable(headerKey)
            })
    }

    drawTable() {
        const rowSelection =
            d3.select('#tableBody')
                .selectAll('tr')
                .data(this.data)
                .join('tr')

        let selection = rowSelection.selectAll('td')
            .data((d) => this.rowToCellDataTransform(d))
            .join('td')
            .style(d => "text-align", 'center')

        selection.text((d) => {
            if (d.type === "text") return d.value;
        });

        let vizSelection = selection.filter((d) => d.type === "viz");

        const svgSelect = vizSelection
            .selectAll("svg")
            .data((d) => [d])
            .join("svg")
            .attr("width", this.vizWidth)
            .attr("height", this.vizHeight);

        // this.addFrequency(svgSelect.filter((d) => d.key === 'frequency'));

        // this.addPercentage(svgSelect.filter((d) => d.key === 'percentage'));
    }

    rowToCellDataTransform(d) {
        const name = {
            type: "text",
            key: "name",
            value: d.name
        }

        const building = {
            type: "text",
            key: "building",
            value: d.building,
        }

        const distance = {
            type: "viz",
            key: "distance",
            value: Math.random() * 100 // Calculate distance from this.building,
        }

        const rating = {
            type: "text",
            key: "rating",
            value: isNaN(parseInt(d.rating)) ? 'N/A' : parseInt(d.rating)
        }

        const dataList = [name, building, distance, rating];

        return dataList;
    }

    sortTable(key) {
        // const header = this.headers.find(item => item.key === key)
        // if (this.sortData.key === key) {
        //     this.sortData.sortCount = this.sortData.sortCount + 1
        //     this.sortData.ascending = !this.sortData.ascending
        // } else {
        //     this.sortData.sortCount = 0
        //     this.sortData.ascending = false
        // }
        // this.sortData.key = key;

        // if (key === 'percentage' && this.sortData.sortCount % 2 === 0) {
        //     if (this.sortData.dataKey === 'percent_of_d_speeches') {
        //         this.sortData.dataKey = 'percent_of_r_speeches'
        //     } else {
        //         this.sortData.dataKey = 'percent_of_d_speeches'
        //     }
        // }

        // this.data.sort(header.sort)
        
        // Sort this.data based on header selection (key)
        this.drawTable()
    }

    addDistance() {
        
    }

}