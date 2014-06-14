"use strict";

var nanites = nanites || {};

nanites.builder = function(spec) {
    var that = {};

    var unitFactory = spec.builderFactory;
    var body = spec.body;
    var offsets = spec.offsets;
    var world = spec.world;
    var worldBounds = spec.worldBounds;
    var ticksBetweenSpawns = 50;
    var ticksUntilNextSpawn = ticksBetweenSpawns;

    that.updateUnit = function(){
        body.state.vel = Physics.vector(0, 0);
        if (ticksUntilNextSpawn-- < 0){
            var index = nanites.random(0, offsets.length - 1)
            var offset = offsets[index];
            var newPosition = body.state.pos.clone();
            newPosition.vadd(offset);
            var findOne = world.findOne({$at: newPosition});
            if (!findOne && Physics.aabb.contains(worldBounds, newPosition)){
                unitFactory.createUnit(newPosition);
            }
            ticksUntilNextSpawn = ticksBetweenSpawns;
        }
    };

    return that;
};