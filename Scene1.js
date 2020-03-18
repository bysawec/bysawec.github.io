class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload() {
    this.load.image("background", "assets/images/background.png");
    // 0 chnage the path to spritesheets
    // this.load.image("ship", "assets/images/ship.png");
    // this.load.image("ship2", "assets/images/ship2.png");
    // this.load.image("ship3", "assets/images/ship3.png");
    // to
    this.load.spritesheet("power-up", "assets/spritesheets/power-up.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.image("plx1", "assets/images/plx-1.png");
    this.load.image("plx2", "assets/images/plx-2.png");
    this.load.image("plx3", "assets/images/plx-3.png");
    this.load.image("plx4", "assets/images/plx-4.png");
    this.load.image("plx5", "assets/images/plx-5.png");
    this.load.spritesheet("adv", "adv.png", {
      frameWidth: 50,
      frameHeight: 37
    });
    this.load.spritesheet("mino", "mino.png", {
      frameWidth: 50,
      frameHeight: 37
    });
    this.load.image("ground", "assets/images/ground.png");
  }

  create() {
    this.add.text(20, 20, "Loading game...");
    this.scene.start("playGame");
  }
}
