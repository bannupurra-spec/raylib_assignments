const r = require("raylib");
const s = require("./scanner.js");
const s1 = require("./s1.js");
const s2 = require("./s2.js");
const s3 = require("./s3.js");

const windowWidth = 800;
const windowHeight = 500;

const particle1X = 100;
const Particle1Width = 10;

const particle2X = 500;
const particle2Width = 30;

const particle3X = 0;
const particle3Y = 250;
const particle3Height = 20;

const particleColor = r.BLUE;

const scannerWidth = 50;

let xCordinate = windowWidth / 2;
const yCoordinate = 0;

function running() {
  return !r.WindowShouldClose();
}

function setup() {
  r.InitWindow(windowWidth, windowHeight, "Scanning for particles");
  r.SetTargetFPS(100);
}

function changeScannerColor(xPosition, scannerWidth, particleX, particleWidth) {
  return s.isOverlapping(xPosition, scannerWidth, particleX, particleWidth)
    ? r.RED
    : r.WHITE;
}

function update() {
  const scanner1Xpos = 0;
  const scanner1Ypos = s1.xCordinate + scannerWidth;
  const scanner1Start = s1.xCordinate;
  const scanner1End = windowWidth / 2;

  const scanner2Xpos = windowWidth / 2;
  const scanner2Ypos = xCordinate + scannerWidth;
  const scanner2Start = xCordinate;
  const scanner2End = windowWidth;

  const scanner3Xpos = 0;
  const scanner3Ypos = s3.yCordinate + s3.height;
  const scanner3Start = s3.yCordinate;
  const scanner3End = windowHeight;

  s1.direction = s.direction(
    scanner1Xpos,
    scanner1Ypos,
    scanner1Start,
    scanner1End,
    s1.direction,
  );

  s1.xCordinate = s.scannerMovement(s1.xCordinate, s1.speed, s1.direction);

  s1.Color = changeScannerColor(
    s1.xCordinate,
    scannerWidth,
    particle1X,
    Particle1Width,
  );

  s2.direction = s.direction(
    scanner2Xpos,
    scanner2Ypos,
    scanner2Start,
    scanner2End,
    s2.direction,
  );

  xCordinate = s.scannerMovement(xCordinate, s2.speed, s2.direction);

  s2.color = changeScannerColor(
    xCordinate,
    scannerWidth,
    particle2X,
    particle2Width,
  );

  s3.direction = s.direction(
    scanner3Xpos,
    scanner3Ypos,
    scanner3Start,
    scanner3End,
    s3.direction,
  );

  s3.yCordinate = s.scannerMovement(s3.yCordinate, s3.speed, s3.direction);

  s3.color = changeScannerColor(
    s3.yCordinate,
    s3.height,
    particle3Y,
    particle3Height,
  );
}

function draw() {
  r.BeginDrawing();

  r.ClearBackground(r.BLACK);

  r.DrawRectangle(
    particle3X,
    particle3Y,
    windowWidth,
    particle3Height,
    particleColor,
  );

  r.DrawRectangle(
    particle2X,
    yCoordinate,
    particle2Width,
    windowHeight,
    particleColor,
  );
  r.DrawRectangle(
    particle1X,
    yCoordinate,
    Particle1Width,
    windowHeight,
    particleColor,
  );
  r.DrawRectangle(
    s1.xCordinate,
    yCoordinate,
    scannerWidth,
    windowHeight,
    s1.Color,
  );
  r.DrawRectangle(
    xCordinate,
    yCoordinate,
    scannerWidth,
    windowHeight,
    s2.color,
  );

  r.DrawRectangle(
    s3.xCordinate,
    s3.yCordinate,
    windowWidth,
    s3.height,
    s3.color,
  );

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
