const r = require("raylib");

let scannerX = 0;
const scannerY = 0;
const scannerWidth = 50;
let scannerColor;

const particleX = 400;
const particleWidth = 100;

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

function changeScannerColor() {
    if (((scannerX + scannerWidth) >= particleX) || (scannerX === (particleX + particleWidth)))
        scannerColor = r.RED;

    if (((scannerX + scannerWidth) < particleX) || (scannerX > (particleX + particleWidth)))
        scannerColor = r.WHITE;
}

function changeDirection() {
    if (scannerX === (windowWidth - scannerWidth))
        direction = backward;
    if (scannerX === 0)
        direction = forward;
}

function update() {
    let speed = 1;

    changeScannerColor();
    scannerX = scannerMovement(speed);
    changeDirection();
}

function draw() {
    r.BeginDrawing();

    r.ClearBackground(r.BLACK);

    r.DrawRectangle(particleX, scannerY, particleWidth, windowHeight, r.BLUE);
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