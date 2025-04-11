class Character {
  constructor(name,x,y,sizeX,sizeY,imageset){
    this.name = name;
    this.x = x;
    this.y = y;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.state = "idle";
    this.sprites = imageset;
    this.IsMoving = false;
    this.IsAttacking = false;
    this.IsJumping = false;
    this.Super = false;
    this.lastDirection = null
    this.velocityY = 0
    this.gravity = 0.8
    this.jumpStrength = -15
    this.groundY = 400
    this.IsHit = false
  }
  
  
  movement(leftkey,rightkey){
    if(keyIsDown(leftkey) && this.IsAttacking === false){
      this.x -= 5
      this.IsMoving = true
      this.state = "left"
      this.lastDirection = "idleL"
    }
   else if(keyIsDown(rightkey) && this.IsAttacking === false){
      this.x += 5
      this.IsMoving = true
      this.state = "right"
     this.lastDirection = "idle"
    }
    else{
      this.IsMoving = false
      if (this.lastDirection === "idleL"){
        this.state = "idleL"
      }
      else{
        this.state = "idle"
      }
    }
  }
  
  attack(attackButton){
    if(keyIsDown(attackButton) && this.lastDirection === "idle"){
      this.IsAttacking = true
      this.state = "attack"
    }
    else if (keyIsDown(attackButton) && this.lastDirection === "idleL"){
      this.IsAttacking = true
      this.state = "attackL"
    }
    else{
      this.IsAttacking = false
      
    }
  }
  
  display() {
    image(this.sprites[this.state], this.x, this.y, this.sizeX, this.sizeY);
  }
  
  jump(jumpKey){
    if (keyIsDown(jumpKey) && !this.IsJumping) {
      this.velocityY = this.jumpStrength
      this.IsJumping = true
    }
  }
  
  update(){
    this.velocityY += this.gravity;
    this.y += this.velocityY

    if (this.y >= this.groundY) {
      this.y = this.groundY
      this.velocityY = 0
      this.IsJumping = false
    }
  }
  
  drawHitbox() {
    noFill()
    stroke(255,0,0)
    rect(this.x, this.y, this.sizeX, this.sizeY)
  }
  
}

let pikaSprites = {}
let charSprites = {}
let projectiles = {}
let amySprites = {}
let bg = {}
function preload(){
  pikaSprites.idle = loadImage("PikaIdle.gif")
  pikaSprites.idleL = loadImage("PikaIdleL.gif")
  pikaSprites.left = loadImage("PikaLeft.gif")
  pikaSprites.right = loadImage("PikaRight.gif")
  pikaSprites.attack = loadImage("PikaShock.gif")
  pikaSprites.attackL = loadImage("PikaShockL.gif")
  charSprites.idle = loadImage("CharIdleR.png")
  charSprites.idleL = loadImage("CharIdleL.png")
  charSprites.left = loadImage("CharMoveL.png")
  charSprites.right = loadImage("CharMoveR.png")
  charSprites.attack = loadImage("CharAttackR.png")
  charSprites.attackL = loadImage("CharAttackL.png")
  amySprites.idle = loadImage("amyIdle.png")
  amySprites.right = loadImage("amyRight.png")
  amySprites.left = loadImage("amyLeft.png")
  amySprites.attack = loadImage("amyAttack.png")
  bg = loadImage("download.jpg")
  projectiles.fireball = loadImage("Fireball.gif")
  projectiles.fireballL = loadImage("FireballL.gif")
  projectiles.Thunderbolt = loadImage("Thundershock.gif")
  projectiles.ThunderboltL = loadImage("ThundershockL.gif")
  
  
}

let Pikachu = new Character("Pikachu",100,100,100,100,pikaSprites)
let Charizard = new Character("Charizard",250,100,130,100,charSprites)
let Amy = new Character("Amy",350,100,100,120,amySprites)

function setup() {
  createCanvas(700,500);
   
}

function draw() {
  background(bg);
 
  Pikachu.movement(LEFT_ARROW,RIGHT_ARROW)
  Pikachu.attack(32)
  Pikachu.jump(UP_ARROW)
  Pikachu.update()
  Pikachu.drawHitbox()
  Pikachu.display()
  Charizard.drawHitbox()
  Charizard.movement(65,68)
  Charizard.attack(67)
  Charizard.jump(87)
  Charizard.update()
  Charizard.display()
  Amy.movement(89,73)
  Amy.attack(85)
  Amy.jump(55)
  Amy.update()
  Amy.drawHitbox()
  Amy.display()
}


