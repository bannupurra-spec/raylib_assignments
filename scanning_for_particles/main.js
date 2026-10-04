const sketch = require("./sketch");

function loop(data) {
  while (sketch.running()) {
    sketch.update(data);
    sketch.draw(data);
  }
}

function main() {
  const data = sketch.setup();
  loop(data);
  sketch.teardown();
}

main();
