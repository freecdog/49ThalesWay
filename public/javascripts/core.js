/**
 * Created by jaric on 02.08.2016.
 */

(function(window){

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

    function generateId(){
        //var generation = new generation();
        generation.idCounter = generation.idCounter | 0;
        var ans = generation.idCounter;
        generation.idCounter++;
        return ans;
    }
    core.generateId = generateId;

    function Person(){
        var self = this;

        self.expirience = 0;
        self.healthPoints = 1;
        self.level = 1;

        function levelUp(){
            self.level += 1;
        }
        self.levelUp = levelUp;

        self.farms = [];
        function grabFarm(farm){
            self.farms.push(farm);
            farm.changeOwner(self);
        }

        return this;
    }
    core.Person = Person;

    function Farm(){
        var self = this;
        self.id = core.generateId();

        var options = {};
        self.options = options;
        options.period = 1000;     // ms
        options.resourceType = 1;
        options.resourceAmmount = 1;
        options.startTime = 0;
        options.finishTime = 0;
        options.owner = null;

        function changeOwner(newOwner){
            options.owner = newOwner;
        }
        self.changeOwner = changeOwner;
    }
    core.Farm = Farm;

    function TimeLine(){
        var self = this;

        var options = {};
        self.options = options;

        options.active = true;

        options.paused = false;
        options.pauses = [];

        options.startTime = Date.now();
        options.round = 1000;       // ms

        var currentTime = function(){return Date.now()};
        self.currentTime = currentTime;

        var timeFromStart = function(){
            var ans = 0;
            for (var i = 0; i < options.pauses.length; i++){
                if (i%2 == 1) ans -= (options.pauses[i] - options.pauses[i-1]);
            }
            ans += currentTime() - options.startTime;
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
    }
    core.TimeLine = TimeLine;

})(window);