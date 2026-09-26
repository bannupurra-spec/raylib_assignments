const r = require("raylib");

let scannerX = 0;
const scannerY = 0;
const scannerWidth = 50;
let scannerColor;

const firstParticleX = 400;
const firstParticleWidth = 30;
const secondParticleX = 100;
const secondParticleWidth = 50;
const particleColor = r.BLUE;

const windowWidth = 800;
const windowHeight = 500;

const forward = 1;
const backward = -1;

let direction = forward;

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.InitWindow(windowWidth, windowHeight, "Scanning for particles");
    r.SetTargetFPS(100);
}

function scannerMovement(speed) {
    let movement;

    if (direction === forward)
        movement = scannerX + speed;
    if (direction === backward)
        movement = scannerX - speed;

    return movement;
}

function hasParticleDetected(particleX, particleWidth) {
    if ((((scannerX + scannerWidth) >= particleX) && ((scannerX + scannerWidth) <= (particleX + particleWidth)))
        ||
        ((scannerX >= particleX) && (scannerX <= (particleX + particleWidth))))
        return true;

    if (scannerWidth > particleWidth) {
        if ((((particleX + particleWidth) >= scannerX) && ((particleX + particleWidth) <= (scannerWidth + scannerX)))
            ||
            ((particleX >= scannerX) && (particleX <= (scannerX + scannerWidth))))
            return true;
    }

    return false;

}

function changeDirection() {
    if (scannerX === (windowWidth - scannerWidth))
        direction = backward;
    if (scannerX === 0)
        direction = forward;
}

// function 

function update() {
    let speed = 1;

    const particleDetected = hasParticleDetected(firstParticleX, firstParticleWidth) || hasParticleDetected(secondParticleX, secondParticleWidth);

    if (particleDetected)
        scannerColor = r.RED;
    else
        scannerColor = r.WHITE;

    scannerX = scannerMovement(speed);
    changeDirection();
}

function draw() {
    r.BeginDrawing();

    r.ClearBackground(r.BLACK);

    r.DrawRectangle(secondParticleX, scannerY, secondParticleWidth, windowHeight, particleColor)
    r.DrawRectangle(firstParticleX, scannerY, firstParticleWidth, windowHeight, particleColor);
    r.DrawRectangle(scannerX, scannerY, scannerWidth, windowHeight, scannerColor);

    r.EndDrawing();
}

function teardown() {
    r.CloseWindow();
}

module.exports = {
    running,
    setup,
    update,
    draw,
    teardown,
};