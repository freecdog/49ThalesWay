/**
 * Created by jaric on 02.08.2016.
 */

(function(window){

    if (window.core){
        console.log("window.core is here:", window.core);

        var p1 = new core.Person();
        var p2 = new core.Person();
        console.log(p1,p2);

        var f1 = new core.Farm();
        var f2 = new core.Farm();
        console.log(f1,f2);

        var t = new core.TimeLine();
        setTimeout(function(){
            console.log(t.roundFromStart(), t.timeFromStart());
        }, 1100);
        setTimeout(function(){
            t.pause();
            console.log("paused");
        }, 2200);
        setTimeout(function(){
            t.pause();
            console.log("unpaused");
        }, 5500);
        setTimeout(function(){
            t.pause();
            console.log("paused");
        }, 8800);
        setTimeout(function(){
            t.pause();
            console.log("unpaused");
        }, 13300);
        setTimeout(function(){
            console.log(t.roundFromStart(), t.timeFromStart());

            t.stopTimeLine();
        }, 14400);

    } else {
        console.error("no window.core", window);
    }

})(window);