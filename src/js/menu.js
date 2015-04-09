(function() {
  'use strict';

  function Menu() {
    this.titleTxt = null;
    this.startTxt = null;
  }

  Menu.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2;


      this.titlesprite = this.game.add.sprite(this.game.width / 2 - 300, 100, 'title');
      this.titlesprite.align = 'center';

      y = y + this.titlesprite.height + 5;

      this.start = this.game.add.button(this.game.width/2 - 100, 250, 'start', this.startGame);
      this.controls = this.game.add.button(this.game.width/2 - 150, 300, 'controls', this.showControls);
      this.credits = this.game.add.button(this.game.width/2 - 125, 350, 'credits', this.showCredits);
      // this.startTxt = this.add.bitmapText(x, y, 'minecraftia', 'START');
      // this.startTxt.align = 'center';
      // this.startTxt.x = this.game.width / 2 - this.startTxt.textWidth / 2;

      // this.input.onDown.add(this.onDown, this);
    },

    update: function () {

    },

    startGame: function () {
      this.game.state.start('game');
    },

    showControls: function(){
      this.game.state.start('controls');
    },

    showCredits: function(){
      this.game.state.start('credits');
    }
  };

  window['wizurds'] = window['wizurds'] || {};
  window['wizurds'].Menu = Menu;

}());
