// Using pixels as truth,
// 	modify each pixel based on random 1/8 surrounding to determine vote, do nothing if ruling stays same
// 	use vote to update entities
// 		if an entity has a color's level over 9, convert its pixel

//DATA
var entities = [];

function setup(){
    createCanvas(100,100);
    background(71);
    frameRate(2);
    stroke("red");
    for(var i=0; i<width;i++){
	    for(var j=0; j<height;j++){
	    	entities.push(new Entity(j,i));
	    }
    }
}


function draw(){
	loadPixels();
	assessPixels();
	referenceEntities();
	updatePixels();
}


var referenceEntities = function(){
	for( var i = 0; i < entities.lenght; i++){
		entities[i].update();
	}
}

var assessPixels = function(){
	for(var i =0; i < width*height; i++){
		if(ruling(i,randomEight(i))){

		}
	}
}

var randomEight = function(indx){
	//returns a random pixel around entities indx
	var cords  = convertToCord(indx);

	var nX;
	var nY;
	while(!checkValidIndex(nX,nY)){
		nX = cords[0] + random(2)-1;
		nY = cords[1] + random(2)-1;
	}
	return convertToIndex(nX,nY);
}

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
    for(var i = 0; i<20; i ++){
        var x = floor(mouseX+random(10));
        var y = floor(mouseY+random(10));
        point(x,y);
    }
}

var checkValidIndex = function(x,y){
	//returns true if x and y are valid indeces
	return !(x >= width||x < 0||y >= height || y < 0);
}

var convertToIndex =function(x,y){
    //takes x and y and converts to linear index in array
    return x+y*width;
}

var convertToCord = function(indx){
	//takes entity index and converts to array of cordinate points
	return [indx%width,Math.floor(indx/width)];
}

var ruling = function(point1, point2){
    //returns undefined if rulling is no change
    //otherwise returns what color point1 should increase

    if(point1.id==point2.id){
        return point1.id;
    }else if(point2.id=="food"){
    	return point1.id; //food always loses
    }else if(point1.id=="food"){
    	return point2.id; //food always loses
    }else if(point1.id=="red"){
        if(point2.id=="green"){
            return "red"; //red beats green
        }else{
            return "blue"; //blue beats red
        }
    }else if(point1.id=="green"){
        if(point2.id=="red"){
            return "red"; //red beats green
        }else{
            return "green"; //green beats blue
        }
    }else if (point1.id == "blue") {
        if(point2.id=="green"){
            return "green"; //green beats blue
        }else{
            return "blue"; //blue beats red
        }
    }else{ 
    	console.log("error in ruling");
    }
}

// function countColors(){
// 	//returns object of counts for each color
// 	var outcome = {
// 	    "red":0,
// 	    "green":0,
// 		"blue":0,
// 		"food":0
// 	}

// 	for(var i =0; i < myPoints.length; i++){
// 		outcome[myPoints[i].id]++;
// 	}
// 	return outcome;
// }

// function myRemove(array, element) {
//     return array.filter(e => e !== element);
// }

// Entity.prototype.determineFuture = function (){
//     var upLeft = "food";
//     var above = "food";
//     var upRight = "food";
//     var left = "food";
//     var right = "food";
//     var bottomLeft = "food";
//     var bottom = "food";
//     var bottomRight = "food";

//     if (checkValidIndex(this.x-1,this.y-1)){ 
//     	// console.log("upLeft");
//         upLeft = ruling(this, myPoints[convertToIndex(this.x-1,this.y-1)]);
//     }
//     if (checkValidIndex(this.x,this.y-1)){
//     	// console.log("above");
//         above = ruling(this, myPoints[convertToIndex(this.x,this.y-1)]);
//     }
//     if (checkValidIndex(this.x+1,this.y-1)){
//     	// console.log("upRight");
//         upRight = ruling(this, myPoints[convertToIndex(this.x+1,this.y-1)]);
//     }
//     if (checkValidIndex(this.x-1,this.y)){
//     	// console.log("left");
//         left = ruling(this, myPoints[convertToIndex(this.x-1,this.y)]);
//     }    
//     if (checkValidIndex(this.x+1,this.y)){
//     	// console.log("right");
//         right = ruling(this, myPoints[convertToIndex(this.x+1,this.y)]);
//     }
//     if (checkValidIndex(this.x-1,this.y+1)){
//     	// console.log("bottomLeft");
//         bottomLeft = ruling(this, myPoints[convertToIndex(this.x-1,this.y+1)]);
//     }
//     if (checkValidIndex(this.x,this.y+1)){
//     	// console.log("bottom");
//         bottom = ruling(this, myPoints[convertToIndex(this.x,this.y+1)]);
//     }
//     if (checkValidIndex(this.x+1,this.y+1)){
//     	// console.log("bottomRight");
//         bottomRight = ruling(this, myPoints[convertToIndex(this.x+1,this.y+1)]);
//     }
//     var votes = [upLeft, above, upRight, left, right, bottomLeft, bottom, bottomRight];
//     if (votes.some((x)=>x!="food")){
//         votes = myRemove(votes, "food");
//         this.minorDetermine(votes);
//     }else{
//     	// console.log(votes);
//         this.future = "food";
//     }
// }

// Entity.prototype.minorDetermine = function (array){
//   //tallies incoming array of color strings and returns most voted color or random if tied
//   var outcome = {
//       "red":0,
//       "green":0,
//       "blue":0
//   }
//   for (var key in outcome){
//       outcome[key]=array.reduce(function(tot, item){
//         if(item == key){
//             return tot+1;
//         }else{
//             return tot;
//         }
//       }, 0);
//   }

//   var group = [];
//   var max = 0;
//   for(var key in outcome){
//     if(outcome[key]>max){
//         max = outcome[key];
//         group = [key];
//     }else if(outcome[key]==max){
//         group.push(key);
//     }
//   }

// 	//red beats green
// 	//blue beats red
// 	//green beats blue
//   if(this.id == "food"){
//   	this.future = group.length>1? group[Math.floor(Math.random()*group.length)] : group[0];
//   }else if(this.id=="red"&&outcome.blue>0){
//   	this.future = "blue";
//   }else if(this.id=="green"&&outcome.red>0){
//   	this.future = "red";
//   }else if(this.id=="blue"&&outcome.green>0){
//   	this.future = "green";
//   }
// }

