const width = 800
const height = 400
const margin = {
    top: 40, 
    bottom: 60, 
    left: 40, 
    right: 10
}

const svg = d3.select("div#chart").append("svg").attr("width", width).attr("height", height)
const elementGroup = svg.append("g").attr("id", "elementGroup").attr("transform", `translate(${margin.left}, ${margin.top})`)
const axisGroup = svg.append("g").attr("id", "axisGroup")
const xAxisGroup = axisGroup.append("g").attr("id", "xAxisGroup").attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
const yAxisGroup = axisGroup.append("g").attr("id", "yAxisGroup").attr("transform", `translate(${margin.left}, ${margin.top})`)

const x = d3.scaleBand().range([0, width - margin.left - margin.right]).padding(0.1)
const y = d3.scaleLinear().range([height - margin.bottom - margin.top, 0])

const xAxis = d3.axisBottom().scale(x)
const yAxis = d3.axisLeft().scale(y).ticks(5)

d3.csv("WorldCup.csv").then(data => {

  let nest = d3.nest()
  .key(d => d.Winner)
  .entries(data)
  nest.map(d => d.values = d.values.length)
  console.log(nest)

    //sorting values code
    nest.sort((a, b) => d3.descending(a.values, b.values))

    x.domain(nest.map(d => d.key))
    y.domain([0, d3.max(nest.map(d => d.values))])

    xAxisGroup.call(xAxis)
    yAxisGroup.call(yAxis)

    let xLabel = elementGroup.append("text").text("Countries")
    .attr("transform", `translate(${width - margin.right - 30}, ${height - margin.bottom})`)
    .attr("text-anchor", "end").attr("font-weight", 700)

    let yLabel = elementGroup.append("text").text("Cups per country")
    .attr("transform", `translate(${-20}, ${-10})`).attr("font-weight", 700)

    let elements = elementGroup.selectAll("rect").data(nest)
    elements.enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.key))
        .attr("width", x.bandwidth())
        .attr("height", d => height - margin.top - margin.bottom - y(d.values))
        .attr("y", d => y(d.values))

})