/**
 * Created by jaric on 02.08.2016.
 */

if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(function (require, exports, module) {

    (function () {

        "use strict";

        var core = (function () {
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

        // global on the server, window in the browser
        var root, previous_core;

        root = this;
        if (root != null) {
            previous_core = root.core;
        }

        core.Generation = require("Generation");

        core.Person = require("Person");
        core.Farm = require("Farm");
        core.TimeLine = require("TimeLine");
        core.Event = require("Event");
        core.House = require("House");

        core.Test = require("Test");

        core.version = "0.0.1";

        core.persons = [];
        core.farms = [];
        core.timeLines = [];
        core.events = [];
        core.houses = [];

        function FoodFarm(newOptions) {
            var foodFarmOptions = {
                resourceType: 2,
                resourceAmount: 1
            };
            var farm = new Farm(foodFarmOptions);
            return farm;
        }
        core.FoodFarm = FoodFarm;

        //core.options = JSON.parse(getCookies().options);
        //console.warn(core.options);


        // #TODO move cookies to class or smth
        // cookies parse http://stackoverflow.com/a/4004010
        if (typeof String.prototype.trimLeft !== "function") {
            String.prototype.trimLeft = function () {
                return this.replace(/^\s+/, "");
            };
        }
        if (typeof String.prototype.trimRight !== "function") {
            String.prototype.trimRight = function () {
                return this.replace(/\s+$/, "");
            };
        }
        if (typeof Array.prototype.map !== "function") {
            Array.prototype.map = function (callback, thisArg) {
                for (var i = 0, n = this.length, a = []; i < n; i++) {
                    if (i in this) a[i] = callback.call(thisArg, this[i]);
                }
                return a;
            };
        }
        function getCookies() {
            var c = document.cookie, v = 0, cookies = {};
            if (document.cookie.match(/^\s*\$Version=(?:"1"|1);\s*(.*)/)) {
                c = RegExp.$1;
                v = 1;
            }
            if (v === 0) {
                c.split(/[,;]/).map(function (cookie) {
                    var parts = cookie.split(/=/, 2),
                        name = decodeURIComponent(parts[0].trimLeft()),
                        value = parts.length > 1 ? decodeURIComponent(parts[1].trimRight()) : null;
                    cookies[name] = value;
                });
            } else {
                c.match(/(?:^|\s+)([!#$%&'*+\-.0-9A-Z^`a-z|~]+)=([!#$%&'*+\-.0-9A-Z^`a-z|~]*|"(?:[\x20-\x7E\x80\xFF]|\\[\x00-\x7F])*")(?=\s*[,;]|$)/g).map(function ($0, $1) {
                    var name = $0,
                        value = $1.charAt(0) === '"'
                            ? $1.substr(1, -1).replace(/\\(.)/g, "$1")
                            : $1;
                    cookies[name] = value;
                });
            }
            return cookies;
        }

        function getCookie(name) {
            return getCookies()[name];
        }

        console.log("core loaded");

        // Node.js
        if (typeof module !== 'undefined' && module.exports) {
            module.exports = core;
        }
        // AMD / RequireJS
        else if (typeof define !== 'undefined' && define.amd) {
            define([], function () {
                return core;
            });
        }
        // included directly via <script> tag
        else {
            root.core = core;
        }

    })();

});