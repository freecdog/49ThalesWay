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
        var root, previous_Farm;

        root = this;
        if (root != null) {
            previous_Farm = root.Farm;
        }

        var core;
        function Farm(newOptions) {
            if (core === undefined) {
                core = require('core');
                console.log("Farm, core is here", core.version);
            }

            var self = this;
            self.id = core.Generation.generateId(self);

            var options = {};
            self.options = options;
            options.period = 1000;     // ms
            options.resourceType = 1;
            options.resourceAmount = 1;
            options.startTime = 0;
            options.finishTime = 0;
            options.owner = null;

            _.extend(options, newOptions);

            function changeOwner(newOwner) {
                options.owner = newOwner;
            }

            self.changeOwner = changeOwner;
        }

        console.log("Farm class loaded");

        // Node.js
        if (typeof module !== 'undefined' && module.exports) {
            module.exports = Farm;
        }
        // AMD / RequireJS
        else if (typeof define !== 'undefined' && define.amd) {
            define([], function () {
                return Farm;
            });
        }
        // included directly via <script> tag
        else {
            root.Farm = Farm;
        }

    })();

});