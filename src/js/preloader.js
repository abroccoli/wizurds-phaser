(function() {
  'use strict';

  function Preloader() {
    this.asset = null;
    this.ready = false;
  }

  Preloader.prototype = {

    preload: function () {
      this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');

      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.load.setPreloadSprite(this.asset);

      this.loadResources();
    },

    loadResources: function () {
      this.load.image('player', 'assets/player.png');
      this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');
      this.load.spritesheet('hero', 'assets/YeOldyNecroGuy.png', 16, 15, 24, 18, 5.8);
      this.load.spritesheet('hero2', 'assets/YeOldyNecroGuy2.png', 16, 15, 24, 18, 5.8);
      this.load.spritesheet('fire', 'assets/rsz_fireballs_transparent.png', 30, 16, -1, 0, 0);
      this.load.spritesheet('fire2', 'assets/rsz_fireballs_transparent2.png', 30, 16, -1, 0, 0);
      this.load.image('platform', 'assets/winter_ground/ground2.png');
      this.load.image('floatplatform', 'assets/winter_ground/ground0.png');
      this.load.image('wallLeft', 'assets/winter_ground/ground4.png');
      this.load.image('background', 'assets/alternate.jpg');
      this.load.image('title', 'assets/Wizurds.png');
      this.load.image('start', 'assets/START.png');
      this.load.image('controls', 'assets/CONTROLS.png');
      this.load.image('credits', 'assets/CREDITS.png');
      this.load.image('purpplayer', 'assets/Purple-Player.png');
      this.load.image('pinkplayer', 'assets/Pink-Player.png');
    },

    create: function () {
      this.asset.cropEnabled = false;
    },

    update: function () {
      if (!!this.ready) {
        this.game.state.start('menu');
      }
    },

    onLoadComplete: function () {
      this.ready = true;
    }
  };

  window['wizurds'] = window['wizurds'] || {};
  window['wizurds'].Preloader = Preloader;

}());
