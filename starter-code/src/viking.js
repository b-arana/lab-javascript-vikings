var health = 300;
var strength = 150;


function Soldier(health, strength) {
    this.health = health;
    this.strength = strength;
};

Soldier.prototype.attack = function () {
    return this.strength;
};

Soldier.prototype.receiveDamage = function (damage) {
    this.health -= damage;

}

function Viking(name, health, strenght) {
    this.name = name;
    Soldier.call(this, health, strenght)

}

Viking.prototype = Object.create(Soldier.prototype)
Viking.prototype.constructor = Viking;

Viking.prototype.receiveDamage = function (damage) {
    this.health -= damage;

    if (this.health > 0) {
        return this.name + " has received " + damage + " points of damage";
    } else {
        return this.name + " has died in act of combat";
    }

}

Viking.prototype.battleCry = () => {
    return "Odin Owns You All!";
}

function Saxon(strenght, health) {
    Soldier.call(this, strenght, health);
}

Saxon.prototype = Object.create(Soldier.prototype);
Saxon.prototype.constructor = Saxon;

Saxon.prototype.receiveDamage = function (damage) {
    this.health -= damage;

    if (this.health > 0) {
        return "A Saxon has received " + damage + " points of damage";
    } else {
        return "A Saxon has died in combat";
    }
}

function War() {
    this.vikingArmy = [];
    this.saxonArmy = [];

}

War.prototype.addViking = function (viking) {
    this.vikingArmy.push(viking);
}

War.prototype.addSaxon = function (saxon) {
    this.saxonArmy.push(saxon);
}

War.prototype.vikingAttack = function () {
    var saxon = this.saxonArmy[Math.floor(Math.random() * this.saxonArmy.length)];
    var viking = this.vikingArmy[Math.floor(Math.random() * this.vikingArmy.length)];

    var message = saxon.receiveDamage(viking.attack());

    this.saxonArmy = this.saxonArmy.filter(e => {
        return e.health > 0;
    });

    return message;

}

War.prototype.saxonAttack = function () {
    var saxon = this.saxonArmy[Math.floor(Math.random() * this.saxonArmy.length)];
    var viking = this.vikingArmy[Math.floor(Math.random() * this.vikingArmy.length)];

    var message = viking.receiveDamage(saxon.attack());

    this.vikingArmy = this.vikingArmy.filter(e => {
        return e.health > 0;
    });

    return message;

}

War.prototype.showStatus = function () {
    if (this.saxonArmy.length == 0) {
        return "Vikings have won the war of the century!"
    }
    if (this.vikingArmy.length == 0) {
        return "Saxons have fought for their lives and survive another day...";
    }
    return "Vikings and Saxons are still in the thick of battle."
}