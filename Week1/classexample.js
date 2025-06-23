class rectangle{

  constructor(width,height,color){
    this.width=width;
    this.height=height;
    this.color=color;
  }

   area() {
    const area =this.width*this.height;
    return area;
    
  }

   getcolor(){
    console.log(`Color of Rectangle is ${this.color}`);
  }
}

const rect = new rectangle(4,6,"red");
const area =rect.area();
console.log(area);

rect.getcolor();


const now = new Date();
console.log(now.getDate())
