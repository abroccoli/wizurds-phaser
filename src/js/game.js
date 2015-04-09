(function() {
  'use strict';

  function Game() {
    this.player = null;
  }

  Game.prototype = {

    create: function () {
      this.background = this.game.add.tileSprite(0, 0, 1000, 600, 'background');

      this.lifetext1 = this.game.add.text(10,10,'Lives: 3', {fill: '#B43EEF'});
      this.lifetext2 = this.game.add.text(895, 10,'Lives: 3', {fill: '#FF00A6'});

      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      this.fireballs = this.game.add.group();
      this.game.physics.arcade.enable(this.fireballs);

      this.initializeWorld();

      this.characterBuild();
    },

    update: function () {
      this.game.world.wrap(this.sprite1, 0, true, true, false);
      this.game.world.wrap(this.sprite2, 0, true, true, false);

      this.game.physics.arcade.collide(this.sprite1, this.platforms);
      this.game.physics.arcade.collide(this.sprite2, this.platforms);
      this.game.physics.arcade.collide(this.sprite1, this.sprite2);
      this.game.physics.arcade.collide(this.platforms, this.fireballs);

      this.initializeControls();
      this.fireballsListen();
    },

    initializeWorld: function(){
      this.platforms = this.game.add.group();

      this.platforms.enableBody = true;
      this.fireballs.enableBody = true;

      this.buildWorld();

      for(var i=0; i<=this.platforms.length - 1; i++){
        this.platforms.children[i].body.immovable = true;
        this.platforms.children[i].body.allowGravity = false;
      }

      this.game.physics.arcade.enable([this.platforms, this.ground]);
    },

    buildWorld: function(){
      this.ground = this.game.add.tileSprite( -20, this.game.world.height - 50, this.game.world.width + 20, 0, 'platform');
      this.platforms.add(this.ground);

      this.midwallLeft = this.game.add.tileSprite(this.game.world.width/2 - 50, this.game.world.height-300, 50, this.game.world.height/2, 'wallLeft');
      this.platforms.add(this.midwallLeft);

      this.midwallRight = this.game.add.tileSprite(this.game.world.width/2 + 25, this.game.world.height-300, 50, this.game.world.height/2, 'wallLeft');
      this.platforms.add(this.midwallRight);
      this.midwallRight.anchor.setTo(0.5,0);
      this.midwallRight.scale.x *= -1;

      this.midwallTop = this.game.add.tileSprite(this.game.world.width/2 - 50 ,this.game.world.height/2,98,20,'floatplatform');
      this.platforms.add(this.midwallTop);

      this.leftFloat = this.game.add.tileSprite(-15,this.game.world.height/1.5,128,20,'floatplatform');
      this.platforms.add(this.leftFloat);

      this.leftCenterFloat = this.game.add.tileSprite(150,this.game.world.height/2.2,128,20,'floatplatform');
      this.platforms.add(this.leftCenterFloat);

      this.leftUpperFloat = this.game.add.tileSprite(-15,this.game.world.height/4,128,20,'floatplatform');
      this.platforms.add(this.leftUpperFloat);

      this.rightFloat = this.game.add.tileSprite(this.game.world.width - 128,this.game.world.height/1.5,128,20,'floatplatform');
      this.platforms.add(this.rightFloat);

      this.rightCenterFloat = this.game.add.tileSprite(this.game.world.width - 278,this.game.world.height/2.2,128,20,'floatplatform');
      this.platforms.add(this.rightCenterFloat);

      this.rightUpperFloat = this.game.add.tileSprite(this.game.world.width - 128,this.game.world.height/4,128,20,'floatplatform');
      this.platforms.add(this.rightUpperFloat);
    },

    characterBuild: function(){
      this.sprite1 = this.game.add.sprite(100, 530, 'hero');
      this.characterSettings(this.sprite1, 3);

      this.sprite2 = this.game.add.sprite(900, 530, 'hero2');
      this.characterSettings(this.sprite2, 3);

      this.game.input.keyboard.disabled = false;
    },

    characterSettings: function(sprite, lives){
      sprite.lives = lives;
      sprite.scale.x = 2;
      sprite.scale.y = 2;
      this.game.physics.arcade.enable(sprite);
      sprite.body.gravity.y = 500;
      sprite.animations.add('right', [6,8,9], 10, true);
      sprite.animations.add('up', [7], 10, true);
      sprite.animations.add('down', [9], 10, true);
      sprite.animations.add('attack', [12], 10, true);
      sprite.animations.add('death', [4], 10, true);
      sprite.flipped = false;
      sprite.firetimer = 0;
    },

    characterKill: function(fire, character){
      console.log('hit ' + character.key);
      character.animations.play('death');
      fire.destroy();

      character.lives -= 1;
      this.lifetext1.text = 'Lives: ' + this.sprite1.lives;
      this.lifetext2.text = 'Lives: ' + this.sprite2.lives;

      this.characterRespawn(character);

      if(character.lives === 0){
        this.game.input.keyboard.disabled = true;
        this.game.add.button(this.game.width/2 - 275, 50, 'gameover', this.restart);
      }
    },

    characterRespawn: function(character){
      if (character === this.sprite1){
        character.reset(10,0);
      }else if (character === this.sprite2){
        character.reset(950,0);
      }
    },

    characterRunRight: function(sprite){
      if (sprite.flipped === true){
        sprite.scale.x *= -1;
        sprite.flipped = false;
      }
      sprite.animations.play('right');
    },

    characterRunLeft: function(sprite){
      if (sprite.flipped === false){
        sprite.scale.x *= -1;
        sprite.flipped = true;
      }
      sprite.animations.play('right');
    },

    characterJump: function(sprite){
      sprite.animations.play('up');
    },

    characterFall: function(sprite){
      sprite.animations.play('down');
    },

    characterAttack: function(sprite){
        this.fireballsCreate(sprite);
    },

    initializeControls: function(){
      this.cursors = this.game.input.keyboard.createCursorKeys();
      this.attackkey = this.game.input.keyboard.addKey(Phaser.Keyboard.QUESTION_MARK);

      this.wasd = {
        up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
        left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
        right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
        down: this.game.input.keyboard.addKey(Phaser.Keyboard.S)
      };
      this.attackkey2 = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);

      this.sprite1.anchor.setTo(0.5,0.5);
      this.sprite1.body.velocity.x = 0;

      this.sprite2.anchor.setTo(0.5,0.5);
      this.sprite2.body.velocity.x = 0;

      this.player1Keys(this.cursors, this.attackkey);
      this.player2Keys(this.wasd, this.attackkey2);
    },

    player1Keys: function(cursors, attackkey){
      if (cursors.right.isDown){
        this.sprite1.body.velocity.x = 150;
        this.characterRunRight(this.sprite1);
      }else if(cursors.left.isDown){
        this.sprite1.body.velocity.x = -150;
        this.characterRunLeft(this.sprite1);
      }else{
        this.sprite1.animations.stop();
      }
      if(cursors.up.isDown && this.sprite1.body.velocity.y === 0){
        this.sprite1.body.velocity.y = -400;
      }
      if(this.sprite1.body.velocity.y < 0){
        this.characterJump(this.sprite1);
      }else if(this.sprite1.body.velocity.y > 0){
        this.characterFall(this.sprite1);
      }
      if(attackkey.isDown){
        this.characterAttack(this.sprite1);
      }
    },

    player2Keys: function(cursors, attackkey){
      if (cursors.right.isDown){
        this.sprite2.body.velocity.x = 150;
        this.characterRunRight(this.sprite2);
      }else if(cursors.left.isDown){
        this.sprite2.body.velocity.x = -150;
        this.characterRunLeft(this.sprite2);
      }else{
        this.sprite2.animations.stop();
      }
      if(cursors.up.isDown && this.sprite2.body.velocity.y === 0){
        this.sprite2.body.velocity.y = -400;
      }
      if(this.sprite2.body.velocity.y < 0){
        this.characterJump(this.sprite2);
      }else if(this.sprite2.body.velocity.y > 0){
        this.characterFall(this.sprite2);
      }
      if(attackkey.isDown){
        this.characterAttack(this.sprite2);
      }
    },

    fireballsCreate: function(sprite){
      var firecolor;
      if (sprite === this.sprite1){
        firecolor = 'fire';
      }else if(sprite === this.sprite2){
        firecolor = 'fire2';
      }
      this.fireballsBuild(firecolor, sprite);
    },

    fireballsBuild: function(firecolor, sprite){
      if (this.game.time.now > sprite.firetimer){
        if (sprite.flipped === true){
          this.fireball = this.fireballs.create(sprite.body.x + sprite.body.width / 2 - 20, sprite.body.y + sprite.body.height / 2-5, firecolor);
          this.fireball.scale.x *= -1;
          this.fireball.body.velocity.x = -400;
          sprite.firetimer = this.game.time.now + 150;
        } else{
          this.fireball = this.fireballs.create(sprite.body.x + sprite.body.width / 2 + 20, sprite.body.y + sprite.body.height / 2-5, firecolor);
          this.fireball.body.velocity.x = 400;
          sprite.firetimer = this.game.time.now + 150;
        }
      }
    },

    fireballsListen:function(){
      for(var i=0; i<=this.fireballs.length-1; i++){
        this.fireballs.children[i].checkWorldBounds = true;
        if (this.fireballs.children[i].inWorld === false){
          this.fireballs.children[i].destroy();
        }else{
          if (this.fireballs.children[i].body.velocity.x === 0){
            this.fireballs.children[i].destroy();
          }
          this.game.physics.arcade.collide(this.fireballs.children[i], this.sprite1, this.characterKill,null, this);
          this.game.physics.arcade.collide(this.fireballs.children[i], this.sprite2, this.characterKill,null, this);
        }
      }
    },

    restart:function(){
      this.game.state.start('game');
    }
  };

  window['wizurds'] = window['wizurds'] || {};
  window['wizurds'].Game = Game;

}());
