function isOverlapping(xPosition, scannerWidth, particleX, particleWidth) {
  return (
    xPosition + scannerWidth >= particleX &&
    xPosition <= particleX + particleWidth
  );
}

function direction(x, y, start, end, direction) {
  return y > end || start < x ? -direction : direction;
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
