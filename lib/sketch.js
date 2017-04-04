// Each pixel checks its neighbors to determine what it will change into
// Condensing resulting value into 1:1 scaled array
// then iterating over each to pixels for update

function setup(){
    createCanvas(200,200);
    background(71);
    stroke(225,0,0);
    frameRate(3);
}

function draw(){
    fill(225,0,0);
    rectMode(CENTER);
    rect(width/2, height/2,10,10)
    loadPixels();
    checkAround();
    // background(0);
    updatePixels();
}

var checkPixel = function(index){
    //using index of real array, will return value of pixel array
    if(pixels[index*4]==225){
        return 1;//red == rock
    }else if(pixels[index*4+1]==225){
        return 2;//green == paper
    }else if(pixels[index*4+2]==225){
        return 3;//blue == scissors
    }else{
        return 0; //food
    }
}

var inputPixel =function(index, color){
    //given new color value and index, will change pixel array
    var red = 0;
    var green = 0;
    var blue = 0;
    if(color == 1){
        red = 225;
    }else if(color == 2){
        green = 225;
    }else if (color ==3){
        blue = 225;
    }else{
        red = 71;
        green = 71;
        blue = 71;
    }
    pixels[index*4]= red;
    pixels[index*4+1]= green;
    pixels[index*4+2]= blue;
}

var determineOutcome = function(color, comparison){
    //only working with growth, returns winning color
    //color should be the current pixel being assessed
    if ( color == comparison){
        //sameness
        return color;
    }else if (color == 1){
        if(comparison == 3){
            //rock wins vs. scissors
            return color;
        }
    }else if (color == 2){
        if(comparison == 1){
            //paper wins vs. rock
            return color;
        }
    }else if (color == 3){
        if(comparison == 2){
            //scissors win vs. paper
            return color;
        }
    }else{
        //food always loses
        return comparison; 
    }
}

var judgement = function(array){
    //given array of possible outcomes, will judge proper change
    // console.log(array)
    var outcome = [];
    var aboveCount = 0;
    array.forEach(function(x, indx, tempArray){
        var count = array.reduce(function(tot, cur){
            if(cur == x){
                return tot=tot+1;
            }else{
                return tot;
            }
        }, 0);
        
        if (count > aboveCount){
            aboveCount = count; 
            outcome=[];
            outcome.push(tempArray[indx]);
        }else if(count == aboveCount){
            outcome.push(tempArray[indx]);
        }
    })
    if(outcome.includes(0)&&outcome.length>1){
        outcome.splice(outcome.indexOf(0),1);
    }
    return outcome[myRandom(outcome.length)];
}

var tempArray;

var checkAround = function(){
    //checks pixel array (each pixel is 4 units long corresponding to RGBA)
    tempArray = [];
    var above = 0;
    var bottom = 0;
    var left = 0;
    var right = 0;
    var thisColor;
    for (var i = 0; i < width*height; i++){
        thisColor = checkPixel(i);
        if( i - width > -1){
            above = determineOutcome(thisColor, checkPixel(i-width));
        }
        if ( i + width < width*height){
            bottom = determineOutcome(thisColor, checkPixel(i+width));
        }
        if( i%width - 1 > -1 ){
            left = determineOutcome(thisColor, checkPixel(i-1));
        }
        if (i%width + 1 < width -1){
            right = determineOutcome(thisColor, checkPixel(i+1));
        }
        tempArray.push(judgement([above, bottom, left, right]));
    }

    for (var k in tempArray){
        inputPixel(k,tempArray[k]);
    }

}

var currentColor = "r";

function mouseClicked(){
    if (currentColor == "r"){
        currentColor = "g";
        stroke(225,0,0);
    }else if (currentColor == "g"){
        currentColor = "b";
        stroke(0,225,0);
    }else if (currentColor == "b"){
        currentColor = "r";
        stroke(0,0,225);
    }
}



function mouseDragged(){
    for(var i = 0; i<20; i ++){
        point(mouseX+random(10),mouseY+random(10));
    }
}