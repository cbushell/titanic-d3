class Titanic
  constructor: () ->
    margin = {top: 20, right: 20, bottom: 30, left: 40}

    width = 960 - margin.left - margin.right
    height = 500 - margin.top - margin.bottom

    x = d3.scale.linear()
      .range([0, width])
      .domain([0, 100])

    y = d3.scale.linear()
      .range([height, 0])
      .domain([0, 3])

    xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")

    yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")


    svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Age")

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Class")

    d3.csv("data/train.csv", (d) =>
      males = []
      females = []
      for titanee in d
        do (titanee) ->
          if titanee.age and titanee.pclass
            list = if titanee.sex == "male" then males else females
            list.push(titanee)


      context = svg.selectAll(".dot")
        .data(males)
        .enter()
      this.square(context, x, y)

      context = svg.selectAll(".dot")
        .data(females)
        .enter()
      this.circle(context, x, y)
    )

  color = d3.scale.category10()

  circle: (c, x, y) ->
    c.append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", (d) -> return x(d.age))
      .attr("cy", (d) -> return y(d.pclass))
      .style("fill", (d) -> return color(d.survived))

  square: (c, x, y) ->
    c.append("rect")
      .attr("width", 7)
      .attr("height", 7)
      .attr("x", (d) -> return x(d.age))
      .attr("y", (d) -> return y(d.pclass))
      .style("fill", (d) -> return color(d.survived))


window.onload = ->
  new Titanic()

