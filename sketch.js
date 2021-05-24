var sonic, coin, spike, simg, cimg, spimg, back, bimg, rand, coins, sc, ig, 
as, cg, score, over, go, state, life, og, sout;
var ig, jsound, csound,b1,h1,h2,h3,heart;


function preload() {
  cimg = loadImage("coin.png");
  simg = loadAnimation("sonic.gif");
  spimg = loadImage("spike.png");
  bimg = loadImage("back.jpg");
  sc = loadAnimation("sonic_roll.gif")
  over = loadImage("gameover.png");
  sout = loadAnimation("sonic_out.png");
  jsound = loadSound("8d82b5_Sonic_Jump_Sound_Effect.mp3")
  csound = loadSound("341695__projectsu012__coins-1.wav")
  heart = loadImage("heart.png") 
}

function setup() {

  var canvas = createCanvas(displayWidth, 600);

  life = 3;

  cg = new Group();
  og = new Group();

  b1= createSprite(0,displayHeight/2-160,displayWidth*100,displayHeight)
  b1.addAnimation("b1",bimg);


  go = createSprite(330, 160);
  go.addImage("over1", over);
  go.scale = 0.5;
  go.visible = false;

  state = 0;

  score = 0;

  ig = createSprite(displayWidth / 2, 560, displayWidth * 100, 25);


  sonic = createSprite(55, 560);
  sonic.addAnimation("sonicimg", simg);
  sonic.addAnimation("sc1", sc);
  sonic.addAnimation("sout1", sout);
  sonic.scale = 0.5;
  sonic.velocityX = 0.1;

  h1 = createSprite(displayWidth-100,50)
  h1.addImage("h1",heart)
  h1.scale=1

  b1.velocityX=-5
}

function draw() {
  console.log("MouseX:" + " " + World.mouseX + " " + "MouseY:" +
    World.mouseY + " " + "Framecount:" + " " + frameCount)
  background("white")
  camera.position.x = sonic.x;
  //    camera.position.y=sonic.y;


  ig.visible = false;

  if (state === 2) {

    go.visible = true;

  }

  

  sonic.collide(ig);
  sonic.velocityY = sonic.velocityY + 0.8;
  

  if (keyDown("space") && sonic.y > 495) {

    sonic.velocityY = -16;
    jsound.play()

  }


  if (og.isTouching(sonic)) {

    life = life - 1
    og.velocityX = 0;
    cg.velocityX = 0;

    og[0].destroy()


  }

  if (cg.isTouching(sonic)) {
    cg[0].destroy();
    score = score + 10;
    csound.play();
  }

  if (keyDown("space")) {

    sonic.changeAnimation("sc1", sc);
    sonic.scale = 0.2;

  }


  if (sonic.y > 480) {

    sonic.changeAnimation("sonicimg", simg)
    sonic.scale = 0.5

  }

  if (b1.x<displayHeight/2){

  b1.x=displayWidth/2

  }

  coin();
  ob();



  drawSprites();
  fill("black");
  textSize(24)
  textFont("Algerian")
// text("MouseX:  " + mouseX + " MouseY:  " + mouseY + " SONIC.Y : " + sonic.y, 100, 50)
  textSize(16)
  text("Score:", 430, 25)
  text(score, 500, 25);
}

function coin() {

  if (frameCount % 80 === 0) {

    coins = createSprite(1350, 560);
    coins.addImage("b1", cimg);
    coins.lifetime = 280;
    coins.scale = 0.2;
    coins.y = Math.round(random(338, 460));

    cg.add(coins);
    if (state === 0) {

      coins.velocityX = -6;
    }

    if (state === 2) {
      coins.destroy()
    }

  }

}

function ob() {


  if (frameCount % 95 === 0) {
    var obstacles = createSprite(1350, 520);
    obstacles.addImage("oi1", spimg);

    if (state === 0) {
      obstacles.velocityX = -6;
    }
    if (state === 2) {
      obstacles.destroy()
    }
    obstacles.scale = 0.4;
    obstacles.lifetime = 300;
    og.add(obstacles);
  }


}