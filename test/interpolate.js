var duration   = 700,
    transition = 300;

var minFico = 250;
var maxFico = 900;
var score   = 850;
var scorePercent = ((score - minFico)/(maxFico - minFico)) * 100;
var remainScore  = 100 - scorePercent;
var range   = [scorePercent, remainScore];

var data = [ 
              { 
                value: scorePercent, 
                color: "#19AB52",
                display: minFico
              },
              { 
                value: remainScore, 
                color: "#fff" ,
                display: maxFico
              }];

var startAngle = -180 * Math.PI/180;
var endAngle = 180 * Math.PI/180;
var width = 200;
var height = 200;
var pie = d3.layout.pie()
  .sort(null)
  .value(function(d) { return d.value; })
  .startAngle(startAngle).endAngle(endAngle);

var radius = Math.min(width, height) / 2 - 10;

var arc = d3.svg.arc()
  .innerRadius(radius - 30)
  .outerRadius(radius + 10);

var svg = d3.select('#donut1').append("svg")
  .attr("width", width)
  .attr("height", height);

var circle = svg.selectAll("circle")
    .data([radius - 20])
    .enter()
    .append("circle")
    .attr("r", function(d) {
      return d;
    })
    .attr("fill", "#fff")
    .attr("stroke", "#053D60")
    .attr("stroke-width", function(d) {
        return 40;
    })
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var group = svg
  .selectAll("g")
  .data(pie(data))
  .enter()
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var path = group.append("path")
    .attr("class", function(d, i) { return "color" + i })
    .attr('fill', function(d) {
      return d.data.color;
    })
    .transition().duration(500).ease('linear')
    .attrTween('d', function(d) {
      let currentArc = this.__current__;
      if (!currentArc) {
        currentArc = { startAngle: startAngle, endAngle: startAngle };
      }
      let interpolate = d3.interpolate(currentArc, d);
      this.__current__ = interpolate(0);
      return function(t) {
        return arc(interpolate(t));
      };
    });

svg.append("svg:text")
  .attr("dy", ".15em")
  .attr("text-anchor", "middle")
  .attr("class", "score-text")
  .text(score)
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

svg.append("svg:text")
  .attr("dy", "1.5em")
  .attr("text-anchor", "middle")
  .attr("class", "score-rank")
  .text("Great")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

svg.append("text")
  .attr("x", 75)
  .attr("y", 177)
  .text(minFico)
  .attr("fill", "#fff")
  .attr("font-size", "10px");

svg.append("text")
  .attr("x", 105)
  .attr("y", 177)
  .text(maxFico)
  .attr("fill", "#fff")
  .attr("font-size", "10px");