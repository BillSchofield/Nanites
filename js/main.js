"use strict";

var nanites = nanites || {};

Physics(function(world){

    var viewWidth = 500;
    var viewHeight = 300;

    var renderer = Physics.renderer('canvas', {
        el: "playfield",
        width: viewWidth,
        height: viewHeight,
        meta: false, // don't display meta data
        styles: {
            // set colors for the circle bodies
            'circle' : {
                strokeStyle: 'black',
                lineWidth: 1,
                fillStyle: 'blue',
                angleIndicator: 'blue'
            }
        }
    });

    // add the renderer
    world.add( renderer );

    // render on each step
    world.on('step', function(){
        world.render();
    });

    // bounds of the window
    var viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);

    // constrain objects to these bounds
    world.add(Physics.behavior('edge-collision-detection', {
        aabb: viewportBounds,
        restitution: 0.99,
        cof: 0.99
    }));

    // add a circle
    var circle = Physics.body('circle', {
        x: 50, // x-coordinate
        y: 30, // y-coordinate
        vx: 0.2, // velocity in x-direction
        vy: 0.01, // velocity in y-direction
        radius: 20
    });

    var fighter = nanites.fighter({physics: circle});

    world.add(circle);

    // ensure objects bounce when edge collision is detected
    world.add( Physics.behavior('body-impulse-response') );

    // subscribe to ticker to advance the simulation
    Physics.util.ticker.on(function( time, dt ){
        fighter.update();
        world.step( time );
    });

    // start the ticker
    Physics.util.ticker.start();

});