//Globals
var entSize = 20; //sets size of entity square, canvas is size of window
var entities = [];
var canvas;

function setupEntities(){
    //setups entities array (used on window resize and setup)
    stroke("black");
    var output = [];
    var xMax = floor(width/entSize);
    var yMax = floor(height/entSize);
    for(var j = 0; j < yMax; j++){
        for(var i = 0; i < xMax; i++){
            output.push(new Entity(i, j ,entSize))
        }
    }
    entities = output;
}

window.onresize = function() {
  var w = window.innerWidth;
  var h = window.innerHeight;  
  resizeCanvas(w,h);
  width = w;
  height = h;
  setupEntities();
};

function setup(){
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    frameRate(30);
    setupEntities();
}

// var counter = 0;
function draw(){
    // counter++;
    // console.log(counter);
    background(71);
	drawEnts();
}

//////////////////////////////
//Drawing alternating colors//
//////////////////////////////

var currentColor = "red";

function mousePressed(){
    if (currentColor == "red"){
        currentColor = "green";
    }else if (currentColor == "green"){
        currentColor = "blue";
    }else if (currentColor == "blue"){
        currentColor = "red";
    }
    stroke(currentColor);
}

function mouseDragged(){
    var ent = findEntityByMouse();
    if(ent){
        ent.currentColor = currentColor;
    }
}

function findEntityByMouse(){
    //returns entity closest to x and y
    return entities[floor(mouseX/entSize) + floor(mouseY/entSize) *floor(width/entSize)];
}

////////////////////////
//End of mouse drawing//
////////////////////////

function drawEnts(){
    for (var i = 0; i<entities.length; i++){
        var ent = randomEight(entities[i])
        // console.log("Random ent is "+ ent.x +" and " + ent.y)
        entities[i].selfAssess(ent);
        entities[i].draw();
    }
}

function findEntityByIndex(x,y){
    //returns entity closest to x and y
    return entities[x+y*floor(width/entSize)];
}

var randomEight = function(entity){
    //returns a random entity around current entity indx
    var nX;
    var nY;
    do{
        nX = entity.x + (myRandom(3)-1);
        nY = entity.y + (myRandom(3)-1);
    }while(!checkValidIndex(nX,nY)||(entity.x==nX&&entity.y==nY))

    return findEntityByIndex(nX,nY);
}



var checkValidIndex = function(x,y){
    // //returns true if x and y are valid indeces
	return !(x >= floor(width/entSize)||x < 0||y >= floor(height/entSize) || y < 0);
}
