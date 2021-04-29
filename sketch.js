//Create variables here


var dog,dogImg,happyDog,database,foodS,foodStock

function preload()
{
  //load images here
  dogImg = loadImage("dog.png")
  happyDog = loadImage("happydog.png")
}

function setup() {
  
  createCanvas(500,500);



  dog = createSprite(250,330,20,60)
  dog.addImage(dogImg)
  dog.scale = 0.19

  database = firebase.database();

  foodStock = database.ref("food")
  foodStock.on("value",readStock)

  
}


function draw() { 
  background("green") 
  
  if(foodS !== undefined){
  textSize(25)
  fill("white")
  text("press up arrow key to feed dog",80,30)
  text("food Remaining = " + foodS,100,100)
  }

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(happyDog)
  }


  drawSprites();
  //add styles here

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
   x = 0;
  }
  else{
    x = x+1
  }

  database.ref('/').update({
    food:x
  })
}



