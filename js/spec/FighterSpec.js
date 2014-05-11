describe("Player", function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100;

    var physics;
    var targetFinder;
    var fighter;

    beforeEach(function () {
        physics = jasmine.createSpyObj('physicsBody', ['accelerate']);
        targetFinder = jasmine.createSpyObj('targetFinder', ['getTargetPosition']);
        fighter = nanites.fighter({physics: physics, targetFinder: targetFinder});
    });

    it("shouldMoveCloserToTarget", function (done) {
        physics.state = { pos: Physics.vector(0, 0) };
        targetFinder.getTargetPosition.and.returnValue(Physics.vector(10, 10));

        physics.accelerate.and.callFake(function(vector) {
            expect(vector.x).toBeGreaterThan(0);
            expect(vector.y).toBeGreaterThan(0);
            done();
        });

        fighter.update();
    });

});
