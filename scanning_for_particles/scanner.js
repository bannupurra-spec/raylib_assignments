const sk = require("./sketch.js");
const r = require("raylib");

function createWindow(width, height) {
  return {
    width,
    height,
  };
}
function createParticle(x, y, width, height, color) {
  return {
    x,
    y,
    width,
    height,
    color,
  };
}
function createScanner(
  width,
  height,
  x,
  y,
  upperBound,
  lowerBound,
  direction,
  speed,
  color,
) {
  return {
    width,
    height,
    x,
    y,
    upperBound,
    lowerBound,
    direction,
    speed,
    color,
  };
}

function isOverlapping(scannerX, scannerWidth, particleX, particleWidth) {
  return (
    scannerX + scannerWidth >= particleX &&
    scannerX <= particleX + particleWidth
  );
}

function changeScannerColor(xPosition, scannerWidth, particleX, particleWidth) {
  return isOverlapping(xPosition, scannerWidth, particleX, particleWidth);
}

function direction(
  scannerStart,
  scannerEnd,
  upperBound,
  lowerBound,
  direction,
) {
  return scannerEnd > lowerBound || scannerStart < upperBound
    ? -direction
    : direction;
}

function scannerMovement(scannerX, speed, direction) {
  speed = direction === -1 ? -speed : speed;
  return scannerX + speed;
}

function horizontalScanner(scanner, particle) {
  scanner.direction = direction(
    scanner.y,
    scanner.y + scanner.height,
    scanner.upperBound,
    scanner.lowerBound,
    scanner.direction,
  );
  scanner.y = scannerMovement(scanner.y, scanner.speed, scanner.direction);
  scanner.color = changeScannerColor(
    scanner.y,
    scanner.height,
    particle.y,
    particle.height,
  )
    ? r.RED
    : r.WHITE;
}

function verticalScanner(scanner, particle1, particle2) {
  scanner.direction = direction(
    scanner.x,
    scanner.x + scanner.width,
    scanner.upperBound,
    scanner.lowerBound,
    scanner.direction,
  );
  scanner.x = scannerMovement(scanner.x, scanner.speed, scanner.direction);
  scanner.color =
    changeScannerColor(
      scanner.x,
      scanner.width,
      particle1.x,
      particle1.width,
    ) ||
    changeScannerColor(scanner.x, scanner.width, particle2.x, particle2.width)
      ? r.RED
      : r.WHITE;
}

function draw(particleOrScanner) {
  r.DrawRectangle(
    particleOrScanner.x,
    particleOrScanner.y,
    particleOrScanner.width,
    particleOrScanner.height,
    particleOrScanner.color,
  );
}

module.exports = {
  createWindow,
  createScanner,
  isOverlapping,
  direction,
  scannerMovement,
  createParticle,
  horizontalScanner,
  verticalScanner,
  draw,
};
