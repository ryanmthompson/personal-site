var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'content', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.image('backdrop', '/static/assets/pics/remember-me.jpg');
    game.load.spritesheet('kain', '/static/assets/sprites/kain.png', 16, 24, 43);
}

var kain;
var cursors;

function create() {
    game.world.setBounds(0, 0, 1920, 1200);
    game.add.sprite(0, 0, 'backdrop');

    kain = game.add.sprite(300, 200, 'kain', 1);
    kain.anchor.setTo(.5,.5);
    kain.scale.x = 2;
    kain.scale.y = 2;

    kain.animations.add('kain_walk_down', [0,2]);
    kain.animations.add('kain_walk_up', [3,5]);
    kain.animations.add('kain_walk_left', [6,7,8,7]);
    kain.animations.add('kain_walk_left', [6,7,8,7]);

    game.camera.follow(kain);

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
        kain.animations.play('kain_walk_up', 3, true);
        kain.y -= 2;
    }else if (cursors.down.isDown){
        kain.animations.play('kain_walk_down', 3, true);
        kain.y += 2;
    }else if (cursors.left.isDown){
        kain.scale.x = 2;
        kain.animations.play('kain_walk_left', 3, true);
        kain.x -= 2;
    }else if (cursors.right.isDown){
        kain.scale.x = -2;
        kain.animations.play('kain_walk_left', 3, true);
        kain.x += 2;
    }

/*    if (cursors.up.onUp){
        kain.animations.stop('kain_walk_up');
    }else if (cursors.down.onUp){
        kain.animations.stop('kain_walk_down');
    }else if (cursors.left.onUp){
        kain.animations.stop('kain_walk_left');
    }else if (cursors.right.onUp){
        kain.animations.stop('kain_walk_left');
    }*/

    game.world.wrap(kain, 16);
}

function render() {

}

function gofull() {
    if (game.scale.isFullScreen){
        game.scale.stopFullScreen();
    }else{
        game.scale.startFullScreen(false);
    }
}