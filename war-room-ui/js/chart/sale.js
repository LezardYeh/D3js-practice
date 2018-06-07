(function () {
    //https://codepen.io/zakariachowdhury/pen/JEmjwq
    var html = `<div id="sale-chart" class="carousel-item">
    <h6 class="text-center main-title">每日銷售分析</h6>
    <div class="row">
        <div class="col-md-6" id="left-chart"></div>    
        <div class="col-md-6" id="right-chart"></div>
    </div>
    </div>`;
    //基本設定
    let drawArea = document.getElementById('draw-area');
    $(drawArea).append(html);

    let navHeight = $('nav').outerHeight();
    let titleHeight = 19;
    let windowHeight = screen.height - 40;//$(window).height()-30;
    var count = 0;
    var data = [
        {
            type: '出貨量',
            values: [
                { date: new Date('2018-05-01'), value: 500 },
                { date: new Date('2018-05-02'), value: 70 },
                { date: new Date('2018-05-03'), value: 80 },
                { date: new Date('2018-05-04'), value: 20 },
                { date: new Date('2018-05-05'), value: 30 },
                { date: new Date('2018-05-06'), value: 44 },
                { date: new Date('2018-05-07'), value: 50 },
                { date: new Date('2018-05-08'), value: 30 },
                { date: new Date('2018-05-09'), value: 70 },
                { date: new Date('2018-05-10'), value: 20 },
                { date: new Date('2018-05-11'), value: 30 },
                { date: new Date('2018-05-12'), value: 100 },
                { date: new Date('2018-05-13'), value: 55 },
                { date: new Date('2018-05-14'), value: 50 },
                { date: new Date('2018-05-15'), value: 50 },
                { date: new Date('2018-05-16'), value: 60 },
                { date: new Date('2018-05-17'), value: 85 },
                { date: new Date('2018-05-18'), value: 100 },
                { date: new Date('2018-05-19'), value: 55 },
                { date: new Date('2018-05-20'), value: 120 },
                { date: new Date('2018-05-21'), value: 5 },
                { date: new Date('2018-05-22'), value: 40 },
                { date: new Date('2018-05-23'), value: 60 },
                { date: new Date('2018-05-24'), value: 80 },
                { date: new Date('2018-05-25'), value: 50 },
                { date: new Date('2018-05-26'), value: 20 },
                { date: new Date('2018-05-27'), value: 70 },
                { date: new Date('2018-05-28'), value: 95 },
                { date: new Date('2018-05-29'), value: 150 },
                { date: new Date('2018-05-30'), value: 100 }
            ]
        }, {
            type: '接單量',
            values: [
                { date: new Date('2018-05-01'), value: 20 },
                { date: new Date('2018-05-02'), value: 35 },
                { date: new Date('2018-05-03'), value: 145 },
                { date: new Date('2018-05-04'), value: 50 },
                { date: new Date('2018-05-05'), value: 59 },
                { date: new Date('2018-05-06'), value: 78 },
                { date: new Date('2018-05-07'), value: 54 },
                { date: new Date('2018-05-08'), value: 68 },
                { date: new Date('2018-05-09'), value: 87 },
                { date: new Date('2018-05-10'), value: 69 },
                { date: new Date('2018-05-11'), value: 47 },
                { date: new Date('2018-05-12'), value: 56 },
                { date: new Date('2018-05-13'), value: 89 },
                { date: new Date('2018-05-14'), value: 37 },
                { date: new Date('2018-05-15'), value: 59 },
                { date: new Date('2018-05-16'), value: 47 },
                { date: new Date('2018-05-17'), value: 20 },
                { date: new Date('2018-05-18'), value: 69 },
                { date: new Date('2018-05-19'), value: 78 },
                { date: new Date('2018-05-20'), value: 44 },
                { date: new Date('2018-05-21'), value: 95 },
                { date: new Date('2018-05-22'), value: 68 },
                { date: new Date('2018-05-23'), value: 46 },
                { date: new Date('2018-05-24'), value: 28 },
                { date: new Date('2018-05-25'), value: 18 },
                { date: new Date('2018-05-26'), value: 68 },
                { date: new Date('2018-05-27'), value: 75 },
                { date: new Date('2018-05-28'), value: 50 },
                { date: new Date('2018-05-29'), value: 79 },
                { date: new Date('2018-05-30'), value: 80 }
            ]
        },
        {
            type: '預出量',
            values: [
                { date: new Date('2018-05-01'), value: 50 },
                { date: new Date('2018-05-02'), value: 20 },
                { date: new Date('2018-05-03'), value: 40 },
                { date: new Date('2018-05-04'), value: 50 },
                { date: new Date('2018-05-05'), value: 80 },
                { date: new Date('2018-05-06'), value: 34 },
                { date: new Date('2018-05-07'), value: 77 },
                { date: new Date('2018-05-08'), value: 50 },
                { date: new Date('2018-05-09'), value: 20 },
                { date: new Date('2018-05-10'), value: 84 },
                { date: new Date('2018-05-11'), value: 68 },
                { date: new Date('2018-05-12'), value: 45 },
                { date: new Date('2018-05-13'), value: 17 },
                { date: new Date('2018-05-14'), value: 50 },
                { date: new Date('2018-05-15'), value: 97 },
                { date: new Date('2018-05-16'), value: 96 },
                { date: new Date('2018-05-17'), value: 34 },
                { date: new Date('2018-05-18'), value: 85 },
                { date: new Date('2018-05-19'), value: 46 },
                { date: new Date('2018-05-20'), value: 47 },
                { date: new Date('2018-05-21'), value: 59 },
                { date: new Date('2018-05-22'), value: 87 },
                { date: new Date('2018-05-23'), value: 56 },
                { date: new Date('2018-05-24'), value: 50 },
                { date: new Date('2018-05-25'), value: 26 },
                { date: new Date('2018-05-26'), value: 36 },
                { date: new Date('2018-05-27'), value: 75 },
                { date: new Date('2018-05-28'), value: 15 },
                { date: new Date('2018-05-29'), value: 34 },
                { date: new Date('2018-05-30'), value: 38 }
            ]
        }
    ];
    function draw() {
        //左圖
        (function () {
            count++;
            let chartHeight = (windowHeight - navHeight - titleHeight);
            let charWidth = $h.gridToLength(6);


            if (count > 1) {
                data.forEach(d => {
                    d.values.forEach(dd => {
                        // dd.value = Math.floor(Math.random() * 200);
                    })
                    var newDate = new Date(d.values[d.values.length-1].date);
                    newDate.setDate(newDate.getDate()+1);
                    // newDate.setDate(newDate.getDate() + 1);
                    debugger;
                    d.values.push({ date: newDate, value: Math.random() * 200 })
                })
                // console.log(data);
            }
            // console.log(data);
            var margin = {
                top: 30, right: 80, bottom: 30, left: 60
            },
                height = chartHeight - margin.top - margin.bottom,
                width = charWidth - margin.right - margin.left;
            var extentValue = d3.extent(data[0].values, a => a.value),
                max = extentValue[1],
                min = extentValue[0];
            var dateScale = d3.scaleTime().domain(d3.extent(data[0].values, a => a.date)).range([0, width]);
            var yScale = d3.scaleLinear().domain([min, max * 1.1]).range([height, 0]);
            // var yScale = d3.scaleLinear().domain(d3.extent(data[0].values, a => a.value)).range([height, 0]);

            var area = d3.select('#sale-chart #left-chart');
            var color = d3.scaleOrdinal(d3.schemeCategory10);//.domain(data.map(a => a.type));

            var svg = $h.d3SelectAppend(area, 'svg');

            svg.attr('width', charWidth).attr('height', chartHeight);
            var g = $h.d3SelectAppend(svg, 'g', 'main');
            $h.d3Translate(g, margin.left, margin.top);

            var line = d3.line()
                .curve(d3.curveMonotoneX)
                .x((d, i) => dateScale(d.date))
                .y((d, i) => yScale(d.value));

            var lineUpdate = g.selectAll('g.line-group')
                .data(data)

            lineUpdate.selectAll('path.line')
                .data(function (d, i) {
                    return [d];
                })
                .transition()
                .duration(1500)
                .attr("d", d => {
                    return line(d.values)
                })
                .style('stroke', (d, i) => {
                    return color(d.type);
                })

            var lineGroup = lineUpdate.enter()
                .append('g')
                .attr('class', 'line-group');

            $h.d3SelectAppend(lineGroup, 'path', 'line')
                .attr('fill', 'none')
                .attr("d", d => line(d.values))
                .style('stroke', (d, i) => {
                    // console.log(i);
                    return color(d.type);
                })
                .attr('stroke-width', '2px');

            var circleGroupUpdate = g.selectAll('.circle-group')
                .data(data);

            var circleUpdate = circleGroupUpdate.enter()
                .append('g')
                .attr('class', 'circle-group')
                .style('fill', (d, i) => color(d.type))
                .selectAll('circle')
                .data(d => d.values)

            // console.log(circleGroupUpdate.selectAll('g.circle circle').empty());
            circleGroupUpdate.selectAll('g.circle circle')
                .data(d => d.values)
                .transition()
                .duration(1500)
                .attr('cx', d => {
                    console.log(d);
                    return dateScale(d.date)
                })
                .attr('cy', d => yScale(d.value))
            circleGroupUpdate.selectAll('g.circle')
                .data(d => d.values)
                .on("mouseover", function (d) {
                    d3.select(this)
                        .style("cursor", "pointer")
                        .append("text")
                        .attr("class", "text")
                        .text(`${d.value}`)
                        .attr("x", d => dateScale(d.date) + 5)
                        .attr("y", d => yScale(d.value) - 10);
                })
                .on("mouseout", function (d) {
                    d3.select(this)
                        .style("cursor", "none")
                        .transition()
                        .duration(100)
                        .selectAll(".text").remove();
                })


            circleUpdate.enter()
                .append('g')
                .attr('class', 'circle')
                .on("mouseover", function (d) {
                    d3.select(this)
                        .style("cursor", "pointer")
                        .append("text")
                        .attr("class", "text")
                        .text(`${d.value}`)
                        .attr("x", d => dateScale(d.date) + 5)
                        .attr("y", d => yScale(d.value) - 10);
                })
                .on("mouseout", function (d) {
                    d3.select(this)
                        .style("cursor", "none")
                        .transition()
                        .duration(100)
                        .selectAll(".text").remove();
                })

                .append('circle')
                .attr('cx', d => dateScale(d.date))
                .attr('cy', d => yScale(d.value))
                .attr('r', 2.5)
                .on("mouseover", function (d) {
                    d3.select(this)
                        .transition()
                        .duration(100)
                        .attr("r", 10);
                })
                .on("mouseout", function (d) {
                    d3.select(this)
                        .transition()
                        .duration(100)
                        .attr("r", 2.5);
                });

            var labelUpdate = $h.d3SelectAppend(g, 'g', 'label')
                // g.append('g').attr('class', 'label')
                .attr('transform', `translate(${width + 10},0)`)

                .selectAll('.label-text')
                .data(data)
            labelUpdate
                .transition().duration(1500)
                .attr('y', (d) => {
                    // console.log(d.values[d.values.length - 1].value);
                    return yScale(d.values[d.values.length - 1].value);
                })

            labelUpdate.enter()
                .append('text').attr('class', 'label-text')
                .attr('fill', (d, i) => color(d.type))
                .attr('y', (d) => {
                    // console.log(d.values[d.values.length - 1].value);
                    return yScale(d.values[d.values.length - 1].value);
                })
                .text(d => {
                    // console.log(d);
                    return d.type
                });



            var x = $h.d3SelectAppend(g, 'g', 'axis-x');
            $h.d3Translate(x, 0, height).call(d3.axisBottom(dateScale))
            // var y = $h.d3SelectAppend(g, 'g', 'axis-y');
            $h.d3SelectAppend(g, 'g', 'axis-y').attr("transform", "translate(0,0)").call(d3.axisLeft(yScale));
        })();


        // let valueList = data.map((d) => d.value),
        //     max = d3.max(valueList),
        //     min = d3.min(valueList),
        //     color = d3.scaleOrdinal(d3.schemeDark2).domain(d => d.type);

        // var y = d3.scaleLinear().rangeRound([height, 0]).domain([min, max]);
        // var x = d3.scaleBand().rangeRound([0, width]).domain(data.map(d => d.bu)).padding(0.2);
        // var typeScale = d3.scaleBand().rangeRound([0, x.bandwidth()]).domain(data.map(d => d.type)).padding(0.05);
        // // var drawArea=
        // //debugger;
        // var area1 = d3.select('#draw-area #chart1 #chart-context-1');
        // var svg = d3SelectAppend(area1, 'svg');
        // // var svg = area1.select('svg');
        // // svg = svg.empty() ? area1.append('svg') : svg;
        // svg.attr('width', chartColWidth)
        //     .attr('height', chartHeight);
        // var g = d3SelectAppend(svg, 'g','main')

        // // var g = svg.select('g.main');
        // // g = g.empty() ? svg.append('g') : g;
        // g.attr('xxx','xxx').attr('transform', `translate(${margin.left},${margin.top})`); //主顯示區，可簡化各種邊界位置計算

        // //依照月份產生群組區域
        // var groupsUpdate = g.selectAll('g.bu-group')
        //     .data(data);

        // var enterGroupG = groupsUpdate.enter()
        //     .append('g')
        //     .attr('class', 'bu-group')
        //     .attr('transform', d => `translate(${x(d.bu)},0)`)

        // //畫矩形
        // enterGroupG.selectAll(null)
        //     .data(d => [d])
        //     .enter()
        //     .append('rect')
        //     .attr('score', d => d.value)
        //     .attr('x', (d, i) => typeScale(d.type))
        //     .attr('y', (d, i) => y(0))
        //     .attr('width', typeScale.bandwidth())
        //     .transition()
        //     .duration(1500)
        //     .attr('y', (d, i) => (d.value > 0 ? y(d.value) : y(0)))
        //     .attr('height', (d) => Math.abs(y(0) - y(d.value)))
        //     .attr('fill', d => color(d.type));

        // //數值
        // enterGroupG.selectAll('text')
        //     .data(d => [d])
        //     .enter()
        //     .append('text')
        //     .text(d => d).attr("font-size", 10)
        //     .attr('y', d => y(0))
        //     .attr('x', d => typeScale(d.type))
        //     .transition()
        //     .duration(1500)
        //     .attr('y', d => y(d.value) - 10)

        //     .attr("dx", typeScale.bandwidth() / 2)
        //     .text(d => d.value)
        //     .attr("text-anchor", "middle");

        // //X軸
        // d3SelectAppend(g,'g','axis-x')
        // // g.append('g')
        //     .attr('transform', `translate(0,${height})`)
        //     .call(d3.axisBottom(x));

        // //Y軸
        // d3SelectAppend(g,'g','axis-y')
        //     .attr('transform', `translate(0,0)`)
        //     .call(d3.axisLeft(y).ticks(5));

        // var titleG = d3SelectAppend(svg, 'g','chart-title')// svg.append('g')
        //     // .attr('class', 'chart-title')
        //     .attr('transform', `translate(${chartColWidth - 120},0)`);
        // titleG.append('rect')
        //     .attr('y', 0)
        //     .attr('x', 0)
        //     .attr('height', '30px')
        //     .attr('width', 120)
        //     .attr('fill', '#CCC');
        // titleG.append('text')
        //     .attr('y', 18)
        //     .attr('x', 120 / 2).text('事業部 銷售分析').attr("text-anchor", "middle")


    }
    draw();
    register.push({ id: 'sale-chart', active: draw });
})()
