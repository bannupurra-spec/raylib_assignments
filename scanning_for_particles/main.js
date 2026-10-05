const sketch = require("./sketch");

function loop(data) {
  while (sketch.running()) {
    sketch.update(data);
    sketch.draw(data);
  }
}

function main() {
  const window = {
    width: 800,
    height: 500,
    FPS: 50,
    title: "scanning for particles",
  };
  const data = sketch.setup(window);
  loop(data);
  sketch.teardown();
}

main();
