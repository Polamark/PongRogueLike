# Pong Rogue-Like

---

## Build using Angular JS

Pong built using Angular JS. designed to be very modular. Everything can easily be changed.

* Canvas based graphics
* Modular based design
* 2D Collision Detection
* 2D Movement
* 2D Rendering

## How to use

1. Clone the repository
2. Run `npm install`
3. Run `ng serve`
4. Open `http://localhost:4200` in your browser

## Code explanations

### Collision Detection

* Collision detection is handled by the collision-handler.ts file.
* Every object has a collision record, which has data about the object
* When a collision between two objects is detected the collision-handler.ts file will update an observable with the collision data
* Each Controller is responsible for handling the collision data

### Movement and Object Creation

* Every object is handled by a controller
* The controller is responsible for creating the object and handling the movement of the object
* The controller is also responsible for handling the collision reaction of the object
* Every controller is responsible for its subjects' collision records.

### Game Rendering

* The game is rendered in the game-page.ts file
* The renderer is only responsible for rendering the game
* 
