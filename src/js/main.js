window.onload = function () {
  'use strict';

  var game
    , ns = window['wizurds'];

  game = new Phaser.Game(1000, 600, Phaser.AUTO, 'wizurds-game');
  game.state.add('boot', ns.Boot);
  game.state.add('preloader', ns.Preloader);
  game.state.add('menu', ns.Menu);
  game.state.add('game', ns.Game);
  game.state.add('controls', ns.Controls);
  game.state.add('credits', ns.Credits);
  /* yo phaser:state new-state-files-put-here */

  game.state.start('boot');
};
