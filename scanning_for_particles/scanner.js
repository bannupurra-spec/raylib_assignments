function isOverlapping(xPosition, scannerWidth, particleX, particleWidth) {
  return (
    xPosition + scannerWidth >= particleX &&
    xPosition <= particleX + particleWidth
  );
}

function direction(x, y, start, end, direction) {
  direction = y === end ? -1 : direction;
  direction = start === x ? 1 : direction;
  return direction;
}

function scannerMovement(scannerX, speed, direction) {
  speed = direction === -1 ? -speed : speed;
  return scannerX + speed;
}

module.exports = {
  isOverlapping,
  direction,
  scannerMovement,
};
