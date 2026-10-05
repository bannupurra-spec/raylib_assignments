const r = require("raylib");

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

function isOverlapping(
  scannerPosition,
  scannerSize,
  particlePosition,
  particleSize,
) {
  return (
    scannerPosition + scannerSize >= particlePosition &&
    scannerPosition <= particlePosition + particleSize
  );
}

function direction(scannerStart, scannerEnd, scanner) {
  return scannerEnd > scanner.lowerBound || scannerStart < scanner.upperBound
    ? -scanner.direction
    : scanner.direction;
}

function updateScannerMovement(scannerPosition, scanner) {
  scanner.speed = scanner.direction === -1 ? -scanner.speed : scanner.speed;
  return scannerPosition + scanner.speed;
}

function moveHorizontalScanner(scanner, particle1, particle2) {
  scanner.direction = direction(scanner.y, scanner.y + scanner.height, scanner);
  scanner.y = updateScannerMovement(scanner.y, scanner);
  scanner.color =
    isOverlapping(scanner.y, scanner.height, particle1.y, particle1.height) ||
    isOverlapping(scanner.y, scanner.height, particle2.y, particle2.height)
      ? r.RED
      : r.WHITE;
}

function moveVerticalScanner(scanner, particle1, particle2) {
  scanner.direction = direction(scanner.x, scanner.x + scanner.width, scanner);
  scanner.x = updateScannerMovement(scanner.x, scanner);
  scanner.color =
    isOverlapping(scanner.x, scanner.width, particle1.x, particle1.width) ||
    isOverlapping(scanner.x, scanner.width, particle2.x, particle2.width)
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
  createScanner,
  createParticle,
  moveHorizontalScanner,
  moveVerticalScanner,
  draw,
};
