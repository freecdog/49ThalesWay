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
        var root, previous_Person;

        root = this;
        if (root != null) {
            previous_Person = root.Person;
        }

        var core;
        function Person(newOptions) {
            if (core === undefined) {
                core = require('core');
                console.log("Person, core are here", core.version);
            }

            var self = this;
            self.id = core.Generation.generateId(self);

            self.expirience = 0;
            self.healthPoints = 1;
            self.level = 1;

            var options = {};
            _.extend(options, newOptions);
            self.options = options;

            function levelUp() {
                self.level += 1;
            }

            self.levelUp = levelUp;

            //self.farms = [];
            function grabFarm(farm) {
                //self.farms.push(farm);
                farm.changeOwner(self);
            }

            self.grabFarm = grabFarm;
        }

        console.log("Person class loaded");

        // Node.js
        if (typeof module !== 'undefined' && module.exports) {
            module.exports = Person;
        }
        // AMD / RequireJS
        else if (typeof define !== 'undefined' && define.amd) {
            define([], function () {
                return Person;
            });
        }
        // included directly via <script> tag
        else {
            root.Person = Person;
        }

    })();

});
