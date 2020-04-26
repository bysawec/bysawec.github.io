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
      game.config.height - 40,
      game.config.width,
      40,
      "ground"
    );
    this.enemy = this.physics.add.sprite(
      415,
      game.config.height - 75,
      "knight"
    );
    this.enemies = this.physics.add.group();
    this.enemies.add(this.enemy);
    this.enemy.body.setOffset(20, 13);
    this.enemy.body.setSize(20, 30, false);
    this.enemy.setScale(1);
    this.enemy.setGravityY(500);
    this.ground.setOrigin(0, 0);
    this.ground.setScrollFactor(0);
    this.platforms = this.physics.add.staticGroup();
    this.platforms.add(this.ground);

    this.ground2 = this.add.tileSprite(
      400,
      game.config.height - 60,
      100,
      40,
      "ground"
    );
    this.platforms.add(this.ground2);

    this.physics.add.existing(this.ground2).body.setSize(50, 5, true);
    this.ground2.setScale(0.5);

    this.physics.add.existing(this.ground).body.setSize(100000, 5, true);
    // sinc this tile is shorter I positioned it at the bottom of he screen
    this.playergroup = this.physics.add.group();
    this.player = this.physics.add.sprite(100, game.config.height - 90, "adv");
    this.sword = this.physics.add.sprite(200, game.config.height - 70, "sword");
    this.playergroup.add(this.player).add(this.sword);
    this.sword.setVisible(false);
    this.player.setBounce(0.0);
    this.player.body.setGravityY(500);
    this.player.body.setOffset(18, 8);
    this.player.body.setSize(14, 30, false);

    var player = this.player;

    this.myCam = this.cameras.main;
    this.physics.add.collider(this.playergroup, this.platforms);
    this.physics.add.collider(this.enemies, this.platforms);

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
    this.anims.create({
      key: "enemyidle",
      frames: this.anims.generateFrameNumbers("knightidle", {
        start: 0,
        end: 14
      }),
      frameRate: 12,
      repeat: -1
    });
    this.anims.create({
      key: "enemydead",
      frames: this.anims.generateFrameNumbers("knightdead", {
        start: 0,
        end: 14
      }),
      frameRate: 10,
      repeat: 0
    });
    this.anims.create({
      key: "enemyrun",
      frames: this.anims.generateFrameNumbers("knightrun", {
        start: 0,
        end: 16
      }),
      frameRate: 8,
      repeat: 1
    });
    this.anims.create({
      key: "enemyfight",
      frames: this.anims.generateFrameNumbers("knightattack", {
        start: 0,
        end: 16
      }),
      frameRate: 20,
      repeat: 1
    });

    this.cameras.main.startFollow(this.player);
    this.bg_1.tilePositionX = this.myCam.scrollX * 0.3;

    this.cursors = this.input.keyboard.createCursorKeys();

    this.myCam = this.cameras.main;
    this.myCam.setBounds(0, 0, game.config.width * 3, game.config.height);
    // making the camera follow the player
    this.myCam.startFollow(this.player);
    var Space = this.input.keyboard.addKey("SPACE");

    var inputs = this.input;

    Space.on("down", function() {
      player.play("jump", true);
      if (player.body.touching.down) {
        player.setVelocityY(-250);
      }
    });
    inputs.on("pointerdown", () => {
      this.player.play("fight", true);
    });
    this.hp = 40;
    this.receiveDamage = function(damage) {
      this.hp -= damage;

      // if hp drops below 0 we deactivate this enemy
      if (this.hp <= 0) {
        this.enemy.status = "dead";
        setTimeout(() => {
          this.enemy.status = "dead";
        }, 1000);
      }
    };
    this.time = 0;
    this.enemy.status = "idle";
    this.thisyou = this.add.text(
      this.player.x - 30,
      this.player.y,
      "This is you",
      { fontsize: 5 }
    );
    this.startText = this.add.text(
      20,
      20,
      "\n Arrows to move \n Shift to fight \n Space to jump"
    );
    setTimeout(() => {
      this.startText.destroy();
    }, 5000);
    this.enemy.setFlipX(true);
    this.player.hp = 150;
    this.tickplayer = 0;
    this.enemy.setCollideWorldBounds(true);
    var enemy = this.enemy;
    this.input.on("pointerdown", function(pointer) {
      enemy.x = pointer.x;
      enemy.y = pointer.y;
    });
    this.textdead = this.add.text(
      this.myCam.x + game.config.width / 2,
      this.myCam.y + 100,
      "You are dead."
    );
    this.textdead.alpha = 0;
    this.hey = this.add.text(this.enemy.x - 6, this.enemy.y - 30, "Hey!!", {
      fontSize: "9px"
    });
    setTimeout(() => {
      heytext.setText("Yo");
      setTimeout(() => {
        heytext.setText("My name is Lora");
        setTimeout(() => {
          heytext.setText("I need your help");
          setTimeout(() => {
            heytext.setText("Kill all monsters please!!!");
            setTimeout(() => {
              heytext.setText("bip bup bip bup............");
              this.enemy.status = "fight";
              setTimeout(() => {
                heytext.setVisible(false);
                this.enemy.status = "fight";
                setTimeout(() => {
                  this.enemy.status = "patrol";
                }, 4000);
              }, 500);
            }, 1000);
          }, 2000);
        }, 2000);
      }, 2000);
    }, 5000);
    var heytext = this.hey;
  }

  update() {
    if (this.enemy.status == "patrol") {
      this.physics.collide(this.enemy, this.physics.world, () => {
        if (this.enemy.x < 70) {
          this.enemy.x += 0.5;
        } else if (this.enemy.x > 500) {
          this.enemy.x -= 0.5;
        }
      });
    }
    var resetpos = () => {
      this.textdead.set;
      this.tweens.add({
        targets: this.textdead,
        alpha: { from: 0, to: 1 },
        // alpha: { start: 0, to: 1 },
        // alpha: 1,
        // alpha: '+=1',
        ease: "Linear", // 'Cubic', 'Elastic', 'Bounce', 'Back'
        duration: 1000,
        repeat: 0, // -1: infinity
        yoyo: false
      });
      this.player.setVisible(false);
      setTimeout(() => {
        this.tweens.add({
          targets: this.textdead,
          alpha: { from: 1, to: 0 },
          // alpha: { start: 0, to: 1 },
          // alpha: 1,
          // alpha: '+=1',
          ease: "Linear", // 'Cubic', 'Elastic', 'Bounce', 'Back'
          duration: 1000,
          repeat: 0, // -1: infinity
          yoyo: false
        });
        this.player.x = 100;
        this.player.y = game.config.height - 90;
        this.player.hp = 20;
        this.player.setVisible(true);
        this.textdead.setVisible(false);
        this.textdead.setActive(false);
        var tween = this.tweens.add({
          targets: this.player,
          alpha: { from: 0, to: 1 },
          // alpha: { start: 0, to: 1 },
          // alpha: 1,
          // alpha: '+=1',
          ease: "Linear", // 'Cubic', 'Elastic', 'Bounce', 'Back'
          duration: 1000,
          repeat: 0, // -1: infinity
          yoyo: false
        });
      }, 2000);
    };
    if (this.enemy.status == "fight") {
      if (this.enemy.x > this.player.x) {
        this.enemy.do = "runleft";
      } else if (this.enemy.x < this.player.x) {
        this.enemy.do = "runright";
      } else if (this.enemy.x == this.player.x) {
        this.enemy.status = "idle";
      }
    }
    this.sword.setX(this.player.x);
    this.sword.setY(this.player.y);
    this.sword.body.setOffset(22, 1);
    this.sword.body.setSize(15, 30, false);

    this.sword;
    this.attacking = false;
    this.bg_3.tilePositionX = this.myCam.scrollX * 0.2;
    this.bg_4.tilePositionX = this.myCam.scrollX * 0.3;
    this.bg_5.tilePositionX = this.myCam.scrollX * 0.6;
    this.ground.tilePositionX = this.myCam.scrollX;
    this.physics.add.existing(this.ground, true);
    if (this.player.flipX == true) {
      this.sword.body.setOffset(-13, 1);
    }
    if (
      this.cursors.shift.isDown &&
      !this.cursors.left.isDown &&
      !this.cursors.right.isDown
    ) {
      this.attacking = true;
      this.player.play("fight", true);
    } else if (
      this.cursors.left.isDown &&
      this.player.x > 0 &&
      !this.cursors.shift.isDown
    ) {
      this.sword.body.setOffset(-15, 1);
      this.player.play("run", true);
      this.player.setFlipX(true);
      this.player.x -= 1;
    } else if (
      this.cursors.right.isDown &&
      this.player.x < game.config.width * 3 &&
      !this.cursors.shift.isDown
    ) {
      this.thisyou.destroy();
      this.player.setFlipX(false);
      this.player.play("run", true);
      this.player.x += 1;
    } else if (this.cursors.shift.isDown && this.cursors.left.isDown) {
      this.player.setFlipX(true);
      this.attacking = true;
      this.player.play("fight", true);
      this.player.x -= 0.5;
    } else if (this.cursors.shift.isDown && this.cursors.right.isDown) {
      this.player.setFlipX(false);
      this.attacking = true;
      this.player.play("fight", true);
      this.player.x += 0.5;
    } else {
      this.player.play("idle", true);
    }
    if (this.input.activePointer.isDown) {
      this.superattack = true;
    }
    this.physics.collide(this.enemies, this.player);
    this.dying = this.physics.overlap(this.enemies, this.player, () => {
      if (this.attacking == true && this.player.body.x == this.enemy.body.x) {
        let text = this.add.text(this.player.x, this.player.y - 70, "keks");
        setTimeout(() => {
          text.destroy(true);
        }, 500);
      }
      if (this.attacking == false) {
        if (this.enemy.flipX == false && this.player.flipX == true) {
          this.player.setVelocity(400, -50);
        } else if (this.enemy.flipX == true && this.player.flipX == false) {
          this.player.setVelocity(-400, -50);
        } else if (
          this.enemy.flipX == true &&
          this.player.flipX == true &&
          this.player.x > this.enemy.x
        ) {
          this.player.setVelocity(400, -50);
        } else if (
          this.enemy.flipX == false &&
          this.player.flipX == false &&
          this.player.x > this.enemy.x
        ) {
          this.player.setVelocity(-400, -50);
        }
        setTimeout(() => {
          this.player.setVelocity(0, 0);
        }, 50);
        this.tickplayer++;
        if (this.tickplayer % 2 == 0) {
          this.player.setTint(0xff0000, 0xff0000, 0xff0000, 0xff0000);
          this.player.hp--;
          if (this.player.hp <= 0) {
            resetpos();
          }
          setTimeout(() => {
            this.player.clearTint();
          }, 1000);
        }
      }
    });
    if (this.attacking == true) {
      this.physics.overlap(this.enemies, this.sword, () => {
        if (this.attacking) {
          this.time++;
          console.log(this.time);
          if (this.time % 30 == 0) {
            this.enemy.setTint(0xff0000, 0xff0000, 0xff0000, 0xff0000);
            this.receiveDamage(3);
            if (this.enemy.flipX == true && this.player.flipX == false) {
              this.enemy.setVelocity(100, -100);
            } else if (this.enemy.flipX == false && this.player.flipX == true) {
              this.enemy.setVelocity(-100, -100);
            }
            setTimeout(() => {
              this.enemy.clearTint();
              this.enemy.setVelocity(0, 0);
            }, 200);
          }
        }
        this.enemy.setY(this.enemy.y);
        this.enemy.setX(this.enemy.x);
      });
    }
    if (this.enemy.status == "idle") {
      this.enemy.play("enemyidle", true);
    } else if (this.enemy.status == "dead") {
      setTimeout(() => {
        this.enemy.setVisible(false);
      }, 2000);
      this.enemy.body.destroy();
      this.enemy.play("enemydead", true);
    }
    if (this.enemy.status == "fight") {
      if (this.enemy.do == "runright") {
        this.enemy.x += 0.5;
        this.enemy.setFlipX(false);
      } else if (this.enemy.do == "runleft") {
        this.enemy.x -= 0.5;
        this.enemy.setFlipX(true);
      }
    }

    // scroll the texture of the tilesprites proportionally to the camera scroll
  }
}
