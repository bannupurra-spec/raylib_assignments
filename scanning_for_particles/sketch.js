const r = require("raylib");
const s = require("./scanner.js");

function running() {
  return !r.WindowShouldClose();
}

function setup(window) {
  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(window.width, window.height, window.title);
  r.SetTargetFPS(window.FPS);

  const data = {};
  data.s1 = s.createScanner(
    50,
    window.height,
    0,
    0,
    0,
    window.width / 2,
    1,
    2,
    r.WHITE,
  );
  data.s2 = s.createScanner(
    50,
    window.height,
    window.width / 2,
    0,
    window.width / 2,
    window.width,
    1,
    4,
    r.WHITE,
  );
  data.s3 = s.createScanner(
    window.width,
    50,
    0,
    0,
    0,
    window.height,
    1,
    1,
    r.WHITE,
  );
  data.s4 = s.createScanner(
    50,
    window.height,
    0,
    0,
    0,
    window.width,
    1,
    2,
    r.BLUE,
  );

  data.p1 = s.createParticle(300, 0, 150, window.height, r.SKYBLUE);
  data.p2 = s.createParticle(550, 0, 40, window.height, r.SKYBLUE);
  data.p3 = s.createParticle(0, 200, window.width, 50, r.SKYBLUE);
  data.p4 = s.createParticle(0, 350, window.width, 50, r.SKYBLUE);

  return data;
}

function update(data) {
  s.moveVerticalScanner(data.s1, data.p1, data.p2);
  s.moveVerticalScanner(data.s2, data.p1, data.p2);
  s.moveVerticalScanner(data.s4, data.p1, data.p2);

  s.moveHorizontalScanner(data.s3, data.p3, data.p4);
}

function draw(data) {
  r.BeginDrawing();
  r.ClearBackground(r.BLACK);

  s.draw(data.p1);
  s.draw(data.p2);
  s.draw(data.p3);
  s.draw(data.p4);

  s.draw(data.s1);
  s.draw(data.s2);
  s.draw(data.s4);
  s.draw(data.s3);

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
