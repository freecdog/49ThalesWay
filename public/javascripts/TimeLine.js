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
        var root, previous_TimeLine;

        root = this;
        if (root != null) {
            previous_TimeLine = root.TimeLine;
        }

        var core;
        function TimeLine(newOptions){
            if (core === undefined) {
                core = require('core');
                console.log("TimeLine, core is here", core.version);
            }

            var self = this;
            self.id = core.Generation.generateId(self);

            var options = {};
            self.options = options;

            options.active = true;

            options.paused = false;
            options.pauses = [];

            options.startTime = Date.now();
            options.round = 1000;       // ms

            _.extend(options, newOptions);

            var currentTime = function () {
                return Date.now()
            };
            self.currentTime = currentTime;

            var timeFromStart = function () {
                var ans = 0;
                for (var i = 0; i < options.pauses.length; i++) {
                    if (i % 2 == 1) ans -= (options.pauses[i] - options.pauses[i - 1]);
                }
                if (options.paused) ans += options.pauses[options.pauses.length - 1] - options.startTime;
                else ans += currentTime() - options.startTime;
                return ans;
            };
            self.timeFromStart = timeFromStart;

            var roundFromStart = function () {
                return Math.floor(timeFromStart() / options.round)
            };
            self.roundFromStart = roundFromStart;
            self.currentRound = roundFromStart;

            var pauseTimeLine = function () {
                options.paused = !options.paused;
                options.pauses.push(currentTime());
            };
            self.pauseTimeLine = pauseTimeLine;
            self.pause = pauseTimeLine;

            var stopTimeLine = function () {
                options.active = false;
                options.finishTime = currentTime();

                for (var i = 0; i < events.length; i++) {
                    var currentEvent = events[i];
                    if (currentEvent.options.active) {
                        finishEvent(currentEvent);
                    }
                }

                // stop timer
                clearInterval(self.timer);
            };
            self.stopTimeLine = stopTimeLine;

            var events = [];
            self.events = events;

            function startEvent() {
                var event = new Event();
                self.events.push(event);

                event.options.timeLine = self;
                event.options.startTime = timeFromStart();

                return event;
            }

            self.startEvent = startEvent;

            function finishEvent(event) {
                //var event = _.find(events, function(obj) { return obj.id == id });

                event.options.active = false;
                event.options.finishTime = timeFromStart();
            }

            self.finishEvent = finishEvent;

            function doRoutines() {
                if (self.options.active) {
                    var round = roundFromStart();
                    console.log("round:", round);
                } else {
                    //console.log();
                }
            }

            var timer = setInterval(doRoutines, options.round);
            self.timer = timer;
        }

        console.log("TimeLine class loaded");

        // Node.js
        if (typeof module !== 'undefined' && module.exports) {
            module.exports = TimeLine;
        }
        // AMD / RequireJS
        else if (typeof define !== 'undefined' && define.amd) {
            define([], function () {
                return TimeLine;
            });
        }
        // included directly via <script> tag
        else {
            root.TimeLine = TimeLine;
        }

    })();

});