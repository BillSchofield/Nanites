describe("A spawner", function () {
    describe("spawning", function () {
        it("should create spawner if space is available", function () {
            var world = jasmine.createSpyObj("world", ["findOne"]);
            world.findOne.and.returnValue(false);
            var spawner = game.spawner({x: 50, y: 50});

            spyOn(game, "spawner");
            spawner.update();

            expect(game.spawner).toHaveBeenCalledWith({x: 50, y:10});
        });
    });
});