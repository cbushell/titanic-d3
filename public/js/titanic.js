// Generated by CoffeeScript 1.4.0
(function() {
  var Titanic;

  Titanic = (function() {
    var color;

    function Titanic() {
      var height, margin, svg, width, x, xAxis, y, yAxis,
        _this = this;
      margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
      };
      width = 960 - margin.left - margin.right;
      height = 500 - margin.top - margin.bottom;
      x = d3.scale.linear().range([0, width]).domain([0, 100]);
      y = d3.scale.linear().range([height, 0]).domain([0, 3]);
      xAxis = d3.svg.axis().scale(x).orient("bottom");
      yAxis = d3.svg.axis().scale(y).orient("left");
      svg = d3.select("body").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis).append("text").attr("class", "label").attr("x", width).attr("y", -6).style("text-anchor", "end").text("Age");
      svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr("class", "label").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text("Class");
      d3.csv("data/train.csv", function(d) {
        var context, females, males, titanee, _fn, _i, _len;
        males = [];
        females = [];
        _fn = function(titanee) {
          var list;
          if (titanee.age && titanee.pclass) {
            list = titanee.sex === "male" ? males : females;
            return list.push(titanee);
          }
        };
        for (_i = 0, _len = d.length; _i < _len; _i++) {
          titanee = d[_i];
          _fn(titanee);
        }
        context = svg.selectAll(".dot").data(males).enter();
        _this.square(context, x, y);
        context = svg.selectAll(".dot").data(females).enter();
        return _this.circle(context, x, y);
      });
    }

    color = d3.scale.category10();

    Titanic.prototype.circle = function(c, x, y) {
      return c.append("circle").attr("class", "dot").attr("r", 3.5).attr("cx", function(d) {
        return x(d.age);
      }).attr("cy", function(d) {
        return y(d.pclass);
      }).style("fill", function(d) {
        return color(d.survived);
      });
    };

    Titanic.prototype.square = function(c, x, y) {
      return c.append("rect").attr("width", 7).attr("height", 7).attr("x", function(d) {
        return x(d.age);
      }).attr("y", function(d) {
        return y(d.pclass);
      }).style("fill", function(d) {
        return color(d.survived);
      });
    };

    return Titanic;

  })();

  window.onload = function() {
    var radar;
    return radar = new Titanic();
  };

}).call(this);
