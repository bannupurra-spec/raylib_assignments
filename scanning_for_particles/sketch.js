const r = require("raylib");
const s = require("./scanner.js");

function running() {
  return !r.WindowShouldClose();
}

function setup() {
  const window = s.createWindow(800, 500);
  r.InitWindow(window.width, window.height, "Scanning for particles");
  r.SetTargetFPS(100);
  const s1 = s.createScanner(
    50,
    window.height,
    0,
    0,
    0,
    window.width / 2,
    1,
    1,
    r.WHITE,
  );

  const s2 = s.createScanner(
    50,
    window.height,
    window.width / 2,
    0,
    window.width / 2,
    window.width,
    1,
    2,
    r.WHITE,
  );
  const s3 = s.createScanner(
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

  const p1 = s.createParticle(300, 0, 150, window.height, r.SKYBLUE);
  const p2 = s.createParticle(550, 0, 40, window.height, r.SKYBLUE);
  const p3 = s.createParticle(0, 200, window.width, 50, r.SKYBLUE);

  return { s1, s2, s3, p1, p2, p3 };
}

function update(data) {
  s.verticalScanner(data.s1, data.p1, data.p2);
  s.verticalScanner(data.s2, data.p1, data.p2);
  s.horizontalScanner(data.s3, data.p3);
}

function draw(data) {
  r.BeginDrawing();
  r.ClearBackground(r.BLACK);
  s.draw(data.p1);
  s.draw(data.p2);
  s.draw(data.p3);
  s.draw(data.s1);
  s.draw(data.s2);
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
