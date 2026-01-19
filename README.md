# 🏓 Pong

This was a <b>24 hour challenge</b> unfortunately I didn't finish it.

A modular Pong game built using Angular JS with canvas-based graphics and comprehensive 2D game mechanics.

---

## ✨ Features

- 🎨 **Canvas based graphics** - Smooth rendering using HTML5 Canvas
- 🧩 **Modular based design** - Easy to extend and customize
- 💥 **2D Collision Detection** - Precise collision handling system
- 🎯 **2D Movement** - Fluid object movement mechanics
- 🖼️ **2D Rendering** - Optimized rendering pipeline

---

## 🚀 How to Use

Follow these steps to get the game running:

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   ng serve
   ```
4. Open your browser and navigate to `http://localhost:4200`

---

## 🏗️ Code Architecture

### 💥 Collision Detection

The collision system is managed through a dedicated handler:

- Collision detection is handled by the `collision-handler.ts` file
- Every object has a collision record which contains data about the object
- When a collision between two objects is detected, the collision handler updates an observable with the collision data
- Each controller is responsible for handling the collision data for its objects

### 🎮 Movement and Object Creation

Object lifecycle and behavior is managed through controllers:

- Every object is handled by a dedicated controller
- Controllers are responsible for creating objects and handling their movement
- Controllers manage collision reactions for their objects
- Every controller maintains collision records for its subjects

### 🖥️ Game Rendering

The rendering system provides visual output:

- Game rendering is handled in the `game-page.ts` file
- The renderer is exclusively responsible for rendering the game state to the canvas

---
