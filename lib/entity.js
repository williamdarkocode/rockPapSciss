function Entity(x,y, size){
    this.x = x * size;
    this.y = y * size;
    this.green = 0;
    this.red = 0;
    this.blue = 0;
    this.currentColor = "white";
}

Entity.prototype.increaseLevel= function(color){
    this[color]++;
    this.assessLevel();
}

Entity.prototype.selfAssess = function(around){
    //checks neighbors for rock/paper/scissor adjustment
    //red beats green
    //blue beats red
    //green beats blue
    if(around.currentColor == "red"){
        if(this.currentColor=="green"){
            this.increaseLevel(around.currentColor);
        }
    }else if(around.currentColor == "blue"){
        if(this.currentColor=="red"){
            this.increaseLevel(around.currentColor);
        }
    }else if(around.currentColor == "green"){
        if(this.currentColor=="blue"){
            this.increaseLevel(around.currentColor);
        }
    }else{
        around.increaseLevel(this.currentColor);
    }

}

Entity.prototype.assessLevel = function(){
    //checks if current color needs to change
    if(this.red>9){
        this.currentColor = "red";
        this.resetLevels();
    }else if(this.blue>9){
        this.currentColor = "blue";
        this.resetLevels();
    }else if(this.green>9){
        this.currentColor = "green";
        this.resetLevels();
    }
}

Entity.prototype.resetLevels= function(){
    this.red= 0;
    this.blue = 0;
    this.green = 0;
}


Entity.prototype.draw = function(){
    //draws object on screen
    stroke("black");
    fill(this.currentColor);
    rect(this.x, this.y, size, this.size);
}