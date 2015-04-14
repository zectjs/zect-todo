;(function () {
   var insp_times = {}
    console.time = function (name) {
        insp_times[name] = Date.now();
    }
    console.timeEnd = function (name) {
        if (insp_times[name] == undefined) return;
        var end = Date.now() - insp_times[name];
        console.log('%c' + name + ': ' + end + 'ms', 'color: blue')
    } 
})()