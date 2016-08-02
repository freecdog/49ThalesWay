/**
 * Created by jaric on 02.08.2016.
 */

(function(window){

    if (window.core){
        console.log("window.core is here:", window.core);

        var p1 = new core.Farm();
        var p2 = new core.Farm();
        console.log(p1,p2);
    } else {
        console.error("no window.core", window);
    }

})(window);