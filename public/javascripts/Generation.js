/**
 * Created by jaric on 08.08.2016.
 */

if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function (require, exports, module) {

    (function(){
        "use strict";

        // global on the server, window in the browser
        var root, previous_Generation;

        root = this;
        if (root != null) {
            previous_Generation = root.Generation;
        }

        var core;
        var generation = (function () {
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
        var Generation = generation;

        function generateId(obj) {
            if (core === undefined) {
                core = require('core');
                console.log("Generation, core is here", core.version);
            }

            //var generation = new generation();
            generation.idCounter = generation.idCounter | 0;
            var ans = generation.idCounter;

            if (obj instanceof core.Person) {
                core.persons.push(obj);
                console.log(core.persons);
            } else if (obj instanceof core.Farm) {
                core.farms.push(obj);
                console.log(core.farms);
            } else if (obj instanceof core.TimeLine) {
                core.timeLines.push(obj);
                console.log(core.timeLines);
            } else if (obj instanceof core.Event) {
                core.events.push(obj);
                console.log(core.events);
            } else if (obj instanceof core.House) {
                core.houses.push(obj);
                console.log(core.houses);
            } else {
                console.warn("unknown object type:", obj);
            }

            generation.idCounter++;
            return ans;
        }
        generation.generateId = generateId;

        console.log("Generation loaded");

        // Node.js
        if (typeof module !== 'undefined' && module.exports) {
            module.exports = Generation;
        }
        // AMD / RequireJS
        else if (typeof define !== 'undefined' && define.amd) {
            define([], function () {
                return Generation;
            });
        }
        // included directly via <script> tag
        else {
            root.Generation = Generation;
        }

    })();

});
