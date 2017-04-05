
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

Entity.prototype.determineFuture = function (){
    var index = convertToIndex(this.x,this.y);

    var upLeft = "food";
    if (convertToIndex(this.x-1,this.y-1)){
        console.log("hit")
        upLeft = ruling(this, myPoints[convertToIndex(this.x-1,this.y-1)]);
    }
    var above = "food";
    var upRight = "food";
    var left = "food";
    var right = "food";
    var bottomLeft = "food";
    var bottom = "food";
    var bottomRight = "food";

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