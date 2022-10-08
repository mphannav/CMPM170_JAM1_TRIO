title = "FISH";

description = `
  [Hold] EXTEND
`;

characters = [ 
  `
  www 
  rrr 
  www 
   b  
 b b  
 bbb  

`,
];

options = {
  //isPlayingBgm: true,
  isReplayEnabled: true,
  seed: 8,
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
  //char["a", player.pos]
  // player = {
  //   pos: vec(G.WIDTH * 0.95, G.HEIGHT * 0.5)
  // };  
  
  color("light_blue");
  rect(0, 10, 45, 2);
  color("light_blue");
  rect(54, 10, 50, 2);
  color("blue");
  rect(0, 11, 100, 100);
  let scr = 0.2 * difficulty;
  if (input.isPressed) {
    cord.length += 2 + difficulty; // how fast it goes out
    play("lazer");
    if(cord.length > 100)
    {
      cord.length = 100;
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
      pins.push(vec(-2 - nextPinDist, rnd(15, 95)));
      nextPinDist += rnd(5, 50);
    }
    
    //color("blue");
    //rect(0, 11, 100, 100);
}
addEventListener("load", onLoad);