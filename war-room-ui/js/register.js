
var ChartRegistrar = function ChartRegistrar(allChart) {
    var _path = allChart;
    var cycleActiveList=[];
    var first=true;
    this.start = function () {
        for (var p in _path) {
            var js = document.createElement("script");
            js.async=false;
            js.type = "text/javascript";
            js.src = _path[p];
            document.body.appendChild(js);
        }
        
    }
    this.push = function(active){
        if(first){
            $(`#${active.id}`).addClass('active');
            first=false;
        }
        cycleActiveList.some(e=>e.id==active.id) || cycleActiveList.push(active);
        
    }
    this.execute = function(id){
        var target = cycleActiveList.find(e=>e.id==id);
        target && target['active'] && target['active'](); 
    }

}
