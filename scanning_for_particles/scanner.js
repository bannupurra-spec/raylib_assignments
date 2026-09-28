function isOverlapping(xPosition, scannerWidth, particleX, particleWidth) {
  return (
    xPosition + scannerWidth >= particleX &&
    xPosition <= particleX + particleWidth
  );
}

function hasParticleDetected(
  xPosition,
  scannerWidth,
  particleX,
  particleWidth,
) {
  return isOverlap(xPosition, scannerWidth, particleX, particleWidth)
    ? true
    : false;
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

function changeScannerColor(xPosition, scannerWidth, particleX, particleWidth) {
  const particleDetected = hasParticleDetected(
    xPosition,
    scannerWidth,
    particleX,
    particleWidth,
  );
  return particleDetected ? r.RED : r.WHITE;
}

module.exports = {
  isOverlapping,
  hasParticleDetected,
  direction,
  scannerMovement,
  changeScannerColor,
};
