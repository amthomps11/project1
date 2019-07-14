const enemyTypes = {
  chaotic: "chaotic",
  chaser: "chaser",
  oscilator: "oscilator",
  targeter: "targeter"
};

function areTheyColliding(obj1, obj2) {
  if (
    (obj1 instanceof Enemy && obj2 instanceof Bullet) ||
    (obj2 instanceof Enemy && obj1 instanceof Bullet)
  ) {
    let tempEnemy;
    let tempBullet;
    if (obj1 instanceof Enemy) {
      tempEnemy = obj1;
      tempBullet = obj2;
    } else {
      tempEnemy = obj2;
      tempBullet = obj1;
    }

    let bulletCenter = new Vector(
      parseInt(getComputedStyle(tempBullet.div).left) + tempBullet.radius,
      parseInt(getComputedStyle(tempBullet.div).top) + tempBullet.radius
    );

    // let enemyCenter = tempEnemy.centerPos;
    let enemyCenter = new Vector(
      parseInt(getComputedStyle(tempEnemy.div).left) + tempEnemy.radius,
      parseInt(getComputedStyle(tempEnemy.div).top) + tempEnemy.radius
    );
    // console.log(enemyCenter);

    let tempDistanceBetween = bulletCenter.calcDistance(enemyCenter);
    if (tempDistanceBetween < tempBullet.radius + tempEnemy.radius) {
      return true;
    } else {
      return false;
    }
  } else if (
    (obj1 instanceof Enemy && obj2 instanceof Hero) ||
    (obj2 instanceof Enemy && obj1 instanceof Hero)
  ) {
    let tempEnemy;
    let tempHero;
    if (obj1 instanceof Enemy) {
      tempEnemy = obj1;
      tempHero = obj2;
    } else {
      tempEnemy = obj2;
      tempHero = obj1;
    }

    let heroCenter = new Vector(
      parseInt(getComputedStyle(tempHero.div).left) + tempHero.radius,
      parseInt(getComputedStyle(tempHero.div).top) + tempHero.radius
    );

    let enemyCenter = new Vector(
      parseInt(getComputedStyle(tempEnemy.div).left) + tempEnemy.radius,
      parseInt(getComputedStyle(tempEnemy.div).top) + tempEnemy.radius
    );

    let tempDistanceBetween = heroCenter.calcDistance(enemyCenter);
    if (tempDistanceBetween < tempHero.radius + tempEnemy.radius) {
      console.log("hero is hit");
      tempHero.health--;
      console.log(tempHero.health);
      if (tempHero.health === 0) {
        console.log("you dead");
        alert("game over");
      }
      return true;
    } else {
      return false;
    }
  }
}

function checkAllCollisions(hero, allBullets, allBaddies) {
  for (let i = 0; i < allBaddies.length; i++) {
    if (areTheyColliding(hero, allBaddies[i])) {
      console.log("hi");
    }

    for (let i = allBullets.length - 1; i >= 0; i--) {
      for (let j = allBaddies.length - 1; j >= 0; j--) {
        if (areTheyColliding(allBullets[i], allBaddies[j])) {
          console.log("asdfpoj");

          arena.removeChild(hero.bullets[i].div);
          hero.bullets.splice(i, 1);
          arena.removeChild(allBaddies[j].div);
          allBaddies.splice(j, 1);
        }
      }
    }
  }
}

function generateRandomPos() {
  return Math.floor(Math.random() * 600);
}
