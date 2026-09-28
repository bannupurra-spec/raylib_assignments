const r = require("raylib");

const windowWidth = 800;
const windowHeight = 500;

const particle1X = 200;
const Particle1Width = 10;

const particle2X = 500;
const particle2Width = 30;

const particle3X = 0;
const particle3Y = 250;
const particle3Height = 20;
const particleColor = r.BLUE;

let scanner1X = 0;
let scanner1Color;
let scanner1Direction = 1;

let scanner2X = windowWidth / 2;
let scanner2Color;
let scanner2Direction = 1;

const scannerWidth = 50;

const scanner3X = 0;
let scanner3Y = 0;
const scanner3Height = 40;
let scanner3Color = r.WHITE;
let scanner3Direction = 1;

const yCoordinate = 0;



function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.InitWindow(windowWidth, windowHeight, "Scanning for particles");
    r.SetTargetFPS(100);
}

function isOverlap(xPosition, scannerWidth, particleX, particleWidth) {
    return xPosition + scannerWidth >= particleX && xPosition <= particleX + particleWidth;
}

function hasParticleDetected(xPosition, scannerWidth, particleX, particleWidth) {
    return isOverlap(xPosition, scannerWidth, particleX, particleWidth) ? true : false;
}


function direction(x, y, start, end, direction) {

    direction = y === end ? -1 : direction;
    direction = start === x ? 1 : direction;
    return direction;

}

function scannerMovement(scannerX, speed, direction) {
    speed = direction === - 1 ? -speed : speed;
    return scannerX + speed;
}


function changeScannerColor(xPosition, scannerWidth, particleX, particleWidth) {
    const particleDetected = hasParticleDetected(xPosition, scannerWidth, particleX, particleWidth);
    return particleDetected ? r.RED : r.WHITE;
}

function update() {
    const firstScannerSpeed = 1;
    const secondScannerSpeed = 5;

    scanner1X = scannerMovement(scanner1X, firstScannerSpeed, scanner1Direction);
    scanner1Color = changeScannerColor(scanner1X, scannerWidth, particle1X, Particle1Width);
    scanner1Direction = direction(0, scanner1X + scannerWidth, scanner1X, windowWidth / 2, scanner1Direction);

    scanner2X = scannerMovement(scanner2X, secondScannerSpeed, scanner2Direction);
    scanner2Color = changeScannerColor(scanner2X, scannerWidth, particle2X, particle2Width);
    scanner2Direction = direction(windowWidth / 2, scanner2X + scannerWidth, scanner2X, windowWidth, scanner2Direction);

    scanner3Y = scannerMovement(scanner3Y, 1, scanner3Direction);
    scanner3Color = changeScannerColor(scanner3Y, scanner3Height, particle3Y, particle3Height);
    scanner3Direction = direction(0, scanner3Y + scanner3Height, scanner3Y, windowHeight, scanner3Direction);
}

function draw() {
    r.BeginDrawing();

    r.ClearBackground(r.BLACK);

    r.DrawRectangle(particle3X, particle3Y, windowWidth, particle3Height, particleColor)

    r.DrawRectangle(particle2X, yCoordinate, particle2Width, windowHeight, particleColor)
    r.DrawRectangle(particle1X, yCoordinate, Particle1Width, windowHeight, particleColor);
    r.DrawRectangle(scanner1X, yCoordinate, scannerWidth, windowHeight, scanner1Color);
    r.DrawRectangle(scanner2X, yCoordinate, scannerWidth, windowHeight, scanner2Color);

    r.DrawRectangle(scanner3X, scanner3Y, windowWidth, scanner3Height, scanner3Color);

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