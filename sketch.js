//Game States
var PLAY=1;
var END=0;
var gameState= PLAY;

//Create Vars
var sword,fruit ,monster,fruitGroup,enemyGroup, score,r,randomFruit, position;
var swordImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage
var gameOverSound ,knifeSwoosh

function preload(){
  //Sword image
  swordImage = loadImage("sword.png");
  //monster animation
  monsterImage = loadAnimation("alien1.png","alien2.png");
  //fruite images
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  //gameover image
  gameOverImage = loadImage("gameover.png");
  //sounds
  gameOverSound = loadSound("gameover.mp3");
  
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3");
}



function setup() {
  createCanvas(600, 600);
  
  //creating sword
   sword=createSprite(40,200,20,20);
   sword.addImage(swordImage);
   sword.scale=0.7
  
  
  
  //collider for sword
  sword.setCollider("rectangle",0,0,40,40);

  // Score vars and Groups
  score=0;
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  
}

function draw() {
  background("lightblue");

  
  if(gameState===PLAY){
    
    fruits();
    Enemy();
    
    // Move sword
    sword.y=World.mouseY;
    sword.x=World.mouseX;
  
    // Increase score 
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();

     knifeSwooshSound.play();
      
      score=score+2;
    }
    else
    {
      // Go to end state 
      if(enemyGroup.isTouching(sword)){
        gameState=END;
        //gameover sound
        gameOverSound.play();
        
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        
        // Change the animation of sword to gameover and reset its position
      
        
        var gameOver = createSprite(300,200,10,10);
        gameOver.addImage(gameOverImage);
        
        sword.x=200;
        sword.y=200;
      }
    }
  }
  
  drawSprites();
  
  //Display score
  text("Score : "+ score,300,30);
}


function Enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("monster", monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    fruit=createSprite(400,200,20,20);
    console.log(position)
     
    //random var change the position of fruit, more challenging    
    fruit.scale=0.2;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,340));
   
    fruit.velocityX=-(7 + score/4);
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}
