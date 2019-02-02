var canvas, ctx, w, h, zoom, world, ballBody, bottomPlaneBody, PlaneBody, platforms = [];
var ballRadius = 0.5,
        gameWidth = 10,
        gameHeight = 8;

// Initialize and render.
init();
resetGame();
requestAnimationFrame(animate);

// Initialize canvas, physics and input events
function init() {

    // Init canvas element and add it to the DOM
    canvas = document.createElement("CANVAS");
    w = canvas.width = window.innerWidth * window.devicePixelRatio;
    h = canvas.height = window.innerHeight * window.devicePixelRatio;
    document.body.appendChild(canvas);
    ctx = canvas.getContext("2d");
    ctx.lineWidth = 0.05;
    ctx.fillStyle = "lightblue";

    // Create a physics world
    world = new p2.World();

    // Turn off friction and set bounciness
    world.defaultContactMaterial.friction = 0;
    world.defaultContactMaterial.restitution = 0.5;

    // Materials
    // *************NOTE TO SELF CHANGE THE COLOR************
    var groundMaterial = new p2.Material();

    // Create a physics body for the ball
    ballBody = new p2.Body({
        mass: 1,
        position: [0, -2]
    });
    ballBody.addShape(new p2.Circle({
        radius: ballRadius
    }));
    world.addBody(ballBody);

    // Add physics planes on the sides
    bottomPlaneBody = createPlane([0, -gameHeight / 2], 0);
    createPlane([0, gameHeight / 2 + ballRadius * 2], Math.PI); // Top
    createPlane([-gameWidth / 2, 0], -Math.PI / 2); // Left
    createPlane([gameWidth / 2, 0], Math.PI / 2); // Right

    // Add a ground plane
    planeShape = new p2.Plane({
        material: groundMaterial
    });
    planeBody = new p2.Body({
        position: [0, -1]
    });
    planeBody.addShape(planeShape);
    world.addBody(planeBody);

    // Add platforms
    var platformPositions = [
        [2, 0],
        [0, 1],
        [-2, 2]
    ];
    for (var i = 0; i < platformPositions.length; i++) {
        var platformBody = new p2.Body({
            mass: 0,
            // Static
            position: platformPositions[i],
            type: p2.Body.KINEMATIC
        });
        var platformShape = new p2.Box({
            width: 1,
            height: 0.3,
            material: groundMaterial
        });
        platformBody.addShape(platformShape);
        world.addBody(platformBody);
        platforms.push(platformBody);
    }

    // Transform the canvas
    // Note that we need to flip the y axis since Canvas pixel coordinates
    // goes from top to bottom, while physics does the opposite.
    ctx.save();
    ctx.translate(w / 2, h / 2); // Translate to the center
    zoom = w < h ? w / gameWidth : h / gameHeight;
    ctx.scale(zoom, -zoom); // Zoom in and flip y axis

    // Add mouse event listeners
    canvas.addEventListener('mousedown', onKeyDown);
    canvas.addEventListener('touchstart', onKeyDown);
}

var inputType;

function onKeyDown(event) {
    if (inputType && event.type !== inputType) {
        return;
    }
    inputType = event.type;
    // Convert the canvas coordinate to physics coordinates
    var position = getPhysicsCoord(event);
    // Check if the mouse clicked the ball body using hitTest
    var didHitBall = world.hitTest(position, [ballBody]).length !== 0;
    if (didHitBall) {
        var count = world.gravity[1] === 0 ? 0 : parseInt(counter.innerHTML) + 1;
        counter.innerHTML = count;
        // Apply an impulse on the ball
        var applyPoint = [0, 0];
        var dx = ballBody.position[0] - position[0];
        var dy = 2;
        var len = Math.sqrt(dx * dx + dy * dy);
        var impulseSize = 15 + count / 3;
        var impulse = [
            dx / len * impulseSize, dy / len * impulseSize];
        ballBody.applyImpulse(impulse, applyPoint);
        // Increase difficulty by increasing gravity!
        world.gravity[1] = -10 - count;
    }
}

// Sets gravity to zero and the ball in initial position
function resetGame() {
    world.gravity[0] = world.gravity[1] = 0;
    ballBody.position[0] = 0;
    ballBody.position[1] = -2;
    ballBody.velocity[0] = ballBody.velocity[1] = 0;
}

// Convert a canvas coordiante to physics coordinate
function getPhysicsCoord(mouseEvent) {
    var rect = canvas.getBoundingClientRect();
    var clientX = mouseEvent.touches ? mouseEvent.touches[0].clientX : mouseEvent.clientX;
    var clientY = mouseEvent.touches ? mouseEvent.touches[0].clientY : mouseEvent.clientY;
    var x = (clientX - rect.left) * window.devicePixelRatio;
    var y = (clientY - rect.top) * window.devicePixelRatio;
    x = (x - w / 2) / zoom;
    y = -(y - h / 2) / zoom;
    return [x, y];
}

// Creates a physics plane at a given position
function createPlane(position, angle) {
    var planeBody = new p2.Body({
        position: position,
        angle: angle
    });
    planeBody.addShape(new p2.Plane());
    world.addBody(planeBody);
    return planeBody;
}

function drawBox(body) {
    ctx.beginPath();
    var x = body.interpolatedPosition[0],
            y = body.interpolatedPosition[1],
            s = body.shapes[0];
    ctx.save();
    ctx.translate(x, y);     // Translate to the center of the box
    ctx.rotate(body.interpolatedAngle);  // Rotate to the box body frame
    ctx.fillRect(-s.width / 2, -s.height / 2, s.width, s.height);
    ctx.restore();
}

// Animation loop
var lastTime;
var maxSubSteps = 5; // Max physics ticks per render frame
var fixedDeltaTime = 1 / 30; // Physics "tick" delta time
function animate(time) {
    requestAnimationFrame(animate);
    // Get the elapsed time since last frame, in seconds
    var deltaTime = lastTime ? (time - lastTime) / 1000 : 0;
    // Make sure the time delta is not too big (can happen if user switches browser tab)
    deltaTime = Math.min(1 / 10, deltaTime);
    // Move physics bodies forward in time
    world.step(fixedDeltaTime, deltaTime, maxSubSteps);
    lastTime = time;
    // Render scene
    render();
}

function drawPlane() {
    var y1 = planeBody.interpolatedPosition[1],
            y0 = -h / zoom / 2,
            x0 = -w / zoom / 2,
            x1 = w / zoom / 2;
    ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
}

function render() {
    // Clear whole drawing area
    ctx.clearRect(0, 0, w, h);
    ctx.clearRect(-gameWidth, -gameHeight, gameWidth * 2, gameHeight * 2);
    //ctx.fillRect(-gameWidth, -gameHeight, gameWidth * 2, gameHeight * 2);
    // Draw the ball
    // We choose to render the interpolated position to get smooth animation.
    ctx.beginPath();
    ctx.fillStyle = "brown";
    ctx.arc(ballBody.interpolatedPosition[0], ballBody.interpolatedPosition[1], ballRadius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    // Draw platforms
    ctx.strokeStyle = '#000'; // ?????????
    ctx.fillStyle = 'lightgreen';
    drawPlane();
    for (var i = 0; i < platforms.length; i++) {
        drawBox(platforms[i]);
    }
    
    // Draw the outer rectangle
    ctx.beginPath();
    ctx.moveTo(-gameWidth / 2, -gameHeight / 2);
    ctx.lineTo(gameWidth / 2, -gameHeight / 2);
    ctx.lineTo(gameWidth / 2, gameHeight / 2);
    ctx.lineTo(-gameWidth / 2, gameHeight / 2);
    ctx.lineTo(-gameWidth / 2, -gameHeight / 2);
    ctx.stroke();
}