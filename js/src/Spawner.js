var game = game || {};

game.spawner = function(spec) {
    var that = {};

    var x = spec.x;
    var y = spec.y;
    var xVelocity = 0;
    var yVelocity = 0;
    var radius = 20;
    var entity = Physics.body("circle", {x: x, y: y, vx: xVelocity, vy: yVelocity, radius: radius});

    that.update = function(){
        game.spawner({x: 50, y:10})
    };

    return that;
};