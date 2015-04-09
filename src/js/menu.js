(function() {
  'use strict';

  function Menu() {
    this.titleTxt = null;
    this.startTxt = null;
  }

  Menu.prototype = {

    create: function () {

      this.titlesprite = this.game.add.sprite(this.game.width / 2 - 300, 100, 'title');
      this.titlesprite.align = 'center';

      this.start = this.game.add.button(this.game.width/2 - 100, 250, 'start', this.startGame);
      this.controls = this.game.add.button(this.game.width/2 - 150, 300, 'controls', this.showControls);
      this.credits = this.game.add.button(this.game.width/2 - 125, 350, 'credits', this.showCredits);
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
