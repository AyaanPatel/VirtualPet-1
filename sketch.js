//Create variables here
var dog, happyDog, database, foodS, foodStock;

function preload()
{
  //load images here
  dog_img = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250,300,150,150);
  dog.addImage(dog_img);
  dog.scale = 0.15;
  foodStock=database.ref('Food');
  foodStock.on("value", readStock);

}


function draw() {  

  //add styles here
  background(46, 139, 87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);

  }
  drawSprites();
textSize(20);
fill("black");
text("Press UP_ARROW to feed the dog milk ", 100, 50);
text("Food Remaining: "+foodS, 172,202);

}

function readStock(data){
foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}


