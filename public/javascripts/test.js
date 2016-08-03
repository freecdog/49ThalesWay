/**
 * Created by jaric on 02.08.2016.
 */

(function(window){

    if (window.core){
        console.log("window.core is here:", window.core);

        var p1 = new core.Farm();
        var p2 = new core.Farm();
        console.log(p1,p2);

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
        }, 3300);
        setTimeout(function(){
            console.log(t.roundFromStart(), t.timeFromStart());
        }, 4400);
    } else {
        console.error("no window.core", window);
    }

})(window);