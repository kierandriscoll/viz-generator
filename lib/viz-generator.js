
// TREEMAP -----------------------------------------------------------------------------------------------
// from https://www.d3-graph-gallery.com/graph/treemap_json.html
var data = {
"children":[{"name":"boss1",
              "children":[{"name":"mister_a","group":"A","value":28,"colname":"level3"},
                          {"name":"mister_b","group":"A","value":19,"colname":"level3"},
                          {"name":"mister_c","group":"C","value":18,"colname":"level3"},
                          {"name":"mister_d","group":"C","value":19,"colname":"level3"}],
              "colname":"level2"},
             {"name":"boss2",
              "children":[{"name":"mister_e","group":"C","value":14,"colname":"level3"},
                          {"name":"mister_f","group":"A","value":11,"colname":"level3"},
                          {"name":"mister_g","group":"B","value":15,"colname":"level3"},
                          {"name":"mister_h","group":"B","value":16,"colname":"level3"}],
              "colname":"level2"},
             {"name":"boss3",
              "children":[{"name":"mister_i","group":"B","value":10,"colname":"level3"},
                          {"name":"mister_j","group":"A","value":13,"colname":"level3"},
                          {"name":"mister_k","group":"A","value":13,"colname":"level3"},
                          {"name":"mister_l","group":"D","value":25,"colname":"level3"},
                          {"name":"mister_m","group":"D","value":16,"colname":"level3"},
                          {"name":"mister_n","group":"D","value":28,"colname":"level3"}],
              "colname":"level2"}],
"name":"CEO"};

// set the dimensions and margins of the graph
var margin = {top: 10, right: 10, bottom: 10, left: 10},
  width = 445 - margin.left - margin.right,
  height = 445 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#Treemap-row0-box1 .box-body")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// read json data
//d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_dendrogram_full.json", function(data) {

  // Give the data to this cluster layout:
  var root = d3.hierarchy(data).sum(function(d){ return d.value}) // Here the size of each leave is given in the 'value' field in input data

  // Then d3.treemap computes the position of each element of the hierarchy
  d3.treemap()
    .size([width, height])
    .padding(2)
    (root)

  // use this information to add rectangles:
  svg
    .selectAll("rect")
    .data(root.leaves())
    .enter()
    .append("rect")
      .attr('x', function (d) { return d.x0; })
      .attr('y', function (d) { return d.y0; })
      .attr('width', function (d) { return d.x1 - d.x0; })
      .attr('height', function (d) { return d.y1 - d.y0; })
      .style("stroke", "black")
      .style("fill", "slateblue")

  // and to add the text labels
  svg
    .selectAll("text")
    .data(root.leaves())
    .enter()
    .append("text")
      .attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
      .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
      .text(function(d){ return d.data.name })
      .attr("font-size", "15px")
      .attr("fill", "white")
//})
// TREEMAP -----------------------------------------------------------------------------------------------
// TODO: Functionalise and choose color/value to use/font size/height/width.Abstract
// TODO: Read from csv and convert.
