/**
 * 画捆图(d3 3.0版本))
 * @param {*} STNNames 
示例
 {
     name: "",
     children:[
        {name: "北京"},{name: "上海"},{name: "杭州"},
        {name: "广州"},{name: "桂林"},{name: "昆明"},
        {name: "成都"},{name: "西安"},{name: "太原"}
     ]
 };
 * @param {*} AllLines 
示例
 [
            {source: "北京", target: "上海"},
            {source: "北京", target: "广州"},
            {source: "北京", target: "杭州"},
            {source: "北京", target: "西安"},
            {source: "北京", target: "成都"},
            {source: "北京", target: "太原"},
            {source: "北京", target: "桂林"},
            {source: "北京", target: "昆明"},
            {source: "北京", target: "成都"},
            {source: "上海", target: "杭州"},
            {source: "昆明", target: "成都"},
            {source: "西安", target: "太原"}
];
 * @param {*} sv 
 * @param {*} svgSize 
 * @param {*} margin 
 */
function drawBundle(STNNames, AllLines, sv, svgSize, margin) {
    dataModify(STNNames.children, 10);
    var color = colorChange("FF006C", "FDF003", "01A3EE", STNNames.children.length); //颜色比例尺

    let cluster = d3.layout.cluster() //d3 3.0版本写法
        //let cluster = d3.cluster()   //d3 4.0版本写法
        .size([360, svgSize.w / 2 - 100]) //调整角度/大小
        .separation(function (a, b) {
            return (a.parent == b.parent ? 1 : 2) / a.depth;
        });

    let bundle = d3.layout.bundle(); //d3 3.0版本写法
    let nodes = cluster.nodes(STNNames, 10);

    let oLinks = map(nodes, AllLines);
    //console.log(oLinks);

    let links = bundle(oLinks);
    //console.log(links);


    var line = d3.svg.line.radial()
        .interpolate("bundle")
        .tension(.85) //调整弯曲程度
        .radius(function (d) {
            return d.y;
        })
        .angle(function (d) {
            return d.x / 180 * Math.PI;
        });

    gBundle = sv.append("g")
        .attr("transform",
            "translate(" + (svgSize.w / 2 - 10) + "," + (svgSize.h / 2 - 50) + ")"); //调整中心位置

    /*     var color = d3.scale.category20c(); //颜色比例尺
     */

    var link = gBundle.selectAll(".link")
        .data(links)
        .enter()
        .append("path")
        .attr("class", "bublelink")
        .attr("d", line); //使用线段生成器


    var node = gBundle.selectAll(".node")
        .data(nodes.filter(function (d) {
            return !d.children;
        }))
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
            return "rotate(" + (d.x - 90) + ")translate(" +
                d.y + ")" + "rotate(" + (90 - d.x) + ")";
        });
    node.append("circle")
        .attr("r", 15)
        .style({
            "fill": (d, i) => color[i],
            "fill-opacity": (d, i) => d.name.length == 0 ? "0.0" : "1.0",
        });

    node.append("text")
        .attr("dy", ".2em")
        .style("text-anchor", "middle")
        .text(function (d) {
            return d.name;
        });

}

function map(nodes, links) {
    var hash = [];
    for (var i = 0; i < nodes.length; i++) {
        hash[nodes[i].name] = nodes[i];
    }
    var resultLinks = [];
    for (var i = 0; i < links.length; i++) {
        resultLinks.push({
            source: hash[links[i].Source],
            target: hash[links[i].Target]
        });
    }
    return resultLinks;
}

function dataModify(t, insertnum) {
    // console.log(STNNames.children);
    let headtemp = t.splice(0, 3);

    for (let i = 0; i < 2 * insertnum; i++) {
        t.splice(Math.floor(t.length / 4) + 1, 0, {
            name: ""
        });
    }
    headtemp.forEach((x, i) => {
        t.splice(Math.floor(t.length / 4), 0, x);
    })


    /*     t.move(0, Math.floor(STNNames.children.length / 4));
        t.move(0, Math.floor(STNNames.children.length / 4));
        t.move(0, Math.floor(STNNames.children.length / 4)); */
}






/**
 * 画圆形线簇图
 * @param {Object} data
 * 数据 示例
 *    [{
            "id": "珠斯花二场.白城.4864379",
            "value": ""
        }, {
            "id": "珠斯花二场.白城.1741691",
            "value": ""
        }, {
            "id": "珠斯花二场.白城.1665893",
            "value": ""
        }, {
            "id": "珠斯花二场.白城.1687808",
            "value": ""
        }]
 * @param {Object} svg
 * @param {Object} svgSize
 * @param {Object} margin
 */
function drawRadial(data, svg, svgSize, margin) {
    var width = svgSize.w;
    var height = svgSize.h;
    console.log(data.length);
    var g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + (height / 2 + 20) + ")");
    var stratify = d3.stratify()
        .parentId(function (d) {
            return d.id.substring(0, d.id.lastIndexOf("."));
        });
    var cluster = d3.cluster()
        .size([360, width / 2 - 120]);

    /*     d3.csv("./Scripts/flare.csv", function (error, data) {
     */ // if (error) throw error;
    console.log(data);
    var root = stratify(data)
        .sort(function (a, b) {
            return a.height - b.height || a.id.localeCompare(b.id);
        });
    console.log(root);

    cluster(root);

    var link = g.selectAll(".link")
        .data(root.descendants().slice(1))
        .enter().append("path")
        .attr("class", "link")
        .attr("d", function (d) {
            return "M" + project(d.x, d.y) +
                "C" + project(d.x, (d.y + d.parent.y) / 2) +
                " " + project(d.parent.x, (d.y + d.parent.y) / 2) +
                " " + project(d.parent.x, d.parent.y);
        });

    var node = g.selectAll(".node")
        .data(root.descendants())
        .enter().append("g")
        .attr("class", function (d) {
            return "node" + (d.children ? " node--internal" : " node--leaf");
        })
        .attr("transform", function (d) {
            return "translate(" + project(d.x, d.y) + ")";
        });

    node.append("circle")
        .attr("r", 2.5);

    node.append("text")
        .attr("dy", "0.31em")
        .attr("x", function (d) {
            return d.x < 180 === !d.children ? 6 : -6;
        })
        .style("text-anchor", function (d) {
            return d.x < 180 === !d.children ? "start" : "end";
        })
        .attr("transform", function (d) {
            return "rotate(" + (d.x < 180 ? d.x - 90 : d.x + 90) + ")";
        })
        .text(function (d) {
            return d.id.substring(d.id.lastIndexOf(".") + 1);
        });
    /*     });
     */
    function project(x, y) {
        var angle = (x - 90) / 180 * Math.PI,
            radius = y;
        return [radius * Math.cos(angle), radius * Math.sin(angle)];
    }
}

function drawArea(t, svg, svgSize, margin,khtype) {
    let cell = 50;
    let maxY = d3.max(t, (x) => parseInt(x.Count));
    let minY = d3.min(t, (x) => parseInt(x.Count));
    let maxX = d3.max(t, (x) => parseInt(x.Month));
    let avergeY = parseFloat(d3.mean(t, (x) => parseInt(x.Count))).toFixed(2);


    let Ylinear = d3.scale.linear().domain([0, maxY + 5]).range([svgSize.h - margin.bottom - 50, margin.top]);
    let Xlinear = d3.scale.linear().domain([0, t.length]).range([0, svgSize.w - margin.right - 50]);
    let title = `${t[0].DeskDes} ${t[0].Month}-${t[t.length-1].Month}${khtype}问题,平均折合${avergeY}分 最多${maxY}分 最少${minY}分 每人${parseFloat(avergeY/4).toFixed(2)}分 `
    let strs = title.split(',');
    drawXYlineText(svg, svgSize, margin, 0, Xlinear, Ylinear, t);

    var area = d3.svg.area() //生成上图area 注意这个area是一个path，要利用attr(d)加载进去
        .x(function (d) {
            let ind = 0;
            t.forEach((x, i) => ind = x.Month == d.Month ? i : ind);
            return Xlinear(ind);
        })
        .y0(svgSize.h - margin.top - 30)
        .y1(function (d) {
            return Ylinear(d.Count);
        })
    //.interpolate('bundle').tension(1);
    var line = d3.svg.line()
        .x(function (d) {
            let ind = 0;
            t.forEach((x, i) => ind = x.Month == d.Month ? i : ind);
            return Xlinear(ind);
        }).y(function (d) {
            return Ylinear(d.Count);
        });


    svg.append('path')
        .attr({
            'd': area(t),
            'fill': 'rgba(0,150,255,.1)',
            'transform': "translate(" + (margin.left) + "," + (0) + ")"
        });

    svg.append('path')
        .attr({
            'd': line(t),
            'stroke': 'rgb(0,150,255)',
            'fill': 'none',
            'transform': "translate(" + (margin.left) + "," + (0) + ")"
        });

    var text = svg.append("text").attr({
        "x": margin.left + (svgSize.w - margin.left) / 2 - 20,
        "y": margin.top + 10
    }).style({
        "font-size": "25pt",
        "fill": "#000",
        "font-family": "simsun",
        "text-anchor": "middle"
    });


    text.selectAll("tspan")
        .data(strs)
        .enter()
        .append("tspan")
        .attr("x", text.attr("x"))
        .attr("dy", "1em")
        .text(function (d) {
            return d;
        });

    let cirs = svg.selectAll("circle").data(t).enter().append("circle").on({
        "mouseover": (x, i) => mover(x, i),
        "mouseout": (x, i) => mout(x, i)
    }).attr({
        "class": (x, i) => "cir" + i,
        "cx": (x, i) => Xlinear(i) + margin.left,
        "cy": (x, i) => Ylinear(parseInt(x.Count)) + (0),
        "r": 10
    }).style({
        "display": "block",
        "fill": (x, i) => '#fff',
        'stroke': '#000',
        "fill-opacity": "0.0",
        "stroke-opacity": "0.0",
        "white-space": "nowrap",
        "transform-origin": " 0px 0px 0px"
    });


    var mover = function (d, i) {
        d3.selectAll(`.cir${i}`).transition().duration(100).delay(50).style({
            "fill-opacity": "1.0",
            "stroke-opacity": "1.0",
            "cursor": "pointer"
        });
        let rect = svg.append("rect").attr({
            "class": "rect" + i,
            "x": (Xlinear(i) + margin.left + 200) > svgSize.w ? (Xlinear(i) + margin.left - 200) : (Xlinear(i) + margin.left),
            "y": Ylinear(parseInt(d.Count)) + (0),
            "rx": "10",
            "ry": "10",
            "height": 150,
            "width": 200
        }).style({
            "display": "block",
            "fill": '#333',
            "white-space": "nowrap",
            "fill-opacity": "0.5",
            "transform-origin": " 0px 0px 0px"
        });
        svg.append("text").attr({
            "class": "name" + i,
            "x": (x, n) => (Xlinear(i) + margin.left + 200) > svgSize.w ? (Xlinear(i) + margin.left - 200 + 30) : (Xlinear(i) + margin.left + 30),
            "y": (x, n) => Ylinear(parseInt(d.Count)) + (0) + 20,

        }).style({
            "font-size": "11pt",
            "fill": "#fff",
        }).text(d.DeskDes + '  ' + d.Month.splice(4, '/'));
        svg.append("text").attr({
            "class": "name" + i,
            "x": (x, n) => (Xlinear(i) + margin.left + 200) > svgSize.w ? (Xlinear(i) + margin.left - 200 + 30) : (Xlinear(i) + margin.left + 30),
            "y": (x, n) => Ylinear(parseInt(d.Count)) + (0) + 40,

        }).style({
            "font-size": "11pt",
            "fill": "#fff",
        }).text("折合分数：" + d.Count);



        d.KhdjDes.split(',').forEach((kd, j) => {
            svg.selectAll("*:not(*)").data(d.KhdjDes.split(',')).enter().append("text").attr({
                "class": "name" + i,
                "x": (x, n) => (Xlinear(i) + margin.left + 200) > svgSize.w ? (Xlinear(i) + margin.left - 200 + 30) : (Xlinear(i) + margin.left + 30),
                "y": (x, n) => Ylinear(parseInt(d.Count)) + (0) + 60 + n * 20,

            }).style({
                "font-size": "11pt",
                "fill": "#fff",
            }).text((x) => x)
        })

    }
    var mout = function (d, i) {
        d3.selectAll(`.cir${i}`).transition().duration(100).delay(50).style({
            "fill-opacity": "0.0",
            "stroke-opacity": "0.0",
            "cursor": "default"
        });
        d3.selectAll(`.rect${i}`).remove();
        d3.selectAll(`.name${i}`).remove();
    }

}

function drawXYlineText(sv, svgSize, margin, cell, Xlinear, Ylinear, t) {
    let maxY = d3.max(t, (x) => parseInt(x.Count));

    let ayis = d3.svg.axis().scale(Ylinear).orient("left").ticks(8).tickFormat(d3.format("d"));
    let Yline = sv.append("g").attr("class", "axis")
        .attr('transform', "translate(" + (margin.left) + "," + (0) + ")")
        .style({
            "fill": "none",
            "stroke": "#000",
            "stroke-width": 1,
        }).call(ayis);
    let Xnames = [];
    let index = [];
    if (t.length >= 15) {
        Xnames.push("");
        index.push(cell);
    }
    console.log(t.length);
    t.forEach((x, i) => {
        if (t.length < 15) {
            Xnames.push(x.Month);
            index.push(Xlinear(i));
        } else {
            if (x.Month.substr(4, 2) == "01") {
                Xnames.push(x.Month.substr(0, 4));
                index.push(Xlinear(i))
            }
        }

    });
    Xnames.push("");
    index.push(svgSize.w - 5);
    console.log(Xnames);
    console.log(index);
    let Xnamelinear = d3.scale.ordinal().domain(Xnames).range(index);
    let axis = d3.svg.axis().scale(Xnamelinear).orient("bottom").ticks(8);
    let Xline = sv.append("g")
        .attr('transform', "translate(" + (margin.left - cell) + "," + (svgSize.h - margin.bottom - 50) + ")")
        .style({
            "fill": "none",
            "stroke": "#000",
            "stroke-width": 1,
        }).call(axis);
    //绘制轴线
}







































































































var $$ = (x) => [].slice.call(x); //将对象转化为数组
//数组无素移动

Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};
Array.prototype.move2 = function (pos1, pos2) {
    // local variables
    var i, tmp;
    // cast input parameters to integers
    pos1 = parseInt(pos1, 10);
    pos2 = parseInt(pos2, 10);
    // if positions are different and inside array
    if (pos1 !== pos2 && 0 <= pos1 && pos1 <= this.length && 0 <= pos2 && pos2 <= this.length) {
        // save element from position 1
        tmp = this[pos1];
        // move element down and shift other elements up
        if (pos1 < pos2) {
            for (i = pos1; i < pos2; i++) {
                this[i] = this[i + 1];
            }
        }
        // move element up and shift other elements down
        else {
            for (i = pos1; i > pos2; i--) {
                this[i] = this[i - 1];
            }
        }
        // put element from position 1 to destination
        this[pos2] = tmp;
    }
}


function move(arr, oldIndex, newIndex) {
    if (newIndex >= arr.length) {
        var k = newIndex - arr.length;
        while ((k--) + 1) {
            arr.push(undefined);
        }
    }
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
    return arr;
};

//上移一层
function up(arr, indexes) {
    //indexes必须由大到小，所以得排序
    indexes.sort();
    indexes.reverse();

    //调换位置
    for (var i = 0; i < indexes.length; i++) {
        var index = indexes[i];
        move(arr, index, index + 1);
    }

    //去掉undefined
    var result = new Array();
    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (item != undefined) {
            result.push(item);
        }
    }

    return result;
}

//置顶
function ceil(arr, indexes) {
    //indexes必须由小到大，所以得排序
    indexes.sort();

    for (var i = 0; i < indexes.length; i++) {
        var index = indexes[i];
        move(arr, index - i, arr.length - 1);
    }

    return arr;
}
//