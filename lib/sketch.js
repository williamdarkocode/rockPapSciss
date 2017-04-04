

function setup(){
    createCanvas(200,200);
    background(71);
    stroke(225,0,0);
}

function draw(){
    

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