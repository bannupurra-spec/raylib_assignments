const r = require("raylib");

const windowWidth = 800;
const windowHeight = 500;

const firstParticleX = 200;
const firstParticleWidth = 60;
const secondParticleX = 500;
const secondParticleWidth = 30;
const particleColor = r.BLUE;

let firstScannerX = 0;
let firstScannerColor;
let secondScannerX = windowWidth / 2;
let secondScannerColor;
const scannerWidth = 50;

const yCoordinate = 0;

const forward = 1;
const backward = -1;

let firstScannerDirection = forward;
let secondScannerDirection = forward;

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.InitWindow(windowWidth, windowHeight, "Scanning for particles");
    r.SetTargetFPS(100);
}


function hasParticleDetected(xPosition, scannerWidth, particleX, particleWidth) {
    if ((((xPosition + scannerWidth) >= particleX) && ((xPosition + scannerWidth) <= (particleX + particleWidth)))
        ||
        ((xPosition >= particleX) && (xPosition <= (particleX + particleWidth))))
        return true;

    if (scannerWidth > particleWidth) {
        if ((((particleX + particleWidth) >= xPosition) && ((particleX + particleWidth) <= (scannerWidth + xPosition)))
            ||
            ((particleX >= xPosition) && (particleX <= (xPosition + scannerWidth))))
            return true;
    }

    return false;

}

function firstDirection() {
    if ((firstScannerX + scannerWidth) === windowWidth / 2)
        firstScannerDirection = backward;
    if (firstScannerX === 0)
        firstScannerDirection = forward;
}

function secondDirection() {
    if ((secondScannerX + scannerWidth) === windowWidth)
        secondScannerDirection = backward;
    if (secondScannerX === windowWidth / 2)
        secondScannerDirection = forward;
}

function scannerMovement(scannerX, speed, direction) {
    let movement;

    if (direction === forward)
        movement = scannerX + speed;
    if (direction === backward)
        movement = scannerX - speed;

    return movement;
}


function changeScannerColor(xPosition, scannerWidth, particleX, particleWidth) {
    const particleDetected = hasParticleDetected(xPosition, scannerWidth, particleX, particleWidth);

    if (particleDetected)
        return r.RED;
    else
        return r.WHITE;
}

function update() {
    const firstScannerSpeed = 1;
    const secondScannerSpeed = 5;

    firstScannerX = scannerMovement(firstScannerX, firstScannerSpeed, firstScannerDirection);
    firstScannerColor = changeScannerColor(firstScannerX, scannerWidth, firstParticleX, firstParticleWidth);
    firstDirection();

    secondScannerX = scannerMovement(secondScannerX, secondScannerSpeed, secondScannerDirection);
    secondScannerColor = changeScannerColor(secondScannerX, scannerWidth, secondParticleX, secondParticleWidth);
    secondDirection();

}

function draw() {
    r.BeginDrawing();

    r.ClearBackground(r.BLACK);

    r.DrawRectangle(secondParticleX, yCoordinate, secondParticleWidth, windowHeight, particleColor)
    r.DrawRectangle(firstParticleX, yCoordinate, firstParticleWidth, windowHeight, particleColor);
    r.DrawRectangle(firstScannerX, yCoordinate, scannerWidth, windowHeight, firstScannerColor);
    r.DrawRectangle(secondScannerX, yCoordinate, scannerWidth, windowHeight, secondScannerColor);

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