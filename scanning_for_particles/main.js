const sketch = require("./sketch");

const window = {
  width: 800,
  height: 500,
  FPS: 50,
  title: "scanning for particles",
};

function loop(data) {
  while (sketch.running()) {
    sketch.update(data);
    sketch.draw(data);
  }
}

function main() {
  const data = sketch.setup(window);
  loop(data);
  sketch.teardown();
}

main();
