/**
 * Responsible for Rock-Paper-Scissor-like automata interactions.
 *
 * @author Mahdi Shadkamfarrokhi
 * @since 5-5-2018
 * @class
 */
class Entity {
  /**
   * Responsible for creating an Entity.
   * The Entity defaults to being white and having no bias towards red, greed, or blue.
   * @constructor
   * @param {Number} x x-coordinate for the Entity
   * @param {Number} y y-coordinate for the Entity
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.green = 0;
    this.red = 0;
    this.blue = 0;
    this.currentColor = "white";
  }
}

/**
 * Resets the bias for each color.
 */
Entity.prototype.resetLevels = function() {
  this.red = 0;
  this.blue = 0;
  this.green = 0;
};

/**
 * Responsible for increasing the bias level of given color.
 * If the bias increases past the threshold, the Entity's currentColor changes.
 * @param {String} color color to increase bias by 1 towards
 * @throws {Error} if color given is not "red", "green", or "blue"
 */
Entity.prototype.increaseLevel = function(color) {
  if (!["red", "blue", "green"].includes(color))
    throw Error(`Color ${color} not acceptable`);
  this[color]++;
  this.assessLevel();
};

/**
 * Checks current level of bias for each color. If past a threshold of 9, converts the Entity to that color and resets all color bias.
 */
Entity.prototype.assessLevel = function() {
  for (const color of ["red", "blue", "green"]) {
    if (this[color] > 9) {
      this.currentColor = color;
      this.resetLevels();
      break;
    }
  }
};

/**
 * Responsible for properly increasing color bias in a Rock-Paper-Scissor fashion.
 * Red beats Green.
 * Blue beats Red.
 * Green beats Blue.
 *
 * If the neighboring Entity is blank ("white"), it will have increase it's color bais based on the current Entity's color.
 *
 * @param {Entity} neighborEntity A neighboring Entity
 */
Entity.prototype.selfAssess = function(neighborEntity) {
  switch (neighborEntity.currentColor) {
    case "red":
      if (this.currentColor == "green") this.increaseLevel(around.currentColor);
      break;
    case "blue":
      if (this.currentColor == "red") this.increaseLevel(around.currentColor);
      break;
    case "green":
      if (this.currentColor == "blue") this.increaseLevel(around.currentColor);
      break;
    default:
        if (neighborEntity == "white") neighborEntity.increaseLevel(this.currentColor);
      break;
  }
};
