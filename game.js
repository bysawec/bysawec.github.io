const config = {
  width: 600,
  height: 200,
  backgroundColor: 0x000000,
  scene: [Scene1, Scene2],
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: true
    }
  },
  antialias: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
};

const game = new Phaser.Game(config);
