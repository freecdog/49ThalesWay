/**
 * Created by jaric on 02.08.2016.
 */

(function(window){

    "use strict";

    var core = (function () {
        // https://github.com/podgorniy/javascript-toolbox/blob/master/singletone.js
        var instance = {};

        return function Construct_singletone () {
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
    window.core = core;

    core.version = "0.0.1";

    core.persons = [];
    core.farms = [];
    core.timeLines = [];
    core.events = [];

    var generation = (function () {
        // https://github.com/podgorniy/javascript-toolbox/blob/master/singletone.js
        var instance = {};

        return function Construct_singletone () {
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
    core.generation = generation;

    function generateId(obj){
        //var generation = new generation();
        generation.idCounter = generation.idCounter | 0;
        var ans = generation.idCounter;

        if (obj instanceof core.Person){
            core.persons.push(obj);
            console.log(core.persons);
        } else if (obj instanceof core.Farm){
            core.farms.push(obj);
            console.log(core.farms);
        } else if (obj instanceof core.TimeLine){
            core.timeLines.push(obj);
            console.log(core.timeLines);
        } else if (obj instanceof core.Event){
            core.events.push(obj);
            console.log(core.events);
        } else {
            console.warn("unknown object type:", obj);
        }

        generation.idCounter++;
        return ans;
    }
    core.generateId = generateId;

    function Person(newOptions){
        var self = this;
        self.id = core.generateId(self);

        self.expirience = 0;
        self.healthPoints = 1;
        self.level = 1;

        var options = {};
        _.extend(options, newOptions);
        self.options = options;

        function levelUp(){
            self.level += 1;
        }
        self.levelUp = levelUp;

        //self.farms = [];
        function grabFarm(farm){
            //self.farms.push(farm);
            farm.changeOwner(self);
        }
        self.grabFarm = grabFarm;

        return this;
    }
    core.Person = Person;

    function Farm(newOptions){
        var self = this;
        self.id = core.generateId(self);

        var options = {};
        self.options = options;
        options.period = 1000;     // ms
        options.resourceType = 1;
        options.resourceAmount = 1;
        options.startTime = 0;
        options.finishTime = 0;
        options.owner = null;

        _.extend(options, newOptions);

        function changeOwner(newOwner){
            options.owner = newOwner;
        }
        self.changeOwner = changeOwner;
    }
    core.Farm = Farm;

    function FoodFarm(newOptions){
        var foodFarmOptions = {
            resourceType: 2,
            resourceAmount: 1
        };
        var farm = new Farm(foodFarmOptions);
        return farm;
    }
    core.FoodFarm = FoodFarm;

    function TimeLine(newOptions){
        var self = this;
        self.id = core.generateId(self);

        var options = {};
        self.options = options;

        options.active = true;

        options.paused = false;
        options.pauses = [];

        options.startTime = Date.now();
        options.round = 1000;       // ms

        _.extend(options, newOptions);

        var currentTime = function(){return Date.now()};
        self.currentTime = currentTime;

        var timeFromStart = function(){
            var ans = 0;
            for (var i = 0; i < options.pauses.length; i++){
                if (i%2 == 1) ans -= (options.pauses[i] - options.pauses[i-1]);
            }
            if (options.paused) ans += options.pauses[options.pauses.length-1] - options.startTime;
            else ans += currentTime() - options.startTime;
            return ans;
        };
        self.timeFromStart = timeFromStart;

        var roundFromStart = function(){return Math.floor(timeFromStart() / options.round)};
        self.roundFromStart = roundFromStart;
        self.currentRound = roundFromStart;

        var pauseTimeLine = function(){
            options.paused = !options.paused;
            options.pauses.push(currentTime());
        };
        self.pauseTimeLine = pauseTimeLine;
        self.pause = pauseTimeLine;

        var stopTimeLine = function(){
            options.active = false;
            options.finishTime = currentTime();

            for (var i = 0; i < events.length; i++){
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

        function startEvent(){
            var event = new Event();
            self.events.push(event);

            event.options.timeLine = self;
            event.options.startTime = timeFromStart();

            return event;
        }
        self.startEvent = startEvent;

        function finishEvent(event){
            //var event = _.find(events, function(obj) { return obj.id == id });

            event.options.active = false;
            event.options.finishTime = timeFromStart();
        }
        self.finishEvent = finishEvent;

        function doRoutines(){
            if (self.options.active){
                var round = roundFromStart();
                console.log("round:", round);
            } else {
                //console.log();
            }
        }
        var timer = setInterval(doRoutines, options.round);
        self.timer = timer;
    }
    core.TimeLine = TimeLine;

    function Event(newOptions){
        var self = this;
        self.id = core.generateId(self);

        var options = {
            active: true,
            type: 0
        };
        _.extend(options, newOptions);
        self.options = options;

    }
    core.Event = Event;

})(window);