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
        var root, previous_Event;

        root = this;
        if (root != null) {
            previous_Event = root.Event;
        }

        var core;
        function Event(newOptions) {
            if (core === undefined) {
                core = require('core');
                console.log("Event, core are here", core.version);
            }

            var self = this;
            self.id = core.Generation.generateId(self);

            var options = {
                active: true,
                type: 0
            };
            _.extend(options, newOptions);
            self.options = options;

        }

        console.log("Event class loaded");

        // Node.js
        if (typeof module !== 'undefined' && module.exports) {
            module.exports = Event;
        }
        // AMD / RequireJS
        else if (typeof define !== 'undefined' && define.amd) {
            define([], function () {
                return Event;
            });
        }
        // included directly via <script> tag
        else {
            root.Event = Event;
        }

    })();

});
