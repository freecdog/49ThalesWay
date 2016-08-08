/**
 * Created by jaric on 07.08.2016.
 */

requirejs.config({
    paths: {
        _: 'underscore',
        core: 'core',
        Generation: 'Generation',

        Person: 'Person',
        Farm: 'Farm',
        TimeLine: 'TimeLine',
        Event: 'Event',
        House: 'House',

        Test: 'Test'
    }
    ,
    shim: {
        'core': {
            deps: ['_']
        }
        //,
        //'j47controllers': {
        //    deps: ['j47app']
        //}
    }
});

requirejs(['core'], function(core) {
    console.log("require and angular bootstrap are here, core.version:", core.version);

    // init angular application (instead of ng-app directive in view)
    //angular.element(document).ready(function() {
    //    angular.bootstrap(document, [j47app.name]);
    //});

});