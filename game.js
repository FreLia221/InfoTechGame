let snake;
let siz = 15;
let food;
var bubbles = [];

function setup() {
  createCanvas(600, 600);
  snake = new Snake();
  frameRate(10);
  pickLocation();
}

function pickLocation() {
  let cols = floor(width / siz);
  let rows = floor(height / siz);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(siz);
}

function draw() {
  background(0);
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].display();
  }
  if (snake.eat(food)) {
    pickLocation();
    bubbles.push(new Bubble());
  }
  snake.death();
  snake.update();
  snake.show();
  fill(255, 0, 150, 100);
  stroke(255);
  rect(food.x, food.y, siz, siz);
}

function keyPressed() {
  if (keyCode === 87 || keyCode === UP_ARROW) {
    snake.direction(0, -1);
  } else if (keyCode === 83 || keyCode === DOWN_ARROW) {
    snake.direction(0, 1);
  } else if (keyCode === 68 || keyCode === RIGHT_ARROW) {
    snake.direction(1, 0);
  } else if (keyCode === 65 || keyCode === LEFT_ARROW) {
    snake.direction(-1, 0);
  }
}

function Bubble() {
  this.x = random(0, width);
  this.y = random(0, height);
  this.xspeed = 15;
  this.yspeed = 15;
  
  this.display = function() {
    stroke(255);
    fill('#567ACE');
    rect(this.x, this.y, 15, 15);
  }

  this.move = function() {
    this.x = this.x + this.xspeed;
    this.y = this.y + this.yspeed;
  if(this.x + 25 >= width || this.x-12 <= 0){
    this.xspeed = this.xspeed * -1;
   
  }
  if(this.y + 25 >= height || this.y-15 <= 0){
    this.yspeed = this.yspeed * -1;
   }
  }
}

function Snake() {
    this.x = 0;
    this.y = 0;
    this.xspeed = 3;
    this.yspeed = 0;
    this.total = 0;
    this.tail = [];
    this.eat = function(pos) {
      let d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        this.total++;
        return true;
      } else {
        return false;
      }
    }
  
    this.direction = function(x, y) {
      this.xspeed = x;
      this.yspeed = y;
    }
  
    this.death = function() {
      for (let i = 0; i < this.tail.length; i++) {
        let pos = this.tail[i];
        let d = dist(this.x, this.y, pos.x, pos.y);
        for(let i = 0; i < bubbles.length; i++)
        {
          let s = dist(this.x, this.y, bubbles[i].x, bubbles[i].y);
          if (d < 1 || s < 20) {
            this.total = 0;
            this.tail = [];
            bubbles = [];
            window.alert('GAME OVER');
          }
        }
        
      }
    }
  
    this.update = function() {
      for (let i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
      if (this.total >= 1) {
        this.tail[this.total - 1] = createVector(this.x, this.y);
      }
  
      this.x = this.x + this.xspeed * siz;
      this.y = this.y + this.yspeed * siz;
  
      this.x = constrain(this.x, 0, width - siz);
      this.y = constrain(this.y, 0, height - siz);
    }
  
    this.show = function() {
      fill('#d9c3f7');
      stroke(0);
      for (let i = 0; i < this.tail.length; i++) {
        rect(this.tail[i].x, this.tail[i].y, siz, siz);
      }
      rect(this.x, this.y, siz, siz);
    }
  }
