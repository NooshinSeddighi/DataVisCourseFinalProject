class Table {
    constructor(data, department, barChart) {
        this.restaurants = [...data]
        this.data = [...data]
        this.expandedRestaurant = undefined
        this.barChart = barChart

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
                dataType: 'header',
                sorted: false,
                sort: (a, b) => {
                    const aVal = a.name
                    const bVal = b.name

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
                dataType: 'header',
                sorted: false,
                sort: (a, b) => {
                    const aVal = a.building
                    const bVal = b.building

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
                dataType: 'header',
                sorted: false,
                hasAxis: true,
                sort: (a, b) => {
                    const aVal = this.distance(a.latitude, a.longitude, this.department.latitude, this.department.longitude)
                    const bVal = this.distance(b.latitude, b.longitude, this.department.latitude, this.department.longitude)



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
                dataType: 'header',
                sorted: false,
                sort: (a, b) => {
                    let aVal = parseFloat(a.rating)
                    let bVal = parseFloat(b.rating)

                    if (isNaN(aVal)) aVal = 0
                    if (isNaN(bVal)) bVal = 0

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
                key: 'type',
                text: 'Type',
                dataType: 'header',
                sorted: false,
                sort: (a, b) => {
                    const aVal = a.type
                    const bVal = b.type

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
                key: 'price',
                text: 'Price',
                dataType: 'header',
                sorted: false,
                sort: (a, b) => {
                    let aVal = parseFloat(a.avgPrice)
                    let bVal = parseFloat(b.avgPrice)

                    if (isNaN(aVal)) aVal = 0
                    if (isNaN(bVal)) bVal = 0

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

        this.menuHeaders = [
            {
                dataType: 'menuHeader',
                key: 'menuName',
                text: 'Menu Name',
            }
        ]

        this.department = department

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
            .attr("data-type", d => d.dataType)
            .text(d => d.text)
            .classed("table-head", true)
            .on("click", function () {
                // Sort based on header
                const headerKey = d3.select(this).attr("data-key")
                const headerType = d3.select(this).attr("data-type")
                if (headerType === 'header') {
                    table.sortTable(headerKey)
                }
            })
    }

    drawTable() {
        const table = this

        const rowSelection =
            d3.select('#tableBody')
                .selectAll('tr')
                .data(this.data)
                .join('tr')
                .classed('restaurant', d => d.dataType === 'restaurant')
                .classed('menuItem', d => d.dataType === 'menuItem')
                .classed('menuHeader', d => d.dataType === 'menuHeader')

        let selection = rowSelection.selectAll('td')
            .data((d) => {
                if (d.dataType === 'restaurant') return this.rowToCellDataTransform(d)
                else if (d.dataType === 'menuItem') return this.rowToMenuDataTransform(d)
                else return this.rowToMenuHeaderTransform(d)
            })
            .join('td')
            .attr("data-name", d => d.name)
            .attr("data-type", d => d.dataType)
            .on("click", function () {
                const dataType = d3.select(this).attr("data-type");
                if (dataType === 'restaurant') {
                    const restaurantName = d3.select(this).attr("data-name");
                    table.toggleRow(restaurantName)
                }
            })
            .style("border", function (d) {
                if (globalSelectedRestaurant == '') {
                    return '';
                }
                if (globalSelectedRestaurant.name == d3.select(this).attr("data-name")) {
                    return "2px black solid";
                }
            })

        selection.text((d) => {
            if (d.type === "text") return d.value;
        });

        let vizSelection = selection.filter((d) => d.type === "viz");
        let rateSelection = selection.filter((d) => d.type === "rate");

        const svgSelect = vizSelection
            .selectAll("svg")
            .data((d) => [d])
            .join("svg")
            .attr("width", this.vizWidth)
            .attr("height", this.vizHeight);


        this.addDistance(svgSelect.filter((d) => d.key === 'distance'));

        this.addRating(rateSelection.filter((d) => d.key === 'rating'));
    }

    addDistance(containerSelect) {
        containerSelect.selectAll("rect")
            .data((d) => [d])
            .join("rect")
            .attr("x", 0)
            .attr("width", (d) => d.value)
            .attr("height", this.smallVizHeight)
            .attr('fill', 'red');
    }

    addRating(containerSelect) {
        containerSelect.selectAll("i")
            .data((d) => {
                const stars = [d]
                for (let index = 0; index < d.value - 1; index++) {
                    stars.push(d)
                }
                return stars
            })
            .join("i")
            .attr('class', (d, i) => {
                if (d.value - i > 0.8)
                    return 'fa fa-solid fa-star'
                else {
                    if (d.value - i >= 0.5) return 'fa fa-solid fa-star-half'
                    else if (d.value - i < 0.5) return ''
                    else return 'fa fa-solid fa-star'
                }
            })
            .classed("text-warning", true)
    }

    rowToCellDataTransform(d) {
        const name = {
            type: "text",
            key: "name",
            dataType: 'restaurant',
            name: d.name,
            value: d.name
        }

        const building = {
            type: "text",
            key: "building",
            dataType: 'restaurant',
            name: d.name,
            value: d.building,
        }

        const distance = {
            type: "viz",
            key: "distance",
            dataType: 'restaurant',
            name: d.name,
            value: this.distance(d.latitude, d.longitude, this.department.latitude, this.department.longitude) * 200
        }

        const rating = {
            type: "rate",
            key: "rating",
            dataType: 'restaurant',
            name: d.name,
            value: isNaN(parseFloat(d.rating)) ? 'N/A' : parseFloat(d.rating)
        }

        const type = {
            type: "text",
            key: "type",
            dataType: 'restaurant',
            name: d.name,
            value: d.type
        }

        const price = {
            type: "text",
            key: "avgPriceSymbol",
            dataType: 'restaurant',
            name: d.name,
            value: d.avgPriceSymbol
        }

        const dataList = [name, building, distance, rating, type, price];

        return dataList;
    }

    rowToMenuDataTransform(d) {
        const menuName = {
            type: "text",
            key: "name",
            dataType: 'menuItem',
            name: d.name,
            value: d.menuName
        }

        const name = {
            type: "text",
            key: "name",
            dataType: 'menuItem',
            name: d.name,
            value: d.name
        }

        const price = {
            type: "text",
            key: "price",
            dataType: 'menuItem',
            name: d.name,
            value: d.price + " $",
        }
        const inside = {
            type: "text",
            key: "inside",
            dataType: 'menuItem',
            name: d.name,
            value: d.inside,
        }

        const fakeData = {
            type: "text",
            key: "fakeData",
            dataType: 'menuItem',
            name: d.name,
            value: "",
        }

        const dataList = [menuName, name, price, inside, fakeData, fakeData];

        return dataList;
    }

    rowToMenuHeaderTransform(d) {
        const menuName = {
            type: "text",
            key: "name",
            dataType: 'menuHeader',
            value: 'Menu Name'
        }

        const name = {
            type: "text",
            key: "itemName",
            dataType: 'menuHeader',
            value: 'Item Name'
        }

        const price = {
            type: "text",
            key: "price",
            dataType: 'menuHeader',
            value: 'Price',
        }

        const inside = {
            type: "text",
            key: "inside",
            dataType: 'menuHeader',
            value: 'Inside',
        }

        const fakeData = {
            type: "text",
            key: "fakeData",
            dataType: 'menuHeader',
            name: d.name,
            value: "",
        }

        const dataList = [menuName, name, price, inside, fakeData, fakeData];
        return dataList;
    }

    sortTable(key) {
        this.collapseRow()
        const header = this.headers.find(item => item.key === key)
        if (this.sortData.key === key) {
            this.sortData.ascending = !this.sortData.ascending
        } else {
            this.sortData.ascending = false
        }
        this.sortData.key = key;

        this.data = this.data.sort(header.sort)

        // Sort this.data based on header selection (key)
        this.drawTable()
    }

    toggleRow(restaurantName) {
        if (this.expandedRestaurant === restaurantName) {
            this.collapseRow()
            this.expandedRestaurant = undefined
        } else {
            this.collapseRow()
            this.expandRow(restaurantName)
            this.expandedRestaurant = restaurantName
        }
    }

    expandRow(restaurantName) {
        const idx = this.data.findIndex(item => item.name === restaurantName)
        const menu = [...this.menuHeaders]
        const restaurant = this.data[idx]

        restaurant.menuList.forEach(menuListItem => menu.push(...menuListItem.items))

        this.data.splice(idx + 1, 0, ...menu)

        this.drawTable()
        this.barChart.setRestaurant(restaurant)
    }

    collapseRow() {
        this.data = [...this.restaurants]
        this.drawTable()
        this.barChart.setRestaurant(undefined)
    }

    distance(lat1, lon1, lat2, lon2, unit) {
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * lat1 / 180;
            var radlat2 = Math.PI * lat2 / 180;
            var theta = lon1 - lon2;
            var radtheta = Math.PI * theta / 180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit == "K") { dist = dist * 1.609344 }
            if (unit == "N") { dist = dist * 0.8684 }
            return dist;
        }
    }

    changeDepartment(dep) {
        this.department = dep;
        this.collapseRow()
        this.drawTable()
    }
}