(function () {
    var html = `<div id="chart1" class="carousel-item">
    <h6 class="text-center main-title">2018年 銷售分析 單位:仟元USD</h6>
    <div class="row">
        <div class="col-md-7">
            <div id="chart-context-1" class="row">  
            </div>
            <div id="chart-context-2" class="row"></div>
    
        </div>
    
        <div class="col-md-5">
            <div id="chart-context-3" class="row"> </div>
            <div id="chart-context-4" class="row"> </div>
        </div>
    </div>
    </div>`;
    //基本設定
    let drawArea = document.getElementById('draw-area');
    $(drawArea).append(html);

    let navHeight = $('nav').outerHeight();
    let titleHeight = 19;
    let windowHeight = screen.height - 80;//$(window).height()-30;
    let chartHeight = (windowHeight - navHeight - titleHeight) * 0.7;
    let chartHeight2 = (windowHeight - navHeight - titleHeight) * 0.29;
    let chartHeight3 = (windowHeight - navHeight - titleHeight) * 0.49;

    let chartColWidth = $h.gridToLength(7);
    let chartColWidthRight = $h.gridToLength(5);

    var radius = Math.min(chartColWidthRight, chartHeight3) / 2.5;
    function draw() {
        let data = [
            { bu: '泡綿事業部', v1: 69174, v2: 26653, v3: 24577, v4: -47313 },
            { bu: '配材事業部', v1: 72724, v2: 28455, v3: 26941, v4: 4773 },
            { bu: '新創事業部', v1: 2950, v2: 798, v3: 423, v4: 0 },
            { bu: '復合事業部', v1: 21582, v2: 8044, v3: 6120, v4: 1585 }
        ],
            margin = {
                top: 30, right: 40, bottom: 30, left: 60
            },
            height = chartHeight - margin.top - margin.bottom,
            width = chartColWidth - margin.right - margin.left;

        data = data.map((d, i) => {
            var temp = []
            var name;
            for (var n in d) {
                if (n == 'bu') {
                    name = d[n];
                } else {
                    temp.push({ bu: name, value: d[n], type: n });
                }
            }
            return temp;
        }).reduce((prev, curr) => prev.concat(curr));

        let valueList = data.map((d) => d.value),
            max = d3.max(valueList),
            min = d3.min(valueList),
            color = d3.scaleOrdinal(d3.schemeDark2).domain(d => d.type);

        var y = d3.scaleLinear().rangeRound([height, 0]).domain([min, max]);
        var x = d3.scaleBand().rangeRound([0, width]).domain(data.map(d => d.bu)).padding(0.2);
        var typeScale = d3.scaleBand().rangeRound([0, x.bandwidth()]).domain(data.map(d => d.type)).padding(0.05);
        // var drawArea=
        //debugger;
        var area1 = d3.select('#draw-area #chart1 #chart-context-1');
        var svg = $h.d3SelectAppend(area1, 'svg');
        // var svg = area1.select('svg');
        // svg = svg.empty() ? area1.append('svg') : svg;
        svg.attr('width', chartColWidth)
            .attr('height', chartHeight);
        var g = $h.d3SelectAppend(svg, 'g','main')

        // var g = svg.select('g.main');
        // g = g.empty() ? svg.append('g') : g;
        g.attr('xxx','xxx').attr('transform', `translate(${margin.left},${margin.top})`); //主顯示區，可簡化各種邊界位置計算

        //依照月份產生群組區域
        var groupsUpdate = g.selectAll('g.bu-group')
            .data(data);

        var enterGroupG = groupsUpdate.enter()
            .append('g')
            .attr('class', 'bu-group')
            .attr('transform', d => `translate(${x(d.bu)},0)`)

        //畫矩形
        enterGroupG.selectAll(null)
            .data(d => [d])
            .enter()
            .append('rect')
            .attr('score', d => d.value)
            .attr('x', (d, i) => typeScale(d.type))
            .attr('y', (d, i) => y(0))
            .attr('width', typeScale.bandwidth())
            .transition()
            .duration(1500)
            .attr('y', (d, i) => (d.value > 0 ? y(d.value) : y(0)))
            .attr('height', (d) => Math.abs(y(0) - y(d.value)))
            .attr('fill', d => color(d.type));

        //數值
        enterGroupG.selectAll('text')
            .data(d => [d])
            .enter()
            .append('text')
            .text(d => d).attr("font-size", 10)
            .attr('y', d => y(0))
            .attr('x', d => typeScale(d.type))
            .transition()
            .duration(1500)
            .attr('y', d => y(d.value) - 10)
            
            .attr("dx", typeScale.bandwidth() / 2)
            .text(d => d.value)
            .attr("text-anchor", "middle");

        //X軸
        $h.d3SelectAppend(g,'g','axis-x')
        // g.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x));

        //Y軸
        $h.d3SelectAppend(g,'g','axis-y')
            .attr('transform', `translate(0,0)`)
            .call(d3.axisLeft(y).ticks(5));

        var titleG = $h.d3SelectAppend(svg, 'g','chart-title')// svg.append('g')
            // .attr('class', 'chart-title')
            .attr('transform', `translate(${chartColWidth - 120},0)`);
        titleG.append('rect')
            .attr('y', 0)
            .attr('x', 0)
            .attr('height', '30px')
            .attr('width', 120)
            .attr('fill', '#CCC');
        titleG.append('text')
            .attr('y', 18)
            .attr('x', 120 / 2).text('事業部 銷售分析').attr("text-anchor", "middle")


        // var svg2 = d3.select('#draw-area #chart1 #chart-context-2')
        //     .insert('svg')
        //     .attr('width', chartColWidth)
        //     .attr('height', chartHeight2);
        // var g2 = d3SelectAppend(svg2,'g','').attr('transform', `translate(${margin.left},${margin.top})`); //主顯示區，可簡化各種邊界位置計算



        let data3 = [
            { bu: '泡綿事業部', v1: 69174, v2: 26653, v3: 24577, v4: -47313 },
            { bu: '配材事業部', v1: 72724, v2: 28455, v3: 26941, v4: 4773 },
            { bu: '新創事業部', v1: 2950, v2: 798, v3: 423, v4: 0 },
            { bu: '復合事業部', v1: 21582, v2: 8044, v3: 6120, v4: 1585 }
        ], margin3 = {
            top: 10, right: 10, bottom: 10, left: 10
        }

        // var y = d3.scaleLinear().rangeRound([height, 0]).domain([min, max]);
        // var x = d3.scaleBand().rangeRound([0, width]).domain(data.map(d => d.bu)).padding(0.2);
        // var typeScale = d3.scaleBand().rangeRound([0, x.bandwidth()]).domain(data.map(d => d.type)).padding(0.05);
        var svg3 =$h.d3SelectAppend(d3.select('#draw-area #chart1 #chart-context-3'),'svg')
         
            .attr('width', chartColWidthRight)
            .attr('height', chartHeight3);


        var g3 = $h.d3SelectAppend(svg3,'g','group3')
            .attr('transform', `translate(${chartColWidthRight / 2 + margin3.left},${chartHeight3 / 2 + margin3.top})`); //主顯示區，可簡化各種邊界位置計算

        var pie = d3.pie()
            .sort(null)
            .value(d => d.v3);
        var path = d3.arc().outerRadius(radius)
            .innerRadius(0);
        var label = d3.arc()
            .outerRadius(radius + 30)
            .innerRadius(radius + 30);

        var arc = g3.selectAll('.arc')
            .data(pie(data3))
            .enter().append('g').attr('class', 'arc');
        arc.append('line')
            .attr('stroke', 'black')
            .attr('x1', d => path.centroid(d)[0] * 2.5)
            .attr('y1', d => path.centroid(d)[1] * 2.5);
        arc.append('path')
            .attr('d', path)
            .attr('fill', d => color(d.data.v3))
        arc.append("text")
            .attr("transform", function (d) { return `translate(${path.centroid(d) + 100})`; })

            .attr('text-anchor', 'middle')
            .text(d => {
                var percent = Number(d.data.v3) / d3.sum(data3, x => x.v3) * 100;
                return percent.toFixed(1) + '%';
            });


        arc.append("text")
            .attr('text-anchor', 'middle')
            .text(d => d).attr("font-size", '0.8em')
            .attr("transform", function (d) { return `translate(${path.centroid(d)[0] * 2.6},${path.centroid(d)[1] * 2.6})`; })
            .text(d => d.data.bu);
        var titleG3 = svg3.append('g')
            .attr('class', 'chart-title')
            .attr('transform', `translate(${chartColWidthRight - 120},0)`);
        titleG3.append('rect')
            .attr('y', 0)
            .attr('x', 0)
            .attr('height', '30px')
            .attr('width', 120)
            .attr('fill', '#CCC');
        titleG3.append('text')
            .attr('y', 18)
            .attr('x', 120 / 2).text('銷售額佔比').attr("text-anchor", "middle")
    }
    draw();
    register.push({ id: 'chart1', active: draw });
})()
