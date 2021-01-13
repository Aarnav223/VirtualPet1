//Create variables here
var database
var dog, dogImg, dogImg1;
var food, foodStock;

function preload()
{
  dogImg=loadImage("images/dogImg.png");
  dogImg1=loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);

  
  database=firebase.database()
  dog = createSprite(250,300);
  dog.addImage(dogImg);
  dog.scale=0.3;

  foodStock=database.ref('foodStock');
  foodStock.on("value",readStock);
  
}


function draw() {  
  background("green");

  drawSprites();


  fill("yellow")
  textSize(15);
  text("Food Remaining:"+food,200,50);
  fill("red");
  textSize(15);
  text("Press Up Arrow Key to Feed the Dog",150,100);

  if (keyWentDown(UP_ARROW)){
    writeStock(food);
    dog.addImage(dogImg1);
  }
  

}

function readStock(data){
  food=data.val()
}

function writeStock(x){
  if (x<=0){
    x=0
    text("Stock Got Over",100,150)
  }
  else {
    x=x-1
  }

  database.ref('/').update({
    foodStock:x
  });
}



