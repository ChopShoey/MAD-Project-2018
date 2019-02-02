(function() {
    var canvasElem = document.getElementById('cats');
    var world = boxbox.createWorld(canvasElem, {
        debugDraw: false
    });

    cat = world.createEntity({
        name: 'cat',
        shape: 'circle',
        radius: 1,
        //image: "image here.",
        //imageStretchToFit: true,
        x: 2,
        density: 4,
        onKeyDown: function(e) {
            this.applyImpulse(200, 60);
        },
    });
    
    var groundTemplate = {
        name: 'ground',
        type: 'static',
        height: .2,
        color: 'green',
    };
    var wallTemplate = {
        name: 'wall',
        type: 'static',
        height: 20,
        width: .2,
        color: 'green',
    };

    world.createEntity(groundTemplate, {
        width: 20,
        x: 10,
        y: 10
    });
    world.createEntity(wallTemplate, {
        x: 1,
        y: 10
    });
    world.createEntity(wallTemplate, {
        x: 20,
        y: 10
    });

    var block = {
        nme: 'block',
        shape: 'square',
        color: 'brown',
        width: .5,
        height: 4,
        onImpact: function(entity, force) {
            if (entity.name() == "cat") {
                this.color("blue");
            }
        }

    };

    world.createEntity(block, {
        x: 15
    });
    world.createEntity(block, {
        x: 17
    });
    world.createEntity(block, {
        x: 16,
        y: 1,
        width: 4,
        height: .5
    });
    world.createEntity(block, {
        x: 16,
        y: 1,
        width: .5,
        height: .5
    });
        world.createEntity(block, {
        x: 16,
        y: -1,
        width: .5,
        height: .5
    });
        world.createEntity(block, {
        x: 14,
        y: 1,
        width: .6,
        height: .5
    });
        world.createEntity(block, {
        x: 16,
        y: -3,
        width: 5,
        height: .5
    });
        world.createEntity(block, {
        x: 18,
        y: 1,
        width: .3,
        height: .5
    });
    world.createEntity(block);

})();