# Aesc Engine
- A visual game engine that allows you to prototype simple games without having to code!

## Getting Started
1. Open index.html in a web browser.
2. Press 'C' to create an object, type a name and press enter to finish creating the object.
3. Press 'A' to open the module map, click on a module to add it.
4. Use the center pane to edit module properties to create custom behavior.
5. Press 'B' to toggle the preview game build.  It's that easy!

## Tips
- Module descriptions are shown in the lower panel.
- Not seeing your object?  Try adding a sprite or color mod!
- Most interface elements respond to right click, use this to avoid accidentally opening menus.

## Modules
- __Identity Mod:__ Attached to every object and cannot be removed.  Move the circle to update object position.

### Graphics
- __Color Mod:__ Draws a colored rectangle.  Use the RGB sliders to change the color, and the purple arrow to change scale.
- __Sprite Mod:__ Draws a scaled sprite.  Use the red arrow to change scale, click the rectangle to open the sprite map to choose a sprite.
- __Camera Follow Mod:__ Not working, used now to show the screen area for a build.
- __Weld Mod:__ Stick one object on another.  Use the input text box to specify the object to follow, the red arrow is the offset from that object's center to stick to.

### Input
- __Diag Move Mod:__ Top down movement.  Four inputs arranged like arrrow keys are the movement keys, make sure these are upper case.  Red arrow defines speed.  Diag move toggles 4/8 directional movement.  Allow stop stops the object when a key is released.  Rotate object rotates the object to face forward towards the pressed key.
- __Aimer Mod:__ Rotates the object to face towards the mouse.
- __Tank Move Mod:__ Object moves like a tank, left/right movement keys rotate and up/down moves towards rotated direction.  Keys arranged like arrow keys define movement keys, make sure they are upper case.  Red arrow defines movement speed, orange arrow is rotation speed.  The slider bar controls friction, higher values make it stop quicker.
- __Shooter Mod:__ Shoots a bullet when the key is pressed.  Bullet destroys objects with a hitbox mod attached.  Key can be unset with escape to enable autofire.  The sprite picker changes the bullet sprite, red arrow is bullet speed and direction.  Slider bar controls how long it takes to fire again.
- __Platformer Mod:__ Object can be controlled like a platformer character.  Input strings are input keys, make sure they are upper case.  Jump power controls jump height, gravity controls gravity strength.  The green box defines the collision area, this collides with objects with a collider mod attached.

### AI
- __Follow Target Mod:__ Moves straight towards object.  Set target object with input string, red arrow length changes movement speed.
- __Ping Pong Mod:__ Object moves back and forth.  Red arrow controls points to bounce between, slider controls movement speed.
- __Path Follow Mod:__ Moves object along a path.  Blue arrow draws path, use buttons to add or remove line segments.  Slider controls movement speed.
- __Physics Mod:__ Applies velocity and force to an object.  Green arrow defines velocity, yellow arrow is gravity.  Right click to move arrows, left click for a range of values.

### Spawn
- __Duper Mod:__ Duplicates object on a timer, slider controls interval in seconds.
- __Spawner Mod:__ Spawns a different object on a timer.  Input box sets spawn object, slider bar shows time in seconds.
- __Splitter Mod:__ Splits into two on collision with a bullet.  Text box sets what object to spawn on destroy, arrow sets hitbox size.
- __Row Col Init Mod:__ Spawns a centered grid of the object it's attached to at the start of the build.  Col height slider is how tall the grid will be, row width is how wide the grid will be.  The red arrow sets spacing between grid elements.
- __Timeout Mod:__ Destroys the object after a certain time.  Slider bar is time in seconds.

### Collision
- __Hitbox Mod:__ Sets a hitbox to be used by other mods.  Destroys the object on collision with a bullet created by shooter mod.
- __Lock Screen Mod:__ Prevents the object from exiting the bounds of the screen.
- __Loop Screen Mod:__ Teleports the object to the other side of the screen when it tries to exit.  The arrow defines how close to the edge to teleport.
- __Tilemap Mod:__ Spawns many objects in a grid.  Buttons allow adding or removing tile objects, arrow defines spacing between tiles.  Input strings set each tile object, click the enable button to start drawing with that tile.
- __Collider Mod:__ Prevents objects from moving into each other.  Must be attached to both objects that collide.
- __Coin Mod:__ Destroys itself on collision with another object.  Hitbox is defined by the arrow, the text box takes the name of the object that will destroy this one on collision.
- __Coin Pickup Mod:__ Destroys objects with coin mod with target name set to this object's name on collision.  Set collision range with arrow.
