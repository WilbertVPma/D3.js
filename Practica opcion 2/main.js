const width = 800
const height = 400
const margin = {
    top: 10,
    bottom: 40,
    left: 40,
    right: 130
}

const diCaprioBirthYear = 1974;
const age = function(year) { return year - diCaprioBirthYear}
const today = new Date().getFullYear()
const ageToday = age(today)

console.log(age)

const svg = d3.select("div#chart").append("svg").attr("width", width).attr("height", height)
const elementGroup = svg.append("g").attr("id", "elementGroup").attr("transform", `translate(${margin.left}, ${margin.top})`)
const axisGroup = svg.append("g").attr("id", "axisGroup")
const xAxisGroup = axisGroup.append("g").attr("id", "xAxisGroup").attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
const yAxisGroup = axisGroup.append("g").attr("id", "yAxisGroup").attr("transform", `translate(${margin.left}, ${margin.top})`)

const y = d3.scaleLinear().range([height - margin.top - margin.bottom, 0])
const x = d3.scaleBand().range([0, width - margin.left - margin.right]).padding(0.1)

const xAxis = d3.axisBottom().scale(x)
const yAxis = d3.axisLeft().scale(y).ticks(30)

d3.csv("data.csv").then(data => {
    console.log(data)
    data.map(d => d.age = +d.age)
    data.map(d => d.year = new Date(d.year).getFullYear() + 1)

    x.domain(data.map(d => d.year))
    y.domain([0, d3.max(data.map(d => d.age)) + 21])

    xAxisGroup.call(xAxis)
    yAxisGroup.call(yAxis)

    let elements = elementGroup.selectAll("rect").data(data)
    elements.enter().append("rect")
    .attr("class", d => `bar ${d.name.replace(" ", "")}`)
    .attr("x", d => x(d.year))
    .attr("width", x.bandwidth())
    .attr("height", d => height - margin.top - margin.bottom - y(d.age))
    .attr("y", d => y(d.age))

    let line = d3.line().x(d => x(d.year)).y(d => y(d.year - diCaprioBirthYear))
    elementGroup.datum(data)
        .append("path")
        .attr("class", "line black")
        .attr("d", line)

    let line2 = d3.line().x(d => x(d.year)).y(d => y(d3.max(data.map(d => d.age))))
    elementGroup.datum(data)
        .append("path")
        .style("stroke-dasharray", ("3, 3"))
        .attr("class", "line dashed")
        .attr("d", line2)
    
        let xLabel = elementGroup.append("text").text("Years dating")
    .attr("transform", `translate(${width - margin.right - 45}, ${height - margin.bottom + 25})`)
    .attr("text-anchor", "end").attr("font-weight", 700)

    let yLabel = elementGroup.append("text").text("Age")
    .attr("transform", `translate(${10}, ${10})`).attr("font-weight", 700)

    let LdCAge = elementGroup.append("text").text("Leonardo di Caprio")
    .attr("transform", `translate(${230}, ${70})`)

})

//Color Legend code

svg.append("circle").attr("cx",680).attr("cy",110).attr("r", 6).style("fill", "#DAA520")
svg.append("text").attr("x", 690).attr("y", 110).text("Gisele Bündchen").style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("circle").attr("cx",680).attr("cy",130).attr("r", 6).style("fill", "#7FFFD4")
svg.append("text").attr("x", 690).attr("y", 130).text("Bar Rafaeli").style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("circle").attr("cx",680).attr("cy",150).attr("r", 6).style("fill", "#e9967a")
svg.append("text").attr("x", 690).attr("y", 150).text("Blake Lively").style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("circle").attr("cx",680).attr("cy",170).attr("r", 6).style("fill", "#ff1493")
svg.append("text").attr("x", 690).attr("y", 170).text("Erin Heatherson").style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("circle").attr("cx",680).attr("cy",190).attr("r", 6).style("fill", "#DFFF00")
svg.append("text").attr("x", 690).attr("y", 190).text("Toni Garrn").style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("circle").attr("cx",680).attr("cy",210).attr("r", 6).style("fill", "#8A2BE2")
svg.append("text").attr("x", 690).attr("y", 210).text("Kelly Rohrbach").style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("circle").attr("cx",680).attr("cy",230).attr("r", 6).style("fill", "#00FFFF")
svg.append("text").attr("x", 690).attr("y", 230).text("Nina Agdal").style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("circle").attr("cx",680).attr("cy",250).attr("r", 6).style("fill", "#FF0000")
svg.append("text").attr("x", 690).attr("y", 250).text("Camila Morrone").style("font-size", "15px").attr("alignment-baseline","middle")