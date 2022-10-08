title = "GROUND TOUCHER";

description = `
  [Hold] Stretch
Touch the ground
     and dodge!
`;

characters = [ 
  `
 r rr
rrrrrr
 grr
 grr
rrrrrr
r rr
`,
];

options = {
  isPlayingBgm: true,
  isReplayEnabled: true,
  seed: 4,
};
let cord;
let pins;
let pinMain;
let nextPinDist;
const cordLength = 0;
function update() {
  if (!ticks) {
    pins = [vec(5, 50)]; //pin position
    pinMain = [vec(50, 5)];
    nextPinDist = 5;
    cord = { angle: 1.57, length: cordLength, pin: pinMain[0] };
  }
  let scr = 0.2 * difficulty;
  if (input.isPressed) {
    cord.length += 2 + difficulty; // how fast it goes out
    play("lazer");
    if(cord.length > 90)
    {
      cord.length = 90;
      addScore(1);
    }
  } else {
    cord.length += (cordLength - cord.length) * 0.2; //how fast it retracts
  }
  color("black");
  //cord.angle += 0.05;
  line(cord.pin, vec(cord.pin).addWithAngle(cord.angle, cord.length));
  remove(pins, (p) => {
      //p.y  += scr;
      p.x  += scr;
      color("red");
      box(p,2);
      if (box(p, 2).isColliding.rect.black) {
        play("explosion");
        end();
      }
      return p.x > 102;
    });
    nextPinDist -= scr;
    while (nextPinDist < 0) {
      pins.push(vec(-2 - nextPinDist, rnd(10, 90)));
      nextPinDist += rnd(5, 50);
    }
    
    color("light_blue");
    rect(0, 90, 100, 100);
}
addEventListener("load", onLoad);