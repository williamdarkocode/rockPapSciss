
// depending on surrounding 8 vote, gives future state
// draw out new pixel on canvas

//DATA
var myPoints= [];

function setup(){
    createCanvas(100,100);
    background(71);
    frameRate(2);
    for (var i = 0; i < height; i ++){
        for (var j = 0; j < width; j ++){
            myPoints.push(new Entity(j,i));
        }
    }
}

var drawPoints = function(){
    for (var i = 0; i < myPoints.length; i++){
        myPoints[i].show();
        myPoints[i].determineFuture();
    }
}

function draw(){
    drawPoints();
}

var convertToIndex =function(x,y){
    //takes x and y and converts to linear index in array
    //if invalid, returns undefined
    
    if(x > width||x < 0||y > height || height < 0){
        return undefined;
    }else{
        return x+y*width;
    }
}

var ruling = function(point1, point2){
    //point1 is focal object, point2 is neighbor
    if(point1.id==point2.id){
        return point1.id;
    }else if(point1.id=="red"){
        if(point2.id=="green"){
            return point1.id; //red beats green
        }else{
            return point2.id; //blue beats red
        }
    }else if(point1.id=="green"){
        if(point2.id=="red"){
            return point2.id; //red beats green
        }else{
            return point1.id; //green beats blue
        }
    }else if (point1.id == "blue") {
        if(point2.id=="green"){
            return point2.id; //green beats blue
        }else{
            return point1.id; //blue beats red
        }
    }else{ //food always loses
        return point1.id
    }
}


function myRemove(array, element) {
    return array.filter(e => e !== element);
}

Entity.prototype.determineFuture = function (){
    var upLeft = "food";
    if (convertToIndex(this.x-1,this.y-1)){     
        upLeft = ruling(this, myPoints[convertToIndex(this.x-1,this.y-1)]);
    }
    var above = "food";
    if (convertToIndex(this.x,this.y-1)){
        above = ruling(this, myPoints[convertToIndex(this.x,this.y-1)]);
    }
    var upRight = "food";
    if (convertToIndex(this.x+1,this.y-1)){
        upRight = ruling(this, myPoints[convertToIndex(this.x+1,this.y-1)]);
    }
    var left = "food";
    if (convertToIndex(this.x-1,this.y)){
        left = ruling(this, myPoints[convertToIndex(this.x-1,this.y)]);
    }    
    // var right = "food";
    // if (convertToIndex(this.x+1,this.y)){
    //     right = ruling(this, myPoints[convertToIndex(this.x+1,this.y)]);
    // }
    // var bottomLeft = "food";
    // if (convertToIndex(this.x-1,this.y+1)){
    //     bottomLeft = ruling(this, myPoints[convertToIndex(this.x-1,this.y+1)]);
    // }
    // var bottom = "food";
    // if (convertToIndex(this.x,this.y+1)){
    //     bottom = ruling(this, myPoints[convertToIndex(this.x,this.y+1)]);
    // }
    // var bottomRight = "food";
    // if (convertToIndex(this.x+1,this.y+1)){
    //     bottomRight = ruling(this, myPoints[convertToIndex(this.x+1,this.y+1)]);
    // }
    var votes = [upLeft, above, upRight, left, right, bottomLeft, bottom, bottomRight];
    if (votes.some((x)=>x!="food")){
        votes = myRemove(votes, "food");
        this.future = minorDetermine(votes);
    }else{
        this.future = "food";
    }
}

var minorDetermine = function (array){
  //tallies incoming array of color strings and returns most voted color or random if tied
  var outcome = {
      "red":0,
      "green":0,
      "blue":0
  }
  for (var key in outcome){
      outcome[key]=array.reduce(function(tot, item){
        if(item == key){
            return tot+1;
        }else{
            return tot;
        }
      }, 0);
  }

  var group = [];
  var max = 0;
  for(var key in outcome){
    if(outcome[key]>max){
        max = outcome[key];
        group = [key];
    }else if(outcome[key]==max){
        group.push(key);
    }
  }

  if(group.length>1){
      return group[Math.floor(Math.random()*group.length)];
  }else{
      return group[0];
  }
}

var currentColor = "red";

function mouseClicked(){
    if (currentColor == "red"){
        currentColor = "green";
    }else if (currentColor == "green"){
        currentColor = "blue";
    }else if (currentColor == "blue"){
        currentColor = "red";
    }
}



function mouseDragged(){
    for(var i = 0; i<20; i ++){
        var x = floor(mouseX+random(10));
        var y = floor(mouseY+random(10));
        // console.log(x)
        // console.log(y)
        if(myPoints[y*width+x]){
            myPoints[y*width+x].future = currentColor;
        }
    }
}