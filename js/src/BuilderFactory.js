"use strict";

var nanites = nanites || {};

nanites.builderFactory = function(spec) {
    var that = {};

    var world = spec.world;
    var units = spec.units;
    var worldBounds = spec.worldBounds;

    that.createUnit = function(position){
        var spec = {
            x: position.x,
            y: position.y,
            vx: 0,
            vy: 0,
            radius: 20,
            fixed: true
        };
        var circle = Physics.body("circle", spec);
        world.add(circle);

        var baseOffset = 40;
        var spec = {
            builderFactory: that,
            offsets: [
                Physics.vector(baseOffset, -baseOffset),
                Physics.vector(baseOffset, baseOffset),
                Physics.vector(-baseOffset, baseOffset),
                Physics.vector(-baseOffset, -baseOffset)
            ],
            body: circle,
            world: world,
            worldBounds: worldBounds
        };

        var unit = nanites.builder(spec);
        units.push(unit);
        return  unit;
    };

    return that;
};