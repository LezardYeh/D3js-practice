(function () {
    var html = `<div id="chart2" class="carousel-item">
    <h6 class="text-center main-title">2018年 銷售分析 單位:仟元USD </h6>
    <div class="row">
        <div class="col-md-7">
            <div id="chart-context-1" class="row">
    
            </div>
            <div class="row"></div>
    
        </div>
    
        <div class="col-md-5"></div>
    </div>
    </div>`;
    let drawArea = document.getElementById('draw-area');
    $(drawArea).append(html);
    let navHeight = $('nav').outerHeight();
    let titleHeight = 19;
    let windowHeight = screen.height;//$(window).height();
    let chartHeight = (windowHeight - navHeight - titleHeight);
    let chartColWidth = $h.gridToLength(7);

    function draw() {
        let data = [
            { bu: '泡綿事業部', v1: 777, v2: 451, v3: 24577, v4: 58 },
            { bu: '配材事業部', v1: 705, v2: 28455, v3: 235, v4: 358 },
            { bu: '新創事業部', v1: 2950, v2: 798, v3: 423, v4: 0 },
            { bu: '復合事業部', v1: 754, v2: 894, v3: 125, v4: 100 }
        ],
            margin = {
                top: 40, right: 10, bottom: 50, left: 60
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
        // debugger;
        var svg = $h.d3SelectAppend(d3.select('#draw-area #chart2 #chart-context-1'), 'svg')

            .attr('width', chartColWidth)
            .attr('height', chartHeight);
        var g = $h.d3SelectAppend(svg, 'g', 'main').attr('transform', `translate(${margin.left},${margin.top})`); //主顯示區，可簡化各種邊界位置計算

        //依照月份產生群組區域
        var groups = g.selectAll('g')
            .data(data)
            .enter()
            .append('g')
            .attr('transform', d => `translate(${x(d.bu)},0)`);

        //畫矩形
        groups.selectAll(null)
            .data(d => [d])
            .enter()
            .append('rect')
            .attr('score', d => d.value)
            .attr('x', (d, i) => typeScale(d.type))
            .attr('y', (d, i) => (d.value > 0 ? y(d.value) : y(0)))

            .attr('width', typeScale.bandwidth())
            .attr('height', (d) => Math.abs(y(0) - y(d.value)))
            .attr('fill', d => color(d.type));

        //數值
        groups.selectAll('text')
            .data(d => [d])
            .enter()
            .append('text')
            .text(d => d).attr("font-size", 10)
            .attr('y', d => y(d.value) - 10)
            .attr('x', d => typeScale(d.type))
            .attr("dx", typeScale.bandwidth() / 2)
            .text(d => d.value)
            .attr("text-anchor", "middle");
        //X軸
        $h.d3SelectAppend(g, 'g','axis-x')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x));

        //Y軸
        $h.d3SelectAppend(g, 'g','axis-y')
            .attr('transform', `translate(0,0)`)
            .call(d3.axisLeft(y).ticks(5));
    }


    draw();
    register.push({ id: 'chart2', active: draw });
})()
