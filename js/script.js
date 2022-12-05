const pieConfig = {
    showAll: true
}

function DoTheThing(callee = "none") {
    // console.log("doing the thing");
    // console.log(criteria);

    function convertToBoolean(value) {
        return value.toLowerCase() === 'yes'
    }

    function parseWorkingHour(workingHours) {
        let res = workingHours.split(",")
        res = res.map(item => {
            if (item[0] === ' ') {
                item = item.replace(" ", "")
            }
            return item
        })
        return res
    }

    d3.csv(`data/uHungryRestaurants.csv`)
        .then(dataOutput => {
            d3.csv(`data/Departments.csv`).then(departments => {

                const restaurants = []

                dataOutput.forEach(element => {

                    const restaurant = restaurants.find(item => item.name === element.name)

                    const menuItem = {
                        dataType: 'menuItem',
                        name: element.nameOfFood,
                        // menuName: element.menuList,
                        price: element.price,
                        inside: element.inside,
                    }

                    const menuListItem = {
                        dataType: 'menuListItem',
                        name: element.menuList,
                        numberOfItems: element.numberOfItems,
                        items: [menuItem]
                    }

                    if (restaurant) {
                        // Add menu item to the found restaurant
                        const foundList = restaurant.menuList.find(item => item.name === menuListItem.name)
                        if (foundList) {
                            foundList.items.push(menuItem)
                        } else {
                            menuItem.menuName = element.menuList
                            restaurant.menuList.push(menuListItem)
                        }

                    } else {
                        // Add restaurant to list
                        menuItem.menuName = element.menuList
                        const restaurantObj = {
                            dataType: 'restaurant',
                            name: element.name,
                            building: element.building,
                            type: element.type,
                            address: element.address,
                            phoneNumber: element.phoneNumber,
                            latitude: element.latitude,
                            longitude: element.longitude,
                            googleMapLink: element.googleMapLink,
                            workingHour: parseWorkingHour(element.workingHour),
                            dineIn: convertToBoolean(element['dine-in']),
                            takeOut: convertToBoolean(element.takeOut),
                            delivery: convertToBoolean(element.delivery),
                            rating: element.rating,
                            reviews: element.reviews,
                            website: element.website,
                            menuPhoto: element.menuPhoto,
                            menuList: [menuListItem]
                        }

                        restaurants.push(restaurantObj)
                    }
                });

                restaurants.forEach(rest => {
                    const menu = []
                    rest.menuList.forEach(menuListItem => menu.push(...menuListItem.items.map(menuItem => menuItem)))
                    const avgPrice = menu.reduce(
                        (accumulator, item) => accumulator + parseFloat(item.price),
                        0
                    ) / menu.length;
                    rest.avgPrice = isNaN(avgPrice) ? 0 : avgPrice
                    if (rest.avgPrice < 3.33) {
                        rest.avgPriceSymbol = "$"
                    } else if (rest.avgPrice >= 3.33 && rest.avgPrice < 6.66) {
                        rest.avgPriceSymbol = "$$"
                    } else {
                        rest.avgPriceSymbol = "$$$"
                    }
                })

                let filteredRestaurants = restaurants;

                // Check for criteria
                if (criteria.userRating != '') {
                    filteredRestaurants = filteredRestaurants.filter(function (d) { return parseFloat(d.rating) >= parseFloat(criteria.userRating); })
                }
                if (criteria.userPrice != '') {
                    
                    filteredRestaurants = filteredRestaurants.filter(function (d) {
                        return d.avgPriceSymbol.toString() == criteria.userPrice.toString();
                    })
                }
                if (criteria.userType != '') {
                    filteredRestaurants = filteredRestaurants.filter(function (d) { return d.type.toString() == criteria.userType.toString(); })
                }
                //if (criteria.userDistance != '') {
                //    filteredRestaurants = filteredRestaurants.filter(function (d) { return parseFloat(d.) >= parseFloat(criteria.userDistance); })
                //}
                if (criteria.userBuilding != '') {
                    let capitalizedBuilding = criteria.userBuilding.toString();
                    capitalizedBuilding = capitalizedBuilding[0].toUpperCase() + capitalizedBuilding.slice(1);
                    filteredRestaurants = filteredRestaurants.filter(function (d) { return d.building.toString() == capitalizedBuilding; })
                }

                d3.select("#dropdown-container select").remove()

                const pieButton = d3.select("#filter-pie-btn")

                const dropDown = d3.select("#dropdown-container")
                    .append("select")
                    .attr("class", "selection custom-select")
                    .attr("name", "department-list")

                dropDown.selectAll("option")
                    .data(departments)
                    .enter()
                    .append("option")
                    .text((d) => d.department)
                    .attr("value", d => d.department)

                const pie = new Pie(filteredRestaurants, departments[0])

                pieButton.on("click", event => {
                    pieConfig.showAll = !pieConfig.showAll
                    pie.reDraw(pieConfig.showAll)
                })

                const bar = new Bar(undefined)

                let targetDept = criteria.userDept;
/*                console.log(criteria.userDept);*/
                let depIndex = null;
                for (let i = 0; i < departments.length; i++) {
                    if (departments[i].department == targetDept) {
                        depIndex = departments[i];
/*                        console.log('DEPT FOUND');*/
                        break;
                    }
                }
                if (depIndex == null) {
                    depIndex = departments[0];
                }
/*                console.log(depIndex);*/

                // Create SVGs with proper data
                if (criteria.userRating != '' ||
                    criteria.userPrice    != '' ||
                    criteria.userType     != '' ||
/*                    criteria.userDistance != '' ||*/
                    criteria.userBuilding != '') {
                    
                    const table = new Table(filteredRestaurants, depIndex, bar)
                    if (callee != "leaflet") {
                        const leaflet = new Leaflet(filteredRestaurants, departments)
                    }
                    if (callee != "scatter") {
                        const scatter = new Scatter(filteredRestaurants, departments)
                    }
                    dropDown.on("change", (event) => {
                        const dep = departments.find(item => item.department = event.target.value)
                        table.changeDepartment(dep)
                        pie.changeDepartment(dep)
                    });
                }
                else {
                    const table = new Table(restaurants, depIndex, bar)
                    if (callee != "leaflet") {
                        const leaflet = new Leaflet(filteredRestaurants, departments)
                    }
                    if (callee != "scatter") {
                        const scatter = new Scatter(restaurants, departments)
                    }
                    dropDown.on("change", (event) => {
                        const dep = departments.find(item => item.department = event.target.value)
                        table.changeDepartment(dep)
                        pie.changeDepartment(dep)
                    });
                }



            })
        })

}