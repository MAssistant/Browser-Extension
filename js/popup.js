function setMastery(EName, mastery){
  console.log(JSON.stringify({'EName': EName, 'master': mastery}))
  $.ajax({
			url: 'https://kg.bnu.edu.cn:443/setMastery',
			data: JSON.stringify({'EName': EName, 'master': mastery}),
			contentType: "application/json",
			type: 'POST',
			success: function(res){
        console.log(res);
            }
	});
};
var items = [
  {
    label: "learned"	,
    onClick: function () {
          this.style.fill = "#7CFC00";
          entity = this.__data__;
          setMastery(entity.Name, 1);
        }
   },
  {
    label: "learning",
    onClick: function () {
          this.style.fill = "#FFD700";
          entity = this.__data__;
          setMastery(entity.Name, 2);
        }
  },
  {
    label: "to learn",
    onClick: function () {
          this.style.fill = "#DC143C";
          entity = this.__data__;
          setMastery(entity.Name, 3);
        }
  }
];

function getNodeColor(node){
  return 'grey';
}

var width = "250px";
var height = "250px";

var svg = d3.select('svg');
svg.attr('width', width).attr('height', height);


var func1 = function(callback){
    var value = chrome.extension.getBackgroundPage().get_subContent();
    callback(value);
};

var func2 = function(res){
    var value = JSON.parse(res);
    var tmp = value.nodes;
    var data = {};
    data['nodes'] = [];
    data['links'] = [];
    console.log(value.nodes);
    console.log(value.links);
    for (var i = 0; i < tmp.length; i++) {
        data['nodes'].push(tmp[i]);
    }
    tmp = value.links;
    for (var i = 0; i < tmp.length; i++) {
        data['links'].push(tmp[i]);
    }
    var nodes = data.nodes.map(d => Object.create(d));
    var links = data.links.map(d => Object.create(d));
    var subData = data.nodes;

    // draw
    var simulation = d3
      .forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.Name).distance(50))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(110, 120));

    for (var i = 0; i < subData.length; i++) {
        var temp = {};
        temp.wiki = subData[i]['URI'];
        temp.name = subData[i]['Name'];
        temp.index = i;
    //    	nodes.push(temp);
    }

    var linkElements = svg.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(links)
        .enter()
        .append("line")
        .attr("stroke-width", d => d.value * 2);

    var nodeElements = svg.append("g")
        .attr("class", "nodes")
        .attr("stroke", "white")
        .attr("stroke-width", 1.5)
        .selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("r", 10)
        .attr("fill", getNodeColor)
        .on('contextmenu', d3.contextmenu(items));

    var textElements = svg.append("g")
        .attr("class", "texts")
        .selectAll("text")
        .data(nodes)
        .enter()
        .append("text")
        .text(function (node) {
            return node.Name
        })
        .attr("font-size", 12)
        .attr("fill", "white")
        .attr("dx", 15)
        .attr("dy", 4);

    var tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0.0);

    textElements.on("mouseover", function (d) {
        tooltip
            .html("Prior Concept: " + d.pre + "<br/>" + "Successor Concept: " + d.after)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY + 20) + "px")
            .style("opacity", 0.8)
    })
        .on("mouseout", function (d) {
            tooltip.style("opacity", 0.0);
        });

    simulation.on('tick', function(d){
        linkElements
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y)

    nodeElements
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)

        textElements
        .attr('x', d => d.x)
        .attr('y', d => d.y)
    });

    // draw klist
    for (var i = 0; i < subData.length; i++) {
        console.log("I am drawing k list.");
        var para = document.createElement("p");
        var Time = document.createTextNode(subData[i]['Time'] + " ");
        para.appendChild(Time);
        var createA = document.createElement('a');
        var createAText = document.createTextNode(subData[i]['Name']);
        href = '/entity/' + encodeURIComponent(subData[i]['Name'])
        createA.setAttribute('href', href);
        createA.setAttribute('target', "_blank");
        createA.appendChild(createAText);
        para.appendChild(createA);
        var element = document.getElementById("try");
        element.appendChild(para);
    }
};

func1(func2);

