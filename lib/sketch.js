////////////
// CONFIG //
////////////
const entSize = 15;
const speed = 60;

let currentColor = "red"; // initial color
let entities = [];

/**
 * Sets up entities array.
 */
const setupEntities = function(){
    const output = [];
    const xMax = floor(width/entSize);
    const yMax = floor(height/entSize);
    for(let j = 0; j < yMax; j++){
        for(let i = 0; i < xMax; i++){
            output.push(new Entity(i, j))
        }
    }
    entities = output;
}

/**
 * p5 function for pressing mouse.
 * Will change the current color being drawn.
 */
function mousePressed(){
    switch(currentColor){
        case "red":
            currentColor = "blue";
            break;
        case "blue":
            currentColor = "green";
            break;
        case "green":
            currentColor = "red";
            break;
        default:
            alert(`Color :${currentColor} not recognized`);
            break;
    }
}

/**
 * p5 function for dragging mouse.
 * Forces the Entity under the mouse to change it's color to the current one being drawn.
 */
function mouseDragged(){
    const entity = findEntityByMouse();
    if(entity){
        entity.currentColor = currentColor;
        entity.resetLevels();
    }
}

/**
 * Grabs entity closest to mouse.
 * @returns {Entity}
 */
const findEntityByMouse = function(){
    return entities[floor(mouseX/entSize) + floor(mouseY/entSize) *floor(width/entSize)];
}

/**
 * Draws all entities to canvas.
 */
const drawEnts = function(){
    for (let i = 0; i < entities.length; i++){
        const entity = entities[i];
        const around = randomEight(entity);
        entity.selfAssess(around);
        fill(entity.currentColor);
        rect(entity.x*entSize, entity.y*entSize, entSize,entSize);
    }
}

/**
 * Returns entity closest to x and y.
 * 
 * @param {Number} x x-coordinate of entity
 * @param {Number} y y-coordinate of entity
 */
const _findEntityByIndex = function(x,y){
    return entities[x+y*floor(width/entSize)];
}

/**
 * Randomly returns one of the 8 surrounding entities of focus entity.
 * 
 * @param {Entity} entity entity of focus
 */
const randomEight = function(entity){
    let nX;
    let nY;
    do{
        nX = entity.x + (Math.floor(Math.random()*3)-1);
        nY = entity.y + (Math.floor(Math.random()*3)-1);
    }while(!_checkValidIndex(nX,nY)||(entity.x==nX&&entity.y==nY))

    return _findEntityByIndex(nX,nY);
}

/**
 * Returns true if x and y are valid indeces.
 * 
 * @param {Number} x x-coordinate of entity
 * @param {Number} y y-coordinate of entity
 */
const _checkValidIndex = function(x,y){
	return !(x >= floor(width/entSize)||x < 0||y >= floor(height/entSize) || y < 0);
}

//////
//p5//
//////

function setup(){
    createCanvas(600, 600);
    frameRate(speed);
    setupEntities();
    // noStroke();
}

function draw(){
	drawEnts();
}