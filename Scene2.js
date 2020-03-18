class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {
    this.bg_1 = this.add.tileSprite(
      0,
      0,
      game.config.width,
      game.config.height,
      "plx1"
    );
    this.bg_1.setOrigin(0, 0);
    this.bg_1.setScrollFactor(0);
    this.bg_2 = this.add.tileSprite(
      0,
      0,
      game.config.width,
      game.config.height,
      "plx2"
    );
    this.bg_2.setOrigin(0, 0);
    this.bg_2.setScrollFactor(0);

    this.bg_3 = this.add.tileSprite(
      0,
      0,
      game.config.width,
      game.config.height,
      "plx3"
    );
    this.bg_3.setOrigin(0, 0);
    this.bg_3.setScrollFactor(0);

    this.bg_4 = this.add.tileSprite(
      0,
      0,
      game.config.width,
      game.config.height,
      "plx4"
    );
    this.bg_4.setOrigin(0, 0);
    this.bg_4.setScrollFactor(0);

    this.bg_5 = this.add.tileSprite(
      0,
      0,
      game.config.width,
      game.config.height,
      "plx5"
    );
    this.bg_5.setOrigin(0, 0);
    this.bg_5.setScrollFactor(0);

    this.ground = this.add.tileSprite(
      0,
      game.config.height,
      game.config.width * 5,
      48,
      "ground"
    );
    this.ground = this.add.tileSprite(
      0,
      game.config.height - 40,
      game.config.width,
      40,
      "ground"
    );
    this.ground.setOrigin(0, 0);
    this.ground.setScrollFactor(0);
    this.platforms = this.physics.add.staticGroup();
    this.platforms.add(this.ground);
    this.physics.add.existing(this.ground).body.setSize(100000, 5, true);
    // sinc this tile is shorter I positioned it at the bottom of he screen
    this.player = this.physics.add.sprite(100, game.config.height - 90, "adv");
    this.player.play("idle");
    this.player.setBounce(0.0);
    this.physics.add.collider(this.player, this.platforms);
    this.player.body.setGravityY(500);

    this.myCam = this.cameras.main;

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("adv", { end: 3 }),
      frameRate: 4,
      repeat: -1
    });
    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("adv", { start: 8, end: 13 }),
      frameRate: 8,
      repeat: -1
    });
    this.anims.create({
      key: "fight",
      frames: this.anims.generateFrameNumbers("adv", { start: 39, end: 52 }),
      frameRate: 25,
      repeat: 1
    });
    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNumbers("adv", { start: 14, end: 28 }),
      frameRate: 25,
      repeat: 1
    });
    // 0.1 change from image to sprite
    this.cameras.main.startFollow(this.player);
    this.bg_1.tilePositionX = this.myCam.scrollX * 0.3;

    this.cursors = this.input.keyboard.createCursorKeys();

    // set workd bounds to allow camera to follow the player
    this.myCam = this.cameras.main;
    this.myCam.setBounds(0, 0, game.config.width * 3, game.config.height);

    // making the camera follow the player
    this.myCam.startFollow(this.player);
    var status = "idl";
  }
  update() {
    this.bg_3.tilePositionX = this.myCam.scrollX * 0.2;
    this.bg_4.tilePositionX = this.myCam.scrollX * 0.3;
    this.bg_5.tilePositionX = this.myCam.scrollX * 0.6;
    this.ground.tilePositionX = this.myCam.scrollX;
    this.physics.add.existing(this.ground, true);
    if (!this.player.body.touching.down) {
      this.player.play("jump", true);
    }
    if (this.cursors.space.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-220);
    } else if (this.cursors.shift.isDown) {
      this.player.play("fight", true);
    } else if (this.cursors.left.isDown && this.player.x > 0) {
      this.player.play("run", true);
      this.player.setFlipX(true);
      this.player.x -= 2;
    } else if (
      this.cursors.right.isDown &&
      this.player.x < game.config.width * 3
    ) {
      this.player.setFlipX(false);
      this.player.play("run", true);
      this.player.x += 2;
    } else {
      this.player.play("idle", true);
    }

    // scroll the texture of the tilesprites proportionally to the camera scroll
  }
}
