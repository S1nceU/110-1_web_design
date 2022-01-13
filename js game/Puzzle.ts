class Puzzle {
    private rects: Array<Rectangle>;
    private dragRec: Rectangle;
    private isDragging: boolean = false;
    private clickOffset: p5.Vector;
    private w: number;
    private h: number;
    
    constructor(
      private x: number, 
      private y: number,  
      private img: p5.Image, 
      private side: number) {   
        
      this.width = img.width;
      this.height = img.height;
      this.rects = [];
      this.w = this.width/side;
      this.h = this.height/side;
  
      this.placeImages();
    }
    
    private placeImages() {
      for(var y = 0; y < this.side; y++) {
        for(var x = 0; x < this.side; x++) {
          let img = createImage(this.w, this.h);
          img.copy(this.img, this.w*x, this.h*y, this.w, this.h, 0, 0, this.w, this.h);
          let pos = this.randomPos(this.w, this.h);
          var index = x + y * this.side;
          this.rects.push(new Rectangle(pos, img, index));
        }
      }
    }
  
    private randomPos(marginRight: number, marginBottom: number) {
      return createVector(
        random(0, windowWidth-marginRight), 
        random(0, windowHeight-marginBottom));
    } 
  
    public draw() {
      rect(this.x-1, this.y-1, this.width+1, this.height+1);
      noFill();
      this.rects.forEach(r => r.draw());
    }
  
    public mousePressed(x: number, y: number) {
      let m = createVector(x, y);
      let index: number;
      this.rects.forEach((r, i) => {
        if(r.hits(m)) {
          this.clickOffset = p5.Vector.sub(r.pos, m);
          this.isDragging = true;
          this.dragRec = r;
          index = i;
        }
      });
      if(this.isDragging) {
        this.putOnTop(index);
      }
    }
  
    public mouseDragged(x, y) {
      if(this.isDragging) {
        let m = createVector(x, y);
        this.dragRec.pos.set(m).add(this.clickOffset);
      } 
    }
    
    public mouseReleased() {
      if(this.isDragging) {
        this.isDragging = false;
        this.snapTo(this.dragRec);
        this.checkEndGame();
      }
    }
  
    private putOnTop(index) {
      this.rects.splice(index, 1);
      this.rects.push(this.dragRec); 
    }
    
    public snapTo(r: Rectangle) {
  
      let dx = this.w/2;
      let dy = this.h/2;
      let x2 = this.x + this.width;
      let y2 = this.y + this.height;
      for(var y = this.y; y < y2; y += this.h) {
        for(var x = this.x; x < x2; x += this.w) {
          if(this.isOnGrid(r.pos.x, x, dx) && this.isInsideFrame(r.pos.y, this.y, y2-this.h, dy)) {
             r.pos.x = x;
          }
          if(this.isOnGrid(r.pos.y, y, dy) && this.isInsideFrame(r.pos.x, this.x, x2-this.w, dx)) {
             r.pos.y = y;
          }
        }
      }
    }
    
    private isOnGrid(actualPos, gridPos, d) {
      return actualPos > gridPos - d && actualPos < gridPos + d;
    }
  
    private isInsideFrame(actualPos, frameStart, frameEnd, d) {
      return actualPos > frameStart - d && actualPos < frameEnd + d;
    }
    
    private checkEndGame() {
      let nrCorrectNeeded = this.side * this.side;
      let nrCorrect = 0;
      this.rects.forEach(r => {
        let correctIndex = r.i;
        let actualIndex = (r.pos.x - this.x)/this.w + (r.pos.y - this.y)/this.h * this.side; 
        if(actualIndex === correctIndex) {
          nrCorrect += 1;
        }
      });
      if(nrCorrect === nrCorrectNeeded) {
        console.log("Good Job!");
      } else {
        console.log("Right places: " + nrCorrect);
      }
    }
  }
  