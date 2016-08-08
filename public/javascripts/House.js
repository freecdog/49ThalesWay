/**
 * Created by jaric on 06.08.2016.
 */

if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function (require, exports, module) {

    (function(){
        "use strict";

        // global on the server, window in the browser
        var root, previous_House;

        root = this;
        if (root != null) {
            previous_House = root.House;
        }

        var core;
        function House(newOptions){
            if (core === undefined) {
                core = require('core');
                console.log("House, core are here", core.version);
            }

            var self = this;
            self.id = core.Generation.generateId(self);

            self.level = Math.floor(Math.random()*20) + 1;  // [1..20]
            console.log("level:", self.level);

            var options = {};
            _.extend(options, newOptions);
            self.options = options;

            function getImgSource(){
                var ans = "/data/house/house";
                ans += self.level < 10 ? "0" : "";
                ans += self.level.toString();
                ans += ".gif";
                return ans;
            }
            self.getImgSource = getImgSource;
            function getMaxAmount(){
                var ans = 0;
                if (type < 9) ans = 12 + 8 * type;
                else if (type == 9) ans = 76;
                else if (type == 10) ans = 80;
                else if (type == 11) ans = 84;
                else if (type == 12) ans = 84;
                else if (type == 13) ans = 40;
                else if (type == 14) ans = 42;
                else if (type == 15) ans = 90;
                else if (type == 16) ans = 100;
                else if (type == 17) ans = 106;
                else if (type == 18) ans = 112;
                else if (type == 19) ans = 190;
                else if (type == 20) ans = 200;
                else ans = 0;
                return ans;
            }
            self.getMaxAmount = getMaxAmount;
        }

        console.log("House class loaded");

        // Node.js
        if (typeof module !== 'undefined' && module.exports) {
            module.exports = House;
        }
        // AMD / RequireJS
        else if (typeof define !== 'undefined' && define.amd) {
            define([], function () {
                return House;
            });
        }
        // included directly via <script> tag
        else {
            root.House = House;
        }

    })();

});
