/**
 * Created by jaric on 02.08.2016.
 */

(function(window){

    var core = {};

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
    function generateId(){
        //var generation = new generation();
        //generation.idCounter = generation.idCounter | 0;
        var ans = generation.idCounter;
        generation.idCounter++;
        return ans;
    }
    core.generation = generation;
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
    }
    core.Farm = Farm;

    window.core = core;

})(window);