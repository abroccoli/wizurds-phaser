(function() {
  'use strict';

  function Credits() {
  }

  Credits.prototype = {

    create: function () {


      this.start = this.game.add.button(2, 2, 'start', this.startGame);
    },

    update: function () {

    }
  };

  window['wizurds'] = window['wizurds'] || {};
  window['wizurds'].Credits = Credits;

}());
