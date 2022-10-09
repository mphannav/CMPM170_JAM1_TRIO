title = "FISH";

description = `
  [Hold] EXTEND
`;

characters = [ 
  `
  www 
  rrr 
  www 
   y 
 y y
 yyy  

`,
`
 r rr
  rrlr 
 r rr
`,
];
const G = {
    WIDTH: 150,
    HEIGHT: 100
};
options = {
      viewSize: {x: G.WIDTH, y: G.HEIGHT},
    isCapturing: true,
    isCapturingGameCanvasOnly: true,
    captureCanvasScale: 2
};
/**
 * @typedef {{
 * pos: Vector,
 * }} Player
 */

/**
 * @type { Player }
 */
/**
 * @typedef {{
 * pos: Vector,
 * }} Fish
 */

/**
 * @type { Fish }
 */
let player;
let fish;

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
    player = {
      pos: vec(49, 9)
      
    };
    fish = {
      pos: vec(-10, -10) //GOLDEN FISH NO REMOVE
    };
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
    cord.length += 1; // how fast it goes out
    player.pos.y += 1;
    play("lazer");
    if(cord.length > 88)
    {
      cord.length = 88;
      //addScore(1);
    }
  } else {
    if(cord.length > 1){
      cord.length -=1;
      player.pos.y -= 1;
    }
  }
  color("black");
  //cord.angle += 0.05;
  line(cord.pin, vec(cord.pin).addWithAngle(cord.angle, cord.length));
  remove(pins, (p) => {
      //p.y  += scr;
      p.x  += scr;
      //color("yellow");
      char("b",p, 0);
      // if (char("b",p, 0).isColliding.char.a) {
      //   play("explosion");
      //   addScore(1);
      // }
      if (char("b",p, 0).isColliding.rect.black) {
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
    player.pos.clamp(0, G.WIDTH, 2, G.HEIGHT-3);

    color ("black");
    char("a", player.pos);
    char("b", fish.pos);
}
addEventListener("load", onLoad);