function Entity(x,y){
    this.x = x;
    this.y = y;
    this.green = 0;
    this.red = 0;
    this.blue = 0;
}

Entity.prototype.increaseLevel= function(color){
    this[color]++;
}

Entity.prototype.resetLevels= function(){
    this.red= 0;
    this.blue = 0;
    this.green = 0;
}


Entity.prototype.update = function(){
    //updates pixel array
    var indx = (this.y*width+this.x)*4;
    pixels[indx] = this.red ? this.red : 0;//R
    pixels[indx+1] = this.green ? this.green : 0;//G
    pixels[indx+2] = this.blue ? this.blue : 0;//B

}