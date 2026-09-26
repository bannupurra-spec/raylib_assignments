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
        xPosition = xPosition + speed
    if (direction === -1)
        xPosition = xPosition - speed
    changeDirection();
}

let direction = 1

function changeDirection() {
    if (xPosition === windowWidth - rectWidth)
        direction = -1;
    if (xPosition === 0)
        direction = 1;
}

let xPosition = 0;
const yPosition = 0;
const rectWidth = 50;
const rectHeight = windowHeight


function draw() {
    r.BeginDrawing()
    r.ClearBackground(r.BLACK)
    r.DrawRectangle(xPosition, yPosition, rectWidth, rectHeight, r.WHITE)
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