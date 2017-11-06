var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'content', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.image('backdrop', '/static/assets/pics/remember-me.jpg');
    game.load.image('ship', '/static/assets/sprites/thrust_ship.png');
    game.load.spritesheet('bullet', '/static/assets/sprites/rgblaser.png', 4, 4);
}

var ship;
var weapon;
var cursors;
var fireButton;

function create() {
    game.world.setBounds(0, 0, 1920, 1200);
    game.add.sprite(0, 0, 'backdrop');

    //  Creates 40 bullets, using the 'bullet' graphic
    weapon = game.add.weapon(40, 'bullet');

    //  The 'rgblaser.png' is a Sprite Sheet with 80 frames in it (each 4x4 px in size)
    //  The 3rd argument tells the Weapon Plugin to advance to the next frame each time
    //  a bullet is fired, when it hits 80 it'll wrap to zero again.
    //  You can also set this via this.weapon.bulletFrameCycle = true
    weapon.setBulletFrames(0, 80, true);

    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

    //  The speed at which the bullet is fired
    weapon.bulletSpeed = 400;

    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 50ms
    weapon.fireRate = 50;

    //  Wrap bullets around the world bounds to the opposite side
    weapon.bulletWorldWrap = true;

    ship = this.add.sprite(400, 300, 'ship');
    ship.anchor.set(0.5);
    game.physics.arcade.enable(ship);
    ship.body.drag.set(70);
    ship.body.maxVelocity.set(200);

    game.camera.follow(ship);

    //  Tell the Weapon to track the 'player' Sprite
    //  With no offsets from the position
    //  But the 'true' argument tells the weapon to track sprite rotation
    weapon.trackSprite(ship, 0, 0, true);

    cursors = this.input.keyboard.createCursorKeys();
    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

    // Stretch to fill
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

    // Keep original size
    // game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;

    // Maintain aspect ratio
    // game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

    game.input.onDown.add(gofull, this);

    game.stage.backgroundColor = "#000000";
}

function update() {
    if (cursors.up.isDown){
        game.physics.arcade.accelerationFromRotation(ship.rotation, 300, ship.body.acceleration);
    }else{
        ship.body.acceleration.set(0);
    }

    if (cursors.left.isDown){
        ship.body.angularVelocity = -300;
    }else if (cursors.right.isDown){
        ship.body.angularVelocity = 300;
    }else{
        ship.body.angularVelocity = 0;
    }

    if (fireButton.isDown){
        weapon.fire();
    }

    game.world.wrap(ship, 16);
}

function render() {
    weapon.debug();
}

function gofull() {
    if (game.scale.isFullScreen){
        game.scale.stopFullScreen();
    }else{
        game.scale.startFullScreen(false);
    }
}