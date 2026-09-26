const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

const windowWidth = 800;
const windowHeight = 500;

function setup() {
    r.InitWindow(windowWidth, windowHeight, "Scanning for particles")
    r.SetTargetFPS(100)
}



function update() {
    let speed = 1
    if (direction === 1)
        scannerXaxis = scannerXaxis + speed
    if (direction === -1)
        scannerXaxis = scannerXaxis - speed
    changeDirection();
}

let direction = 1

function changeDirection() {
    if (scannerXaxis === windowWidth - scannerWidth)
        direction = -1;
    if (scannerXaxis === 0)
        direction = 1;
}

let scannerXaxis = 0;
const scannerYaxis = 0;
const scannerWidth = 50;

const particleXaxis = 100;
const particleWidth = 100;


function draw() {
    r.BeginDrawing()
    r.ClearBackground(r.BLACK)
    r.DrawRectangle(particleXaxis, scannerYaxis, particleWidth, windowHeight, r.BLUE)
    r.DrawRectangle(scannerXaxis, scannerYaxis, scannerWidth, windowHeight, r.WHITE)
    update();
    r.EndDrawing()
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