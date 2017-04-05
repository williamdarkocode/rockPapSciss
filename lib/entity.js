function Entity(x,y){
    //the x and y cordinates in the actual canvas
    var ALL = [];
    this.x = x;
    this.y = y;
    this.id = "food";
    this.future = "food";
    Entity.prototype.ALL = function(){
        ALL.push(this);
    }
}

Entity.prototype.show = function(){
    if(this.id == "food"){
        stroke(71,71,71);
    }else if (this.id == "red"){
        stroke(225,0,0);
    }else if (this.id == "green"){
        stroke(0,225,0);
    }else if (this.id == "blue"){
        stroke(0,0,225);
    }
    point(this.x,this.y);
    this.id = this.future;
}
