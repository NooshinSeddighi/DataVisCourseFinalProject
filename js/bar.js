

class Bar {
    margin = { top: 30, right: 30, bottom: 70, left: 90 };
    width = 460 - this.margin.left - this.margin.right;
    height = 400 - this.margin.top - this.margin.bottom;

    constructor(restaurant) {
        this.restaurant = restaurant

        this.prepareData()
        this.draw()
    }

    prepareData() {
        if (!this.restaurant) {
            this.data = []
            return
        }
        this.data = []

        const workingDays = this.restaurant.workingHour.map(item => item.split(/-| /));
        workingDays.forEach(day => {
            const dayObj = {}
            let res = day.filter(item => item !== '')
            res[0] = res[0].replace(":", "")
            for (let index = 1; index < res.length; index++) {
                const element = res[index];
                const hour = this.timeToDecimal(element)
                if (isNaN(hour)) res[index] = 0
                else res[index] = this.timeToDecimal(element)
            }
            dayObj.day = res[0]
            dayObj.start = res[1]
            dayObj.end = res[2] || 0

            this.data.push(dayObj)

        })
    }

    convertToFullDay(day) {
        switch (day) {
            case 'Mo':
                return 'Monday'
            case 'Tue':
                return 'Tuesday'
            case 'Wed':
                return 'Wednesday'
            case 'Thu':
                return 'Thursday'
            case 'Fri':
                return 'Friday'
            case 'Sat':
                return 'Saturday'
            case 'Sun':
                return 'Sunday'
            default:
                break;
        }
    }

    setRestaurant(restaurant) {
        this.restaurant = restaurant
        this.prepareData()
        this.draw()
    }

    draw() {
        if (!this.data) return

        d3.select("#bar-chart svg").remove()
        const svg = d3.select("#bar-chart")
            .append("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("transform", `translate(${this.margin.left},${this.margin.top})`);

        const x = d3.scaleBand()
            .range([0, this.width])
            .domain(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
            .padding(0.2);

        svg.append("g")
            .attr("transform", `translate(0, ${this.height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        const y = d3.scaleLinear()
            .domain([0, 24])
            .range([this.height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y).tickFormat(x => {
                if (x > 12) {
                    return `${x - 12}:00 PM`
                } else {
                    return `${x}:00 AM`
                }
            }));

        svg.append("text")
            .attr("text-anchor", "end")
            .attr("x", this.margin.left)
            .attr("y", this.height + this.margin.top + 35)
            .text("Week days");

        svg.append("text")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .attr("y", -this.margin.left + 20)
            .attr("x", -this.height + this.margin.bottom)
            .text("Day time")

        svg.selectAll("mybar")
            .data(this.data)
            .join("rect")
            .attr("x", d => x(this.convertToFullDay(d.day)))
            .attr("y", d => y(d.end))
            .attr("width", x.bandwidth())
            .attr("height", d => {
                return this.height - y(d.end - d.start)
            })
            .attr("fill", "#69b3a2")

        svg.selectAll("mybar")
            .data(this.data)
            .join("rect")
            .attr("x", d => x(this.convertToFullDay(d.day)))
            .attr("y", d => y(d.start))
            .attr("width", x.bandwidth())
            .attr("height", d => {
                return this.height - y(d.start)
            })
            .attr("fill", "#e65555")

        svg.selectAll("mybar")
            .data(this.data)
            .join("rect")
            .attr("x", d => x(this.convertToFullDay(d.day)))
            .attr("y", d => 0)
            .attr("width", x.bandwidth())
            .attr("height", d => {
                return y(d.end)
            })
            .attr("fill", "#e65555")
    }

    timeToDecimal(t) {
        const arr = [t[0] + t[1], t[2] + t[3]]
        const dec = parseInt((arr[1] / 6) * 10, 10);

        return parseFloat(parseInt(arr[0], 10) + '.' + (dec < 10 ? '0' : '') + dec);
    }
}