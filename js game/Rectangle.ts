class Rectangle {
    public drawWithFilter: boolen = false;
    private width: number;
    private height: number;
    
    constructor (public pos: p5.Vector, private img: p5.Image, public i: number) {
      this.width = img.width;
      this.height = img.height;
    }
    
    draw() {
      image(this.img, this.pos.x, this.pos.y);
    }
    
    hits(hitpos: p5.Vector) {
      if(hitpos.x > this.pos.x && 
         hitpos.x < this.pos.x + this.width && 
         hitpos.y > this.pos.y && 
         hitpos.y < this.pos.y + this.height) {
        return true;
      }
      return false;
    }
  }
  