(function() {
  'use strict';

  function Controls() {
  }

  Controls.prototype = {

    create: function () {
      this.purpplayer = this.game.add.sprite( 10, 2, 'purpplayer');
      this.pinkplayer = this.game.add.sprite(this.game.width - 350, 2, 'pinkplayer');
      this.start = this.game.add.button(this.game.width/2 - 100, 500, 'start', this.startGame);

      this.purpmovement = this.add.text(this.purpplayer.x, this.purpplayer.y + 100, 'Movement: Arrow Keys', {fill: '#fff', fontSize: '30px'});
      this.purpattack = this.add.text(this.purpplayer.x, this.purpplayer.y + 200, 'Attack: Question Mark', {fill: '#fff', fontSize: '30px'});

      this.pinkmovement = this.add.text(this.pinkplayer.x, this.pinkplayer.y + 100, 'Movement: WASD', {fill: '#fff', fontSize: '30px'});
      this.pinkattack = this.add.text(this.pinkplayer.x, this.pinkplayer.y + 200, 'Attack: 1', {fill: '#fff', fontSize: '30px'});
    },

    update: function () {

    },

    startGame: function () {
      this.game.state.start('game');
    }
  };

  window['wizurds'] = window['wizurds'] || {};
  window['wizurds'].Controls = Controls;

}());
