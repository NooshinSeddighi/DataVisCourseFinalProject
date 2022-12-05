// d3.json('data/data_v2.json').then(data => {

//     console.log("script started");

    // let mainBodyDiv = d3.select('body')
    //     .append('div');

    // let upperSection = mainBodyDiv
    //     .append('div')
    //     .classed('upperSection', true);

    // let tableDiv = upperSection
    //     .append('div')
    //     .classed('tableFormat', true);

    // let table = new Table(data);

    // table.createTable();

//     //let criteriaDiv = upperSection
//     //    .append('div')
//     //    .classed('criteriaFormat', true);

//     //let criteria = new Criteria(data);

//     //criteria.createCriteria();

//     let lowerSection = mainBodyDiv
//         .append('div')
//         .classed('lowerSection', true);

//     let detailsDiv = lowerSection
//         .append('div')
//         .classed('detailsFormat', true);

//     let details = new Details(data);

//     details.createDetails();

//     let scatterDiv = lowerSection
//         .append('div')
//         .classed('scatterFormat', true);

//     let scatterPlot = new Scatter(data);

//     scatterPlot.createScatter();

// })

function convertToBoolean(value) {
    return value.toLowerCase() === 'yes'
}

function parseWorkingHour(workingHours) {
    return workingHours.split(",")
}

d3.csv(`data/uHungryRestaurants.csv`)
    .then(dataOutput => {
        const headers = Object.keys(dataOutput[0]);

        const restaurants = []
        const selectedBuilding = 'College of Pharmacy' // Read from file later

        dataOutput.forEach(element => {

            const restaurant = restaurants.find(item => item.name === element.name)

            // console.log(restaurant);

            const menuItem = {
                name: element.nameOfFood,
                price: element.price,
                inside: element.inside,
            }

            const menuListItem = {
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
                    restaurant.menuList.push(menuListItem)
                }

            } else {
                // Add restaurant to list
                const restaurantObj = {
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

        const table = new Table(restaurants, headers)
    })