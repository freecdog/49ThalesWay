/**
 * Created by jaric on 02.08.2016.
 */

if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function (require, exports, module) {

    (function(){
        "use strict";

        // global on the server, window in the browser
        var root, previous_Test;

        root = this;
        if (root != null) {
            previous_Test = root.Test;
        }

        var core;
        var test = (function () {
            // https://github.com/podgorniy/javascript-toolbox/blob/master/singletone.js
            var instance = {};

            return function Construct_singletone() {
                if (instance) {
                    return instance;
                }
                if (this && this.constructor === Construct_singletone) {
                    instance = this;
                } else {
                    return new Construct_singletone();
                }
            };
        }());
        var Test = test;

        function run1(){
            if (core === undefined) {
                core = require('core');
                console.log("Test, core are here", core.version);
            }

            var p1 = new core.Person();
            var p2 = new core.Person();
            console.log(p1, p2);

            var f1 = new core.Farm();
            var f2 = new core.Farm();
            console.log(f1, f2);

            var t = new core.TimeLine();
            setTimeout(function () {
                console.log(t.roundFromStart(), t.timeFromStart());
            }, 1100);
            setTimeout(function () {
                t.pause();
                console.log("paused");
            }, 2200);
            setTimeout(function () {
                t.pause();
                console.log("unpaused");
            }, 5500);
            setTimeout(function () {
                t.pause();
                console.log("paused");
            }, 8800);
            setTimeout(function () {
                t.pause();
                console.log("unpaused");
            }, 13300);
            setTimeout(function () {
                console.log(t.roundFromStart(), t.timeFromStart());

                t.stopTimeLine();
            }, 14400);

        }
        test.run1 = run1;

        console.log("Test class loaded");

        // Node.js
        if (typeof module !== 'undefined' && module.exports) {
            module.exports = Test;
        }
        // AMD / RequireJS
        else if (typeof define !== 'undefined' && define.amd) {
            define([], function () {
                return Test;
            });
        }
        // included directly via <script> tag
        else {
            root.Test = Test;
        }

    })();

});


(function(){

    function test1() {
        var core = require('core');
        if (core) {
            console.log("Test, core is here:", core.version);

            var p1 = new core.Person();
            var p2 = new core.Person();
            console.log(p1, p2);

            var f1 = new core.Farm();
            var f2 = new core.Farm();
            console.log(f1, f2);

            var t = new core.TimeLine();
            setTimeout(function () {
                console.log(t.roundFromStart(), t.timeFromStart());
            }, 1100);
            setTimeout(function () {
                t.pause();
                console.log("paused");
            }, 2200);
            setTimeout(function () {
                t.pause();
                console.log("unpaused");
            }, 5500);
            setTimeout(function () {
                t.pause();
                console.log("paused");
            }, 8800);
            setTimeout(function () {
                t.pause();
                console.log("unpaused");
            }, 13300);
            setTimeout(function () {
                console.log(t.roundFromStart(), t.timeFromStart());

                t.stopTimeLine();
            }, 14400);

        } else {
            console.error("no core here, core:", core);
        }
    }

})();