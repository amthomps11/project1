const Dot = function(positionVector) {
  this.position = positionVector;
  this.div;

  this.createDot = function() {
    const tempDiv = document.createElement("DIV");
    tempDiv.classList.add("dots");
    this.div = tempDiv;
    document.body.appendChild(this.div);
  };

  this.renderDot = function() {
    this.div.style.top = `${this.position.y}px`;
    this.div.style.left = `${this.position.x}px`;
  };

  this.updateDotPosistion = function(vector) {
    this.position = vector;
    this.renderDot();
  };
};

const dots = [];

const generateYDot = function() {
  let randomYPos = Math.floor(Math.random() * window.outerHeight);
  let tempDot = new Dot(new Vector(0, randomYPos));
  tempDot.createDot();
  let tempSpeed = Math.floor(Math.random() * 5);
  tempDot.div.style.transition = `top ${tempSpeed}s, left ${tempSpeed}s`;
  tempDot.renderDot();
  dots.push(tempDot);
};

const generateXDot = function() {
  let randomXPos = Math.floor(Math.random() * window.outerWidth);
  let tempDot = new Dot(new Vector(randomXPos, 0));
  tempDot.createDot();
  let tempSpeed = Math.floor(Math.random() * 5);
  tempDot.div.style.transition = `top ${tempSpeed}s, left ${tempSpeed}s`;
  tempDot.renderDot();
  dots.push(tempDot);
};

console.log(window.outerWidth);

for (let i = 0; i < 10; i++) {
  generateYDot();
}
for (let i = 0; i < 50; i++) {
  generateXDot();
}

let moveDots = function() {
  if (dots.length > 0) {
    for (let i = dots.length - 1; i > 0; i--) {
      let unitVector = new Vector(0.6, 0.8);
      unitVector.setMagnitude(50);
      let tempDirection = addTwoVectors(dots[i].position, unitVector);
      let currentX = parseInt(getComputedStyle(dots[i].div).left);
      let currentY = parseInt(getComputedStyle(dots[i].div).top);
      if (currentX >= 1500) {
        dots.splice(i, 1);

        let coinflip = Math.floor(Math.random() * 2);
        if (coinflip === 0) {
          generateXDot();
        } else {
          generateYDot();
        }
      }
      if (currentY >= 2000) {
        dots.splice(i, 1);
        let coinflip = Math.floor(Math.random() * 2);
        if (coinflip === 0) {
          generateXDot();
        } else {
          generateYDot();
        }
      }
      dots[i].updateDotPosistion(tempDirection);
      dots[i].renderDot();
    }
  }
};

moveDots();
setInterval(moveDots, 10);
